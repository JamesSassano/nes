"use strict";

import * as THREE from "three";
import { LDrawLoader } from "three/addons/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/addons/materials/LDrawConditionalLineMaterial.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import {ScreenLocation} from "./ScreenUtils.js";

const objComment = [
    "# Design Interpretation & Tile Mapping (c) 2026 James Sassano.",
    "# Licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).",
    "# Attribution: Derived from The LDraw Parts Library data licensed under CC BY 2.0.",
    "#",
].join("\n");

const ldrHeader = (fileBaseName) => [
    [
        `0 ${fileBaseName}`,
        "Design Interpretation & Tile Mapping (c) 2026 James Sassano",
        "Licensed under CC BY-NC 4.0 International",
    ].join(" - "),
    `0 Name: ${fileBaseName}.ldr`,
    "0 Author: James Sassano",
].join("\n");

/** Details about a piece that have been added to an InstancedMesh. */
class PieceInstance {
    constructor(pieceConfiguration, pieceInstancedMesh, pieceInstancedMeshIndex) {
        this.info = pieceConfiguration.info;
        this.pieceInstancedMesh = pieceInstancedMesh;
        this.pieceInstancedMeshIndex = pieceInstancedMeshIndex;
        Object.freeze(this);
    }

    static compare(a, b) {
        return a.info.compare(b.info);
    }
}

/** Converts a float to string with 6 decimal points, and no negative zeros.  */
const toFixed6 = value => (value < 0 && value > -0.0000005 ? 0 : value).toFixed(6);

/** Pairs PieceConfigurations to their resolved InstancedMesh/index. */
export class PieceInstances {

    constructor() {
        this.piecesByScreen = {};
    }

    getScreenNames(filter) {
        return Object.keys(this.piecesByScreen)
            .filter(screenName => (!filter) || filter.includes(screenName))
            .sort(ScreenLocation.compareNames);
    }

    add(pieceConfiguration, pieceInstancedMesh, pieceInstancedMeshIndex) {
        const screenName = pieceConfiguration.info.screenLocation.getName();
        this.piecesByScreen[screenName] ??= [];
        this.piecesByScreen[screenName].push(
            new PieceInstance(pieceConfiguration, pieceInstancedMesh, pieceInstancedMeshIndex)
        );
    }

    changePalette(palette) {
        const colors = {};
        Object.keys(this.piecesByScreen).forEach(screenName => {
            this.piecesByScreen[screenName].forEach(pieceInstance => {
                const paletteColor = pieceInstance.info.color.getPaletteColor(palette).colorInt;
                const color = colors[paletteColor] ??= new THREE.Color(paletteColor);
                pieceInstance.pieceInstancedMesh.setColorAt(pieceInstance.pieceInstancedMeshIndex, color);
                pieceInstance.pieceInstancedMesh.instanceColor.needsUpdate = true;
            });
        });
    }

    async getObjData(fileBaseName, yUp, onProgress) {
        const mtllib = {};

        const encoder = new TextEncoder();
        const compressionStream = new CompressionStream("gzip");
        const writer = compressionStream.writable.getWriter();
        const outputPromise = new Response(compressionStream.readable).arrayBuffer();

        const createTarHeader = (filename, length) => {
            const header = new Uint8Array(512);
            encoder.encodeInto(filename.substring(0, 99), header.subarray(0, 100));
            header.set(encoder.encode("0000644\0"), 100);
            header.set(encoder.encode(length.toString(8).padStart(11, "0") + " "), 124);
            header.set(encoder.encode(Math.floor(Date.now() / 1000).toString(8).padStart(11, "0") + " "), 136);
            header.fill(32, 148, 156);
            header[156] = 48;
            header.set(encoder.encode("ustar\0"), 257);
            header.set(encoder.encode("00"), 263);

            let checksum = header.reduce((a, b) => a + b, 0);
            header.set(encoder.encode(checksum.toString(8).padStart(6, "0") + "\0 "), 148);
            return header;
        };

        const addFile = async (filename, content) => {
            const data = encoder.encode(content);
            await writer.write(createTarHeader(filename, data.length));
            await writer.write(data);
            const padding = (512 - (data.length % 512)) % 512;
            if (padding > 0) await writer.write(new Uint8Array(padding));
        };

        const screenNames = this.getScreenNames(
            //["H3", "H4"]
        );
        for (const screenName of screenNames) {
            await onProgress(screenName);

            const pieceInstances = this.piecesByScreen[screenName].sort(PieceInstance.compare);

            const objContent = PieceInstances.createObjContent(fileBaseName, pieceInstances, mtllib, yUp);
            await addFile(`${fileBaseName}/${fileBaseName}.${screenName}.obj`, objContent);
        }

        await addFile(`${fileBaseName}/${fileBaseName}.mtl`, Object.values(mtllib).join(""));

        await writer.write(new Uint8Array(1024));
        await writer.close();

        return await outputPromise;
    }

    static createObjContent(fileBaseName, pieceInstances, mtllib, yUp) {
        const objOutput = [`${objComment}\nmtllib ${fileBaseName}.mtl\n`];
        const instanceMatrix4 = new THREE.Matrix4();
        const normalMatrix3 = new THREE.Matrix3();
        const vector3 = new THREE.Vector3();
        const color = new THREE.Color();

        let vIndexOffset = 1;
        let vnIndexOffset = 1;

        for (const pieceInstance of pieceInstances) {
            pieceInstance.pieceInstancedMesh.getColorAt(pieceInstance.pieceInstancedMeshIndex, color);
            pieceInstance.pieceInstancedMesh.getMatrixAt(pieceInstance.pieceInstancedMeshIndex, instanceMatrix4);
            normalMatrix3.getNormalMatrix(instanceMatrix4);

            const opacity = pieceInstance.info.opacity.toFixed(3);
            const materialName = `${color.getHexString()}-${opacity}`;
            const objColor = `${color.r.toFixed(3)} ${color.g.toFixed(3)} ${color.b.toFixed(3)}`;
            mtllib[materialName] ??= `newmtl ${materialName}
Kd ${objColor}
d ${opacity}
`;

            const vertices = pieceInstance.pieceInstancedMesh.geometry.getAttribute("position");
            const normals = pieceInstance.pieceInstancedMesh.geometry.getAttribute("normal");

            const vMap = new Map();
            const vnMap = new Map();
            const faces = [];
            let face = [];

            for (let i = 0; i < vertices.count; i++) {
                vector3.fromBufferAttribute(vertices, i).applyMatrix4(instanceMatrix4).multiplyScalar(0.4);
                const vLine = yUp
                    ? `v ${toFixed6(vector3.x)} ${toFixed6( vector3.y)} ${toFixed6(vector3.z)} ${objColor}\n`
                    : `v ${toFixed6(vector3.x)} ${toFixed6(-vector3.z)} ${toFixed6(vector3.y)} ${objColor}\n`;

                if (!vMap.has(vLine)) {
                    vMap.set(vLine, vMap.size);
                }
                const currentVIndex = vMap.get(vLine);

                vector3.fromBufferAttribute(normals, i).applyMatrix3(normalMatrix3).normalize();
                const vnLine = yUp
                    ? `vn ${toFixed6(vector3.x)} ${toFixed6( vector3.y)} ${toFixed6(vector3.z)}\n`
                    : `vn ${toFixed6(vector3.x)} ${toFixed6(-vector3.z)} ${toFixed6(vector3.y)}\n`;

                if (!vnMap.has(vnLine)) {
                    vnMap.set(vnLine, vnMap.size);
                }
                const currentVnIndex = vnMap.get(vnLine);

                face.push(`${currentVIndex + vIndexOffset}//${currentVnIndex + vnIndexOffset}`);
                if (face.length === 3) {
                    faces.push(`f ${face.join(" ")}\n`);
                    face = [];
                }
            }

            objOutput.push(
                `o ${pieceInstance.info.getPieceName()}\n`,
                [...vMap.keys()].join(""),
                [...vnMap.keys()].join(""),
                `usemtl ${materialName}\n`,
                faces.join("")
            );

            vIndexOffset += vMap.size;
            vnIndexOffset += vnMap.size;
        }

        return objOutput.join("");
    }

    async getLdrData(fileBaseName, palette, onProgress) {

        // Index and sign to convert Three.js matrix elements to an LDR coordinate system.
        const ldrMatrixMap = [
            [12,  1], [13, -1], [14, -1], // Translation: X, -Y, -Z
            [ 0,  1], [ 4,  1], [ 8,  1], // Rotation Row 1 (X-basis)
            [ 1, -1], [ 5, -1], [ 9, -1], // Rotation Row 2 (Y-basis negated)
            [ 2, -1], [ 6, -1], [10, -1], // Rotation Row 3 (Z-basis negated)
        ];

        const instanceMatrix4 = new THREE.Matrix4();
        const lines = [
            ldrHeader(fileBaseName)
        ];
        for (const screenName of this.getScreenNames(
            //["H4"]
            //["C13"]
        )) {
            await onProgress(screenName);

            const pieceInstances = this.piecesByScreen[screenName].sort(PieceInstance.compare);

            for (const pieceInstance of pieceInstances) {
                pieceInstance.pieceInstancedMesh.getMatrixAt(pieceInstance.pieceInstancedMeshIndex, instanceMatrix4);
                const paletteColor = pieceInstance.info.color.getPaletteColor(palette);
                const color = ['ldraw', 'studio'].includes(palette)
                    ? paletteColor.colorCode
                    : `0x2${paletteColor.colorInt.toString(16).padStart(6, '0').toUpperCase()}`;

                const matrix = instanceMatrix4.elements;
                if ('studio' === palette) {
                    const rotate = (pieceInstance.info.piece.studioRotation + pieceInstance.info.piece.ldrawRotation) % 360;
                    if (rotate > 0) {
                        const x0 = matrix[0], x1 = matrix[1], x2 = matrix[2];
                        const z0 = matrix[8], z1 = matrix[9], z2 = matrix[10];

                        if (rotate === 90) {
                            matrix[0] =  z0; matrix[1] =  z1; matrix[ 2] =  z2;
                            matrix[8] = -x0; matrix[9] = -x1; matrix[10] = -x2;
                        }
                        else if (rotate === 180) {
                            matrix[0] = -x0; matrix[1] = -x1; matrix[ 2] = -x2;
                            matrix[8] = -z0; matrix[9] = -z1; matrix[10] = -z2;
                        }
                        else if (rotate === 270) {
                            matrix[0] = -z0; matrix[1] = -z1; matrix[ 2] = -z2;
                            matrix[8] =  x0; matrix[9] =  x1; matrix[10] =  x2;
                        } else {
                            throw Error(`Unexpected rotation ${rotate}`);
                        }
                    }
                }

                const matrixValues = ldrMatrixMap.map(([index, sign]) => toFixed6(matrix[index] * sign)).join(" ");
                const partName = pieceInstance.info.piece.getLdrName(palette);
                lines.push(`1 ${color} ${matrixValues} ${partName}.dat`);
            }
        }
        lines.push("");
        return lines.join("\n");
    }
}

/**
 * Tracks when all pieces have been loaded with a simple set check that
 * peforms better than wraping many loads in individual Promises.
 */
class LoadTracker {
    constructor(pieces) {
        this.loadPendingPartNumbers = new Set(Object.keys(pieces));
        this.totalPieces = Object
            .values(pieces)
            .flatMap(piecesEntry => Object
                .values(piecesEntry)
                .map(pieceConfigurationsByOpacity => pieceConfigurationsByOpacity.length))
            .reduce((previous, current) => previous + current, 0);
        this.ready = new Promise((resolve) => {
            this.resolveReady = resolve;
        });
    }

    loaded(partNumber) {
        this.loadPendingPartNumbers.delete(partNumber);
        if (this.loadPendingPartNumbers.size === 0) {
            console.log(`Done loading ${this.totalPieces} pieces at: ${window.performance.now().toFixed(3)}`);
            this.resolveReady();
        }
    }
}

/**
 * Takes a pieces map (of partnumber to pieceCofigurations), adds each piece
 * to a scene, and returns information of every piece instance.
 */
export async function addPiecesToScene(pieces, scene,
    optionsShowLogo, optionsRoughness, optionsPolygonOffsetFactor, optionsPalette) {

    const pieceInstances = new PieceInstances();
    const meshMaterials = {};
    const lineMaterial = new THREE.LineBasicMaterial({color: 0x333333});
    const colors = {};

    const addToScene = (meshGeometry, lineGeometry, pieceConfigurationsByOpacity) => {
        for (const [opacity, pieceConfigurations] of Object.entries(pieceConfigurationsByOpacity)) {
            meshMaterials[opacity] ??= new THREE.MeshStandardMaterial({
                roughness: optionsRoughness,
                polygonOffsetFactor: optionsPolygonOffsetFactor,
                polygonOffset: optionsPolygonOffsetFactor !== 0.0,
                opacity: opacity,
                transparent: opacity !== "1",
                premultipliedAlpha: opacity !== "1",
            });

            const pieceInstancedMesh =
                new THREE.InstancedMesh(meshGeometry, meshMaterials[opacity], pieceConfigurations.length)
            pieceInstancedMesh.matrixAutoUpdate = false
            const pieceLineInstances =
                Array.from({length: pieceConfigurations.length}, () => lineGeometry.clone());

            const object3d = new THREE.Object3D();
            for (const [pieceIndex, pieceConfiguration] of pieceConfigurations.entries()) {
                object3d.position.set(
                    pieceConfiguration.positionX,
                    pieceConfiguration.positionY,
                    pieceConfiguration.positionZ
                );
                object3d.rotation.set(
                    pieceConfiguration.rotationX,
                    pieceConfiguration.rotationY,
                    pieceConfiguration.rotationZ
                );
                object3d.updateMatrix();

                const paletteColor = pieceConfiguration.info.color.getPaletteColor(optionsPalette).colorInt;
                const color = colors[paletteColor] ??= new THREE.Color(paletteColor);
                pieceInstancedMesh.setColorAt(pieceIndex, color);
                pieceInstancedMesh.setMatrixAt(pieceIndex, object3d.matrix);
                pieceLineInstances[pieceIndex].applyMatrix4(object3d.matrix);
                pieceInstances.add(pieceConfiguration, pieceInstancedMesh, pieceIndex);
            }

            scene.add(pieceInstancedMesh);
            scene.add(new THREE.LineSegments(mergeGeometries(pieceLineInstances), lineMaterial));
        }
    }

    const lDrawLoader = new LDrawLoader();
    lDrawLoader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    lDrawLoader.setPartsLibraryPath('/ldraw/');
    if (optionsShowLogo) {
        lDrawLoader.setFileMap({'stud.dat': 'stud-logo.dat'});
    }
    await lDrawLoader.preloadMaterials('/ldraw/LDConfig.ldr');

    const loadTracker = new LoadTracker(pieces);

    // For each piece load the ldraw model and create an instanced mesh of all positions.
    Object.entries(pieces).forEach(([partNumber, pieceConfigurationsByOpacity]) => {

        const partFile = `/ldraw/parts/${partNumber}.dat`;
        lDrawLoader.load(
            partFile,
            model => {
                const meshes = [];
                const lines = [];
                model.traverse(item => {
                    if (item.isMesh) {
                        meshes.push(item.geometry);
                    } else if (item.isLineSegments && !item.isConditionalLine) {
                        lines.push(item.geometry);
                    }
                });
                addToScene(
                    meshes.length == 1 ? meshes[0] : mergeGeometries(meshes),
                    lines.length  == 1 ? lines[0]  : mergeGeometries(lines),
                    pieceConfigurationsByOpacity,
                );
                loadTracker.loaded(partNumber);
            },
            null,
            error => {
                console.error(`Error loading file: ${partFile}`, error);
                loadTracker.loaded(partNumber);
            }
        );
    });

    return loadTracker.ready.then(() => pieceInstances);
}
