var RibbonGroup = function(x,y,z) {

	this.RIBBONCOUNT = 2;
	this.SPREAD = 10;
	this.MAXSEPARATION = 30;
	this.ribbons = [];
	this.x = x;
	this.y = y;
	this.z = z;
	this.ribbonTarget = new THREE.Vector3(x,y,z);
	//this.ribbonTarget = ATUtil.getRandVec3D(-this.SPREAD, this.SPREAD);
	this.ribbonSeparation = 10;
	this.ribbonHolder = new THREE.Object3D();
	scene.add(this.ribbonHolder);
};

RibbonGroup.prototype.init = function() {

	for(var i = 0; i < this.RIBBONCOUNT; i++) {

		this.ribbons.push(new Ribbon(ATUtil.map(i, 0, this.RIBBONCOUNT, 0, 1), this)); //set color here from 0.0 - 1.0

	}
}

RibbonGroup.prototype.toggleWireframe = function() {

	for(var i = 0; i < this.RIBBONCOUNT; i++) {
		this.ribbons[i].toggleWireframe();
	}
}

RibbonGroup.prototype.update = function(nX, nY, nZ) {
	//this.ribbonHolder.rotation.y += .01;
	this.ribbonTarget = new THREE.Vector3(nX, nY, nZ);
	//this.ribbonTarget = ATUtil.getRandVec3D(-this.SPREAD, this.SPREAD);
	this.ribbonSeparation = ATUtil.getRand(0, this.MAXSEPARATION);

	for(var i = 0; i < this.RIBBONCOUNT; i++) {
		this.ribbons[i].update();
	}

}