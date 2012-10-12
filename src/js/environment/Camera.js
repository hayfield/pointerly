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
		position = Pointerly.Utils.ObjToVector3( setup.camera.position ) || new THREE.Vector3( 0, 0, 0 );

	environment.camera = new THREE.Camera( fov, aspect, near, far );
	environment.camera.position = position;
};

// Modified https://github.com/mrdoob/three.js/issues/78
Pointerly.Camera.ToScreenXY = function( position, environment ){
	var pos = position.clone(),
		camera = environment.camera,
    	canvas = environment.renderer.domElement;
    //projScreenMat = new THREE.Matrix4();
    //projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
    //projScreenMat.multiplyVector3( pos );
    var projector = new THREE.Projector(),
    	canvasPos = projector.projectVector( pos, camera );
    	projector.projectVector( pos, camera )
    return { x: ( pos.x * canvas.width / 2 ) + canvas.width / 2,
         y: - ( pos.y * canvas.height / 2 ) + canvas.width / 2 };
};

Pointerly.Camera.BoundToView = function( environment ){
	var objs = environment.objects();

	var topExtent = Number.MIN_VALUE,
		rightExtent = Number.MIN_VALUE,
		bottomExtent = Number.MAX_VALUE,
		leftExtent = Number.MAX_VALUE;

	for( var i = 0; i < objs.length; i++ ){
		var vertices = objs[i].geometry.vertices;
		for( var v = 0; v < vertices.length; v++ ){
			var position = vertices[v].position.clone().addSelf( objs[i].position ),
				screenPosition = Pointerly.Camera.ToScreenXY( position, environment );
			console.log(i, screenPosition.x, screenPosition.y, 'vert', vertices[v].position.x, vertices[v].position.y, vertices[v].position.z, 'pos', position.x, position.y, position.z, 'obj', objs[i].position.x, objs[i].position.y, objs[i].position.z);
		}
	}

	console.log(objs, environment, environment.canvas );
};
