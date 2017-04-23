var kinectron1, kinectron2;
var handsTouching = false;
var hipsTouching = false;

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var container, stats;
var camera, scene, renderer, controls;

var particles, particle, count = 0;

var joints1 = [];
var joints2 = [];

var jointPositions1; 
var jointPositions2;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var down = true; 

init();
animate();

window.addEventListener('mousedown', function() {
	handsTouching = !handsTouching;
});

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.y = 100; //650
	camera.position.z = 2000;

	scene = new THREE.Scene();

	particles = new Array();

	var PI2 = Math.PI * 2;
	var material = new THREE.SpriteCanvasMaterial( {

		color: 0xffffff,
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 0.5, 0, PI2, true );
			context.fill();

		}

	} );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i ++ ] = new THREE.Sprite( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );

		}

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.dom );

	controls = new THREE.OrbitControls(camera);
	controls.autoRotate = false;
	controls.autoRotateSpeed = 1;

	// camera.lookAt(new THREE.Vector3(0,0,0));

	initKinectron();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}


function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}

}

//

function animate() {

	controls.update();

	if (jointPositions1 && jointPositions2) {


	  //check hands and hips
	  handsTouching = checkLandR(kinectron1.HANDLEFT, kinectron1.HANDRIGHT);
	  hipsTouching = checkCenter();

	 // feetTouching = checkLandR(15, 19);
	}

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	//camera.position.x += ( mouseX - camera.position.x ) * .05;
	//camera.position.y += ( - mouseY - camera.position.y ) * .05;
	//console.log(camera.position.x, camera.position.y, camera.position.z);

	if (jointPositions1 && jointPositions2) {
		//connectSkeletons(connectingLines, jointPositions1, jointPositions2);

		centralPos = getCenter();
		//camera.lookAt( centralPos );
		camera.lookAt(0,0,0);

	}
	
	if (hipsTouching) {
		triangleMat1.opacity = 0.5;
		triangleMat2.opacity = 0.5;
		triangleMat1.color.setHex( 0x80f0a6 );
		triangleMat2.color.setHex( 0xf080e9 );
		triangleMat1.blending = THREE.AdditiveBlending;
		triangleMat2.blending = THREE.AdditiveBlending;
		
		handsTouching = false;

	} else {
		triangleMat1.opacity = 1.0;
		triangleMat2.opacity = 1.0;
		triangleMat1.color.setHex( 0x8080f0 );
		triangleMat2.color.setHex( 0x8080f0 );

		triangleMat1.blending = THREE.NormalBlending;
		triangleMat2.blending = THREE.NormalBlending;
		
	}


	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i++ ];

			// lerp waves up and down on hand touch 
			if (!handsTouching) {
				var dest = new THREE.Vector3(particle.position.x, 0, particle.position.z);
				particle.position.lerp( dest, 0.1 );

				var scale = new THREE.Vector3( 1,1,1 );
				particle.scale.lerp( scale, 0.1 );

			} else {
				var posX = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
				var posY = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
					( Math.sin( ( iy + count ) * 0.5 ) * 50 );
				var posZ = particle.position.z;

				var newPos = new THREE.Vector3( posX, posY, posZ );
				particle.position.lerp( newPos, 0.1 );

				var scaleX = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
					( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

				var newScale = new THREE.Vector3( scaleX, scaleX, particle.scale.z );
				particle.scale.lerp( newScale, 0.1);

			}

			
			

		}

	}

	renderer.render( scene, camera );

	count += 0.1;

}