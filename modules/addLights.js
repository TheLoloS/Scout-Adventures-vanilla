import * as THREE from '../three/build/three.module.js';
const c = console.log;
//light for ale things and models
const addLights = (scene) => {
    const Light = new THREE.AmbientLight(0xffffff, 3);
    scene.add(Light)

    //light for models and shadows

    const pointLight = new THREE.SpotLight(0xffffff, 20);

    // set target,position,size od map(better shadows), 
    // near and far (camera), focus to see shadow.
    // sfunk to hide code
    pointLight.target.position.set(-20, 0, -20);
    pointLight.position.set(-42, 40, -42);
    // pointLight.shadow.mapSize.width = 8192;
    // pointLight.shadow.mapSize.width = 8192;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 100;
    pointLight.shadow.focus = 0.5;
    pointLight.castShadow = true;


    //add all patrs of light to scene (important order!!)

    scene.add(pointLight);
    scene.add(pointLight.target)

}

export default addLights