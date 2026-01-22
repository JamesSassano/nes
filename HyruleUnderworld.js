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
        ".B........B.",
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

        const defaultPalette
              = new Palette(colorMedium,    colorWater,     colorLight);

        this.paletteTypes = {
            defaultPalette: [defaultPalette],
            dark: [
                new Palette(colorDark,      colorWater,     colorMedium),
                new Palette(colorDark,      colorMedium,    colorWater),
            ],
            dim: [
                defaultPalette,
                new Palette(colorMedium,    colorDark,      colorLight),
            ],
            sand: [
                defaultPalette,
                new Palette(NESColor.orange,    NESColor.bubblegum, NESColor.red),
            ],
            text: [
                defaultPalette,
                Palette.text,
            ],
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

const roomSprites = {
};

export function getMapRowData() {
    function makeRoom(position, levelNumber, roomTemplateIndex, doorN, doorE, doorS, doorW, paletteType) {
        const texts = roomTexts[position];
        const sprites = roomSprites[position] || [];
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

        return [levelDataMap[levelNumber].getRoomPaletts(paletteType), roomData];
    }

    return [
        [
            /* room: 01,01 */ makeRoom("01,01", 4, 0x26, "solid",  "locked", "open",   "solid",  "text"),
            /* room: 01,02 */ makeRoom("01,02", 4, 0x16, "solid",  "open",   "bomb",   "locked", "dark"),
            /* room: 01,03 */ makeRoom("01,03", 4, 0x01, "solid",  "solid",  "open",   "open",   "dark"),
            /* room: 01,04 */ makeRoom("01,04", 4, 0x29, "solid",  "solid",  "open",   "solid",  "dim" ),
            /* room: 01,05 */ [[], []],
            /* room: 01,06 */ makeRoom("01,06", 5, 0x22, "solid",  "locked", "solid",  "solid",  null  ),
            /* room: 01,07 */ makeRoom("01,07", 5, 0x1A, "solid",  "solid",  "locked", "locked", null  ),
            /* room: 01,08 */ [[], []],
            /* room: 01,09 */ [[], []],
            /* room: 01,10 */ makeRoom("01,10", 6, 0x0A, "solid",  "bomb",   "locked", "solid",  null  ),
            /* room: 01,11 */ makeRoom("01,11", 6, 0x0A, "solid",  "bomb",   "shut",   "bomb",   null  ),
            /* room: 01,12 */ makeRoom("01,12", 6, 0x26, "solid",  "solid",  "open",   "bomb",   "text"),
            /* room: 01,13 */ makeRoom("01,13", 6, 0x29, "solid",  "solid",  "open",   "solid",  "dim" ),
            /* room: 01,14 */ makeRoom("01,14", 2, 0x29, "solid",  "open",   "solid",  "solid",  "dim" ),
            /* room: 01,15 */ makeRoom("01,15", 2, 0x25, "solid",  "solid",  "open",   "shut",   null  ),
            /* room: 01,16 */ [[], []],
        ], [
            /* room: 02,01 */ makeRoom("02,01", 4, 0x06, "shut",   "bomb",   "shut",   "solid",  "dim" ),
            /* room: 02,02 */ makeRoom("02,02", 4, 0x26, "bomb",   "bomb",   "bomb",   "bomb",   null  ),
            /* room: 02,03 */ makeRoom("02,03", 4, 0x0A, "open",   "shut",   "solid",  "bomb",   null  ),
            /* room: 02,04 */ makeRoom("02,04", 4, 0x05, "shut",   "solid",  "solid",  "shut",   null  ),
            /* room: 02,05 */ makeRoom("02,05", 5, 0x29, "solid",  "solid",  "open",   "solid",  "dim" ),
            /* room: 02,06 */ makeRoom("02,06", 5, 0x26, "solid",  "solid",  "bomb",   "solid",  "text"),
            /* room: 02,07 */ makeRoom("02,07", 5, 0x18, "locked", "bomb",   "solid",  "solid",  null  ),
            /* room: 02,08 */ makeRoom("02,08", 5, 0x26, "solid",  "solid",  "solid",  "bomb",   "text"),
            /* room: 02,09 */ makeRoom("02,09", 6, 0x05, "solid",  "shut",   "shut",   "solid",  null  ),
            /* room: 02,10 */ makeRoom("02,10", 6, 0x13, "locked", "open",   "locked", "open",   null  ),
            /* room: 02,11 */ makeRoom("02,11", 6, 0x18, "open",   "open",   "solid",  "open",   "dark"),
            /* room: 02,12 */ makeRoom("02,12", 6, 0x03, "shut",   "solid",  "solid",  "open",   null  ),
            /* room: 02,13 */ makeRoom("02,13", 6, 0x06, "shut",   "solid",  "open",   "solid",  "dim" ),
            /* room: 02,14 */ makeRoom("02,14", 6, 0x1B, "solid",  "solid",  "open",   "solid",  null  ),
            /* room: 02,15 */ makeRoom("02,15", 2, 0x0D, "shut",   "bomb",   "shut",   "solid",  null  ),
            /* room: 02,16 */ makeRoom("02,16", 2, 0x26, "solid",  "solid",  "open",   "bomb",   "text"),
        ], [
            /* room: 03,01 */ makeRoom("03,01", 4, 0x15, "open",   "open",   "locked", "solid",  null  ),
            /* room: 03,02 */ makeRoom("03,02", 4, 0x12, "bomb",   "solid",  "locked", "open",   "dark"),
            /* room: 03,03 */ makeRoom("03,03", 1, 0x1A, "solid",  "locked", "solid",  "solid",  null  ),
            /* room: 03,04 */ makeRoom("03,04", 1, 0x15, "solid",  "solid",  "locked", "locked", null  ),
            /* room: 03,05 */ makeRoom("03,05", 5, 0x24, "shut",   "locked", "open",   "solid",  "dim" ),
            /* room: 03,06 */ makeRoom("03,06", 5, 0x07, "bomb",   "open",   "solid",  "locked", null  ),
            /* room: 03,07 */ makeRoom("03,07", 5, 0x14, "solid",  "locked", "solid",  "open",   null  ),
            /* room: 03,08 */ makeRoom("03,08", 5, 0x15, "solid",  "solid",  "open",   "locked", "dark"),
            /* room: 03,09 */ makeRoom("03,09", 6, 0x0D, "open",   "bomb",   "shut",   "solid",  null  ),
            /* room: 03,10 */ makeRoom("03,10", 6, 0x14, "locked", "solid",  "open",   "bomb",   "dark"),
            /* room: 03,11 */ makeRoom("03,11", 3, 0x1D, "solid",  "shut",   "solid",  "solid",  null  ),
            /* room: 03,12 */ makeRoom("03,12", 3, 0x26, "solid",  "solid",  "open",   "open",   "text"),
            /* room: 03,13 */ makeRoom("03,13", 6, 0x00, "locked", "open",   "open",   "solid",  null  ),
            /* room: 03,14 */ makeRoom("03,14", 6, 0x13, "open",   "solid",  "solid",  "open",   "dark"),
            /* room: 03,15 */ makeRoom("03,15", 2, 0x1D, "shut",   "locked", "open",   "solid",  null  ),
            /* room: 03,16 */ makeRoom("03,16", 2, 0x00, "open",   "solid",  "bomb",   "locked", null  ),
        ], [
            /* room: 04,01 */ makeRoom("04,01", 4, 0x18, "locked", "locked", "open",   "solid",  "dark"),
            /* room: 04,02 */ makeRoom("04,02", 4, 0x17, "locked", "shut",   "solid",  "locked", null  ),
            /* room: 04,03 */ makeRoom("04,03", 4, 0x0A, "solid",  "solid",  "solid",  "open",   null  ),
            /* room: 04,04 */ makeRoom("04,04", 1, 0x17, "locked", "solid",  "open",   "solid",  null  ),
            /* room: 04,05 */ makeRoom("04,05", 5, 0x1E, "shut",   "solid",  "solid",  "solid",  null  ),
            /* room: 04,06 */ makeRoom("04,06", 1, 0x04, "solid",  "shut",   "locked", "solid",  null  ),
            /* room: 04,07 */ makeRoom("04,07", 1, 0x29, "solid",  "solid",  "solid",  "open",   "dim" ),
            /* room: 04,08 */ makeRoom("04,08", 5, 0x17, "open",   "solid",  "open",   "solid",  "dark"),
            /* room: 04,09 */ makeRoom("04,09", 6, 0x0A, "shut",   "solid",  "shut",   "solid",  null  ),
            /* room: 04,10 */ makeRoom("04,10", 6, 0x13, "shut",   "shut",   "solid",  "solid",  "dark"),
            /* room: 04,11 */ makeRoom("04,11", 6, 0x22, "solid",  "solid",  "solid",  "open",   null  ),
            /* room: 04,12 */ makeRoom("04,12", 3, 0x0A, "shut",   "solid",  "locked", "solid",  null  ),
            /* room: 04,13 */ makeRoom("04,13", 6, 0x17, "shut",   "solid",  "solid",  "solid",  "dark"),
            /* room: 04,14 */ makeRoom("04,14", 3, 0x29, "solid",  "solid",  "open",   "solid",  "dim" ),
            /* room: 04,15 */ makeRoom("04,15", 2, 0x25, "open",   "open",   "open",   "solid",  "sand"),
            /* room: 04,16 */ makeRoom("04,16", 2, 0x00, "bomb",   "solid",  "bomb",   "open",   null  ),
        ], [
            /* room: 05,01 */ makeRoom("05,01", 4, 0x15, "open",   "solid",  "open",   "solid",  "dark"),
            /* room: 05,02 */ makeRoom("05,02", 1, 0x26, "solid",  "open",   "solid",  "solid",  "text"),
            /* room: 05,03 */ makeRoom("05,03", 1, 0x22, "solid",  "open",   "locked", "shut",   null  ),
            /* room: 05,04 */ makeRoom("05,04", 1, 0x1F, "open",   "locked", "bomb",   "open",   null  ),
            /* room: 05,05 */ makeRoom("05,05", 1, 0x02, "solid",  "open",   "bomb",   "locked", null  ),
            /* room: 05,06 */ makeRoom("05,06", 1, 0x0D, "locked", "solid",  "solid",  "open",   null  ),
            /* room: 05,07 */ makeRoom("05,07", 5, 0x12, "solid",  "open",   "locked", "solid",  "dark"),
            /* room: 05,08 */ makeRoom("05,08", 5, 0x15, "open",   "solid",  "open",   "open",   null  ),
            /* room: 05,09 */ makeRoom("05,09", 6, 0x01, "open",   "solid",  "open",   "solid",  null  ),
            /* room: 05,10 */ makeRoom("05,10", 3, 0x00, "solid",  "open",   "open",   "solid",  null  ),
            /* room: 05,11 */ makeRoom("05,11", 3, 0x0F, "solid",  "locked", "open",   "open",   null  ),
            /* room: 05,12 */ makeRoom("05,12", 3, 0x08, "locked", "locked", "open",   "locked", null  ),
            /* room: 05,13 */ makeRoom("05,13", 3, 0x00, "solid",  "bomb",   "open",   "locked", null  ),
            /* room: 05,14 */ makeRoom("05,14", 3, 0x25, "shut",   "solid",  "shut",   "bomb",   "sand"),
            /* room: 05,15 */ makeRoom("05,15", 2, 0x02, "open",   "open",   "shut",   "solid",  null  ),
            /* room: 05,16 */ makeRoom("05,16", 2, 0x24, "bomb",   "solid",  "bomb",   "open",   "dim" ),
        ], [
            /* room: 06,01 */ makeRoom("06,01", 4, 0x11, "open",   "open",   "solid",  "solid",  "dark"),
            /* room: 06,02 */ makeRoom("06,02", 4, 0x03, "solid",  "solid",  "open",   "open",   null  ),
            /* room: 06,03 */ makeRoom("06,03", 1, 0x1E, "locked", "shut",   "solid",  "solid",  null  ),
            /* room: 06,04 */ makeRoom("06,04", 1, 0x02, "bomb",   "open",   "open",   "open",   null  ),
            /* room: 06,05 */ makeRoom("06,05", 1, 0x03, "bomb",   "solid",  "solid",  "open",   null  ),
            /* room: 06,06 */ makeRoom("06,06", 5, 0x13, "solid",  "shut",   "open",   "solid",  null  ),
            /* room: 06,07 */ makeRoom("06,07", 5, 0x00, "locked", "open",   "open",   "shut",   null  ),
            /* room: 06,08 */ makeRoom("06,08", 5, 0x17, "open",   "solid",  "solid",  "open",   "dark"),
            /* room: 06,09 */ makeRoom("06,09", 6, 0x24, "shut",   "solid",  "open",   "solid",  null  ),
            /* room: 06,10 */ makeRoom("06,10", 3, 0x1D, "open",   "locked", "shut",   "solid",  null  ),
            /* room: 06,11 */ makeRoom("06,11", 3, 0x00, "open",   "open",   "solid",  "locked", null  ),
            /* room: 06,12 */ makeRoom("06,12", 3, 0x00, "open",   "bomb",   "open",   "open",   null  ),
            /* room: 06,13 */ makeRoom("06,13", 3, 0x1F, "open",   "shut",   "solid",  "bomb",   null  ),
            /* room: 06,14 */ makeRoom("06,14", 3, 0x1E, "shut",   "solid",  "solid",  "shut",   null  ),
            /* room: 06,15 */ makeRoom("06,15", 2, 0x1F, "open",   "locked", "open",   "solid",  null  ),
            /* room: 06,16 */ makeRoom("06,16", 2, 0x03, "bomb",   "solid",  "bomb",   "locked", null  ),
        ], [
            /* room: 07,01 */ [[], []],
            /* room: 07,02 */ makeRoom("07,02", 4, 0x02, "open",   "locked", "open",   "solid",  null  ),
            /* room: 07,03 */ makeRoom("07,03", 4, 0x0C, "solid",  "solid",  "solid",  "locked", "dark"),
            /* room: 07,04 */ makeRoom("07,04", 1, 0x1E, "open",   "solid",  "locked", "solid",  null  ),
            /* room: 07,05 */ makeRoom("07,05", 5, 0x1A, "solid",  "bomb",   "solid",  "solid",  null  ),
            /* room: 07,06 */ makeRoom("07,06", 5, 0x02, "shut",   "bomb",   "solid",  "bomb",   null  ),
            /* room: 07,07 */ makeRoom("07,07", 5, 0x18, "shut",   "locked", "open",   "bomb",   "dark"),
            /* room: 07,08 */ makeRoom("07,08", 5, 0x26, "solid",  "solid",  "bomb",   "locked", "text"),
            /* room: 07,09 */ makeRoom("07,09", 6, 0x1D, "open",   "solid",  "open",   "solid",  null  ),
            /* room: 07,10 */ makeRoom("07,10", 3, 0x1B, "open",   "solid",  "solid",  "solid",  null  ),
            /* room: 07,11 */ makeRoom("07,11", 6, 0x26, "solid",  "solid",  "locked", "solid",  "text"),
            /* room: 07,12 */ makeRoom("07,12", 3, 0x11, "open",   "solid",  "open",   "solid",  null  ),
            /* room: 07,13 */ makeRoom("07,13", 2, 0x00, "solid",  "open",   "solid",  "solid",  null  ),
            /* room: 07,14 */ makeRoom("07,14", 2, 0x03, "solid",  "open",   "open",   "shut",   null  ),
            /* room: 07,15 */ makeRoom("07,15", 2, 0x0D, "open",   "locked", "open",   "open",   null  ),
            /* room: 07,16 */ makeRoom("07,16", 2, 0x1E, "bomb",   "solid",  "solid",  "locked", null  ),
        ], [
            /* room: 08,01 */ makeRoom("08,01", 4, 0x00, "solid",  "open",   "solid",  "solid",  null  ),
            /* room: 08,02 */ makeRoom("08,02", 4, 0x21, "open",   "solid",  "open",   "open",   null  ),
            /* room: 08,03 */ makeRoom("08,03", 1, 0x00, "solid",  "open",   "solid",  "solid",  null  ),
            /* room: 08,04 */ makeRoom("08,04", 1, 0x21, "locked", "open",   "open",   "open",   null  ),
            /* room: 08,05 */ makeRoom("08,05", 1, 0x1D, "solid",  "solid",  "solid",  "open",   null  ),
            /* room: 08,06 */ [[], []],
            /* room: 08,07 */ makeRoom("08,07", 5, 0x21, "open",   "open",   "open",   "solid",  null  ),
            /* room: 08,08 */ makeRoom("08,08", 5, 0x1D, "bomb",   "solid",  "solid",  "open",   null  ),
            /* room: 08,09 */ makeRoom("08,09", 6, 0x1F, "open",   "locked", "solid",  "solid",  null  ),
            /* room: 08,10 */ makeRoom("08,10", 6, 0x21, "solid",  "open",   "open",   "locked", null  ),
            /* room: 08,11 */ makeRoom("08,11", 6, 0x03, "locked", "solid",  "solid",  "open",   "dark"),
            /* room: 08,12 */ makeRoom("08,12", 3, 0x03, "open",   "open",   "solid",  "solid",  null  ),
            /* room: 08,13 */ makeRoom("08,13", 3, 0x21, "solid",  "solid",  "open",   "open",   null  ),
            /* room: 08,14 */ makeRoom("08,14", 2, 0x21, "open",   "open",   "open",   "solid",  null  ),
            /* room: 08,15 */ makeRoom("08,15", 2, 0x00, "open",   "solid",  "solid",  "open",   null  ),
            /* room: 08,16 */ [[], []],
        ], [
            /* room: 09,01 */ [[], []],
            /* room: 09,02 */ makeRoom("09,02", 9, 0x13, "solid",  "locked", "shut",   "solid",  "dark"),
            /* room: 09,03 */ makeRoom("09,03", 9, 0x26, "solid",  "solid",  "open",   "locked", "text"),
            /* room: 09,04 */ makeRoom("09,04", 9, 0x1A, "solid",  "bomb",   "solid",  "solid",  null  ),
            /* room: 09,05 */ makeRoom("09,05", 9, 0x1A, "solid",  "solid",  "solid",  "bomb",   null  ),
            /* room: 09,06 */ makeRoom("09,06", 9, 0x0A, "solid",  "bomb",   "solid",  "solid",  null  ),
            /* room: 09,07 */ makeRoom("09,07", 9, 0x26, "solid",  "solid",  "locked", "bomb",   "text"),
            /* room: 09,08 */ makeRoom("09,08", 9, 0x1A, "solid",  "solid",  "bomb",   "solid",  null  ),
            /* room: 09,09 */ makeRoom("09,09", 7, 0x26, "solid",  "bomb",   "bomb",   "solid",  null  ),
            /* room: 09,10 */ makeRoom("09,10", 7, 0x0A, "solid",  "shut",   "shut",   "bomb",   null  ),
            /* room: 09,11 */ makeRoom("09,11", 7, 0x24, "solid",  "solid",  "solid",  "shut",   "dim" ),
            /* room: 09,12 */ makeRoom("09,12", 7, 0x25, "solid",  "solid",  "locked", "solid",  "sand"),
            /* room: 09,13 */ makeRoom("09,13", 7, 0x23, "solid",  "bomb",   "open",   "solid",  null  ),
            /* room: 09,14 */ makeRoom("09,14", 7, 0x08, "solid",  "solid",  "solid",  "bomb",   null  ),
            /* room: 09,15 */ makeRoom("09,15", 8, 0x00, "solid",  "solid",  "shut",   "solid",  null  ),
            /* room: 09,16 */ [[], []],
        ], [
            /* room: 10,01 */ makeRoom("10,01", 9, 0x08, "solid",  "solid",  "bomb",   "solid",  null  ),
            /* room: 10,02 */ makeRoom("10,02", 9, 0x25, "open",   "solid",  "shut",   "solid",  null  ),
            /* room: 10,03 */ makeRoom("10,03", 9, 0x26, "shut",   "locked", "locked", "solid",  null  ),
            /* room: 10,04 */ makeRoom("10,04", 9, 0x00, "solid",  "solid",  "locked", "locked", "dark"),
            /* room: 10,05 */ makeRoom("10,05", 9, 0x1c, "solid",  "locked", "open",   "solid",  null  ),
            /* room: 10,06 */ makeRoom("10,06", 9, 0x14, "solid",  "open",   "bomb",   "locked", "dark"),
            /* room: 10,07 */ makeRoom("10,07", 9, 0x0A, "locked", "solid",  "open",   "open",   null  ),
            /* room: 10,08 */ makeRoom("10,08", 9, 0x1F, "bomb",   "solid",  "bomb",   "solid",  null  ),
            /* room: 10,09 */ makeRoom("10,09", 7, 0x16, "bomb",   "locked", "open",   "solid",  "dark"),
            /* room: 10,10 */ makeRoom("10,10", 7, 0x1F, "shut",   "bomb",   "solid",  "locked", null  ),
            /* room: 10,11 */ makeRoom("10,11", 7, 0x1A, "solid",  "bomb",   "solid",  "bomb",   null  ),
            /* room: 10,12 */ makeRoom("10,12", 7, 0x00, "locked", "locked", "solid",  "bomb",   null  ),
            /* room: 10,13 */ makeRoom("10,13", 7, 0x24, "shut",   "solid",  "solid",  "locked", "dim" ),
            /* room: 10,14 */ makeRoom("10,14", 8, 0x11, "solid",  "bomb",   "open",   "solid",  null  ),
            /* room: 10,15 */ makeRoom("10,15", 8, 0x24, "shut",   "shut",   "locked", "bomb",   null  ),
            /* room: 10,16 */ makeRoom("10,16", 8, 0x1A, "solid",  "solid",  "solid",  "open",   null  ),
        ], [
            /* room: 11,01 */ makeRoom("11,01", 9, 0x1A, "bomb",   "solid",  "solid",  "solid",  null  ),
            /* room: 11,02 */ makeRoom("11,02", 9, 0x25, "open",   "bomb",   "shut",   "solid",  null  ),
            /* room: 11,03 */ makeRoom("11,03", 9, 0x1D, "locked", "locked", "solid",  "bomb",   null  ),
            /* room: 11,04 */ makeRoom("11,04", 9, 0x12, "locked", "bomb",   "locked", "locked", null  ),
            /* room: 11,05 */ makeRoom("11,05", 9, 0x17, "open",   "solid",  "open",   "bomb",   "dark"),
            /* room: 11,06 */ makeRoom("11,06", 9, 0x0E, "bomb",   "locked", "bomb",   "solid",  null  ),
            /* room: 11,07 */ makeRoom("11,07", 9, 0x03, "open",   "bomb",   "locked", "locked", null  ),
            /* room: 11,08 */ makeRoom("11,08", 9, 0x0A, "bomb",   "solid",  "bomb",   "bomb",   null  ),
            /* room: 11,09 */ makeRoom("11,09", 7, 0x26, "open",   "solid",  "locked", "solid",  "text"),
            /* room: 11,10 */ makeRoom("11,10", 7, 0x1A, "solid",  "bomb",   "solid",  "solid",  null  ),
            /* room: 11,11 */ makeRoom("11,11", 7, 0x04, "solid",  "shut",   "solid",  "bomb",   null  ),
            /* room: 11,12 */ makeRoom("11,12", 7, 0x29, "solid",  "solid",  "solid",  "open",   "dim" ),
            /* room: 11,13 */ makeRoom("11,13", 8, 0x29, "solid",  "solid",  "open",   "solid",  "dim" ),
            /* room: 11,14 */ makeRoom("11,14", 8, 0x26, "open",   "bomb",   "solid",  "solid",  null  ),
            /* room: 11,15 */ makeRoom("11,15", 8, 0x00, "locked", "solid",  "bomb",   "bomb",   null  ),
            /* room: 11,16 */ [[], []],
        ], [
            /* room: 12,01 */ makeRoom("12,01", 9, 0x0A, "solid",  "bomb",   "locked", "solid",  null  ),
            /* room: 12,02 */ makeRoom("12,02", 9, 0x25, "open",   "solid",  "shut",   "bomb",   null  ),
            /* room: 12,03 */ makeRoom("12,03", 9, 0x27, "solid",  "solid",  "shut",   "solid",  "dim" ),
            /* room: 12,04 */ makeRoom("12,04", 9, 0x19, "locked", "bomb",   "solid",  "solid",  "dark"),
            /* room: 12,05 */ makeRoom("12,05", 9, 0x14, "open",   "solid",  "solid",  "bomb",   null  ),
            /* room: 12,06 */ makeRoom("12,06", 9, 0x26, "bomb",   "solid",  "solid",  "solid",  null  ),
            /* room: 12,07 */ makeRoom("12,07", 9, 0x00, "locked", "bomb",   "solid",  "solid",  null  ),
            /* room: 12,08 */ makeRoom("12,08", 9, 0x23, "bomb",   "solid",  "open",   "bomb",   "dim" ),
            /* room: 12,09 */ makeRoom("12,09", 7, 0x0D, "locked", "shut",   "solid",  "solid",  null  ),
            /* room: 12,10 */ makeRoom("12,10", 7, 0x24, "solid",  "bomb",   "open",   "open",   null  ),
            /* room: 12,11 */ makeRoom("12,11", 7, 0x25, "solid",  "solid",  "solid",  "bomb",   null  ),
            /* room: 12,12 */ makeRoom("12,12", 8, 0x26, "solid",  "bomb",   "open",   "solid",  "text"),
            /* room: 12,13 */ makeRoom("12,13", 8, 0x05, "shut",   "solid",  "bomb",   "bomb",   null  ),
            /* room: 12,14 */ makeRoom("12,14", 8, 0x26, "solid",  "solid",  "open",   "solid",  "text"),
            /* room: 12,15 */ makeRoom("12,15", 8, 0x23, "bomb",   "shut",   "locked", "solid",  null  ),
            /* room: 12,16 */ makeRoom("12,16", 8, 0x1B, "solid",  "solid",  "solid",  "shut",   null  ),
        ], [
            /* room: 13,01 */ makeRoom("13,01", 9, 0x16, "locked", "solid",  "locked", "solid",  null  ),
            /* room: 13,02 */ makeRoom("13,02", 9, 0x00, "open",   "solid",  "shut",   "solid",  "dark"),
            /* room: 13,03 */ makeRoom("13,03", 9, 0x28, "shut",   "solid",  "shut",   "solid",  "dark"),
            /* room: 13,04 */ makeRoom("13,04", 9, 0x26, "solid",  "solid",  "bomb",   "solid",  "text"),
            /* room: 13,05 */ makeRoom("13,05", 9, 0x00, "solid",  "open",   "open",   "solid",  null  ),
            /* room: 13,06 */ makeRoom("13,06", 9, 0x00, "solid",  "open",   "bomb",   "open",   null  ),
            /* room: 13,07 */ makeRoom("13,07", 9, 0x25, "solid",  "solid",  "open",   "open",   null  ),
            /* room: 13,08 */ makeRoom("13,08", 9, 0x1E, "open",   "solid",  "open",   "solid",  null  ),
            /* room: 13,09 */ makeRoom("13,09", 7, 0x26, "solid",  "solid",  "locked", "solid",  "text"),
            /* room: 13,10 */ makeRoom("13,10", 7, 0x18, "shut",   "solid",  "open",   "solid",  null  ),
            /* room: 13,11 */ [[], []],
            /* room: 13,12 */ makeRoom("13,12", 8, 0x23, "open",   "shut",   "solid",  "solid",  "dark"),
            /* room: 13,13 */ makeRoom("13,13", 8, 0x1C, "bomb",   "solid",  "solid",  "shut",   null  ),
            /* room: 13,14 */ makeRoom("13,14", 8, 0x25, "shut",   "locked", "open",   "solid",  null  ),
            /* room: 13,15 */ makeRoom("13,15", 8, 0x00, "locked", "solid",  "open",   "locked", null  ),
            /* room: 13,16 */ [[], []],
        ], [
            /* room: 14,01 */ makeRoom("14,01", 9, 0x14, "locked", "shut",   "solid",  "solid",  "dark"),
            /* room: 14,02 */ makeRoom("14,02", 9, 0x11, "open",   "solid",  "open",   "shut",   null  ),
            /* room: 14,03 */ makeRoom("14,03", 9, 0x1B, "shut",   "solid",  "solid",  "solid",  null  ),
            /* room: 14,04 */ makeRoom("14,04", 9, 0x23, "bomb",   "solid",  "locked", "solid",  null  ),
            /* room: 14,05 */ makeRoom("14,05", 9, 0x0C, "open",   "bomb",   "open",   "solid",  null  ),
            /* room: 14,06 */ makeRoom("14,06", 9, 0x1A, "bomb",   "bomb",   "bomb",   "bomb",   null  ),
            /* room: 14,07 */ makeRoom("14,07", 9, 0x19, "open",   "solid",  "open",   "bomb",   null  ),
            /* room: 14,08 */ makeRoom("14,08", 9, 0x14, "open",   "solid",  "solid",  "solid",  "dark"),
            /* room: 14,09 */ makeRoom("14,09", 7, 0x00, "locked", "open",   "open",   "solid",  null  ),
            /* room: 14,10 */ makeRoom("14,10", 7, 0x02, "open",   "shut",   "bomb",   "open",   null  ),
            /* room: 14,11 */ makeRoom("14,11", 7, 0x19, "solid",  "solid",  "bomb",   "open",   "dark"),
            /* room: 14,12 */ makeRoom("14,12", 7, 0x26, "solid",  "solid",  "open",   "solid",  "text"),
            /* room: 14,13 */ makeRoom("14,13", 8, 0x24, "solid",  "open",   "solid",  "solid",  "dim" ),
            /* room: 14,14 */ makeRoom("14,14", 8, 0x11, "open",   "open",   "solid",  "open",   "dark"),
            /* room: 14,15 */ makeRoom("14,15", 8, 0x24, "shut",   "locked", "bomb",   "shut",   null  ),
            /* room: 14,16 */ makeRoom("14,16", 8, 0x18, "solid",  "solid",  "solid",  "locked", "dark"),
        ], [
            /* room: 15,01 */ [[], []],
            /* room: 15,02 */ makeRoom("15,02", 9, 0x1A, "open",   "open",   "open",   "solid",  null  ),
            /* room: 15,03 */ makeRoom("15,03", 9, 0x26, "solid",  "locked", "solid",  "open",   null  ),
            /* room: 15,04 */ makeRoom("15,04", 9, 0x1B, "locked", "solid",  "locked", "locked", null  ),
            /* room: 15,05 */ makeRoom("15,05", 9, 0x1F, "open",   "open",   "solid",  "solid",  null  ),
            /* room: 15,06 */ makeRoom("15,06", 9, 0x18, "bomb",   "open",   "solid",  "open",   "dark"),
            /* room: 15,07 */ makeRoom("15,07", 9, 0x26, "shut",   "solid",  "open",   "shut",   "text"),
            /* room: 15,08 */ [[], []],
            /* room: 15,09 */ makeRoom("15,09", 7, 0x00, "open",   "bomb",   "open",   "solid",  null  ),
            /* room: 15,10 */ makeRoom("15,10", 7, 0x23, "bomb",   "open",   "open",   "bomb",   null  ),
            /* room: 15,11 */ makeRoom("15,11", 7, 0x09, "bomb",   "open",   "open",   "open",   "dark"),
            /* room: 15,12 */ makeRoom("15,12", 7, 0x1E, "shut",   "open",   "solid",  "open",   null  ),
            /* room: 15,13 */ makeRoom("15,13", 7, 0x24, "solid",  "open",   "solid",  "open",   "dim" ),
            /* room: 15,14 */ makeRoom("15,14", 7, 0x13, "solid",  "solid",  "solid",  "open",   null  ),
            /* room: 15,15 */ makeRoom("15,15", 8, 0x25, "bomb",   "solid",  "open",   "solid",  null  ),
            /* room: 15,16 */ [[], []],
        ], [
            /* room: 16,01 */ [[], []],
            /* room: 16,02 */ makeRoom("16,02", 9, 0x1B, "open",   "solid",  "solid",  "solid",  null  ),
            /* room: 16,03 */ [[], []],
            /* room: 16,04 */ makeRoom("16,04", 9, 0x1F, "locked", "locked", "solid",  "solid",  null  ),
            /* room: 16,05 */ makeRoom("16,05", 9, 0x1A, "solid",  "solid",  "solid",  "locked", null  ),
            /* room: 16,06 */ [[], []],
            /* room: 16,07 */ makeRoom("16,07", 9, 0x21, "open",   "solid",  "open",   "solid",  "dim" ),
            /* room: 16,08 */ [[], []],
            /* room: 16,09 */ makeRoom("16,09", 7, 0x23, "open",   "solid",  "solid",  "solid",  "dim" ),
            /* room: 16,10 */ makeRoom("16,10", 7, 0x21, "open",   "open",   "open",   "solid",  null  ),
            /* room: 16,11 */ makeRoom("16,11", 7, 0x1D, "open",   "solid",  "solid",  "open",   null  ),
            /* room: 16,12 */ [[], []],
            /* room: 16,13 */ makeRoom("16,13", 8, 0x1A, "solid",  "open",   "solid",  "solid",  null  ),
            /* room: 16,14 */ makeRoom("16,14", 8, 0x23, "solid",  "open",   "solid",  "shut",   null  ),
            /* room: 16,15 */ makeRoom("16,15", 8, 0x21, "open",   "open",   "open",   "open",   null  ),
            /* room: 16,16 */ makeRoom("16,16", 8, 0x16, "solid",  "solid",  "solid",  "open",   "dark"),
        ],
    ];
}
