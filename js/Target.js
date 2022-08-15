(function (window) {
	function Target(id, sprite) {
		this.initialize(id, sprite);
	}
	
	Target.prototype = new createjs.Bitmap();
	
	Target.prototype.size = 0;
	Target.prototype.positionX = 0;
	Target.prototype.positionY = 0;
	Target.prototype.positionOffsetX = 0;
	Target.prototype.positionOffsetY = 0;
	Target.prototype.spriteWidth = 0;
	Target.prototype.spriteHeight = 0;
	
	Target.prototype.initialize = function(sprite) {
		this.image = sprite;
		this.spriteWidth = sprite.width;
		this.spriteHeight = sprite.height;
		this.updateSprite();
	}
	
	Target.prototype.setImage = function(sprite) {
		this.initialize(sprite);
	}
	
	Target.prototype.setPosition = function(x, y) {
		this.positionX = x;
		this.positionY = y;
		this.updateRealPosition();
	}
	
	Target.prototype.setSize = function(size) {		
		this.size = size;
		this.updateRealPosition();
		this.updateSprite();
	}
	
	Target.prototype.setPositionOffset = function(x, y) {
		this.positionOffsetX  = x;
		this.positionOffsetY = y;
		this.updateRealPosition();
	}
	
	Target.prototype.updateRealPosition = function() {
		this.x = (this.positionX * this.size) + this.positionOffsetX + (this.size / 2);
		this.y = (this.positionY * this.size) + this.positionOffsetY + (this.size / 2); 
	}
	
	Target.prototype.updateSprite = function() {
		this.scaleX = this.scaleY = this.size / ((this.spriteWidth < this.spriteHeight) ? this.spriteHeight : this.spriteHeight);
		this.regX = this.spriteWidth / 2;
		this.regY = this.spriteHeight / 2;
	}
	
	window.Target = Target;
} (window));