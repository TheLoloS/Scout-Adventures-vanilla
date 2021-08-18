// Autor TheLoloS                                 
//                     ***.                
//               #  &         %&   %       
//            *@@@(              %(  @     
//        &&@@@@(....%@@.       @, %/ &    
//   ,@@@&&@@@@@@@@@@@@@%@#      #& (.(((  
//    * # &@@(  ,&&,@@@@@@(       &% @ %(/ 
//       %%       &@@@@@@@%@,     *@ ,,#&, 
//               #@@@@@@@@@@      *@  & @  
//              /,/&@@@@@@,,     ,@  @.@*  
//           #&**@@@@@@@@@@     (@ .* @(   
//         @@@@@@@@@@@@@@# *. ##   .@@.    
//          @@@@@@@@@@@@@@@, .(@@@@@.      
//           *@@@@@@@@@@@@@@@@@@@/         
//              (@,%@@@@@@,,               


import * as THREE from './three/build/three.module.js'
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js'
import { GUI } from './three/examples/jsm/libs/dat.gui.module.js'
import Stats from './three/examples/jsm/libs/stats.module.js'
import abc from './modules/dataBase.js'
import createFloor from './modules/createFloor.js'
import OBJMTLLoader from './modules/OBJMTLLoader.js'


//variables for cklicker event module

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


var stats = new Stats(); // <-- remove me
document.body.appendChild(stats.dom); // <-- remove me

//difference is the rgb difference of color value (you must -)

let difference = [-0.21499999999999997, -0.361, -0.145]

const c = console.log;
c(abc)

//variables for add floor objects

let a = 0,
    b = 0,
    florArray = [];

//size od webpage

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Debug gui

const gui = new GUI()

// Canvas

const canvas = document.querySelector('canvas.webgl')

// Scene

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x4287f5);
// var axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//camera add and config

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 40, 0);
scene.add(camera)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas

})
renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true

// Lights




// update the picking ray with the camera and mouse position
raycaster.setFromCamera(mouse, camera);

// calculate objects intersecting the picking ray


//light for ale things and models

const Light = new THREE.AmbientLight(0xffffff, 3);
scene.add(Light)

//light for models and shadows

const pointLight = new THREE.SpotLight(0xffffff, 20);

// set target,position,size od map(better shadows), 
// near and far (camera), focus to see shadow.
// sfunk to hide code
(function pointLightConfig() {
    pointLight.target.position.set(-20, 0, -20);
    pointLight.position.set(-42, 40, -42);
    // pointLight.shadow.mapSize.width = 8192;
    // pointLight.shadow.mapSize.width = 8192;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 100;
    pointLight.shadow.focus = 0.5;
    pointLight.castShadow = true;
})();

//add all patrs of light to scene (important order!!)

scene.add(pointLight);
scene.add(pointLight.target)

//import module of create floor

createFloor(scene);

//import objmtl loader

OBJMTLLoader(scene)


//change on resize page (renderer)

window.addEventListener('resize', () => {

    // Update sizes

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//config page movment

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-15, 0, -15)

//camera set up and movment

controls.maxDistance = 40
controls.minDistance = 6
controls.maxPolarAngle = 1.1
controls.minPolarAngle = 0.9
controls.minAzimuthAngle = 1
controls.screenSpacePanning = 5 //right mouse click

controls.update();
window.addEventListener('mousemove', onMouseMove, false);

const clock = new THREE.Clock()
const tick = () => {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    // (intersects[0]) ? c(intersects[0].object.visible): null;

    // intersects[0].object.geometry.groups[2].materialIndex = 3
    for (let i = 0; i < intersects.length; i++) {
        (intersects[i].object.type == "Group") ? intersects[i].object.children[0].visible = false: intersects[i].object.visible = false;

        // intersects[i].object.geometry.groups[2].materialIndex = 3
        // .object.material.color.set(0xff0000);

    }
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)
    controls.update();
    stats.update();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()