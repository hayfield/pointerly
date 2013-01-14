/**
	A way of storing or logging data
	@constructor
*/
Pointerly.Storage = function(){
	var storage = this;

	/**
		The minimum amount of storage space we desire, in bytes
		@constant
		@type number
	*/
	this.REQUESTED_SPACE = 1024*1024*1024;

	/**
		The type of storage to use
		@constant
	*/
	this.TYPE = window.TEMPORARY;

	/**
		The buffer of items to be stored
		@type Array
	*/
	this._writeBuffer = [];

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	window.storageInfo = window.storageInfo || window.webkitStorageInfo;

	/**
		A general error handler for dealing with file storage
		@param {FileError} e The error which occured
	*/
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
				if( location.origin.indexOf('file:') === 0 ){
					console.warn('A flag needs to be set to enable file access from files');
				}
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
		}

		console.log('Storage Error: ' + msg);
	};

	/**
		Finds and displays the quotas for different types of storage
	*/
	this.displayQuotas = function(){
		window.storageInfo.queryUsageAndQuota(window.PERSISTENT, function(used, total){
			console.log('persistent storage:', used, 'total storage:', total, 'remaining:', total-used);
		});

		window.storageInfo.queryUsageAndQuota(window.TEMPORARY, function(used, total){
			console.log('temp storage:', used, 'total storage:', total, 'remaining:', total-used);
		});
	};

	/**
		Initialises the storage, requesting any required quotas and creating the file systems
	*/
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
			window.requestFileSystem(storage.TYPE, storage.REQUESTED_SPACE, onInitFs, storage.errorHandler);
		}
	};

	/**
		Writes the first item in the buffer to the given file. If the buffer is empty, writes the empty string
		@param {FileEntry} fileEntry The file to write to
	*/
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

	/**
		Finds the next numbered file with the name and type specified so that overwriting does not occur.
		When the file is found, the callback is executed and given the file.
		@param {string} name The name of the file
		@param {string} type The file type
		@param {function} callback The callback to execute once the file is found
	*/
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

	/**
		Saves data to a file with the given name
		@param {string} name The name of the file to write to, not including file type
		@param data The data to write to file
	*/
	this.save = function( name, data ){
		console.log('saving');
		storage._writeBuffer.push(data);
		console.log('pushed to buffer', storage._writeBuffer.length);
		storage.getNextNumberedFile( name, 'txt', storage.writeBufferToFile );
	};

	/**
		Remove all data that has been stored
		@param {boolean} [reallySure] Needs to be set to <code>true</code> to actually remove the data
		@param {string} [superDuperSure] Needs to be set to <code>Yes, I really want to delete EVERYTHING!!</code> to actually remove the data
	*/
	this.removeAllData = function( reallySure, superDuperSure ){
		if( reallySure && superDuperSure === 'Yes, I really want to delete EVERYTHING!!' && storage.dir ){
			storage.dir.removeRecursively(function(){
				console.log('All Pointerly data removed.');
				storage.initStorage();
			}, storage.errorHandler);
		}
	};

	window.storageInfo.queryUsageAndQuota(window.TEMPORARY, function(used, total){
		if( total < storage.REQUESTED_SPACE || (total-used) < (storage.REQUESTED_SPACE/2) ){
			console.warn('Not a lot of temorary space available!\n',
				'used:', used, 'total:', total, 'remaining:', total-used);
		}
	});

	storage.initStorage();
};
