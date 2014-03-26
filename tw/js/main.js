window.onload = function(){
	//画笔
	canv = document.getElementById("canv2").getContext("2d");
	canvStatic = document.getElementById("canv1").getContext("2d");
	//先写出来所需要的数组
	enemy = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	enemyBullet = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	enemyBulletBomb = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	play1 = null;//这个就是玩家
	player1Bullet = null;
	player1BulletBomb = null;
	//写tank出生的类
	function tankBorn(x, y){
		var tBorn = {};
		tBorn.x = x;
		tBorn.y = y;
		tBorn.time = 0;
		tBorn.born = true;
		
		tBorn.drawBorn = function drawBorn(){
			if (tBorn.time <= 1){
				canv.drawImage(born[0], tBorn.x, tBorn.y, 40, 40);
			}
			else if (tBorn.time <= 2){
				canv.drawImage(born[1], tBorn.x, tBorn.y, 40, 40);
			}
			else if (tBorn.time <= 3){
				canv.drawImage(born[2], tBorn.x, tBorn.y, 40, 40);
			}
			else if (tBorn.time <= 4){
				canv.drawImage(born[3], tBorn.x, tBorn.y, 40, 40);
			}
			tBorn.time ++;
			if (tBorn.time > 4){
				tBorn.born = false;
				tBorn.time = 0;
			}
		}
		return tBorn;
	}
	//然后是子弹爆炸类
	function bulletBomb(x, y){
		var bBomb = {};
		bBomb.x = x;
		bBomb.y = y;
		bBomb.time = 0;
		bBomb.isLive = true;

		bBomb.drawBomb = function(){
			if (bBomb.time <= 1){
				canv.drawImage(blast[0], bBomb.x, bBomb.y, 20, 20);
			}
			else if (bBomb.time <= 2){
				canv.drawImage(blast[1], bBomb.x, bBomb.y, 20, 20);
			}
			else if (bBomb.time <= 3){
				canv.drawImage(blast[2], bBomb.x, bBomb.y, 20, 20);
			}
			else if (bBomb.time <= 4){
				canv.drawImage(blast[3], bBomb.x, bBomb.y, 20, 20);
				audHit.play();
			}
			bBomb.time ++;
			if (bBomb.time > 4){
				bBomb.isLive = false;
				bBomb.time = 0;
			}
		}
		return bBomb;
	}
	//下来是坦克爆炸类
	function tankBomb(x, y){
		var tBomb = {};
		tBomb.x = x;
		tBomb.y = y;
		tBomb.time = 0;
		tBomb.isLive = true;
		
		tBomb.drawBomb = function(){
			if (bBomb.time <= 1){
				canv.drawImage(blast[4], bBomb.x, bBomb.y, 40, 40);
			}
			else if (bBomb.time <= 2){
				canv.drawImage(blast[5], bBomb.x, bBomb.y, 40, 40);
			}
			else if (bBomb.time <= 3){
				canv.drawImage(blast[6], bBomb.x, bBomb.y, 40, 40);
			}
			else if (bBomb.time <= 4){
				canv.drawImage(blast[7], bBomb.x, bBomb.y, 40, 40);
			}
			bBomb.time ++;
			if (bBomb.time > 4){
				bBomb.isLive = false;
				bBomb.time = 0;
			}
		}
		return tBomb;
	}

	//写Tank类
	function Tank(x, y, dir, rate, tankType, isLive){
		this.x = x;
		this.y = y;
		this.dir = dir;
		this.rate = rate;
		this.tankType = tankType;
		this.isLive = isLive;
		
		this.moveUp = function(){
			this.y -= this.rate;
			if (this.y <= 0){
				this.y = 0;
			}
			this.dir = 0;
			tankStrikeWall(this, map);
		}
		this.moveDown = function(){
			this.y += this.rate;
			if (this.y >= 480){
				this.y = 480;
			}
			this.dir = 2;
			tankStrikeWall(this, map);
		}
		this.moveRight = function(){
			this.x += this.rate;
			if (this.x >= 480){
				this.x = 480;
			}
			this.dir = 1;
			tankStrikeWall(this, map);
		}
		this.moveLeft = function(){
			this.x -= this.rate;
			if (this.x <= 0)	{
				this.x = 0;
			}
			this.dir = 3;
			tankStrikeWall(this, map);
		}
	}
	//然后是子弹类
	function Bullet(x, y, rate, dir){
		var bullet = {};
		bullet.x = x;
		bullet.y = y;
		bullet.rate = rate;
		bullet.dir = dir;
		bullet.time = null;
		bullet.isLive = true;
		bullet.strength = 0;

		bullet.run = function(whichTank){
			if ((bullet.x >= 520 || bullet.x <= 0 || bullet.y >= 520 || bullet.y <= 0) && bullet.isLive){
				window.clearInterval(bullet.time);
				bullet.isLive = false;
				if (whichTank == 'p1'){
					player1Bullet = null;
					switch (bullet.dir){
						case 0: 
							player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y);
							break;
						case 1:
							player1BulletBomb = new bulletBomb(bullet.x - 15, bullet.y - 5);
							break;
						case 2:
							player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y - 15);
							break;
						case 3:
							player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y - 5);
							break;
					}
				}
				else {
					enemyBullet[whichTank] = null;
					switch(bullet.dir){
						case 0:
							enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y);
							break;
						case 1:
							enemyBulletBomb[whichTank] = new bulletBomb(bullet.x - 15, bullet.y - 5);
							break;
						case 2:
							enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y - 15);
							break;	
						case 3:
							enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x -5, bullet.y - 5);
							break;	
					}
				}
			}
			else {

				if (whichTank == "p1"){
					if (bulletWallStrike(player1Bullet, map, "p1")){
						return;
					}	
				}
				else{
					if (bulletWallStrike(enemyBullet[whichTank], map, whichTank)){
						return;
					}
				}
				switch (bullet.dir){
					case 0:
						bullet.y -= bullet.rate;
						break;
					case 1:
						bullet.x += bullet.rate;
						break;
					case 2:
						bullet.y += bullet.rate;
						break;
					case 3:
						bullet.x -= bullet.rate;
						break;
				}
				bulletStrikeTank(bullet, whichTank);
				if (whichTank == "p1"){
					bulletStrikeBullet(bullet);	
				}
			}
		}

		return bullet;
	}
	//下来是对于player和enemy的tank 需要继承于原来的Tank
	function Player (x, y, dir, rate, tankType, isLive){
		var player = {};
		player.tank = Tank;
		player.tank(x, y, dir, rate, tankType, isLive);

		player.fire = function(){

			if (player1Bullet != null){
				return;
			}
			audFire.play();//子弹发音
			switch (player.dir){
				case 0:
					player1Bullet = new Bullet(player.x + 15, player.y, 7, player.dir);
					break;
				case 1:
					player1Bullet = new Bullet(player.x + 30, player.y + 15, 7, player.dir);
					break;
				case 2:
					player1Bullet = new Bullet(player.x + 15, player.y + 30, 7, player.dir);
					break;
				case 3:
					player1Bullet = new Bullet(player.x, player.y + 15, 7, player.dir);
					break;
			}
			player1Bullet.time = window.setInterval("player1Bullet.run('p1')", 20);
		}

		return player;
	}
	//敌人的坦克类。需要有敌方坦克的随意移动以及随意发子弹，以及他们的碰撞事件。这个敌人坦克的随机运动与发射子弹参考了别人的代码。 原来是想要使用setInteral来做敌人坦克的随机移动不过看到别人用的那种方法觉得更好一些
	function Enemy(x, y, dir, rate, tankType, isLive){
		var enemy = {};
		enemy.tank = Tank;
		enemy.tank(x, y, dir, rate, tankType, isLive);
		enemy.time = null;

		enemy.move = function(){
			if (enemy.isLive == false){
				return;
			}
			enemy.changeDir();
			switch (enemy.dir){
				case 0: 
					if (enemy.y <= 0){
						enemy.beyondChange();
						return;
					}
					if (!enemy.enemyTouch(enemy)){
						enemy.moveUp();
					}
					break;
				case 1:
					if (enemy.x >= 480){
						enemy.beyondChange();
						return;
					}
					if (!enemy.enemyTouch(enemy)){
						enemy.moveRight();
					}
					break;
				case 2: 
					if (enemy.y >= 480){
						enemy.beyondChange();
						return;
					}
					if (!enemy.enemyTouch(enemy)){
						enemy.moveDown();
					}
					break;
				case 3:
					if (enemy.x <= 0){
						enemy.beyondChange();
						return;
					}
					if (!enemy.enemyTouch(enemy)){
						enemy.moveLeft();
					}
					break;
			}
		}
		enemy.changeDir = function (){
			var randDir = Math.round(Math.random()*99);
			if (randDir < 4){
				enemy.dir = Math.round(Math.random()*3);
			}
		}
		enemy.beyondChange = function (){
			enemy.dir = Math.round(Math.random()*3);
		}
		enemy.fire = function(en) {
			if (enemyBullet[en] != null){
				return;
			}
			if ((Math.round(Math.random()*99)) < 3){
				switch (enemy.dir){
				case 0:
					enemyBullet[en] = new Bullet(enemy.x + 15, enemy.y - 5, 7, enemy.dir);
					break;
				case 1:
					enemyBullet[en] = new Bullet(enemy.x + 40, enemy.y + 15, 7, enemy.dir);
					break;
				case 2:
					enemyBullet[en] = new Bullet(enemy.x + 15, enemy.y + 40, 7, enemy.dir);
					break;
				case 3:
					enemyBullet[en] = new Bullet(enemy.x - 5, enemy.y + 15, 7, enemy.dir);
					break;
				}
				enemyBullet[en].time = window.setInterval("enemyBullet["+en+"].run("+en+")", 20);
			}
		}
		enemy.enemyTouch = function (enemy1){
			var enemy2 = null;
			for (var en2 = 0; en2 < enemy.length; en2++){
				enemy2 = enemy[en2];
				if (enemy2 != null && enemy2.isLive == true){
					switch (enemy1.dir){
						case 0:
							if ((enemy1.x > enemy2.x - 40)&&(enemy1.x < enemy2.x + 40)&&(enemy1.y <= enemy2.y - 38)){
								return true;
							}
							break;
						case 1:
							if ((enemy1.y > enemy2.y - 40)&&(enemy1.y < enemy2.y + 40)&&(enemy1.x >= enemy2.x - 38)){
								return true;
							}
							break;
						case 2:
							if ((enemy1.x > enemy2.x - 40)&&(enemy1.x < enemy2.x + 40)&&(enemy1.y >= enemy2.y - 38)){
								return true;
							}
							break;
						case 3:
							if ((enemy1.y > enemy2.y - 40)&&(enemy1.y < enemy2.y + 40)&&(enemy1.x <= enemy2.x + 38)){
								return true;
							}
							break;
					}
				}
				if (play1 != null && play1.isLive == true){
					switch (enemy1.dir){
						case 0:
							if ((enemy1.x > play1.x - 40)&&(enemy1.x < play1.x + 40)&&(enemy1.y <= play1.y - 38)){
								return true;
							}
							break;
						case 1:
							if ((enemy1.y > play1.y - 40)&&(enemy1.y < play1.y + 40)&&(enemy1.x >= play1.x - 38)){
								return true;
							}
							break;
						case 2:
							if ((enemy1.x > play1.x - 40)&&(enemy1.x < play1.x + 40)&&(enemy1.y >= play1.y - 38)){
								return true;
							}
							break;
						case 3:
							if ((enemy1.y > play1.y - 40)&&(enemy1.y < play1.y + 40)&&(enemy1.x <= play1.x + 38)){
								return true;
							}
							break;
					}
				}
			}

		}
		enemy.time = setInterval(function (){
			if (enemy.isLive){
				// enemy.move();
				enemy.fire(0);
			}
			else{
				clearInterval(enemy.time);
				enemy = null;
			}
		},20)

		return enemy;
	}
	//下面是我想搞得地图以及坦克的绘制。
	//先是地图吧
	function Map(){
		var map = {};
		map.mapArr = [   //注意这个数组是26 * 26 的数组 每个一代表20像素
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];//经过测试你所想得那种自定义墙的方法是可以实现的。我是想在自定义地图的时候直接操作一个数组最后画出来就可以了
		map.drawMap = function(){
			//这里使用来遍历数组中的所有元素以便画地图。
			//其中1代表一般的墙，2代表铁墙，3代表水，4代表草，5 6代表基地, 7代表爆炸的基地
			for (i in map.mapArr){
				for (j in map.mapArr[i]){
					switch (map.mapArr[i][j]){
						case 1: canv.drawImage(wall, j*20, i*20, 20, 20);break;
						case 2: canv.drawImage(steel, j*20, i*20, 20, 20);break;
						case 3: canv.drawImage(water, j*20, i*20, 20, 20);break;
						case 4: canvStatic.drawImage(grass, j*20, i*20, 20, 20);break;
						case 5: canv.drawImage(base, j*20, i*20, 40, 40);break;
						case 7: canv.drawImage(baseDes, j*20, i*20, 40, 40);break;
					}
				}
			}
		}

		return map;
	}

//下面是为了进行碰撞判断的函数，主要是用来判断是否击中墙和铁块同时在击中的时候来判断是否使墙块消失。貌似和以前的坦克大战不太一样待会再改
//这个我是想嵌入到bullet.run里面的.里面很多代码是是直接从bullet.run里面拷贝的
function bulletWallStrike(bullet, map, whichTank){

	var numX = Math.floor(bullet.x/20),
		numY = Math.floor((bullet.y)/20);

	switch(map.mapArr[numY][numX]){
		case 1:
			switch (bullet.dir){
				case 0: 
					if ((bullet.x - 20*numX) >= 10){
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY][numX+1] = 0;
					}
					else {
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY][numX-1] = 0;
					}
					break;
				case 1:
					if ((bullet.y - 20*numY) >= 10){
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY+1][numX] = 0;
					}
					else {
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY-1][numX] = 0;
					}
					break;
				case 2:
					if ((bullet.x - 20*numX) >= 10){
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY][numX+1] = 0;
					}
					else {
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY][numX-1] = 0;
					}
					break;
				case 3:
					if ((bullet.y - 20*numY) >= 10){
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY+1][numX] = 0;
					}
					else {
						map.mapArr[numY][numX] = 0;
						map.mapArr[numY-1][numX] = 0;
					}
					break;
			}
			window.clearInterval(bullet.time);
			bullet.isLive = false;
			if (whichTank == 'p1'){
				player1Bullet = null;
				player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y);
			}
			else {
				enemyBullet[whichTank] = null;
				enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y);
			}
			return 1;
		case 2:

			if(bullet.strength == 1){
				switch (bullet.dir){
					case 0: 
						if ((bullet.x - 20*numX) >= 10){
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY][numX+1] = 0;
						}
						else {
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY][numX-1] = 0;
						}
						break;
					case 1:
						if ((bullet.y - 20*numY) >= 10){
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY+1][numX] = 0;
						}
						else {
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY-1][numX] = 0;
						}
						break;
					case 2:
						if ((bullet.x - 20*numX) >= 10){
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY][numX+1] = 0;
						}
						else {
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY][numX-1] = 0;
						}
						break;
					case 3:
						if ((bullet.y - 20*numY) >= 10){
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY+1][numX] = 0;
						}
						else {
							map.mapArr[numY][numX] = 0;
							map.mapArr[numY-1][numX] = 0;
						}
						break;
				}
			}	
			window.clearInterval(bullet.time);
			bullet.isLive = false;
			if (whichTank == 'p1'){
				player1Bullet = null;
				player1BulletBomb = new bulletBomb(bullet.x - 8, bullet.y - 8);
			}
			else {
				enemyBullet[whichTank] = null;
				enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y - 5);
			}
			return 1;
		case 5:
		case 6://这里6是为了使子弹在三个方向打基地都会挂
			window.clearInterval(bullet.time);
			bullet.isLive = false;
			if (whichTank == 'p1'){
				player1Bullet = null;
				player1BulletBomb = new bulletBomb(bullet.x - 8, bullet.y - 8);
			}
			else {
				enemyBullet[whichTank] = null;
				enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y - 5);
			}
			map.mapArr[24][12] = 7;
			break;
	}
	return 0;
}
//下面我想实现坦克撞墙的判断
function tankStrikeWall(tank, map){
	var x = tank.x;
	var y = tank.y;
	switch (tank.dir){
		case 0: 
			if (map.mapArr[Math.floor(y/20)][Math.floor((x+2)/20)] == 6||map.mapArr[Math.floor(y/20)][Math.floor((x+2)/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor((x+2)/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor((x+2)/20)] == 3|| map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 6||map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 3|| map.mapArr[Math.floor(y/20)][Math.floor((x+38)/20)] == 6||map.mapArr[Math.floor(y/20)][Math.floor((x+38)/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor((x+38)/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor((x+38)/20)] == 3){
				tank.y = 20 * (Math.floor(y/20)+1);
			}
			break;
		case 1:
			if (map.mapArr[Math.floor((y+2)/20)][Math.floor((x+40)/20)] == 6||map.mapArr[Math.floor((y+2)/20)][Math.floor((x+40)/20)] == 1|| map.mapArr[Math.floor((y+2)/20)][Math.floor((x+40)/20)] == 2|| map.mapArr[Math.floor((y+2)/20)][Math.floor((x+40)/20)] == 3|| map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 6||map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 1|| map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 2|| map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 3|| map.mapArr[Math.floor((y+38)/20)][Math.floor((x+40)/20)] == 6||map.mapArr[Math.floor((y+38)/20)][Math.floor((x+40)/20)] == 1|| map.mapArr[Math.floor((y+38)/20)][Math.floor((x+40)/20)] == 2|| map.mapArr[Math.floor((y+38)/20)][Math.floor((x+40)/20)] == 3){
				tank.x = 20 * Math.floor(x/20);
			}
			break;
		case 2:
			if (map.mapArr[Math.floor((y+37)/20)][Math.floor((x+2)/20)] == 6||map.mapArr[Math.floor((y+37)/20)][Math.floor((x+2)/20)] == 1|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+2)/20)] == 2|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+2)/20)] == 3|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+20)/20)] == 6||map.mapArr[Math.floor((y+37)/20)][Math.floor((x+20)/20)] == 1|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+20)/20)] == 2|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+20)/20)] == 3|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+38)/20)] == 6||map.mapArr[Math.floor((y+37)/20)][Math.floor((x+38)/20)] == 1|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+38)/20)] == 2|| map.mapArr[Math.floor((y+37)/20)][Math.floor((x+38)/20)] == 3){
				tank.y = 20 * Math.floor(y/20);
			}
			break;
		case 3: 
			if (map.mapArr[Math.floor((y+2)/20)][Math.floor(x/20)] == 6||map.mapArr[Math.floor((y+2)/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor((y+2)/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor((y+2)/20)][Math.floor(x/20)] == 3|| map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 6||map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 3|| map.mapArr[Math.floor((y+38)/20)][Math.floor(x/20)] == 6||map.mapArr[Math.floor((y+38)/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor((y+38)/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor((y+38)/20)][Math.floor(x/20)] == 3){
				tank.x = 20 * (Math.floor(x/20)+1);
			}
			break;
	}
}
//回去把enemy给搞完吧
//下来是对于子弹打击坦克的检测
function bulletStrikeTank(bullet, whichTank){

	if (whichTank == "p1"){
		for (en in enemy){
			if (enemy[en] == null || enemy[en].isLive == false){
				continue;
			}
			
			if (bullet.y <= (enemy[en].y+43) && bullet.y >= (enemy[en].y-3) && bullet.x >= (enemy[en].x-3) && bullet.x <= (enemy[en].x + 43)){
				enemy[en].isLive = false;
				window.clearInterval(bullet.time);
				bullet.isLive = false;
				switch (bullet.dir){
						case 0: 
							player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y);
							break;
						case 1:
							player1BulletBomb = new bulletBomb(bullet.x - 15, bullet.y - 5);
							break;
						case 2:
							player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y - 15);
							break;
						case 3:
							player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y - 5);
							break;
					}
				player1Bullet = null;
				return;
			}
		}
	}	
	else {//如果是敌人的子弹的话呢么就要进行判断
		if (play1.isLive == false || play1 == null){
			return;
		}
		if (bullet.x >= (play1.x-2)&&bullet.x <= (play1.x+42)&&bullet.y >= (play1.y-2)&&bullet.y <= (play1.y+42)){
			play1.isLive = false;
			bullet.isLive = false;
			switch(bullet.dir){
				case 0:
					enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y);
					break;
				case 1:
					enemyBulletBomb[whichTank] = new bulletBomb(bullet.x - 15, bullet.y - 5);
					break;
				case 2:
					enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y - 15);
					break;	
				case 3:
					enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x -5, bullet.y - 5);
					break;	
			}
			window.clearInterval(bullet.time);
			bullet = null;
		}
	}
}


//这个是用来判断子弹与子弹是否撞击的
function bulletStrikeBullet(bullet){
	for (en in enemyBullet){
		if (enemyBullet[en] == null|| enemyBullet[en].isLive == false){
			return;
		}
		if (bullet.x >= (enemyBullet[en].x-10)&&bullet.x <= (enemyBullet[en].x+10)&&bullet.y>=(enemyBullet[en].y-10)&&bullet.y<=(enemyBullet[en].y+10)){
					window.clearInterval(bullet.time);
					window.clearInterval(enemyBullet[en].time);
					enemyBullet[en].isLive = false;
					player1Bullet.isLive = false;
					switch (bullet.dir){
							case 0: 
								player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y);
								break;
							case 1:
								player1BulletBomb = new bulletBomb(bullet.x - 15, bullet.y - 5);
								break;
							case 2:
								player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y - 15);
								break;
							case 3:
								player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y - 5);
								break;
						}
					player1Bullet = null;
					switch(enemyBullet[en].dir){
							case 0:
								enemyBulletBomb[en] =  new bulletBomb(enemyBullet[en].x - 5, enemyBullet[en].y);
								break;
							case 1:
								enemyBulletBomb[en] = new bulletBomb(enemyBullet[en].x - 15, enemyBullet[en].y - 5);
								break;
							case 2:
								enemyBulletBomb[en] =  new bulletBomb(enemyBullet[en].x - 5, enemyBullet[en].y - 15);
								break;	
							case 3:
								enemyBulletBomb[en] =  new bulletBomb(enemyBullet[en].x -5, enemyBullet[en].y - 5);
								break;	
						}
					enemyBullet[en] = null;
		}
	}
}





	//下面是画坦克的函数就只负责绘制；
	function drawTank(tank){
		canv.drawImage(tank.tankType[tank.dir], tank.x, tank.y, 40, 40);
	}
	//下面是定义时间然后重新画整个画布的函数；
	function canvDraw(map, player, enemy){

		canv.clearRect(0, 0, 520, 520);
		map.drawMap();
		drawTank(player);
		drawTank(enemy);
		if (player1Bullet != null){
			canv.drawImage(pbul, player1Bullet.x, player1Bullet.y, 10, 10);
		}
		if (player1BulletBomb != null && player1BulletBomb.isLive == true){
			player1BulletBomb.drawBomb();
		}
		if (enemyBullet[0] != null&&enemyBullet[0].isLive == true){
			canv.drawImage(ebul, enemyBullet[0].x, enemyBullet[0].y, 10, 10);
		}
		if (enemyBulletBomb[0] != null && enemyBulletBomb[0].isLive == true){
			enemyBulletBomb[0].drawBomb();
		}

	}
	//下面是临时测试以及涉及到最后的实现。
	play1 = new Player(160, 480, 0, 7, player2, true);
	enemy[0] = new Enemy(0, 0, 2, 3, enemy1, true);
	//下面的这个是很重要的
	window.onkeypress = function(event){
		switch (event.keyCode){
			case 119: 
				play1.moveUp();
				break;
			case 100:
				play1.moveRight();
				break;
			case 115:
				play1.moveDown();
				break;
			case 97:
				play1.moveLeft();
				break;
		}
	}
	document.getElementById("canv1").onmousedown = function(event){
		if (event.button == 0){
			play1.fire();
		}
	}

	//下面是地图	
	map = new Map();
	map.mapArr =  [   
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,1,1,1,1,0,0,2,2,2,2,0,0,3,3,3,3,0,0,4,4,4,4,0,0],
			[0,0,1,1,1,1,0,0,2,2,2,2,0,0,3,3,3,3,0,0,4,4,4,4,0,0],
			[0,0,1,1,1,1,0,0,2,2,2,2,0,0,3,3,3,3,0,0,4,4,4,4,0,0],
			[0,0,1,1,1,1,0,0,2,2,2,2,0,0,3,3,3,3,0,0,4,4,4,4,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,5,6,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,6,6,1,1,0,0,0,0,0,0,0,0,0,0]
		];
	var canvFresh = window.setInterval(function(){
		canvDraw(map, play1, enemy[0]);
	}, 10);
	// window.ondblclick = function(){
	// 	alert(play1.isLive);
	// }
}
