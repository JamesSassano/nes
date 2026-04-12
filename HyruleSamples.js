"use strict";

import {Palette, Piece, TilePiece, Tile} from "./HyrulePieces.js";
import * as HyruleDungeons from "./HyruleDungeons.js";
import * as HyruleCaves from "./HyruleCaves.js";

function createBase() {
    const base = [];
    for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 11; y++) {
            base[y] ??= [];
            base[y][x] = [0, Tile.ground];
        }
    }
    base[ 0][ 0][1] = Tile.rock_se;
    base[10][ 0][1] = Tile.rock_ne;
    base[ 0][15][1] = Tile.rock_sw;
    base[10][15][1] = Tile.rock_nw;
    return base;
}

function addSand(base, yMin, yMax, xMin, xMax) {
    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            base[y][x][1] = Tile.ground_sand;
        }
    }
}

function addWater(base, yMin, yMax, xMin, xMax) {
    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            base[y][x][1] =
                   (x == xMin && y == yMin)
                 ? Tile.water_nw
                 : (x == xMin && y == yMax)
                 ? Tile.water_sw
                 : (x == xMax && y == yMin)
                 ? Tile.water_ne
                 : (x == xMax && y == yMax)
                 ? Tile.water_se
                 : Tile.water_c;
        }
    }
}

export function getMapRowData() {

    // Add sample pieces for each palette.

    const samplesDataGrid = Array.from({
        2: [
            null, null, Tile.rock_nw, Tile.rock_n, Tile.rock_ne, null, Tile.tree_nw, Tile.tree_n, Tile.tree_ne,
            null, Tile.dungeon_nw, Tile.dungeon_n1, Tile.dungeon_n2, Tile.dungeon_ne,
        ],
        3: [
            null, null, Tile.rock_sw, Tile.rock_s, Tile.rock_se, null, Tile.tree_sw, Tile.entrance_w, Tile.tree_se,
            null, Tile.dungeon_sw, Tile.entrance_w, Tile.entrance_e, Tile.dungeon_se,
        ],
        7: [
            null, Tile.water_nw, Tile.ground_water_nw, Tile.ground_water_ne, Tile.waterfall1, Tile.bridge, Tile.water_ne,
        ],
        8: [
            null, Tile.water_sw, Tile.ground_water_sw, Tile.ground_water_se, Tile.water_c, Tile.bridge, Tile.water_se,
            null, Tile.bush, Tile.ground, Tile.ground_sand, Tile.rock_boulder, Tile.steps, Tile.tomb, Tile.armos_statue,
        ],
        length: 15
    }, (value) => (value ?? []).map(tile => tile ? [0, tile] : tile));
    samplesDataGrid[ 7][ 5][2] = Tile.item_heart_container;

    const samples1 = [[Palette.forest],    samplesDataGrid];
    const samples2 = [[Palette.mountain],  samplesDataGrid];
    const samples3 = [[Palette.graveyard], samplesDataGrid];

    // Add sample enemies/sprites.

    const enemiesBase = createBase();
    addSand(enemiesBase, 0, 6, 9, 11);
    addWater(enemiesBase, 7, 10, 6, 9);

    enemiesBase[ 1][ 9][2] = Tile.leever_blue_slim;
    enemiesBase[ 1][11][2] = Tile.leever_blue;
    enemiesBase[ 2][ 1][2] = Tile.octorok_blue_e;
    enemiesBase[ 2][ 4][2] = Tile.tektite_blue;
    enemiesBase[ 2][ 7][2] = Tile.moblin_blue;
    enemiesBase[ 2][10][2] = Tile.leever_blue_sunk1;
    enemiesBase[ 2][13][2] = Tile.lynel_blue;
    enemiesBase[ 3][ 9][2] = Tile.leever_blue_sunk2;
    enemiesBase[ 4][11][2] = Tile.leever_red;
    enemiesBase[ 5][ 1][2] = Tile.octorok_red_e;
    enemiesBase[ 5][ 4][2] = Tile.tektite_red;
    enemiesBase[ 5][ 7][2] = Tile.moblin_red;
    enemiesBase[ 5][10][2] = Tile.leever_red_sunk1;
    enemiesBase[ 5][13][2] = Tile.lynel_red;
    enemiesBase[ 6][ 9][2] = Tile.leever_red_sunk2;
    enemiesBase[ 6][11][2] = Tile.leever_red_slim;
    enemiesBase[ 8][ 1][2] = Tile.armos_red_awake;
    enemiesBase[ 8][ 4][2] = Tile.ghini;
    enemiesBase[ 8][ 7][2] = Tile.zora;
    enemiesBase[ 8][10][2] = Tile.peahat;
    enemiesBase[ 8][13][2] = Tile.rock;
    enemiesBase[ 9][ 9][2] = Tile.peahat_water;
    enemiesBase[ 9][11][2] = Tile.peahat_slim;
    const enemies = [[Palette.mountain], enemiesBase];

    const charactersBase = createBase();
    addWater(charactersBase, 6, 9, 8, 11);

    charactersBase[ 2][ 2][2] = Tile.link_red;
    charactersBase[ 5][ 2][2] = Tile.link_blue;
    charactersBase[ 8][ 2][2] = Tile.link_green;

    charactersBase[ 2][ 5][2] = Tile.zelda_red;
    charactersBase[ 5][ 5][2] = Tile.zelda_blue;
    charactersBase[ 8][ 5][2] = Tile.zelda_green;

    charactersBase[ 3][10][2] = Tile.old_man;
    charactersBase[ 3][13][2] = Tile.old_woman;
    charactersBase[ 7][ 9][2] = Tile.fairy_center;
    charactersBase[ 7][13][2] = Tile.merchant;
    const characters = [[Palette.forest], charactersBase];

    function createItems(
        item1, item2, item3, item4, item5, item6,
        item7, item8, item9, item10, item11, item12) {
        const itemBase = createBase();

        itemBase[2][ 2][2] = item1;
        itemBase[2][ 5][2] = item2;
        itemBase[2][10][2] = item7;
        itemBase[2][13][2] = item8;

        itemBase[5][ 2][2] = item3;
        itemBase[5][ 5][2] = item4;
        itemBase[5][10][2] = item9;
        itemBase[5][13][2] = item10;

        itemBase[8][ 2][2] = item5;
        itemBase[8][ 5][2] = item6;
        itemBase[8][10][2] = item11;
        itemBase[8][13][2] = item12;

        return [[Palette.forest], itemBase];
    }

    const item1 = createItems(
        Tile.item_heart,
        Tile.item_heart_container,
        Tile.item_rupee_orange,
        Tile.item_rupee_blue,
        Tile.item_life_potion_blue,
        Tile.item_life_potion_red,
        Tile.item_clock,
        Tile.item_letter,
        Tile.item_bait,
        Tile.item_sword_green,
        Tile.item_white_sword,
        Tile.item_magical_sword,
    );

    const item2 = createItems(
        Tile.item_shield,
        Tile.item_magical_shield,
        Tile.item_boomerang,
        Tile.item_magical_boomerang,
        Tile.item_bomb,
        Tile.item_bow_green,
        Tile.item_arrow_green,
        Tile.item_silver_arrow,
        Tile.item_candle_blue,
        Tile.item_candle_red,
        Tile.item_ring_blue,
        Tile.item_ring_red,
    );
    [2, 5].forEach(x => item2[1][5][x][1] = item2[1][5][x][1].slice(0, -1));

    const item3 = createItems(
        Tile.item_power_bracelet,
        Tile.item_recorder,
        Tile.item_raft_green,
        Tile.item_stepladder,
        Tile.item_magical_rod,
        Tile.item_book_of_magic,
        Tile.item_key,
        Tile.item_magical_key,
        Tile.item_map,
        Tile.item_compass,
        Tile.item_triforce,
        Tile.item_triforce_sand,
    );

    const room1 = HyruleDungeons.makeRoom(null, 9, 0x1A, "shut",   "solid",  "solid",  "solid",  null, [
        [2,  2, Tile.blade_trap_nw],
        [2, 13, Tile.blade_trap_ne],
        [8,  2, Tile.blade_trap_sw],
        [8, 13, Tile.blade_trap_se],

        [4,  4, Tile.lanmola_body_red],
        [5,  4, Tile.lanmola_body_red],
        [6,  4, Tile.lanmola_body_red],
        [6,  5, Tile.lanmola_head_red, HyruleDungeons.baseOptions.base2x1],

        [2,  9, Tile.lanmola_head_blue],
        [2, 10, Tile.lanmola_body_blue],
        [2, 11, Tile.lanmola_body_blue],
        [3, 11, Tile.lanmola_body_blue],

        [5, 12, Tile.moldorm],
        [6, 12, Tile.moldorm],
        [6, 11, Tile.moldorm, HyruleDungeons.baseOptions.base2x1],
        [7, 10, Tile.moldorm],
    ]);

    const room2 = HyruleDungeons.makeRoom(null, 6, 0x13, "bomb",   "solid",  "solid",  "solid",  null, [
        [3,  3, Tile.vire],
        [5,  3, Tile.keese_blue],
        [7,  3, Tile.keese_red],

        [3,  6, Tile.zol_black],
        [4,  8, Tile.zol_dark_brown],
        [5,  6, Tile.zol_dark_green],
        [6,  8, Tile.zol_evergreen],
        [7,  6, Tile.zol_deep_gray],

        [3, 12, Tile.gel_black],
        [5, 12, Tile.gel_dark_slate],
        [7, 12, Tile.gel_navy],
    ]);

    const room3 = HyruleDungeons.makeRoom(null, 7, 0x1F, "locked", "solid",  "solid",  "solid",  "dark", [
        [3,  6, Tile.bubble_red],
        [3,  7, Tile.bubble_brown],
        [3,  8, Tile.bubble_blue],
        [3,  9, Tile.bubble_cyan],

        [5,  3, Tile.goriya_red],
        [5,  5, Tile.goriya_blue],

        [5, 10, Tile.darknut_red],
        [5, 12, Tile.darknut_blue],

        [7,  6, Tile.wizzrobe_red_e, HyruleDungeons.baseOptions.base1x2],
        [7,  8, Tile.wizzrobe_blue_w, HyruleDungeons.baseOptions.base1x2],

        [1,  3, Tile.wallmaster_n],
        [7, 14, Tile.wallmaster_e],
    ]);

    const room4 = HyruleDungeons.makeRoom(null, 2, 0x1E, "open",   "solid",  "solid",  "solid",  null, [
        [3,  3, Tile.gibdo_key],
        [5,  3, Tile.gibdo_bomb],
        [7,  3, Tile.gibdo],

        [3,  5, Tile.stalfos_key],
        [5,  5, Tile.stalfos_compass],
        [7,  5, Tile.stalfos],

        [3, 10, Tile.pols_voice_orange_red],
        [5, 10, Tile.pols_voice_orange_blue],
        [7, 10, Tile.pols_voice_orange_green],

        [3, 12, Tile.pols_voice_peach_red],
        [5, 12, Tile.pols_voice_peach_blue],
        [7, 12, Tile.pols_voice_peach_green],

        [2,  7, Tile.rope_w, HyruleDungeons.baseOptions.base2x2_center],
        [7,  7, Tile.like_like, HyruleDungeons.baseOptions.base2x2_center],
    ]);

    const boss1 = HyruleDungeons.makeRoom(null, 9, 0x28, "solid",  "solid",  "shut",   "solid",  null, [
        [3,   5, Tile.ganon, HyruleDungeons.baseOptions.base2x2_studs],
    ]);

    const boss2 = HyruleDungeons.makeRoom(null, 6, 0x05, "solid",  "solid",  "bomb",   "solid",  null, [
        [2,   7, Tile.gleeok4, HyruleDungeons.baseOptions.base2x2_studs],
        [4,   4, Tile.gleeok2, HyruleDungeons.baseOptions.base2x2_studs],
        [4,  10, Tile.gleeok3, HyruleDungeons.baseOptions.base2x2_studs],
    ]);

    const boss3 = HyruleDungeons.makeRoom(null, 3, 0x25, "solid",  "solid",  "locked", "solid",  null, [
        [3,  4, Tile.gohma_red],
        [6,  5, Tile.gohma_blue],

        [4,  9, Tile.manhandla],
        [6, 11, Tile.dodongo_w],
    ]);

    const boss4 = HyruleDungeons.makeRoom(null, 1, 0x04, "solid",  "solid",  "open",   "solid",  null, [
        [1,  2, Tile.patra_red, HyruleDungeons.baseOptions.wall1x2],
        [1,  4, Tile.patra_red, HyruleDungeons.baseOptions.wall1x2],
        [2,  1, Tile.patra_red],
        [2,  7, Tile.patra_red],
        [3,  4, Tile.patra_blue],
        [4,  1, Tile.patra_red],
        [4,  7, Tile.patra_red],
        [5,  3, Tile.patra_red],
        [5,  5, Tile.patra_red],

        [6,  7, Tile.digdogger, HyruleDungeons.baseOptions.base2x2_studs],
        [7,  5, Tile.digdogger_small],

        [5, 11, Tile.aquamentus],
    ]);

    const passageRoom = HyruleDungeons.makePassageRoom([]);
    const itemRoom = HyruleDungeons.makePassageRoom([], null);

    const cave1 = HyruleCaves.makeCave("H8");
    const cave2 = HyruleCaves.makeCave("J8");
    const cave3 = HyruleCaves.makeCave("E4");

    return [
        [
            samples1, boss1, boss2, boss3, boss4, passageRoom,
        ],
        [
            samples2, room1, room2, room3, room4, itemRoom,
        ],
        [
            samples3, enemies, cave1, cave2, cave3,
        ],
        [
            null, characters, item1, item2, item3,
        ],
    ];
}

export function getMiniMapRowData() {

    // Create a mini scene.

    const mini = [
        [
            [0, Tile.rock_s],
            [0, Tile.rock_s],
            [0, Tile.rock_s],
            [0, Tile.rock_s],
            [0, Tile.rock_s],
            [0, Tile.rock_s],
            [0, Tile.water_c],
        ],
        [
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.rock_s],
            [0, Tile.water_c],
        ],
        [
            [0, Tile.ground],
            [0, Tile.tree_nw],
            [0, Tile.tree_n],
            [0, Tile.tree_ne],
            [0, Tile.ground],
            [0, Tile.rock_s],
            [0, Tile.water_c],
        ],
        [
            [0, Tile.ground],
            [0, Tile.tree_sw],
            [0, Tile.entrance_w],
            [0, Tile.tree_se],
            [0, Tile.ground],
            [0, Tile.rock_s],
            [0, Tile.water_c],
        ],
        [
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.bridge],
        ],
        [
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.ground],
            [0, Tile.rock_n],
            [0, Tile.water_c],
        ],
    ];

    return [
        [
            [[Palette.mountain],  mini],
        ],
    ];
}

export function getRotationMapRowData() {
    return [[[
        [Palette.mountain],
        [
            // Symetric pieces that can be rotated to orient the logo on the stud.
            [
                [0, [new TilePiece(Piece.brick_1x1x5, 'primary', {})]],
                [0, [new TilePiece(Piece.brick_1x1x3, 'primary', {})]],
                [0, [new TilePiece(Piece.brick, 'primary', {})]],
                [0, [new TilePiece(Piece.plate, 'primary', {})]],
                [0, [new TilePiece(Piece.plate_round_dot, 'primary', {})]],
                [0, [new TilePiece(Piece.plate2x2, 'primary', {translateX: .5, translateZ: .5})]],
            ],
            // Ldraw and Studio differ on the initial rotation.
            [
                [0, [new TilePiece(Piece.brick_2_3rd_convex_corner, 'primary', {rotateY: 180})]],
                [0, [new TilePiece(Piece.brick_2_3rd_convex_corner, 'primary', {rotateY: 270})]],
            ],
            [
                [0, [new TilePiece(Piece.brick_2_3rd_convex_corner, 'primary', {rotateY: 90})]],
                [0, [new TilePiece(Piece.brick_2_3rd_convex_corner, 'primary', {rotateY: 0})]],
            ],
        ]
    ]]];
}
