// ../package.json
var package_default = {
  name: "suroi",
  version: "0.15.0",
  description: "An open-source 2D battle royale game inspired by surviv.io",
  private: true,
  scripts: {
    build: "pnpm -r build",
    "build:client": "cd client && pnpm build",
    "build:server": "cd server && pnpm build",
    start: "node --enable-source-maps server/dist/server/src/server.js",
    moderation: "node --enable-source-maps server/dist/server/src/moderation.js",
    warn: "pnpm moderation warn",
    ban: "pnpm moderation ban",
    unban: "pnpm moderation unban",
    dev: "pnpm -r dev",
    "dev:client": "cd client && pnpm dev",
    "dev:server": "cd server && pnpm dev",
    "dev:test": "cd tests && pnpm stressTest",
    lint: "eslint . --fix --ext .js,.ts",
    "lint:ci": "eslint . --max-warnings 0 --ext .js,.ts",
    validateDefinitions: "cd tests && tsc && pnpm validateDefinitions",
    "full-reinstall": "rm -r node_modules pnpm-lock.yaml client/node_modules server/node_modules common/node_modules tests/node_modules && pnpm install"
  },
  keywords: [
    "nodejs",
    "typescript"
  ],
  license: "GPL-3.0",
  devDependencies: {
    "@typescript-eslint/eslint-plugin": "^6.18.1",
    "@typescript-eslint/parser": "^6.18.1",
    eslint: "^8.56.0",
    "eslint-config-standard-with-typescript": "^43.0.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-n": "^16.6.2",
    "eslint-plugin-promise": "^6.1.1",
    typescript: "5.3.3"
  }
};

// vite.config.ts
import { defineConfig } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.6_sass@1.69.6/node_modules/vite/dist/node/index.js";

// vite/vite.prod.ts
import { mergeConfig } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.6_sass@1.69.6/node_modules/vite/dist/node/index.js";

// vite/vite.common.ts
import { splitVendorChunkPlugin } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.6_sass@1.69.6/node_modules/vite/dist/node/index.js";
import { ViteImageOptimizer } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/vite-plugin-image-optimizer@1.1.7_vite@5.0.10/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { spritesheet } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/vite-spritesheet-plugin@0.0.3_vite@5.0.10/node_modules/vite-spritesheet-plugin/dist/index.js";
import { svelte } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@3.0.1_svelte@4.2.8_vite@5.0.10/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/jim/Code/OSS/survivroi/client/vite";
var config = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "../index.html"),
        changelog: resolve(__vite_injected_original_dirname, "../changelog/index.html"),
        news: resolve(__vite_injected_original_dirname, "../news/index.html"),
        rules: resolve(__vite_injected_original_dirname, "../rules/index.html"),
        editor: resolve(__vite_injected_original_dirname, "../editor/index.html")
      }
    }
  },
  plugins: [
    svelte(),
    splitVendorChunkPlugin(),
    ViteImageOptimizer({
      test: /\.(svg)$/i,
      logStats: false
    }),
    spritesheet({
      patterns: [{
        rootDir: "public/img/game"
      }],
      options: {
        outputFormat: "png",
        margin: 8,
        removeExtensions: true
      }
    })
  ],
  define: {
    APP_VERSION: JSON.stringify(`${package_default.version}`)
  }
};
var vite_common_default = config;

// vite/vite.prod.ts
var config2 = {
  define: {
    API_URL: JSON.stringify("/api")
  }
};
var vite_prod_default = mergeConfig(vite_common_default, config2);

// vite/vite.dev.ts
import { mergeConfig as mergeConfig2 } from "file:///home/jim/Code/OSS/survivroi/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.6_sass@1.69.6/node_modules/vite/dist/node/index.js";
var config3 = {
  server: {
    port: 3e3,
    strictPort: true,
    host: "0.0.0.0"
  },
  preview: {
    port: 3e3,
    strictPort: true,
    host: "0.0.0.0"
  },
  define: {
    API_URL: JSON.stringify("http://localhost:8080/api")
  }
};
var vite_dev_default = mergeConfig2(vite_common_default, config3);

// vite.config.ts
import { existsSync, rmSync } from "fs";
import { dirname, resolve as resolve2 } from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///home/jim/Code/OSS/survivroi/client/vite.config.ts";
var DIRNAME = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig(({ command, mode }) => {
  process.env = {
    ...process.env,
    VITE_APP_VERSION: package_default.version
  };
  if (command === "serve" && mode === "development") {
    if (existsSync(resolve2(DIRNAME, "./dist"))) {
      rmSync(resolve2(DIRNAME, "./dist"), { recursive: true, force: true });
    }
  }
  return command === "serve" ? vite_dev_default : vite_prod_default;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcGFja2FnZS5qc29uIiwgInZpdGUuY29uZmlnLnRzIiwgInZpdGUvdml0ZS5wcm9kLnRzIiwgInZpdGUvdml0ZS5jb21tb24udHMiLCAidml0ZS92aXRlLmRldi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsie1xuICBcIm5hbWVcIjogXCJzdXJvaVwiLFxuICBcInZlcnNpb25cIjogXCIwLjE1LjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkFuIG9wZW4tc291cmNlIDJEIGJhdHRsZSByb3lhbGUgZ2FtZSBpbnNwaXJlZCBieSBzdXJ2aXYuaW9cIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInBucG0gLXIgYnVpbGRcIixcbiAgICBcImJ1aWxkOmNsaWVudFwiOiBcImNkIGNsaWVudCAmJiBwbnBtIGJ1aWxkXCIsXG4gICAgXCJidWlsZDpzZXJ2ZXJcIjogXCJjZCBzZXJ2ZXIgJiYgcG5wbSBidWlsZFwiLFxuICAgIFwic3RhcnRcIjogXCJub2RlIC0tZW5hYmxlLXNvdXJjZS1tYXBzIHNlcnZlci9kaXN0L3NlcnZlci9zcmMvc2VydmVyLmpzXCIsXG4gICAgXCJtb2RlcmF0aW9uXCI6IFwibm9kZSAtLWVuYWJsZS1zb3VyY2UtbWFwcyBzZXJ2ZXIvZGlzdC9zZXJ2ZXIvc3JjL21vZGVyYXRpb24uanNcIixcbiAgICBcIndhcm5cIjogXCJwbnBtIG1vZGVyYXRpb24gd2FyblwiLFxuICAgIFwiYmFuXCI6IFwicG5wbSBtb2RlcmF0aW9uIGJhblwiLFxuICAgIFwidW5iYW5cIjogXCJwbnBtIG1vZGVyYXRpb24gdW5iYW5cIixcbiAgICBcImRldlwiOiBcInBucG0gLXIgZGV2XCIsXG4gICAgXCJkZXY6Y2xpZW50XCI6IFwiY2QgY2xpZW50ICYmIHBucG0gZGV2XCIsXG4gICAgXCJkZXY6c2VydmVyXCI6IFwiY2Qgc2VydmVyICYmIHBucG0gZGV2XCIsXG4gICAgXCJkZXY6dGVzdFwiOiBcImNkIHRlc3RzICYmIHBucG0gc3RyZXNzVGVzdFwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZml4IC0tZXh0IC5qcywudHNcIixcbiAgICBcImxpbnQ6Y2lcIjogXCJlc2xpbnQgLiAtLW1heC13YXJuaW5ncyAwIC0tZXh0IC5qcywudHNcIixcbiAgICBcInZhbGlkYXRlRGVmaW5pdGlvbnNcIjogXCJjZCB0ZXN0cyAmJiB0c2MgJiYgcG5wbSB2YWxpZGF0ZURlZmluaXRpb25zXCIsXG4gICAgXCJmdWxsLXJlaW5zdGFsbFwiOiBcInJtIC1yIG5vZGVfbW9kdWxlcyBwbnBtLWxvY2sueWFtbCBjbGllbnQvbm9kZV9tb2R1bGVzIHNlcnZlci9ub2RlX21vZHVsZXMgY29tbW9uL25vZGVfbW9kdWxlcyB0ZXN0cy9ub2RlX21vZHVsZXMgJiYgcG5wbSBpbnN0YWxsXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJub2RlanNcIixcbiAgICBcInR5cGVzY3JpcHRcIlxuICBdLFxuICBcImxpY2Vuc2VcIjogXCJHUEwtMy4wXCIsXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjYuMTguMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjE4LjFcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU2LjBcIixcbiAgICBcImVzbGludC1jb25maWctc3RhbmRhcmQtd2l0aC10eXBlc2NyaXB0XCI6IFwiXjQzLjAuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yOS4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLW5cIjogXCJeMTYuNi4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByb21pc2VcIjogXCJeNi4xLjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCI1LjMuM1wiXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvamltL0NvZGUvT1NTL3N1cnZpdnJvaS9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2ppbS9Db2RlL09TUy9zdXJ2aXZyb2kvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ppbS9Db2RlL09TUy9zdXJ2aXZyb2kvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBrZyBmcm9tIFwiLi4vcGFja2FnZS5qc29uXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbmltcG9ydCBwcm9kQ29uZmlnIGZyb20gXCIuL3ZpdGUvdml0ZS5wcm9kXCI7XG5pbXBvcnQgZGV2Q29uZmlnIGZyb20gXCIuL3ZpdGUvdml0ZS5kZXZcIjtcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcm1TeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBkaXJuYW1lLCByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XG5cbmNvbnN0IERJUk5BTUUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gICAgLy8gdGVtcG9yYXJ5IGhhY2sgdW50aWwgc3ZlbHRlIHJld3JpdGVcbiAgICBwcm9jZXNzLmVudiA9IHtcbiAgICAgICAgLi4ucHJvY2Vzcy5lbnYsXG4gICAgICAgIFZJVEVfQVBQX1ZFUlNJT046IHBrZy52ZXJzaW9uXG4gICAgfTtcblxuICAgIC8vIFNvIG91dHB1dCBkaXJlY3RvcnkgaXNuJ3QgaW5jbHVkZWQgKHRoYW5rcyBWaXRlKS5cbiAgICBpZiAoY29tbWFuZCA9PT0gXCJzZXJ2ZVwiICYmIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgICBpZiAoZXhpc3RzU3luYyhyZXNvbHZlKERJUk5BTUUsIFwiLi9kaXN0XCIpKSkgeyBybVN5bmMocmVzb2x2ZShESVJOQU1FLCBcIi4vZGlzdFwiKSwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pOyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbW1hbmQgPT09IFwic2VydmVcIiA/IGRldkNvbmZpZyA6IHByb2RDb25maWc7XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvamltL0NvZGUvT1NTL3N1cnZpdnJvaS9jbGllbnQvdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamltL0NvZGUvT1NTL3N1cnZpdnJvaS9jbGllbnQvdml0ZS92aXRlLnByb2QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamltL0NvZGUvT1NTL3N1cnZpdnJvaS9jbGllbnQvdml0ZS92aXRlLnByb2QudHNcIjtpbXBvcnQgeyBtZXJnZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi92aXRlLmNvbW1vblwiO1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG4gICAgZGVmaW5lOiB7XG4gICAgICAgIEFQSV9VUkw6IEpTT04uc3RyaW5naWZ5KFwiL2FwaVwiKVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKGNvbW1vbiwgY29uZmlnKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvamltL0NvZGUvT1NTL3N1cnZpdnJvaS9jbGllbnQvdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamltL0NvZGUvT1NTL3N1cnZpdnJvaS9jbGllbnQvdml0ZS92aXRlLmNvbW1vbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9qaW0vQ29kZS9PU1Mvc3Vydml2cm9pL2NsaWVudC92aXRlL3ZpdGUuY29tbW9uLnRzXCI7aW1wb3J0IHBrZyBmcm9tIFwiLi4vLi4vcGFja2FnZS5qc29uXCI7XG5cbmltcG9ydCB7IHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4sIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyXCI7XG5pbXBvcnQgeyBzcHJpdGVzaGVldCB9IGZyb20gXCJ2aXRlLXNwcml0ZXNoZWV0LXBsdWdpblwiO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG4gICAgYnVpbGQ6IHtcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBtYWluOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9pbmRleC5odG1sXCIpLFxuICAgICAgICAgICAgICAgIGNoYW5nZWxvZzogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vY2hhbmdlbG9nL2luZGV4Lmh0bWxcIiksXG4gICAgICAgICAgICAgICAgbmV3czogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vbmV3cy9pbmRleC5odG1sXCIpLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9ydWxlcy9pbmRleC5odG1sXCIpLFxuICAgICAgICAgICAgICAgIGVkaXRvcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vZWRpdG9yL2luZGV4Lmh0bWxcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHN2ZWx0ZSgpLFxuICAgICAgICBzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXG4gICAgICAgIFZpdGVJbWFnZU9wdGltaXplcih7XG4gICAgICAgICAgICB0ZXN0OiAvXFwuKHN2ZykkL2ksXG4gICAgICAgICAgICBsb2dTdGF0czogZmFsc2VcbiAgICAgICAgfSksXG4gICAgICAgIHNwcml0ZXNoZWV0KHtcbiAgICAgICAgICAgIHBhdHRlcm5zOiBbe1xuICAgICAgICAgICAgICAgIHJvb3REaXI6IFwicHVibGljL2ltZy9nYW1lXCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIG91dHB1dEZvcm1hdDogXCJwbmdcIixcbiAgICAgICAgICAgICAgICBtYXJnaW46IDgsXG4gICAgICAgICAgICAgICAgcmVtb3ZlRXh0ZW5zaW9uczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF0sXG5cbiAgICBkZWZpbmU6IHtcbiAgICAgICAgQVBQX1ZFUlNJT046IEpTT04uc3RyaW5naWZ5KGAke3BrZy52ZXJzaW9ufWApXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qaW0vQ29kZS9PU1Mvc3Vydml2cm9pL2NsaWVudC92aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9qaW0vQ29kZS9PU1Mvc3Vydml2cm9pL2NsaWVudC92aXRlL3ZpdGUuZGV2LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ppbS9Db2RlL09TUy9zdXJ2aXZyb2kvY2xpZW50L3ZpdGUvdml0ZS5kZXYudHNcIjtpbXBvcnQgeyBtZXJnZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi92aXRlLmNvbW1vblwiO1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG4gICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiXG5cbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgICAgcG9ydDogMzAwMCxcbiAgICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgICAgaG9zdDogXCIwLjAuMC4wXCJcbiAgICB9LFxuXG4gICAgZGVmaW5lOiB7XG4gICAgICAgIEFQSV9VUkw6IEpTT04uc3RyaW5naWZ5KFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaVwiKVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKGNvbW1vbiwgY29uZmlnKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsT0FBUztBQUFBLElBQ1QsWUFBYztBQUFBLElBQ2QsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osTUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gscUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FB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
