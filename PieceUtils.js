"use strict";

import * as THREE from "three";

/** Pairs PieceConfigurations to their resolved InstancedMesh/index. */
export class PieceInstances {

    constructor() {
        this.piecesByScreen = {};
        this.mtllibColors = {};
    }

    add(pieceConfiguration, pieceInstancedMesh, pieceInstancedMeshIndex, color, opacity) {
        const screenName = pieceConfiguration.screenName;
        this.piecesByScreen[screenName] ??= [];
        this.piecesByScreen[screenName].push({
            pieceName: pieceConfiguration.pieceName,
            pieceInstancedMesh: pieceInstancedMesh,
            pieceInstancedMeshIndex: pieceInstancedMeshIndex,
            color: color,
            opacity: opacity,
        });

        const materialName = PieceInstances.getMaterialName(color, opacity);
        this.mtllibColors[materialName] ??= `newmtl ${materialName}
Kd ${PieceInstances.getObjColor(color)}
d ${Number(opacity).toFixed(3)}
`;
    }

    async getObjData() {
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
            console.log(`Create screen obj ${screenName} at: ${window.performance.now()}`);
            const pieceInstances = this.piecesByScreen[screenName]
                .sort((a, b) => a.pieceName.localeCompare(b.pieceName));

            const objContent = PieceInstances.createObjContent(pieceInstances);
            await addFile(`hyrule.${screenName}.obj`, objContent);
        }

        await addFile(`hyrule.mtl`, Object.values(this.mtllibColors).join(""));

        await writer.write(new Uint8Array(1024));
        await writer.close();

        return await outputPromise;
    }

    static getObjColor(color) {
        return `${color.r.toFixed(3)} ${color.g.toFixed(3)} ${color.b.toFixed(3)}`;
    }

    static getMaterialName(color, opacity) {
        return `${color.getHexString()}-${opacity}`;
    }

    static createObjContent(pieceInstances) {
        const objOutput = ["mtllib hyrule.mtl\n"];
        const vector3 = new THREE.Vector3();
        let vIndexOffset = 1;
        let vnIndexOffset = 1;

        for (const pieceInstance of pieceInstances) {
            const matrix = new THREE.Matrix4();
            pieceInstance.pieceInstancedMesh.getMatrixAt(pieceInstance.pieceInstancedMeshIndex, matrix);
            const normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);

            const vertices = pieceInstance.pieceInstancedMesh.geometry.getAttribute("position");
            const normals = pieceInstance.pieceInstancedMesh.geometry.getAttribute("normal");

            const vMap = new Map();
            const vnMap = new Map();
            const faces = [];
            let face = [];

            for (let i = 0; i < vertices.count; i++) {
                vector3.fromBufferAttribute(vertices, i).applyMatrix4(matrix).multiplyScalar(0.4);

                // 3d printer change to: x, -z, y
                const vLine = `v ${vector3.x.toFixed(6)} ${vector3.y.toFixed(6)} ${vector3.z.toFixed(6)}`
                    + ` ${PieceInstances.getObjColor(pieceInstance.color)}`
                    + `\n`;

                if (!vMap.has(vLine)) {
                    vMap.set(vLine, vMap.size);
                }
                const currentVIndex = vMap.get(vLine);

                vector3.fromBufferAttribute(normals, i).applyMatrix3(normalMatrix).normalize();

                const vnLine = `vn ${vector3.x.toFixed(6)} ${vector3.y.toFixed(6)} ${vector3.z.toFixed(6)}\n`;

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
                `usemtl ${PieceInstances.getMaterialName(pieceInstance.color, pieceInstance.opacity)}\n`,
                faces.join("")
            );

            vIndexOffset += vMap.size;
            vnIndexOffset += vnMap.size;
        }

        return objOutput.join("");
    }
}
