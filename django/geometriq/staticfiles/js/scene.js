import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
    
    // Create a Three.js scene
    const scene = new THREE.Scene();

  
    const grid = new THREE.GridHelper(30, 30);
    scene.add(grid);
    // Create a new box geometry
    const bgGeometry = new THREE.BoxGeometry(20000, 20000, 20000);
  
    // Create a new white material for the box
    const bgMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
    // Create a new mesh using the geometry and material
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  
    // Set the position of the box so that it's behind the camera
    bgMesh.position.set(0, 0, -10000);
  
    // Add the box to the scene
    scene.add(bgMesh);
  
    // Create a camera and position it
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  
    // Create a cube and add it to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  
    // Get the canvas element and use it as the renderer's output
    const canvas = document.getElementById('my-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
  
    // Set the renderer's size
    renderer.setSize(window.innerWidth/3, window.innerHeight*4/11);
  
    // Render the scene
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();