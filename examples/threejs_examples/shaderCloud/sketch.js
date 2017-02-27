var kinectron1 = null;
var kinectron2 = null;

// Set depth width and height same Kinect 
var DEPTHWIDTH = 512;
var DEPTHHEIGHT = 424;

var depthBuffer;
var renderer, camera, scene, controls;

var particles1 = new THREE.Geometry();
var particles2 = new THREE.Geometry();
var colors = [];
var numParticles = DEPTHWIDTH * DEPTHHEIGHT;

var animFrame = null;
var busy = false;

//var colorRenderer = null; 
var webGLCanvas = null;

// Yao vars
var mode=0;
var angle = Math.PI;
var scaleValue = -1500;
var minDepth =  0;
var maxDepth =  2000; //4.5m
var drawState = 1;
//PImage depthImg;
//openGL
//PGL pgl;
var shader;
var  vertLoc;
var colorLoc;
var bufferdepth1=1000;
var bufferdepth2=1000;
var Xposition1=70;
var Yposition1=-100;
var Depthposition1=2050;
var scalez=0;
var Xposition2=0;
var Yposition2=0;
var Depthposition2=0;
var x=0;
var i=0;






window.addEventListener('keydown', function(){
  kinectron1.stopAll();
  //kinectron2.stopAll();

});

// Wait for page to load to create webgl canvas and Kinectron connection
window.addEventListener('load', function() {
  // Create webgl canvas 
  webGLCanvas = document.getElementById('webGLCanvas');
  //colorRenderer = new ImageBufferRendererWebgl(webGLCanvas);

  // Create point cloud
  initThreeJS();

  // Define and create an instance of kinectron
  //var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron1 = new Kinectron();
  //kinectron2 = new Kinectron("10.0.1.16");

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect remote to application
  kinectron1.makeConnection();
  kinectron1.startRawDepth(rdCallback1);

  //kinectron2.makeConnection();
  //kinectron2.startRawDepth(rdCallback2);



});

// Run this callback each time Kinect data is received
function rdCallback1(dataReceived) {
  //depthBuffer = dataReceived;

  // what does this do?
  x+=0.01;

  var vertDataa = numParticles; // depth w * h
  // create a buffer of depth positions
  depthPositions = dataReceived;
  //rewrite depth positions based on data needed -- if above depth threshhold
  // for (var i=2; i<depthPositions.capacity (); i+=3) {
  //   if (depthPositions[i]>bufferdepth1) {
  //     depthPositions.push(i, 0);
  //     depthPositions.push(i-1, 0);
  //     depthPositions.push(i-2, 0);
  //   }
  //   if (mode==0) {
  //     // rewrite depth z positioning based on depth position set by user
  //     if (depthPositions.get(i)!=0) {
  //       float zposition=depthPositions.get(i);
  //       depthPositions.put(i, Depthposition1-zposition);
  //       float yposition=depthPositions.get(i-1);
  //       depthPositions.put(i-1, Yposition1+yposition);
  //       float xposition=depthPositions.get(i-2);
  //       depthPositions.put(i-2, Xposition1-xposition);
  //     }
  //   } else if (mode==1) {
  //     // OR ???? make it random???
  //     depthPositions.put(i, random(depthPositions.get(i)));
  //   }

  vertLoc  = renderer.getAttribLocation(shader.glProgram, "vertex");












  // Update point cloud based on incoming Kinect data
  //pointCloud(depthBuffer, particles1);
}

function rdCallback2(dataReceived) {
  depthBuffer = dataReceived;

  // Update point cloud based on incoming Kinect data
  //pointCloud(depthBuffer, particles2);
}

function initThreeJS(){ 
  // Create three.js renderer
  renderer = new THREE.WebGLRenderer( {
    canvas: document.getElementById('cloudCanvas'),
    alpha: 0, antialias: true, clearColor: 0x000000
  } );

  // Create three.js camera and controls
  camera = new THREE.PerspectiveCamera( 40, renderer.domElement.width / renderer.domElement.height, 1, 10000 );
  camera.position.set( 0, 300, 3000 );
  controls = new THREE.TrackballControls( camera, renderer.domElement );

  // Create three.js scene
  scene = new THREE.Scene();

  // Load/create shaders

  // Define a color-typed uniform
  var uniforms = {  
    myColor: { type: "c", value: new THREE.Color( 0xffffff ) },
  };

  // My float attribute https://github.com/mrdoob/three.js/wiki/Uniforms-types
  // var attributes = {  
  //   size: { type: 'f', value: [] },
  // };

  //var numVertices = 100;

  // for (var i=0; i < numVertices; i++) {  
  //   attributes.size.value[i] = 5 + Math.floor(Math.random() * 10);
  // }

  // sh in yao code;
  shader = new THREE.ShaderMaterial({  
    uniforms: uniforms,
    //attributes: attributes,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

  //createParticles(particles1);
  //createParticles(particles2);
  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();   
  render();
}

function createParticles(particles) {

  // Create particles
  for(var i = 0; i < numParticles; i++) {
    var x = i % DEPTHWIDTH - DEPTHWIDTH * 0.5;
    var y = DEPTHHEIGHT - Math.floor(i / DEPTHWIDTH);
    var vertex = new THREE.Vector3(x, y, Math.random());
    particles.vertices.push(vertex);

    // Assign each particle a color
    colors[i] = new THREE.Color(0xffffff);
  }

  // Add point cloud to scene
  particles.colors = colors;
  var material = new THREE.PointsMaterial( { size: 1, vertexColors: THREE.VertexColors, transparent: true } );
  mesh = new THREE.Points(particles, material);
  scene.add(mesh);
}

// function pointCloud(depthBuffer, particles) {
//   if(busy) {
//     return;
//   }

//   busy = true;

//   // Set desired depth resolution
//   var nDepthMinReliableDistance = 500;
//   var nDepthMaxDistance = 2000;
//   var j = 0;

//   // Match depth buffer info to each particle
//   for(var i = 0; i < depthBuffer.length; i++) {
//     var depth = depthBuffer[i]; 
//     if(depth <= nDepthMinReliableDistance || depth >= nDepthMaxDistance) depth = Number.MAX_VALUE; //push particles far far away so we don't see them
//     particles.vertices[j].z = (nDepthMaxDistance - depth) - 2000;
//     j++;
//   }

//   // Update particles
//   particles.verticesNeedUpdate = true;
//   busy = false;
// }

// Resize scene based on window size
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Render three.js scene
function render() {
  renderer.render( scene, camera );
  controls.update();
  animFrame = requestAnimationFrame(render);
}