function MediaManager() {
	var NUM_FILES = 12;
	var NUM_FILES_LOADED = 0;
	var PERCENT_LOADED = 0;
	
	var onpreloadcompleted = function(){};
	var onpreloadfailed = function(){};
	var onpreloadupdate = function(){};
	
	this.setPreloadCompleted = function(callbackMethod) {
		onpreloadcompleted = callbackMethod;
	};
	
	this.setPreloadFailed = function(callbackMethod) {
		onpreloadfailed = callbackMethod;
	};
	
	this.setPreloadUpdate = function(callbackMethod) {
		onpreloadupdate = callbackMethod;
	};
	
	this.preload = function() {
		this.Box = preloadImage('assets/images/box.png', handleFileLoad, handleFileError);
		this.Hero = preloadImage('assets/images/hero.png', handleFileLoad, handleFileError);
		this.HeroShort = preloadImage('assets/images/hero_korter.png', handleFileLoad, handleFileError);
		this.Wall = preloadImage('assets/images/wall.jpg', handleFileLoad, handleFileError);
		this.DropLocation = preloadImage('assets/images/droplocation.png', handleFileLoad, handleFileError);
		this.Tile = preloadImage('assets/images/tile.png', handleFileLoad, handleFileError);
		this.ArrowLeft = preloadImage('assets/images/arrow-left.jpg', handleFileLoad, handleFileError);
		this.ArrowRight = preloadImage('assets/images/arrow-right.jpg', handleFileLoad, handleFileError);
		this.LevelCompleted = preloadImage('assets/images/levelvoltooid.jpg', handleFileLoad, handleFileError);
		this.LevelUncompleted = preloadImage('assets/images/levelonvoltooid.jpg', handleFileLoad, handleFileError);
		this.Reset = preloadImage('assets/images/reset.jpg', handleFileLoad, handleFileError);
		this.beginner = preloadImage('assets/images/easy.png', handleFileLoad, handleFileError);
		this.advanced = preloadImage('assets/images/medium.png', handleFileLoad, handleFileError);	
		this.expert = preloadImage('assets/images/hard.png', handleFileLoad, handleFileError);	
	}
	
	function preloadImage(url, loadedHandler, errorHandler) {
		var element = new Image();
        element.onload = loadedHandler;
        element.onerror = errorHandler;
		element.src = url;
		return element;
    }
	
	function handleFileLoad(e) {
		NUM_FILES_LOADED++;
		PERCENT_LOADED = Math.round((NUM_FILES_LOADED / NUM_FILES) * 100);
		
		onpreloadupdate({
			'percentLoaded' : PERCENT_LOADED,
			'filesLoaded' : NUM_FILES_LOADED,
			'filesTotal' : NUM_FILES
		});
		
		if(NUM_FILES_LOADED == NUM_FILES) {
			NUM_FILES_LOADED = 0;			
			onpreloadcompleted();
		}
	}
	
	function handleFileError(e) {
		onpreloadfailed();
	}
}