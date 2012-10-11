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
	this.camera.position.z = 200;

	this.renderer.render( this.scene, this.camera );

	this.shapes = [];
	var setupShapes = function(){
		if( typeof setup !== 'object' || typeof setup.rowsOfShapes !== 'number' || typeof setup.columnsOfShapes !== 'number' ){
			return;
		}
		
		for( var i = 0; i < setup.rowsOfShapes; i++ ){
			environment.shapes[i] = [];
			for( var j = 0; j < setup.columnsOfShapes; j++ ){
				environment.shapes[i].push(new setup.shapes[Math.floor(Math.random()*setup.shapes.length)]({
					width: 200,
					height: 200,
					position: new THREE.Vector3( 200*i, 0, 200*j ),
					color: setup.colors[Math.floor(Math.random()*setup.colors.length)]
				}));

				environment.scene.addObject( environment.shapes[i][j] );
			}
		}
	};
	setupShapes();
	
	var renderLoop = function(){
		environment.renderer.render( environment.scene, environment.camera );
		window.requestAnimationFrame( renderLoop );
	};
	
	renderLoop();
};
