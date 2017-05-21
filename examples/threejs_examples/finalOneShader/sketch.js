if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var kinectron1, kinectron2;

var scene, camera, light, renderer;
var geometry, cube, mesh, material;
var geometry2, mesh2, material2;
var mouse, center;
var stats;

var video, video2, texture, texture2;

var dClipping1, dClipping2, flrClipping1, flrClipping2, xLeftClip1, xRightClip1, xLeftClip2, xRightClip2;

// Use two canvases to draw incoming feeds
var canvas; 
var ctx; 
var canvas2; 
var ctx2; 

// set a fixed 2:1 for the images
var CANVW = 768;
var KIMGW = 512;
var CANVH = 424;
var canv1XStart = 30;
var canv2XStart = 256 - 30;
var busy = false;

var params = {
	canv1Start: 30,
	canv2Start: 226,
	dClipping1: 0.45,
	dClipping2: 0.6,
	flrClipping1: 0.33,
	flrClipping2: 0.33,
	xLeftClip1: 0.2,
	xRightClip1: 0.55,
	xLeftClip2: 0.45,
	xRightClip2: 0.75
};

var controls;

window.addEventListener('load', init);

var busy1 = false;
var busy2 = false;

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
    ctx.drawImage(img1,canv1XStart,0, KIMGW, CANVH);  
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
    ctx2.drawImage(img2, canv2XStart, 0, KIMGW, CANVH); 
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

	// dat.GUI

	var gui = new dat.GUI( { width: 300 } );

	var folderCanv1 = gui.addFolder( 'Canvas1' );
	folderCanv1.add( params, 'canv1Start', 0, 256 ).step( 1 ).onChange( function( value ) { setCanvasPosition(); } );
	folderCanv1.add( params, 'dClipping1', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv1.add( params, 'flrClipping1', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv1.add( params, 'xLeftClip1', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv1.add( params, 'xRightClip1', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv1.open();


	var folderCanv2 = gui.addFolder( 'Canvas2' );
	folderCanv2.add( params, 'canv2Start', 0, 256 ).step( 1 ).onChange( function( value ) { setCanvasPosition(); } );
	folderCanv2.add( params, 'dClipping2', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv2.add( params, 'flrClipping2', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv2.add( params, 'xLeftClip2', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv2.add( params, 'xRightClip2', 0.0, 1.0 ).step( 0.01 ).onChange( function( value ) { updateMaterial(); } );
	folderCanv2.open();

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );


	// canv1Start: 30,
	// canv2Start: 226,
	// dClipping1: 0.45,
	// dClipping2: 0.6,
	// flrClipping1: 0.33,
	// flrClipping2: 0.33,
	// xLeftClip1: 0.2,
	// xRightClip1: 0.55,
	// xLeftClip2: 0.45,
	// xRightClip2: 0.75


//setCanvasPosition() {}
//updateMaterial




	//

	window.addEventListener( 'resize', onWindowResize, false );

	animate();

}

function initKinectron() {
					  // Define and create an instance of kinectron
	  //var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
	  kinectron1 = new Kinectron("10.0.1.3");
	  kinectron1.makeConnection();
	  kinectron1.startMultiFrame(["depth", "depth-color"], changeCanvas1);

    kinectron2 = new Kinectron("10.0.1.14");
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

		updateMaterial();
		
		material = new THREE.ShaderMaterial( {

			uniforms: {

				"map1":         { value: texture },
				"map2": 				{ value: texture2 }, 
				"width":        { value: width },
				"height":       { value: height },
				"nearClipping": { value: nearClipping },
				"farClipping":  { value: farClipping },
				"dClipping1": 	{ value: dClipping1 },
				"dClipping2":   { value : dClipping2 },  
				"flrClipping1": { value : flrClipping1 },
				"flrClipping2": { value : flrClipping2 },
				"pointSize":    { value: 2 },
				"zOffset":      { value: 1000 },
        "xLeftClip1":   { value: xLeftClip1 }, //0.0 is natural beginning
        "xRightClip1":  { value: xRightClip1 },  //0.66 is natural end
        "xLeftClip2":   { value: xLeftClip2 }, //0.33 is natural beginning
        "xRightClip2":  { value: xRightClip2 }  //1.0 is natural end 

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

function setCanvasPosition() {
	canv1XStart = params.canv1Start;
	canv2XStart = params.canv2Start;
} 

function updateMaterial() {
	if (typeof material !== 'undefined') {
		material.uniforms.dClipping1.value = params.dClipping1;
		material.uniforms.dClipping2.value = params.dClipping2;
		material.uniforms.flrClipping1.value = params.flrClipping1;
		material.uniforms.flrClipping2.value = params.flrClipping2;
		material.uniforms.xLeftClip1.value = params.xLeftClip1;
		material.uniforms.xRightClip1.value = params.xRightClip1;
		material.uniforms.xLeftClip2.value = params.xLeftClip2;
		material.uniforms.xRightClip2.value = params.xRightClip2;
	} else {
		dClipping1 = params.dClipping1;
		dClipping2 = params.dClipping2;
		flrClipping1 = params.flrClipping1;
		flrClipping2 = params.flrClipping2;
		xLeftClip1 = params.xLeftClip1;
		xRightClip1 = params.xRightClip1;
		xLeftClip2 = params.xLeftClip2;
		xRightClip2 = params.xRightClip2;
	}


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
	material.needsUpdate = true;
 
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