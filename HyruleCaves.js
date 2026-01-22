"use strict";

import {NESColor} from "./Colors.js";
import {Palette, Piece, TilePiece, Tile, Texts, makeTextFloor} from "./HyrulePieces.js";

const caveTemplates = {
    "item_sword": [
        [Texts.cave_item_take_this],
        [Tile.old_man],
        [[Tile.item_sword]],
    ],
    "item_white_sword": [
        [Texts.cave_item_master_using],
        [Tile.old_man],
        [[Tile.item_white_sword]]],
    "item_magical_sword": [
        [Texts.cave_item_master_using],
        [Tile.old_man],
        [[Tile.item_magical_sword]],
    ],
    "item_letter": [
        [Texts.cave_item_show_this],
        [Tile.old_man],
        [[Tile.item_letter_center]],
    ],
    "take_any": [
        [Texts.cave_take_any],
        [Tile.old_man],
        [[Tile.item_life_potion_red_center], [Tile.item_heart_container_center]],
    ],
    "take_road": [
        [Texts.cave_take_road],
        [Tile.old_man],
        [[Tile.item_road], [Tile.item_road], [Tile.item_road]],
    ],
    "secret_tree": [
        [Texts.cave_secret_tree],
        [Tile.old_man],
        [],
    ],
    "meet_grave": [
        [Texts.cave_meet_grave],
        [Tile.old_man],
        [],
    ],
    "secret_everybody_10": [
        [Texts.cave_secret_everybody],
        [Tile.moblin_red_center],
        [[Tile.item_rupee_orange_center, 10]],
    ],
    "secret_everybody_30": [
        [Texts.cave_secret_everybody],
        [Tile.moblin_red_center],
        [[Tile.item_rupee_orange_center, 30]],
    ],
    "secret_everybody_100": [
        [Texts.cave_secret_everybody],
        [Tile.moblin_red_center],
        [[Tile.item_rupee_orange_center, 100]],
    ],
    "shop_buy_medicine": [
        [Texts.cave_shop_buy_medicine],
        [Tile.old_woman, Tile.item_letter],
        [[Tile.item_life_potion_blue_center, 40], [Tile.item_life_potion_red_center, 68]],
    ],
    "shop_1": [
        [Texts.cave_shop_expensive],
        [Tile.keeper],
        [[Tile.item_key_center, 80], [Tile.item_ring_blue_center, 250], [Tile.item_bait_center, 60]],
    ],
    "shop_2": [
        [Texts.cave_shop_buy_somethin],
        [Tile.keeper],
        [[Tile.item_magical_shield_center, 130], [Tile.item_bomb_center, 20], [Tile.item_arrow_center, 80]],
    ],
    "shop_3": [
        [Texts.cave_shop_expensive],
        [Tile.keeper],
        [[Tile.item_magical_shield_center, 90], [Tile.item_bait_center, 100], [Tile.item_heart_center, 10]],
    ],
    "shop_4": [
        [Texts.cave_shop_buy_somethin],
        [Tile.keeper],
        [[Tile.item_magical_shield_center, 160], [Tile.item_key_center, 100], [Tile.item_candle_blue_center, 60]],
    ],
    "lets_play": [
        [Texts.cave_lets_play],
        [Tile.old_man],
        [[Tile.item_rupee_orange_center, -10], [Tile.item_rupee_orange_center, -10], [Tile.item_rupee_orange_center, -10]],
    ],
    "door_repair": [
        [Texts.cave_door_repair],
        [Tile.old_man],
        [[null, -20]],
    ],
    "up_up": [
        [Texts.cave_pay_talk, Texts.cave_aint_enough, Texts.cave_up_up],
        [Tile.old_woman],
        [[Tile.item_rupee_orange_center,  -5], [Tile.item_rupee_orange_center, -10], [Tile.item_rupee_orange_center, -20]],
    ],
    "maze": [
        [Texts.cave_pay_talk, Texts.cave_aint_enough, Texts.cave_youre_rich, Texts.cave_maze],
        [Tile.old_woman],
        [[Tile.item_rupee_orange_center, -10], [Tile.item_rupee_orange_center, -30], [Tile.item_rupee_orange_center, -50]],
    ],
}

const caveLocations = {
    B1: "take_any",
    D1: "take_any",
    E1: "shop_buy_medicine",
    H1: "take_any",
    K1: "item_white_sword",
    M1: "shop_4",
    N1: "shop_buy_medicine",
    O1: "item_letter",
    P1: "secret_everybody_100",
    A2: "lets_play",
    C2: "shop_3",
    D2: "secret_everybody_30",
    E2: "take_any",
    G2: "lets_play",
    K2: "up_up",
    M2: "secret_tree",
    N2: "take_road",
    O2: "take_any",
    P2: "lets_play",
    B3: "item_magical_sword",
    D3: "take_road",
    F3: "shop_2",
    G3: "shop_3",
    H3: "shop_buy_medicine",
    I3: "secret_everybody_30",
    M3: "take_any",
    N3: "secret_everybody_30",
    P3: "take_any",
    D4: "shop_buy_medicine",
    E4: "shop_1",
    N4: "secret_everybody_30",
    E5: "shop_2",
    G5: "shop_3",
    H5: "take_any",
    I5: "secret_everybody_30",
    J5: "take_road",
    K5: "shop_2",
    L5: "shop_buy_medicine",
    N5: "shop_3",
    O5: "secret_everybody_10",
    B6: "secret_everybody_10",
    G6: "secret_everybody_10",
    L6: "secret_everybody_10",
    O6: "shop_4",
    C7: "secret_everybody_100",
    D7: "take_any",
    E7: "shop_buy_medicine",
    G7: "shop_4",
    H7: "secret_everybody_30",
    I7: "take_any",
    K7: "take_any",
    L7: "secret_everybody_100",
    P7: "shop_2",
    A8: "maze",
    B8: "secret_everybody_30",
    F8: "meet_grave",
    G8: "lets_play",
    H8: "item_sword",
    I8: "shop_buy_medicine",
    J8: "take_road",
    L8: "take_any",
    M8: "lets_play",
    N8: "take_any",
}

export function getMapRowData() {

    const solid = Array(11).fill(0).map((_, screenY) =>
        Array(16).fill(0).map((_, screenX) => [1, Tile.rock_s]
    ));

    const makeWall = (isOuter, entranceWidth) =>
        Array(16).fill(0).map((_, wallIndex) =>
            (wallIndex >= 7 && wallIndex - entranceWidth < 7)
                ? Tile.cave_entrance
                : isOuter || (wallIndex == 0 || wallIndex == 15)
                    ? Tile.cave_wall_outer
                    : Tile.cave_wall_inner
        ).map(f => [0, f]);

    const caveWallNorthOuter = makeWall(true, 0);
    const caveWallNorthInner = makeWall(false, 0);
    const caveWallSouthInner1 = makeWall(false, 1);
    const caveWallSouthOuter1 = makeWall(true, 1);
    const caveWallSouthInner2 = makeWall(false, 2);
    const caveWallSouthOuter2 = makeWall(true, 2);

    function makeCave(screenName) {
        if (screenName in caveLocations) {
            const cave = makeTextFloor(0, ...caveTemplates[caveLocations[screenName]]);
            cave.forEach(caveRow => {
                caveRow.unshift([0, Tile.cave_wall_inner]);
                caveRow.unshift([0, Tile.cave_wall_outer]);
                caveRow.push([0, Tile.cave_wall_inner]);
                caveRow.push([0, Tile.cave_wall_outer]);
            });

            cave.unshift(caveWallNorthInner);
            cave.unshift(caveWallNorthOuter);
            const caveWallSouth = caveLocations[screenName] === "take_road"
                ? [caveWallSouthInner1, caveWallSouthOuter1]
                : [caveWallSouthInner2, caveWallSouthOuter2];
            cave.push(caveWallSouth[0]);
            cave.push(caveWallSouth[1]);

            return [[Palette.cave, Palette.text], cave];
        } else {
            return [[Palette.cave], solid];
        }
    }

    return Array(8).fill(0).map((_, gridY) =>
        Array(16).fill(0).map((_, gridX) => makeCave(String.fromCharCode(gridX + 65) + (gridY + 1)))
    );
}
