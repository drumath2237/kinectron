var kinectron1 = null;
var kinectron2 = null;

// Set depth width and height same Kinect 
var DEPTHWIDTH = 512;
var DEPTHHEIGHT = 424;
var NUMPARTICLES = DEPTHWIDTH * DEPTHHEIGHT;

var busy = false;

var container, stats;

var camera, scene, renderer;

var points;

var controls;

var points1;
var points2;

window.addEventListener('keydown', function(){
  kinectron1.stopAll();
  //kinectron2.stopAll();

});

// Wait for page to load to create webgl canvas and Kinectron connection
window.addEventListener('load', function() {
  initThreeJs();
  animate();

  // Define and create an instance of kinectron
  //var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron1 = new Kinectron();
  //kinectron2 = new Kinectron("10.0.1.16");

  // Connect remote to application
  kinectron1.makeConnection();
  kinectron1.startMultiFrame(["raw-depth", "depth-color"], cb);
  //kinectron1.startRawDepth(rdCallback1);

  //kinectron2.makeConnection();
  //kinectron2.startRawDepth(rdCallback2);

});

function cb(dataReceived) {
  if (dataReceived.rawDepth && dataReceived.depthColor) {
    pointCloud(dataReceived.rawDepth, dataReceived.depthColor, points1);  
  }
  
  //pointCloud(dataReceived.rawDepth, points1);

}

// Run this callback each time Kinect data is received
function rdCallback1(dataReceived) {
//  console.log(dataReceived);


  // Update point cloud based on incoming Kinect data
  pointCloud(dataReceived, points1);
}

function rdCallback2(dataReceived) {
  // Update point cloud based on incoming Kinect data
  //pointCloud(dataReceived, points2);
}

function initThreeJs() {

  container = document.getElementById( 'container' );

  //

  camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 10000 );
  camera.position.x = 0;
  camera.position.y = 1000;
  camera.position.z = 3000;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

  //
  points1 = initPointCloudNew(0);
  scene.add( points1 );

  // points2 = initPointCloudNew(1000);
  // scene.add( points2 );
 

  //


  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setClearColor( 0x000000 );
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



function initPointCloudNew(offset) {
  var particles = NUMPARTICLES;

  var geometry = new THREE.BufferGeometry();

  var positions = new Float32Array( particles * 3 );
  var colors = new Float32Array( particles * 3 );

  var color = new THREE.Color();

  var n = 1000, n2 = n / 2; // particles spread in the cube

  for ( var i = 0; i < positions.length; i += 3 ) {

    // positions

    var x =  (i % DEPTHWIDTH - DEPTHWIDTH * 0.5) + offset;
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

    colors[ i ]     = 1;
    colors[ i + 1 ] = 1;
    colors[ i + 2 ] = 1;

  }

  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

  geometry.computeBoundingSphere();

  //

  var material = new THREE.PointsMaterial( { size: 15, vertexColors: THREE.VertexColors } );

  var points = new THREE.Points( geometry, material );
  return points;
  //points.matrixAutoUpdate = true;

  // scene.add( points );

}
 

function pointCloud(depthBuffer, colorBuffer, points) {
  if(busy) {
    return;
  }


  busy = true;

  // Set desired depth resolution
  var nDepthMinReliableDistance = 500;
  var nDepthMaxDistance = 2000;

  // var k = 0;

  //   for(var j = 0; j < points.geometry.attributes.color.array.length; j+=3) { 

      
  //     //set color 
  //     var color = new THREE.Color();

  //     var vx = colorBuffer[k] / 255;
  //     var vy = colorBuffer[k+1] / 255;
  //     var vz = colorBuffer[k+2] / 255;

  //     //console.log( vx, vy, vz );
  //     color.setRGB( vx, vy, vz );

  //     points.geometry.attributes.color.array[j] = color.r;
  //     points.geometry.attributes.color.array[j+1] = color.g;
  //     points.geometry.attributes.color.array[j+2] = color.b;
  //     k+=4;
  // }

  var j = 0;
  var k = 0;

  // Match depth buffer info to each particle
  for(var i = 0; i < depthBuffer.length; i++) { 

    var depth = depthBuffer[i]; 
    // set depth
    if(depth <= nDepthMinReliableDistance || depth >= nDepthMaxDistance) depth = Number.MAX_VALUE; //push particles far far away so we don't see them
    points.geometry.attributes.position.array[j+2] = (nDepthMaxDistance - depth) - 2000;

      //set color 
      var color = new THREE.Color();

      var vx = colorBuffer[k] / 255;
      var vy = colorBuffer[k+1] / 255;
      var vz = colorBuffer[k+2] / 255;

      color.setRGB( vx, vy, vz );

      points.geometry.attributes.color.array[j] = color.r;
      points.geometry.attributes.color.array[j+1] = color.g;
      points.geometry.attributes.color.array[j+2] = color.b;

      j+=3;
      k+=4;


  }

  // Update particles
  points.geometry.attributes.position.needsUpdate = true;
  points.geometry.attributes.color.needsUpdate = true;
  busy = false;
    // setTimeout(function() {
    //   busy = false;
    // }, 2000);
}



        //   var j = 0, k = 0;
        //   for(var i = 0; i < depthBuffer.length; i+=2) {
        //     var depth = (depthBuffer[i+1] << 8) + depthBuffer[i]; //get uint16 data from buffer
        //     if(depth <= nDepthMinReliableDistance || depth >= nDepthMaxDistance) depth = Number.MAX_VALUE; //push them far far away so we don't see them
        //     particles.vertices[j].z = (nDepthMaxDistance - depth) - 2000;
        //     particles.colors[j].setRGB(depthColorBuffer[k] / 255, depthColorBuffer[k+1] / 255, depthColorBuffer[k+2] / 255);
        //     j++;
        //     k+= 4;
        //   }
        //   particles.verticesNeedUpdate = true;
        //   particles.colorsNeedUpdate = true;
        //   processing = false;
        // });

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
  controls.update();

  renderer.render( scene, camera );
}