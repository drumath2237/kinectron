//THREE.JS
	var threeJSContainer;
	var stats;
	
	var width = 900, height = 400;
	var camera, scene, renderer;

	// elmo
	var elmoGeo, elmoTex, elmoMat;
	var elmoRigGeo, elmoRig, elmoBone;
	var elmoSuit;
	var mouthStep=1;
	var elmoAdjustJoints = [];

	var lengthForRot, rotForJoint;

	var textureLoaded = false, characterBuilt = false;

	var joints = [];
	var jointsPos = [
		new THREE.Vector3(0, 4, 0),			//neck
		new THREE.Vector3(0, -4, 0),		//body
		new THREE.Vector3(15, 4, 0),		//HR1
		new THREE.Vector3(10, 4, 0),		//HR2
		new THREE.Vector3(-15, 4, 0),		//HL1
		new THREE.Vector3(-10, 4, 0),		//HL2
		new THREE.Vector3(2, -18.5, 0),		//LR1
		new THREE.Vector3(2, -12, 0),		//LR2
		new THREE.Vector3(-2, -18.5, 0),	//LL1
		new THREE.Vector3(-2, -12, 0)		//LL2
	];

	var my_stream = null;
			
	var modelWidth = 15;
	var modelHeight = 15;
	var kinectJoints = [];

				var jIndex = 0;
				var depth = -20;

	var x = -1;
	var y = -1;

	var px = -1;
	var py = -1;

window.addEventListener('load', init);			


function init() {
	initKinectron();
	initThreeJS();
}

function initKinectron() {
  kinectron = new Kinectron();
  kinectron.makeConnection();
  kinectron.startTrackedBodies(gotBodies);
}


function initThreeJS() {
	console.log("initThreeJS");

	//SET_UP
		threeJSContainer = document.getElementById('charactercanvas');

		camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 10000);
		camera.position.set(0,0,80);

		scene = new THREE.Scene();

		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight.position.set( 1, 1, 0 );
		scene.add( directionalLight );

		directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set( 0.3, 0, 1 );
		scene.add( directionalLight );

		directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight.position.set( -0.3, 0, -1 );
		scene.add( directionalLight );
	

	//JOINTS
		var jointGeo = new THREE.SphereGeometry(0.5, 8, 8);
		var jointMat = new THREE.MeshLambertMaterial({color: 0x01eed8});

		for(var i=0; i<jointsPos.length; i++){
			var j = new THREE.Mesh(jointGeo.clone(), jointMat);
			j.position.copy(jointsPos[i]);
			j.oriPos = (jointsPos[i]);
			joints.push(j);
			scene.add(j);

			var tV = new THREE.Vector3( jointsPos[i].x, jointsPos[i].z, jointsPos[i].y );
			elmoAdjustJoints.push(tV);
		}



	// ELMO
		elmoMat = new THREE.MeshLambertMaterial( {color: 0xff0000} );
		
		loadModelElmo("elmo8.js",elmoMat);
		
		elmoSuit = new THREE.Object3D();

	
	//RENDERER
		renderer = new THREE.WebGLRenderer( {antialias: true, alpha: true, opacity: .5} );
		renderer.setClearColor(0x000000, 0);
		renderer.sortObjects = false;
		renderer.autoClear = true;
		renderer.setSize( width, height );
		threeJSContainer.appendChild(renderer.domElement);


	animate();
}

function loadModelElmo (model, meshMat) {

	var loader = new THREE.JSONLoader();
	var eMat = meshMat;

	loader.load(model, function(geometry, material){

		for(var i=0; i<material.length; i++){
			var m = material[i];
			m.skinning = true;
			m.color = new THREE.Color( 0xff0000 );
		}

		var elmoMattt = new THREE.MeshFaceMaterial(material);
		elmoGeo = geometry;
		elmoRig = new THREE.SkinnedMesh(elmoGeo, elmoMattt);

		scene.add(elmoRig);

		// BONES_SETUP
		elmoBone = elmoRig.skeleton.bones;
	});
}

function gotBodies(body) {
		var inJoints = body.joints;

		for (var k = 0; k < inJoints.length; k++ ) {
			inJoints[k].cameraX *= modelWidth;
			inJoints[k].cameraY *= modelHeight;
		}
			// 
		setJoint(inJoints[3], 0);
		setJoint(inJoints[0], 1);
		setJoint(inJoints[23], 2);
		setJoint(inJoints[9], 3);
		setJoint(inJoints[21], 4);
		setJoint(inJoints[5], 5);
		setJoint(inJoints[19], 6);
		setJoint(inJoints[17], 7);
		setJoint(inJoints[15], 8);
		setJoint(inJoints[13], 9);

		function setJoint(joint, mJointNo) {
			joints[mJointNo].position.set(joint.cameraX, joint.cameraY, 0);
			elmoAdjustJoints[mJointNo].set(joint.cameraX, depth, -1*joint.cameraY);
		}

}

function animate() {
	requestAnimationFrame(animate);
	update();
	renderer.render(scene, camera);
}

function update(){


	// ELMO!
	if(elmoBone) {
		elmoBone[0].position.copy( joints[5].position.clone() );
		elmoBone[1].position.copy( joints[4].position.clone() );

		elmoBone[2].position.copy( joints[3].position.clone() );
		elmoBone[3].position.copy( joints[2].position.clone() );

		elmoBone[4].position.copy( joints[1].position.clone() );
		elmoBone[5].position.copy( joints[0].position.clone() );

		elmoBone[6].position.copy( joints[9].position.clone() );
		elmoBone[7].position.copy( joints[8].position.clone() );

		elmoBone[8].position.copy( joints[7].position.clone() );
		elmoBone[9].position.copy( joints[6].position.clone() );

		for(var i=0; i<elmoBone.length; i++){
			var offsetX;
			if(i==0) 		offsetX=joints[5].position.x+20;
			else if(i==1) 	offsetX=joints[4].position.x+20;
			else if(i==2) 	offsetX=joints[3].position.x+20;
			else if(i==3)	offsetX=joints[2].position.x+20;
			else if(i==4)	offsetX=joints[1].position.x+20;
			else if(i==5)	offsetX=joints[0].position.x+20;
			else if(i==6)	offsetX=joints[9].position.x+20;
			else if(i==7)	offsetX=joints[8].position.x+20;
			else if(i==8)	offsetX=joints[7].position.x+20;
			else			offsetX=joints[6].position.x+20;

			elmoBone[i].position.x = offsetX;
		}

		// ROTATION
		lengthForRot = elmoBone[3].position.distanceTo( elmoBone[2].position );
		rotForJoint = Math.asin( (elmoBone[3].position.y-elmoBone[2].position.y)/lengthForRot );
		elmoBone[3].rotation.y = rotForJoint;

		lengthForRot = elmoBone[2].position.distanceTo( elmoBone[5].position );
		rotForJoint = Math.asin( (elmoBone[2].position.y-elmoBone[5].position.y)/lengthForRot );
		elmoBone[2].rotation.y = rotForJoint;

		lengthForRot = elmoBone[1].position.distanceTo( elmoBone[0].position );
		rotForJoint = Math.asin( (elmoBone[1].position.y-elmoBone[0].position.y)/lengthForRot );
		elmoBone[1].rotation.y = -rotForJoint;

		lengthForRot = elmoBone[0].position.distanceTo( elmoBone[5].position );
		rotForJoint = Math.asin( (elmoBone[0].position.y-elmoBone[5].position.y)/lengthForRot );
		elmoBone[0].rotation.y = -rotForJoint;

	}
}
