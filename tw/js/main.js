window.onload = function(){
	//画笔
	canv = document.getElementById("canv2").getContext("2d");
	canvStatic = document.getElementById("canv1").getContext("2d");
	//先写出来所需要的数组
	enemyBullet = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	enemyBulletBomb = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
					enemyBulletbomb[whichTank] = null;
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
				if (bulletWallStrike(player1Bullet, map, "p1")){
					return;
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
					player1Bullet = new Bullet(player.x + 15, player.y - 5, 7, player.dir);
					break;
				case 1:
					player1Bullet = new Bullet(player.x + 40, player.y + 15, 7, player.dir);
					break;
				case 2:
					player1Bullet = new Bullet(player.x + 15, player.y + 40, 7, player.dir);
					break;
				case 3:
					player1Bullet = new Bullet(player.x - 5, player.y + 15, 7, player.dir);
					break;
			}
			player1Bullet.time = window.setInterval("player1Bullet.run('p1')", 20);
		}

		return player;
	}
	//敌人的坦克类。需要有敌方坦克的随意移动以及随意发子弹，以及他们的碰撞事件。现在还不太需要  所以等等在说。
	function Enemy(x, y, dir, rate, tankType, isLive){
		var enemy = {};
		enemy.tank = Tank;
		enemy.tank(x, y, dir, rate, tankType, isLive);
		enemy.time = null;

		enemy.move = function(){
			// if (enemy.isLive == false){

			// }我的构思：我想是先检测周围有没有墙如果有则随机选定一个方向发射子弹如果有一个方向没有则选定那个方向继续往前走
			

		}
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
		numY = Math.floor(bullet.y/20);

	switch(map.mapArr[numY][numX]){
		case 1:
			map.mapArr[numY][numX] = 0;
			window.clearInterval(bullet.time);
			bullet.isLive = false;
			if (whichTank == 'p1'){
				player1Bullet = null;
				player1BulletBomb = new bulletBomb(bullet.x - 5, bullet.y);
			}
			else {
				enemyBulletbomb[whichTank] = null;
				enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y);
			}
			return 1;
		case 2:
			if(bullet.strength == 1){
				map.mapArr[numY][numX] = 0;
			}	
			window.clearInterval(bullet.time);
			bullet.isLive = false;
			if (whichTank == 'p1'){
				player1Bullet = null;
				player1BulletBomb = new bulletBomb(bullet.x - 8, bullet.y - 8);
			}
			else {
				enemyBulletbomb[whichTank] = null;
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
				enemyBulletbomb[whichTank] = null;
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
			if (map.mapArr[Math.floor(y/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor(x/20)] == 3|| map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor((x+20)/20)] == 3|| map.mapArr[Math.floor(y/20)][Math.floor((x+35)/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor((x+35)/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor((x+35)/20)] == 3){
				tank.y = 20 * (Math.floor(y/20)+1);
			}
			break;
		case 1:
			if (map.mapArr[Math.floor(y/20)][Math.floor((x+40)/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor((x+40)/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor((x+40)/20)] == 3|| map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 1|| map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 2|| map.mapArr[Math.floor((y+20)/20)][Math.floor((x+40)/20)] == 3|| map.mapArr[Math.floor((y+35)/20)][Math.floor((x+40)/20)] == 1|| map.mapArr[Math.floor((y+35)/20)][Math.floor((x+40)/20)] == 2|| map.mapArr[Math.floor((y+35)/20)][Math.floor((x+40)/20)] == 3){
				tank.x = 20 * Math.floor(x/20);
			}
			break;
		case 2:
			if (map.mapArr[Math.floor((y+40)/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor((y+40)/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor((y+40)/20)][Math.floor(x/20)] == 3|| map.mapArr[Math.floor((y+40)/20)][Math.floor((x+20)/20)] == 1|| map.mapArr[Math.floor((y+40)/20)][Math.floor((x+20)/20)] == 2|| map.mapArr[Math.floor((y+40)/20)][Math.floor((x+20)/20)] == 3|| map.mapArr[Math.floor((y+40)/20)][Math.floor((x+35)/20)] == 1|| map.mapArr[Math.floor((y+40)/20)][Math.floor((x+35)/20)] == 2|| map.mapArr[Math.floor((y+40)/20)][Math.floor((x+35)/20)] == 3){
				tank.y = 20 * Math.floor(y/20);
			}
			break;
		case 3: 
			if (map.mapArr[Math.floor(y/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor(y/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor(y/20)][Math.floor(x/20)] == 3|| map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor((y+20)/20)][Math.floor(x/20)] == 3|| map.mapArr[Math.floor((y+35)/20)][Math.floor(x/20)] == 1|| map.mapArr[Math.floor((y+35)/20)][Math.floor(x/20)] == 2|| map.mapArr[Math.floor((y+35)/20)][Math.floor(x/20)] == 3){
				tank.x = 20 * (Math.floor(x/20)+1);
			}
			break;
	}
}
//回去把enemy给搞完吧






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


	}
	//下面是临时测试以及涉及到最后的实现。
	play = new Player(160, 480, 0, 5, player1, true);
	var enemy = new Array(4);
	e1 = new Enemy(0, 0, 2, 4, enemy1, true);
	//下面的这个是很重要的
	window.onkeypress = function(event){
		switch (event.keyCode){
			case 119: 
				play.moveUp();
				break;
			case 100:
				play.moveRight();
				break;
			case 115:
				play.moveDown();
				break;
			case 97:
				play.moveLeft();
				break;
		}
	}
	document.getElementById("canv1").onmousedown = function(event){
		if (event.button == 0){
			play.fire();
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
		canvDraw(map, play, e1);
	}, 20);

}
