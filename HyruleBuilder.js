"use strict";

import {Tile} from "./HyrulePieces.js";

const mapDataProviders = {
    overworld:  async () => (await import('./HyruleOverworld.js')).mapRowData,
    caves:      async () => (await import('./HyruleCaves.js')).getMapRowData(),
    dungeons:   async () => (await import('./HyruleDungeons.js')).getMapRowData(),
    samples:    async () => (await import('./HyruleSamples.js')).getMapRowData(),
    mini:       async () => (await import('./HyruleSamples.js')).getMiniMapRowData(),
    rotations:  async () => (await import('./HyruleSamples.js')).getRotationMapRowData(),
}

export function getMapNames() {
    return Object.keys(mapDataProviders);
}

/** Information to save about a piece instance. */
class PieceInstanceInfo {
    constructor(color, opacity, screenName, screenX, screenY, plateLevel, piece) {
        this.color = color;
        this.opacity = opacity;
        this.screenName = screenName;
        this.screenX = screenX;
        this.screenY = screenY;
        this.plateLevel = plateLevel;
        this.piece = piece;
        Object.freeze(this);
    }

    static pad(value) {
        return value.toString().padStart(2, "0");
    }

    getPieceName() {
        const screenX = PieceInstanceInfo.pad(this.screenX + 1);
        const screenY = PieceInstanceInfo.pad(this.screenY + 1);
        const plateLevel = PieceInstanceInfo.pad(this.plateLevel);
        return `${this.screenName}_${screenX},${screenY},${plateLevel}_${this.piece.partNumber}_${this.piece.name}`;
    }

    compare(other) {
        return this.screenName.localeCompare(other.screenName)
            || this.screenX - other.screenX
            || this.screenY - other.screenY
            || this.plateLevel - other.plateLevel
            || this.piece.partNumber.localeCompare(other.piece.partNumber)
            || this.piece.name.localeCompare(other.piece.name);
    }
}

class PieceConfiguration {
    constructor(positionX, positionY, positionZ, rotationX, rotationY, rotationZ, info) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
        this.info = info;
        Object.freeze(this);
    }
}

/** Collect all pieces by part number and opacity to a list of all piece configurations. */
export async function getPieces(mapName, gapSize, showSprites, showElevation) {

    const screenColumnCount = 16;
    const screenRowCount = 11;
    const pieceWidth = 20;
    const plateHeight = 8;

    const pieces = {};

    function toPosition(position, translate, worldSize, screenSize) {
        position -= worldSize / 2;
        return (position + translate) * pieceWidth + (pieceWidth / 2) + (Math.floor(position / screenSize) + .5) * gapSize;
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
            for (const [screenX, screenTileData] of screenRowTileData.entries()) {
                if (screenTileData) {
                    const palette = screenX > 1 && screenX < (screenColumnCount - 2)
                                && screenY > 1 && screenY < (screenRowCount - 2) ? palettes[1] : palettes[0];
                    const mapX = gridX * screenColumnCount + screenX;
                    const mapY = gridY * screenRowCount + screenY;
                    const elevation = showElevation ? screenTileData[0] : 0;
                    const piecesByLevel = new Tile(screenTileData[1], showSprites ? screenTileData[2] : null)
                        .getPieceLevelEntries(elevation);
                    for (const [plateLevel, tilePiece] of piecesByLevel) {
                        const partNumber = tilePiece.piece.partNumber;
                        const opacity = tilePiece.options.opacity;

                        pieces[partNumber] ??= {};
                        pieces[partNumber][opacity] ??= [];
                        pieces[partNumber][opacity].push(new PieceConfiguration(
                            toPosition(mapX, tilePiece.options.translateX, mapColumnCount, screenColumnCount),
                            plateHeight * (plateLevel + (tilePiece.options.translateY)),
                            toPosition(mapY, tilePiece.options.translateZ, mapRowCount, screenRowCount),
                            degreesToRadians(tilePiece.options.rotateX + 180),
                            degreesToRadians(tilePiece.options.rotateY + tilePiece.piece.ldrawRotation),
                            degreesToRadians(tilePiece.options.rotateZ),
                            new PieceInstanceInfo(
                                palette.getColor(tilePiece.color),
                                opacity,
                                screenName,
                                screenX,
                                screenY,
                                plateLevel,
                                tilePiece.piece,
                            )
                        ));
                    }
                }
            }
        }
    }

    // Add map pieces.

    const mapData = await mapDataProviders[mapName]();
    const nearestMultipleOf2 = (value) => value % 2 === 0 ? value : value + 1;
    const gridColumnCount = nearestMultipleOf2(Math.max(...mapData.map(row => row.length)));
    const gridRowCount = nearestMultipleOf2(mapData.length);
    for (const [gridY, mapColumnData] of mapData.entries()) {
        if (mapColumnData) {
            for (const [gridX, screenData] of mapColumnData.entries()) {
                if (screenData) {
                    addScreen(gridColumnCount, gridRowCount, gridX, gridY, ...screenData);
                }
            }
        }
    }

    return pieces;
}
