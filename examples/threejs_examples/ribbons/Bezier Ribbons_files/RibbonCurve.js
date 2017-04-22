var RibbonCurve = function(pStartPt, pEndPt, pControlPt, pwidth, presolution, pMaterial) {
	this.startPt = pStartPt;
	this.endPt = pEndPt;
	this.controlPt = pControlPt;
	this.resolution = presolution;
	this.ribbonWidth = pwidth;
	this.stepId = 0;
	this.material = pMaterial;
	this.quads = [];
}

RibbonCurve.prototype.removeSegment = function() {
	if(this.quads.length > 0) {
		var quad = this.quads.shift();
		ribbonGroup.ribbonHolder.remove(quad);
	}
}

RibbonCurve.prototype.addSegment = function() {

	var t = this.stepId / this.resolution;
	var p0 = this.getOffsetPoint(t, 0);
	var p3 = this.getOffsetPoint(t, this.ribbonWidth);
	this.stepId++;
	if(this.stepId > this.resolution) {
		return;
	}
	var t = this.stepId / this.resolution;
	var p1 = this.getOffsetPoint(t, 0);
	var p2 = this.getOffsetPoint(t, this.ribbonWidth);
	var q = new Quad(p0, p1, p2, p3);

	//FIXME - reuse quads
	var quad = new THREE.Mesh(q, this.material);
	quad.doubleSided = true;
	quad.autoUpdateMatrix = false;

	ribbonGroup.ribbonHolder.add(quad);
	this.quads.push(quad);

}
/**
 * Given a bezier curve defined by 3 points, an offset distance (k) and a time (t), returns a position
 */

RibbonCurve.prototype.getOffsetPoint = function(t, k) {

	//FIXME dupe vars
	var p0 = this.startPt;
	var p1 = this.controlPt;
	var p2 = this.endPt;

	var xt = (1 - t ) * (1 - t ) * p0.x + 2 * t * (1 - t ) * p1.x + t * t * p2.x;
	var yt = (1 - t ) * (1 - t ) * p0.y + 2 * t * (1 - t ) * p1.y + t * t * p2.y;
	var zt = (1 - t ) * (1 - t ) * p0.z + 2 * t * (1 - t ) * p1.z + t * t * p2.z;

	var xd = t * (p0.x - 2 * p1.x + p2.x) - p0.x + p1.x;
	var yd = t * (p0.y - 2 * p1.y + p2.y) - p0.y + p1.y;
	var zd = t * (p0.z - 2 * p1.z + p2.z) - p0.z + p1.z;
	var dd = Math.pow(xd * xd + yd * yd + zd * zd, 1 / 3);

	return new THREE.Vector3(xt + (k * yd ) / dd, yt - (k * xd ) / dd, zt - (k * xd ) / dd);

}

RibbonCurve.prototype.remove = function() {
	//TODO -cleanup
}