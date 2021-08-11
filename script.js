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
import { OBJLoader } from './three/examples/jsm/loaders/OBJLoader.js';
import { GUI } from './three/examples/jsm/libs/dat.gui.module.js'
import { Material, PerspectiveCamera } from './three/build/three.module.js'


const c = console.log;

// Debug gui

const gui = new GUI()

// Canvas

const canvas = document.querySelector('canvas.webgl')


// Scene

const scene = new THREE.Scene()
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Objects

const geometry = new THREE.BoxGeometry(1, 1, 1, 6);
const geometry2 = new THREE.BoxGeometry(1, 1, 1, 6);

//script for mapping textures:

// Materials
// const loader = new THREE.CubeTextureLoader();
// loader.setPath( 'textures/cube/pisa/' );

// const textureCube = loader.load( [
// 	'px.png', 'nx.png',
// 	'py.png', 'ny.png',
// 	'pz.png', 'nz.png'
// ] );
// const materialtx = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

//material list usage: materialIndex = \how in simple array/

const materials = [
    new THREE.MeshBasicMaterial({ color: "#6EC54B" }),
    new THREE.MeshBasicMaterial({ color: "#59a33b" }),
    new THREE.MeshBasicMaterial({ color: "#5e4007" }),
    new THREE.MeshBasicMaterial({ color: "#452f07" })
]


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

//variables for add floor objects

let florArray = []
let a = 0,
    b = 0;

//add objects for floor off the game:

for (let i = 0; i < 1600; i++, a++) {

    const sphere = new THREE.Mesh((i % 3 == 0) ? geometry : geometry2, materials);
    (a == 40) ? b += 1: b = b;
    sphere.position.x = -b;
    (a == 40) ? a = 0: a = a;
    sphere.position.z = -a;
    scene.add(sphere)
}

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//add obj and mtl files function


function addobjmtlobject(scale, position, rotation, ) {

}

var manager = new THREE.LoadingManager();
var loader = new OBJLoader();
loader.load(

    'https://cdn.jsdelivr.net/gh/TheLoloS/Scout-Adventure/tent.obj',

    function(object) {
        scene.add(object);
        c(object)
    });


/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Camera
 */

// Base camera perspective: 

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

//add starrt position off camera"

camera.position.x = 20
camera.position.y = 50
camera.position.z = 20

scene.add(camera)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-10, 0, -10)

//camera set up

controls.maxDistance = 30
controls.minDistance = 6
    // controls.maxPolarAngle = 1
    // controls.minPolarAngle = 1
c(controls.getAzimuthalAngle())
    // controls.minAzimuthAngle = 1
    // controls.screenSpacePanning = 10 //poziomo prawy przycisk

controls.update();

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)
    controls.update();



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()