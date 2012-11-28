/**
	A base constructor for shapes
	@constructor
	@param {object} shapeSetup The setup for the shape
*/
Pointerly.Shape = function( shapeSetup ){
	var shape = this,
		shapeSetup = shapeSetup || {};

	/**
		The width of the shape
		@type number
		@default 200
	*/
	this.width = shapeSetup.width || 200;
	/**
		The width of the shape
		@type number
		@default 200
	*/
	this.height = shapeSetup.height || 200;
	/**
		The color of the shape
		@default black
	*/
	this._color = 'black';
	
	/**
		The canvas representing the shape
	*/
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	/**
		Indicates whether the action of clicking on a shape making ti disappear shoukd be disables
		@type boolean
		@default false
	*/
	this.disableClicking = shapeSetup.disableClicking ? true : false;

	/**
		Draws the shape to its own canvas
		@param {function} drawing A function which will draw the shape
	*/
	this.display = function( drawing ){
		var settings = {
			canvas: shape.canvas,
			width: shape.width,
			height: shape.height,
			ctx: shape.canvas.getContext('2d')
		};

		drawing( settings );
	};

	/**
		Sets the color of the shape
		@param color The color to set the shape to
	*/
	this.setColor = function( color ){
		if( arguments.length === 0 ){
			color = shape.color;
		} else {
			shape.color = color;
		}

		var ctx = shape.canvas.getContext('2d');
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		shape._color = color;
	};

	this.setColor( this._color );

	if( typeof shapeSetup === 'object' && shapeSetup.hasOwnProperty('color') ){
		this.setColor( shapeSetup.color );
	}

	if( typeof shapeSetup === 'object' && shapeSetup.hasOwnProperty('position') ){
		this.position = shapeSetup.position;
	}
};

/**
	@returns The name of the shape
*/
Pointerly.Shape.prototype.toString = function(){
	return 'Shape';
};
