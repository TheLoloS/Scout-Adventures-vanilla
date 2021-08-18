import * as THREE from '../three/build/three.module.js';

//geometry box for flor

const geometry = new THREE.BoxGeometry(1, 1, 1, 6);
const geometry2 = new THREE.BoxGeometry(1, 1, 1, 6);

//material list usage: materialIndex = \how in simple array/

const materials = [
    new THREE.MeshStandardMaterial({ color: "#6EC54B" }),
    // new THREE.MeshStandardMaterial({ color: "#59a33b" }),
    new THREE.MeshStandardMaterial({ color: "#49d90f" }),
    new THREE.MeshStandardMaterial({ color: "#5e4007" }),
    new THREE.MeshStandardMaterial({ color: "#452f07" })
]
export { geometry, geometry2, materials }