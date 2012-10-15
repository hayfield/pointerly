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
         y: - ( pos.y * canvas.height / 2 ) + canvas.height / 2 };
};

Pointerly.Camera.BoundBoxToCoords = function( boundingBox ){
	var coords = [];

	for( var x = 0; x < boundingBox.x.length; x++ ){
		for( var y = 0; y < boundingBox.y.length; y++ ){
			for( var z = 0; z < boundingBox.z.length; z++ ){
				coords.push( new THREE.Vector3( boundingBox.x[x], boundingBox.y[y], boundingBox.z[z] ) );
			}
		}
	}

	return coords;
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
	//console.log(boundingCenter, boundingGeom, Pointerly.Camera.ToScreenXY(boundingCenter, environment));
	environment.camera.position = boundingCenter;
	//console.log(environment.camera.position.x, environment.camera.position.y, environment.camera.position.z);
	//console.log('cam up', environment.camera.up, environment.camera, environment.camera.rotation.normalize());
	environment.camera.translate( 300, environment.camera.rotation.normalize() );
	environment.camera.updateMatrix();
	var coords = Pointerly.Camera.BoundBoxToCoords(boundingGeom.boundingBox);
	//console.log(environment.camera.position.x, environment.camera.position.y, environment.camera.position.z);
	//console.log('bb', boundingGeom.boundingBox, coords);

	for( var i = 0; i < coords.length; i++ ){
		console.log(coords[i].x, coords[i].y, coords[i].z, 'scr', Pointerly.Camera.ToScreenXY(coords[i], environment).x, Pointerly.Camera.ToScreenXY(coords[i], environment).y);
	}

	for( var v = 0; v < boundingGeom.vertices.length; v++ ){
		//var position
	}
	for( var i = 0; i < objs.length; i++ ){
		var vertices = objs[i].geometry.vertices;
		
		for( var v = 0; v < vertices.length; v++ ){
			boundingGeom.vertices.push( vertices[v].position.clone() );
			var position = vertices[v].position.clone().addSelf( objs[i].position ),
				screenPosition = Pointerly.Camera.ToScreenXY( position, environment );
			//console.log(i, screenPosition.x, screenPosition.y, 'vert', vertices[v].position.x, vertices[v].position.y, vertices[v].position.z, 'pos', position.x, position.y, position.z, 'obj', objs[i].position.x, objs[i].position.y, objs[i].position.z);
		}
	}
	//boundingGeom.computeBoundingBox();
	console.log(objs, environment, environment.canvas, boundingGeom );
};
