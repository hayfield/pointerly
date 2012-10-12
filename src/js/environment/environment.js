Pointerly.Environment = function( setup ){
	Pointerly.CURRENT_ENVIRONMENT = this;

	var environment = this;
	this.scene = new THREE.Scene();

	var scene = this.scene;

	this.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.rendererContext = this.renderer.domElement.getContext('experimental-webgl');

	//scene.addObject( new Pointerly.Circle() );

	// this.camera = new THREE.QuakeCamera({
 //        fov: 80,
 //        aspect: window.innerWidth / window.innerHeight,
 //        near: 1,
 //        far: 20000,
 //        constrainVertical: true,
 //        verticalMin: 1.1,
 //        verticalMax: 2.2,
 //        movementSpeed: 1000,
 //        lookSpeed: 0.125,
 //        noFly: false,
 //        lookVertical: true,
 //        autoForward: false
	// });
	// this.camera.position.y = 200;
	// this.camera.position.z = 200;
	this.camera = new THREE.Camera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	this.camera.position.y = 300;
	//this.camera.rotation = new THREE.Vector3( 0, 0, Math.PI );

	this.renderer.render( this.scene, this.camera );

	this.shapes = [];
	var setupShapes = function(){
		if( typeof setup !== 'object' ){
			return;
		}
		
		if( typeof setup.shapeLayout === 'function' ){
			setup.shapeLayout( environment, setup );
		} else if ( typeof setup.shapeLayout === 'string' ){
			Pointerly.ShapeGeneration.FromString( setup.shapeLayout, environment, setup );
		}
	};
	setupShapes();

	var setupCamera = function(){
		if( typeof setup !== 'object' || typeof setup.camera !== 'object' ){
			return;
		}

		if( typeof setup.camera.type === 'string' ){
			Pointerly.Camera.FromString( setup.camera.type, environment, setup );
		}
	};
	setupCamera();
	
	var renderLoop = function(){
		environment.renderer.render( environment.scene, environment.camera );
		window.requestAnimationFrame( renderLoop );
	};
	
	renderLoop();
};
