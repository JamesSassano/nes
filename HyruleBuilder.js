"use strict";

import {Tile} from "./HyrulePieces.js";
import {WorldSize, ScreenLocation, ScreenPositioner} from "./ScreenUtils.js";

const mapDataProviders = {
    overworld:  async () => (await import('./HyruleOverworld.js')).mapData,
    caves:      async () => (await import('./HyruleCaves.js')).getMapData(),
    dungeons:   async () => (await import('./HyruleDungeons.js')).getMapData(),
    samples:    async () => (await import('./HyruleSamples.js')).getMapData(),
    mini:       async () => (await import('./HyruleSamples.js')).getMiniMapData(),
    rotations:  async () => (await import('./HyruleSamples.js')).getRotationMapData(),
}

export function getMapNames() {
    return Object.keys(mapDataProviders);
}

/** Information to save about a piece instance. */
class PieceInstanceInfo {
    constructor(color, opacity, screenLocation, screenX, screenY, plateLevel, piece) {
        this.color = color;
        this.opacity = opacity;
        this.screenLocation = screenLocation;
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
        return `${this.screenLocation.getName()}_${screenX},${screenY},${plateLevel}_${this.piece.partNumber}_${this.piece.name}`;
    }

    compare(other) {
        return this.screenLocation.compare(other.screenLocation)
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

/**
  * For the map data of a given map name:
  * - Collect all pieces by part number and opacity to a list of all piece configurations.
  * - Build the positions for the points of interest.
  */
export async function getMapData(mapName, gapSize, showSprites, showElevation) {

    function degreesToRadians(degrees) {
        return degrees / 180 * Math.PI;
    }

    function addScreen(pieces, screenPositioner, paletteData, screenTileDataGrid) {

        // Most screens use one tile palette.  Some use a two tile border for one, and the inner tiles for another.
        const palettes = [paletteData[0], paletteData[1] ?? paletteData[0]];
        for (const [screenY, screenRowTileData] of screenTileDataGrid.entries()) {
            for (const [screenX, screenTileData] of screenRowTileData.entries()) {
                if (screenTileData) {
                    const palette = screenX > 1 && screenX < (screenPositioner.worldSize.screenColumnCount - 2)
                                 && screenY > 1 && screenY < (screenPositioner.worldSize.screenRowCount - 2)
                        ? palettes[1] : palettes[0];
                    const elevation = showElevation ? screenTileData[0] : 0;
                    const piecesByLevel = new Tile(screenTileData[1], showSprites ? screenTileData[2] : null)
                        .getPieceLevelEntries(elevation);
                    for (const [plateLevel, tilePiece] of piecesByLevel) {
                        const partNumber = tilePiece.piece.partNumber;
                        const opacity = tilePiece.options.opacity;

                        pieces[partNumber] ??= {};
                        pieces[partNumber][opacity] ??= [];
                        pieces[partNumber][opacity].push(new PieceConfiguration(
                            screenPositioner.getX(screenX    + tilePiece.options.translateX),
                            screenPositioner.getY(plateLevel + tilePiece.options.translateY),
                            screenPositioner.getZ(screenY    + tilePiece.options.translateZ),
                            degreesToRadians(tilePiece.options.rotateX + 180),
                            degreesToRadians(tilePiece.options.rotateY + tilePiece.piece.ldrawRotation),
                            degreesToRadians(tilePiece.options.rotateZ),
                            new PieceInstanceInfo(
                                palette.getColor(tilePiece.color),
                                opacity,
                                screenPositioner.screenLocation,
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

    const mapData = await mapDataProviders[mapName]();

    // Build the world sizes from the map data.

    const worldSize = (() => {
        const gridColumnCount = Math.max(...mapData.mapRowData.map(row => row.length));
        const gridRowCount = mapData.mapRowData.length;
        const screenColumnCount = 16;
        const screenRowCount = 11;
        return new WorldSize(gridColumnCount, gridRowCount, screenColumnCount, screenRowCount, gapSize);
    })();

    // Build the pieces from the map data.

    const pieces = Object.freeze(
        mapData.mapRowData.reduce((piecesAccumulator, mapColumnData, gridY) => {
            mapColumnData?.forEach((screenData, gridX) => {
                if (screenData) {
                    addScreen(piecesAccumulator, new ScreenPositioner(worldSize, new ScreenLocation(gridX, gridY)), ...screenData);
                }
            });
            return piecesAccumulator;
        }, {})
    );
    Object.values(pieces).forEach(opacity => {
        Object.values(opacity).forEach(piecesByOpacity => Object.freeze(piecesByOpacity));
        Object.freeze(opacity);
    });

    // Collect points of interest from the map data.

    const pointsOfInterest = Object.freeze(
        Object.fromEntries(
            Object.entries(mapData.pointsOfInterest).map(
                ([poiName, screenVector]) => [poiName, screenVector.toWorldVector(worldSize)]
            )
        )
    );

    return Object.freeze({
        pieces,
        pointsOfInterest,
        home: mapData.home.toWorldVector(worldSize),
    });
}
