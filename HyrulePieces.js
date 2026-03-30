"use strict";

import {NESColor} from "./Colors.js";

export class Piece {
    static brick                        = new Piece( "3005",  3,  3,   0, 270, null,                  "brick");
    static brick_headlight              = new Piece( "4070",  3,  3,   0,   0, null,                  "brick_headlight");
    static brick_slope_curved           = new Piece( "7126",  3,  3,   0,   0, null,                  "brick_slope_curved");
    static brick_side_stud              = new Piece("87087",  3,  3,   0,   0, null,                  "brick_side_stud");
    static brick_4_side_studs           = new Piece( "4733",  3,  3,   0,   0, null,                  "brick_4_side_studs");
    static brick_side_stud2             = new Piece("32952",  5,  5,   0,   0, null,                  "brick_side_stud2");
    static inverted_cone                = new Piece("11610",  3,  3,   0,   0, null,                  "inverted_cone");
    static brick_2_3rd                  = new Piece("86996",  2,  2,   0,   0, null,                  "brick_2_3rd");
    static brick_2_3rd_round_tabs       = new Piece("33286",  2,  2,   0,   0, null,                  "brick_2_3rd_round_tabs");
    static brick_2_3rd_slope            = new Piece("54200",  2,  0,   0,   0, null,                  "brick_2_3rd_slope");
    static brick_2_3rd_slope_curved     = new Piece("49307",  2,  0,   0,   0, null,                  "brick_2_3rd_slope_curved");
    static brick_2_3rd_slope_pyramid    = new Piece("22388",  2,  0,   0,   0, null,                  "brick_2_3rd_slope_pyramid");
    static brick_2_3rd_slope_triangle   = new Piece("35464",  2,  0,   0,   0, null,                  "brick_2_3rd_slope_triangle");
    static brick_2_3rd_convex_corner    = new Piece( "7826",  2,  0,   0,  90, null,                  "brick_2_3rd_convex_corner");
    static brick_1x1x5                  = new Piece("2453b", 15, 15,  90, 270, null,                  "brick_1x1x5");
    static brick_1x1x3                  = new Piece("14716",  9,  9,  90, 270, null,                  "brick_1x1x3");

    static plate                        = new Piece( "3024",  1,  1,   0, 270, null,                  "plate");
    static plate_clip_top               = new Piece("15712",  1,  1,   0,   0, null,                  "plate_clip_top");
    static plate_clip_top_edge          = new Piece( "2555",  1,  1,   0,   0, null,                  "plate_clip_top_edge");
    static plate_clip_bottom            = new Piece( "5264",  1,  1,   0,   0, null,                  "plate_clip_bottom");
    static plate_round_dot              = new Piece( "6141",  1,  1,  90, 270, null,                  "plate_round_dot");
    static plate_round_dot_with_hole    = new Piece("85861",  1,  1,   0,   0, Piece.plate_round_dot, "plate_round_dot_with_hole");
    static plate_round_tabs             = new Piece("33291",  1,  1,   0,   0, null,                  "plate_round_tabs");
    static plate_center_stud            = new Piece("15573",  1,  1,   0,   0, null,                  "plate_center_stud");
    static plate_center_stud2           = new Piece("34103",  1,  1,   0,   0, null,                  "plate_center_stud2");
    static plate2x2_center_stud         = new Piece("87580",  1,  1,   0,   0, null,                  "plate2x2_center_stud");
    static plate6                       = new Piece( "3666",  1,  1,   0,   0, null,                  "plate6");
    static plate1x2                     = new Piece( "3023",  1,  1,   0,   0, null,                  "plate1x2");
    static plate2x2                     = new Piece( "3022",  1,  1,  90, 270, null,                  "plate2x2");
    static plate_bracket_inverted       = new Piece("36840",  1,  1,   0,   0, null,                  "plate_bracket_inverted");
    static plate_bar_side               = new Piece("26047",  1,  1,   0,   0, null,                  "plate_bar_side");
    static plate_bar_double_side        = new Piece("78257",  1,  1,   0,   0, null,                  "plate_bar_double_side");
    static plate_round_bar_side         = new Piece("32828",  1,  1,   0,   0, null,                  "plate_round_bar_side");
    static plate1x2_round_half          = new Piece( "1745",  1,  1,   0,   0, null,                  "plate1x2_round_half");
    static plate2x2_round               = new Piece("18674",  1,  1,   0,   0, null,                  "plate2x2_round");
    static plate2x2_round_inverted_dish = new Piece( "4740",  1,  1,   0,   0, null,                  "plate2x2_round_inverted_dish");
    static plate_light_attachment       = new Piece( "4081",  1,  1,   0,   0, null,                  "plate_light_attachment");
    static plate_clip_vertical_side     = new Piece( "4085",  1,  1,   0,   0, null,                  "plate_clip_vertical_side");
    static plate_clip_horizontal_side   = new Piece("61252",  1,  1,   0,   0, null,                  "plate_clip_horizontal_side");

    static tile                         = new Piece("3070a",  1,  1,   0,   0, Piece.plate,           "tile");
    static tile_groove                  = new Piece("3070b",  1,  1,   0,   0, Piece.plate,           "tile_groove");
    static tile_half_circle             = new Piece("24246",  1,  1,   0,   0, Piece.plate_round_dot, "tile_half_circle");
    static tile_heart                   = new Piece("39739",  1,  1,   0,   0, null,                  "tile_heart");
    static tile_quarter_circle          = new Piece("25269",  1,  1,   0,   0, Piece.plate_round_dot, "tile_quarter_circle");
    static tile_round_dot               = new Piece("98138",  1,  1,   0,   0, Piece.plate_round_dot, "tile_round_dot");
    static tile_round_dot_pin_holder    = new Piece("20482",  1,  1,   0,   0, Piece.plate_round_dot, "tile_round_dot_pin_holder");
    static tile2                        = new Piece( "3069",  1,  1,   0,   0, null,                  "tile2");

    static candle_flame                 = new Piece("37775",  3,  1,   0,   0, null,                  "candle_flame");
    static sword                        = new Piece("76764",  1,  1,   0,   0, null,                  "sword");

    static water_piece_under            = Piece.plate_round_dot;
    static water_piece_top              = Piece.plate_round_dot;
    static ground_piece_under           = Piece.plate;
    static ground_piece_top             = Piece.tile;

    constructor(partNumber, plateHeight, plateLevel, ldrawRotation, studioRotation, studReplacement, name) {
        this.partNumber = partNumber;
        this.plateHeight = plateHeight;
        this.plateLevel = plateLevel;
        this.ldrawRotation = ldrawRotation;
        this.studioRotation = studioRotation;
        this.studReplacement = studReplacement;
        this.name = name;
    }

    getLdrName(palette) {
        const partNumberMap = {
            'studio': {
                '7826': 'bl_7826',
            },
        };

        return partNumberMap[palette]?.[this.partNumber] ?? this.partNumber;
    }
}

export class Palette {
    static forest    = new Palette(NESColor.green, NESColor.blue, NESColor.peach);
    static mountain  = new Palette(NESColor.brown, NESColor.blue, NESColor.peach);
    static graveyard = new Palette(NESColor.white, NESColor.blue, NESColor.deep_gray);
    static text      = new Palette(NESColor.black, NESColor.deep_gray, NESColor.white);
    static cave      = new Palette(NESColor.dark_red, NESColor.black, NESColor.black);

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

    static transformTile(tile, options) {
        return tile.map(tilePiece => {
            const transformedOptions = {};
            [
                "translateX", "translateY", "translateZ",
                "rotateX", "rotateY", "rotateZ",
                "scaleX", "scaleY", "scaleZ",
                "opacity",
            ].forEach(option => {
                const oldValue = tilePiece.options[option];
                const newValue = options[option];
                if (undefined !== oldValue || undefined !== newValue) {
                    transformedOptions[option] = (oldValue || 0) + (newValue || 0);
                }
            });
            return new TilePiece(tilePiece.piece, tilePiece.color, transformedOptions);
        });
    }

    static transformCenterX(tile) {
        return Tile.transformTile(tile, {translateX: .5});
    }

    static transformCenterXY(tile) {
        return Tile.transformTile(tile, {translateX: .5, translateY: .5});
    }

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
    static octorok_blue_e = Tile.makeOctorok(NESColor.navy, 270);
    static octorok_blue_w = Tile.makeOctorok(NESColor.navy, 90);
    static octorok_blue_n = Tile.makeOctorok(NESColor.navy, 180);
    static octorok_blue_s = Tile.makeOctorok(NESColor.navy, 0);
    static moblin_red = Tile.makeMoblin(NESColor.white, NESColor.red, NESColor.orange);
    static moblin_red_center = Tile.transformCenterX(Tile.moblin_red);
    static moblin_blue = Tile.makeMoblin(NESColor.red, NESColor.black, NESColor.teal);
    static leever_red = Tile.makeLeever(NESColor.red, false, 0);
    static leever_red_slim = Tile.makeLeever(NESColor.red, true, 0);
    static leever_red_sunk1 = Tile.makeLeever(NESColor.red, true, 1);
    static leever_red_sunk2 = Tile.makeLeever(NESColor.red, true, 2);
    static leever_blue = Tile.makeLeever(NESColor.navy, false, 0);
    static leever_blue_slim = Tile.makeLeever(NESColor.navy, true, 0);
    static leever_blue_sunk1 = Tile.makeLeever(NESColor.navy, true, 1);
    static leever_blue_sunk2 = Tile.makeLeever(NESColor.navy, true, 2);
    static lynel_red = Tile.makeLynel(NESColor.red, NESColor.orange);
    static lynel_blue = Tile.makeLynel(NESColor.navy, NESColor.steel_blue);
    static tektite_red = Tile.makeTektite(NESColor.red);
    static tektite_blue = Tile.makeTektite(NESColor.steel_blue);
    static peahat = Tile.makePeahat(false, false);
    static peahat_water = Tile.makePeahat(true, false);
    static peahat_slim = Tile.makePeahat(false, true);
    static peahat_water_slim = Tile.makePeahat(true, true);

    //                partNumber                            color                   options
    static makeLink(color) {
        return [
            new TilePiece(Piece.plate,                      NESColor.brown,         {}),
            new TilePiece(Piece.plate,                      NESColor.orange,        {}),
            new TilePiece(Piece.tile,                       color,                  {}),
        ];
    }

    static link_green = Tile.makeLink(NESColor.chartreuse);
    static link_blue  = Tile.makeLink(NESColor.periwinkle);
    static link_red   = Tile.makeLink(NESColor.red);

    static makeZelda(color) {
        return [
            new TilePiece(Piece.plate,                      color,                  {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.orange,        {}),
            new TilePiece(Piece.tile_half_circle,           NESColor.brown,         {}),
        ];
    }

    static zelda_green = Tile.makeZelda(NESColor.chartreuse);
    static zelda_blue  = Tile.makeZelda(NESColor.periwinkle);
    static zelda_red   = Tile.makeZelda(NESColor.red);

    static fairy = [
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.white,         {rotateY: 45}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.red,           {}),
    ];
    static fairy_center = Tile.transformCenterXY(Tile.fairy);

    static old_man = [
        new TilePiece(Piece.plate,                          NESColor.red,           {}),
        new TilePiece(Piece.plate,                          NESColor.white,         {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.orange,        {}),
    ];
    static old_man_center = Tile.transformCenterX(Tile.old_man);

    static old_woman = [
        new TilePiece(Piece.plate,                          NESColor.red,           {}),
        new TilePiece(Piece.plate,                          NESColor.orange,        {}),
        new TilePiece(Piece.tile_half_circle,               NESColor.white,         {}),
    ];
    static old_woman_center = Tile.transformCenterX(Tile.old_woman);

    static merchant = [
        new TilePiece(Piece.plate,                          NESColor.chartreuse,    {}),
        new TilePiece(Piece.plate,                          NESColor.brown,         {}),
        new TilePiece(Piece.tile,                           NESColor.orange,        {}),
    ];
    static merchant_center = Tile.transformCenterX(Tile.merchant);

    static zora = [
        new TilePiece(Piece.plate,                          NESColor.teal,          {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
    ];
    static rock = [
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
    ];
    static ghini = [
        new TilePiece(Piece.plate_round_dot,                NESColor.navy,          {}),
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
        clip_top: [
            new TilePiece(Piece.plate,                      NESColor.secondary,     {}),
            new TilePiece(Piece.plate_clip_top,             NESColor.primary,       {}),
        ],
    };
    static makeDungeon(topName) {
        return [
            new TilePiece(Piece.brick,                      NESColor.primary,       {}),
            new TilePiece(Piece.brick_2_3rd,                NESColor.primary,       {}),
        ].concat(Tile.dungeon_tops[topName]);
    }

    // Passages

    static passage_wall = [
        new TilePiece(Piece.brick,                          NESColor.primary,       {}),
    ];

    static passage_ground = [
        new TilePiece(Piece.ground_piece_top,               NESColor.background,    {}),
    ];

    static passage_steps = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.secondary,     {}),
    ];

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

    // Water
    static bridge = [
        new TilePiece(Piece.ground_piece_under,             NESColor.primary,       {}),
        new TilePiece(Piece.water_piece_under,              NESColor.secondary,     {opacity: Tile.water_opacity}),
        new TilePiece(Piece.tile,                           NESColor.primary,       {}),
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

    // Dungeon floor tiles.

    static dungeon_floor = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.tile,                           NESColor.primary,       {}),
    ];
    static dungeon_floor_stud = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
    ];
    static dungeon_floor_sub = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
    ];
    static dungeon_floor_triangle = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.brick_2_3rd_slope_triangle,     NESColor.primary,       {}),
    ];

    static dungeon_sand = [
        new TilePiece(Piece.plate,                          NESColor.background,    {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.primary,       {}),
    ];
    static dungeon_entrance = [
        new TilePiece(Piece.brick_2_3rd_slope,              NESColor.black,         {rotateY: 270}),
    ];
    static dungeon_water = [
        new TilePiece(Piece.tile,                           NESColor.secondary,     {}),
    ];
    static dungeon_block = [
        new TilePiece(Piece.brick,                          NESColor.background,    {}),
        new TilePiece(Piece.brick_2_3rd_slope_pyramid,      NESColor.primary,       {}),
    ];
    static dungeon_statue_looking_right = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate,                          NESColor.background,    {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.secondary,     {}),
    ];
    static dungeon_statue_looking_left = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.background,    {rotateY: 45}),
        new TilePiece(Piece.tile_half_circle,               NESColor.secondary,     {rotateY: 270}),
    ];
    static dungeon_hole = [
        new TilePiece(Piece.plate,                          NESColor.black,         {}),
        new TilePiece(Piece.tile,                           NESColor.black,         {}),
    ];

    static dungeon_jumper_1x2 = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_center_stud,              NESColor.primary,       {translateX: .5}),
    ];

    static dungeon_flame = [
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.orange,        {}),
        new TilePiece(Piece.candle_flame,                   NESColor.red,           {rotateY: 90, translateZ: -1.125}),
    ];

    static dungeon_text_character = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.background,    {}),
    ];
    static dungeon_text_times = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.background,    {rotateY: 45}),
    ];
    static dungeon_text_dash = [
        new TilePiece(Piece.brick_2_3rd_slope_triangle,     NESColor.background,    {}),
    ];
    static dungeon_text_period = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.background,    {}),
    ];
    static dungeon_text_comma = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.tile_quarter_circle,            NESColor.background,    {}),
    ];
    static dungeon_text_exclamation = [
        new TilePiece(Piece.brick_2_3rd_slope_triangle,     NESColor.background,    {rotateY: 90}),
    ];
    static dungeon_text_question = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.plate_clip_top,                 NESColor.background,    {}),
    ];
    static dungeon_text_apostrophe = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.tile_round_dot_pin_holder,      NESColor.background,    {}),
    ];

    // Dungeon enemies.

    static makeBubble(bottomColor, topColor) {
        return [
            new TilePiece(Piece.plate_round_dot_with_hole,  bottomColor,            {}),
            new TilePiece(Piece.plate_round_dot_with_hole,  topColor,               {}),
        ];
    }

    static makeDarknut(color1, color2) {
        return [
            new TilePiece(Piece.plate,                      color1,                 {}),
            new TilePiece(Piece.plate,                      NESColor.white,         {}),
            new TilePiece(Piece.plate_clip_top,             color2,                 {}),
        ];
    }

    static makeGel(color) {
        return [
            new TilePiece(Piece.tile_round_dot_pin_holder,  color,                  {}),
        ];
    }

    static makeGibdo(itemColor, tabs) {
        return [
            new TilePiece(Piece.plate_round_dot,            NESColor.white,         {}),
            new TilePiece(tabs ? Piece.plate_round_tabs : Piece.plate_round_dot,
                                                            itemColor || NESColor.steel_blue, {rotateY: 45}),
            new TilePiece(Piece.plate_round_dot,            NESColor.white,         {}),
        ];
    }

    static makeGoriya(color1, color2) {
        return [
            new TilePiece(Piece.plate,                      color1,                 {}),
            new TilePiece(Piece.plate,                      color2,                 {}),
            new TilePiece(Piece.tile_round_dot,             color1,                 {}),
        ];
    }

    static makeKeese(color) {
        return [
            new TilePiece(Piece.tile,                       color,                  {}),
            new TilePiece(Piece.tile_round_dot_pin_holder,  color,                  {}),
        ];
    }

    static makeLanmola(color1, color2) {
        return [
            new TilePiece(Piece.plate_round_tabs,           color1,                 {rotateY: 45}),
            new TilePiece(Piece.plate_round_dot_with_hole,  color2,                 {}),
        ];
    }
    static makeLanmolaBody(color1, color2) {
        return Tile.makeLanmola(color1, color2);
    }
    static makeLanmolaHead(color) {
        return Tile.makeLanmola(NESColor.white, color);
    }

    static makePolsVoice(colorHead, colorWhiskers) {
        return [
            new TilePiece(Piece.plate,                      colorWhiskers,          {}),
            new TilePiece(Piece.plate_clip_top,             colorHead,              {}),
        ];
    }

    static makeRope(rotation) {
        return [
            new TilePiece(Piece.plate_round_dot,            NESColor.white,         {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.red,           {}),
            new TilePiece(Piece.tile_half_circle,           NESColor.orange,        {rotateY: rotation}),
        ];
    }

    static makeStalfos(itemColor, tabs) {
        return [
            new TilePiece(Piece.plate,                      NESColor.white,         {}),
            new TilePiece(tabs ? Piece.plate_round_tabs : Piece.plate_round_dot,
                                                            itemColor || NESColor.white, {rotateY: 45}),
            new TilePiece(Piece.tile_round_dot,             NESColor.white,         {}),
        ];
    }

    static makeBladeTrap(rotateBottom, rotateTop) {
        const bladeTrapVersion = 2;
        const clipTopColor = [NESColor.steel_blue, NESColor.steel_blue, NESColor.white     ][bladeTrapVersion];
        const tileColor =    [null,                NESColor.navy,       NESColor.steel_blue][bladeTrapVersion];
        return [
            new TilePiece(Piece.plate_clip_vertical_side,   NESColor.white,         {rotateY: rotateBottom}),
            new TilePiece(Piece.plate_clip_vertical_side,   clipTopColor,           {rotateY: rotateTop}),
            tileColor
                ? new TilePiece(Piece.tile,                 tileColor,              {rotateY: rotateTop})
                : null
        ].filter(tilePiece => tilePiece);
    }

    static makeWallmaster(translateX, rotateY) {
        return [
            new TilePiece(Piece.tile,                       NESColor.navy,          {translateX: translateX}),
            new TilePiece(Piece.plate_clip_vertical_side,   NESColor.steel_blue,    {translateX: translateX, rotateY: rotateY}),
        ];
    }

    static makeWizzrobe(color, rotation) {
        const colors = {
            red: [NESColor.red, NESColor.orange],
            blue: [NESColor.navy, NESColor.steel_blue],
        };
        return [
            new TilePiece(Piece.plate,                      colors[color][0],       {}),
            new TilePiece(Piece.brick_2_3rd_convex_corner,  colors[color][1],       {rotateY: rotation}),
        ];
    }

    static makeZol(color) {
        return [
            new TilePiece(Piece.plate,                      color,                  {}),
            new TilePiece(Piece.plate_round_dot,            color,                  {}),
        ];
    }

    static bubble_blue  = Tile.makeBubble(NESColor.navy,       NESColor.white); // middle NESColor.steel_blue
    static bubble_red   = Tile.makeBubble(NESColor.red,        NESColor.white); // middle NESColor.orange
    static bubble_cyan  = Tile.makeBubble(NESColor.dark_slate, NESColor.cyan);  // middle NESColor.teal
    static bubble_brown = Tile.makeBubble(NESColor.chartreuse, NESColor.brown); // middle NESColor.orange

    static darknut_red = Tile.makeDarknut(NESColor.red, NESColor.orange);
    static darknut_blue = Tile.makeDarknut(NESColor.navy, NESColor.steel_blue);

    static gel_black = Tile.makeGel(NESColor.black);
    static gel_dark_slate = Tile.makeGel(NESColor.dark_slate);
    static gel_navy = Tile.makeGel(NESColor.navy);

    static gibdo = Tile.makeGibdo();
    static gibdo_bomb = Tile.makeGibdo(NESColor.navy);
    static gibdo_key = Tile.makeGibdo(NESColor.orange, true);

    static goriya_red = Tile.makeGoriya(NESColor.orange, NESColor.red);
    static goriya_blue = Tile.makeGoriya(NESColor.steel_blue, NESColor.navy);

    static keese_red  = Tile.makeKeese(NESColor.red);
    static keese_blue = Tile.makeKeese(NESColor.navy);

    static lanmola_body_red  = Tile.makeLanmolaBody(NESColor.orange, NESColor.red);
    static lanmola_head_red  = Tile.makeLanmolaHead(NESColor.orange);
    static lanmola_body_blue = Tile.makeLanmolaBody(NESColor.steel_blue, NESColor.navy);
    static lanmola_head_blue = Tile.makeLanmolaHead(NESColor.steel_blue);

    static like_like = [
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.orange,        {}),
    ];

    static moldorm = [
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.white,         {}),
    ];

    static patra_blue = [
        new TilePiece(Piece.plate_round_dot,                NESColor.navy,          {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.white,         {rotateY: 45}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.steel_blue,    {}),
    ];

    static patra_red = [
        new TilePiece(Piece.plate_round_tabs,               NESColor.white,         {rotateY: 45}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.orange,        {}),
    ];

    static pols_voice_peach_green  = Tile.makePolsVoice(NESColor.peach, NESColor.chartreuse);
    static pols_voice_peach_blue   = Tile.makePolsVoice(NESColor.peach, NESColor.periwinkle);
    static pols_voice_peach_red    = Tile.makePolsVoice(NESColor.peach, NESColor.red);
    static pols_voice_orange_green = Tile.makePolsVoice(NESColor.orange, NESColor.chartreuse);
    static pols_voice_orange_blue  = Tile.makePolsVoice(NESColor.orange, NESColor.periwinkle);
    static pols_voice_orange_red   = Tile.makePolsVoice(NESColor.orange, NESColor.red);

    static rope_e = Tile.makeRope(90);
    static rope_w = Tile.makeRope(270);

    static stalfos = Tile.makeStalfos();
    static stalfos_key = Tile.makeStalfos(NESColor.orange, true);
    static stalfos_compass = Tile.makeStalfos(NESColor.red, false);

    static blade_trap_nw = Tile.makeBladeTrap(  0, -90);
    static blade_trap_ne = Tile.makeBladeTrap(  0,  90);
    static blade_trap_sw = Tile.makeBladeTrap(180, -90);
    static blade_trap_se = Tile.makeBladeTrap(180,  90);
    static blade_trap_w  = Tile.makeBladeTrap(-90, -90);
    static blade_trap_e  = Tile.makeBladeTrap( 90,  90);

    static vire = [
        new TilePiece(Piece.tile,                           NESColor.navy,          {}),
        new TilePiece(Piece.plate_clip_top_edge,            NESColor.steel_blue,    {}),
    ];

    static wallmaster_n = Tile.makeWallmaster(.5,   0);
    static wallmaster_s = Tile.makeWallmaster(.5, 180);
    static wallmaster_e = Tile.makeWallmaster( 0,  90);
    static wallmaster_w = Tile.makeWallmaster( 0, -90);

    static wizzrobe_red_n = Tile.makeWizzrobe('red', 270);
    static wizzrobe_red_e = Tile.makeWizzrobe('red', 0);
    static wizzrobe_red_w = Tile.makeWizzrobe('red', 90);
    static wizzrobe_blue_n = Tile.makeWizzrobe('blue', 270);
    static wizzrobe_blue_e = Tile.makeWizzrobe('blue', 0);
    static wizzrobe_blue_w = Tile.makeWizzrobe('blue', 90);

    static zol_black      = Tile.makeZol(NESColor.black);
    static zol_dark_brown = Tile.makeZol(NESColor.dark_brown);
    static zol_dark_green = Tile.makeZol(NESColor.dark_green);
    static zol_evergreen  = Tile.makeZol(NESColor.evergreen);
    static zol_deep_gray  = Tile.makeZol(NESColor.deep_gray);

    // Dungeon bosses.

    static makeDodongo(rotation) {
        const  [btx, bty, stx, sty] = {
            0: [  0,  .5,   0,   1],
            1: [-.5,   0,  -1,   0],
            2: [  0, -.5,   0,  -1],
            3: [ .5,   0,   1,   0],
        }[rotation];

        return [
            new TilePiece(Piece.plate1x2,                   NESColor.red,           {translateX: btx, translateY: bty, rotateY: (rotation - 1) * 90}),
            new TilePiece(Piece.plate,                      NESColor.orange,        {}),
            new TilePiece(Piece.tile_round_dot_pin_holder,  NESColor.white,         {}),
            new TilePiece(Piece.brick_2_3rd_slope,          NESColor.orange,        {translateX: stx, translateY: sty, translateZ: -2, rotateY: rotation * 90}),
        ];
    }

    static makeGleeok(headCount) {
        const heads = {
            2: [
                new TilePiece(Piece.plate_center_stud,      NESColor.lime,          {                 translateZ: -4}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {                 translateZ: -4, rotateY:  78.75}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {                 translateZ: -4, rotateY: 101.25}),
            ],
            3: [
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {translateX: -.5, translateZ: -4, rotateY: 101.25}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {translateX:  .5, translateZ: -5, rotateY:  78.75}),
                new TilePiece(Piece.plate_center_stud,      NESColor.lime,          {                 translateZ: -5}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {                 translateZ: -5, rotateY:  78.75}),
            ],
            4: [
                new TilePiece(Piece.plate1x2,               NESColor.lime,          {                 translateZ: -4}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {translateX: -.5, translateZ: -4, rotateY:  78.75}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {translateX: -.5, translateZ: -4, rotateY: 101.25}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {translateX:  .5, translateZ: -6, rotateY:  78.75}),
                new TilePiece(Piece.plate_round_bar_side,   NESColor.lime,          {translateX:  .5, translateZ: -6, rotateY: 101.25}),
            ],
        };

        return [
            // Back.
            new TilePiece(Piece.plate1x2_round_half,        NESColor.lime,          {translateY: -.5, rotateY: 180}),
            new TilePiece(Piece.plate1x2_round_half,        NESColor.lime,          {translateY: -.5, rotateY: 180}),
            new TilePiece(Piece.plate_clip_top_edge,        NESColor.dark_slate,    {translateY: -.5}),
            // Feet.
            new TilePiece(Piece.plate_round_dot,            NESColor.lime,          {translateX: -.5, translateY:  .5, translateZ: -3}),
            new TilePiece(Piece.plate_round_dot,            NESColor.lime,          {translateX:  .5, translateY:  .5, translateZ: -4}),
            // Blue body.
            new TilePiece(Piece.plate1x2,                   NESColor.dark_slate,    {                 translateY:  .5, translateZ: -4}),
        ].concat(
            // Head.
            Tile.transformTile(heads[headCount], {translateY: .5})
        );
    }

    static makeGohma(color1, color2) {
        return [
            new TilePiece(Piece.plate_round_tabs,           NESColor.white,         {rotateY: 45}),
            new TilePiece(Piece.plate_round_dot,            color2,                 {}),
            new TilePiece(Piece.plate_bar_double_side,      color1,                 {}),
            new TilePiece(Piece.tile_half_circle,           color1,                 {}),
            new TilePiece(Piece.plate_round_tabs,           color1,                 {translateX: -1, translateZ: -4.5, rotateY: 45, rotateZ: 180}),
            new TilePiece(Piece.plate_round_tabs,           color1,                 {translateX:  1, translateZ: -5.5, rotateY: 45, rotateZ: 180}),
            new TilePiece(Piece.plate_clip_bottom,          NESColor.white,         {translateX: -1, translateZ: -5.5, rotateY: 90, rotateZ: 180}),
            new TilePiece(Piece.plate_clip_bottom,          NESColor.white,         {translateX:  1, translateZ: -6.5, rotateY: 90, rotateZ: 180}),
        ];
    }

    static aquamentus = [
        new TilePiece(Piece.plate_bracket_inverted,         NESColor.chartreuse,    {rotateY: 90}),
        new TilePiece(Piece.plate,                          NESColor.chartreuse,    {rotateY: 0}),
        new TilePiece(Piece.tile,                           NESColor.dark_green,    {rotateY: 0}),
        new TilePiece(Piece.plate_bracket_inverted,         NESColor.chartreuse,    {rotateX: 270, rotateZ: 270, translateX: -1.1, translateZ: -3}),
        new TilePiece(Piece.tile,                           NESColor.white,         {rotateX: 270, rotateZ: 270, translateX: -1.5, translateZ: -4}),
        new TilePiece(Piece.plate,                          NESColor.chartreuse,    {rotateX:   0, rotateZ:   0, translateX: -1.2, translateZ: -2.25}),
        new TilePiece(Piece.tile_round_dot_pin_holder,      NESColor.white,         {rotateX:   0, rotateZ:   0, translateX: -1.2, translateZ: -2.25}),
    ];

    static dodongo_n = Tile.makeDodongo(0);
    static dodongo_e = Tile.makeDodongo(1);
    static dodongo_s = Tile.makeDodongo(2);
    static dodongo_w = Tile.makeDodongo(3);

    static manhandla = [
        new TilePiece(Piece.brick_4_side_studs,             NESColor.white,         {}),
        new TilePiece(Piece.tile,                           NESColor.navy,          {rotateY: 45}),
        new TilePiece(Piece.plate_clip_top,                 NESColor.steel_blue,    {translateY:  .9, translateZ: -3.25, rotateX:  90, rotateZ:   0}), // front
        new TilePiece(Piece.plate_clip_top,                 NESColor.steel_blue,    {translateX:  .9, translateZ: -4.25, rotateX:  90, rotateZ:  90}), // right
        new TilePiece(Piece.plate_clip_top,                 NESColor.steel_blue,    {translateY: -.9, translateZ: -5.25, rotateX:  90, rotateZ: 180}), // back
        new TilePiece(Piece.plate_clip_top,                 NESColor.steel_blue,    {translateX: -.9, translateZ: -6.25, rotateX:  90, rotateZ: 270}), // left
    ];

    static gleeok2 = Tile.makeGleeok(2);
    static gleeok3 = Tile.makeGleeok(3);
    static gleeok4 = Tile.makeGleeok(4);

    static digdogger = [
        new TilePiece(Piece.plate_round_tabs,               NESColor.red,           {rotateY: 45, translateX:  .5, translateY:  .5, translateZ:  0}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.red,           {rotateY: 45, translateX: -.5, translateY:  .5, translateZ: -1}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.red,           {rotateY: 45, translateX:  .5, translateY: -.5, translateZ: -2}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.red,           {rotateY: 45, translateX: -.5, translateY: -.5, translateZ: -3}),
        new TilePiece(Piece.plate2x2_round,                 NESColor.orange,        {translateZ: -3}),
        new TilePiece(Piece.plate2x2_round_inverted_dish,   NESColor.orange,        {translateZ: -3}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.white,         {translateZ: -3}),
    ];

    static digdogger_small = [
        new TilePiece(Piece.plate_round_tabs,               NESColor.red,           {rotateY: 45}),
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.white,         {}),
    ];

    static gohma_red = Tile.makeGohma(NESColor.orange,      NESColor.red);
    static gohma_blue = Tile.makeGohma(NESColor.steel_blue, NESColor.navy);

    static ganon = [
        new TilePiece(Piece.plate1x2,                       NESColor.cyan,          {translateY: -.5}),
        new TilePiece(Piece.plate1x2,                       NESColor.pale_cyan,     {translateY: -.5}),
        new TilePiece(Piece.plate_light_attachment,         NESColor.cyan,          {translateX: -.5, translateY: -.5}),
        new TilePiece(Piece.plate_light_attachment,         NESColor.cyan,          {translateX:  .5, translateY: -.5, translateZ: -1}),
        new TilePiece(Piece.plate1x2_round_half,            NESColor.red,           {translateX:   0, translateY: -.5, translateZ: -1}),
        new TilePiece(Piece.plate_bar_side,                 NESColor.cyan,          {translateX:   0, translateY: -.5, translateZ: -1}),
        new TilePiece(Piece.plate_clip_top,                 NESColor.cyan,          {translateX:   0, translateY: -.5, translateZ: -1}),
        new TilePiece(Piece.brick_2_3rd_convex_corner,      NESColor.red,           {translateX: -.5, translateY:  .5, translateZ: -7}),
        new TilePiece(Piece.brick_2_3rd_convex_corner,      NESColor.red,           {translateX:  .5, translateY:  .5, translateZ: -9, rotateY: 90}),
    ];

    // Items.

    static item_heart = [
        new TilePiece(Piece.tile_heart,                     NESColor.red,           {rotateY: 45}),
    ];
    static item_heart_center = Tile.transformCenterX(Tile.item_heart);

    static item_heart_container = [
        new TilePiece(Piece.tile,                           NESColor.white,         {}),
        new TilePiece(Piece.tile_heart,                     NESColor.red,           {rotateY: 45}),
    ];
    static item_heart_container_center = Tile.transformCenterX(Tile.item_heart_container);

    static item_floating_heart_container = [
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {opacity: Tile.clear_opacity}),
        new TilePiece(Piece.tile,                           NESColor.white,         {}),
        new TilePiece(Piece.tile_heart,                     NESColor.red,           {rotateY: 45}),
    ];

    static item_floating_heart = [
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {opacity: Tile.clear_opacity}),
        new TilePiece(Piece.tile_heart,                     NESColor.red,           {rotateY: 45}),
    ];

    static item_triforce = [
        new TilePiece(Piece.brick_2_3rd_slope_triangle,     NESColor.orange,        {rotateY: 90}),
    ];

    static item_triforce_sand = [
        new TilePiece(Piece.plate,                          NESColor.red,           {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
        new TilePiece(Piece.tile,                           NESColor.orange,        {}),
    ];

    static item_rupee_orange = [
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
    ];
    static item_rupee_orange_center = Tile.transformCenterX(Tile.item_rupee_orange);

    static item_rupee_blue = [
        new TilePiece(Piece.plate_round_dot,                NESColor.steel_blue,    {}),
    ];
    static item_rupee_blue_center = Tile.transformCenterX(Tile.item_rupee_blue);

    static item_clock = [
        new TilePiece(Piece.plate_round_tabs,               NESColor.red,           {rotateY: 45}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.white,         {}),
    ];
    static item_road = [
        new TilePiece(Piece.brick_2_3rd_slope,              NESColor.secondary,     {rotateY: 270}),
    ];

    // Items Inventory.

    static item_boomerang = [
        new TilePiece(Piece.plate_clip_top,                 NESColor.orange,        {rotateY: 90}),
    ];
    static item_magical_boomerang = [
        new TilePiece(Piece.plate_clip_top,                 NESColor.steel_blue,    {rotateY: 90}),
    ];

    static item_bomb = [
        new TilePiece(Piece.plate_round_dot,                NESColor.navy,          {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.navy,          {}),
        new TilePiece(Piece.tile_round_dot_pin_holder,      NESColor.white,         {}),
    ];
    static item_bomb_center = Tile.transformCenterX(Tile.item_bomb);

    static makeBow(color) {
        return [
            new TilePiece(Piece.plate_round_dot,            color,                  {}),
            new TilePiece(Piece.brick_slope_curved,         NESColor.brown,         {rotateY: 270}),
        ];
    }
    static item_bow_green = Tile.makeBow(NESColor.chartreuse);
    static item_bow_blue  = Tile.makeBow(NESColor.periwinkle);
    static item_bow_red   = Tile.makeBow(NESColor.red);

    static makeArrow(fletching, shaft, point) {
        return [
            new TilePiece(Piece.plate_round_tabs,           fletching,              {rotateY: 45}),
            new TilePiece(Piece.plate_round_dot,            shaft,                  {}),
            new TilePiece(Piece.plate_round_dot,            shaft,                  {}),
            new TilePiece(Piece.tile_round_dot_pin_holder,  point,                  {}),
        ];
    }

    static item_arrow_green = Tile.makeArrow(NESColor.brown, NESColor.chartreuse, NESColor.orange);
    static item_arrow_blue  = Tile.makeArrow(NESColor.brown, NESColor.periwinkle, NESColor.orange);
    static item_arrow_red   = Tile.makeArrow(NESColor.brown, NESColor.red,        NESColor.orange);
    static item_arrow_green_center = Tile.transformCenterX(Tile.item_arrow_green);
    static item_silver_arrow = Tile.makeArrow(NESColor.white, NESColor.navy, NESColor.steel_blue);

    static makeCandle(color) {
        return [
            new TilePiece(Piece.plate_bracket_inverted,     NESColor.orange,        {rotateY: 270}),
            new TilePiece(Piece.tile_round_dot_pin_holder,  NESColor.white,         {}),
            new TilePiece(Piece.candle_flame,               color,                  {rotateY: 90}),
        ];
    }

    static item_candle_red = Tile.makeCandle(NESColor.red);
    static item_candle_blue = Tile.makeCandle(NESColor.navy);
    static item_candle_blue_center = Tile.transformCenterX(Tile.item_candle_blue);

    static item_recorder = [ // flute
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.orange,        {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.orange,        {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.orange,        {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.red,           {}),
    ];
    static item_bait = [ // food
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.red  ,         {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {}),
    ];
    static item_bait_center = Tile.transformCenterX(Tile.item_bait);

    static item_letter = [
        new TilePiece(Piece.tile,                           NESColor.white,         {}),
        new TilePiece(Piece.plate,                          NESColor.steel_blue,    {}),
    ];
    static item_letter_center = Tile.transformCenterX(Tile.item_letter);

    static item_life_potion_blue = [
        new TilePiece(Piece.plate_round_dot,                NESColor.navy,          {}),
        new TilePiece(Piece.tile_round_dot_pin_holder,      NESColor.navy,          {}),
    ];
    static item_life_potion_blue_center = Tile.transformCenterX(Tile.item_life_potion_blue);
    static item_life_potion_red = [
        new TilePiece(Piece.plate_round_dot,                NESColor.red,           {}),
        new TilePiece(Piece.tile_round_dot_pin_holder,      NESColor.red,           {}),
    ];
    static item_life_potion_red_center = Tile.transformCenterX(Tile.item_life_potion_red);

    static item_magical_rod = [
        new TilePiece(Piece.plate_round_dot,                NESColor.steel_blue,    {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.steel_blue,    {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.white,         {}),
        new TilePiece(Piece.plate,                          NESColor.navy,          {rotateY: 315}),
    ];
    static item_book_of_magic = [
        new TilePiece(Piece.plate_bracket_inverted,         NESColor.red,           {rotateY: 270}),
        new TilePiece(Piece.plate,                          NESColor.white,         {}),
        new TilePiece(Piece.tile_groove,                    NESColor.red,           {}),
    ];

    // Items Equipment.

    static makeSword(grip, guard, blade) {
        return [
            new TilePiece(Piece.plate_round_dot,            grip,                   {}),
            new TilePiece(Piece.plate_round_tabs,           guard,                  {rotateY: 45}),
            new TilePiece(Piece.plate_round_dot,            blade,                  {}),
            new TilePiece(Piece.tile_round_dot_pin_holder,  blade,                  {}),
        ];
    }

    static item_sword_green   = Tile.makeSword(NESColor.orange,     NESColor.chartreuse, NESColor.brown);
    static item_sword_blue    = Tile.makeSword(NESColor.orange,     NESColor.periwinkle, NESColor.brown);
    static item_sword_red     = Tile.makeSword(NESColor.orange,     NESColor.red,        NESColor.brown);
    static item_white_sword   = Tile.makeSword(NESColor.steel_blue, NESColor.navy,       NESColor.white);
    static item_magical_sword = Tile.makeSword(NESColor.orange,     NESColor.red,        NESColor.white);

    static item_sword_green_center   = Tile.transformCenterX(Tile.item_sword_green);
    static item_white_sword_center   = Tile.transformCenterX(Tile.item_white_sword);
    static item_magical_sword_center = Tile.transformCenterX(Tile.item_magical_sword);

    static item_sword_minfigure = [ // wooden
        new TilePiece(Piece.plate_clip_top,                 NESColor.primary,       {rotateY: 90}),
        new TilePiece(Piece.sword,                          NESColor.brown,         {rotateZ: 270}),
    ];
    static item_white_sword_minfigure = [
        new TilePiece(Piece.plate_clip_top,                 NESColor.primary,       {rotateY: 90}),
        new TilePiece(Piece.sword,                          NESColor.white,         {rotateZ: 270}),
    ];
    static item_magical_sword_minfigure = [
        new TilePiece(Piece.plate_clip_top,                 NESColor.primary,       {rotateY: 90}),
        new TilePiece(Piece.sword,                          NESColor.red,           {rotateZ: 270}),
    ];

    static item_shield = [ // wooden, small
        new TilePiece(Piece.plate_round_dot,                NESColor.brown,         {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.orange,        {}),
    ];
    static item_magical_shield = [
        new TilePiece(Piece.plate,                          NESColor.brown,         {}),
        new TilePiece(Piece.plate_round_tabs,               NESColor.orange,        {}),
    ]
    static item_magical_shield_center = Tile.transformCenterX(Tile.item_magical_shield);

    static item_ring_blue = [
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.navy,          {}),
    ];
    static item_ring_blue_center = Tile.transformCenterX(Tile.item_ring_blue);
    static item_ring_red = [
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.red,           {}),
    ];
    static item_power_bracelet = [
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.orange,        {}),
    ];

    // Items Navigation.

    static item_map = [
        new TilePiece(Piece.tile,                           NESColor.white,         {}),
        new TilePiece(Piece.plate,                          NESColor.orange,        {}),
    ];
    static item_compass = [
        new TilePiece(Piece.tile_round_dot_pin_holder,      NESColor.red,           {}),
        new TilePiece(Piece.plate_round_dot_with_hole,      NESColor.white,         {}),
    ];
    static item_key = [
        new TilePiece(Piece.plate_round_tabs,               NESColor.orange,        {rotateY: 45}),
        new TilePiece(Piece.plate_round_bar_side,           NESColor.orange,        {rotateX: 90, rotateY: 90, translateZ: 2.75, translateY: .1}),
    ];
    static item_key_center = Tile.transformCenterX(Tile.item_key);

    static item_magical_key = [
        new TilePiece(Piece.plate_round_tabs,               NESColor.orange,        {rotateY: 45}),
        new TilePiece(Piece.plate_round_bar_side,           NESColor.orange,        {rotateX: 90, rotateY: 90, translateZ: 2.75, translateY: .1}),
        new TilePiece(Piece.tile_round_dot,                 NESColor.red,           {rotateX: 90, rotateY: 90, translateZ: 1.75, translateY: .5}),
    ];
    static makeRaft(color) {
        return [
            new TilePiece(Piece.plate_round_dot,            NESColor.orange,        {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.brown,         {}),
            new TilePiece(Piece.plate,                      color,                  {}),
            new TilePiece(Piece.plate_round_dot,            NESColor.brown,         {}),
        ];
    }
    static item_raft_green = Tile.makeRaft(NESColor.chartreuse);
    static item_raft_blue  = Tile.makeRaft(NESColor.periwinkle);
    static item_raft_red   = Tile.makeRaft(NESColor.red);

    static item_stepladder = [
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
        new TilePiece(Piece.plate,                          NESColor.brown,         {}),
        new TilePiece(Piece.plate_round_dot,                NESColor.orange,        {}),
        new TilePiece(Piece.tile,                           NESColor.brown,         {}),
    ];

    // Cave walls.

    static cave_wall_outer = [
        new TilePiece(Piece.brick,                          NESColor.primary,       {}),
        new TilePiece(Piece.brick,                          NESColor.primary,       {}),
    ];

    static cave_wall_inner = [
        new TilePiece(Piece.brick_2_3rd,                    NESColor.primary,       {}),
        new TilePiece(Piece.brick,                          NESColor.primary,       {}),
    ];

    static cave_entrance = [
        new TilePiece(Piece.plate,                          NESColor.primary,       {}),
        new TilePiece(Piece.tile,                           NESColor.black,         {}),
    ];

    // Dungeon walls outer.

    static makeWallOuter(isBase) {
        const tile = [];
        const options = isBase ? {} : {translateX: .5};
        if (isBase) {
            tile.push(new TilePiece(Piece.brick,            NESColor.primary,       {}));
        } else {
            tile.push(new TilePiece(Piece.plate,            NESColor.primary,       options));
        }
        tile.push(new TilePiece(Piece.brick,                NESColor.primary,       options));
        return tile;
    }

    static makeWallOuterCap(side) {
        const tile = [];
        tile.push(new TilePiece(Piece.plate_center_stud,    NESColor.primary,       {translateX:  side * 0.5}));
        tile.push(new TilePiece(Piece.brick_side_stud2,     NESColor.primary,       {translateX:  side * 0.5,                   rotateY: side *  90}));
        tile.push(new TilePiece(Piece.tile2,                NESColor.primary,       {translateX: -side * 0.4, translateZ: -3.5, rotateZ: side * -90}));
        tile.push(new TilePiece(Piece.plate_center_stud,    NESColor.primary,       {translateX:  side * 2.5, translateZ: -7}));
        tile.push(new TilePiece(Piece.plate_center_stud2,   NESColor.primary,       {translateX:  side *   5, translateZ: -8}));
        tile.push(new TilePiece(Piece.plate6,               NESColor.primary,       {translateX:  side *   4, translateZ: -8}));
        return tile;
    }

    // Dungeon walls inner.

    static makeWallInner(isBase) {
        const tile = [];
        if (isBase) {
            tile.push(new TilePiece(Piece.brick_2_3rd,      NESColor.primary,       {}));
        }
        const options = isBase ? {} : {translateX: .5};
        tile.push(new TilePiece(Piece.brick_2_3rd,          NESColor.background,    options));
        tile.push(new TilePiece(Piece.tile_groove,          NESColor.primary,       options));
        return tile;
    }

    static makeWallInnerCap(side, plateOptions) {
        const tile = [];
        tile.push(new TilePiece(Piece.brick_2_3rd,          NESColor.primary,       {}));
        tile.push(new TilePiece(Piece.brick_side_stud,      NESColor.primary,       {rotateY: side * -90}));
        tile.push(new TilePiece(Piece.plate,                NESColor.primary,       {}));
        tile.push(new TilePiece(Piece.tile,                 NESColor.primary,       {translateX: side * 0.9, translateZ: -3.25, rotateZ: side * 90}));
        tile.push(new TilePiece(Piece.plate_center_stud2,   NESColor.primary,       {translateX: side *   2, translateZ: -7}));
        tile.push(new TilePiece(Piece.plate_center_stud2,   NESColor.primary,       {translateX: side *   5, translateZ: -8}));
        tile.push(new TilePiece(Piece.plate6,               NESColor.primary,       {translateX: side *   4, translateZ: -8}));
        return tile;
    }

    static wall_outer_ns    = Tile.makeWallOuter(false);
    static wall_outer_ew    = Tile.makeWallOuter(true);

    static wall_outer_cap_w = Tile.makeWallOuterCap( 1);
    static wall_outer_cap_e = Tile.makeWallOuterCap(-1);

    static wall_inner_ns    = Tile.makeWallInner(false);
    static wall_inner_ew    = Tile.makeWallInner(true);

    static wall_inner_cap_w = Tile.makeWallInnerCap( 1);
    static wall_inner_cap_e = Tile.makeWallInnerCap(-1);

    // Dungeon wall outer doors.

    static makeWallOuterDoor(isBase, rotateY) {
        const tile = [];
        const translateX = isBase ? 0 : .5;
        if (isBase) {
            tile.push(new TilePiece(Piece.brick,            NESColor.primary,       {}));
        } else {
            tile.push(new TilePiece(Piece.plate_center_stud,NESColor.primary,       {translateX: translateX}));
            tile.push(new TilePiece(Piece.brick_2_3rd,      NESColor.primary,       {translateX: translateX}));
        }
        tile.push(new TilePiece(Piece.brick_2_3rd,          NESColor.primary,       {translateX: translateX}));
        tile.push(new TilePiece(Piece.plate_bar_side,       NESColor.primary,       {translateX: translateX, rotateY: rotateY}));
        return tile;
    }

    static wall_outer_door_n = Tile.makeWallOuterDoor(false, 0);
    static wall_outer_door_s = Tile.makeWallOuterDoor(false, 180);
    static wall_outer_door_e = Tile.makeWallOuterDoor(true, 90);
    static wall_outer_door_w = Tile.makeWallOuterDoor(true, 270);

    // Dungeon wall inner doors.

    static makeWallInnerDoorOpen(isBase) {
        const tile = [];
        const translateX = isBase ? 0 : .5;
        if (isBase) {
            tile.push(new TilePiece(Piece.plate,            NESColor.primary,       {}));
        } else {
            tile.push(new TilePiece(Piece.plate_center_stud,NESColor.primary,       {translateX: translateX}));
        }
        tile.push(new TilePiece(Piece.tile,                 NESColor.black,         {translateX: translateX}));
        return tile;
    }

    static makeWallInnerDoorBlocked(isBase, direction, clipColor, piece, pieceColor, pieceRotation) {
        const tile = Tile.makeWallInnerDoorOpen(isBase);
        const optionsClip = {
            'n': {translateX:  0.5, translateY:  0.1, translateZ: .25, rotateY: 0, rotateX: 270, rotateZ: 180},
            's': {translateX:  0.5, translateY: -0.1, translateZ: .25, rotateY: 0, rotateX: 270, rotateZ:   0},
            'e': {translateX: -0.1, translateY:    0, translateZ: .25, rotateY: 0, rotateX: 270, rotateZ: 270},
            'w': {translateX:  0.1, translateY:    0, translateZ: .25, rotateY: 0, rotateX: 270, rotateZ:  90},
        };

        tile.push(new TilePiece(Piece.plate_clip_horizontal_side, clipColor, optionsClip[direction]));

        const optionsPiece = {
            'n': {translateX:  0.5, translateY:  0.5, translateZ: -0.75, rotateX: 270,                 rotateY: pieceRotation, rotateZ: 180},
            's': {translateX:  0.5, translateY: -0.5, translateZ: -0.75, rotateX: 270,                 rotateY: pieceRotation, rotateZ:   0},
            'e': {translateX: -0.5, translateY:    0, translateZ: -0.75, rotateX: 270 + pieceRotation, rotateY:             0, rotateZ: 270},
            'w': {translateX:  0.5, translateY:    0, translateZ: -0.75, rotateX: 270 + pieceRotation, rotateY:             0, rotateZ:  90},
        };

        tile.push(new TilePiece(piece, pieceColor, optionsPiece[direction]));
        return tile;
    }

    static makeWallInnerDoorLocked(isBase, direction) {
        return Tile.makeWallInnerDoorBlocked(isBase, direction, NESColor.background, Piece.plate_round_tabs, NESColor.secondary, 45);
    }

    static makeWallInnerDoorBomb(isBase, direction) {
        return Tile.makeWallInnerDoorBlocked(isBase, direction, NESColor.primary,    Piece.tile,             NESColor.background, 0);
    }

    static makeWallInnerDoorShut(isBase, direction) {
        return Tile.makeWallInnerDoorBlocked(isBase, direction,NESColor.background,  Piece.tile_round_dot,   NESColor.secondary,  0);
    }

    static wall_inner_door_solid_ns = [
        new TilePiece(Piece.plate_center_stud,              NESColor.primary,       {translateX: .5}),
        new TilePiece(Piece.plate,                          NESColor.primary,       {translateX: .5}),
        new TilePiece(Piece.brick_2_3rd,                    NESColor.background,    {translateX: .5}),
        new TilePiece(Piece.tile_groove,                    NESColor.primary,       {translateX: .5}),
    ];
    static wall_inner_door_solid_ew = Tile.wall_inner_ew;

    static wall_inner_door_open_ns  = Tile.makeWallInnerDoorOpen(false);
    static wall_inner_door_open_ew  = Tile.makeWallInnerDoorOpen(true);

    static wall_inner_door_locked_n = Tile.makeWallInnerDoorLocked(false, 'n');
    static wall_inner_door_locked_s = Tile.makeWallInnerDoorLocked(false, 's');
    static wall_inner_door_locked_e = Tile.makeWallInnerDoorLocked(true, 'e');
    static wall_inner_door_locked_w = Tile.makeWallInnerDoorLocked(true, 'w');

    static wall_inner_door_bomb_n   = Tile.makeWallInnerDoorBomb(false, 'n');
    static wall_inner_door_bomb_s   = Tile.makeWallInnerDoorBomb(false, 's');
    static wall_inner_door_bomb_e   = Tile.makeWallInnerDoorBomb(true, 'e');
    static wall_inner_door_bomb_w   = Tile.makeWallInnerDoorBomb(true, 'w');

    static wall_inner_door_shut_n   = Tile.makeWallInnerDoorShut(false, 'n');
    static wall_inner_door_shut_s   = Tile.makeWallInnerDoorShut(false, 's');
    static wall_inner_door_shut_e   = Tile.makeWallInnerDoorShut(true, 'e');
    static wall_inner_door_shut_w   = Tile.makeWallInnerDoorShut(true, 'w');

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

    // 1x1 pieces of descending heights to raise the elevation.
    static elevators = [
        Piece.brick_1x1x5,
        Piece.brick_1x1x3,
        Piece.brick,
        Piece.brick_2_3rd,
        Piece.plate,
    ].map(piece => new TilePiece(piece, NESColor.primary, {}));

    // [[plateLevel, piece], ...]
    * getPieceLevelEntries(elevation) {
        // Find filler pieces for elevation.
        const tileElevators = [];
        while (elevation > 0) {
            const tilePiece = Tile.elevators.find(tilePiece => tilePiece.piece.plateHeight <= elevation);
            tileElevators.push(tilePiece);
            elevation -= tilePiece.piece.plateHeight;
        }
        for (const tilePiece of tileElevators.concat(this.tilePieces)) {
            if (null != tilePiece.piece.partNumber) {
                yield [elevation + tilePiece.piece.plateLevel, tilePiece];
            }
            elevation += tilePiece.piece.plateHeight;
        }
    }
}

export const Texts = Object.freeze({
    "cave_item_take_this": [
        ["IT'S DANGEROUS TO GO", "ALONE! TAKE THIS."],
        ["o' ooo o o",           "oo! oo o."],
    ],
    "cave_item_master_using": [
        ["MASTER USING IT AND", "YOU CAN HAVE THIS."],
        ["ooo oo o o",          "o o oo o."],
    ],
    "cave_item_show_this": [
        ["SHOW THIS TO THE", "OLD WOMAN."],
        ["o oo o o",         "o oo."],
    ],
    "cave_take_any": [
        ["TAKE ANY ONE YOU WANT."],
        ["oo o o o o."],
    ],
    "cave_take_road": [
        ["TAKE ANY ROAD YOU WANT."],
        ["oo o oo o o."],
    ],
    "cave_door_repair": [
        ["PAY ME FOR THE DOOR", "REPAIR CHARGE."],
        ["o o o o oo",          "oo ooo."],
    ],
    "cave_secret_everybody": [
        ["IT'S A SECRET", "TO EVERYBODY."],
        ["o' o oo",       "o oooo."],
    ],
    "cave_secret_tree": [
        ["SECRET IS IN THE TREE", "AT THE DEAD-END."],
        ["oo o o o oo",           "o o o-o."],
    ],
    "cave_meet_grave": [
        ["MEET THE OLD MAN", "AT THE GRAVE."],
        ["oo o o o",         "o o oo."],
    ],
    "cave_up_up": [
        ["GO UP,UP,", "THE MOUNTAIN AHEAD."],
        ["o o,o",     "o oooo oo."],
    ],
    "cave_maze": [
        ["GO NORTH,WEST,SOUTH,", "WEST TO THE FOREST", "OF MAZE."],
        ["o oo,o,oo,",           "oo o o oo",          "o o."],
    ],
    "cave_pay_talk": [
        ["PAY ME AND I'LL TALK."],
        ["o o o .o o."],
    ],
    "cave_aint_enough": [
        ["THIS AIN'T ENOUGH", "TO TALK."],
        ["o o'o ooo",         "o o."],
    ],
    "cave_youre_rich": [
        ["BOY, YOU'RE RICH!"],
        ["o, o'o o!"],
    ],
    "cave_lets_play": [
        ["LET'S PLAY MONEY", "MAKING GAME."],
        ["o'o o oo",         "oo oo."],
    ],
    "cave_shop_expensive": [
        ["BOY, THIS IS", "REALLY EXPENSIVE!"],
        ["o, o o",       "ooo oooo!"],
    ],
    "cave_shop_buy_somethin": [
        ["BUY SOMETHIN' WILL YA!"],
        ["o ooo' o o!"],
    ],
    "cave_shop_buy_medicine": [
        ["BUY MEDICINE BEFORE", "YOU GO."],
        ["o oooo ooo",          "o o."],
    ],
    "dungeon_walk_waterfall": [
        ["WALK INTO THE", "WATERFALL."],
        ["oo oo o",       "oooo."],
    ],
    "dungeon_fairies_dont": [
        ["THERE ARE SECRETS WHERE", "FAIRIES DON'T LIVE."],
        ["oo o ooo ooo",            "ooo o' oo."],
    ],
    "dungeon_secret_arrow": [
        ["SECRET POWER IS SAID", "TO BE IN THE ARROW."],
        ["oo oo o oo",           "o o oo oo."],
    ],
    "dungeon_more_bombs": [
        ["I BET YOU'D LIKE", "TO HAVE MORE BOMBS."],
        ["o o o' o",         "o o oo oo."],
    ],
    "dungeon_dodongo_smoke": [
        ["DODONGO DISLIKES SMOKE."],
        ["ooo oooo oo."],
    ],
    "dungeon_sword_waterfall": [
        ["DID YOU GET THE SWORD", "FROM THE OLD MAN ON", "TOP OF THE WATERFALL?"],
        ["o o o o ooo",           "oo o o o o",          "o o o oooo?"],
    ],
    "dungeon_eastmost_secret": [
        ["EASTMOST PENNINSULA", "IS THE SECRET."],
        ["oooo ooooo",          "o o oo."],
    ],
    "dungeon_diggogger_hates": [
        ["DIGDOGGER HATES", "CERTAIN KIND OF SOUND."],
        ["oooo ooo",        "ooo o o oo."],
    ],
    "dungeon_gohma_eyes": [
        ["AIM AT THE EYES", "OF GOHMA."],
        ["o o o oo",        "o oo."],
    ],
    "dungeon_skull_secret": [
        ["EYES OF SKULL", "HAS A SECRET."],
        ["oo o oo",       "o o oo."],
    ],
    "dungeon_next_room": [
        ["GO TO THE NEXT ROOM."],
        ["o o o o o."],
    ],
    "dungeon_grumble": [
        ["GRUMBLE,GRUMBLE..."],
        ["ooo,ooo.."],
    ],
    "dungeon_10th_enemy": [
        ["10TH ENEMY HAS THE BOMB."],
        ["oo oo o o o."],
    ],
    "dungeon_spectacle_rock": [
        ["SPECTACLE ROCK IS", "AN ENTRANCE TO DEATH."],
        ["oooo oo o",         "o ooo o oo."],
    ],
    "dungeon_patra_map": [
        ["PATRA HAS THE MAP."],
        ["oo o o o."],
    ],
    "dungeon_tip_nose": [
        ["THERE'S A SECRET IN", "THE TIP OF THE NOSE."],
        ["oo' o oo o",          "o o o o o."],
    ],
    "dungeon_have_triforce": [
        ["ONES WHO DOES NOT HAVE", "TRIFORCE CAN'T GO IN."],
        ["oo o o o oo",            "ooo o' o o."],
    ],
});


Object.entries(Texts).forEach(([key, [originalText, compressedText]]) => {
    return; // Comment to compare original to compressed.
    console.log(`\n--- ${key} ---`);
    originalText.forEach((line, i) => {
        console.log(line.match(/.{1,2}/g).map(chunk => `(${chunk.padEnd(2, ' ')})`).join(''));
        console.log(compressedText[i].split("").map(character => `(${character} )`).join(''));
    });
});

export function makeTextFloor(elevation, texts, sprites, items) {
    const toTextTile = {
        " ": Tile.dungeon_floor,
        "o": Tile.dungeon_text_character,
        "x": Tile.dungeon_text_times,
        "-": Tile.dungeon_text_dash,
        ".": Tile.dungeon_text_period,
        ",": Tile.dungeon_text_comma,
        "!": Tile.dungeon_text_exclamation,
        "?": Tile.dungeon_text_question,
        "'": Tile.dungeon_text_apostrophe,
    }

    const floor = Array(7).fill(0).map((_, screenY) =>
        Array(12).fill(0).map((_, screenX) => [elevation, Tile.dungeon_floor]
    ));

    // Get the last compressed text.
    texts = texts[texts.length - 1][1];

    texts.forEach((text, rowIndex) => {
        const startIndex = Math.floor((12 - text.length) / 2);
        text.split('').forEach((textCharacter, columnIndex) => {
            floor[rowIndex][startIndex + columnIndex] = [elevation, toTextTile[textCharacter]];
        });
    });

    const flameRowIndex = Math.max(2, texts.length);
    floor[flameRowIndex][2] = [elevation, Tile.dungeon_floor_stud, Tile.dungeon_flame];
    floor[flameRowIndex][9] = [elevation, Tile.dungeon_floor_stud, Tile.dungeon_flame];
    floor[flameRowIndex][5] = [elevation, Tile.dungeon_jumper_1x2, sprites[0]];
    floor[flameRowIndex][6] = [elevation, Tile.dungeon_floor_sub];

    // Rupee times sign.
    if (items.length > 1 && items[0].length > 1) {
        floor[5][0].push(Tile.item_rupee_orange);
        floor[5][1] = [elevation, Tile.dungeon_text_times];
    }

    if (items && items.length > 0) {
        const columnIndexes = {
            1: [5],
            2: [3, 7],
            3: [2, 5, 8],
        }[items.length];

        items.forEach((itemConfig, itemIndex) => {
            const itemStartColumn = columnIndexes[itemIndex];
            const [item, value] = itemConfig;

            // Add the item.
            if (item === Tile.item_road) {
                floor[4][itemStartColumn + 1] = [elevation, item];
            } else if ([
                Tile.item_sword_minfigure,
                Tile.item_white_sword_minfigure,
                Tile.item_magical_sword_minfigure
            ].includes(item)) {
                floor[4][7] = [elevation, Tile.dungeon_floor_stud, item];
                // todo: Make conditional on adding 3d printer supports.
                floor[4][4] = [elevation, Tile.dungeon_floor_triangle];
                floor[4][5] = [elevation, Tile.dungeon_floor_triangle];
                floor[4][6] = [elevation, Tile.dungeon_floor_triangle];
            } else {
                floor[4][itemStartColumn] = [elevation, Tile.dungeon_jumper_1x2, item];
                floor[4][itemStartColumn + 1] = [elevation, Tile.dungeon_floor_sub];
            }

            // Add the cost text.
            if (undefined !== value) {
                const cost = value < 0 ? "-o" : value > 100 ? "oo" : " o";
                cost.split("").forEach((costCharacter, costIndex) => {
                    floor[5][itemStartColumn + costIndex] = [elevation, toTextTile[costCharacter]];
                })
            }
        });
    }

    return floor;
}
