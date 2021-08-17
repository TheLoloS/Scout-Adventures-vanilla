import * as THREE from './three/build/three.module.js';
import { geometry, geometry2, materials } from './geometryAndMaterials.js'

const createFloor = (scene) => {

    let a = 0,
        b = 0,
        florArray = [];

    //first material do with gorups

    for (let i = 0; i < geometry.groups.length; i++) {
        geometry.groups[i].materialIndex = 3;
    }
    geometry.groups[2].materialIndex = 1;

    //second material

    for (let i = 0; i < geometry2.groups.length; i++) {
        geometry2.groups[i].materialIndex = 2;
    }
    geometry2.groups[2].materialIndex = 0;


    //add objects for floor off the game:

    for (let i = 0; i < 1600; i++, a++) {

        // const sphere = new THREE.Mesh((i % 3 == 0) ? geometry : geometry2, materials);       //for rand color of flor
        const sphere = new THREE.Mesh(geometry, materials);
        (a == 40) ? b += 1: b = b;
        sphere.position.x = -b;
        (a == 40) ? a = 0: a = a;
        sphere.position.z = -a;
        sphere.receiveShadow = true;

        sphere.name = `floor_${i}`;
        scene.add(sphere);
    }
}
export default createFloor;