/**
 * Started with 
 * Bezier Ribbons by Felix Turner
 * www.airtight.cc
 *
 * Continous Bezier Ribbons
 *
 */
if(!Detector.webgl)
	Detector.addGetWebGLMessage();

// Declare kinectron
var kinectron1 = null;
var kinectron2 = null;

var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, material, container;

var ribbonGroupArray1 = [];

var ribbonGroupArray2 = [];

init();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 400;
	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0xff0000 );
	scene.add(camera);
	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias : true,
		sortObjects : false
	});

	renderer.setClearColorHex( 0xFB6082, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);

	container.appendChild(renderer.domElement);
	
	initKinectron();

	// stop the user getting a text cursor
	document.onselectStart = function() {
		return false;
	};

	//add debug box
	// var redWireMat = new THREE.MeshBasicMaterial({
	// color : 0xFF0000,
	// wireframe : true
	// });
	//
	// var box = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), redWireMat);
	// scene.add(box);

	// create Ribbon for each joint
	for (var i = 0; i < 5; i++) {
		//add ribbon group
		var newRibbonGroup = new RibbonGroup(0,0,0);
		newRibbonGroup.init();

		ribbonGroupArray1.push(newRibbonGroup); 
	}

	for (var i = 0; i < 5; i++) {
		//add ribbon group
		var newRibbonGroup = new RibbonGroup(0,0,0);
		newRibbonGroup.init();

		ribbonGroupArray2.push(newRibbonGroup); 
	}


	//add stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', onKeyDown, false);
	onWindowResize(null);
	animate();

}

function drawJoints1(data) {
  //console.log(data);

  ribbonGroupArray1[0].update(data.joints[kinectron1.HEAD].cameraX * window.innerWidth/4,
  	data.joints[kinectron1.HEAD].cameraY * window.innerHeight/4,
  	data.joints[kinectron1.HEAD].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray1[1].update(data.joints[kinectron1.HANDLEFT].cameraX * window.innerWidth/4,
  	data.joints[kinectron1.HANDLEFT].cameraY * window.innerHeight/4,
  	data.joints[kinectron1.HANDLEFT].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray1[2].update(data.joints[kinectron1.FOOTLEFT].cameraX * window.innerWidth/4,
  	data.joints[kinectron1.FOOTLEFT].cameraY * window.innerHeight/4,
  	data.joints[kinectron1.FOOTLEFT].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray1[3].update(data.joints[kinectron1.HANDRIGHT].cameraX * window.innerWidth/4,
  	data.joints[kinectron1.HANDRIGHT].cameraY * window.innerHeight/4,
  	data.joints[kinectron1.HANDRIGHT].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray1[4].update(data.joints[kinectron1.FOOTRIGHT].cameraX * window.innerWidth/4,
  	data.joints[kinectron1.FOOTRIGHT].cameraY * window.innerHeight/4,
  	data.joints[kinectron1.FOOTRIGHT].cameraZ * -window.innerWidth/4
  );

}

function drawJoints2(data) {
  //console.log(data);

  ribbonGroupArray2[0].update(data.joints[kinectron2.HEAD].cameraX * window.innerWidth/4,
  	data.joints[kinectron2.HEAD].cameraY * window.innerHeight/4,
  	data.joints[kinectron2.HEAD].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray2[1].update(data.joints[kinectron2.HANDLEFT].cameraX * window.innerWidth/4,
  	data.joints[kinectron2.HANDLEFT].cameraY * window.innerHeight/4,
  	data.joints[kinectron2.HANDLEFT].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray2[2].update(data.joints[kinectron2.FOOTLEFT].cameraX * window.innerWidth/4,
  	data.joints[kinectron2.FOOTLEFT].cameraY * window.innerHeight/4,
  	data.joints[kinectron2.FOOTLEFT].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray2[3].update(data.joints[kinectron2.HANDRIGHT].cameraX * window.innerWidth/4,
  	data.joints[kinectron2.HANDRIGHT].cameraY * window.innerHeight/4,
  	data.joints[kinectron2.HANDRIGHT].cameraZ * -window.innerWidth/4
  );

  ribbonGroupArray2[4].update(data.joints[kinectron2.FOOTRIGHT].cameraX * window.innerWidth/4,
  	data.joints[kinectron2.FOOTRIGHT].cameraY * window.innerHeight/4,
  	data.joints[kinectron2.FOOTRIGHT].cameraZ * -window.innerWidth/4
  );
}

function initKinectron() {
	// Define and create an instance of kinectron
	//var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
	kinectron1 = new Kinectron("10.0.1.14");

	// Connect remote to application
	kinectron1.makeConnection();
	kinectron1.startTrackedBodies(drawJoints1);

	kinectron2 = new Kinectron("10.0.1.4");

	// Connect remote to application
	kinectron2.makeConnection();
	kinectron2.startTrackedBodies(drawJoints2);
}

window.addEventListener('keydown', function(){
  kinectron1.stopAll();
  kinectron2.stopAll();

});


function onKeyDown(event) {
	if(event.keyCode == '32') {
		ribbonGroup.toggleWireframe();
	}
}

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onWindowResize(event) {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	render();
	stats.update();
}

function render() {

	//camera.position.x += (mouseX - camera.position.x ) * .1;
	//camera.position.y += (-mouseY - camera.position.y ) * .1;
	//camera.rotation.y += 1;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);

}

$(window).mousewheel(function(event, delta) {
	//set camera Z
	camera.position.z -= delta * 50;
});