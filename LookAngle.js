const toRadians = Math.PI / 180;
const toDegrees = 180 / Math.PI;

export class LookAngle {
    constructor(camera, controls) {
        this.anchor = "camera";
        this.polarAngle = null;
        this.azimuthAngle = null;
        this.distance = null;
        this.camera = camera;
        this.controls = controls;
        this.updateLookAngle();
    }

    /**
     * Update the look angle fields when a camera or control position field is changed.
     */
    updateLookAngle = () => {
        const [anchor, look] = this.anchor === "camera"
            ? [this.camera.position, this.controls.target]
            : [this.controls.target, this.camera.position];

        const deltaX = look.x - anchor.x;
        const deltaY = look.y - anchor.y;
        const deltaZ = look.z - anchor.z;

        this.polarAngle = Math.acos(Math.max(-1, Math.min(1, deltaY / (this.distance || 1)))) * toDegrees;
        this.azimuthAngle = Math.atan2(deltaX, deltaZ) * toDegrees;
        this.distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    };

    /**
     * Update camera or controls when a look angle field is changed.
     */
    updateCamera = () => {
        const [anchor, look] = this.anchor === "camera"
            ? [this.camera.position, this.controls.target]
            : [this.controls.target, this.camera.position];

        const polarAngle = this.polarAngle * toRadians;
        const azimuthAngle = this.azimuthAngle * toRadians;

        look.set(
            anchor.x + this.distance * Math.sin(polarAngle) * Math.sin(azimuthAngle),
            anchor.y + this.distance * Math.cos(polarAngle),
            anchor.z + this.distance * Math.sin(polarAngle) * Math.cos(azimuthAngle),
        );
    };
}
