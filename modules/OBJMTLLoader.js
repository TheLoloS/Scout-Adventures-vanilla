import { OBJLoader } from '../three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../three/examples/jsm/loaders/MTLLoader.js ';
import abc from '../modules/dataBase.js'

const c = console.log;
const mapBuild = (scene) => {
    //add obj and mtl files function
    abc.Map.Buldings.forEach((e, i) => {
        const mtlLoader = new MTLLoader()
        mtlLoader.load(e.nameBuldings + '.mtl',
            (materials) => {
                materials.preload()
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(e.nameBuldings + '.obj',
                    (object) => {
                        object.children[0].position.set(e.position[0], e.position[1], e.position[2]);
                        object.children[0].castShadow = true; //default is false
                        object.children[0].name = `buldings_${i}`
                        object.children[0].receiveShadow = true;
                        // object.children[0].material.color = new THREE.Color(0.384, 0.698, 0.258);
                        // object.children[0].material.emissive = new THREE.Color(0, 0, 0);
                        object.children[0].material.shininess = 0;
                        object.children[0].cursor = 'pointer';
                        // object.on('click', function(ev) { c(ev) });
                        scene.add(object.children[0])
                    },
                    (xhr) => {
                        c((xhr.loaded / xhr.total * 100) + '% loaded')
                    },
                    (error) => {
                        c('Masz problem: ' + error)
                    })
            }
        );
    });
}
export default mapBuild