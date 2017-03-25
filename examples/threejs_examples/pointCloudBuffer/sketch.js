var kinectron = null;

// Set depth width and height same Kinect 
var DEPTHWIDTH = 512;
var DEPTHHEIGHT = 424;
var NUMPARTICLES = DEPTHWIDTH * DEPTHHEIGHT;

var busy = false;

//var depthBuffer;
var container, stats;

var camera, scene, renderer;

var points;

var controls;

// Wait for page to load to create webgl canvas and Kinectron connection
window.addEventListener('load', function() {
  // Create webgl canvas 
  // webGLCanvas = document.getElementById('webGLCanvas');
  // colorRenderer = new ImageBufferRendererWebgl(webGLCanvas);

  // Create point cloud
  //initPointCloud();
  initThreeJs();
  animate();

  // Define and create an instance of kinectron
  //var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron();

  // // Connect to the microstudio
  // //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // // Connect remote to application
  kinectron.makeConnection();
  kinectron.startRawDepth(rdCallback);
});

// Run this callback each time Kinect data is received
function rdCallback(dataReceived) {
  var depthBuffer = dataReceived;

  // Update point cloud based on incoming Kinect data
  pointCloud(depthBuffer);
}


function initThreeJs() {

  container = document.getElementById( 'container' );

  //

  camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );
  camera.position.z = 2750;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

  //

  var particles = NUMPARTICLES;

  var geometry = new THREE.BufferGeometry();

  var positions = new Float32Array( particles * 3 );
  var colors = new Float32Array( particles * 3 );

  var color = new THREE.Color();

  var n = 1000, n2 = n / 2; // particles spread in the cube

  for ( var i = 0; i < positions.length; i += 3 ) {

    // positions

    var x =  i % DEPTHWIDTH - DEPTHWIDTH * 0.5;
    var y = DEPTHHEIGHT - Math.floor(i / DEPTHWIDTH);
    var z = Math.random() * n - n2;

    positions[ i ]     = x;
    positions[ i + 1 ] = y;
    positions[ i + 2 ] = z;

    // colors

    var vx = ( x / n ) + 0.5;
    var vy = ( y / n ) + 0.5;
    var vz = ( z / n ) + 0.5;

    color.setRGB( vx, vy, vz );

    colors[ i ]     = color.r;
    colors[ i + 1 ] = color.g;
    colors[ i + 2 ] = color.b;

  }

  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

  geometry.computeBoundingSphere();

  //

  var material = new THREE.PointsMaterial( { size: 15, vertexColors: THREE.VertexColors } );

  points = new THREE.Points( geometry, material );
  //points.matrixAutoUpdate = true;

  scene.add( points );
 // console.log(points);
 // debugger;

  //


  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );


  //

  stats = new Stats();
  container.appendChild( stats.dom );
  controls = new THREE.TrackballControls( camera, renderer.domElement );


  //

  window.addEventListener( 'resize', onWindowResize, false );


}

// function initPointCloud(){ 
//   // Create three.js renderer
//   renderer = new THREE.WebGLRenderer( {
//     canvas: document.getElementById('cloudCanvas'),
//     alpha: 0, antialias: true, clearColor: 0x000000
//   } );

//   // Create three.js camera and controls
//   camera = new THREE.PerspectiveCamera( 40, renderer.domElement.width / renderer.domElement.height, 1, 10000 );
//   camera.position.set( 0, 300, 3000 );
//   controls = new THREE.TrackballControls( camera, renderer.domElement );

//   // Create three.js scene
//   scene = new THREE.Scene();
  
//   createParticles();
//   window.addEventListener( 'resize', onWindowResize, false );
//   onWindowResize();   
//   render();
// }

// function createParticles() {

//   // Create particles
//   for(var i = 0; i < numParticles; i++) {
//     var x = i % DEPTHWIDTH - DEPTHWIDTH * 0.5;
//     var y = DEPTHHEIGHT - Math.floor(i / DEPTHWIDTH);
//     var vertex = new THREE.Vector3(x, y, Math.random());
//     particles.vertices.push(vertex);

//     // Assign each particle a color
//     colors[i] = new THREE.Color(0xffffff);
//   }

//   // Add point cloud to scene
//   particles.colors = colors;
//   var material = new THREE.PointsMaterial( { size: 1, vertexColors: THREE.VertexColors, transparent: true } );
//   mesh = new THREE.Points(particles, material);
//   scene.add(mesh);
// }

function pointCloud(depthBuffer) {

  if(busy) {
    return;
  }

  busy = true;

  // Set desired depth resolution
  var nDepthMinReliableDistance = 500;
  var nDepthMaxDistance = 4500;
  var j = 0;

  // Match depth buffer info to each particle
  for(var i = 0; i < depthBuffer.length; i++) {
    

    var depth = depthBuffer[i]; 
    if(depth <= nDepthMinReliableDistance || depth >= nDepthMaxDistance) depth = Number.MAX_VALUE; //push particles far far away so we don't see them
    points.geometry.attributes.position.array[j+2] = (nDepthMaxDistance - depth) - 2000;
    j+=3;
  }

  points.geometry.attributes.position.needsUpdate = true;

  // Update particles
  //points.verticesNeedUpdate = true;
  busy = false;
}

// Resize scene based on window size
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Three.js animate function
function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

// Render three.js scene
function render() {

  // var time = Date.now() * 0.001;

  // points.rotation.x = time * 0.25;
  // points.rotation.y = time * 0.5;
  controls.update();

  renderer.render( scene, camera );
}