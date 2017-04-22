if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var kinectron1, kinectron2;

var scene, camera, light, renderer;
var geometry, cube, mesh, material;
var geometry2, mesh2, material2;
var mouse, center;
var stats;

var video, video2, texture, texture2;

// Use two canvases to draw incoming feeds
var canvas; 
var ctx; 
var canvas2; 
var ctx2; 

// set a fixed 2:1 for the images
var CANVW = 768;
var KIMGW = 512;
var CANVH = 424;
var busy = false;

var controls;

window.addEventListener('load', init);

var busy1 = false;
var busy2 = false;
// var img1;
// var img2;

function changeCanvas1(data) {
	if (busy) {
    return;
  }

	busy = true; 

	if (!data.depthColor) return;
	// Image data needs to be draw to img element before canvas
  // var img1 = new Image();
  //console.log(data.depthColor);

  var img1 = new Image();

  img1.src = data.depthColor; // get color image from kinectron data

  img1.onload = function() {
    ctx.clearRect(0, 0, CANVW, CANVH);
    ctx.drawImage(img1,256,0, KIMGW, CANVH);  
  };
  
 	setTimeout(function() {
 	  busy = false;
 	});
}

//var changeCanvas1 = _.throttled(changeCanvas1, 40);


function changeCanvas2(data) {

  if (busy) return;

  busy = true; 

  if (!data.depthColor) return;
  // Image data needs to be draw to img element before canvas

  var img2 = new Image();
  img2.src = data.depthColor; // get color image from kinectron data

  img2.onload = function() {
    ctx2.clearRect(0, 0, CANVW, CANVH);
    ctx2.drawImage(img2, 128, 0, KIMGW, CANVH); 
  };

  setTimeout(function() {
    busy = false;
  });
          

}

// Use '9' key to stop kinects from running 
window.addEventListener('keydown', function(event){
	if (event.keyCode === 57) {
		  kinectron1.stopAll();
		  kinectron2.stopAll();
	}


});

function init() {


	container = document.createElement( 'div' );
	document.body.appendChild( container );

	stats = new Stats();
	container.appendChild( stats.dom );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 30, 13, 765 );

	scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0x0000ff );
	center = new THREE.Vector3();
	center.z = - 2000;

	createKinectImg1();

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000, 1);
	container.appendChild( renderer.domElement );

	mouse = new THREE.Vector3( 0, 0, 1 );

	initKinectron();

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

	animate();

}

function initKinectron() {
					  // Define and create an instance of kinectron
	  //var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
	  kinectron1 = new Kinectron("10.0.1.14");
	  kinectron1.makeConnection();
	  kinectron1.startMultiFrame(["depth", "depth-color"], changeCanvas1);

    kinectron2 = new Kinectron("10.0.1.4");
    kinectron2.makeConnection();
    kinectron2.startMultiFrame(["depth", "depth-color"], changeCanvas2);
}

function createKinectImg1() {
	//video = document.createElement( 'video' );
	//video.addEventListener( 'loadedmetadata', function ( event ) {


		// set clipping and dimensions
		var width = 768, height = 424;
		var nearClipping = 850, farClipping = 4000;

		// Setup canvas and context for first kinect
		canvas = document.getElementById('canvas1');    
		canvas.width = CANVW;
		canvas.height = CANVH;
		ctx = canvas.getContext('2d');

		// texture for kinect1
		texture = new THREE.Texture(canvas);
		texture.minFilter = THREE.NearestFilter;

		// Setup canvas and context for kinect 2
		canvas2 = document.getElementById('canvas2');    
		canvas2.width = CANVW;
		canvas2.height = CANVH;
		ctx2 = canvas2.getContext('2d');

		// texture for k 2
		texture2 = new THREE.Texture(canvas2);
		texture2.minFilter = THREE.NearestFilter;

		//

		// geo for both kinects
		geometry = new THREE.BufferGeometry();

		// verts for kinect1
		var vertices = new Float32Array( width * height * 3 );

		for ( var i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

			vertices[ i ] = j % width;
			vertices[ i + 1 ] = Math.floor( j / width );

		}

		// vertices to first geometry
		geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

		// 

		// create shader material

		material = new THREE.ShaderMaterial( {

			uniforms: {

				"map1":         { value: texture2 },
				"map2": 				{ value: texture }, 
				"width":        { value: width },
				"height":       { value: height },
				"nearClipping": { value: nearClipping },
				"farClipping":  { value: farClipping },
				"dClipping1": 	{ value: 0.45 },
				"dClipping2":   { value : 0.6 },  

				"pointSize":    { value: 2 },
				"zOffset":      { value: 1000 },
        "xLeftClip1":    { value: 0.4 }, //0.2
        "xRightClip1":   { value: 0.65 },  //0.4
        "xLeftClip2":    { value: 0.5 }, //0.5
        "xRightClip2":   { value: 0.7 }  //0.7

			},
			vertexShader: document.getElementById( 'vs' ).textContent,
			fragmentShader: document.getElementById( 'fs' ).textContent,
			blending: THREE.AdditiveBlending,
			depthTest: false, depthWrite: false,
			transparent: true

		} );

		mesh = new THREE.Points( geometry, material );
		scene.add( mesh );

}



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouse.x = ( event.clientX - window.innerWidth / 2 ) * 8;
	mouse.y = ( event.clientY - window.innerHeight / 2 ) * 8;

}

function animate() {
 
  texture.needsUpdate = true;
  texture2.needsUpdate = true;

  requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	//camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
	//camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
	//camera.lookAt( center );
	controls.update();
	renderer.render( scene, camera );

}