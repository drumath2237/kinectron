var Quad = function(p0, p1, p2, p3) {

	var scope = this;

	THREE.Geometry.call(this);

	scope.vertices.push(new THREE.Vertex(p0));
	scope.vertices.push(new THREE.Vertex(p1));
	scope.vertices.push(new THREE.Vertex(p2));
	scope.vertices.push(new THREE.Vertex(p3));

	f3(0, 1, 2);
	f3(0, 3, 2);

	//this.computeCentroids();
	//this.computeFaceNormals();
	//this.sortFacesByMaterial();

	function f3(a, b, c) {

		scope.faces.push(new THREE.Face3(a, b, c));

	}

}

Quad.prototype = new THREE.Geometry();
Quad.prototype.constructor = Quad;
