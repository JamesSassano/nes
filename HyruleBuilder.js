"use strict";

import {Tile} from "./HyrulePieces.js";
import * as HyruleOverworld from "./HyruleOverworld.js";
import * as HyruleCaves from "./HyruleCaves.js";
import * as HyruleUnderworld from "./HyruleUnderworld.js";

/** Collect all pieces by part number and opacity to a list of all piece configurations. */
export function getPieces(mapName, gapSize, showSprites, showElevation) {

    const screenColumnCount = 16;
    const screenRowCount = 11;
    const legoWidth = 20;
    const legoPlateHeight = 8;

    const pieces = {};

    function toPosition(position, translate, worldSize, screenSize) {
        position -= worldSize / 2;
        return (position + (translate ?? 0)) * legoWidth + (legoWidth / 2) + (Math.floor(position / screenSize) + .5) * gapSize;
    }

    function degreesToRadians(degrees) {
        return degrees / 180 * Math.PI;
    }

    function addScreen(gridColumnCount, gridRowCount, gridX, gridY, paletteData, screenTileDataGrid) {
        const mapColumnCount = gridColumnCount * screenColumnCount;
        const mapRowCount = gridRowCount * screenRowCount;

        // Most screens use one tile palette.  Some use a two tile border for one, and the inner tiles for another.
        const palettes = [paletteData[0], paletteData[1] ?? paletteData[0]];
        const screenName = String.fromCharCode(gridX + 65) + (gridY + 1);
        for (const [screenY, screenRowTileData] of screenTileDataGrid.entries()) {
            const screenYPosition = `${(screenY + 1).toString().padStart(2, "0")}`;
            for (const [screenX, screenTileData] of screenRowTileData.entries()) {
                const screenXPosition = `${(screenX + 1).toString().padStart(2, "0")}`;
                if (screenTileData) {
                    const palette = screenX > 1 && screenX < (screenColumnCount - 2)
                                && screenY > 1 && screenY < (screenRowCount - 2) ? palettes[1] : palettes[0];
                    const mapX = gridX * screenColumnCount + screenX;
                    const mapY = gridY * screenRowCount + screenY;
                    const elevation = showElevation ? screenTileData[0] : 0;
                    const piecesByLevel = new Tile(screenTileData[1], showSprites ? screenTileData[2] : null)
                        .getPieceLevelEntries(elevation, legoWidth, legoPlateHeight);
                    for (const [plateLevel, tilePiece] of piecesByLevel) {
                        const partNumber = tilePiece.piece.partNumber;
                        const opacity = tilePiece.options.opacity ?? 1;
                        const pieceName = [
                            `${screenName}`,
                            `${screenXPosition},${screenYPosition},${plateLevel.toString().padStart(2, "0")}`,
                            `${tilePiece.piece.partNumber}_${tilePiece.piece.name}`
                        ].join("_").replaceAll(" ", "_");

                        pieces[partNumber] ??= {};
                        pieces[partNumber][opacity] ??= [];
                        pieces[partNumber][opacity].push({
                            positionX: toPosition(mapX, tilePiece.options.translateX, mapColumnCount, screenColumnCount),
                            positionY: legoPlateHeight * (plateLevel + (tilePiece.options.translateZ ?? 0)),
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

    const mapDataProviders = {
        overworld:  () => HyruleOverworld.mapRowData,
        caves:      () => HyruleCaves.getMapRowData(),
        underworld: () => HyruleUnderworld.getMapRowData(),
        samples:    () => HyruleOverworld.getSamples(),
    }

    const mapData = mapDataProviders[mapName]();
    const gridColumnCount = mapData[0].length;
    const gridRowCount = mapData.length;
    for (const [gridY, mapColumnData] of mapData.entries()) {
        for (const [gridX, screenData] of mapColumnData.entries()) {
            addScreen(gridColumnCount, gridRowCount, gridX, gridY, ...screenData);
        }
    }

    return pieces;
}
