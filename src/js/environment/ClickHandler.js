Pointerly.ClickHandler = Pointerly.ClickHandler || {};

Pointerly.ClickHandler.FromString = function( type, environment, setup ){
	switch( type.toLowerCase() ){
		case 'mouse':
			Pointerly.ClickHandler.Mouse( environment, setup );
			break;
	}
};

Pointerly.ClickHandler.Mouse = function( environment, setup ){
	var clickHandler = function( event ){
 		event.preventDefault();
 		console.log(Pointerly.CURRENT_ENVIRONMENT, event);

 		// Modified http://mrdoob.github.com/three.js/examples/canvas_interactive_cubes.html
 		var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		var projector = new THREE.Projector();
		var camera = Pointerly.CURRENT_ENVIRONMENT.camera;
		projector.unprojectVector( vector, camera );

		var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
		
		var intersects = ray.intersectObjects( Pointerly.CURRENT_ENVIRONMENT.objects() );
		
		if ( intersects.length > 0 ) {
			intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
		}
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

Pointerly.ClickHandler.GetClickedShape = function( clickPosition, environment, setup ){
	console.log(clickPosition);
};
