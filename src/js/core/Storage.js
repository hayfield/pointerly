Pointerly.Storage = function(){
	var storage = this;

	this.requestedSpace = 1024*1024*1024;

	this.TYPE = window.TEMPORARY;

	this._writeBuffer = [];

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	window.storageInfo = window.storageInfo || window.webkitStorageInfo;

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

		console.log('Storage Error: ' + msg);
	};

	this.displayQuotas = function(){
		window.storageInfo.queryUsageAndQuota(window.PERSISTENT, function(used, total){
			console.log('persistent storage:', used, 'total storage:', total, 'remaining:', total-used);
		});

		window.storageInfo.queryUsageAndQuota(window.TEMPORARY, function(used, total){
			console.log('temp storage:', used, 'total storage:', total, 'remaining:', total-used);
		});
	};

	this.initStorage = function(){
		var onInitFs = function( fs ){
			storage.fs = fs;

			fs.root.getDirectory('Pointerly', {create: true}, function(directory){
				storage.dir = directory;
			}, storage.errorHandler);
		};

		if( storage.TYPE === window.PERSISTENT ){
			window.webkitStorageInfo.requestQuota(window.PERSISTENT, storage.requestSpace, function(grantedBytes){
				window.requestFileSystem(storage.TYPE, grantedBytes, onInitFs, storage.errorHandler);
			}, function(e){
				console.log('Error requesting quota', e);
			});
		} else if( storage.TYPE === window.TEMPORARY ){
			window.requestFileSystem(storage.TYPE, storage.requestedSpace, onInitFs, storage.errorHandler);
		}
	};

	this.writeBufferToFile = function( fileEntry ){
		console.log(fileEntry, fileEntry.name);

		fileEntry.createWriter(function(fileWriter){
			if( storage._writeBuffer.length === 0 ){
				storage._writeBuffer.push('');
			}
			var data = storage._writeBuffer.shift(),
				blob = new Blob([data], {type: 'text/plain'});

			fileWriter.onwriteend = function(e){
				console.log('write complete\n', data);
			};

			fileWriter.onerror = function(e){
				console.log('Write failed' + e.toString(), e);
			};

			fileWriter.write(blob);
		}, storage.errorHandler);
	};

	this.getNextNumberedFile = function( name, type, callback ){
		var id = 0;

		var constructName = function(){
			id++;
			return name + '-' + id + '.' + type;
		};
		
		var getFile = function(){
			if( typeof storage.dir === 'undefined' ){
				window.setTimeout( getFile, 50 );
				return;
			}
			var fileName = constructName();
			console.log('name:', fileName);
			storage.dir.getFile( fileName, {create: true, exclusive: true}, callback, getFile );
		};

		getFile();
	};

	this.save = function( name, data ){
		console.log('saving');
		storage._writeBuffer.push(data);
		console.log('pushed to buffer', storage._writeBuffer.length);
		storage.getNextNumberedFile( name, 'txt', storage.writeBufferToFile );
	};

	this.removeAllData = function( reallySure, superDuperSure ){
		if( reallySure && superDuperSure === 'Yes, I really want to delete EVERYTHING!!' && storage.dir ){
			storage.dir.removeRecursively(function(){
				console.log('All Pointerly data removed.');
				storage.initStorage();
			}, storage.errorHandler);
		}
	};

	window.storageInfo.queryUsageAndQuota(window.TEMPORARY, function(used, total){
		if( total < storage.requestedSpace || (total-used) < (storage.requestedSpace/2) ){
			console.warn('Not a lot of temorary space available!\n',
				'used:', used, 'total:', total, 'remaining:', total-used);
		}
	});

	storage.initStorage();
};
