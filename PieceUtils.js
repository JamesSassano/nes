"use strict";

import * as THREE from "three";

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
            await addFile(`hyrule-${mapName}.${screenName}.obj`, objContent);
        }

        await addFile(`hyrule.mtl`, Object.values(mtllib).join(""));

        await writer.write(new Uint8Array(1024));
        await writer.close();

        return await outputPromise;
    }

    static createObjContent(pieceInstances, mtllib, yUp) {
        const objOutput = ["mtllib hyrule.mtl\n"];
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
