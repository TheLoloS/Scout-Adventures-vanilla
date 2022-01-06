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

import * as THREE from "./three/build/three.module.js";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";
// import { GUI } from './three/examples/jsm/libs/dat.gui.module.js'
// import guiConf from './modules/gui.js'
import Stats from "./three/examples/jsm/libs/stats.module.js";
import createFloor from "./modules/createFloor.js";
import OBJMTLLoader from "./modules/OBJMTLLoader.js";
import addLights from "./modules/addLights.js";
import setBackground from "./modules/setBackground.js";
import confControls from "./modules/controls.js";
import rendConf from "./modules/rendererConf.js";
import onhover from "./modules/onMouseMove.js";
import resizeEvent from "./modules/setEvents.js";
// import tryed from './modules/clicked.js'

const c = console.log;

// Debug gui

// const gui = new GUI()
// guiConf(gui)

// tryed()
//variables for cklicker event module

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//import onMouseMove

onhover(mouse);

var stats = new Stats(); // <-- remove me
document.body.appendChild(stats.dom); // <-- remove me

//variables for add floor objects

let a = 0,
  b = 0,
  florArray = [];

//size od webpage

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas

const canvas = document.querySelector("canvas.webgl");

// Scene

const scene = new THREE.Scene();

// var axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//camera add and config

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 40, 0);
scene.add(camera);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
rendConf(renderer);

const controls = new OrbitControls(camera, renderer.domElement);

// update the picking ray with the camera and mouse position
raycaster.setFromCamera(mouse, camera);

// calculate objects intersecting the picking ray

//import module to change background:

setBackground(scene);

//import module off addLight

addLights(scene);

//import module of create floor

createFloor(scene);

//import objmtl loader

OBJMTLLoader(scene);

//import controls from controls

confControls(controls);

//add event from setEvent (resize)

resizeEvent(camera, renderer);

const clock = new THREE.Clock();
const tick = () => {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.type == "Group"
      ? (intersects[i].object.children[0].visible = false)
      : null; // intersects[i].object.visible = false;
  }
  const elapsedTime = clock.getElapsedTime();

  // Render
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
