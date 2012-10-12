Pointerly.Camera = Pointerly.Camera || {};

Pointerly.Camera.FromString = function( type, environment, setup ){
	switch( type.toLowerCase() ){
		case 'default':
		case 'fixed':
			Pointerly.Camera.Fixed( environment, setup );
			break;
	}
};

Pointerly.Camera.Fixed = function( environment, setup ){
	var fov = setup.camera.fov || 75,
		aspect = window.innerWidth / window.innerHeight,
		near = setup.camera.near || 1,
		far = setup.camera.far || 10000,
		position = setup.camera.position || new THREE.Vector3( 0, 0, 0 );

	environment.camera = new THREE.Camera( fov, aspect, near, far );
	environment.camera.position = position;
};
