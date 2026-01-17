"use strict";

import {NESColor} from "./Colors.js";

export class Piece {
    static brick                        = new Piece( 3005, 3,  3, null,                     "brick");
    static brick_headlight              = new Piece( 4070, 3,  3, null,                     "brick_headlight");
    static inverted_cone                = new Piece(11610, 3,  3, null,                     "inverted_cone");
    static brick_2_3rd                  = new Piece(86996, 2,  2, null,                     "brick_2_3rd");
    static brick_2_3rd_round_tabs       = new Piece(33286, 2,  2, null,                     "brick_2_3rd_round_tabs");
    static brick_2_3rd_slope            = new Piece(54200, 2,  0, null,                     "brick_2_3rd_slope");
    static brick_2_3rd_slope_curved     = new Piece(49307, 2,  0, null,                     "brick_2_3rd_slope_curved");
    static brick_2_3rd_slope_pyramid    = new Piece(22388, 2,  0, null,                     "brick_2_3rd_slope_pyramid");

    static plate                        = new Piece( 3024, 1,  1, null,                     "plate");
    static plate_clip_top               = new Piece(15712, 1,  1, null,                     "plate_clip_top");
    static plate_round_dot              = new Piece( 6141, 1,  1, null,                     "plate_round_dot");
    static plate_round_tabs             = new Piece(33291, 1,  1, null,                     "plate_round_tabs");

    // Use 3070b for a groove.
    static tile                         = new Piece( 3070, 1,  1, Piece.plate,              "tile");
    static tile_half_circle             = new Piece(24246, 1,  1, Piece.plate_round_dot,    "tile_half_circle");
    static tile_heart                   = new Piece(39739, 1,  1, null,                     "tile_heart");
    static tile_quarter_circle          = new Piece(25269, 1,  1, Piece.plate_round_dot,    "tile_quarter_circle");
    static tile_round_dot               = new Piece(35381, 1,  1, Piece.plate_round_dot,    "tile_round_dot");

    // Samples
    static brick_2_3rd_slope_triangle   = new Piece(35464, 2,  0, null,                     "brick_2_3rd_slope_triangle");
    static plate_swirl                  = new Piece(15470, 2,  0, null,                     "plate_swirl");
    static plate_light_attachment       = new Piece( 4081, 1,  1, null,                     "plate_light_attachment");
    static plate_bar_side               = new Piece(26047, 1,  1, null,                     "plate_bar_side");
    static plate_clip_vertical_side     = new Piece( 4085, 1,  1, null,                     "plate_clip_vertical_side");
    static plate_clip_horizontal_side   = new Piece(61252, 1,  1, null,                     "plate_clip_horizontal_side");

    static water_piece_under            = Piece.plate_round_dot;
    static water_piece_top              = Piece.plate_round_dot;
    static ground_piece_under           = Piece.plate;
    static ground_piece_top             = Piece.tile;

    static box                          = new Piece('../p/box5', 1,  1, null,               "box5");

    constructor(partNumber, plateHeight, plateLevel, studReplacement, name) {
        this.partNumber = partNumber;
        this.plateHeight = plateHeight;
        this.plateLevel = plateLevel;
        this.studReplacement = studReplacement;
        this.name = name;
    }
}

export class Palette {
    static forest    = new Palette(NESColor.green, NESColor.blue, NESColor.peach);
    static mountain  = new Palette(NESColor.brown, NESColor.blue, NESColor.peach);
    static graveyard = new Palette(NESColor.white, NESColor.blue, NESColor.deep_gray);

    constructor(primary, secondary, background) {
        this.primary = primary;
        this.secondary = secondary;     // Water, Accents
        this.background = background;   // Ground
    }

    getColor(color) {
        return this[color] ?? color;
    }
}

/* Values for one piece in a tile. */
export class TilePiece {
    constructor(piece, color, options) {
        this.piece = piece;
        this.color = color;
        this.options = options;
    }
}

/* A stack of TilePiece objects. */
export class Tile {
    static water_opacity = 1;
    static clear_opacity = 0.5;

    static makeOctorok(color, rotation) {
        return [
            new TilePiece(Piece.plate,                      NESColor.white,         {}),
            new TilePiece(Piece.tile_half_circle,           color,                  {rotateY: rotation}),
        ];
    }

    static makeMoblin(color1, color2, color3) {
        return [
            new TilePiece(Piece.plate,                      color1,                 {}),
            new TilePiece(Piece.plate,                      color2,                 {}),
            new TilePiece(Piece.tile_round_dot,             color3,                 {}),
        ];
    }

    static makeLeever(color, slim, level) {
        return [
            new TilePiece(Piece.plate,                      color,                  {rotateY: slim ? 0 : 45}),
            new TilePiece(Piece.plate_round_tabs,           NESColor.white,         {rotateY: 45}),
            new TilePiece(Piece.tile_round_dot,             color,                  {}),
        ].slice(level);
    }

    static makeLynel(color1, color2) {
        return [
            new TilePiece(Piece.plate,                      color1,                 {}),
            new TilePiece(Piece.plate,                      NESColor.white,         {}),
            new TilePiece(Piece.plate_round_dot,            color2,                 {}),
        ];
    }

    static makeTektite(color) {
        return [
            new TilePiece(Piece.plate,                      NESColor.white,         {}),
            new TilePiece(Piece.brick_2_3rd_slope_curved,   color,                  {rotateY: 90}),
        ];
    }

    static makePeahat(water, slim) {
        const peahat = [];
        if (water) {
            peahat.push(
                new TilePiece(Piece.plate_round_dot,        NESColor.white,         {opacity: Tile.clear_opacity}),
            )
        }
        return peahat.concat([
            new TilePiece(Piece.plate,                      NESColor.red,           {rotateY: slim ? 0 : 45}),
            new TilePiece(Piece.plate,                      NESColor.orange,        {}),
            new TilePiece(Piece.plate_round_tabs,           NESColor.white,         {rotateY: slim ? 45 : 0}),
        ]);
    }

    static octorok_red_e = Tile.makeOctorok(NESColor.red, 270);
    static octorok_red_w = Tile.makeOctorok(NESColor.red, 90);
    static octorok_red_n = Tile.makeOctorok(NESColor.red, 180);
    static octorok_red_s = Tile.makeOctorok(NESColor.red, 0);
    static octorok_blue_e = Tile.makeOctorok(NESColor.blue, 270);
    static octorok_blue_w = Tile.makeOctorok(NESColor.blue, 90);
    static octorok_blue_n = Tile.makeOctorok(NESColor.blue, 180);
    static octorok_blue_s = Tile.makeOctorok(NESColor.blue, 0);
    static moblin_red = Tile.makeMoblin(NESColor.white, NESColor.red, NESColor.orange);
    static moblin_blue = Tile.makeMoblin(NESColor.red, NESColor.black, NESColor.teal);
    static leever_red = Tile.makeLeever(NESColor.red, false, 0);
    static leever_red_slim = Tile.makeLeever(NESColor.red, true, 0);
    static leever_red_sunk1 = Tile.makeLeever(NESColor.red, true, 1);
    static leever_red_sunk2 = Tile.makeLeever(NESColor.red, true, 2);
    static leever_blue = Tile.makeLeever(NESColor.blue, false, 0);
    static leever_blue_slim = Tile.makeLeever(NESColor.blue, true, 0);
    static leever_blue_sunk1 = Tile.makeLeever(NESColor.blue, true, 1);
    static leever_blue_sunk2 = Tile.makeLeever(NESColor.blue, true, 2);
    static lynel_red = Tile.makeLynel(NESColor.red, NESColor.orange);
    static lynel_blue = Tile.makeLynel(NESColor.blue, NESColor.steel_blue);
    static tektite_red = Tile.makeTektite(NESColor.red);
    static tektite_blue = Tile.makeTektite(NESColor.steel_blue);
    static peahat = Tile.makePeahat(false, false);
    static peahat_water = Tile.makePeahat(true, false);
    static peahat_slim = Tile.makePeahat(false, true);
    static peahat_water_slim = Tile.makePeahat(true, true);

    //                partNumber                            color               options
    static link = [
        new TilePiece(Piece.plate,                          NESColor.brown,         {}),
        new TilePiece(Piece.plate,                          NESColor.orange,        {}),
        new TilePiece(Piece.tile,                           NESColor.chartreuse,    {}),
    ];

    static fairy = [
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {translateX: .5, translateY: .5}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.white,         {translateX: .5, translateY: .5, rotateY: 45}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.red,           {translateX: .5, translateY: .5}),
    ];

    static zora = [
        new TilePiece(Piece.plate,                          NESColor.teal,          {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
    ];
    static rock = [
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
    ];
    static ghini = [
        new TilePiece(Piece.plate_round_dot,                NESColor.blue,          {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {}),
    ];
    static armos_red_awake = [
        new TilePiece(Piece.plate,                          NESColor.orange,        {}),
        new TilePiece(Piece.plate,                          NESColor.red,           {}),
        new TilePiece(Piece.plate_clip_top,                 NESColor.orange,        {}),
    ];

    static bush = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.secondary,     {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.primary,       {}),
    ];
    static ground = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_top,               NESColor.background,    {}),
    ];
    static ground_sand = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.background,    {}),
    ];
    static entrance_e = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.brick_2_3rd_slope,              NESColor.black,         {rotateY: 90}),
    ];
    static entrance_w = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.brick_2_3rd_slope,              NESColor.black,         {rotateY: 270}),
    ];

    static armos_statue = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate,                          NESColor.secondary,     {}),
        new TilePiece(Piece.plate_clip_top,                 NESColor.primary,       {}),
    ];
    static armos_statue_empty = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_top,               NESColor.background,    {}),
    ];
    static armos_statue_entrance = Tile.entrance_w;
    static rock_boulder = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.brick_2_3rd_slope_curved,       NESColor.primary,       {rotateY: 90}),
    ];
    static steps = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.secondary,     {}),
    ];
    static tomb = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.plate,                          NESColor.secondary,     {}),
        new TilePiece(Piece.tile_half_circle,               NESColor.primary,       {rotateY: 180}),
    ];

    // Rocks
    static makeRockEdge(rockTop) {
        return [
            new TilePiece(Piece.brick,                      NESColor.primary,       {}),
        ].concat(rockTop);
    }
    static makeRockCorner(angle) {
        return [
            // Rock corner's should never raise the elevation more than 1 level
            // from any adjacent top levels otherwise this will be exposed.
            // Change to "#ff00ff" to test exposure.
            new TilePiece(Piece.brick_2_3rd,                NESColor.primary,       {}),
            new TilePiece(Piece.plate,                      NESColor.background,    {}),
            new TilePiece(Piece.tile_quarter_circle,        NESColor.primary,       {rotateY: angle}),
        ];
    }

    static rock_n = Tile.makeRockEdge([
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.tile_half_circle,               NESColor.primary,       {rotateY: 180}),
    ]);
    static rock_s = Tile.makeRockEdge([
        new TilePiece(Piece.brick,                          NESColor.primary,       {}),
    ]);
    static rock_ne = Tile.makeRockCorner(270);
    static rock_nw = Tile.makeRockCorner(180);
    static rock_se = Tile.makeRockCorner(0);
    static rock_sw = Tile.makeRockCorner(90);

    static dungeon_tops = {
        curvedTop: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.brick_2_3rd_slope_curved,   NESColor.primary,       {rotateY: 90}),
        ],
        triangle: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.brick_2_3rd_slope_triangle, NESColor.primary,       {rotateY: 90}),
        ],
        slope: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.brick_2_3rd_slope,          NESColor.primary,       {}),
        ],
        pyramid: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.brick_2_3rd_slope_pyramid,  NESColor.primary,       {}),
        ],
        swirl: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate_swirl,                NESColor.primary,       {}),
        ],
        clip_top: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate_clip_top,             NESColor.primary,       {}),
        ],

        plateDotStud: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate,                      NESColor.primary,       {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.primary,       {}),
        ],
        plateDotSmooth: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate,                      NESColor.primary,       {}),
            new TilePiece(Piece.tile_round_dot,             NESColor.primary,       {}),
        ],
        plateDotTabs: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate,                      NESColor.primary,       {}),
            new TilePiece(Piece.plate_round_tabs,           NESColor.primary,       {rotateY: 45}),
        ],

        dotDotStud: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.primary,       {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.primary,       {}),
        ],
        dotDotSmooth: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.primary,       {}),
            new TilePiece(Piece.tile_round_dot,             NESColor.primary,       {}),
        ],
        dotDotTabs: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.primary,       {}),
            new TilePiece(Piece.plate_round_tabs,           NESColor.primary,       {rotateY: 45}),
        ],

        overhangHole: [
            new TilePiece(Piece.brick_2_3rd,                NESColor.secondary,     {}),
            new TilePiece(Piece.plate_light_attachment,     NESColor.primary,       {}),
        ],
        overhangBar: [
            new TilePiece(Piece.brick_2_3rd,                NESColor.secondary,     {}),
            new TilePiece(Piece.plate_bar_side,             NESColor.primary,       {}),
        ],
        overhangClipV: [
            new TilePiece(Piece.brick_2_3rd,                NESColor.secondary,     {}),
            new TilePiece(Piece.plate_clip_vertical_side,   NESColor.primary,       {}),
        ],
        overhangClipH: [
            new TilePiece(Piece.brick_2_3rd,                NESColor.secondary,     {}),
            new TilePiece(Piece.plate_clip_horizontal_side, NESColor.primary,       {}),
        ],
    };
    static makeDungeon(topName) {
        return [
            new TilePiece(Piece.brick,                      NESColor.primary,       {}),
            new TilePiece(Piece.brick_2_3rd,                NESColor.primary,       {}),
        ].concat(Tile.dungeon_tops[topName]);
    }

    // Dungeons
    static dungeon_n1 = Tile.makeDungeon("curvedTop");
    static dungeon_n2 = Tile.makeDungeon("clip_top");
    static dungeon_ne = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.inverted_cone,                  NESColor.secondary,     {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.primary,       {}),
    ];
    static dungeon_nw = Tile.dungeon_ne;
    static dungeon_se = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.inverted_cone,                  NESColor.secondary,     {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.primary,       {}),
    ];
    static dungeon_sw = Tile.dungeon_se;

    static tree_n = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.brick_2_3rd_round_tabs,         NESColor.primary,       {rotateY: 45}),
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.primary,       {rotateY: 45}),
    ];
    static tree_ne = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.brick_2_3rd_round_tabs,         NESColor.primary,       {rotateY: 45}),
        new TilePiece(Piece.plate,                          NESColor.secondary,     {}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.primary,       {rotateY: 45}),
    ];
    static tree_sw = Tile.tree_ne;
    static tree_nw = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.brick_headlight,                NESColor.primary,       {rotateY: 90}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.primary,       {rotateY: 45}),
    ];
    static tree_se = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.brick_headlight,                NESColor.primary,       {rotateY: 270}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.primary,       {rotateY: 45}),
    ];

    static floating_heart = [
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {opacity: Tile.clear_opacity}),
        new TilePiece(Piece.tile_heart,                     NESColor.red,           {rotateY: 45}),
    ];

    // Water
    static bridge = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile,                           NESColor.primary,       {}),
    ];
    static heart = [
        new TilePiece(Piece.tile_heart,                     NESColor.red,           {rotateY: 45}),
    ];

    static ground_water_ne = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {rotateY: 270}),
    ];
    static ground_water_nw = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {rotateY: 180}),
    ];
    static ground_water_se = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {}),
    ];
    static ground_water_sw = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {rotateY: 90}),
    ];
    static water_c = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_top,                NESColor.secondary,     {opacity: Tile.water_opacity}),
    ];
    static water_e = Tile.water_c;
    static water_n = Tile.water_c;
    static water_s = Tile.water_c;
    static water_w = Tile.water_c;
    static water_ne = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {rotateY: 90}),
    ];
    static water_nw = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {}),
    ];
    static water_se = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {rotateY: 180}),
    ];
    static water_sw = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {rotateY: 270}),
    ];
    static waterfall1 = [
        new TilePiece(Piece.ground_piece_under,             NESColor.background,    {}),
        new TilePiece(Piece.water_piece_top,                NESColor.secondary,     {opacity: Tile.water_opacity}),
    ];
    static waterfall2 = Tile.waterfall1;

    constructor(basePieces, spritePieces) {
        // Replace top smooth with stud if adding a sprite.
        if (spritePieces) {
            const topPiece = basePieces.slice(-1)[0];
            const studReplacement = topPiece.piece.studReplacement;
            if (null != studReplacement) {
                basePieces = basePieces.slice(0, -1).concat(
                    new TilePiece(studReplacement, topPiece.color, topPiece.options));
            }
        }
        this.tilePieces = basePieces.concat(spritePieces ?? []);
    }

    // [[plateLevel, piece], ...]
    * getPieceLevelEntries(elevation, legoWidth, legoPlateHeight) {
        // Add a filler piece for elevation.
        if (elevation > 0) {
            yield [elevation, new TilePiece(Piece.box, NESColor.primary, {
                scaleX: legoWidth / 2,
                scaleY: legoPlateHeight * elevation,
                scaleZ: legoWidth / 2,
            })];
        }
        for (const tilePiece of this.tilePieces) {
            yield [elevation + tilePiece.piece.plateLevel, tilePiece];
            elevation += tilePiece.piece.plateHeight;
        }
    }
}
