Pointerly.Storage = function(){
	var storage = this;

	this.requestedSpace = 1024*1024*1024;

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	this.errorHandler = function( e ){
		var msg = '';

		switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:
				msg = 'QUOTA_EXCEEDED_ERR';
				break;
			case FileError.NOT_FOUND_ERR:
				msg = 'NOT_FOUND_ERR';
				break;
			case FileError.SECURITY_ERR:
				msg = 'SECURITY_ERR';
				break;
			case FileError.INVALID_MODIFICATION_ERR:
				msg = 'INVALID_MODIFICATION_ERR';
				break;
			case FileError.INVALID_STATE_ERR:
				msg = 'INVALID_STATE_ERR';
				break;
			default:
				msg = 'Unknown Error';
				break;
		};

		console.log('Error: ' + msg);
	};

	this.requestSpace = function(){
		var onInitFs = function( fs ){
			storage.fs = fs;
			fs.root.getDirectory('Pointerly', {create: true}, function(directory){
				storage.dir = directory;
				
				
			}, storage.errorHandler);
		};

		window.webkitStorageInfo.requestQuota(window.PERSISTENT, storage.requestSpace, function(grantedBytes) {
			window.requestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, storage.errorHandler);
		}, function(e) {
			console.log('Error requesting quota', e);
		});
	};

	this.getNextNumberedFile = function( name, type, callback ){
		var id = 0;

		var constructName = function(){
			id++;
			return name + '-' + id + '.' + type;
		};

		var getFile = function(){
			if( typeof storage.dir === 'undefined' ){
				window.setTimeout( getFile, 5 );
				return;
			}
			var fileName = constructName();
			console.log(fileName, storage);
			storage.dir.getFile( fileName, {create: true, exclusive: true}, callback, getFile );
		};

		getFile();
	};

	storage.requestSpace();

	var back = function(a){
		console.log('back', a, a.name);
	};

	storage.getNextNumberedFile('jimmu', 'txt', back);
};
