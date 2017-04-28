// Run with simplehttpserver for image to load properly. http://www.andyjamesdavies.com/blog/javascript/simple-http-server-on-mac-os-x-in-seconds

var myCanvas = null;
var beach;
var img;
var myDiv;

var processing = false;

// Declare Kinectron
var kinectron = null;

function preload() {
  beach = loadImage("images/Beach1.jpg");
}

function setup() {
  myCanvas = createCanvas(1920, 1080);
  background(255);

  // Define and create an instance of kinectron
  var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron();

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Create connection between remote and application
  kinectron.makeConnection();

  // Start the greenscreen camera
  kinectron.startKey(goToBeach);
}

function draw() {

}

function goToBeach(img) {
  loadImage(img.src, function(loadedImage) {
    image(beach, 0, 0);
    image(loadedImage, 0, 0);
  });
}