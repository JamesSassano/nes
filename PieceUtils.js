"use strict";

import * as THREE from "three";
import { LDrawLoader } from "three/addons/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/addons/materials/LDrawConditionalLineMaterial.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

const objComment = [
    "# Design Interpretation & Tile Mapping (c) 2026 James Sassano.",
    "# Licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).",
    "# Attribution: Derived from The LDraw Parts Library data licensed under CC BY 2.0.",
    "#",
].join("\n");

/** Pairs PieceConfigurations to their resolved InstancedMesh/index. */
export class PieceInstances {

    constructor() {
        this.piecesByScreen = {};
    }

    add(pieceConfiguration, pieceInstancedMesh, pieceInstancedMeshIndex) {
        const screenName = pieceConfiguration.screenName;
        this.piecesByScreen[screenName] ??= [];
        this.piecesByScreen[screenName].push({
            pieceName: pieceConfiguration.pieceName,
            color: pieceConfiguration.color,
            opacity: pieceConfiguration.opacity,
            pieceInstancedMesh: pieceInstancedMesh,
            pieceInstancedMeshIndex: pieceInstancedMeshIndex,
        });
    }

    changePalette(palette) {
        const colors = {};
        Object.keys(this.piecesByScreen).forEach(screenName => {
            this.piecesByScreen[screenName].forEach(pieceInstance => {
                const paletteColor = pieceInstance.color.palettes[palette];
                const color = colors[paletteColor] ??= new THREE.Color(paletteColor);
                pieceInstance.pieceInstancedMesh.setColorAt(pieceInstance.pieceInstancedMeshIndex, color);
                pieceInstance.pieceInstancedMesh.instanceColor.needsUpdate = true;
            });
        });
    }

    async getObjData(mapName, yUp, onProgress) {
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

        const screenNames = Object.keys(this.piecesByScreen).sort()
            //.filter(screenName => ["H3", "H4"].includes(screenName))
        ;
        for (const screenName of screenNames) {
            await onProgress(screenName);

            const pieceInstances = this.piecesByScreen[screenName]
                .sort((a, b) => a.pieceName.localeCompare(b.pieceName));

            const objContent = PieceInstances.createObjContent(pieceInstances, mtllib, yUp);
            await addFile(`hyrule-${mapName}/hyrule-${mapName}.${screenName}.obj`, objContent);
        }

        await addFile(`hyrule-${mapName}/hyrule.mtl`, Object.values(mtllib).join(""));

        await writer.write(new Uint8Array(1024));
        await writer.close();

        return await outputPromise;
    }

    static createObjContent(pieceInstances, mtllib, yUp) {
        const objOutput = [`${objComment}\nmtllib hyrule.mtl\n`];
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

            const opacity = pieceInstance.opacity.toFixed(3);
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
                    ? `v ${vector3.x.toFixed(6)} ${vector3.y.toFixed(6)} ${vector3.z.toFixed(6)} ${objColor}\n`
                    : `v ${vector3.x.toFixed(6)} ${(-vector3.z).toFixed(6)} ${vector3.y.toFixed(6)} ${objColor}\n`;

                if (!vMap.has(vLine)) {
                    vMap.set(vLine, vMap.size);
                }
                const currentVIndex = vMap.get(vLine);

                vector3.fromBufferAttribute(normals, i).applyMatrix3(normalMatrix3).normalize();
                const vnLine = yUp
                    ? `vn ${vector3.x.toFixed(6)} ${vector3.y.toFixed(6)} ${vector3.z.toFixed(6)}\n`
                    : `vn ${vector3.x.toFixed(6)} ${(-vector3.z).toFixed(6)} ${vector3.y.toFixed(6)}\n`;

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
                `o ${pieceInstance.pieceName}\n`,
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

    const addToScene = (modelItems, pieceConfigurationsByOpacity) => {
        for (const [opacity, pieceConfigurations] of Object.entries(pieceConfigurationsByOpacity)) {
            meshMaterials[opacity] ??= new THREE.MeshStandardMaterial({
                roughness: optionsRoughness,
                polygonOffsetFactor: optionsPolygonOffsetFactor,
                polygonOffset: optionsPolygonOffsetFactor !== 0.0,
                opacity: opacity,
                transparent: opacity !== "1",
                premultipliedAlpha: opacity !== "1",
            });

            const pieceInstancedMeshes = modelItems.meshes.map(meshGeometry =>
                new THREE.InstancedMesh(meshGeometry, meshMaterials[opacity], pieceConfigurations.length)
            );
            const pieceLineInstances = modelItems.lines.map(lineGeometry =>
                Array.from({length: pieceConfigurations.length}, () => lineGeometry.clone())
            );

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
                object3d.scale.set(
                    pieceConfiguration.scaleX,
                    pieceConfiguration.scaleY,
                    pieceConfiguration.scaleZ
                );
                object3d.updateMatrix();

                pieceInstancedMeshes.forEach(pieceInstancedMesh => {
                    pieceInstancedMesh.setMatrixAt(pieceIndex, object3d.matrix);
                    const paletteColor = pieceConfiguration.color.palettes[optionsPalette];
                    const color = colors[paletteColor] ??= new THREE.Color(paletteColor);
                    pieceInstancedMesh.setColorAt(pieceIndex, color);

                    pieceInstances.add(pieceConfiguration, pieceInstancedMesh, pieceIndex);
                    pieceInstancedMesh.matrixAutoUpdate = false
                });
                pieceLineInstances.forEach(pieceLineInstance =>
                    pieceLineInstance[pieceIndex].applyMatrix4(object3d.matrix));
            }

            pieceInstancedMeshes.forEach(pieceInstancedMesh => scene.add(pieceInstancedMesh));
            pieceLineInstances.forEach(pieceLineInstance =>
                scene.add(new THREE.LineSegments(
                    mergeGeometries(pieceLineInstance, false), lineMaterial))
            );
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

        const addModelItemsToScene = modelItems => {
            addToScene(modelItems, pieceConfigurationsByOpacity);
            loadTracker.loaded(partNumber);
        };

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
                addModelItemsToScene({meshes, lines});
            },
            null,
            error => {
                console.error(`Error loading file: ${partFile}`, error);
                addModelItemsToScene({meshes: [], lines: []});
            }
        );
    });

    return loadTracker.ready.then(() => pieceInstances);
}
