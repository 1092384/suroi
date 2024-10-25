import { Loots, type LootDefinition } from "@common/definitions/loots";
import { ColorStyles, styleText } from "@common/utils/ansiColoring";
import { NullString, type ObjectDefinition, type ReferenceTo } from "@common/utils/objectDefinitions";
import { weightedRandom } from "@common/utils/random";

import { LootTiers, type WeightedItem } from "../data/lootTables";
import { Config } from "../config";
import { GameConstants } from "@common/constants";

export const Logger = {
    log(...message: string[]): void {
        internalLog(message.join(" "));
    },
    warn(...message: string[]): void {
        internalLog(styleText("[WARNING]", ColorStyles.foreground.yellow.normal), message.join(" "));
    }
};

function internalLog(...message: string[]): void {
    const date = new Date();

    console.log(
        styleText(`[${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("en-US")}]`, ColorStyles.foreground.green.bright),
        message.join(" ")
    );
}

export function cleanUsername(name?: string | null): string {
    return (
        !name?.length
        || name.length > 16
        || Config.protection?.usernameFilters?.some(regex => regex.test(name))
        || /[^\x20-\x7E]/g.test(name) // extended ASCII chars
    )
        ? GameConstants.player.defaultName
        : name;
}

export class LootItem {
    constructor(
        public readonly idString: ReferenceTo<LootDefinition>,
        public readonly count: number
    ) {}
}

export function getLootTableLoot(loots: readonly WeightedItem[]): LootItem[] {
    let loot: LootItem[] = [];

    const items: Array<readonly WeightedItem[] | WeightedItem> = [];
    const weights: number[] = [];
    for (const item of loots) {
        items.push(
            item.spawnSeparately && (item.count ?? 1) > 1
                /**
                 * @author ei-pi
                 * A null-ish value would fail the conditional that this branch is contingent on.
                 */
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ? new Array<WeightedItem>(item.count!).fill(item)
                : item
        );
        weights.push(item.weight);
    }

    for (
        const selection of [weightedRandom<WeightedItem | readonly WeightedItem[]>(items, weights)].flat()
    ) {
        if ("tier" in selection) {
            loot = loot.concat(getLootTableLoot(LootTiers[selection.tier]));
            continue;
        }

        const item = selection.item;
        if (item === NullString) continue;
        loot.push(new LootItem(item, selection.spawnSeparately ? 1 : (selection.count ?? 1)));

        const definition = Loots.fromStringSafe(item);
        if (definition === undefined) {
            throw new ReferenceError(`Unknown loot item: ${item}`);
        }

        if ("ammoType" in definition && definition.ammoSpawnAmount) {
            const { ammoType, ammoSpawnAmount } = definition;

            if (ammoSpawnAmount > 1) {
                const halfAmount = ammoSpawnAmount / 2;
                loot.push(
                    new LootItem(ammoType, Math.floor(halfAmount)),
                    new LootItem(ammoType, Math.ceil(halfAmount))
                );
            } else {
                loot.push(new LootItem(ammoType, ammoSpawnAmount));
            }
        }
    }

    return loot;
}

export function getRandomIDString<
    T extends ObjectDefinition,
    Ref extends ReferenceTo<T> | typeof NullString
>(table: Record<Ref, number> | Ref): Ref {
    if (typeof table !== "object") return table;

    const items: Ref[] = [];
    const weights: number[] = [];
    for (const item in table) {
        items.push(item);
        weights.push(table[item]);
    }
    return weightedRandom(items, weights);
}

/**
 * Find and remove an element from an array.
 * @param array The array to iterate over.
 * @param value The value to check for.
 */
export function removeFrom<T>(array: T[], value: NoInfer<T>): void {
    const index = array.indexOf(value);
    if (index !== -1) array.splice(index, 1);
}

export const CARDINAL_DIRECTIONS = Array.from({ length: 4 }, (_, i) => i / 2 * Math.PI);
