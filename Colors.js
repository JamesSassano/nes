"use strict";

class BaseColor {
    constructor(colorCode, colorInt, colorName) {
        this.colorCode = colorCode;
        this.colorInt = colorInt;
        this.colorName = colorName;
    }
}

export class LDrawColors extends BaseColor {
    static {
        const colors = {
            0:      [0x1B2A34, "Black"],
            1:      [0x1E5AA8, "Blue"],
            2:      [0x00852B, "Green"],
            3:      [0x069D9F, "Dark_Turquoise"],
            4:      [0xB40000, "Red"],
            5:      [0xD3359D, "Dark_Pink"],
            6:      [0x543324, "Brown"],
            7:      [0x8A928D, "Light_Grey"],
            8:      [0x545955, "Dark_Grey"],
            9:      [0x97CBD9, "Light_Blue"],
            10:     [0x58AB41, "Bright_Green"],
            11:     [0x00AAA4, "Light_Turquoise"],
            12:     [0xF06D61, "Salmon"],
            13:     [0xF6A9BB, "Pink"],
            14:     [0xFAC80A, "Yellow"],
            15:     [0xF4F4F4, "White"],
            17:     [0xADD9A8, "Light_Green"],
            18:     [0xFFD67F, "Light_Yellow"],
            19:     [0xD7BA8C, "Tan"],
            20:     [0xAFBED6, "Light_Violet"],
            22:     [0x671F81, "Purple"],
            23:     [0x0E3E9A, "Dark_Blue_Violet"],
            25:     [0xD67923, "Orange"],
            26:     [0x901F76, "Magenta"],
            27:     [0xA5CA18, "Lime"],
            28:     [0x897D62, "Dark_Tan"],
            29:     [0xFF9ECD, "Bright_Pink"],
            30:     [0xA06EB9, "Medium_Lavender"],
            31:     [0xCDA4DE, "Lavender"],
            68:     [0xFDC383, "Very_Light_Orange"],
            69:     [0x8A12A8, "Bright_Reddish_Lilac"],
            70:     [0x5F3109, "Reddish_Brown"],
            71:     [0x969696, "Light_Bluish_Grey"],
            72:     [0x646464, "Dark_Bluish_Grey"],
            73:     [0x7396C8, "Medium_Blue"],
            74:     [0x7FC475, "Medium_Green"],
            77:     [0xFECCCF, "Light_Pink"],
            78:     [0xFFC995, "Light_Nougat"],
            84:     [0xAA7D55, "Medium_Nougat"],
            85:     [0x441A91, "Medium_Lilac"],
            86:     [0x7B5D41, "Light_Brown"],
            89:     [0x1C58A7, "Blue_Violet"],
            92:     [0xBB805A, "Nougat"],
            100:    [0xF9B7A5, "Light_Salmon"],
            110:    [0x26469A, "Violet"],
            112:    [0x4861AC, "Medium_Violet"],
            115:    [0xB7D425, "Medium_Lime"],
            118:    [0x9CD6CC, "Aqua"],
            120:    [0xDEEA92, "Light_Lime"],
            121:    [0xF89A39, "Light_Orange"],
            123:    [0xEE5434, "Dark_Salmon"],
            125:    [0xF9A777, "Spud_Orange"],
            128:    [0xAD6140, "Dark_Nougat"],
            151:    [0xC8C8C8, "Very_Light_Bluish_Grey"],
            180:    [0xDD982E, "Dark_Yellow"],
            191:    [0xFCAC00, "Bright_Light_Orange"],
            212:    [0x9DC3F7, "Bright_Light_Blue"],
            213:    [0x476FB6, "Medium_Blue_Violet"],
            216:    [0x872B17, "Rust"],
            218:    [0x8E5597, "Reddish_Lilac"],
            219:    [0x564E9D, "Lilac"],
            220:    [0x9195CA, "Light_Lilac"],
            225:    [0xFAA964, "Warm_Yellowish_Orange"],
            226:    [0xFFEC6C, "Bright_Light_Yellow"],
            232:    [0x77C9D8, "Sky_Blue"],
            272:    [0x19325A, "Dark_Blue"],
            288:    [0x00451A, "Dark_Green"],
            295:    [0xFF94C2, "Flamingo_Pink"],
            308:    [0x352100, "Dark_Brown"],
            313:    [0xABD9FF, "Maersk_Blue"],
            320:    [0x720012, "Dark_Red"],
            321:    [0x469BC3, "Dark_Azure"],
            322:    [0x68C3E2, "Medium_Azure"],
            323:    [0xD3F2EA, "Light_Aqua"],
            326:    [0xE2F99A, "Yellowish_Green"],
            330:    [0x77774E, "Olive_Green"],
            335:    [0x88605E, "Sand_Red"],
            351:    [0xF785B1, "Medium_Dark_Pink"],
            353:    [0xFF6D77, "Coral"],
            366:    [0xD86D2C, "Earth_Orange"],
            368:    [0xEDFF21, "Neon_Yellow"],
            370:    [0x755945, "Medium_Brown"],
            371:    [0xCCA373, "Medium_Tan"],
            373:    [0x75657D, "Sand_Purple"],
            378:    [0x708E7C, "Sand_Green"],
            379:    [0x70819A, "Sand_Blue"],
            402:    [0xCA4C0B, "Reddish_Orange"],
            422:    [0x915C3C, "Sienna_Brown"],
            423:    [0x543F33, "Umber_Brown"],
            424:    [0xDD9E47, "Ochre_Yellow"],
            450:    [0xD27744, "Fabuland_Brown"],
            462:    [0xF58624, "Medium_Orange"],
            484:    [0x91501C, "Dark_Orange"],
            503:    [0xBCB4A5, "Very_Light_Grey"],
            507:    [0xFA9C1C, "Light_Orange_Brown"],
            508:    [0xC65127, "Fabuland_Red"],
            509:    [0xCF8A47, "Fabuland_Orange"],
            510:    [0x78FC78, "Fabuland_Lime"],
            10015:  [0xFFF230, "Lemon"],
            10017:  [0xFF9494, "Rose_Pink"],
            10022:  [0xD05098, "Yellowish_Dark_Pink"],
        }

        for (const [ldrawCode, values] of Object.entries(colors)) {
            this[ldrawCode] = new LDrawColors(Number(ldrawCode), ...values);
            this[this[ldrawCode].colorName] = this[ldrawCode];
        }
    }

    constructor(colorCode, colorInt, colorName) {
        super(colorCode, colorInt, colorName);
    }
};

export class NESColor extends BaseColor {
    static {
        const colors = {
            0x00: [0x747474, "deep_gray",       8, []],
            0x01: [0x24188C, "dark_blue",     272, [23, 85]],
            0x02: [0x0000A8, "navy",           23, []],
            0x03: [0x44009C, "indigo",         85, []],
            0x04: [0x8C0074, "plum",           26, []],
            0x05: [0xA80010, "brick_red",       4, []],
            0x06: [0xA40000, "maroon",          4, []],
            0x07: [0x7C0800, "dark_red",      320, []],
            0x08: [0x402C00, "dark_brown",      6, [308]],
            0x09: [0x004400, "dark_moss",     288, []],
            0x0A: [0x005000, "dark_green",    288, []],
            0x0B: [0x003C14, "evergreen",     288, []],
            0x0C: [0x183C5C, "dark_slate",    272, []],
            0x0D: [0x000000, "black_0d",        0, []],
            0x0E: [0x000000, "black_0e",        0, []],
            0x0F: [0x000000, "black_0f",        0, []],

            0x10: [0xBCBCBC, "light_gray",    503, []],
            0x11: [0x0070EC, "azure",         213, [1, 321]],
            0x12: [0x2038EC, "blue",            1, [110]],
            0x13: [0x8000F0, "violet",         22, [69]],
            0x14: [0xBC00BC, "purple",         69, [5]],
            0x15: [0xE40058, "magenta",       353, []],
            0x16: [0xD82800, "red",           123, [4]],
            0x17: [0xC84C0C, "brown",         402, []],
            0x18: [0x887000, "olive",         330, []],
            0x19: [0x009400, "leaf_green",      2, []],
            0x1A: [0x00A800, "green",          10, []],
            0x1B: [0x009038, "forest_green",    2, []],
            0x1C: [0x008088, "teal",            3, []],
            0x1D: [0x000000, "black_1d",        0, []],
            0x1E: [0x000000, "black_1e",        0, []],
            0x1F: [0x000000, "black_1f",        0, []],

            0x20: [0xFCFCFC, "white_20",       15, []],
            0x21: [0x3CBCFC, "sky_blue",      322, []],
            0x22: [0x5C94FC, "steel_blue",     73, []],
            0x23: [0xCC88FC, "lavender",       30, []],
            0x24: [0xF478FC, "fuchsia",     10022, [5, 29, 31, 10017]],
            0x25: [0xFC74B4, "hot_pink",      351, [295]],
            0x26: [0xFC7460, "salmon",         12, []],
            0x27: [0xFC9838, "orange",        121, []],
            0x28: [0xF0BC3C, "gold",           14, []],
            0x29: [0x80D010, "chartreuse",     27, []],
            0x2A: [0x4CDC48, "lime",          510, [74, 10, 27, 115]],
            0x2B: [0x58F898, "seafoam",       510, []],
            0x2C: [0x00E8D8, "cyan",           11, []],
            0x2D: [0x787878, "dark_gray",      72, []],
            0x2E: [0x000000, "black_2e",        0, []],
            0x2F: [0x000000, "black_2f",        0, []],

            0x30: [0xFCFCFC, "white_30",       15, []],
            0x31: [0xA8E4FC, "pale_blue",       9, []],
            0x32: [0xC4D4FC, "periwinkle",     20, []],
            0x33: [0xD4C8FC, "lilac",          31, [220, 20]],
            0x34: [0xFCC4FC, "pale_pink",      13, [31, 295, 10017]],
            0x35: [0xFCC4D8, "pink",           77, [13, 295, 100]],
            0x36: [0xFCBCB0, "bubblegum",     100, []],
            0x37: [0xFCD8A8, "peach",          78, [68]],
            0x38: [0xFCE4A0, "tan",            18, []],
            0x39: [0xE0FCA0, "lemon_lime",    326, []],
            0x3A: [0xA8F0BC, "pale_green",     17, []],
            0x3B: [0xB0FCCC, "pale_mint",      17, []],
            0x3C: [0x9CFCF0, "pale_cyan",     118, []],
            0x3D: [0xC4C4C4, "pale_gray",     151, []],
            0x3E: [0x000000, "black_3e",        0, []],
            0x3F: [0x000000, "black_3f",        0, []],
        };

        for (const [nesCode, values] of Object.entries(colors)) {
            this[nesCode] = new NESColor(Number(nesCode), ...values);
            this[this[nesCode].colorName] = this[nesCode];
        }

        this["black"] = this[0x0D];
        this["white"] = this[0x20];
    }

    static primary      = "primary";
    static secondary    = "secondary";
    static background   = "background";

    constructor(nesCode, nesInt, nesName, ldrawCode, ldrawAlternativeCodes) {
        super(nesCode, nesInt, nesName);
        this.ldrawCode = ldrawCode;
        this.ldrawAlternativeCodes = ldrawAlternativeCodes;

        this.palettes = {
            nes: nesInt,
            ldraw: LDrawColors[ldrawCode].colorInt,
        };
    }
}
