/**
	@namespace A namespace for methods of analysing data
*/
Pointerly.Analysis = Pointerly.Analysis || {};

/**
	The methods of analysis which have been defined
	@private
*/
Pointerly.Analysis.TYPES = Pointerly.Analysis.TYPES || {};

/**
	Registers a method of analysing data against a name. Names are case-insensitive
	@param {string} type The name to give the method of data analysis
	@param {function} funct The function to analyse data with
*/
Pointerly.Analysis.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.Analysis.TYPES[type.toLowerCase()] = funct;
	}
};

/**
	Sets up the default data analysis techniques
*/
Pointerly.Analysis.SetupDefaults = function(){
	Pointerly.Analysis.Register( 'homeToShape', Pointerly.Analysis.HomeToShape );
};

/**
	Converts data into JSON format
	@param {string|object} data The data to convert
	@returns The data in JSON format
*/
Pointerly.Analysis.JSONify = function( data ){
	if( typeof data === 'string' ){
		return JSON.parse( data );
	} else {
		return data;
	}
};

/**
	A data analysis technique to find the time between the home area and clicking on shapes
	@param {string|object} data The data to analyse
	@returns {string} A CSV of the data having been analysed
*/
Pointerly.Analysis.HomeToShape = function( data ){
	var homeInteractionID = 0,
		shapeID = 0,
		out = '';

	data = Pointerly.Analysis.JSONify( data );
	var numShapes = data.createdShapes.length,
		interactions = data.homeAreaInteractions;

	out += 'MovementTime,Distance,Width\n';

	// go through the shapes
	for( shapeID = 0; shapeID < numShapes; shapeID++ ){
		var shape = data.createdShapes[shapeID];
		
		// if it's something we care about
		if( shape.type !== 'Recording' && shape.removeTime < Number.MAX_VALUE ){
			var createTime = shape.createTime;
			// find the home area interaction when you left to click it
			while( homeInteractionID < interactions.length && interactions[homeInteractionID].timestamp < createTime ){
				homeInteractionID++;
			}
			
			if( homeInteractionID < interactions.length ){
				// find how long it took to move there
				var moveTime = shape.removeTime - interactions[homeInteractionID].timestamp;
				var dist = Math.abs( data.homeAreaPosition[0].x - shape.position.x );
				var width = shape.width;
				out += moveTime + ',' + dist + ',' + width + '\n';
			}

			homeInteractionID++;
		}
	}

	return out;
};
