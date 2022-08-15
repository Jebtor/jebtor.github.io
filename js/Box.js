(function (window) {
	function Box(id, sprite) {
		this.initialize(id, sprite);
	}
	
	Box.prototype = new createjs.Bitmap();
	
	Box.prototype.onDropped = function(){};
	
	Box.prototype.moveDuration = 200;
	Box.prototype.moving = false;	
	Box.prototype.size = 0;
	Box.prototype.positionX = 0;
	Box.prototype.positionY = 0;
	Box.prototype.positionOffsetX = 0;
	Box.prototype.positionOffsetY = 0;
	Box.prototype.spriteWidth = 0;
	Box.prototype.spriteHeight = 0;
	Box.prototype.onTarget = false;
	
	Box.prototype.initialize = function(sprite) {
		this.image = sprite;
		this.spriteWidth = sprite.width;
		this.spriteHeight = sprite.height;
		this.updateSprite();
	}
	
	Box.prototype.setImage = function(sprite) {
		this.initialize(sprite);
		this.updateSprite();
	}
	
	Box.prototype.setPosition = function(x, y) {
		this.positionX = x;
		this.positionY = y;
		this.updateRealPosition();
	}
	
	Box.prototype.setSize = function(size) {		
		this.size = size;
		this.updateRealPosition();
		this.updateSprite();
	}
	
	Box.prototype.setPositionOffset = function(x, y) {
		this.positionOffsetX  = x;
		this.positionOffsetY = y;
		this.updateRealPosition();
	}
	
	Box.prototype.setMoveDuration = function(duration) {
		this.moveDuration = duration;
	}
	
	Box.prototype.setOnDropped = function(callbackMethod) {
		this.onDropped = callbackMethod;
	}
	
	Box.prototype.moveTo = function(x, y) {
		this.moving = true;
		this.positionX = x;
		this.positionY = y;
		createjs.Tween.get(this).to({x : (x * this.size) + this.positionOffsetX + this.size / 2, y : (y * this.size) + this.positionOffsetY + this.size / 2}, this.moveDuration, createjs.Ease.linear).call(this.moved);
	}
	
	Box.prototype.updateRealPosition = function() {
		this.x = (this.positionX * this.size) + this.positionOffsetX + (this.size / 2);
		this.y = (this.positionY * this.size) + this.positionOffsetY + (this.size / 2); 
	}
	
	Box.prototype.updateSprite = function() {
		this.scaleX = this.scaleY = this.size / ((this.spriteWidth < this.spriteHeight) ? this.spriteHeight : this.spriteHeight);
		this.regX = this.spriteWidth / 2;
		this.regY = this.spriteHeight / 2;
	}
	
	Box.prototype.moved = function(e) {
		this.moving = false;
		this.onDropped(this);
	}
	
	window.Box = Box;
} (window));