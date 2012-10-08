Pointerly.Environment = function(){
	Pointerly.CURRENT_ENVIRONMENT = this;

	this.scene = new THREE.Scene();
	this.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer;
	this.renderer.setSize( 300, 300 );
	document.body.appendChild( this.renderer.domElement );
	this.rendererContext = this.renderer.domElement.getContext('experimental-webgl');

	console.log('created env');
};

