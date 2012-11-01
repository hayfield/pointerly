Pointerly.Shapes = Pointerly.Shapes || {};

Pointerly.Shapes.TYPES = Pointerly.Shapes.TYPES || {};

Pointerly.Shapes.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.Shapes.TYPES[type.toLowerCase()] = funct;
	} else if( typeof type === 'function' && typeof funct === 'undefined' ){
		Pointerly.Shapes.TYPES[new type().toString().toLowerCase()] = type;
	}
};

Pointerly.Shapes.SetupDefaults = function(){
	Pointerly.Shapes.Register( Pointerly.Shapes.Circle );
	Pointerly.Shapes.Register( Pointerly.Shapes.Triangle );
	Pointerly.Shapes.Register( Pointerly.Shapes.Rectangle );
};

Pointerly.Shapes.FromString = function( type, shapeSetup ){
	if( Pointerly.Shapes.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		return Pointerly.Shapes.TYPES[type.toLowerCase()];
	}
};

Pointerly.Shapes.NewFromString = function( type, shapeSetup ){
	if( Pointerly.Shapes.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		return new Pointerly.Shapes.TYPES[type.toLowerCase()]( shapeSetup );
	}
};

Pointerly.Shapes.CreateFromLogger = function( construct ){
	var shapeConstruct = {
			width: construct.width,
			height: construct.height,
			position: new Pointerly.Vector2( construct.position.x, construct.position.y ),
			color: construct.color
		};
	
	return Pointerly.Shapes.NewFromString( construct.type, shapeConstruct );
};
