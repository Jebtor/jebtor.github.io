(function (window) {
	function Wall(id, sprite) {
		this.initialize(id, sprite);
	}
	
	Wall.prototype = new createjs.Bitmap();
	
	Wall.prototype.size = 0;
	Wall.prototype.positionX = 0;
	Wall.prototype.positionY = 0;
	Wall.prototype.positionOffsetX = 0;
	Wall.prototype.positionOffsetY = 0;
	Wall.prototype.spriteWidth = 0;
	Wall.prototype.spriteHeight = 0;
	
	Wall.prototype.initialize = function(sprite) {
		this.image = sprite;
		this.spriteWidth = sprite.width;
		this.spriteHeight = sprite.height;
		this.updateSprite();
	}
	
	Wall.prototype.setImage = function(sprite) {
		this.initialize(sprite);
	}
	
	Wall.prototype.setPosition = function(x, y) {
		this.positionX = x;
		this.positionY = y;
		this.updateRealPosition();
	}
	
	Wall.prototype.setSize = function(size) {		
		this.size = size;
		this.updateRealPosition();
		this.updateSprite();
	}
	
	Wall.prototype.setPositionOffset = function(x, y) {
		this.positionOffsetX  = x;
		this.positionOffsetY = y;
		this.updateRealPosition();
	}
	
	Wall.prototype.updateRealPosition = function() {
		this.x = (this.positionX * this.size) + this.positionOffsetX + (this.size / 2);
		this.y = (this.positionY * this.size) + this.positionOffsetY + (this.size / 2); 
	}
	
	Wall.prototype.updateSprite = function() {
		this.scaleX = this.scaleY = this.size / ((this.spriteWidth < this.spriteHeight) ? this.spriteHeight : this.spriteHeight);
		this.regX = this.spriteWidth / 2;
		this.regY = this.spriteHeight / 2;
	}
	
	window.Wall = Wall;
} (window));