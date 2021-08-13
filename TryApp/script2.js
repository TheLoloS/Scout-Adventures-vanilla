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

import * as THREE from '../three/build/three.module.js'
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from '../three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './three/examples/jsm/loaders/MTLLoader.js ';
import { GUI } from '../three/examples/jsm/libs/dat.gui.module.js'
import { Material, PerspectiveCamera } from '../three/build/three.module.js'


const c = console.log;

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const gui = new GUI()

// Canvas

const canvas = document.querySelector('canvas.webgl')


// Scene
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)


/**
 * Renderer
 */



const scene = new THREE.Scene()
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
camera.position.x = 0
camera.position.y = 40
camera.position.z = 0

scene.add(camera)


window.addEventListener('resize', () => {
    console.log(PerspectiveCamera)

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


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas

})
renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
const controls = new OrbitControls(camera, renderer.domElement);

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight(0xffffff, 5, 100);
light.position.set(3, 1, 10); //default; light shining from top
light.castShadow = true; // default false
scene.add(light);
//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -10)
plane.receiveShadow = true;
scene.add(plane);

const clock = new THREE.Clock()



const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)
    controls.update();
    // var camera_pos = camera.position
    // light.position.x = camera_pos.x
    // light.position.y = camera_pos.y
    // light.position.z = camera_pos.z
    // light.castShadow = true;
    // scene.add(light);


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()