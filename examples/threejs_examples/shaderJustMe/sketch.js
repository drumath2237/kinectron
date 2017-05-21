if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var kinectron1;

var scene, camera, light, renderer;
var geometry, cube, mesh, material;
var mouse, center;
var stats;

var video, texture;

// Use two canvases to draw incoming feeds
var canvas; 
var ctx; 

// set a fixed 2:1 for the images
var CANVW = 512;
var CANVH = 424;
var busy = false;

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
  // var img1 = new Image();
  //console.log(data.depthColor);

  // Image data needs to be draw to img element before canvas
  var img1 = new Image();

  img1.src = data.depthColor; // get color image from kinectron data

  img1.onload = function() {
    ctx.clearRect(0, 0, CANVW, CANVH);
    ctx.drawImage(img1, 0, 0, CANVW, CANVH);  
  };
  
 	setTimeout(function() {
 	  busy = false;
 	});
}


window.addEventListener('keydown', function(event){
  if (event.keyCode === 57) {
  	kinectron1.stopAll();
	}
});

function init() {


	container = document.createElement( 'div' );
	document.body.appendChild( container );

  //img1 = document.getElementById('img1');
  //img2 = document.getElementById('img2');

	var info = document.createElement( 'div' );
	info.id = 'info';
	document.body.appendChild( info );

	//stats = new Stats();
	//container.appendChild( stats.dom );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 4000 );
	//camera.rotation.set(0.11639884595226276, 0.6728316199258655, -0.07274093109639534);

	//camera.lookAt(0,0,0);

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

	//controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls = new THREE.OrbitControls(camera);
	//controls.autoRotate = true;
	//controls.autoRotateSpeed = 0.5;

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

}

function createKinectImg1() {

		// Setup canvas and context
		canvas = document.getElementById('canvas1');    
		canvas.width = CANVW;
		canvas.height = CANVH;
		ctx = canvas.getContext('2d');

		texture = new THREE.Texture(canvas);
		texture.minFilter = THREE.NearestFilter;

		var width = 512, height = 424;
		var nearClipping = 850, farClipping = 4000;

		geometry = new THREE.BufferGeometry();

		var vertices = new Float32Array( width * height * 3 );

		for ( var i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

			vertices[ i ] = j % width;
			vertices[ i + 1 ] = Math.floor( j / width );

		}

		geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

		material = new THREE.ShaderMaterial( {

			uniforms: {

				"map":          { value: texture },
				"width":        { value: width },
				"height":       { value: height },
				"nearClipping": { value: nearClipping },
				"farClipping":  { value: farClipping },
				"dClipping": 		{ value: 0.51 },
				"dClippingFar": { value: 0.6 },
				

				"pointSize":    { value: 2 },
				"zOffset":      { value: 3000 },
				"xOffset": 			{ value: 0 },
        "xLeftClip":    { value: 0.2 }, //0.2
        "xRightClip":   { value: 0.8 }, //0.6
        "yBottomClip":    { value: 0.28 },
        "yTopClip":    { value: 0.9 }
        
			},
			vertexShader: document.getElementById( 'vs' ).textContent,
			fragmentShader: document.getElementById( 'fs' ).textContent,
			blending: THREE.AdditiveBlending,
			depthTest: false, depthWrite: false,
			transparent: true

		} );

		mesh = new THREE.Points( geometry, material );
		mesh.rotation.y = 6.0;
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

  requestAnimationFrame( animate );

	render();
	//stats.update();

}

function render() {

	//camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
	//camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
	//camera.lookAt( center );
	//mesh.rotation.y +=0.001;
	//console.log(mesh.rotation.y);
	//console.log(mesh);
	//debugger;
	controls.update();
	//console.log(camera.position.x, camera.position.y, camera.position.z);
	//console.log(camera.position.z);
	renderer.render( scene, camera );

}