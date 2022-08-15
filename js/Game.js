var layers = new Object();	

var resetButton, backButton, nextButton, completed, levelLabel, difficulty;

var mediamanager;	
var savegame;

var hero = null;
var boxes = new Array();
var walls = new Array();
var targets = new Array();

var levelIndex = 0;

var keydown = 0;

var tileSize = 48;
var tileOffsetX = 80;
var tileOffsetY = 0;

function init() {
	layers['top'] = new createjs.Stage('toplayer');
	layers['background'] = new createjs.Stage('backgroundlayer');
	
	savegame = new SaveGame();
	
	mediamanager = new MediaManager();
	mediamanager.setPreloadCompleted(function(e) {
		levelIndex = savegame.getLastCompleted();	
		levelIndex++;
		
		if(levelIndex == levels.length) levelIndex--;	
		
		startLevel();
	});
	mediamanager.preload();
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.RAF = true;
	createjs.Ticker.addListener(window);		
}

function startLevel() {
	layers['background'].removeAllChildren();
	layers['top'].removeAllChildren();
	
	resetButton = new createjs.Bitmap(mediamanager.Reset);
	resetButton.x = 16;
	resetButton.y = 16;
	resetButton.onClick = function() {
		startLevel();
	}
	
	layers['top'].addChild(resetButton);
	
	if(levelIndex > 0) {
		backButton = new createjs.Bitmap(mediamanager.ArrowLeft);
		backButton.x = 16;
		backButton.y = 480 - 48 - 16;
		backButton.onClick = function() {
			levelIndex--;
			startLevel();
		}
		layers['top'].addChild(backButton);
	}
	
	//if(levelIndex < levels.length - 1) {
	if(levelIndex < levels.length - 1 && (levelIndex - savegame.levelsCompleted()) <= 0) {	
		nextButton = new createjs.Bitmap(mediamanager.ArrowRight);
		nextButton.x = 640 - 48 - 16;
		nextButton.y = 480 - 48 - 16;
		nextButton.onClick = function() {
			levelIndex++;
			startLevel();
		}
		layers['top'].addChild(nextButton);	
	}
	
	completed = new createjs.Bitmap(mediamanager[(savegame.getCompleted(levelIndex)) ? 'LevelCompleted' : 'LevelUncompleted']);
	completed.x = 640 - 48 - 16;
	completed.y = 16;
	layers['top'].addChild(completed);
	
	var label = new createjs.Text((levelIndex + 1) + "", "30px Arial", "#4771D7");
	label.textAlign = "center";
	label.x = 24 + 16;
	label.y = 24 + 48 + 4;
	layers['top'].addChild(label);
	
	difficulty = new createjs.Bitmap(mediamanager[levels[levelIndex].difficulty]);
	difficulty.x = 16;
	difficulty.y = 24 + 48 + 48;
	layers['top'].addChild(difficulty);		
	
	hero = null;				
	boxes.length = 0;
	walls.length = 0;
	targets.length = 0;
	
	displayLevel();
	
	document.onkeydown  = handleKeyDown;
	document.onkeyup  = handleKeyUp;
}

function displayLevel() {
	for(var i = 0; i < levels[levelIndex].data.length; i++) {
		for(var j = 0; j < levels[levelIndex].data[i].length; j++) {
			switch(levels[levelIndex].data[i][j]) {
				case 0:
				var tile = new Wall(mediamanager.Tile);
					tile.setPosition(j, i);
					tile.setPositionOffset(tileOffsetX, tileOffsetY);
					tile.setSize(tileSize);
					layers['background'].addChild(tile);
					break;
				case 1:
					var wall = new Wall(mediamanager.Wall);
					wall.setPosition(j, i);
					wall.setPositionOffset(tileOffsetX, tileOffsetY);
					wall.setSize(tileSize);
					walls.push(wall);
					layers['background'].addChild(wall);
					break;
				case 2:
					var cart = new Box(mediamanager.Box);
					cart.setPosition(j, i);
					cart.setPositionOffset(tileOffsetX, tileOffsetY);
					cart.setSize(tileSize);
					cart.setOnDropped(validateLevel);
					boxes.push(cart);								
					layers['top'].addChild(cart);	

					var tile = new Wall(mediamanager.Tile);
					tile.setPosition(j, i);
					tile.setPositionOffset(tileOffsetX, tileOffsetY);
					tile.setSize(tileSize);
					layers['background'].addChild(tile);	
					
					break;
				case 3:
					var target = new Target(mediamanager.DropLocation);
					target.setPosition(j, i);
					target.setPositionOffset(tileOffsetX, tileOffsetY);
					target.setSize(tileSize);
					targets.push(target);
					layers['background'].addChild(target);								
					break;
				case 4:
					hero = new Hero(mediamanager.HeroShort);
					hero.setPosition(j, i);
					hero.setPositionOffset(tileOffsetX, tileOffsetY);
					hero.setSize(tileSize);
					layers['top'].addChild(hero);

					var tile = new Wall(mediamanager.Tile);
					tile.setPosition(j, i);
					tile.setPositionOffset(tileOffsetX, tileOffsetY);
					tile.setSize(tileSize);
					layers['background'].addChild(tile);	
					break;
					
				case 5:
					var cart = new Box(mediamanager.Box);
					cart.setPosition(j, i);
					cart.setPositionOffset(tileOffsetX, tileOffsetY);
					cart.setSize(tileSize);
					cart.setOnDropped(validateLevel);
					boxes.push(cart);								
					layers['top'].addChild(cart);
					
					var target = new Target(mediamanager.DropLocation);
					target.setPosition(j, i);
					target.setPositionOffset(tileOffsetX, tileOffsetY);
					target.setSize(tileSize);
					targets.push(target);
					layers['background'].addChild(target);
					
					break;
				case 6:
					hero = new Hero(mediamanager.Hero);
					hero.setPosition(j, i);
					hero.setPositionOffset(tileOffsetX, tileOffsetY);
					hero.setSize(tileSize);
					layers['top'].addChild(hero);
					
					var target = new Target(mediamanager.DropLocation);
					target.setPosition(j, i);
					target.setPositionOffset(tileOffsetX, tileOffsetY);
					target.setSize(tileSize);
					targets.push(target);
					layers['background'].addChild(target);								
					break;
				case 7:
					break;
				default:
					break;
			}
		}
	}
	
	for(var layer in layers) {
		layers[layer].update();
	}
}

function objectAt(x, y) {
	for(var wall in walls) {
		if(walls[wall].positionX == x && walls[wall].positionY == y) return 1;
	}
	for(var cart in boxes) {
		if(boxes[cart].positionX == x && boxes[cart].positionY == y) return 2;
	}
	for(var target in targets) {
		if(targets[target].positionX == x && targets[target].positionY == y) return 0;
	}
	if(hero.positionX == x && hero.positionY == y) return 4;
	return 0;
}

function handleKeyDown(e) {
	if (!e) { var e = window.event; }
	keydown = e.keyCode;
}

function handleKeyUp(e) {
	keydown = false;
}

function handleMovement() {
	var heroX = hero.positionX;
	var heroY = hero.positionY;
	
	if(!hero.moving) {		
		switch (keydown) {
			case 37:						
				if(objectAt(heroX - 1, heroY) == 0) {
					hero.moveTo(heroX - 1, heroY);
				} else if(objectAt(heroX - 1, heroY) == 2){
					if(objectAt(heroX - 2, heroY) == 0) {								
						for(var i = 0; i < boxes.length; i++) {
							if(boxes[i].positionX == heroX - 1 && boxes[i].positionY == heroY) {
								boxes[i].moveTo(heroX - 2, heroY);
								hero.moveTo(heroX - 1, heroY);										
							}
						}
					}
				}
			break;
			case 38:
				if(objectAt(heroX, heroY - 1) == 0) {
					hero.moveTo(heroX, heroY - 1);
				} else if(objectAt(heroX, heroY - 1) == 2){
					if(objectAt(heroX, heroY - 2) == 0) {								
						for(var i = 0; i < boxes.length; i++) {
							if(boxes[i].positionX == heroX && boxes[i].positionY == heroY - 1) {
								boxes[i].moveTo(heroX, heroY  - 2);
								hero.moveTo(heroX, heroY - 1);										
							}
						}
					}
				}
			break;
			case 39:
				if(objectAt(heroX + 1, heroY) == 0) {
					hero.moveTo(heroX + 1, heroY);
				} else if(objectAt(heroX + 1, heroY) == 2){
					if(objectAt(heroX + 2, heroY) == 0) {								
						for(var i = 0; i < boxes.length; i++) {
							if(boxes[i].positionX == heroX + 1 && boxes[i].positionY == heroY) {
								boxes[i].moveTo(heroX + 2, heroY);
								hero.moveTo(heroX + 1, heroY);										
							}
						}
						
					}
				}
			break;
			case 40:
				if(objectAt(heroX, heroY + 1) == 0) {
					hero.moveTo(heroX, heroY + 1);
				} else if(objectAt(heroX, heroY  + 1) == 2){
					if(objectAt(heroX, heroY  + 2) == 0) {								
						for(var i = 0; i < boxes.length; i++) {
							if(boxes[i].positionX == heroX && boxes[i].positionY == heroY  + 1) {
								boxes[i].moveTo(heroX, heroY  + 2);
								hero.moveTo(heroX, heroY  + 1);										
							}
						}
						
					}
				}
			break;
		}
	}
}

function validateLevel(e) {
	var placed = 0;
	
	for(var target in targets) {
		for(var box in boxes) {
			if(targets[target].positionX == boxes[box].positionX && targets[target].positionY == boxes[box].positionY) {
				placed++;
				break;
			}
		}
	}
	
	if(placed == targets.length) {
		savegame.setCompleted(levelIndex, 0, 0);
		levelIndex++;
		
		if(levelIndex == levels.length) {
			alert("Gefeliciteerd, je hebt het laatste level gehaald! Probeer nu de levels te halen die je nog niet gehaald hebt.");
			levelIndex--;
		}
		
		startLevel();	
	}
}

function tick(e) {
	if(keydown) handleMovement();	
	layers['top'].update();
}