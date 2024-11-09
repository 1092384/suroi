import { readFile, writeFile } from "node:fs/promises";
import { parse } from "hjson";
import { readdirSync, readFileSync } from "node:fs";
import { Guns, Melees, Throwables } from "@common/definitions";

export const REFERNCE_LANGUAGE = "en";

export const LANGUAGES_DIRECTORY = "../languages/";

const files = readdirSync(LANGUAGES_DIRECTORY).filter(file => file.endsWith(".hjson"));

const keyFilter = (key: string): boolean => (
    key !== "name"
    && key !== "flag"
    && key !== "mandatory"
    && key !== "no_space"
    && key !== "no_resize"
    && !Guns.hasString(key)
    && !Melees.hasString(key)
    && !Throwables.hasString(key)
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const ValidKeys = Object.keys(parse(readFileSync(`${LANGUAGES_DIRECTORY + REFERNCE_LANGUAGE}.hjson`, "utf8")))
    .filter(keyFilter);

export type TranslationManifest = {
    readonly name: string
    readonly flag: string
    readonly percentage: string
    /** Loading the language is required on client */
    readonly mandatory?: boolean
    readonly no_resize?: boolean
    readonly no_space?: boolean
};
export type TranslationsManifest = Record<string, TranslationManifest>;

export async function validateTranslations(): Promise<void> {
    let reportBuffer = `# Translation File Reports

This file is a report of all errors and missing keys in the translation files of this game. Last generated ${new Date(Date.now()).toUTCString()}

`;

    const parsedFiles = await Promise.all(files.filter(file => file !== `${REFERNCE_LANGUAGE}.hjson`)
        .map(async file => [file, parse(await readFile(LANGUAGES_DIRECTORY + file, "utf8"))] as [string, Record<string, string>]));

    for (const [filename, content] of parsedFiles) {
        const keys = Object.keys(content).filter(keyFilter);

        let languageReportBuffer = `## ${content.flag} ${content.name} (${Math.round(100 * keys.length / ValidKeys.length)}% Complete) - ${filename}\n\n`;

        // Find invalid keys
        languageReportBuffer += "### Invalid Keys\n\n";
        for (const key of keys) {
            if (ValidKeys.includes(key)) continue;
            languageReportBuffer += `- Key \`${key}\` is not a valid key\n`;
        }

        // Find undefined keys
        languageReportBuffer += "\n### Undefined Keys\n\n";
        for (const validKey of ValidKeys) {
            if (keys.includes(validKey)) continue;
            languageReportBuffer += `- Key \`${validKey}\` is not defined\n`;
        }

        reportBuffer += languageReportBuffer;
    }

    await writeFile("../README.md", reportBuffer);
    await buildTypings(ValidKeys);
}

export async function buildTranslations(): Promise<void> {
    const languages: Record<string, Record<string, string>> = {};

    await Promise.all(files.map(async file => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        languages[file.slice(0, -".hjson".length)] = parse(await readFile(LANGUAGES_DIRECTORY + file, "utf8"));
    }));

    const manifest: TranslationsManifest = {};

    const filePromises: Array<Promise<void>> = [];
    for (const [language, content] of Object.entries(languages)) {
        manifest[language] = {
            name: content.name,
            flag: content.flag,
            mandatory: Boolean(content.mandatory),
            no_resize: Boolean(content.no_resize),
            no_space: Boolean(content.no_space),
            percentage: `${Math.round(100 * Object.keys(content).filter(keyFilter).length / ValidKeys.length)}%`
        };
        filePromises.push(writeFile(`../../client/public/translations/${language}.json`, JSON.stringify(content)));
    }
    await Promise.all([...filePromises, writeFile("../../client/src/translationsManifest.json", JSON.stringify(manifest))]);
}

export async function buildTypings(keys: string[]): Promise<void> {
    let buffer = `// WARN: DO NOT EDIT THIS FILE! THIS FILE WAS GENERATED ON ${new Date(Date.now()).toUTCString()}\n`;
    buffer += "/* eslint-disable */\n";
    buffer += "export type TranslationKeys=";
    buffer += [
        ...keys,
        ...Guns.definitions.map(gun => gun.idString),
        ...Melees.definitions.map(melee => melee.idString),
        ...Throwables.definitions.map(throwable => throwable.idString)
    ].map(key => `"${key}"`).join("|");
    buffer += ";";

    await writeFile("../../client/src/typings/translations.ts", buffer);
}
