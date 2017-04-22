/**
 *
 * Bezier Ribbons by Felix Turner
 * www.airtight.cc
 *
 * Continous Bezier Ribbons
 *
 */
if(!Detector.webgl)
	Detector.addGetWebGLMessage();

var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, material, container;

var ribbonGroup, ribbonGroup2;

init();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 400;
	scene = new THREE.Scene();
	scene.add(camera);
	renderer = new THREE.WebGLRenderer({
		antialias : true,
		sortObjects : false
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	container.appendChild(renderer.domElement);
	
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

	//add ribbon group
	ribbonGroup = new RibbonGroup(0,0,0);
	ribbonGroup.init();

	ribbonGroup2 = new RibbonGroup(10000,0,0);
	ribbonGroup2.init();

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
	ribbonGroup.update();
	ribbonGroup2.update();
	camera.position.x += (mouseX - camera.position.x ) * .1;
	camera.position.y += (-mouseY - camera.position.y ) * .1;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);

}

$(window).mousewheel(function(event, delta) {
	//set camera Z
	camera.position.z -= delta * 50;
});