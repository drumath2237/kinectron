// Declare kinectron
var kinectron = null;

// Use two canvases to draw incoming feeds
var canvas; 
var ctx; 
var canvas2; 
var ctx2; 

// set a fixed 2:1 for the images
var CANVW = 512;
var CANVH = 256;

// Three.js variables
var width = window.innerWidth;
var height = window.innerHeight;
var camera, scene, renderer; 
var geometry, texture, mesh;
var geometry2, texture2, mesh2;
var orientationX, orientationY, orientationZ, orientationW;

var cameraX, cameraY, cameraZ;

function drawJoint(data) {
  //console.log(data);
  cameraX = data.cameraX;
  cameraY = data.cameraY;
  cameraZ = data.cameraZ;
  orientationX = data.orientationX;
  orientationY = data.orientationY;
  orientationZ = data.orientationZ;
  orientationW = data.orientationW;
  //debugger;  
}

function init() {
  // Define and create an instance of kinectron
  //var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron();

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect remote to application
  kinectron.makeConnection();
  //kinectron.startMultiFrame(["color", "depth"], changeCanvas);
  kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawJoint);

  // Setup canvas and context
  // canvas = document.getElementById('canvas1');    
  // canvas.width = CANVW;
  // canvas.height = CANVH;
  // ctx = canvas.getContext('2d');

  // canvas2 = document.getElementById('canvas2');    
  // canvas2.width = CANVW;
  // canvas2.height = CANVH;
  // ctx2 = canvas2.getContext('2d');

  // Three.js renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  
  // Three.js scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);

  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 1 ).normalize();
  scene.add(light);

  // Create first cube   
  //texture = new THREE.Texture(canvas);
  var material = new THREE.MeshPhongMaterial( { color: 0x3b0160 }  );
  //svar material = new THREE.MeshBasicMaterial({ color: 0x3b0160 });
  geometry = new THREE.BoxGeometry( 150, 150, 150 );
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 100, 0 ) );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // Create second cube 
  //texture2 = new THREE.Texture(canvas2);
  var material2 = new THREE.MeshPhongMaterial( { color: 0x3b0160 }  );
  geometry2 = new THREE.BoxGeometry( 150, 150, 150 );
  geometry2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -100, 0 ) );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  //scene.add( mesh2 );



  // Listen for window resize  
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame(animate);

  // Update the textures for each animate frame  
  //texture.needsUpdate = true;
  mesh.position.x = cameraX * window.innerWidth/4;
  mesh.position.y = cameraY * window.innerHeight/4;
  //mesh.position.z = cameraZ * 1000/4;
  mesh.position.z = cameraZ

  mesh.rotation.x = orientationX;
  mesh.rotation.y = orientationY;
  mesh.rotation.z = orientationZ;


  //texture2.needsUpdate = true;
  //mesh2.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

init();
animate();
