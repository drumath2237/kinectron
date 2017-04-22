// declare kinectron 
var kinectron1, kinectron2;

// lines for skeleton
var lines1 = [];
var lines2 = [];
//var line, line1, line2, line3, line4, line5, line6, line7, line8, line9;

// do you want to see the skeleton? 
var skeletonVisible = true;

// how much to scale skeleton by
var scaleDiv = 200;


function initKinectron() {

	// create skeleton 1
	lines1 = initSkeleton();
	lines2 = initSkeleton();

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

var materialLine;
function initSkeleton() {
	var lines = [];

	// use basic line material for skeleton lines *line width doesn't work on Windows
	materialLine = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
	console.log(materialLine);
	// start lines at random positions

	// one line for spine and left leg 

	var geometryLine = new THREE.Geometry();
	geometryLine.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));

	var line = new THREE.Line(geometryLine, materialLine);
	line.visible = skeletonVisible;
	scene.add(line);
	lines.push(line);

	// one line for left arm

	var geometryLine1 = new THREE.Geometry();
	geometryLine1.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine1.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine1.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine1.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine1.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line1 = new THREE.Line(geometryLine1, materialLine);
	line1.visible = skeletonVisible;
	scene.add(line1);
	lines.push(line1);

	// one line for right arm

	var geometryLine2 = new THREE.Geometry();
	geometryLine2.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine2.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine2.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine2.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine2.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line2 = new THREE.Line(geometryLine2, materialLine);
	line2.visible = skeletonVisible;
	scene.add(line2);
	lines.push(line2);

	// one line for right leg

	var geometryLine3 = new THREE.Geometry();
	geometryLine3.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine3.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine3.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine3.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine3.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line3 = new THREE.Line(geometryLine3, materialLine);
	line3.visible = skeletonVisible;
	scene.add(line3);
	lines.push(line3);

	// another line for left leg

	var geometryLine4 = new THREE.Geometry();
	geometryLine4.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine4.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine4.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine4.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line4 = new THREE.Line(geometryLine4, materialLine);
	line4.visible = skeletonVisible;
	scene.add(line4);
	lines.push(line4);

	// another line for right leg

	var geometryLine5 = new THREE.Geometry();
	geometryLine5.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine5.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine5.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine5.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line5 = new THREE.Line(geometryLine5, materialLine);
	line5.visible = skeletonVisible;
	scene.add(line5);
	lines.push(line5);

	// another line for left arm

	var geometryLine6 = new THREE.Geometry();
	geometryLine6.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine6.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine6.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine6.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line6 = new THREE.Line(geometryLine6, materialLine);
	line6.visible = skeletonVisible;
	scene.add(line6);
	lines.push(line6);

	// another line for right arm

	var geometryLine7 = new THREE.Geometry();
	geometryLine7.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine7.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine7.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine7.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line7 = new THREE.Line(geometryLine7, materialLine);
	line7.visible = skeletonVisible;
	scene.add(line7);
	lines.push(line7);

	// another line for torsoe 

	var geometryLine8 = new THREE.Geometry();
	geometryLine8.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine8.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine8.vertices.push(new THREE.Vector3(1, 0, 0));
	geometryLine8.vertices.push(new THREE.Vector3(1, 0, 0));
	
	var line8 = new THREE.Line(geometryLine8, materialLine);
	line8.visible = skeletonVisible;
	scene.add(line8);
	lines.push(line8);

	// another line for head 

	var geometryLine9 = new THREE.Geometry();
	geometryLine9.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometryLine9.vertices.push(new THREE.Vector3(0, 1, 0));
	geometryLine9.vertices.push(new THREE.Vector3(1, 0, 0));

	var line9 = new THREE.Line(geometryLine9, materialLine);
	line9.visible = skeletonVisible;
	scene.add(line9);
	lines.push(line9);

	return lines;
}





function checkLandR(left, right) {
    var p1L = getJointLocation(jointPositions1[left]);
    var p2L = getJointLocation(jointPositions2[left]);

    var p1R = getJointLocation(jointPositions1[right]);
    var p2R = getJointLocation(jointPositions2[right]);

    var col1 = checkCollisions(p1L, p2L);
    var col2 = checkCollisions(p1L, p2R);
    var col3 = checkCollisions(p1R, p2L);
    var col4 = checkCollisions(p1R, p2R);

    // console.log(col1, col2, col3, col4);
  
    if (col1 || col2 || col3 || col4) {
      return true;
    } else { 
      return false;
    }
}

function getJointLocation(joint) {
  var newJoint = new THREE.Vector3( joint.cameraX, joint.cameraY, joint.cameraZ );
  return newJoint;
}

function checkCollisions(j1, j2) {
	var dist = j1.distanceTo(j2);

  if ( dist < 100 ) {
    return true;
  } else {
    return false;
  }

}


function drawJoints1(data) {

	// scale the joints to screen
  jointPositions1 = scaleSkeleton(data);
  
  // draw the lines of skeleton
  drawJoints(lines1, jointPositions1);

}

function drawJoints2(data) {

	// scale the joints to screen
	jointPositions2 = scaleSkeleton(data);

 	// draw the lines of skeleton
  drawJoints(lines2, jointPositions2);
 
}

function scaleSkeleton(data) {
	// scale skeleton to scene

	for (var m = 0; m < data.joints.length; m++) {
		data.joints[m].cameraX *= window.innerWidth/4;
		data.joints[m].cameraY *= window.innerHeight/4;
		data.joints[m].cameraZ *= -window.innerWidth/4;
	}

	return data.joints;
}

function drawJoints(lines, joints) { 

	// update line skeleton with incoming joint data
	
	// spine and left leg 

	lines[0].geometry.vertices[0].x = joints[3].cameraX;
	lines[0].geometry.vertices[0].y = joints[3].cameraY;
	lines[0].geometry.vertices[0].z = joints[3].cameraZ;

	lines[0].geometry.vertices[1].x = joints[2].cameraX;
	lines[0].geometry.vertices[1].y = joints[2].cameraY;
	lines[0].geometry.vertices[1].z = joints[2].cameraZ;

	lines[0].geometry.vertices[2].x = joints[20].cameraX;
	lines[0].geometry.vertices[2].y = joints[20].cameraY;
	lines[0].geometry.vertices[2].z = joints[20].cameraZ;

	lines[0].geometry.vertices[3].x = joints[1].cameraX;
	lines[0].geometry.vertices[3].y = joints[1].cameraY;
	lines[0].geometry.vertices[3].z = joints[1].cameraZ;

	lines[0].geometry.vertices[4].x = joints[0].cameraX;
	lines[0].geometry.vertices[4].y = joints[0].cameraY;
	lines[0].geometry.vertices[4].z = joints[0].cameraZ;

	lines[0].geometry.vertices[5].x = joints[12].cameraX;
	lines[0].geometry.vertices[5].y = joints[12].cameraY;
	lines[0].geometry.vertices[5].z = joints[12].cameraZ;

	lines[0].geometry.vertices[6].x = joints[13].cameraX;
	lines[0].geometry.vertices[6].y = joints[13].cameraY;
	lines[0].geometry.vertices[6].z = joints[13].cameraZ;

	lines[0].geometry.vertices[5].x = joints[14].cameraX;
	lines[0].geometry.vertices[5].y = joints[14].cameraY;
	lines[0].geometry.vertices[5].z = joints[14].cameraZ;

	lines[0].geometry.vertices[6].x = joints[15].cameraX;
	lines[0].geometry.vertices[6].y = joints[15].cameraY;
	lines[0].geometry.vertices[6].z = joints[15].cameraZ;

	// left arm 

	lines[1].geometry.vertices[0].x = joints[20].cameraX;
	lines[1].geometry.vertices[0].y = joints[20].cameraY;
	lines[1].geometry.vertices[0].z = joints[20].cameraZ;

	lines[1].geometry.vertices[1].x = joints[4].cameraX;
	lines[1].geometry.vertices[1].y = joints[4].cameraY;
	lines[1].geometry.vertices[1].z = joints[4].cameraZ;

	lines[1].geometry.vertices[2].x = joints[5].cameraX;
	lines[1].geometry.vertices[2].y = joints[5].cameraY;
	lines[1].geometry.vertices[2].z = joints[5].cameraZ;

	lines[1].geometry.vertices[3].x = joints[5].cameraX;
	lines[1].geometry.vertices[3].y = joints[5].cameraY;
	lines[1].geometry.vertices[3].z = joints[5].cameraZ;

	lines[1].geometry.vertices[4].x = joints[7].cameraX;
	lines[1].geometry.vertices[4].y = joints[7].cameraY;
	lines[1].geometry.vertices[4].z = joints[7].cameraZ;

	// right arm 

	lines[2].geometry.vertices[0].x = joints[20].cameraX;
	lines[2].geometry.vertices[0].y = joints[20].cameraY;
	lines[2].geometry.vertices[0].z = joints[20].cameraZ;

	lines[2].geometry.vertices[1].x = joints[8].cameraX;
	lines[2].geometry.vertices[1].y = joints[8].cameraY;
	lines[2].geometry.vertices[1].z = joints[8].cameraZ;

	lines[2].geometry.vertices[2].x = joints[9].cameraX;
	lines[2].geometry.vertices[2].y = joints[9].cameraY;
	lines[2].geometry.vertices[2].z = joints[9].cameraZ;

	lines[2].geometry.vertices[3].x = joints[10].cameraX;
	lines[2].geometry.vertices[3].y = joints[10].cameraY;
	lines[2].geometry.vertices[3].z = joints[10].cameraZ;

	lines[2].geometry.vertices[4].x = joints[11].cameraX;
	lines[2].geometry.vertices[4].y = joints[11].cameraY;
	lines[2].geometry.vertices[4].z = joints[11].cameraZ;

	// right leg 

	lines[3].geometry.vertices[0].x = joints[0].cameraX;
	lines[3].geometry.vertices[0].y = joints[0].cameraY;
	lines[3].geometry.vertices[0].z = joints[0].cameraZ;

	lines[3].geometry.vertices[1].x = joints[16].cameraX;
	lines[3].geometry.vertices[1].y = joints[16].cameraY;
	lines[3].geometry.vertices[1].z = joints[16].cameraZ;

	lines[3].geometry.vertices[2].x = joints[17].cameraX;
	lines[3].geometry.vertices[2].y = joints[17].cameraY;
	lines[3].geometry.vertices[2].z = joints[17].cameraZ;

	lines[3].geometry.vertices[3].x = joints[18].cameraX;
	lines[3].geometry.vertices[3].y = joints[18].cameraY;
	lines[3].geometry.vertices[3].z = joints[18].cameraZ;

	lines[3].geometry.vertices[4].x = joints[19].cameraX;
	lines[3].geometry.vertices[4].y = joints[19].cameraY;
	lines[3].geometry.vertices[4].z = joints[19].cameraZ;


	// additional left leg 

	lines[4].geometry.vertices[0].x = joints[kinectron1.FOOTLEFT].cameraX;
	lines[4].geometry.vertices[0].y = joints[kinectron1.FOOTLEFT].cameraY;
	lines[4].geometry.vertices[0].z = joints[kinectron1.FOOTLEFT].cameraZ;

	lines[4].geometry.vertices[1].x = joints[kinectron1.KNEELEFT].cameraX;
	lines[4].geometry.vertices[1].y = joints[kinectron1.KNEELEFT].cameraY;
	lines[4].geometry.vertices[1].z = joints[kinectron1.KNEELEFT].cameraZ;

	lines[4].geometry.vertices[2].x = joints[kinectron1.HIPLEFT].cameraX;
	lines[4].geometry.vertices[2].y = joints[kinectron1.HIPLEFT].cameraY;
	lines[4].geometry.vertices[2].z = joints[kinectron1.HIPLEFT].cameraZ;

	lines[4].geometry.vertices[3].x = joints[kinectron1.FOOTLEFT].cameraX;
	lines[4].geometry.vertices[3].y = joints[kinectron1.FOOTLEFT].cameraY;
	lines[4].geometry.vertices[3].z = joints[kinectron1.FOOTLEFT].cameraZ;

	// additional right leg 

	lines[5].geometry.vertices[0].x = joints[kinectron1.FOOTRIGHT].cameraX;
	lines[5].geometry.vertices[0].y = joints[kinectron1.FOOTRIGHT].cameraY;
	lines[5].geometry.vertices[0].z = joints[kinectron1.FOOTRIGHT].cameraZ;

	lines[5].geometry.vertices[1].x = joints[kinectron1.KNEERIGHT].cameraX;
	lines[5].geometry.vertices[1].y = joints[kinectron1.KNEERIGHT].cameraY;
	lines[5].geometry.vertices[1].z = joints[kinectron1.KNEERIGHT].cameraZ;

	lines[5].geometry.vertices[2].x = joints[kinectron1.HIPRIGHT].cameraX;
	lines[5].geometry.vertices[2].y = joints[kinectron1.HIPRIGHT].cameraY;
	lines[5].geometry.vertices[2].z = joints[kinectron1.HIPRIGHT].cameraZ;

	lines[5].geometry.vertices[3].x = joints[kinectron1.FOOTRIGHT].cameraX;
	lines[5].geometry.vertices[3].y = joints[kinectron1.FOOTRIGHT].cameraY;
	lines[5].geometry.vertices[3].z = joints[kinectron1.FOOTRIGHT].cameraZ;

	// additional left arm 

	lines[6].geometry.vertices[0].x = joints[kinectron1.HANDTIPLEFT].cameraX;
	lines[6].geometry.vertices[0].y = joints[kinectron1.HANDTIPLEFT].cameraY;
	lines[6].geometry.vertices[0].z = joints[kinectron1.HANDTIPLEFT].cameraZ;

	lines[6].geometry.vertices[1].x = joints[kinectron1.SHOULDERLEFT].cameraX;
	lines[6].geometry.vertices[1].y = joints[kinectron1.SHOULDERLEFT].cameraY;
	lines[6].geometry.vertices[1].z = joints[kinectron1.SHOULDERLEFT].cameraZ;

	lines[6].geometry.vertices[2].x = joints[kinectron1.SPINESHOULDER].cameraX;
	lines[6].geometry.vertices[2].y = joints[kinectron1.SPINESHOULDER].cameraY;
	lines[6].geometry.vertices[2].z = joints[kinectron1.SPINESHOULDER].cameraZ;

	lines[6].geometry.vertices[3].x = joints[kinectron1.HANDTIPLEFT].cameraX;
	lines[6].geometry.vertices[3].y = joints[kinectron1.HANDTIPLEFT].cameraY;
	lines[6].geometry.vertices[3].z = joints[kinectron1.HANDTIPLEFT].cameraZ;

	// additional left arm 

	lines[7].geometry.vertices[0].x = joints[kinectron1.HANDTIPRIGHT].cameraX;
	lines[7].geometry.vertices[0].y = joints[kinectron1.HANDTIPRIGHT].cameraY;
	lines[7].geometry.vertices[0].z = joints[kinectron1.HANDTIPRIGHT].cameraZ;

	lines[7].geometry.vertices[1].x = joints[kinectron1.SHOULDERRIGHT].cameraX;
	lines[7].geometry.vertices[1].y = joints[kinectron1.SHOULDERRIGHT].cameraY;
	lines[7].geometry.vertices[1].z = joints[kinectron1.SHOULDERRIGHT].cameraZ;

	lines[7].geometry.vertices[2].x = joints[kinectron1.SPINESHOULDER].cameraX;
	lines[7].geometry.vertices[2].y = joints[kinectron1.SPINESHOULDER].cameraY;
	lines[7].geometry.vertices[2].z = joints[kinectron1.SPINESHOULDER].cameraZ;

	lines[7].geometry.vertices[3].x = joints[kinectron1.HANDTIPRIGHT].cameraX;
	lines[7].geometry.vertices[3].y = joints[kinectron1.HANDTIPRIGHT].cameraY;
	lines[7].geometry.vertices[3].z = joints[kinectron1.HANDTIPRIGHT].cameraZ;

	// additional torso 

	lines[8].geometry.vertices[0].x = joints[kinectron1.SPINEBASE].cameraX;
	lines[8].geometry.vertices[0].y = joints[kinectron1.SPINEBASE].cameraY;
	lines[8].geometry.vertices[0].z = joints[kinectron1.SPINEBASE].cameraZ;

	lines[8].geometry.vertices[1].x = joints[kinectron1.HIPLEFT].cameraX;
	lines[8].geometry.vertices[1].y = joints[kinectron1.HIPLEFT].cameraY;
	lines[8].geometry.vertices[1].z = joints[kinectron1.HIPLEFT].cameraZ;

	lines[8].geometry.vertices[2].x = joints[kinectron1.SPINESHOULDER].cameraX;
	lines[8].geometry.vertices[2].y = joints[kinectron1.SPINESHOULDER].cameraY;
	lines[8].geometry.vertices[2].z = joints[kinectron1.SPINESHOULDER].cameraZ;

	lines[8].geometry.vertices[3].x = joints[kinectron1.HIPRIGHT].cameraX;
	lines[8].geometry.vertices[3].y = joints[kinectron1.HIPRIGHT].cameraY;
	lines[8].geometry.vertices[3].z = joints[kinectron1.HIPRIGHT].cameraZ;

	// additional head 

	lines[9].geometry.vertices[0].x = joints[kinectron1.SHOULDERLEFT].cameraX;
	lines[9].geometry.vertices[0].y = joints[kinectron1.SHOULDERLEFT].cameraY;
	lines[9].geometry.vertices[0].z = joints[kinectron1.SHOULDERLEFT].cameraZ;

	lines[9].geometry.vertices[1].x = joints[kinectron1.HEAD].cameraX;
	lines[9].geometry.vertices[1].y = joints[kinectron1.HEAD].cameraY;
	lines[9].geometry.vertices[1].z = joints[kinectron1.HEAD].cameraZ;

	lines[9].geometry.vertices[2].x = joints[kinectron1.SHOULDERRIGHT].cameraX;
	lines[9].geometry.vertices[2].y = joints[kinectron1.SHOULDERRIGHT].cameraY;
	lines[9].geometry.vertices[2].z = joints[kinectron1.SHOULDERRIGHT].cameraZ;

	// update all skeleton lines 

	// line.geometry.verticesNeedUpdate = true;
	// line1.geometry.verticesNeedUpdate = true;
	// line2.geometry.verticesNeedUpdate = true;
	// line3.geometry.verticesNeedUpdate = true;
	// line4.geometry.verticesNeedUpdate = true;

}
