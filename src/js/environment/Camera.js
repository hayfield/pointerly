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
		position = Pointerly.Utils.ObjToVector3( setup.camera.position ) || new THREE.Vector3( 0, 0, 0 ),
		rotation = Pointerly.Utils.ObjToVector3( setup.camera.rotation ) || new THREE.Vector3( 0, 0, 0 );

	environment.camera = new THREE.Camera( fov, aspect, near, far );
	environment.camera.position = position;
	environment.camera.rotation = rotation;
	environment.camera.useTarget = setup.camera.useTarget || false;
};

// Modified https://github.com/mrdoob/three.js/issues/78
Pointerly.Camera.ToScreenXY = function( position, environment ){
	var pos = position.clone(),
		camera = environment.camera,
    	canvas = environment.renderer.domElement;
    
    var projector = new THREE.Projector(),
    	canvasPos = projector.projectVector( pos, camera );
    	projector.projectVector( pos, camera )
    return { x: ( pos.x * canvas.width / 2 ) + canvas.width / 2,
         y: - ( pos.y * canvas.height / 2 ) + canvas.width / 2 };
};

Pointerly.Camera.BoundToView = function( environment ){
	var objs = environment.objects();
	if( objs.length < 1 ){
		return;
	}

	var boundingGeom = new THREE.GeometryUtils.clone( objs[0].geometry );

	for( var i = 1; i < objs.length; i++ ){
		THREE.GeometryUtils.merge( boundingGeom, objs[i] );
	}
	boundingGeom.computeBoundingBox();

	var boundingCenter = new THREE.Vector3( 0.5 * (boundingGeom.boundingBox.x[1] + boundingGeom.boundingBox.x[0]),
											0.5 * (boundingGeom.boundingBox.y[1] + boundingGeom.boundingBox.y[0]),
											0.5 * (boundingGeom.boundingBox.z[1] + boundingGeom.boundingBox.z[0]) );
	console.log(boundingCenter);
	environment.camera.position = boundingCenter;
	console.log(environment.camera.position.x, environment.camera.position.y, environment.camera.position.z);
	environment.camera.translate( 300, environment.camera.up );
	environment.camera.updateMatrix();
	console.log(environment.camera.position.x, environment.camera.position.y, environment.camera.position.z);

	for( var i = 0; i < objs.length; i++ ){
		var vertices = objs[i].geometry.vertices;
		
		for( var v = 0; v < vertices.length; v++ ){
			boundingGeom.vertices.push( vertices[v].position.clone() );
			var position = vertices[v].position.clone().addSelf( objs[i].position ),
				screenPosition = Pointerly.Camera.ToScreenXY( position, environment );
			console.log(i, screenPosition.x, screenPosition.y, 'vert', vertices[v].position.x, vertices[v].position.y, vertices[v].position.z, 'pos', position.x, position.y, position.z, 'obj', objs[i].position.x, objs[i].position.y, objs[i].position.z);
		}
	}
	//boundingGeom.computeBoundingBox();
	console.log(objs, environment, environment.canvas, boundingGeom );
};
