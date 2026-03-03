"use strict";

import {NESColor} from "./Colors.js";
import {Palette, Piece, TilePiece, Tile, Texts, makeTextFloor} from "./HyrulePieces.js";

const roomTemplates = {
    0x00: [ // empty
        "............",
        "............",
        "............",
        "............",
        "............",
        "............",
        "............",
    ],

    0x01: [ // bracket blocks
        "............",
        "............",
        "..B......B..",
        ".B........B.",
        "..B......B..",
        "............",
        "............",
    ],

    0x02: [ // four inner blocks
        "............",
        "............",
        "..B......B..",
        "............",
        "..B......B..",
        "............",
        "............",
    ],

    0x03: [ // four outer blocks
        "............",
        "..B......B..",
        "............",
        "............",
        "............",
        "..B......B..",
        "............",
    ],

    0x04: [ // right wedge blocks
        ".......BBBBB",
        ".........BBB",
        "..........BB",
        "............",
        "..........BB",
        ".........BBB",
        ".......BBBBB",
    ],

    0x05: [ // top wedge blocks
        "BBBBB..BBBBB",
        "BBBB....BBBB",
        "BB........BB",
        "............",
        "............",
        "..B......B..",
        "............",
    ],

    0x06: [ // v blocks with bottom corner statues
        "............",
        "............",
        "............",
        ".B........B.",
        "............",
        "...B....B...",
        "R..........L",
    ],

    0x07: [ // three horizontal block rows
        "............",
        ".BBBBBBBBBB.",
        "............",
        ".BBBBBBBBBB.",
        "............",
        ".BBBBBBBBBB.",
        "............",
    ],

    0x08: [ // backwards c blocks
        "............",
        ".BBBBBBBBBB.",
        "..........B.",
        "..........B.",
        "..........B.",
        ".BBBBBBBBBB.",
        "............",
    ],

    0x09: [ // square block ring
        "............",
        "..BBBBBBBB..",
        "..B......B..",
        "..B......B..",
        "..B......B..",
        "..BBBBBBBB..",
        "............",
    ],

    0x0A: [ // two center blocks
        "............",
        "............",
        "............",
        "....B..B....",
        "............",
        "............",
        "............",
    ],

    0x0B: [ // water pier
        ".ww.........",
        ".wwwwwwwwww.",
        ".wwwwwwwwww.",
        ".w.......ww.",
        ".ww......ww.",
        ".ww......ww.",
        ".ww......ww.",
    ],

    0x0C: [ // block maze
        ".B.B........",
        ".B.BBB.BBB..",
        ".B...B...BBB",
        ".B.B.B...B..",
        ".BBB.B...B..",
        ".....B.B.B.B",
        "..B....B...B",
    ],

    0x0D: [ // checkered blocks
        "............",
        ".B.B.BB.B.B.",
        "............",
        ".B.B.BB.B.B.",
        "............",
        ".B.B.BB.B.B.",
        "............",
    ],

    0x0E: [ // two vertical block strips
        "....B..B....",
        "....B..B....",
        "....B..B....",
        "....B..B....",
        "....B..B....",
        "....B..B....",
        "....B..B....",
    ],

    0x0F: [ // two horizontal block strips
        "............",
        "............",
        "BBBBBBBBBBBB",
        "............",
        "BBBBBBBBBBBB",
        "............",
        "............",
    ],

    0x10: [ // five block columns
        "............",
        ".B.B.BB.B.B.",
        ".B.B.BB.B.B.",
        ".B.B.BB.B.B.",
        ".B.B.BB.B.B.",
        ".B.B.BB.B.B.",
        "............",
    ],

    0x11: [ // zig zag blocks
        "..B........B",
        ".B...B....B.",
        "....B....B..",
        "...B....B...",
        "..B....B....",
        ".B....B...B.",
        "B........B..",
    ],

    0x12: [ // moat
        "............",
        ".wwwwwwwwww.",
        ".wwwwwwwwww.",
        ".ww......ww.",
        ".ww......ww.",
        ".wwww..wwww.",
        ".wwww..wwww.",
    ],

    0x13: [ // one vertical water strip
        "........w...",
        "........w...",
        "........w...",
        "........w...",
        "........w...",
        "........w...",
        "........w...",
    ],

    0x14: [ // big center island
        "............",
        ".wwwwwwwwww.",
        ".w........w.",
        ".w........w.",
        ".w........w.",
        ".wwwwwwwwww.",
        "............",
    ],

    0x15: [ // three ponds
        "............",
        ".www....www.",
        ".w........w.",
        ".w.wwwwww.w.",
        ".w........w.",
        ".www....www.",
        "............",
    ],

    0x16: [ // cross island
        "wwwww..wwwww",
        "w...wwww...w",
        "w.www..www.w",
        "..w......w..",
        "w.www..www.w",
        "w...wwww...w",
        "wwwww..wwwww",
    ],

    0x17: [ // water maze
        "wwwww..wwwww",
        "w...w....w.w",
        "w.w.w.ww.w.w",
        "..w.w..w.w..",
        "w.w.ww.w.w.w",
        "w.w....w...w",
        "wwwww..wwwww",
    ],

    0x18: [ // one horizontal water strip
        "............",
        "............",
        "wwwwwwwwwwww",
        "............",
        "............",
        "............",
        "............",
    ],

    0x19: [ // two horizontal water strips
        "............",
        "wwwwwwwwwwww",
        "............",
        "............",
        "............",
        "wwwwwwwwwwww",
        "............",
    ],

    0x1A: [ // diamond blocks with steps
        "............",
        "......B.....",
        ".....B.B....",
        "....B.e.B...",
        ".....B.B....",
        "......B.....",
        "............",
    ],

    0x1B: [ // right wedge blocks with steps
        "........BBBB",
        "........BBBB",
        ".........BBB",
        "...........e",
        ".........BBB",
        "........BBBB",
        "........BBBB",
    ],

    0x1C: [ // spiral blocks with steps
        "..........B.",
        ".BBBBBBBB.B.",
        ".B.....eB.B.",
        ".B...BBBB.B.",
        ".B........B.",
        ".BBBBBBBBBB.",
        "............",
    ],

    0x1D: [ // two block groups
        "............",
        "............",
        "..BB....BB..",
        "..BB....BB..",
        "..BB....BB..",
        "............",
        "............",
    ],

    0x1E: [ // center block group
        "............",
        "............",
        ".....BB.....",
        ".....BB.....",
        ".....BB.....",
        "............",
        "............",
    ],

    0x1F: [ // x blocks
        "............",
        ".BB......BB.",
        "............",
        ".....BB.....",
        "............",
        ".BB......BB.",
        "............",
    ],

    0x20: [ // block inersection
        "BBBBB..BBBBB",
        "BBBBBB.BBBBB",
        "BBBBBB.BBBBB",
        "......B.....",
        "BBBBBB.BBBBB",
        "BBBBBB.BBBBB",
        "BBBBB..BBBBB",
    ],

    0x21: [ // foyer
        "............",
        ".R..R..L..L.",
        "............",
        ".R..R..L..L.",
        ".....ss.....",
        ".R.sRssLs.L.",
        "...ssssss...",
    ],

    0x22: [ // one center block
        "............",
        "............",
        "............",
        ".....B......",
        "............",
        "............",
        "............",
    ],

    0x23: [ // center statues
        "............",
        "............",
        "............",
        "....R..L....",
        "............",
        "............",
        "............",
    ],

    0x24: [ // corner statues
        "R..........L",
        "............",
        "............",
        "............",
        "............",
        "............",
        "R..........L",
    ],

    0x25: [ // sand
        "ssssssssssss",
        "ssssssssssss",
        "ssssssssssss",
        "ssssssssssss",
        "ssssssssssss",
        "ssssssssssss",
        "ssssssssssss",
    ],

    0x26: [ // solid black/abyss
        "HHHHHHHHHHHH",
        "HHHHHHHHHHHH",
        "HHHHHHHHHHHH",
        "HHHHHHHHHHHH",
        "HHHHHHHHHHHH",
        "HHHHHHHHHHHH",
        "HHHHHHHHHHHH",
    ],

    0x27: [ // zelda/throne
        "BBBBBBBBBBBB",
        "B...BHHB...B",
        "B.BBHHHHBB.B",
        "B.BBHHHHBB.B",
        "B...R..L...B",
        "B..........B",
        "B.R......L.B",
    ],

    0x28: [ // skull
        "RHH......HHL",
        "HH..H..H..HH",
        "HH.HH..HH.HH",
        "HH.HH..HH.HH",
        "HH...HH...HH",
        "HHHH....HHHH",
        "RHHH....HHHL",
    ],

    0x29: [ // triforce
        "............",
        ".BBBBBBBBBB.",
        ".B..R..L..B.",
        ".B.R....L.B.",
        ".B........B.",
        ".BBBB..BBBB.",
        "............",
    ],

    // Samples
    0x30: [ // foyer + water
        ".wwwwwwwwww.",
        ".R..R..L..L.",
        "............",
        ".R..R..L..L.",
        ".....ss.....",
        ".R.sRssLs.L.",
        "...ssssss...",
    ],
};

const floorTileMap = {
    ".": Tile.dungeon_floor,
    "s": Tile.dungeon_sand,
    "e": Tile.dungeon_entrance,
    "w": Tile.dungeon_water,
    "B": Tile.dungeon_block,
    "R": Tile.dungeon_statue_looking_right,
    "L": Tile.dungeon_statue_looking_left,
    "H": Tile.dungeon_hole,
};

const doorMap = {
    solid: {
        n: {outer: Tile.wall_outer_door_n, inner: Tile.wall_inner_door_solid_ns},
        s: {outer: Tile.wall_outer_door_s, inner: Tile.wall_inner_door_solid_ns},
        e: {outer: Tile.wall_outer_door_e, inner: Tile.wall_inner_door_solid_ew},
        w: {outer: Tile.wall_outer_door_w, inner: Tile.wall_inner_door_solid_ew},
    },
    open: {
        n: {outer: Tile.wall_outer_door_n, inner: Tile.wall_inner_door_open_ns},
        s: {outer: Tile.wall_outer_door_s, inner: Tile.wall_inner_door_open_ns},
        e: {outer: Tile.wall_outer_door_e, inner: Tile.wall_inner_door_open_ew},
        w: {outer: Tile.wall_outer_door_w, inner: Tile.wall_inner_door_open_ew},
    },
    locked: {
        n: {outer: Tile.wall_outer_door_n, inner: Tile.wall_inner_door_locked_n},
        s: {outer: Tile.wall_outer_door_s, inner: Tile.wall_inner_door_locked_s},
        e: {outer: Tile.wall_outer_door_e, inner: Tile.wall_inner_door_locked_e},
        w: {outer: Tile.wall_outer_door_w, inner: Tile.wall_inner_door_locked_w},
    },
    bomb: {
        n: {outer: Tile.wall_outer_door_n, inner: Tile.wall_inner_door_bomb_n},
        s: {outer: Tile.wall_outer_door_s, inner: Tile.wall_inner_door_bomb_s},
        e: {outer: Tile.wall_outer_door_e, inner: Tile.wall_inner_door_bomb_e},
        w: {outer: Tile.wall_outer_door_w, inner: Tile.wall_inner_door_bomb_w},
    },
    shut: {
        n: {outer: Tile.wall_outer_door_n, inner: Tile.wall_inner_door_shut_n},
        s: {outer: Tile.wall_outer_door_s, inner: Tile.wall_inner_door_shut_s},
        e: {outer: Tile.wall_outer_door_e, inner: Tile.wall_inner_door_shut_e},
        w: {outer: Tile.wall_outer_door_w, inner: Tile.wall_inner_door_shut_w},
    },
};

const polarWallMap = {
    "outer": {capW: Tile.wall_outer_cap_w, capE: Tile.wall_outer_cap_e, span: Tile.wall_outer_ns},
    "inner": {capW: Tile.wall_inner_cap_w, capE: Tile.wall_inner_cap_e, span: Tile.wall_inner_ns},
};

const addPolarWallMap = {
    n: (roomData, wall) => roomData.unshift(wall),
    s: (roomData, wall) => roomData.push(wall),
};

class LevelData {
    constructor(elevation, colorLight, colorMedium, colorDark, colorWater, name) {
        this.elevation = elevation;
        this.name = name;

        const defaultPaletteOuter = new Palette(colorMedium,     colorDark,          colorLight);
        const defaultPaletteInner = new Palette(colorMedium,     colorWater,         colorLight);

        const darkPaletteOuter    = new Palette(colorDark,       colorDark,          colorMedium);
        const darkPaletteInner    = new Palette(colorDark,       colorMedium,        colorWater);

        const sandPaletteInner    = new Palette(NESColor.orange, NESColor.bubblegum, NESColor.red);

        this.paletteTypes = {
            defaultPalette: [defaultPaletteOuter, defaultPaletteInner],
            dark:           [darkPaletteOuter,    darkPaletteInner],
            darkOuter:      [darkPaletteOuter,    defaultPaletteInner],
            dim:            [defaultPaletteOuter, defaultPaletteOuter],
            sand:           [defaultPaletteOuter, sandPaletteInner],
            text:           [defaultPaletteOuter, Palette.text],
        };
    }

    getRoomPaletts(paletteType) {
        return this.paletteTypes[paletteType] || this.paletteTypes["defaultPalette"];
    }
}

const levelDataMap = {
    1: new LevelData(0, NESColor.cyan,       NESColor.teal,         NESColor.dark_slate, NESColor.blue,       "Eagle"),
    2: new LevelData(0, NESColor.steel_blue, NESColor.blue,         NESColor.navy,       NESColor.red,        "Crescent"),
    3: new LevelData(3, NESColor.seafoam,    NESColor.forest_green, NESColor.evergreen,  NESColor.red,        "Manji"),
    4: new LevelData(3, NESColor.gold,       NESColor.olive,        NESColor.dark_brown, NESColor.blue,       "Snake"),
    5: new LevelData(3, NESColor.lime,       NESColor.green,        NESColor.dark_green, NESColor.red,        "Lizard"),
    6: new LevelData(0, NESColor.gold,       NESColor.olive,        NESColor.dark_brown, NESColor.red,        "Dragon"),
    7: new LevelData(3, NESColor.lime,       NESColor.green,        NESColor.dark_green, NESColor.blue,       "Demon"),
    8: new LevelData(0, NESColor.white,      NESColor.light_gray,   NESColor.deep_gray,  NESColor.steel_blue, "Lion"),
    9: new LevelData(0, NESColor.white,      NESColor.light_gray,   NESColor.deep_gray,  NESColor.red,        "Death Mountain"),
};

// Raises a stack so that every piece above does not need to maintain translateZ.
const raiser2Tile = [new TilePiece(new Piece(null, 2,  2, null, "raiser2"), NESColor.primary, {})];

const roomTexts = {
    "01,01": [[Texts.dungeon_walk_waterfall],  [Tile.old_man], []],
    "01,12": [[Texts.dungeon_fairies_dont],    [Tile.old_man], []],
    "02,06": [[Texts.dungeon_secret_arrow],    [Tile.old_man], []],
    "02,08": [[Texts.dungeon_more_bombs],      [Tile.old_man], [[Tile.item_rupee_orange_center, -100]]],
    "02,16": [[Texts.dungeon_dodongo_smoke],   [Tile.old_man], []],
    "03,12": [[Texts.dungeon_sword_waterfall], [Tile.old_man], []],
    "05,02": [[Texts.dungeon_eastmost_secret], [Tile.old_man], []],
    "07,08": [[Texts.dungeon_diggogger_hates], [Tile.old_man], []],
    "07,11": [[Texts.dungeon_gohma_eyes],      [Tile.old_man], []],
    "09,03": [[Texts.dungeon_skull_secret],    [Tile.old_man], []],
    "09,07": [[Texts.dungeon_next_room],       [Tile.old_man], []],
    "11,09": [[Texts.dungeon_grumble],         [Tile.moblin_red_center], []],
    "12,12": [[Texts.dungeon_10th_enemy],      [Tile.old_man], []],
    "12,14": [[Texts.dungeon_spectacle_rock],  [Tile.old_man], []],
    "13,04": [[Texts.dungeon_patra_map],       [Tile.old_man], []],
    "13,09": [[Texts.dungeon_more_bombs],      [Tile.old_man], [[Tile.item_rupee_orange_center, -100]]],
    "14,12": [[Texts.dungeon_tip_nose],        [Tile.old_man], []],
    "15,07": [[Texts.dungeon_have_triforce],   [Tile.old_man], []],
};

function makeBoxTile(rowIndex, tileElevation, tile) {
    const pieceWidth = 20;
    const plateHeight = 8;

    return (rowIndex === 9 ? [] : [
        new TilePiece(Piece.box, NESColor.primary, {
            scaleX: pieceWidth / 2,
            scaleY: plateHeight * (9 + tileElevation),
            scaleZ: pieceWidth / 2,
        })
    ]).concat(tile);
}

function makePassageRoom(keeses) {
    const rows = [
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.ground, Tile.steps,  Tile.ground, Tile.ground, Tile.ground, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.steps,  Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.ground, Tile.steps,  Tile.ground, Tile.ground, Tile.ground, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.steps,  Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
    ].map((row, rowIndex) => row.map(tile => [
        -rowIndex,
        makeBoxTile(rowIndex, -rowIndex, tile)
    ]));
    keeses.forEach(keesePosition => {
        rows[keesePosition[0]][keesePosition[1]][2] = Tile.keese_blue;
    });
    return [[new Palette(NESColor.light_gray, NESColor.dark_gray, NESColor.black)], rows];
}

function makeItemRoom(item, keeses) {
    const rows = [
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.steps,  Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.ground, Tile.steps,  Tile.ground, Tile.ground, Tile.ground, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.steps,  Tile.ground, Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.ground, Tile.steps,  Tile.ground, Tile.ground, Tile.ground, Tile.ground,
            Tile.ground, Tile.ground, Tile.ground, Tile.steps,  Tile.ground, Tile.ground, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
        [
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
            Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s, Tile.rock_s,
        ],
    ].map((row, rowIndex) => row.map((tile, columnIndex) => {
        const elevation = ((rowIndex === 2 || rowIndex === 3) && tile === Tile.ground) ? -4 : -rowIndex;
        return [
            elevation,
            makeBoxTile(rowIndex, elevation, tile),
            (rowIndex === 3 && columnIndex === 8) ? item : null
        ];
    }));
    keeses.forEach(keesePosition => {
        rows[keesePosition[0]][keesePosition[1]][2] = Tile.keese_blue;
    });
    return [[new Palette(NESColor.light_gray, NESColor.dark_gray, NESColor.black)], rows];
}

export function getMapRowData() {
    function makeRoom(position, levelNumber, roomTemplateIndex, doorN, doorE, doorS, doorW, paletteType, sprites) {
        const texts = roomTexts[position];
        const elevation = levelDataMap[levelNumber].elevation;

        const roomData = texts
            ? makeTextFloor(elevation, ...texts)
            : roomTemplates[roomTemplateIndex].map(row => {
                return row.split("").map(code => [elevation, floorTileMap[code]]);
        });

        function makeWallEdge(rowIndex) {
            roomData[rowIndex].unshift([elevation, Tile.wall_outer_ew], [elevation, Tile.wall_inner_ew]);
            roomData[rowIndex].push(   [elevation, Tile.wall_inner_ew], [elevation, Tile.wall_outer_ew]);
        }

        function makeWallEquatorial(doorW, doorE) {
            roomData[3].unshift([elevation, doorMap[doorW].w.outer], [elevation, doorMap[doorW].w.inner]);
            roomData[3].push(   [elevation, doorMap[doorE].e.inner], [elevation, doorMap[doorE].e.outer]);
        }

        function makeWallPolar(pole, side) {
            const wall = [];
            const wallSpan = raiser2Tile.concat(polarWallMap[side].span);

            wall.push([elevation, polarWallMap[side].capW]);
            for (let i = 0; i < 13; i++) {
                if (i === 6) {
                    wall.push([elevation, doorMap["n" === pole ? doorN : doorS][pole][side]]);
                } else {
                    wall.push([elevation, wallSpan]);
                }
            }
            wall.push([elevation, []]);
            wall.push([elevation, polarWallMap[side].capE]);

            addPolarWallMap[pole](roomData, wall);
        }

        for (let i = 0; i < 7; i++) {
            if (i === 3) {
                makeWallEquatorial(doorW, doorE);
            } else {
                makeWallEdge(i);
            }
        }

        makeWallPolar("n", "inner");
        makeWallPolar("n", "outer");
        makeWallPolar("s", "inner");
        makeWallPolar("s", "outer");

        for (const [rowIndex, columnIndex, sprite, baseOptions] of sprites) {
            // Special wallmaster replacement.
            if ([Tile.wallmaster_n, Tile.wallmaster_e, Tile.wallmaster_s, Tile.wallmaster_w].includes(sprite)) {
                // valid:
                // north/south row:   1 || 9, col: 2-6, 8-12
                // west/east   row: 2-4, 6-8, col:   1 || 14
                roomData[rowIndex][columnIndex][1] = roomData[rowIndex][columnIndex][1].toSpliced(1, 1, ...sprite);
            } else {
                if (baseOptions) {
                    const color = roomData[rowIndex][columnIndex][1].at(-1).color;
                    for (let row = rowIndex; row < rowIndex + baseOptions["rows"]; row++) {
                        for (let column = columnIndex; column < columnIndex + baseOptions["columns"]; column++) {
                            roomData[row][column][1] = roomData[row][column][1].slice(0, -1);
                        }
                    }
                    if (baseOptions.newTilePiece) {
                        roomData[rowIndex][columnIndex][1].push(baseOptions.newTilePiece(color));
                    }
                }
                // Special flame replacement to create a hole to allow the flame to go all the way down.
                // (Flame with baseOptions is already a jumper with a hole).
                else if (sprite === Tile.dungeon_flame && !baseOptions) {
                    roomData[rowIndex][columnIndex][1] = Tile.dungeon_floor_stud;
                }
                roomData[rowIndex][columnIndex].push(Tile.transformTile(sprite, baseOptions?.spriteTransformOptions || {}));
            }
        }

        return [levelDataMap[levelNumber].getRoomPaletts(paletteType), roomData];
    }

    const drop1x1 = {
        rows: 1,
        columns: 1,
        newTilePiece: null,
        spriteTransformOptions: null
    };
    const wall1x2 = {
        rows: 1,
        columns: 2,
        newTilePiece: color => new TilePiece(Piece.plate_center_stud, color, {translateX: 1}),
        spriteTransformOptions: {translateX: 1},
    };
    const base1x2 = {
        rows: 1,
        columns: 2,
        newTilePiece: color => new TilePiece(Piece.plate_center_stud, color, {translateX: .5}),
        spriteTransformOptions: {translateX: .5},
    };
    const base2x1 = {
        rows: 2,
        columns: 1,
        newTilePiece: color => new TilePiece(Piece.plate_center_stud, color, {translateY: .5, rotateY: 90}),
        spriteTransformOptions: {translateY: .5},
    };
    const base2x2_center = {
        rows: 2,
        columns: 2,
        newTilePiece: color => new TilePiece(Piece.plate2x2_center_stud, color, {translateX: .5, translateY: .5}),
        spriteTransformOptions: {translateX: .5, translateY: .5},
    };

    const base2x2_studs = {
        rows: 2,
        columns: 2,
        newTilePiece: color => new TilePiece(Piece.plate2x2, color, {translateX: .5, translateY: .5}),
        spriteTransformOptions: {translateX: .5, translateY: .5},
    };

    return [
        [
            /* room: 01,01 */ makeRoom("01,01", 4, 0x26, "solid",  "locked", "open",   "solid",  "text", []),
            /* room: 01,02 */ makeRoom("01,02", 4, 0x16, "solid",  "open",   "bomb",   "locked", "dark", [
                [3,  3, Tile.keese_blue, base2x1],
                [3,  8, Tile.keese_blue, base1x2],
                [4,  8, Tile.item_key],
                [4,  7, Tile.keese_blue],
                [5, 12, Tile.keese_blue, base1x2],
                [6,  8, Tile.keese_blue],
                [6, 11, Tile.keese_blue],
                [7, 11, Tile.keese_blue, base1x2],
                [7, 13, Tile.keese_blue],

            ]),
            /* room: 01,03 */ makeRoom("01,03", 4, 0x01, "solid",  "solid",  "open",   "open",   "dark", [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [5,  4, Tile.trap_w],
                [5, 11, Tile.trap_e],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 01,04 */ makeRoom("01,04", 4, 0x29, "solid",  "solid",  "open",   "solid",  "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 01,05 */ [[], []],
            /* room: 01,06 */ makeRoom("01,06", 5, 0x22, "solid",  "locked", "solid",  "solid",  null  , [
                [3,  3, Tile.darknut_blue],
                [3,  7, Tile.darknut_blue, base2x1],
                [4,  5, Tile.darknut_blue, base1x2],
                [6,  3, Tile.darknut_blue, base2x1],
                [6,  5, Tile.darknut_blue, base1x2],
                [6,  7, Tile.darknut_blue, base1x2],
            ]),
            /* room: 01,07 */ makeRoom("01,07", 5, 0x1A, "solid",  "solid",  "locked", "locked", null  , [
            ]),
            /* room: 01,08 */ [[], []],
            /* room: 01,09 */ [[], []],
            /* room: 01,10 */ makeRoom("01,10", 6, 0x0A, "solid",  "bomb",   "locked", "solid",  null  , [
                [3,  4, Tile.wizzrobe_blue_e, base1x2],
                [5,  2, Tile.wizzrobe_red_w],
                [6,  7, Tile.wizzrobe_blue_e],
                [7,  5, Tile.wizzrobe_blue_e],
                [8, 13, Tile.wizzrobe_red_n],
            ]),
            /* room: 01,11 */ makeRoom("01,11", 6, 0x0A, "solid",  "bomb",   "shut",   "bomb",   null  , [
                [3,  2, Tile.bubble_blue],
                [3,  7, Tile.like_like, base2x1],
                [4,  5, Tile.zol_dark_brown, base1x2],
                [6,  5, Tile.zol_dark_brown],
                [6,  7, Tile.like_like],
                [7,  3, Tile.bubble_blue, base2x1],
            ]),
            /* room: 01,12 */ makeRoom("01,12", 6, 0x26, "solid",  "solid",  "open",   "bomb",   "text", [
            ]),
            /* room: 01,13 */ makeRoom("01,13", 6, 0x29, "solid",  "solid",  "open",   "solid",  "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 01,14 */ makeRoom("01,14", 2, 0x29, "solid",  "open",   "solid",  "solid",  "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 01,15 */ makeRoom("01,15", 2, 0x25, "solid",  "solid",  "open",   "shut",   null  , [
                [5,  5, Tile.dodongo_e],
                [5,  8, Tile.item_heart_container],
            ]),
            /* room: 01,16 */ [[], []],
        ], [
            /* room: 02,01 */ makeRoom("02,01", 4, 0x06, "shut",   "bomb",   "shut",   "solid",  "dim" , [
                [4,  5, Tile.manhandla],
            ]),
            /* room: 02,02 */ makeRoom("02,02", 4, 0x26, "bomb",   "bomb",   "bomb",   "bomb",   null  , [
                [3,  7, Tile.item_rupee_orange, base1x2],
                [4,  7, Tile.item_rupee_orange],
                [4,  8, Tile.item_rupee_orange],
                [5,  6, Tile.item_rupee_orange],
                [5,  7, Tile.item_rupee_orange],
                [5,  8, Tile.item_rupee_orange],
                [5,  9, Tile.item_rupee_orange],
                [6,  7, Tile.item_rupee_orange],
                [6,  8, Tile.item_rupee_orange],
                [7,  7, Tile.item_rupee_orange, base1x2],
            ]),
            /* room: 02,03 */ makeRoom("02,03", 4, 0x0A, "open",   "shut",   "solid",  "bomb",   null  , [
                [3,  5, Tile.vire],
                [3,  8, Tile.vire],
                [3, 11, Tile.vire, base2x1],
                [5,  8, Tile.vire],
                [7,  5, Tile.vire],
            ]),
            /* room: 02,04 */ makeRoom("02,04", 4, 0x05, "shut",   "solid",  "solid",  "shut",   null  , [
                [2,   7, Tile.gleeok2, base2x2_studs],
                [7,  12, Tile.item_heart_container, base2x2_center],
            ]),
            /* room: 02,05 */ makeRoom("02,05", 5, 0x29, "solid",  "solid",  "open",   "solid",  "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 02,06 */ makeRoom("02,06", 5, 0x26, "solid",  "solid",  "bomb",   "solid",  "text", [
            ]),
            /* room: 02,07 */ makeRoom("02,07", 5, 0x18, "locked", "bomb",   "solid",  "solid",  null  , [
                [5,  7, Tile.keese_blue],
                [6,  6, Tile.keese_blue],
                [6,  6, Tile.keese_blue],
                [6,  8, Tile.item_key],
                [6,  9, Tile.keese_blue],
                [7,  3, Tile.keese_blue],
                [7, 12, Tile.keese_blue],
                [8,  5, Tile.keese_blue],
                [8, 10, Tile.keese_blue],
            ]),
            /* room: 02,08 */ makeRoom("02,08", 5, 0x26, "solid",  "solid",  "solid",  "bomb",   "text", [
            ]),
            /* room: 02,09 */ makeRoom("02,09", 6, 0x05, "solid",  "shut",   "shut",   "solid",  null  , [
                [2,  7, Tile.gleeok3, base2x2_studs],
            ]),
            /* room: 02,10 */ makeRoom("02,10", 6, 0x13, "locked", "open",   "locked", "open",   null  , [
                [3,  5, Tile.zol_dark_brown],
                [3,  8, Tile.like_like],
                [4, 11, Tile.bubble_blue, base2x1],
                [4, 13, Tile.zol_dark_brown],
                [5,  8, Tile.item_map],
                [6, 11, Tile.bubble_blue, base2x1],
                [8,  4, Tile.like_like],
            ]),
            /* room: 02,11 */ makeRoom("02,11", 6, 0x18, "open",   "open",   "solid",  "open",   "dark", [
                [2,  5, Tile.wizzrobe_red_e],
                [4,  5, Tile.wizzrobe_red_e],
                [5,  8, Tile.item_key],
                [6,  2, Tile.wizzrobe_red_e],
                [6,  7, Tile.wizzrobe_red_w],
                [6, 10, Tile.wizzrobe_red_e],
                [8,  5, Tile.wizzrobe_red_n],
            ]),
            /* room: 02,12 */ makeRoom("02,12", 6, 0x03, "shut",   "solid",  "solid",  "open",   null  , [
                [3,  8, Tile.like_like, base2x1],
                [4,  9, Tile.wizzrobe_blue_w],
                [5,  4, Tile.wizzrobe_red_e],
                [5, 10, Tile.like_like, base2x1],
                [5, 13, Tile.wizzrobe_red_e],
                [6,  5, Tile.bubble_blue, base2x1],
                [6,  7, Tile.wizzrobe_blue_w],
                [7, 12, Tile.like_like, base1x2],
            ]),
            /* room: 02,13 */ makeRoom("02,13", 6, 0x06, "shut",   "solid",  "open",   "solid",  "dim" , [
                [3,  9, Tile.gohma_red],
                [5,  8, Tile.item_heart_container],
            ]),
            /* room: 02,14 */ makeRoom("02,14", 6, 0x1B, "solid",  "solid",  "open",   "solid",  null  , [
                [2,  7, Tile.bubble_blue, base2x1],
                [5,  4, Tile.like_like],
                [5,  9, Tile.like_like, base2x1],
                [5, 10, Tile.zol_dark_brown, base2x1],
                [7,  4, Tile.zol_dark_brown],
                [7,  6, Tile.bubble_blue],
            ]),
            /* room: 02,15 */ makeRoom("02,15", 2, 0x0D, "shut",   "bomb",   "shut",   "solid",  null  , [
                [2,  6, Tile.goriya_red],
                [2,  8, Tile.goriya_red, base1x2],
                [2, 13, Tile.item_bomb],
                [3,  6, Tile.goriya_red],
                [4,  9, Tile.goriya_red, base2x1],
                [6,  6, Tile.goriya_red],
            ]),
            /* room: 02,16 */ makeRoom("02,16", 2, 0x26, "solid",  "solid",  "open",   "bomb",   "text", [
            ]),
        ], [
            /* room: 03,01 */ makeRoom("03,01", 4, 0x15, "open",   "open",   "locked", "solid",  null  , [
                [2,  4, Tile.vire],
                [2, 11, Tile.vire],
                [3,  8, Tile.vire, base2x1],
                [6,  4, Tile.vire],
                [6,  9, Tile.vire],
            ]),
            /* room: 03,02 */ makeRoom("03,02", 4, 0x12, "bomb",   "solid",  "locked", "open",   "dark", [
                [2,  3, Tile.gel_black],
                [2, 12, Tile.gel_black],
                [2, 13, Tile.gel_black],
                [5,  9, Tile.gel_black],
                [6,  8, Tile.gel_black, base1x2],
                [8, 13, Tile.item_map],
            ]),
            /* room: 03,03 */ makeRoom("03,03", 1, 0x1A, "solid",  "locked", "solid",  "solid",  null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 03,04 */ makeRoom("03,04", 1, 0x15, "solid",  "solid",  "locked", "locked", null  , [
                [2,  9, Tile.goriya_red, base1x2],
                [3,  8, Tile.item_key],
                [4,  8, Tile.goriya_red, base1x2],
                [6, 10, Tile.goriya_red, base1x2],
            ]),
            /* room: 03,05 */ makeRoom("03,05", 5, 0x24, "shut",   "locked", "open",   "solid",  "dim" , [
                [3,  8, Tile.item_heart_container],
                [4,  5, Tile.digdogger, base2x2_center],
            ]),
            /* room: 03,06 */ makeRoom("03,06", 5, 0x07, "bomb",   "open",   "solid",  "locked", null  , [
                [2, 10, Tile.pols_voice_orange_green],
                [4,  2, Tile.pols_voice_orange_green],
                [4,  5, Tile.pols_voice_orange_green],
                [6,  6, Tile.pols_voice_orange_green, base1x2],
                [8, 10, Tile.pols_voice_orange_green],
            ]),
            /* room: 03,07 */ makeRoom("03,07", 5, 0x14, "solid",  "locked", "solid",  "open",   null  , [
                [2, 10, Tile.gibdo],
                [4,  7, Tile.gibdo],
                [5,  7, Tile.gibdo, base2x1],
                [5,  5, Tile.gibdo, base2x1],
                [6,  8, Tile.item_key],
                [8, 10, Tile.gibdo],
            ]),
            /* room: 03,08 */ makeRoom("03,08", 5, 0x15, "solid",  "solid",  "open",   "locked", "dark", [
                [4,  4, Tile.gibdo, base2x1],
                [4,  6, Tile.gibdo, base1x2],
                [4,  9, Tile.keese_blue, base1x2],
                [4, 11, Tile.pols_voice_orange_green],
                [4, 13, Tile.pols_voice_orange_green],
                [6,  8, Tile.item_key],
                [7, 11, Tile.keese_blue, base1x2], // todo: base over water.
            ]),
            /* room: 03,09 */ makeRoom("03,09", 6, 0x0D, "open",   "bomb",   "shut",   "solid",  null  , [
                [2,  5, Tile.wizzrobe_blue_e, base1x2],
                [2,  9, Tile.wizzrobe_blue_w, base1x2],
                [2, 13, Tile.item_rupee_blue],
                [4,  8, Tile.wizzrobe_blue_w, base1x2],
                [5,  6, Tile.wizzrobe_red_e],
                [8, 11, Tile.wizzrobe_red_w],
            ]),
            /* room: 03,10 */ makeRoom("03,10", 6, 0x14, "locked", "solid",  "open",   "bomb",   "dark", [
                [2,  5, Tile.wizzrobe_blue_e, base1x2],
                [4,  2, Tile.wizzrobe_blue_e],
                [4,  8, Tile.wizzrobe_red_w],
                [5,  8, Tile.item_key],
                [6,  2, Tile.wizzrobe_blue_e, base2x1],
                [6,  5, Tile.wizzrobe_red_n],
            ]),
            /* room: 03,11 */ makeRoom("03,11", 3, 0x1D, "solid",  "shut",   "solid",  "solid",  null  , [
                [2,  3, Tile.keese_blue],
                [2,  9, Tile.keese_blue],
                [3,  9, Tile.keese_blue],
                [5,  3, Tile.keese_blue],
                [5,  6, Tile.keese_blue],
                [5,  8, Tile.item_key],
                [7,  6, Tile.keese_blue],
                [7, 11, Tile.keese_blue],
                [8,  3, Tile.keese_blue],
            ]),
            /* room: 03,12 */ makeRoom("03,12", 3, 0x26, "solid",  "solid",  "open",   "open",   "text", [
            ]),
            /* room: 03,13 */ makeRoom("03,13", 6, 0x00, "locked", "open",   "open",   "solid",  null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [3, 10, Tile.wizzrobe_blue_e, base1x2],
                [5,  3, Tile.wizzrobe_blue_e],
                [5,  9, Tile.wizzrobe_red_e],
                [5, 11, Tile.wizzrobe_red_e],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 03,14 */ makeRoom("03,14", 6, 0x13, "open",   "solid",  "solid",  "open",   "dark", [
                [3,  4, Tile.vire, base2x1],
                [4,  2, Tile.bubble_blue, base1x2],
                [4,  6, Tile.vire],
                [5,  8, Tile.item_key],
                [6,  9, Tile.vire],
                [7,  9, Tile.bubble_blue, base2x1],
            ]),
            /* room: 03,15 */ makeRoom("03,15", 2, 0x1D, "shut",   "locked", "open",   "solid",  null  , [
                [2,  4, Tile.rope_w, base1x2],
                [2, 10, Tile.rope_e, base2x1],
                [3,  3, Tile.rope_e, base2x1],
                [3,  6, Tile.rope_e],
                [3, 13, Tile.rope_e],
                [4,  9, Tile.rope_e, base2x1],
                [5,  7, Tile.rope_w, base1x2],
                [6,  2, Tile.rope_e, base2x1],
            ]),
            /* room: 03,16 */ makeRoom("03,16", 2, 0x00, "open",   "solid",  "bomb",   "locked", null  , [
                [2,  4, Tile.gel_navy],
                [3,  2, Tile.gel_navy],
                [3, 13, Tile.gel_navy],
                [5,  5, Tile.gel_navy],
                [5,  8, Tile.item_rupee_blue],
                [7, 10, Tile.gel_navy],
            ]),
        ], [
            /* room: 04,01 */ makeRoom("04,01", 4, 0x18, "locked", "locked", "open",   "solid",  "dark", [
                [2, 13, Tile.bubble_blue, base2x1],
                [3,  5, Tile.vire],
                [3,  7, Tile.bubble_blue],
                [5,  3, Tile.vire],
                [6, 10, Tile.vire],
            ]),
            /* room: 04,02 */ makeRoom("04,02", 4, 0x17, "locked", "shut",   "solid",  "locked", null  , [
                [3, 10, Tile.vire, base2x1],
                [4, 12, Tile.vire, base2x1],
                [6,  8, Tile.vire],
                [6, 10, Tile.vire, base2x1],
                [6, 12, Tile.vire, base2x1],
            ]),
            /* room: 04,03 */ makeRoom("04,03", 4, 0x0A, "solid",  "solid",  "solid",  "open",   null  , [
                [2,  5, Tile.zol_black, base2x1],
                [2, 10, Tile.bubble_blue],
                [4,  8, Tile.like_like, base1x2],
                [5, 13, Tile.zol_black, base2x1],
                [7,  5, Tile.like_like],
                [8, 12, Tile.bubble_blue, base1x2],
            ]),
            /* room: 04,04 */ makeRoom("04,04", 1, 0x17, "locked", "solid",  "open",   "solid",  null  , [
                [3,  3, Tile.stalfos, base1x2],
                [3, 12, Tile.stalfos_key, base2x1],
                [5,  5, Tile.stalfos, base2x1],
            ]),
            /* room: 04,05 */ makeRoom("04,05", 5, 0x1E, "shut",   "solid",  "solid",  "solid",  null  , [
                [4,  4, Tile.gibdo, base1x2],
                [6,  3, Tile.gibdo, base2x1],
                [6,  5, Tile.gibdo, base1x2],
                [6,  9, Tile.gibdo, base2x1],
                [7,  5, Tile.gibdo, base2x1],
                [7, 10, Tile.gibdo, base1x2],
            ]),
            /* room: 04,06 */ makeRoom("04,06", 1, 0x04, "solid",  "shut",   "locked", "solid",  null  , [
                [5, 11, Tile.aquamentus],
                [5, 12, Tile.item_floating_heart_container, base1x2],
            ]),
            /* room: 04,07 */ makeRoom("04,07", 1, 0x29, "solid",  "solid",  "solid",  "open",   "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 04,08 */ makeRoom("04,08", 5, 0x17, "open",   "solid",  "open",   "solid",  "dark", [
                [3,  7, Tile.darknut_red],
                [3, 10, Tile.darknut_red],
                [6,  5, Tile.darknut_red],
                [6,  8, Tile.item_compass],
            ]),
            /* room: 04,09 */ makeRoom("04,09", 6, 0x0A, "shut",   "solid",  "shut",   "solid",  null  , [
                [2,  5, Tile.like_like, base1x2],
                [2,  9, Tile.wizzrobe_blue_w],
                [2, 12, Tile.like_like, base2x1],
                [3,  9, Tile.like_like, base2x1],
                [6,  8, Tile.wizzrobe_blue_w, base1x2],
                [7,  2, Tile.bubble_blue, base2x1],
                [8,  5, Tile.wizzrobe_red_e],
                [8, 10, Tile.wizzrobe_red_w],
            ]),
            /* room: 04,10 */ makeRoom("04,10", 6, 0x13, "shut",   "shut",   "solid",  "solid",  "dark", [
                [3,  4, Tile.vire],
                [4,  9, Tile.vire],
                [6,  5, Tile.vire, base2x1],
                [7,  7, Tile.vire, base1x2],
                [7,  9, Tile.vire, base2x1],
            ]),
            /* room: 04,11 */ makeRoom("04,11", 6, 0x22, "solid",  "solid",  "solid",  "open",   null  , [
                [2,  2, Tile.like_like],
                [3, 10, Tile.like_like],
                [5,  5, Tile.wizzrobe_red_w],
                [5,  8, Tile.like_like],
                [5, 13, Tile.wizzrobe_red_e],
                [6,  9, Tile.bubble_blue, base1x2],
                [7,  3, Tile.wizzrobe_blue_e, base2x1],
                [7,  4, Tile.wizzrobe_blue_e, base1x2],
            ]),
            /* room: 04,12 */ makeRoom("04,12", 3, 0x0A, "shut",   "solid",  "locked", "solid",  null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [3,  6, Tile.zol_evergreen, base2x1],
                [6,  5, Tile.zol_evergreen, base1x2],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 04,13 */ makeRoom("04,13", 6, 0x17, "shut",   "solid",  "solid",  "solid",  "dark", [
                [5,  8, Tile.item_bomb],
                [5,  9, Tile.wizzrobe_blue_n],
                [5, 12, Tile.wizzrobe_blue_e],
                [6,  3, Tile.wizzrobe_red_e],
                [6,  5, Tile.wizzrobe_red_e],
                [7, 12, Tile.wizzrobe_blue_n],
            ]),
            /* room: 04,14 */ makeRoom("04,14", 3, 0x29, "solid",  "solid",  "open",   "solid",  "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 04,15 */ makeRoom("04,15", 2, 0x25, "open",   "open",   "open",   "solid",  "sand", [
                [2,  4, Tile.moldorm],
                [3,  3, Tile.moldorm],
                [4,  3, Tile.moldorm],
                [4,  6, Tile.moldorm],
                [5,  4, Tile.moldorm],
                [5,  6, Tile.moldorm],
                [5,  8, Tile.item_key],
                [6,  6, Tile.moldorm],
                [7,  5, Tile.moldorm],
            ]),
            /* room: 04,16 */ makeRoom("04,16", 2, 0x00, "bomb",   "solid",  "bomb",   "open",   null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [3,  7, Tile.keese_blue],
                [4,  2, Tile.keese_blue],
                [5,  8, Tile.item_bomb],
                [6, 11, Tile.keese_blue, base1x2],
                [8,  8, Tile.keese_blue, base1x2],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
        ], [
            /* room: 05,01 */ makeRoom("05,01", 4, 0x15, "open",   "solid",  "open",   "solid",  "dark", [
                [2,  8, Tile.zol_black],
                [3,  9, Tile.zol_black],
                [4,  6, Tile.zol_black, base1x2],
                [4,  8, Tile.item_key],
                [4, 11, Tile.zol_black],
                [6,  7, Tile.zol_black, base1x2],
            ]),
            /* room: 05,02 */ makeRoom("05,02", 1, 0x26, "solid",  "open",   "solid",  "solid",  "text", [
            ]),
            /* room: 05,03 */ makeRoom("05,03", 1, 0x22, "solid",  "open",   "locked", "shut",   null  , [
                [3,  7, Tile.gel_dark_slate],
                [5,  5, Tile.gel_dark_slate],
                [7,  7, Tile.gel_dark_slate],
            ]),
            /* room: 05,04 */ makeRoom("05,04", 1, 0x1F, "open",   "locked", "bomb",   "open",   null  , [
                [2,  4, Tile.gel_dark_slate],
                [2,  9, Tile.gel_dark_slate, base1x2],
                [4,  5, Tile.gel_dark_slate],
                [4, 10, Tile.gel_dark_slate],
                [5, 12, Tile.item_map],
                [7,  5, Tile.gel_dark_slate],
            ]),
            /* room: 05,05 */ makeRoom("05,05", 1, 0x02, "solid",  "open",   "bomb",   "locked", null  , [
                [2,  9, Tile.goriya_red],
                [3,  8, Tile.item_boomerang, drop1x1],
                [3, 11, Tile.goriya_red],
                [6,  9, Tile.goriya_red],
            ]),
            /* room: 05,06 */ makeRoom("05,06", 1, 0x0D, "locked", "solid",  "solid",  "open",   null  , [
                [1,  5, Tile.wallmaster_n],
                [1, 11, Tile.wallmaster_n],
                [6,  1, Tile.wallmaster_w],
                [7, 14, Tile.wallmaster_e],
                [8, 10, Tile.item_key],
            ]),
            /* room: 05,07 */ makeRoom("05,07", 5, 0x12, "solid",  "open",   "locked", "solid",  "dark", [
                [6,  8, Tile.item_map],
            ]),
            /* room: 05,08 */ makeRoom("05,08", 5, 0x15, "open",   "solid",  "open",   "open",   null  , [
                [2,  4, Tile.gibdo, base1x2],
                [2,  9, Tile.gibdo, base1x2],
                [3,  6, Tile.gibdo, base2x1],
                [4,  8, Tile.gibdo, base1x2],
                [6,  5, Tile.gibdo, base1x2],
                [6,  8, Tile.item_key],
            ]),
            /* room: 05,09 */ makeRoom("05,09", 6, 0x01, "open",   "solid",  "open",   "solid",  null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [5,  4, Tile.trap_w],
                [5, 11, Tile.trap_e],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 05,10 */ makeRoom("05,10", 3, 0x00, "solid",  "open",   "open",   "solid",  null  , [
                [2, 11, Tile.zol_evergreen],
                [3,  4, Tile.keese_blue],
                [3,  9, Tile.zol_evergreen],
                [4,  2, Tile.bubble_blue],
                [4, 11, Tile.keese_blue],
                [5,  8, Tile.item_key],
                [5,  9, Tile.keese_blue],
                [5, 10, Tile.bubble_blue, base1x2],
                [7,  9, Tile.bubble_blue, base1x2],
            ]),
            /* room: 05,11 */ makeRoom("05,11", 3, 0x0F, "solid",  "locked", "open",   "open",   null  , [
                [2,  5, Tile.keese_blue],
                [3, 12, Tile.keese_blue],
                [5,  8, Tile.item_bomb],
                [5, 12, Tile.keese_blue, base1x2],
                [7, 12, Tile.keese_blue],
                [8,  5, Tile.keese_blue],
            ]),
            /* room: 05,12 */ makeRoom("05,12", 3, 0x08, "locked", "locked", "open",   "locked", null  , [
                [2,  9, Tile.zol_evergreen],
                [4,  8, Tile.zol_evergreen],
                [5,  8, Tile.item_key],
                [5, 10, Tile.zol_evergreen],
            ]),
            /* room: 05,13 */ makeRoom("05,13", 3, 0x00, "solid",  "bomb",   "open",   "locked", null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [2,  9, Tile.zol_evergreen, base1x2],
                [5,  8, Tile.item_map],
                [6,  9, Tile.zol_evergreen, base1x2],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 05,14 */ makeRoom("05,14", 3, 0x25, "shut",   "solid",  "shut",   "bomb",   "sand", [
                [6,  4, Tile.manhandla],
                [5,  8, Tile.item_heart_container],
            ]),
            /* room: 05,15 */ makeRoom("05,15", 2, 0x02, "open",   "open",   "shut",   "solid",  null  , [
                [2,  5, Tile.rope_w],
                [2, 10, Tile.rope_e],
                [3,  3, Tile.rope_w],
                [3, 12, Tile.rope_e],
                [5,  8, Tile.item_key],
                [6, 10, Tile.rope_w],
            ]),
            /* room: 05,16 */ makeRoom("05,16", 2, 0x24, "bomb",   "solid",  "bomb",   "open",   "dim" , [
                [3, 11, Tile.goriya_blue, base1x2],
                [5,  8, Tile.item_magical_boomerang, drop1x1],
                [5, 13, Tile.goriya_blue],
                [7, 12, Tile.goriya_blue],
            ]),
        ], [
            /* room: 06,01 */ makeRoom("06,01", 4, 0x11, "open",   "open",   "solid",  "solid",  "dark", [
                [3,  8, Tile.vire],
                [4,  3, Tile.vire, base1x2],
                [4,  8, Tile.vire, base1x2],
                [7,  4, Tile.vire],
                [7,  6, Tile.vire, base1x2],
            ]),
            /* room: 06,02 */ makeRoom("06,02", 4, 0x03, "solid",  "solid",  "open",   "open",   null  , [
                [2,  5, Tile.keese_blue],
                [2, 10, Tile.keese_blue],
                [3,  3, Tile.keese_blue],
                [3, 12, Tile.keese_blue],
                [4,  6, Tile.keese_blue],
                [4,  9, Tile.keese_blue],
                [5,  8, Tile.keese_blue],
                [5,  9, Tile.item_key],
                [6, 10, Tile.keese_blue],
            ]),
            /* room: 06,03 */ makeRoom("06,03", 1, 0x1E, "locked", "shut",   "solid",  "solid",  null  , [
                [2, 10, Tile.keese_blue],
                [4,  5, Tile.keese_blue],
                [5,  2, Tile.keese_blue],
                [6,  5, Tile.keese_blue],
                [7,  3, Tile.keese_blue],
                [8, 10, Tile.keese_blue],
            ]),
            /* room: 06,04 */ makeRoom("06,04", 1, 0x02, "bomb",   "open",   "open",   "open",   null  , [
                [2,  9, Tile.stalfos, base1x2],
                [3,  8, Tile.item_key],
                [4,  6, Tile.stalfos, base1x2],
                [4,  9, Tile.stalfos, base2x1],
                [5,  8, Tile.stalfos, base2x1],
                [6,  5, Tile.stalfos, base2x1],
            ]),
            /* room: 06,05 */ makeRoom("06,05", 1, 0x03, "bomb",   "solid",  "solid",  "open",   null  , [
                [2,  5, Tile.keese_blue],
                [3, 12, Tile.keese_blue],
                [4,  8, Tile.keese_blue],
                [4, 10, Tile.keese_blue],
                [5, 12, Tile.item_compass],
                [5, 13, Tile.keese_blue],
                [6,  8, Tile.keese_blue],
                [6, 10, Tile.keese_blue],
                [7, 12, Tile.keese_blue],
            ]),
            /* room: 06,06 */ makeRoom("06,06", 5, 0x13, "solid",  "shut",   "open",   "solid",  null  , [
                [3,  7, Tile.zol_dark_green],
                [4,  2, Tile.zol_dark_green],
                [4,  5, Tile.zol_dark_green, base1x2],
                [5,  5, Tile.zol_dark_green],
                [6,  8, Tile.item_key],
                [7,  5, Tile.zol_dark_green, base1x2],
            ]),
            /* room: 06,07 */ makeRoom("06,07", 5, 0x00, "locked", "open",   "open",   "shut",   null  , [
                [3,  8, Tile.item_bomb],
                [3, 11, Tile.dodongo_e],
                [4,  6, Tile.dodongo_w],
                [6,  8, Tile.dodongo_s],
            ]),
            /* room: 06,08 */ makeRoom("06,08", 5, 0x17, "open",   "solid",  "solid",  "open",   "dark", [
                [3,  5, Tile.zol_dark_green, base2x1],
                [4, 12, Tile.zol_dark_green],
                [5, 12, Tile.zol_dark_green],
                [6,  8, Tile.item_rupee_blue],
                [6, 12, Tile.zol_dark_green],
                [7, 10, Tile.zol_dark_green],
            ]),
            /* room: 06,09 */ makeRoom("06,09", 6, 0x24, "shut",   "solid",  "open",   "solid",  null  , [
                [2,  7, Tile.keese_blue, base2x1],
                [4,  6, Tile.keese_blue],
                [4, 12, Tile.keese_blue, base2x1],
                [5,  5, Tile.keese_blue, base1x2],
                [5,  8, Tile.item_key],
                [5,  9, Tile.keese_blue],
                [5, 11, Tile.keese_blue],
                [6,  9, Tile.keese_blue, base1x2],
                [8,  7, Tile.keese_blue, base1x2],
            ]),
            /* room: 06,10 */ makeRoom("06,10", 3, 0x1D, "open",   "locked", "shut",   "solid",  null  , [
                [3,  6, Tile.darknut_red],
                [3,  9, Tile.darknut_red],
                [5,  3, Tile.darknut_red, base2x1],
                [5,  6, Tile.darknut_red],
                [7,  9, Tile.darknut_red],
            ]),
            /* room: 06,11 */ makeRoom("06,11", 3, 0x00, "open",   "open",   "solid",  "locked", null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [3,  3, Tile.keese_blue],
                [4,  5, Tile.keese_blue],
                [5,  2, Tile.keese_blue, base1x2],
                [5,  8, Tile.item_compass],
                [7,  3, Tile.keese_blue],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 06,12 */ makeRoom("06,12", 3, 0x00, "open",   "bomb",   "open",   "open",   null  , [
                [2, 10, Tile.darknut_red, base1x2],
                [3,  9, Tile.darknut_red, base2x1],
                [5,  8, Tile.item_bomb],
                [5, 10, Tile.darknut_red, base2x1],
            ]),
            /* room: 06,13 */ makeRoom("06,13", 3, 0x1F, "open",   "shut",   "solid",  "bomb",   null  , [
                [3,  8, Tile.darknut_red, base2x1],
                [3, 10, Tile.darknut_red, base2x1],
                [6,  7, Tile.darknut_red, base1x2],
            ]),
            /* room: 06,14 */ makeRoom("06,14", 3, 0x1E, "shut",   "solid",  "solid",  "shut",   null  , [
                [2,  2, Tile.item_rupee_blue],
                [2, 11, Tile.keese_blue, base2x1],
                [5, 10, Tile.bubble_blue],
                [6,  9, Tile.keese_blue],
                [6, 12, Tile.zol_evergreen, base2x1],
                [6, 13, Tile.bubble_blue],
                [7,  4, Tile.keese_blue, base2x1],
                [7,  9, Tile.zol_evergreen],
                [7, 11, Tile.bubble_blue],
            ]),
            /* room: 06,15 */ makeRoom("06,15", 2, 0x1F, "open",   "locked", "open",   "solid",  null  , [
                [2, 10, Tile.goriya_red, base1x2],
                [3,  6, Tile.goriya_red, base2x1],
                [4,  9, Tile.goriya_red, base2x1],
                [6,  5, Tile.goriya_red, base2x1],
                [6, 10, Tile.goriya_red, base2x1],
            ]),
            /* room: 06,16 */ makeRoom("06,16", 2, 0x03, "bomb",   "solid",  "bomb",   "locked", null  , [
                [4, 11, Tile.gel_navy],
                [5,  5, Tile.gel_navy],
                [5,  8, Tile.item_map],
                [7, 13, Tile.gel_navy],
                [8,  3, Tile.gel_navy],
                [8,  9, Tile.gel_navy],
            ]),
        ], [
            /* room: 07,01 */ [[], []],
            /* room: 07,02 */ makeRoom("07,02", 4, 0x02, "open",   "locked", "open",   "solid",  null  , [
                [3,  6, Tile.vire, base1x2],
                [4,  8, Tile.vire, base2x1],
                [5,  5, Tile.vire],
            ]),
            /* room: 07,03 */ makeRoom("07,03", 4, 0x0C, "solid",  "solid",  "solid",  "locked", "dark", [
                [2,  7, Tile.vire],
                [2, 12, Tile.vire],
                [4,  8, Tile.item_compass],
                [5,  4, Tile.vire],
                [7,  4, Tile.vire],
            ]),
            /* room: 07,04 */ makeRoom("07,04", 1, 0x1E, "open",   "solid",  "locked", "solid",  null  , [
                [2,  5, Tile.stalfos, base1x2],
                [4,  6, Tile.stalfos, base2x1],
                [6,  5, Tile.stalfos, base1x2],
            ]),
            /* room: 07,05 */ makeRoom("07,05", 5, 0x1A, "solid",  "bomb",   "solid",  "solid",  null  , [
                [2,  9, Tile.darknut_blue],
                [3,  5, Tile.darknut_blue],
                [4,  3, Tile.darknut_blue],
                [6,  4, Tile.darknut_blue],
                [7,  2, Tile.darknut_blue],
            ]),
            /* room: 07,06 */ makeRoom("07,06", 5, 0x02, "shut",   "bomb",   "solid",  "bomb",   null  , [
                [3,  6, Tile.gibdo],
                [3,  8, Tile.gibdo],
                [5,  3, Tile.gibdo_bomb],
                [5,  6, Tile.gibdo],
                [6,  3, Tile.gibdo, base2x1],
            ]),
            /* room: 07,07 */ makeRoom("07,07", 5, 0x18, "shut",   "locked", "open",   "bomb",   "dark", [
                [2,  6, Tile.gibdo_key],
                [2,  9, Tile.gibdo],
                [3, 13, Tile.gibdo],
            ]),
            /* room: 07,08 */ makeRoom("07,08", 5, 0x26, "solid",  "solid",  "bomb",   "locked", "text", [
            ]),
            /* room: 07,09 */ makeRoom("07,09", 6, 0x1D, "open",   "solid",  "open",   "solid",  null  , [
                [2,  5, Tile.zol_dark_brown],
                [2, 10, Tile.zol_dark_brown],
                [4,  6, Tile.zol_dark_brown],
                [4,  9, Tile.zol_dark_brown],
                [5,  8, Tile.item_compass],
                [6,  7, Tile.zol_dark_brown],
            ]),
            /* room: 07,10 */ makeRoom("07,10", 3, 0x1B, "open",   "solid",  "solid",  "solid",  null  , [
                [2,  3, Tile.darknut_red, base1x2],
                [4,  4, Tile.darknut_red, base1x2],
                [4,  9, Tile.darknut_red, base1x2],
                [5,  2, Tile.darknut_red, base2x1],
                [5,  8, Tile.item_bomb],
                [6,  6, Tile.darknut_red, base2x1],
                [6,  8, Tile.darknut_red, base1x2],
                [7,  5, Tile.darknut_red, base2x1],
                [8,  4, Tile.darknut_red],
            ]),
            /* room: 07,11 */ makeRoom("07,11", 6, 0x26, "solid",  "solid",  "locked", "solid",  "text", [
            ]),
            /* room: 07,12 */ makeRoom("07,12", 3, 0x11, "open",   "solid",  "open",   "solid",  null  , [
                [2,  6, Tile.zol_evergreen],
                [3, 10, Tile.zol_evergreen],
                [4,  8, Tile.zol_evergreen],
                [5,  7, Tile.zol_evergreen],
                [5,  8, Tile.item_key],
                [7,  5, Tile.zol_evergreen],
            ]),
            /* room: 07,13 */ makeRoom("07,13", 2, 0x00, "solid",  "open",   "solid",  "solid",  null  , [
                [3,  3, Tile.rope_e],
                [4,  4, Tile.rope_w, base1x2],
                [4,  7, Tile.rope_w],
                [5,  3, Tile.rope_e],
                [5,  8, Tile.item_key],
                [6,  4, Tile.rope_w, base1x2],
                [7,  2, Tile.rope_w, base1x2],
            ]),
            /* room: 07,14 */ makeRoom("07,14", 2, 0x03, "solid",  "open",   "open",   "shut",   null  , [
                [2,  3, Tile.rope_w, base1x2],
                [3,  2, Tile.rope_w, base1x2],
                [4,  5, Tile.rope_w, base1x2],
                [5,  7, Tile.rope_w, base1x2],
                [6,  4, Tile.rope_w, base1x2],
            ]),
            /* room: 07,15 */ makeRoom("07,15", 2, 0x0D, "open",   "locked", "open",   "open",   null  , [
                [2,  5, Tile.rope_e, base1x2],
                [4,  7, Tile.rope_w, base1x2],
                [8,  4, Tile.rope_w, base1x2],
            ]),
            /* room: 07,16 */ makeRoom("07,16", 2, 0x1E, "bomb",   "solid",  "solid",  "locked", null  , [
                [2, 13, Tile.item_compass],
                [4,  5, Tile.gel_navy, base1x2],
                [4, 11, Tile.gel_navy],
                [6, 12, Tile.gel_navy],
                [7,  3, Tile.gel_navy, base2x1],
                [7,  5, Tile.gel_navy, base2x1],
                [8,  9, Tile.gel_navy],
            ]),
        ], [
            /* room: 08,01 */ makeRoom("08,01", 4, 0x00, "solid",  "open",   "solid",  "solid",  null  , [
                [2, 10, Tile.keese_blue],
                [4,  5, Tile.keese_blue],
                [4,  7, Tile.keese_blue],
                [5,  2, Tile.keese_blue],
                [5,  9, Tile.item_key],
                [6,  5, Tile.keese_blue],
                [6,  7, Tile.keese_blue],
                [7,  3, Tile.keese_blue],
                [8, 10, Tile.keese_blue],
            ]),
            /* room: 08,02 */ makeRoom("08,02", 4, 0x21, "open",   "solid",  "open",   "open",   null  , [
            ]),
            /* room: 08,03 */ makeRoom("08,03", 1, 0x00, "solid",  "open",   "solid",  "solid",  null  , [
                [3,  3, Tile.keese_blue],
                [4,  5, Tile.keese_blue],
                [7,  2, Tile.keese_blue],
                [8, 10, Tile.item_key],
            ]),
            /* room: 08,04 */ makeRoom("08,04", 1, 0x21, "locked", "open",   "open",   "open",   null  , [
            ]),
            /* room: 08,05 */ makeRoom("08,05", 1, 0x1D, "solid",  "solid",  "solid",  "open",   null  , [
                [3,  8, Tile.stalfos],
                [3, 11, Tile.stalfos, base1x2],
                [6,  8, Tile.stalfos, base1x2],
                [7,  5, Tile.stalfos_key],
                [7, 12, Tile.stalfos, base1x2],
            ]),
            /* room: 08,06 */ [[], []],
            /* room: 08,07 */ makeRoom("08,07", 5, 0x21, "open",   "open",   "open",   "solid",  null  , [
            ]),
            /* room: 08,08 */ makeRoom("08,08", 5, 0x1D, "bomb",   "solid",  "solid",  "open",   null  , [
                [2,  4, Tile.pols_voice_orange_green],
                [3, 10, Tile.pols_voice_orange_green, base1x2],
                [5,  9, Tile.pols_voice_orange_green],
                [5, 12, Tile.pols_voice_orange_green, base1x2],
                [6,  8, Tile.item_key],
                [6, 12, Tile.pols_voice_orange_green, base2x1],
            ]),
            /* room: 08,09 */ makeRoom("08,09", 6, 0x1F, "open",   "locked", "solid",  "solid",  null  , [
                [5,  3, Tile.wizzrobe_red_w],
                [5,  9, Tile.wizzrobe_red_e],
                [5, 10, Tile.wizzrobe_red_e],
                [5, 11, Tile.wizzrobe_red_e],
                [5, 12, Tile.wizzrobe_red_e],
            ]),
            /* room: 08,10 */ makeRoom("08,10", 6, 0x21, "solid",  "open",   "open",   "locked", null  , [
            ]),
            /* room: 08,11 */ makeRoom("08,11", 6, 0x03, "locked", "solid",  "solid",  "open",   "dark", [
                [4,  7, Tile.wizzrobe_red_e],
                [5,  8, Tile.item_key],
                [6,  2, Tile.wizzrobe_red_e],
                [6, 10, Tile.wizzrobe_red_w],
                [6, 11, Tile.wizzrobe_red_w],
                [6, 13, Tile.wizzrobe_red_w],
            ]),
            /* room: 08,12 */ makeRoom("08,12", 3, 0x03, "open",   "open",   "solid",  "solid",  null  , [
                [3,  2, Tile.zol_evergreen],
                [4,  2, Tile.zol_evergreen, base2x1],
                [4,  6, Tile.zol_evergreen],
                [5,  8, Tile.item_key],
                [6,  3, Tile.zol_evergreen],
                [6,  6, Tile.zol_evergreen],
                [7, 10, Tile.zol_evergreen],
            ]),
            /* room: 08,13 */ makeRoom("08,13", 3, 0x21, "solid",  "solid",  "open",   "open",   null  , [
            ]),
            /* room: 08,14 */ makeRoom("08,14", 2, 0x21, "open",   "open",   "open",   "solid",  null  , [
            ]),
            /* room: 08,15 */ makeRoom("08,15", 2, 0x00, "open",   "solid",  "solid",  "open",   null  , [
                [2,  5, Tile.rope_e, base1x2],
                [3, 13, Tile.rope_e],
                [4,  7, Tile.rope_w, base1x2],
                [4,  9, Tile.rope_w, base1x2],
                [5,  8, Tile.item_key],
                [8,  4, Tile.rope_w, base1x2],
            ]),
            /* room: 08,16 */ [[], []],
        ], [
            /* room: 09,01 */ [[], []],
            /* room: 09,02 */ makeRoom("09,02", 9, 0x13, "solid",  "locked", "shut",   "solid",  "dark", [
                [2,  5, Tile.bubble_blue],
                [3,  2, Tile.keese_blue, base1x2],
                [3,  7, Tile.zol_black],
                [4,  5, Tile.keese_blue],
                [4,  9, Tile.zol_black, base2x1],
                [6,  2, Tile.bubble_blue, base2x1],
                [7,  8, Tile.keese_blue],
                [7,  9, Tile.bubble_blue],
            ]),
            /* room: 09,03 */ makeRoom("09,03", 9, 0x26, "solid",  "solid",  "open",   "locked", "text", [
            ]),
            /* room: 09,04 */ makeRoom("09,04", 9, 0x1A, "solid",  "bomb",   "solid",  "solid",  null  , [
                [2, 10, Tile.like_like, base2x1],
                [3,  4, Tile.bubble_blue, base2x1],
                [3,  5, Tile.zol_black, base2x1],
                [5,  5, Tile.like_like],
                [6,  2, Tile.bubble_blue, base1x2],
                [7,  3, Tile.zol_black, base1x2],
            ]),
            /* room: 09,05 */ makeRoom("09,05", 9, 0x1A, "solid",  "solid",  "solid",  "bomb",   null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [5,  9, Tile.wizzrobe_blue_e],
                [7, 12, Tile.wizzrobe_red_n],
                [8,  7, Tile.wizzrobe_blue_e],
                [8, 11, Tile.wizzrobe_red_n],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 09,06 */ makeRoom("09,06", 9, 0x0A, "solid",  "bomb",   "solid",  "solid",  null  , [
                [2,  8, Tile.wizzrobe_blue_e, base2x1],
                [2,  9, Tile.wizzrobe_blue_e, base2x1],
                [4,  8, Tile.wizzrobe_red_w],
                [4, 11, Tile.wizzrobe_blue_n, base2x1],
                [7,  4, Tile.wizzrobe_red_n],
            ]),
            /* room: 09,07 */ makeRoom("09,07", 9, 0x26, "solid",  "solid",  "locked", "bomb",   "text", [
            ]),
            /* room: 09,08 */ makeRoom("09,08", 9, 0x1A, "solid",  "solid",  "bomb",   "solid",  null  , [
                [2,  2, Tile.wizzrobe_red_e],
                [2,  5, Tile.bubble_blue, base2x1],
                [2,  6, Tile.wizzrobe_blue_w],
                [3,  6, Tile.wizzrobe_blue_e, base2x1],
                [5,  5, Tile.wizzrobe_blue_e],
                [6,  6, Tile.wizzrobe_red_n],
                [6, 13, Tile.bubble_blue, base2x1],
                [8, 13, Tile.bubble_blue],
            ]),
            /* room: 09,09 */ makeRoom("09,09", 7, 0x26, "solid",  "bomb",   "bomb",   "solid",  null  , [
                [3,  7, Tile.item_rupee_orange, base1x2],
                [4,  7, Tile.item_rupee_orange],
                [4,  8, Tile.item_rupee_orange],
                [5,  6, Tile.item_rupee_orange],
                [5,  7, Tile.item_rupee_orange],
                [5,  8, Tile.item_rupee_orange],
                [5,  9, Tile.item_rupee_orange],
                [6,  7, Tile.item_rupee_orange],
                [6,  8, Tile.item_rupee_orange],
                [7,  7, Tile.item_rupee_orange, base1x2],
            ]),
            /* room: 09,10 */ makeRoom("09,10", 7, 0x0A, "solid",  "shut",   "shut",   "bomb",   null  , [
                [3, 12, Tile.goriya_blue],
                [4,  8, Tile.goriya_red],
                [4, 10, Tile.goriya_blue],
                [5,  8, Tile.item_rupee_blue],
                [6, 10, Tile.goriya_red],
                [7,  8, Tile.goriya_red],
                [8,  5, Tile.goriya_blue],
            ]),
            /* room: 09,11 */ makeRoom("09,11", 7, 0x24, "solid",  "solid",  "solid",  "shut",   "dim" , [
                [2, 11, Tile.goriya_blue],
                [4, 12, Tile.goriya_blue],
                [5,  6, Tile.goriya_blue],
                [5,  7, Tile.goriya_blue],
                [5,  8, Tile.item_key],
                [6,  4, Tile.goriya_blue, base1x2],
            ]),
            /* room: 09,12 */ makeRoom("09,12", 7, 0x25, "solid",  "solid",  "locked", "solid",  "sand", [
                [3,  3, Tile.moldorm],
                [4,  4, Tile.moldorm],
                [5,  4, Tile.moldorm],
                [5,  5, Tile.moldorm],
                [5,  8, Tile.item_bomb],

                [2,  7, Tile.moldorm],
                [2,  8, Tile.moldorm],
                [3,  8, Tile.moldorm],
                [4,  7, Tile.moldorm],
            ]),
            /* room: 09,13 */ makeRoom("09,13", 7, 0x23, "solid",  "bomb",   "open",   "solid",  null  , [
                [2,  7, Tile.dodongo_w],
                [4,  6, Tile.dodongo_w],
                [5,  8, Tile.item_bomb],
                [6,  7, Tile.dodongo_n],
            ]),
            /* room: 09,14 */ makeRoom("09,14", 7, 0x08, "solid",  "solid",  "solid",  "bomb",   null  , [
                [1,  6, Tile.wallmaster_n],
                [2, 11, Tile.bubble_blue, base1x2],
                [4,  1, Tile.wallmaster_w],
                [4,  5, Tile.bubble_blue, base1x2],
                [7, 14, Tile.wallmaster_e],
                [7,  2, Tile.bubble_blue, base2x1],
                [9,  3, Tile.wallmaster_s],
                [9,  9, Tile.wallmaster_s],
            ]),
            /* room: 09,15 */ makeRoom("09,15", 8, 0x00, "solid",  "solid",  "shut",   "solid",  null  , [
                [2,  5, Tile.darknut_red],
                [2, 12, Tile.darknut_red, base2x1],
                [3,  2, Tile.darknut_red, base1x2],
                [5,  8, Tile.item_bomb],
                [5, 10, Tile.darknut_red, base2x1],
                [6,  4, Tile.darknut_red, base1x2],
            ]),
            /* room: 09,16 */ [[], []],
        ], [
            /* room: 10,01 */ makeRoom("10,01", 9, 0x08, "solid",  "solid",  "bomb",   "solid",  null  , [
                [2,  3, Tile.bubble_blue, base1x2],
                [2,  7, Tile.wizzrobe_blue_w, base1x2],
                [4,  7, Tile.wizzrobe_red_e],
                [4,  8, Tile.wizzrobe_blue_e],
                [5,  6, Tile.wizzrobe_blue_w],
                [6,  3, Tile.bubble_blue, base1x2],
                [6,  6, Tile.bubble_blue, base1x2],
                [7,  2, Tile.wizzrobe_red_e],
            ]),
            /* room: 10,02 */ makeRoom("10,02", 9, 0x25, "open",   "solid",  "shut",   "solid",  null  , [
                [2,  3, Tile.lanmola_body_blue],
                [3,  3, Tile.lanmola_body_blue],
                [3,  4, Tile.lanmola_body_blue],
                [3,  5, Tile.lanmola_head_blue],

                [5,  5, Tile.lanmola_body_blue],
                [5,  6, Tile.lanmola_body_blue],
                [6,  7, Tile.lanmola_body_blue],
                [7,  7, Tile.lanmola_head_blue],
                [5,  8, Tile.item_bomb],
            ]),
            /* room: 10,03 */ makeRoom("10,03", 9, 0x26, "shut",   "locked", "locked", "solid",  null  , [
                [2,  3, Tile.lanmola_body_red],
                [2,  4, Tile.lanmola_body_red],
                [3,  3, Tile.lanmola_body_red],
                [4,  3, Tile.lanmola_head_red],

                [5,  8, Tile.item_rupee_blue],

                [6,  6, Tile.lanmola_body_red, base1x2],
                [7,  7, Tile.lanmola_body_red],
                [7,  8, Tile.lanmola_body_red],
                [7,  9, Tile.lanmola_head_red],
            ]),
            /* room: 10,04 */ makeRoom("10,04", 9, 0x00, "solid",  "solid",  "locked", "locked", "dark", [
                [2,  6, Tile.zol_black],
                [2,  7, Tile.like_like, base2x1],
                [2, 10, Tile.bubble_blue, base1x2],
                [3,  4, Tile.zol_black],
                [3, 13, Tile.bubble_blue, base2x1],
                [5,  7, Tile.like_like, base2x1],
            ]),
            /* room: 10,05 */ makeRoom("10,05", 9, 0x1c, "solid",  "locked", "open",   "solid",  null  , [
                [6,  6, Tile.like_like, base1x2],
                [6,  9, Tile.like_like, base1x2],
                [8,  7, Tile.like_like, base1x2],
                [8, 12, Tile.like_like, base1x2],
            ]),
            /* room: 10,06 */ makeRoom("10,06", 9, 0x14, "solid",  "open",   "bomb",   "locked", "dark", [
                [2,   2, Tile.wizzrobe_blue_e, base1x2],
                [2,  10, Tile.wizzrobe_blue_w, base1x2],
                [5,   8, Tile.item_rupee_blue],
                [8,   2, Tile.wizzrobe_blue_e, base1x2],
            ]),
            /* room: 10,07 */ makeRoom("10,07", 9, 0x0A, "locked", "solid",  "open",   "open",   null  , [
                [3,  4, Tile.patra_blue, base2x1],
                [2,  3, Tile.patra_red],
                [2,  5, Tile.patra_red],
                [3,  2, Tile.patra_red],
                [3,  6, Tile.patra_red],
                [4,  2, Tile.patra_red],
                [4,  6, Tile.patra_red],
                [5,  3, Tile.patra_red],
                [5,  5, Tile.patra_red],
                [5,  8, Tile.item_bomb],
            ]),
            /* room: 10,08 */ makeRoom("10,08", 9, 0x1F, "bomb",   "solid",  "bomb",   "solid",  null  , [
                [2,   6, Tile.wizzrobe_blue_e],
                [2,   9, Tile.like_like, base1x2],
                [3,   7, Tile.wizzrobe_red_e],
                [4,   9, Tile.like_like],
                [4,  10, Tile.bubble_blue],
                [6,   5, Tile.like_like, base1x2],
                [6,   9, Tile.wizzrobe_blue_w],
                [7,   7, Tile.wizzrobe_red_w],
            ]),
            /* room: 10,09 */ makeRoom("10,09", 7, 0x16, "bomb",   "locked", "open",   "solid",  "dark", [
                [2,  7, Tile.keese_blue],
                [3, 10, Tile.goriya_blue, base1x2],
                [3, 12, Tile.bubble_blue, base2x1],
                [4,  7, Tile.bubble_blue],
                [4,  8, Tile.keese_blue],
                [5,  7, Tile.goriya_blue, base2x1],
                [5,  8, Tile.item_map],
                [7,  4, Tile.goriya_blue, base1x2],
                [8,  7, Tile.keese_blue, base1x2],
            ]),
            /* room: 10,10 */ makeRoom("10,10", 7, 0x1F, "shut",   "bomb",   "solid",  "locked", null  , [
                [4,  5, Tile.goriya_blue],
                [4,  9, Tile.goriya_blue, base1x2],
                [6,  6, Tile.goriya_blue],
                [6,  9, Tile.goriya_blue],
                [7,  5, Tile.goriya_blue, base2x1],
                [8, 10, Tile.goriya_blue],
            ]),
            /* room: 10,11 */ makeRoom("10,11", 7, 0x1A, "solid",  "bomb",   "solid",  "bomb",   null  , [
                [2,  5, Tile.goriya_blue],
                [3, 10, Tile.goriya_blue, base2x1],
                [3, 12, Tile.goriya_red],
                [5, 13, Tile.goriya_red],
                [6, 10, Tile.goriya_red],
                [7, 12, Tile.goriya_blue],
            ]),
            /* room: 10,12 */ makeRoom("10,12", 7, 0x00, "locked", "locked", "solid",  "bomb",   null  , [
                [2,  5, Tile.goriya_blue],
                [3, 12, Tile.goriya_blue],
                [4, 10, Tile.goriya_blue],
                [4, 13, Tile.goriya_blue],
                [5,  8, Tile.item_bomb],
                [6, 10, Tile.goriya_blue],
                [6, 12, Tile.goriya_blue, base2x1],
            ]),
            /* room: 10,13 */ makeRoom("10,13", 7, 0x24, "shut",   "solid",  "solid",  "locked", "dim" , [
                [4, 10, Tile.digdogger],
            ]),
            /* room: 10,14 */ makeRoom("10,14", 8, 0x11, "solid",  "bomb",   "open",   "solid",  null  , [
                [3,  4, Tile.pols_voice_orange_blue, base1x2],
                [3, 11, Tile.pols_voice_orange_blue],
                [4,  7, Tile.pols_voice_orange_blue],
                [5,  8, Tile.item_bomb],
                [6,  6, Tile.pols_voice_orange_blue],
                [6, 12, Tile.pols_voice_orange_blue],
            ]),
            /* room: 10,15 */ makeRoom("10,15", 8, 0x24, "shut",   "shut",   "locked", "bomb",   null  , [
                [3,  7, Tile.gohma_blue],
            ]),
            /* room: 10,16 */ makeRoom("10,16", 8, 0x1A, "solid",  "solid",  "solid",  "open",   null  , [
                [2,  7, Tile.darknut_red, base1x2],
                [3,  6, Tile.pols_voice_orange_blue],
                [4,  8, Tile.darknut_red],
                [5, 12, Tile.pols_voice_orange_blue],
                [7, 13, Tile.darknut_blue, base2x1],
                [8,  8, Tile.darknut_blue, base1x2],
            ]),
        ], [
            /* room: 11,01 */ makeRoom("11,01", 9, 0x1A, "bomb",   "solid",  "solid",  "solid",  null  , [
                [2,   6, Tile.wizzrobe_red_w],
                [3,   2, Tile.wizzrobe_blue_e],
                [4,   4, Tile.wizzrobe_red_n],
                [4,   6, Tile.wizzrobe_blue_e],
                [6,   2, Tile.wizzrobe_blue_e],
            ]),
            /* room: 11,02 */ makeRoom("11,02", 9, 0x25, "open",   "bomb",   "shut",   "solid",  null  , [
                [4, 11, Tile.patra_blue],
                [1, 10, Tile.patra_red, wall1x2],
                [1, 12, Tile.patra_red, wall1x2],
                [2,  9, Tile.patra_red],
                [4, 14, Tile.patra_red],
                [4,  8, Tile.patra_red],
                [6, 13, Tile.patra_red],
                [7,  9, Tile.patra_red],
                [7, 11, Tile.patra_red],
            ]),
            /* room: 11,03 */ makeRoom("11,03", 9, 0x1D, "locked", "locked", "solid",  "bomb",   null  , [
                [3,  2, Tile.zol_black],
                [3,  9, Tile.bubble_blue, base2x1],
                [4,  6, Tile.like_like],
                [5,  3, Tile.zol_black],
                [6,  3, Tile.like_like],
                [7,  8, Tile.bubble_blue, base1x2],
            ]),
            /* room: 11,04 */ makeRoom("11,04", 9, 0x12, "locked", "bomb",   "locked", "locked", null  , [
                [2,  2, Tile.gel_black],
                [2, 13, Tile.item_bomb],
                [5,  8, Tile.gel_black],
                [6,  2, Tile.gel_black],
                [6,  5, Tile.gel_black],
                [6,  8, Tile.gel_black],
                [6,  9, Tile.gel_black],
                [7, 13, Tile.gel_black],
                [8,  2, Tile.gel_black],
            ]),
            /* room: 11,05 */ makeRoom("11,05", 9, 0x17, "open",   "solid",  "open",   "bomb",   "dark", [
                [3,  3, Tile.vire],
                [3,  7, Tile.vire],
                [3, 10, Tile.vire, base2x1],
                [5,  3, Tile.vire, base2x1],
                [5, 12, Tile.vire],
            ]),
            /* room: 11,06 */ makeRoom("11,06", 9, 0x0E, "bomb",   "locked", "bomb",   "solid",  null  , [
                [3,  5, Tile.like_like],
                [3, 13, Tile.bubble_blue, base2x1],
                [5,  8, Tile.item_bomb],
                [6,  5, Tile.like_like],
                [6, 12, Tile.zol_black],
                [7,  8, Tile.bubble_blue, base2x1],
                [7, 10, Tile.zol_black, base2x1],
            ]),
            /* room: 11,07 */ makeRoom("11,07", 9, 0x03, "open",   "bomb",   "locked", "locked", null  , [
                [4,  9, Tile.gel_black, base1x2],
                [5,  5, Tile.gel_black],
                [5,  6, Tile.gel_black],
                [5,  7, Tile.gel_black, base2x1],
                [5,  8, Tile.item_rupee_blue],
                [6, 10, Tile.gel_black],
                [7,  5, Tile.gel_black],
                [8,  3, Tile.gel_black],
                [8, 10, Tile.gel_black, base1x2],
            ]),
            /* room: 11,08 */ makeRoom("11,08", 9, 0x0A, "bomb",   "solid",  "bomb",   "bomb",   null  , [
                [5,  8, Tile.item_map],
                [5,  7, Tile.patra_blue],
                [3,  6, Tile.patra_red],
                [3,  8, Tile.patra_red],
                [4,  5, Tile.patra_red],
                [4,  9, Tile.patra_red],
                [6,  5, Tile.patra_red],
                [6,  9, Tile.patra_red],
                [7,  6, Tile.patra_red],
                [7,  8, Tile.patra_red],
            ]),
            /* room: 11,09 */ makeRoom("11,09", 7, 0x26, "open",   "solid",  "locked", "solid",  "text", [
            ]),
            /* room: 11,10 */ makeRoom("11,10", 7, 0x1A, "solid",  "bomb",   "solid",  "solid",  null  , [
                [2,  9, Tile.goriya_red, base2x1],
                [2, 11, Tile.goriya_blue],
                [3, 10, Tile.goriya_red, base2x1],
                [4,  5, Tile.goriya_blue],
                [6, 10, Tile.goriya_blue],
                [7,  3, Tile.goriya_red],
            ]),
            /* room: 11,11 */ makeRoom("11,11", 7, 0x04, "solid",  "shut",   "solid",  "bomb",   null  , [
                [5,  8, Tile.item_heart_container],
                [5, 12, Tile.aquamentus],
            ]),
            /* room: 11,12 */ makeRoom("11,12", 7, 0x29, "solid",  "solid",  "solid",  "open",   "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 11,13 */ makeRoom("11,13", 8, 0x29, "solid",  "solid",  "open",   "solid",  "dim" , [
                [5,  7, Tile.item_triforce, base1x2],
            ]),
            /* room: 11,14 */ makeRoom("11,14", 8, 0x26, "open",   "bomb",   "solid",  "solid",  null  , [
                [3,  7, Tile.item_rupee_orange, base1x2],
                [4,  7, Tile.item_rupee_orange],
                [4,  8, Tile.item_rupee_orange],
                [5,  6, Tile.item_rupee_orange],
                [5,  7, Tile.item_rupee_orange],
                [5,  8, Tile.item_rupee_orange],
                [5,  9, Tile.item_rupee_orange],
                [6,  7, Tile.item_rupee_orange],
                [6,  8, Tile.item_rupee_orange],
                [7,  7, Tile.item_rupee_orange, base1x2],
            ]),
            /* room: 11,15 */ makeRoom("11,15", 8, 0x00, "locked", "solid",  "bomb",   "bomb",   null  , [
                [4, 11, Tile.manhandla],
                [5,  8, Tile.item_map],
            ]),
            /* room: 11,16 */ [[], []],
        ], [
            /* room: 12,01 */ makeRoom("12,01", 9, 0x0A, "solid",  "bomb",   "locked", "solid",  null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [3,  6, Tile.wizzrobe_blue_e],
                [4,  7, Tile.wizzrobe_blue_e, base1x2],
                [6,  6, Tile.wizzrobe_red_e],
                [6,  8, Tile.wizzrobe_red_e],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 12,02 */ makeRoom("12,02", 9, 0x25, "open",   "solid",  "shut",   "bomb",   null  , [
                [2, 10, Tile.like_like],
                [3,  2, Tile.like_like],
                [3, 11, Tile.wizzrobe_blue_w],
                [4,  7, Tile.wizzrobe_red_e],
                [6,  5, Tile.like_like],
                [6,  9, Tile.wizzrobe_blue_w],
                [7,  9, Tile.wizzrobe_red_w],
                [8,  6, Tile.bubble_blue],
            ]),
            /* room: 12,03 */ makeRoom("12,03", 9, 0x27, "solid",  "solid",  "shut",   "solid",  "dim" , [
                [4, 7, Tile.zelda_red, base2x2_center],
                [6, 7, Tile.dungeon_flame],
                [6, 8, Tile.dungeon_flame],
                [7, 6, Tile.dungeon_flame, base2x1],
                [7, 9, Tile.dungeon_flame, base2x1],
            ]),
            /* room: 12,04 */ makeRoom("12,04", 9, 0x19, "locked", "bomb",   "solid",  "solid",  "dark", [
                [2,  9, Tile.gel_black],
                [4,  7, Tile.gel_black],
                [5,  2, Tile.gel_black],
                [5,  3, Tile.gel_black],
                [6,  3, Tile.gel_black],
                [6,  7, Tile.gel_black],
                [6,  8, Tile.gel_black],
                [8,  2, Tile.gel_black],
            ]),
            /* room: 12,05 */ makeRoom("12,05", 9, 0x14, "open",   "solid",  "solid",  "bomb",   null  , [
                [3, 12, Tile.keese_blue],
                [4,  5, Tile.keese_blue],
                [4, 10, Tile.keese_blue],
                [5,  7, Tile.keese_blue],
                [5,  8, Tile.item_rupee_blue],
                [5, 12, Tile.keese_blue],
                [6,  6, Tile.keese_blue],
                [8,  5, Tile.keese_blue],
                [8, 10, Tile.keese_blue],
            ]),
            /* room: 12,06 */ makeRoom("12,06", 9, 0x26, "bomb",   "solid",  "solid",  "solid",  null  , [
                [2,  5, Tile.wizzrobe_red_e],
                [3,  8, Tile.wizzrobe_blue_w],
                [4, 11, Tile.wizzrobe_blue_e, base2x1],
                [4, 12, Tile.wizzrobe_blue_e, base2x1],
                [5,  8, Tile.item_compass],
                [5,  9, Tile.wizzrobe_red_w],
            ]),
            /* room: 12,07 */ makeRoom("12,07", 9, 0x00, "locked", "bomb",   "solid",  "solid",  null  , [
                [2,  4, Tile.bubble_blue],
                [2,  8, Tile.keese_blue, base1x2],
                [4,  5, Tile.bubble_blue],
                [4,  6, Tile.zol_black],
                [5,  4, Tile.zol_black, base2x1],
                [5,  7, Tile.keese_blue, base2x1],
                [6,  5, Tile.keese_blue, base1x2],
                [8,  2, Tile.bubble_blue],
            ]),
            /* room: 12,08 */ makeRoom("12,08", 9, 0x23, "bomb",   "solid",  "open",   "bomb",   "dim" , [
                [2,  7, Tile.vire, base2x1],
                [2, 12, Tile.vire, base1x2],
                [3, 10, Tile.vire, base2x1],
                [5,  8, Tile.item_bomb],
                [6,  4, Tile.vire, base1x2],
                [6, 13, Tile.vire],
                [7,  8, Tile.vire, base1x2],
            ]),
            /* room: 12,09 */ makeRoom("12,09", 7, 0x0D, "locked", "shut",   "solid",  "solid",  null  , [
                [2, 10, Tile.goriya_red],
                [2, 13, Tile.item_rupee_blue],
                [4,  4, Tile.goriya_blue, base1x2],
                [4,  6, Tile.goriya_red, base1x2],
                [6,  5, Tile.goriya_red],
                [6,  7, Tile.goriya_blue],
                [8, 10, Tile.goriya_blue],
            ]),
            /* room: 12,10 */ makeRoom("12,10", 7, 0x24, "solid",  "bomb",   "open",   "open",   null  , [
                [4,  6, Tile.digdogger],
            ]),
            /* room: 12,11 */ makeRoom("12,11", 7, 0x25, "solid",  "solid",  "solid",  "bomb",   null  , [
                [2,  6, Tile.moldorm],
                [3,  5, Tile.moldorm],
                [4,  5, Tile.moldorm],
                [5,  6, Tile.moldorm],
                [5,  8, Tile.item_key],
                [6,  8, Tile.moldorm],
                [7,  5, Tile.moldorm],
                [7,  6, Tile.moldorm],
                [7,  7, Tile.moldorm],
            ]),
            /* room: 12,12 */ makeRoom("12,12", 8, 0x26, "solid",  "bomb",   "open",   "solid",  "text", [
            ]),
            /* room: 12,13 */ makeRoom("12,13", 8, 0x05, "shut",   "solid",  "bomb",   "bomb",   null  , [
                [2,   7, Tile.gleeok4, base2x2_studs],
            ]),
            /* room: 12,14 */ makeRoom("12,14", 8, 0x26, "solid",  "solid",  "open",   "solid",  "text", [
            ]),
            /* room: 12,15 */ makeRoom("12,15", 8, 0x23, "bomb",   "shut",   "locked", "solid",  null  , [
                [2,   2, Tile.darknut_blue, base1x2],
                [2,   6, Tile.darknut_blue],
                [2,  10, Tile.darknut_blue, base1x2],
                [3,  11, Tile.darknut_blue],
                [4,   5, Tile.darknut_blue],
                [6,   2, Tile.darknut_blue, base1x2],
            ]),
            /* room: 12,16 */ makeRoom("12,16", 8, 0x1B, "solid",  "solid",  "solid",  "shut",   null  , [
                [2,   3, Tile.bubble_blue, base1x2],
                [2,   6, Tile.gibdo],
                [2,   8, Tile.gibdo, base1x2],
                [3,   8, Tile.darknut_blue],
                [4,   4, Tile.gibdo],
                [4,   9, Tile.bubble_blue],
                [5,   5, Tile.darknut_red],
                [5,   8, Tile.item_bomb],
                [6,   9, Tile.darknut_red, base2x1],
            ]),
        ], [
            /* room: 13,01 */ makeRoom("13,01", 9, 0x16, "locked", "solid",  "locked", "solid",  null  , [
                [3,  7, Tile.wizzrobe_red_e],
                [5,  4, Tile.wizzrobe_blue_e, base2x1],
                [5,  8, Tile.item_rupee_blue],
                [5, 11, Tile.wizzrobe_blue_e, base2x1],
                [8,  7, Tile.wizzrobe_red_n],
            ]),
            /* room: 13,02 */ makeRoom("13,02", 9, 0x00, "open",   "solid",  "shut",   "solid",  "dark", [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [2,  9, Tile.like_like],
                [2, 10, Tile.like_like],
                [3,  4, Tile.like_like, base1x2],
                [5,  7, Tile.like_like, base2x1],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 13,03 */ makeRoom("13,03", 9, 0x28, "shut",   "solid",  "shut",   "solid",  "darkOuter", [
                [3,   5, Tile.ganon, base2x2_studs],
                //[4,   9, Tile.item_triforce_sand, base1x2],
            ]),
            /* room: 13,04 */ makeRoom("13,04", 9, 0x26, "solid",  "solid",  "bomb",   "solid",  "text", [
            ]),
            /* room: 13,05 */ makeRoom("13,05", 9, 0x00, "solid",  "open",   "open",   "solid",  null  , [
                [5,  8, Tile.item_rupee_blue],
                [5, 13, Tile.wizzrobe_red_w],
                [6,  3, Tile.wizzrobe_red_e],
                [6,  5, Tile.wizzrobe_red_e],
                [6, 13, Tile.wizzrobe_red_w],
                [7, 10, Tile.wizzrobe_red_n],
                [8, 10, Tile.wizzrobe_red_n],
            ]),
            /* room: 13,06 */ makeRoom("13,06", 9, 0x00, "solid",  "open",   "bomb",   "open",   null  , [
                [2,  6, Tile.bubble_blue, base1x2],
                [2, 11, Tile.wizzrobe_blue_e, base2x1],
                [3,  8, Tile.wizzrobe_blue_w],
                [4, 10, Tile.like_like, base2x1],
                [5,  8, Tile.like_like, base1x2],
                [6,  9, Tile.wizzrobe_red_w],
                [6, 10, Tile.wizzrobe_red_w],
                [7, 12, Tile.like_like],
            ]),
            /* room: 13,07 */ makeRoom("13,07", 9, 0x25, "solid",  "solid",  "open",   "open",   null  , [
                [2,  9, Tile.wizzrobe_blue_w],
                [4,  6, Tile.wizzrobe_blue_e],
                [4,  8, Tile.wizzrobe_blue_w],
                [5,  7, Tile.wizzrobe_blue_w],
                [6,  5, Tile.wizzrobe_blue_e],
                [6,  9, Tile.wizzrobe_blue_w],
            ]),
            /* room: 13,08 */ makeRoom("13,08", 9, 0x1E, "open",   "solid",  "open",   "solid",  null  , [
                [2,  7, Tile.bubble_blue, base1x2],
                [2, 11, Tile.bubble_blue, base1x2],
                [2, 13, Tile.item_key],
                [3,  5, Tile.wizzrobe_blue_e],
                [4,  5, Tile.wizzrobe_red_e],
                [4, 13, Tile.wizzrobe_red_w],
                [5,  3, Tile.bubble_blue, base1x2],
                [7, 13, Tile.wizzrobe_blue_e, base2x1],
            ]),
            /* room: 13,09 */ makeRoom("13,09", 7, 0x26, "solid",  "solid",  "locked", "solid",  "text", [
            ]),
            /* room: 13,10 */ makeRoom("13,10", 7, 0x18, "shut",   "solid",  "open",   "solid",  null  , [
                [2,  5, Tile.keese_blue],
                [2, 10, Tile.goriya_blue, base1x2],
                [3,  3, Tile.keese_blue],
                [3,  5, Tile.bubble_blue],
                [3, 12, Tile.keese_blue],
                [5,  8, Tile.goriya_blue],
                [6,  6, Tile.bubble_blue],
                [6,  9, Tile.goriya_blue, base1x2],
            ]),
            /* room: 13,11 */ [[], []],
            /* room: 13,12 */ makeRoom("13,12", 8, 0x23, "open",   "shut",   "solid",  "solid",  "dark", [
                [3,  3, Tile.darknut_red, base1x2],
                [3,  7, Tile.darknut_red, base2x1],
                [3,  9, Tile.darknut_red, base2x1],
                [4,  4, Tile.darknut_red],
                [4,  5, Tile.darknut_red, base2x1],
                [5,  8, Tile.item_key],
                [7,  8, Tile.darknut_red, base1x2],
            ]),
            /* room: 13,13 */ makeRoom("13,13", 8, 0x1C, "bomb",   "solid",  "solid",  "shut",   null  , [
                [2,  2, Tile.pols_voice_orange_blue],
                [2, 13, Tile.item_key],
                [4,  4, Tile.pols_voice_orange_blue, base2x1],
                [4, 13, Tile.pols_voice_orange_blue, base2x1],
                [6, 10, Tile.pols_voice_orange_blue],
                [6, 13, Tile.pols_voice_orange_blue, base2x1],
                [8,  2, Tile.pols_voice_orange_blue, base1x2],
                [8,  7, Tile.pols_voice_orange_blue],
                [8, 12, Tile.pols_voice_orange_blue, base1x2],
            ]),
            /* room: 13,14 */ makeRoom("13,14", 8, 0x25, "shut",   "locked", "open",   "solid",  null  , [
                [4,  8, Tile.gohma_blue],
            ]),
            /* room: 13,15 */ makeRoom("13,15", 8, 0x00, "locked", "solid",  "open",   "locked", null  , [
                [2,  6, Tile.gibdo],
                [2,  9, Tile.darknut_blue, base1x2],
                [3,  2, Tile.gibdo],
                [4,  6, Tile.bubble_blue, base1x2],
                [4, 12, Tile.darknut_red],
                [5,  8, Tile.item_rupee_blue],
                [5,  9, Tile.darknut_red, base2x1],
                [7,  5, Tile.gibdo],
                [7,  7, Tile.bubble_blue, base1x2],
            ]),
            /* room: 13,16 */ [[], []],
        ], [
            /* room: 14,01 */ makeRoom("14,01", 9, 0x14, "locked", "shut",   "solid",  "solid",  "dark", [
                [2, 10, Tile.zol_black, base1x2],
                [5,  2, Tile.zol_black, base2x1],
                [5,  4, Tile.zol_black],
                [5,  8, Tile.zol_black],
                [8,  7, Tile.zol_black, base1x2],
            ]),
            /* room: 14,02 */ makeRoom("14,02", 9, 0x11, "open",   "solid",  "open",   "shut",   null  , [
                [2,  5, Tile.like_like],
                [2, 10, Tile.like_like],
                [4,  8, Tile.like_like, base1x2],
                [5,  8, Tile.like_like],
                [6,  5, Tile.like_like, base2x1],
                [6, 10, Tile.like_like],
            ]),
            /* room: 14,03 */ makeRoom("14,03", 9, 0x1B, "shut",   "solid",  "solid",  "solid",  null  , [
                [5,  7, Tile.patra_blue],
                [3,  5, Tile.patra_red, base2x2_center],
                [3,  7, Tile.patra_red],
                [3,  8, Tile.patra_red, base2x2_center],
                [5,  4, Tile.patra_red, base1x2],
                [5,  9, Tile.patra_red, base1x2],
                [6,  5, Tile.patra_red, base2x2_center],
                [6,  8, Tile.patra_red, base2x2_center],
                [7,  7, Tile.patra_red],
            ]),
            /* room: 14,04 */ makeRoom("14,04", 9, 0x23, "bomb",   "solid",  "locked", "solid",  null  , [
                [2,  5, Tile.bubble_blue, base1x2],
                [3,  2, Tile.wizzrobe_red_e],
                [3,  4, Tile.wizzrobe_blue_w],
                [3,  7, Tile.like_like, base2x1],
                [3, 13, Tile.like_like, base2x1],
                [6,  5, Tile.like_like, base1x2],
                [7,  2, Tile.wizzrobe_red_n],
                [7,  6, Tile.wizzrobe_blue_w],
            ]),
            /* room: 14,05 */ makeRoom("14,05", 9, 0x0C, "open",   "bomb",   "open",   "solid",  null  , [
                [2, 10, Tile.wizzrobe_blue_e, base1x2],
                [6,  6, Tile.wizzrobe_red_e],
                [6, 10, Tile.wizzrobe_red_w],
                [6, 12, Tile.wizzrobe_blue_e, base2x1],
                [7,  5, Tile.wizzrobe_blue_w],
            ]),
            /* room: 14,06 */ makeRoom("14,06", 9, 0x1A, "bomb",   "bomb",   "bomb",   "bomb",   null  , [
                [2,  6, Tile.lanmola_body_red, base1x2],
                [3,  6, Tile.lanmola_body_red],
                [4,  6, Tile.lanmola_body_red],
                [4,  5, Tile.lanmola_head_red],
                [5,  3, Tile.lanmola_body_red],
                [6,  3, Tile.lanmola_body_red],
                [6,  4, Tile.lanmola_body_red],
                [6,  5, Tile.lanmola_head_red],
            ]),
            /* room: 14,07 */ makeRoom("14,07", 9, 0x19, "open",   "solid",  "open",   "bomb",   null  , [
                [4,  7, Tile.zol_black, base2x1],
                [4, 10, Tile.like_like, base2x1],
                [5,  6, Tile.bubble_blue],
                [5,  8, Tile.item_key],
                [6,  8, Tile.zol_black, base1x2],
                [8,  6, Tile.bubble_blue, base1x2],
                [8, 10, Tile.like_like, base1x2],
            ]),
            /* room: 14,08 */ makeRoom("14,08", 9, 0x14, "open",   "solid",  "solid",  "solid",  "dark", [
                [2,  5, Tile.wizzrobe_blue_w, base1x2],
                [2,  8, Tile.wizzrobe_blue_w],
                [5,  4, Tile.wizzrobe_red_e],
                [5,  8, Tile.item_key],
                [6,  5, Tile.wizzrobe_blue_w],
                [8,  5, Tile.wizzrobe_red_n],
            ]),
            /* room: 14,09 */ makeRoom("14,09", 7, 0x00, "locked", "open",   "open",   "solid",  null  , [
                [2,  8, Tile.dodongo_w, base1x2],
                [5,  8, Tile.item_rupee_blue],
                [5,  9, Tile.dodongo_s],
                [5, 12, Tile.dodongo_e],
            ]),
            /* room: 14,10 */ makeRoom("14,10", 7, 0x02, "open",   "shut",   "bomb",   "open",   null  , [
                [2,  6, Tile.goriya_red],
                [2,  8, Tile.goriya_red],
                [2, 12, Tile.goriya_blue],
                [3, 11, Tile.goriya_blue],
                [6,  5, Tile.goriya_blue],
                [7, 10, Tile.goriya_red, base2x1],
            ]),
            /* room: 14,11 */ makeRoom("14,11", 7, 0x19, "solid",  "solid",  "bomb",   "open",   "dark", [
                [2,  7, Tile.stalfos],
                [2,  8, Tile.stalfos],
                [4,  6, Tile.stalfos],
                [4, 11, Tile.stalfos, base1x2],
                [4, 13, Tile.stalfos],
                [5,  4, Tile.stalfos],
                [6,  9, Tile.stalfos_compass, base1x2],
                [6, 11, Tile.stalfos],
            ]),
            /* room: 14,12 */ makeRoom("14,12", 7, 0x26, "solid",  "solid",  "open",   "solid",  "text", [
            ]),
            /* room: 14,13 */ makeRoom("14,13", 8, 0x24, "solid",  "open",   "solid",  "solid",  "dim" , [
                [2,  3, Tile.darknut_red, base2x1],
                [3,  2, Tile.darknut_red, base2x1],
                [5,  8, Tile.item_key],
                [5, 11, Tile.darknut_red],
            ]),
            /* room: 14,14 */ makeRoom("14,14", 8, 0x11, "open",   "open",   "solid",  "open",   "dark", [
                [3,  4, Tile.pols_voice_orange_blue, base1x2],
                [4,  9, Tile.pols_voice_orange_blue, base1x2],
                [5,  2, Tile.gibdo],
                [5,  8, Tile.item_key],
                [5, 12, Tile.keese_blue, base2x1],
                [6,  3, Tile.keese_blue],
                [8,  6, Tile.gibdo, base1x2],
            ]),
            /* room: 14,15 */ makeRoom("14,15", 8, 0x24, "shut",   "locked", "bomb",   "shut",   null  , [
                [2,  5, Tile.darknut_blue, base1x2],
                [3,  3, Tile.darknut_blue],
                [3, 12, Tile.darknut_blue],
                [5,  8, Tile.item_key],
                [5, 10, Tile.darknut_blue, base2x1],
                [6,  5, Tile.darknut_blue, base1x2],
            ]),
            /* room: 14,16 */ makeRoom("14,16", 8, 0x18, "solid",  "solid",  "solid",  "locked", "dark", [
                [2,  2, Tile.pols_voice_orange_blue, base2x1],
                [2,  3, Tile.pols_voice_orange_blue],
                [2,  8, Tile.pols_voice_orange_blue],
                [2, 11, Tile.pols_voice_orange_blue],
                [4, 10, Tile.pols_voice_orange_blue, base1x2],
                [4, 12, Tile.pols_voice_orange_blue],
                [5,  3, Tile.pols_voice_orange_blue],
                [5,  8, Tile.item_compass],
                [7,  7, Tile.pols_voice_orange_blue, base2x1],
            ]),
        ], [
            /* room: 15,01 */ [[], []],
            /* room: 15,02 */ makeRoom("15,02", 9, 0x1A, "open",   "open",   "open",   "solid",  null  , [
                [4,  8, Tile.patra_blue],
                [2,  4, Tile.patra_red, base2x1],
                [2,  6, Tile.patra_red],
                [2,  8, Tile.patra_red],
                [3, 11, Tile.patra_red, base2x1],
                [4,  5, Tile.patra_red, base2x1],
                [5, 12, Tile.patra_red, base2x1],
                [6,  8, Tile.patra_red],
                [6, 10, Tile.patra_red],
            ]),
            /* room: 15,03 */ makeRoom("15,03", 9, 0x26, "solid",  "locked", "solid",  "open",   null  , [
                [2,  5, Tile.keese_blue],
                [3, 13, Tile.keese_blue],
                [4,  8, Tile.keese_blue],
                [4, 10, Tile.keese_blue],
                [5,  8, Tile.item_rupee_blue],
                [5, 10, Tile.keese_blue, base2x1],
                [6,  8, Tile.keese_blue],
                [7, 13, Tile.keese_blue],
                [8,  5, Tile.keese_blue],
            ]),
            /* room: 15,04 */ makeRoom("15,04", 9, 0x1B, "locked", "solid",  "locked", "locked", null  , [
                [4,  5, Tile.zol_black],
                [4,  7, Tile.zol_black, base2x1],
                [6,  3, Tile.zol_black, base2x1],
                [6,  6, Tile.zol_black],
                [7,  5, Tile.zol_black, base2x1],
            ]),
            /* room: 15,05 */ makeRoom("15,05", 9, 0x1F, "open",   "open",   "solid",  "solid",  null  , [
                [3,  5, Tile.like_like, base1x2],
                [4,  4, Tile.bubble_blue, base1x2],
                [4,  9, Tile.wizzrobe_blue_e],
                [5,  9, Tile.wizzrobe_red_e],
                [5, 12, Tile.wizzrobe_red_e],
                [6,  7, Tile.wizzrobe_blue_e],
                [6,  8, Tile.like_like, base1x2],
                [7, 10, Tile.like_like, base2x1],
            ]),
            /* room: 15,06 */ makeRoom("15,06", 9, 0x18, "bomb",   "open",   "solid",  "open",   "dark", [
                [2,  7, Tile.bubble_blue],
                [2, 13, Tile.wizzrobe_red_e],
                [3,  9, Tile.wizzrobe_blue_e],
                [4, 12, Tile.wizzrobe_blue_n],
                [6,  9, Tile.wizzrobe_red_e],
                [6, 12, Tile.wizzrobe_blue_e],
                [7, 13, Tile.bubble_blue, base2x1],
                [8,  8, Tile.bubble_blue],
            ]),
            /* room: 15,07 */ makeRoom("15,07", 9, 0x26, "shut",   "solid",  "open",   "shut",   "text", [
            ]),
            /* room: 15,08 */ [[], []],
            /* room: 15,09 */ makeRoom("15,09", 7, 0x00, "open",   "bomb",   "open",   "solid",  null  , [
                [2,  2, Tile.trap_nw],
                [2, 13, Tile.trap_ne],
                [3, 10, Tile.keese_blue, base1x2],
                [4,  2, Tile.keese_blue, base1x2],
                [5,  7, Tile.keese_blue],
                [5,  8, Tile.item_bomb],
                [5, 10, Tile.keese_blue],
                [8,  2, Tile.trap_sw],
                [8, 13, Tile.trap_se],
            ]),
            /* room: 15,10 */ makeRoom("15,10", 7, 0x23, "bomb",   "open",   "open",   "bomb",   null  , [
                [2,  5, Tile.goriya_blue],
                [2, 11, Tile.goriya_blue],
                [3,  6, Tile.goriya_blue, base2x1],
                [4,  9, Tile.goriya_blue],
                [5,  8, Tile.item_bomb],
                [6,  5, Tile.goriya_blue, base2x1],
            ]),
            /* room: 15,11 */ makeRoom("15,11", 7, 0x09, "bomb",   "open",   "open",   "open",   "dark", [
                [2,  8, Tile.keese_blue],
                [4,  3, Tile.keese_blue],
                [4,  6, Tile.keese_blue],
                [4,  8, Tile.keese_blue],
                [5,  2, Tile.keese_blue, base1x2],
                [5, 13, Tile.keese_blue],
                [6, 12, Tile.keese_blue],
                [6, 13, Tile.keese_blue],
            ]),
            /* room: 15,12 */ makeRoom("15,12", 7, 0x1E, "shut",   "open",   "solid",  "open",   null  , [
                [2,  5, Tile.goriya_blue],
                [3, 12, Tile.goriya_blue],
                [4, 10, Tile.goriya_blue],
                [5, 13, Tile.goriya_blue],
                [6, 12, Tile.goriya_blue, base2x1],
                [8,  5, Tile.goriya_blue],
            ]),
            /* room: 15,13 */ makeRoom("15,13", 7, 0x24, "solid",  "open",   "solid",  "open",   "dim" , [
                [3,  9, Tile.digdogger],
                [5,  8, Tile.item_bomb],
            ]),
            /* room: 15,14 */ makeRoom("15,14", 7, 0x13, "solid",  "solid",  "solid",  "open",   null  , [
                [2,  4, Tile.stalfos],
                [3,  8, Tile.stalfos],
                [3, 12, Tile.stalfos, base2x1],
                [4, 13, Tile.stalfos],
                [5,  8, Tile.stalfos],
                [5, 13, Tile.stalfos_key, base2x1],
                [6, 12, Tile.stalfos],
                [7,  5, Tile.stalfos],
            ]),
            /* room: 15,15 */ makeRoom("15,15", 8, 0x25, "bomb",   "solid",  "open",   "solid",  null  , [
                [5,  8, Tile.item_rupee_blue],
                [6, 11, Tile.manhandla],
            ]),
            /* room: 15,16 */ [[], []],
        ], [
            /* room: 16,01 */ [[], []],
            /* room: 16,02 */ makeRoom("16,02", 9, 0x1B, "open",   "solid",  "solid",  "solid",  null  , [
            ]),
            /* room: 16,03 */ [[], []],
            /* room: 16,04 */ makeRoom("16,04", 9, 0x1F, "locked", "locked", "solid",  "solid",  null  , [
                [2,  9, Tile.wizzrobe_blue_e],
                [2, 10, Tile.wizzrobe_blue_e],
                [2, 11, Tile.bubble_blue],
                [5,  9, Tile.wizzrobe_red_e],
                [5, 10, Tile.wizzrobe_red_e],
                [7,  2, Tile.bubble_blue, base2x1],
                [8,  4, Tile.wizzrobe_blue_e, base1x2],
                [8,  7, Tile.bubble_blue, base1x2],
            ]),
            /* room: 16,05 */ makeRoom("16,05", 9, 0x1A, "solid",  "solid",  "solid",  "locked", null  , [
                [2,  4, Tile.lanmola_body_blue],
                [2,  5, Tile.lanmola_body_blue],
                [2,  6, Tile.lanmola_body_blue],
                [2,  7, Tile.lanmola_head_blue],

                [8,  4, Tile.lanmola_body_blue],
                [8,  5, Tile.lanmola_body_blue],
                [8,  6, Tile.lanmola_body_blue],
                [7,  6, Tile.lanmola_head_blue],
            ]),
            /* room: 16,06 */ [[], []],
            /* room: 16,07 */ makeRoom("16,07", 9, 0x21, "open",   "solid",  "open",   "solid",  "dim" , [
            ]),
            /* room: 16,08 */ [[], []],
            /* room: 16,09 */ makeRoom("16,09", 7, 0x23, "open",   "solid",  "solid",  "solid",  "dim" , [
                [4,  2, Tile.rope_w],
                [5,  8, Tile.item_key],
                [6,  3, Tile.rope_w],
                [6,  6, Tile.rope_w],
                [8,  2, Tile.rope_w],
                [8,  7, Tile.rope_e],
            ]),
            /* room: 16,10 */ makeRoom("16,10", 7, 0x21, "open",   "open",   "open",   "solid",  null  , [
            ]),
            /* room: 16,11 */ makeRoom("16,11", 7, 0x1D, "open",   "solid",  "solid",  "open",   null  , [
                [2,  4, Tile.moldorm],
                [3,  5, Tile.moldorm],
                [3,  6, Tile.moldorm],
                [3,  7, Tile.moldorm],

                [3,  9, Tile.moldorm],
                [3, 10, Tile.moldorm],
                [3, 11, Tile.moldorm],
                [4,  9, Tile.moldorm],

                [5,  8, Tile.item_bomb],
            ]),
            /* room: 16,12 */ [[], []],
            /* room: 16,13 */ makeRoom("16,13", 8, 0x1A, "solid",  "open",   "solid",  "solid",  null  , [
                [3,  5, Tile.darknut_red, base1x2],
                [3, 10, Tile.gibdo],
                [4,  2, Tile.darknut_blue, base1x2],
                [5,  3, Tile.darknut_red, base2x1],
                [5,  5, Tile.gibdo],
                [7,  3, Tile.bubble_blue],
                [7, 10, Tile.gibdo],
                [7, 12, Tile.bubble_blue],
            ]),
            /* room: 16,14 */ makeRoom("16,14", 8, 0x23, "solid",  "open",   "solid",  "shut",   null  , [
                [5,  8, Tile.item_rupee_blue],
                [6,  4, Tile.manhandla, base1x2],
            ]),
            /* room: 16,15 */ makeRoom("16,15", 8, 0x21, "open",   "open",   "open",   "open",   null  , [
            ]),
            /* room: 16,16 */ makeRoom("16,16", 8, 0x16, "solid",  "solid",  "solid",  "open",   "dark", [
                [2,  7, Tile.keese_blue, base1x2],
                [3,  6, Tile.keese_blue],
                [4, 12, Tile.zol_deep_gray],
                [5,  6, Tile.bubble_blue],
                [5,  8, Tile.item_key],
                [6,  7, Tile.bubble_blue],
                [7,  9, Tile.keese_blue],
                [7, 11, Tile.bubble_blue],
                [7, 12, Tile.zol_deep_gray],
            ]),
        ],
        [],
        [
            [[], []],
            makePassageRoom(                        [[0,  9], [2,  4], [5, 13], [7,  2]]),
            [[], []],
            makeItemRoom(Tile.item_bow,             [[0,  5], [2,  8], [6, 12], [9, 14]]),
            makeItemRoom(Tile.item_raft,            [[1, 15], [3,  1], [5,  4], [7, 10]]),
            makeItemRoom(Tile.item_stepladder,      [[2, 13], [4,  0], [8,  9], [9,  6]]),
            makeItemRoom(Tile.item_recorder,        [[0, 11], [3, 14], [5,  2], [7,  7]]),
            makeItemRoom(Tile.item_magical_rod,     [[1,  3], [4,  5], [6,  8], [8, 12]]),
            makeItemRoom(Tile.item_candle_red,      [[2, 10], [5, 15], [7,  1], [9,  0]]),
            makeItemRoom(Tile.item_book_of_magic,   [[2, 11], [4, 14], [5,  7], [6,  2]]),
            makeItemRoom(Tile.item_magical_key,     [[0,  4], [1,  9], [3,  6], [8, 13]]),
            makeItemRoom(Tile.item_ring_red,        [[1,  0], [4,  6], [6, 10], [8, 15]]),
            makeItemRoom(Tile.item_silver_arrow,    [[0,  3], [3, 12], [7,  5], [9,  8]]),
            [[], []],
            makePassageRoom(                        [[1,  7], [3,  0], [8, 11], [9, 14]]),
            [[], []],
        ],
    ];
}
