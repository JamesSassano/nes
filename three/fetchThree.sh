#!/bin/bash -x

version=0.180.0
for i in \
    build/three.core.js \
    build/three.module.js \
    examples/jsm/controls/OrbitControls.js \
    examples/jsm/loaders/LDrawLoader.js \
    examples/jsm/materials/LDrawConditionalLineMaterial.js \
    examples/jsm/utils/BufferGeometryUtils.js \
    examples/jsm/libs/lil-gui.module.min.js \
; do 
    mkdir -p "v$version/"`dirname $i`
    curl "https://cdn.jsdelivr.net/npm/three@$version/$i" -o "v$version/$i"
done
