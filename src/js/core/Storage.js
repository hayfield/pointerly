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
			console.log(storage);
		};

		window.webkitStorageInfo.requestQuota(window.PERSISTENT, storage.requestSpace, function(grantedBytes) {
			window.requestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, storage.errorHandler);
		}, function(e) {
			console.log('Error', e);
		});
	};

	storage.requestSpace();
};
