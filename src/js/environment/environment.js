Pointerly.Environment = function(){
	Pointerly.CURRENT_ENVIRONMENT = this;

	var scene = new THREE.Scene();
	this.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.rendererContext = this.renderer.domElement.getContext('experimental-webgl');

	var ambient = new THREE.AmbientLight( 0xffffff );
	scene.addLight( ambient );
	
	var directionalLight = new THREE.DirectionalLight( 0xff0000 );
	directionalLight.position.y = 200;
	directionalLight.position.normalize();
	scene.addLight( directionalLight );

	var pointLight = new THREE.PointLight( 0xff0000 );
	pointLight.position.y = 150;
	pointLight.position.x = -250;
	pointLight.position.z = -250;
	pointLight.intensity = 0.5;
	scene.addLight( pointLight );

	scene.addObject( new Pointerly.Shape() );

	this.camera = new THREE.QuakeCamera({
        fov: 80,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 20000,
        constrainVertical: true,
        verticalMin: 1.1,
        verticalMax: 2.2,
        movementSpeed: 1000,
        lookSpeed: 0.125,
        noFly: false,
        lookVertical: true,
        autoForward: false
	});
	this.camera.position.y = 200;
	var cam = this.camera;
	this.scene = scene;

	this.renderer.render( this.scene, this.camera );
	var ren = this.renderer;
	var bob = function(){
		ren.render( scene, cam );
		window.requestAnimationFrame( bob );
	};
	
	bob();

	console.log('created env');
};
