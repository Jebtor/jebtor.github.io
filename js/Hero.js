(function (window) {
	function Hero(sprite) {
		this.initialize(sprite);
	}
	
	Hero.prototype = new createjs.BitmapAnimation();
	
	Hero.prototype.onDropped = function(){};
	
	Hero.prototype.moveDuration = 240;
	Hero.prototype.moving = false;	
	Hero.prototype.size = 64;
	Hero.prototype.positionX = 0;
	Hero.prototype.positionY = 0;
	Hero.prototype.positionOffsetX = 0;
	Hero.prototype.positionOffsetY = 0;
	Hero.prototype.frameWidth = 48;
	Hero.prototype.frameHeight = 48;
	Hero.prototype.rotation = 0;
	
	Hero.prototype.initialize = function(sprite) {
		var ss = new createjs.SpriteSheet({
			images:[sprite],
			frames: {width: this.frameWidth, height:this.frameHeight},
			animations : {
				run:[0, 11, 'run', 2],
			}
		});
		
		this.spriteSheet = ss;
		this.updateSprite();
		this.gotoAndStop('run');
	}
	
	Hero.prototype.setImage = function(sprite) {
		this.initialize(sprite);
	}
	
	Hero.prototype.setPosition = function(x, y) {
		this.positionX = x;
		this.positionY = y;
		this.updateRealPosition();
	}
	
	Hero.prototype.setSize = function(size) {		
		this.size = size;
		this.updateRealPosition();
		this.updateSprite();
	}
	
	Hero.prototype.setPositionOffset = function(x, y) {
		this.positionOffsetX  = x;
		this.positionOffsetY = y;
		this.updateRealPosition();
	}
	
	Hero.prototype.setMoveDuration = function(duration) {
		this.moveDuration = duration;
	}
	
	Hero.prototype.setOnDropped = function(callbackMethod) {
		this.onDropped = callbackMethod;
	}
	
	Hero.prototype.moveTo = function(x, y) {
		this.moving = true;
		this.rotation = this.getRotation(x, y);
		this.gotoAndPlay('run');	
		this.positionX = x;
		this.positionY = y;
		
		createjs.Tween.get(this).to({x : (x * this.size) + this.positionOffsetX + this.size / 2, y : (y * this.size) + this.positionOffsetY + this.size / 2}, this.moveDuration, createjs.Ease.linear).call(this.moved);
	}
	
	Hero.prototype.updateRealPosition = function() {
		this.x = (this.positionX * this.size) + this.positionOffsetX + (this.size / 2);
		this.y = (this.positionY * this.size) + this.positionOffsetY + (this.size / 2); 
	}
	
	Hero.prototype.updateSprite = function() {
		this.scaleX = this.scaleY = this.size / ((this.frameWidth < this.frameHeight) ? this.frameHeight : this.frameHeight);
		this.regX = this.frameWidth / 2;
		this.regY = this.frameHeight / 2;
	}
	
	Hero.prototype.getRotation = function(x, y) {	
		if(this.positionX < x) return 90;
		if(this.positionX > x) return 270;
		if(this.positionY > y) return 0;
		if(this.positionY < y) return 180;
		return this.rotation;
	}
	
	Hero.prototype.moved = function(e) {
		this.moving = false;
		
		this.gotoAndStop('run');	
		
		this.onDropped();
	}
	
	window.Hero = Hero;
} (window));