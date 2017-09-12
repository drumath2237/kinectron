// Run with simplehttpserver for image to load properly. http://www.andyjamesdavies.com/blog/javascript/simple-http-server-on-mac-os-x-in-seconds

var myCanvas = null;
var beach;
var image1;
var image2;
var image1Loaded = false;
var overlap1 = false;
var overlap2 = false;
var image2Loaded = false;
var img;
var myDiv;
var image2XOffset = 460;

var processing = false;

// Declare Kinectron
var kinectron1 = null;
var kinectron2 = null;

var joints1 = null;
var joints2 = null;

var feetTouching = false;
var handsTouching = false;
var flashBackground = false;

function setup() {
  myCanvas = createCanvas(1420, 650);
  background(255);

  // Define and create an instance of kinectron
  var kinectronIpAddress1 = "172.16.222.247"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron1 = new Kinectron(kinectronIpAddress1);
  kinectron1.makeConnection();
  kinectron1.startMultiFrame(["key"], multiCallback1);

  var kinectronIpAddress2 = "172.16.236.174"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron2 = new Kinectron(kinectronIpAddress2);
  kinectron2.makeConnection();
  kinectron2.startMultiFrame(["key"], multiCallback2);

  image1 = new Image;
  image2 = new Image;

}

function multiCallback1(data) {
  if (data.key) {
    loadImage(data.key, function(loadedImage) {
      if (!image1Loaded) image1Loaded = true;
      image1 = loadedImage;
    });
  }

  if (data.keyBody) {
    joints1 = data.keyBody.joints;
  } 
}

function multiCallback2(data) {
  if (data.key) {
    loadImage(data.key, function(loadedImage) {
      if (!image2Loaded) image2Loaded = true;
      image2 = loadedImage;
    });
  }

  if (data.keyBody) {
    joints2 = data.keyBody.joints;
  } 
}


function draw() {

  if (handsTouching) {
    background(0,10);
    var color1 = color(142,12,232);
    var color2 = color(255,0,0);
    drawAllJoints(joints1, color1, 0);
    drawAllJoints(joints2, color2, image2XOffset);
  } else if (feetTouching) {
    background(random(255), random(255), random(255)); 
    if (image1Loaded) image(image1,0,0);
    if (image2Loaded) image(image2, image2XOffset,0);  
  } else { 
    background(255,1);
    if (image1Loaded) image(image1,0,0);
    if (image2Loaded) image(image2, image2XOffset,0);  
  }

  if (joints1 && joints2) {
    //check hands and feet
    handsTouching = checkLandR(7, 11);
    feetTouching = checkLandR(15, 19);
  }
}



function checkLandR(left, right) {
    var p1L = getJointLocation(joints1[left], 0);
    var p2L = getJointLocation(joints2[left], image2XOffset);

    var p1R = getJointLocation(joints1[right], 0);
    var p2R = getJointLocation(joints2[right], image2XOffset);

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

function drawAllJoints(joints, c, xOffset) {
  noStroke();
  for (var j = 0; j < joints.length; j++) {
    var newJoint = getJointLocation(joints[j], xOffset);
    fill(c);
    ellipse(newJoint.x, newJoint.y, 10,10);
  }
}

function getJointLocation(joint, xOffset) {
  var newJoint = {};
  newJoint.x = xOffset + (joint.colorX * 960); // offset image x
  newJoint.y = joint.colorY * 540;
  fill(255,0,0);
  //ellipse(newJoint.x, newJoint.y, 50, 50);
  //text(newJoint.x, newJoint.x, newJoint.y, 30,30);
  return newJoint;
}

function checkCollisions(j1, j2) {
  var diffX = Math.abs(j1.x - j2.x);
  var diffY = Math.abs(j1.y - j2.y);
  if ( (diffX < 100) && (diffY < 100)) {
    return true;
  } else {
    return false;
  }
}

function checkOverlap(pixels, img) {
  for (var i = 0; i < pixels.length; i+=4) {
    if (pixels[i] > 0) {
      return true;
    }
  }
  return false;
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (kinectron1) kinectron1.stopAll();
    if (kinectron2) kinectron2.stopAll();
  }  
}

