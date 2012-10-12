Pointerly.Shapes = Pointerly.Shapes || {};

Pointerly.Shapes.TYPES = Pointerly.Shapes.TYPES || {};

Pointerly.Shapes.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.Shapes.TYPES[type.toLowerCase()] = funct;
	}
};

Pointerly.Shapes.SetupDefaults = function(){
	Pointerly.Shapes.Register( 'circle', Pointerly.Shapes.Circle );
	Pointerly.Shapes.Register( 'triangle', Pointerly.Shapes.Triangle );
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
