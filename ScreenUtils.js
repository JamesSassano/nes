/** Sizes of world items. */
export class WorldSize {
    constructor(gridColumnCount, gridRowCount, screenColumnCount, screenRowCount, gapSize) {
        // Align grids to nearest multiple of 2.
        const gridMax = gridCount => gridCount % 2 === 0 ? gridCount : gridCount + 1;
        this.gridColumnCount = gridMax(gridColumnCount);
        this.gridRowCount = gridMax(gridRowCount);
        this.screenColumnCount = screenColumnCount;
        this.screenRowCount = screenRowCount;
        this.gapSize = gapSize;
        this.pieceWidth = 20;
        this.plateHeight = 8;
        Object.freeze(this);
    }
}

/** Builds and compares a screen locations. */
export class ScreenLocation {
    constructor(gridX, gridY) {
        this.gridX = gridX;
        this.gridY = gridY;
        Object.freeze(this);
    }

    getName() {
        return String.fromCharCode(this.gridX + 65) + (this.gridY + 1);
    }

    compare(other) {
        return this.gridX - other.gridX || this.gridY - other.gridY;
    }

    static fromName(name) {
        const gridX = name.charCodeAt(0) - 65;
        const gridY = parseInt(name.substring(1)) - 1;
        return new ScreenLocation(gridX, gridY);
    }

    static compareNames(a, b) {
        return ScreenLocation.fromName(a).compare(ScreenLocation.fromName(b));
    }
}

/** Provides world piece positions relative to a screen. */
export class ScreenPositioner {

    constructor(worldSize, screenLocation) {
        const getTopLeft = (gridIndex, gridCount, screenPieceCount) => {
            // Number of screens offset from the center.
            const screenCenterOffset = gridIndex - (gridCount / 2);

            // Number of pieces from center for this direction + centered on each piece.
            const piecesFromCenter = screenCenterOffset * screenPieceCount * worldSize.pieceWidth
                + worldSize.pieceWidth / 2

            // Number of gaps from center + centered on the middle gap.
            const gapsFromCenter = screenCenterOffset * worldSize.gapSize + worldSize.gapSize / 2;

            return piecesFromCenter + gapsFromCenter;
        };

        this.worldSize = worldSize;
        this.screenLocation = screenLocation;
        this.topLeftPieceCenterX = getTopLeft(screenLocation.gridX, worldSize.gridColumnCount, worldSize.screenColumnCount);
        this.topLeftPieceCenterZ = getTopLeft(screenLocation.gridY, worldSize.gridRowCount,    worldSize.screenRowCount);
        Object.freeze(this);
    }

    getX(screenPosition) {
        return this.topLeftPieceCenterX + screenPosition * this.worldSize.pieceWidth;
    }

    getZ(screenPosition) {
        return this.topLeftPieceCenterZ + screenPosition * this.worldSize.pieceWidth;
    }

    getY(plateLevel) {
        return plateLevel * this.worldSize.plateHeight;
    }
}

/** Absolute target and relative origin positions defined in screen positions. */
export class ScreenVector {
    constructor(screenName, target, origin, halfGaps = [0, 0]) {
        this.screenName = screenName;
        this.target = target;
        this.origin = origin;
        this.halfGaps = halfGaps;
        Object.freeze(this);
    }

    toWorldVector(worldSize) {
        const screenLocation = ScreenLocation.fromName(this.screenName);
        const screenPositioner = new ScreenPositioner(worldSize, screenLocation);
        const gapX = this.halfGaps[0] * worldSize.gapSize * .5;
        const gapZ = this.halfGaps[1] * worldSize.gapSize * .5;
        // Prevents horizontal line skipping at large distances when looking straight on.
        const nudge = (distance, axisOffset) => axisOffset || (distance * -0.001);
        return Object.freeze({
            target: Object.freeze({
                x: screenPositioner.getX(this.target[0]) + gapX,
                y: screenPositioner.getY(this.target[1]),
                z: screenPositioner.getZ(this.target[2]) + gapZ,
            }),
            origin: Object.freeze({
                x: screenPositioner.getX(this.target[0] + nudge(this.origin[2], this.origin[0])) + gapX,
                y: screenPositioner.getY(this.target[1] + this.origin[1]),
                z: screenPositioner.getZ(this.target[2] + nudge(this.origin[0], this.origin[2])) + gapZ,
            }),
        });
    }
}
