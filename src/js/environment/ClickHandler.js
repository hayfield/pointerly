Pointerly.ClickHandler = Pointerly.ClickHandler || {};

Pointerly.ClickHandler.TYPES = Pointerly.ClickHandler.TYPES || {};

Pointerly.ClickHandler.Register = function( type, funct ){
	Pointerly.ClickHandler.TYPES[type.toLowerCase()] = funct;
};

Pointerly.ClickHandler.SetupDefaults = function(){
	Pointerly.ClickHandler.Register( 'mouse', Pointerly.ClickHandler.Mouse );
	Pointerly.ClickHandler.Register( 'screencenter', Pointerly.ClickHandler.ScreenCenter );
	Pointerly.ClickHandler.Register( 'fps', Pointerly.ClickHandler.ScreenCenter );
};

Pointerly.ClickHandler.FromString = function( type, environment, setup ){
	if( Pointerly.ClickHandler.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		Pointerly.ClickHandler.TYPES[type.toLowerCase()]( environment, setup );
	}
};

Pointerly.ClickHandler.Mouse = function( environment, setup ){
	var clickHandler = function( event ){
 		event.preventDefault();

		Pointerly.ClickHandler.GetClickedShape({
			x: event.clientX,
			y: event.clientY
		}, Pointerly.CURRENT_ENVIRONMENT ); 		
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

Pointerly.ClickHandler.ScreenCenter = function( environment, setup ){
	var clickHandler = function( event ){
 		event.preventDefault();

		Pointerly.ClickHandler.GetClickedShape({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		}, Pointerly.CURRENT_ENVIRONMENT ); 		
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

Pointerly.ClickHandler.GetClickedShape = function( clickPosition, environment ){
	// Modified http://mrdoob.github.com/three.js/examples/canvas_interactive_cubes.html
	var vector = new THREE.Vector3( ( clickPosition.x / window.innerWidth ) * 2 - 1, - ( clickPosition.y / window.innerHeight ) * 2 + 1, 0.5 );
	var projector = new THREE.Projector();
	var camera = environment.camera;
	projector.unprojectVector( vector, camera );

	var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	
	var intersects = ray.intersectObjects( environment.objects() );
	
	if ( intersects.length > 0 ) {
		intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

		return intersects[0];
	}

	return null;
};
