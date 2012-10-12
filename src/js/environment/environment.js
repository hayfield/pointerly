Pointerly.Environment = function( setup ){
	Pointerly.CURRENT_ENVIRONMENT = this;

	var environment = this;
	this.scene = new THREE.Scene();

	var scene = this.scene;

	this.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.rendererContext = this.renderer.domElement.getContext('experimental-webgl');

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
