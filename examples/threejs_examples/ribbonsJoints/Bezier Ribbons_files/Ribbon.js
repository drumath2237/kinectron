var Ribbon = function(hue, ribbonGroup) {

	//number of ribbonCurves per ribbon
	this.NUMCURVES = 15;
	this.RIBBONWIDTH = 20;
	//lower -> faster
	this.CURVERESOLUTION = 3;
	this.pts = [];
	this.curves = [];
	this.stepId = 0;
	this.ribbonGroup = ribbonGroup;

	this.material = new THREE.MeshBasicMaterial({
		color : 0xffffff,
		opacity : 0.3,
		blending : THREE.AdditiveBlending,
		depthTest : false,
		transparent : true,
		wireframe : false

	});

	this.material.color.setHSV(hue, 1, 1);

	this.pts.push(this.getRandPt());
	this.pts.push(this.getRandPt());
	this.pts.push(this.getRandPt());

	this.addRibbonCurve();
};

Ribbon.prototype.toggleWireframe = function(){
	
	this.material.wireframe = !this.material.wireframe;
}

Ribbon.prototype.getRandPt = function() {
	return this.ribbonGroup.ribbonTarget.clone().addSelf(ATUtil.getRandVec3D(-this.ribbonGroup.ribbonSeparation, this.ribbonGroup.ribbonSeparation));
}

Ribbon.prototype.update = function() {

	this.currentCurve.addSegment();

	if(this.curves.length > this.NUMCURVES - 1) {
		this.curves[0].removeSegment();
	}
	this.stepId++;

	if(this.stepId > this.CURVERESOLUTION) {
		this.addRibbonCurve();
	}

}

Ribbon.prototype.addRibbonCurve = function() {

	//add new point
	var p3d = this.getRandPt();
	this.pts.push(p3d);

	var nextPt = this.pts[this.pts.length - 1];
	var curPt = this.pts[this.pts.length - 2];
	var lastPt = this.pts[this.pts.length - 3];
	var lastMidPt = new THREE.Vector3((curPt.x + lastPt.x) / 2, (curPt.y + lastPt.y) / 2, (curPt.z + lastPt.z) / 2);
	var midPt = new THREE.Vector3((curPt.x + nextPt.x) / 2, (curPt.y + nextPt.y) / 2, (curPt.z + nextPt.z) / 2);

	this.currentCurve = new RibbonCurve(lastMidPt, midPt, curPt, this.RIBBONWIDTH, this.CURVERESOLUTION, this.material, this.ribbonGroup);
	this.curves.push(this.currentCurve);

	//remove old curves
	if(this.curves.length > this.NUMCURVES) {
		var c = this.curves.shift();
		c.remove();
	}

	this.stepId = 0;

}