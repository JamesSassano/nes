"use strict";

import {Palette, Tile} from "./HyrulePieces.js";
import * as HyruleOverworld from "./HyruleOverworld.js";

/** Collect all pieces by part number and opacity to a list of all piece configurations. */
export function getPieces(showElevation, showSamples, gapSize) {

    const mapColumnCount = 256;
    const mapRowCount = 88;
    const screenColumnCount = 16;
    const screenRowCount = 11;
    const legoWidth = 20;
    const legoPlateHeight = 8;

    const pieces = {};

    function toPosition(position, translate, worldSize, screenSize) {
        position = position + (translate ?? 0) - worldSize / 2;
        return position * legoWidth + (legoWidth / 2) + (Math.floor(position / screenSize) + .5) * gapSize;
    }

    function degreesToRadians(degrees) {
        return degrees / 180 * Math.PI;
    }

    function addScreen(paletteData, screenTileDataGrid, gridX, gridY) {
        // Most screens use one tile palette.  Some use a two tile border for one, and the inner tiles for another.
        const palettes = [paletteData[0], paletteData[1] ?? paletteData[0]];
        const screenName = String.fromCharCode(gridX + 65) + (gridY + 1);
        for (const [screenY, screenRowTileData] of screenTileDataGrid.entries()) {
            for (const [screenX, screenTileData] of screenRowTileData.entries()) {
                if (screenTileData) {
                    const palette = screenX > 1 && screenX < (screenColumnCount - 2)
                                && screenY > 1 && screenY < (screenRowCount - 2) ? palettes[1] : palettes[0];
                    const mapX = gridX * screenColumnCount + screenX;
                    const mapY = gridY * screenRowCount + screenY;
                    const elevation = showElevation ? screenTileData[0] : 0;
                    const piecesByLevel = new Tile(screenTileData[1], screenTileData[2])
                        .getPieceLevelEntries(elevation, legoWidth, legoPlateHeight);
                    for (const [plateLevel, tilePiece] of piecesByLevel) {
                        const partNumber = tilePiece.piece.partNumber;
                        const opacity = tilePiece.options.opacity ?? 1;
                        const pieceName = [
                            `${screenName}`,
                            [
                                `${(screenX + 1).toString().padStart(2, "0")}`,
                                `${(screenY + 1).toString().padStart(2, "0")}`,
                                `${plateLevel.toString().padStart(2, "0")}`,
                            ].join(","),
                            `${tilePiece.piece.partNumber}_${tilePiece.piece.name}`
                        ].join("_").replaceAll(" ", "_");

                        pieces[partNumber] ??= {};
                        pieces[partNumber][opacity] ??= [];
                        pieces[partNumber][opacity].push({
                            positionX: toPosition(mapX, tilePiece.options.translateX, mapColumnCount, screenColumnCount),
                            positionY: legoPlateHeight * plateLevel,
                            positionZ: toPosition(mapY, tilePiece.options.translateY, mapRowCount, screenRowCount),
                            rotationX: degreesToRadians((tilePiece.options.rotateX ?? 0) + 180),
                            rotationY: degreesToRadians(tilePiece.options.rotateY ?? 0),
                            rotationZ: degreesToRadians(tilePiece.options.rotateZ ?? 0),
                            scaleX: tilePiece.options.scaleX ?? 1,
                            scaleY: tilePiece.options.scaleY ?? 1,
                            scaleZ: tilePiece.options.scaleZ ?? 1,
                            color: palette.getColor(tilePiece.color),
                            opacity: opacity,
                            screenName: screenName,
                            pieceName: pieceName,
                        });
                    }
                }
            }
        }
    }

    // Add map pieces.

    for (const [gridY, mapColumnData] of HyruleOverworld.mapRowData.entries()) {
        for (const [gridX, screenData] of mapColumnData.entries()) {
            addScreen(screenData[0], screenData[1], gridX, gridY);
        }
    }

    if (showSamples) {

        // Add sample pieces for each palette.
        const sampleGridX = 6;
        const sampleGridY = 9;

        const samplesDataGrid = Array.from({
            0: [
                null, Tile.rock_nw, Tile.rock_n, Tile.rock_ne, null, Tile.tree_nw, Tile.tree_n, Tile.tree_ne, null,
                Tile.dungeon_nw, Tile.dungeon_n1, Tile.dungeon_n2, Tile.dungeon_ne,
            ],
            1: [
                null, Tile.rock_sw, Tile.rock_s, Tile.rock_se, null, Tile.tree_sw, Tile.entrance_w, Tile.tree_se, null,
                Tile.dungeon_sw, Tile.entrance_w, Tile.entrance_e, Tile.dungeon_se,
            ],
            5: [
                Tile.water_nw, Tile.ground_water_nw, Tile.ground_water_ne, Tile.waterfall1, Tile.bridge_heart, Tile.water_ne,
            ],
            6: [
                Tile.water_sw, Tile.ground_water_sw, Tile.ground_water_se, Tile.water_c, Tile.bridge, Tile.water_se,
                null,
                Tile.bush, Tile.ground, Tile.ground_sand, Tile.rock_boulder, Tile.steps, Tile.tomb, Tile.armos_statue,
            ],
            // Alternate dungeon enterances.
            14: Object.keys(Tile.dungeon_tops).map(dungeonTopName => Tile.makeDungeon(dungeonTopName)),
            length: 15
        }, (value) => (value ?? []).map(tile => tile ? [0, tile] : tile));

        for (const [paletteIndex, palette] of [
            Palette.forest,
            Palette.mountain,
            Palette.graveyard,
        ].entries()) {
            addScreen([palette], samplesDataGrid, sampleGridX + paletteIndex, sampleGridY);
        }

        // Add sample enemies/sprites.

        const spriteSampleGrid = [];
        for (let x = 0; x < 15; x++) {
            for (let y = 0; y < 11; y++) {
                const base = (x >= 6 && x <=  9 && y >= 6)
                    ? Tile.water_c
                    :        (x >= 9 && x <= 11 && y <= 5)
                        ? Tile.ground_sand
                        : Tile.ground;
                spriteSampleGrid[y] ??= [];
                spriteSampleGrid[y][x] = [0, base];
            }
        }
        spriteSampleGrid[ 0][ 9][2] = Tile.leever_blue_slim;
        spriteSampleGrid[ 0][11][2] = Tile.leever_blue;
        spriteSampleGrid[ 1][ 1][2] = Tile.octorok_blue_e;
        spriteSampleGrid[ 1][ 4][2] = Tile.tektite_blue;
        spriteSampleGrid[ 1][ 7][2] = Tile.moblin_blue;
        spriteSampleGrid[ 1][10][2] = Tile.leever_blue_sunk1;
        spriteSampleGrid[ 1][13][2] = Tile.lynel_blue;
        spriteSampleGrid[ 2][ 9][2] = Tile.leever_blue_sunk2;
        spriteSampleGrid[ 3][11][2] = Tile.leever_red;
        spriteSampleGrid[ 4][ 1][2] = Tile.octorok_red_e;
        spriteSampleGrid[ 4][ 4][2] = Tile.tektite_red;
        spriteSampleGrid[ 4][ 7][2] = Tile.moblin_red;
        spriteSampleGrid[ 4][10][2] = Tile.leever_red_sunk1;
        spriteSampleGrid[ 4][13][2] = Tile.lynel_red;
        spriteSampleGrid[ 5][ 9][2] = Tile.leever_red_sunk2;
        spriteSampleGrid[ 5][11][2] = Tile.leever_red_slim;
        spriteSampleGrid[ 7][ 1][2] = Tile.armos_red_awake;
        spriteSampleGrid[ 7][ 4][2] = Tile.ghini;
        spriteSampleGrid[ 7][ 7][2] = Tile.zora;
        spriteSampleGrid[ 7][10][2] = Tile.peahat;
        spriteSampleGrid[ 7][13][2] = Tile.rock;
        spriteSampleGrid[ 9][ 6][2] = Tile.fairy;
        spriteSampleGrid[ 9][ 9][2] = Tile.peahat_water;
        spriteSampleGrid[ 9][11][2] = Tile.peahat_slim;
        spriteSampleGrid[10][ 4][2] = Tile.link;

        addScreen([Palette.mountain], spriteSampleGrid, sampleGridX + 3, sampleGridY);

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

        addScreen([Palette.mountain], mini, 10, 9);
    }

    return pieces;
}
