import * as THREE from 'three';
import { OrbitControls } from 'OrbitControl';
import { GLTFLoader } from 'GLTFLoad';
// import { STEP2GLTF } from 'STEP';



    
var scene, camera, renderer;


function init() {
  
    // Create a scene
    scene = new THREE.Scene();
    

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    camera.addEventListener('resize', () => {
      onWindowResize(); // your function?
      });

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight/3);
    renderer.setClearColor(0xffffff)
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    const orbit = new OrbitControls(camera, renderer.domElement);

    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    camera.position.set(-10, 30, 30);
    orbit.update();

    const light = new THREE.AmbientLight( 0x040404 ); // soft white light
    scene.add( light );

    // Load the glTF model
    var loader = new GLTFLoader();
    loader.load('/static/models/cat.glb', function (gltf) {
    // const loader = new STEP2GLTF();
    // loader.load('/static/models/test_step.STEP', function (gltf) {
        scene.add(gltf.scene);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();