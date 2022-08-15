(function (window) {
	function SaveGame() {
		this.initialize();
	}
	
	SaveGame.prototype.data = new Array();
	
	SaveGame.prototype.initialize = function() {
		this.load();
		this.save();
	}

	SaveGame.prototype.reset = function() {
		this.data = new Array();
		this.save();
	}
 
	SaveGame.prototype.load = function() {
		var string = this.getCookie("SaveGame");
		var splitted = string.split(":");
		var length = splitted.length;
		
		this.data = new Array();
		
		for(i = 0; i < length; i++) {
			if(splitted[i].split("-").length == 3) {
				this.data.push(new Array());
				this.data[i] = splitted[i].split("-");			
			}
		}
	}
 
	SaveGame.prototype.save = function() {
		var string = "";
		var length = this.data.length;

		for(var i = 0; i < length; i++) {
			string += this.data[i][0] + "-" + this.data[i][1] + "-" + this.data[i][2];
			if(i != length - 1) {
				string += ":";
			}
		}
		
		this.setCookie("SaveGame", string);
		this.load();
	}
 
	SaveGame.prototype.getCookie = function(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
				break;
			}
		}
		return "";
	}
	
	SaveGame.prototype.setCookie = function(name, value) {
		document.cookie = name + "=" + value + ";expires=01/01/2080";
	}
	
	//----------------------------------------------//
	
	SaveGame.prototype.getLevelData = function(k) {
		this.load();
		for(var i = 0; i < this.data.length; i++) {
			if(this.data[i][0] == k && this.data[i].length == 3) return this.data[i];
		}
		return false;
	}
	
	SaveGame.prototype.getStars = function(i) {
		var leveldata = this.getLevelData(i);
		return (leveldata) ? leveldata[1] : 0;
	}

	SaveGame.prototype.getSteps = function(i) {
		var leveldata = this.getLevelData(i);
		return (leveldata) ? leveldata[2] : 0;
	}
	
	SaveGame.prototype.getCompleted = function(i) {
		return (this.getLevelData(i) != false);
	}
	
	SaveGame.prototype.getLastCompleted = function() {
		this.load();		
		var last = -1;
		
		for(var i = 0; i < this.data.length; i++) {
			current = parseInt(this.data[i][0]);
			if(current > last && this.data[i].length == 3) {
				last = current;
			}
		}
		return last;
	}
	
	SaveGame.prototype.levelsCompleted = function() {
		this.load();
		var num = 0;
		for(var i = 0; i < this.data.length; i++) {
			if(this.data[i].length == 3) num++;
		}
		return num;
	}
	
	SaveGame.prototype.setCompleted = function(i, j, k) {	
		if(this.getCompleted(i)) {
			for(var l = 0; l < this.data.length; l++) {
				if(this.data[l][0] == i && this.data[l].length == 3) this.data[l] = [i, j, k];
			}
		} else {
			this.data.push([i, j, k]);
		}
		this.save();
	}
	
 window.SaveGame = SaveGame;
} (window));