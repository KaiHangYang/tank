function gameStart(){
	//画笔
	audStart.play();
	GAMEOVER = false;
	TANKLIFE = 6;
	ENEMYDEATH = 1;
	WIN = false;
	//先写出来所需要的数组
	enemyArr = new Array(null, null, null, null);
	enemyBullet = new Array(null, null, null, null);
	enemyBulletBomb = new Array(null, null, null, null);
	enemyBomb = new Array(null, null, null, null);
	enemyBorn = new Array(null, null, null, null);

	play1 = null;//这个就是玩家
	player1Bullet = null;
	player1BulletBomb = null;
	player1Bomb = null;
	player1Born = null;
	//写tank出生的类
	function tankBorn(x, y){
		var tBorn = {};
		tBorn.x = x;
		tBorn.y = y;
		tBorn.time = 0;
		tBorn.isLive = true;
		
		tBorn.drawBorn = function drawBorn(){
			if (tBorn.time <= 1){
				canv.drawImage(born[0], tBorn.x, tBorn.y, 40, 40);
			}
			else if (tBorn.time <= 4){
				canv.drawImage(born[1], tBorn.x, tBorn.y, 40, 40);
			}
			else if (tBorn.time <= 8){
				canv.drawImage(born[2], tBorn.x, tBorn.y, 40, 40);
			}
			else if (tBorn.time <= 13){
				canv.drawImage(born[3], tBorn.x, tBorn.y, 40, 40);
			}
			tBorn.time ++;
			if (tBorn.time > 13){
				tBorn.isLive = false;
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
			if (tBomb.time <= 1){
				canv.drawImage(blast[4], tBomb.x, tBomb.y, 40, 40);
			}
			else if (tBomb.time <= 4){
				canv.drawImage(blast[5], tBomb.x, tBomb.y, 40, 40);
			}
			else if (tBomb.time <= 7){
				canv.drawImage(blast[6], tBomb.x, tBomb.y, 40, 40);
			}
			else if (tBomb.time <= 10){
				canv.drawImage(blast[7], tBomb.x, tBomb.y, 40, 40);
			}
			tBomb.time ++;
			if (tBomb.time > 10){
				tBomb.isLive = false;
				tBomb.time = 0;
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
	function Enemy(x, y, dir, rate, tankType, isLive, en){
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
		enemy.fire = function() {
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
			for (var en2 = 0; en2 <= enemyArr.length; en2++){
				enemy2 = enemyArr[en2];
				if (enemy2 == enemy1){
					continue;
				}
				if (enemy2 != null && enemy2.isLive == true){
					switch (enemy1.dir){
						case 0:
							if ((enemy1.y <= (enemy2.y + 42))&&((enemy1.x >= enemy2.x+4)&&(enemy1.x <= (enemy2.x + 36))||((enemy1.x+20) >= enemy2.x)&&((enemy1.x+20)<=(enemy2.x+40))||((enemy1.x+40)>=enemy2.x+4)&&((enemy1.x+40) <= (enemy2.x+36)))&&((enemy1.y+40)>=enemy2.y+40)){
								enemy1.y += 40-enemy1.y+enemy2.y;
								return true;
							}
							break;
						case 1:
							if ((enemy1.x+42) >= enemy2.x&&((enemy1.y >= enemy2.y+4)&&(enemy1.y <= (enemy2.y+36))||((enemy1.y+20) >= enemy2.y)&&((enemy1.y + 20) <= (enemy2.y+40))||((enemy1.y + 40) >= enemy2.y+4)&&((enemy1.y+40) <= (enemy2.y + 36)))&&(enemy1.x<=enemy2.x)){
								enemy1.x -= 40 + enemy1.x - enemy2.x;
								return true;
							}
							break;
						case 2:
							if ((enemy1.y+42) >= enemy2.y&&((enemy1.x >= enemy2.x+4)&&(enemy1.x <= (enemy2.x + 36))||((enemy1.x+20) >= enemy2.x)&&((enemy1.x+20)<=(enemy2.x +40))||((enemy1.x + 40)>= enemy2.x+4)&&((enemy1.x+40)<=(enemy2.x+36)))&&(enemy1.y <= enemy2.y)){
								enemy1.y -= 40 - enemy2.y + enemy1.y;
								return true;
							}
							break;
						case 3:
							if (enemy1.x <= (enemy2.x + 40)&&(enemy1.y>=(enemy2.y +4)&&(enemy1.y <= (enemy2.y+36))||((enemy1.y+20) >= enemy2.y)&&((enemy1.y + 20) <= (enemy2.y+40))||((enemy1.y + 40) >= enemy2.y+4)&&((enemy1.y+40) <= (enemy2.y + 36)))&&((enemy1.x+40)>=(enemy2.x+40))){
								enemy1.x += 40 - enemy1.x + enemy2.x;
								return true;
							}
							break;
					}
				}

				if (play1 != null && play1.isLive == true){
					switch (enemy1.dir){
						case 0:
							if ((enemy1.y <= (play1.y + 42))&&((enemy1.x >= play1.x+4)&&(enemy1.x <= (play1.x + 36))||((enemy1.x+20) >= play1.x)&&((enemy1.x+20)<=(play1.x+40))||((enemy1.x+40)>=play1.x+4)&&((enemy1.x+40) <= (play1.x+36)))&&((enemy1.y+40)>=play1.y+40)){
								enemy1.y += 40-enemy1.y+play1.y;
								return true;
							}
							break;
						case 1:
							if ((enemy1.x+42) >= play1.x&&((enemy1.y >= play1.y+4)&&(enemy1.y <= (play1.y+36))||((enemy1.y+20) >= play1.y)&&((enemy1.y + 20) <= (play1.y+40))||((enemy1.y + 40) >= play1.y+4)&&((enemy1.y+40) <= (play1.y + 36)))&&(enemy1.x<=play1.x)){
								enemy1.x -= 40 + enemy1.x - play1.x;
								return true;
							}
							break;
						case 2:
							if ((enemy1.y+42) >= play1.y&&((enemy1.x >= play1.x+4)&&(enemy1.x <= (play1.x + 36))||((enemy1.x+20) >= play1.x)&&((enemy1.x+20)<=(play1.x +40))||((enemy1.x + 40)>= play1.x+4)&&((enemy1.x+40)<=(play1.x+36)))&&(enemy1.y <= play1.y)){
								enemy1.y -= 40 - play1.y + enemy1.y;
								return true;
							}
							break;
						case 3:
							if (enemy1.x <= (play1.x + 40)&&(enemy1.y>=(play1.y +4)&&(enemy1.y <= (play1.y+36))||((enemy1.y+20) >= play1.y)&&((enemy1.y + 20) <= (play1.y+40))||((enemy1.y + 40) >= play1.y+4)&&((enemy1.y+40) <= (play1.y + 36)))&&((enemy1.x+40)>=(play1.x+40))){
								enemy1.x += 40 - enemy1.x + play1.x;
								return true;
							}
							break;
					}
				}
			}

		}
		enemy.time = setInterval(function (){

			if (enemy.isLive){
				enemy.move();
				enemy.fire(en);
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
			for (en in enemyArr){
				if (enemyArr[en] == null || enemyArr[en].isLive == false){
					continue;
				}
				
				if (bullet.y <= (enemyArr[en].y+43) && bullet.y >= (enemyArr[en].y-3) && bullet.x >= (enemyArr[en].x-3) && bullet.x <= (enemyArr[en].x + 43)){
					enemyArr[en].isLive = false;
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
					enemyBomb[en] = new tankBomb(enemyArr[en].x, enemyArr[en].y);
					player1Bullet = null;
					audBlast.play();
					ENEMYDEATH --;
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
				player1Bomb = new tankBomb(play1.x, play1.y);
				enemyBullet[whichTank] = null;
				audBlast.play();
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


	//下来就是我方坦克和敌方坦克的碰撞事件；明天继续写。。。。。。
	function playerStrikeEnemy(player){
		if (player.isLive == false || player == null){
			return;	
		}
		for (en in enemyArr){
			if (enemyArr[en]==null||enemyArr[en].isLive == false){
				continue;
			}

			switch (player.dir){
				case 0: 
					if ((player.y <= (enemyArr[en].y + 42))&&((player.x >= enemyArr[en].x+4)&&(player.x <= (enemyArr[en].x + 36))||((player.x+20) >= enemyArr[en].x)&&((player.x+20)<=(enemyArr[en].x+40))||((player.x+40)>=enemyArr[en].x+4)&&((player.x+40) <= (enemyArr[en].x+36)))&&((player.y+40)>=enemyArr[en].y+40)){
						player.y += 40-player.y+enemyArr[en].y;
					}
					break;
				case 1:
					if ((player.x+42) >= enemyArr[en].x&&((player.y >= enemyArr[en].y+4)&&(player.y <= (enemyArr[en].y+36))||((player.y+20) >= enemyArr[en].y)&&((player.y + 20) <= (enemyArr[en].y+40))||((player.y + 40) >= enemyArr[en].y+4)&&((player.y+40) <= (enemyArr[en].y + 36)))&&(player.x<=enemyArr[en].x)){
						player.x -= 40 + player.x - enemyArr[en].x;
					}
					break;
				case 2:
					if ((player.y+42) >= enemyArr[en].y&&((player.x >= enemyArr[en].x+4)&&(player.x <= (enemyArr[en].x + 36))||((player.x+20) >= enemyArr[en].x)&&((player.x+20)<=(enemyArr[en].x +40))||((player.x + 40)>= enemyArr[en].x+4)&&((player.x+40)<=(enemyArr[en].x+36)))&&(player.y <= enemyArr[en].y)){
						player.y -= 40 - enemyArr[en].y + player.y;
					}
					break;
				case 3:
					if (player.x <= (enemyArr[en].x + 40)&&(player.y>=(enemyArr[en].y +4)&&(player.y <= (enemyArr[en].y+36))||((player.y+20) >= enemyArr[en].y)&&((player.y + 20) <= (enemyArr[en].y+40))||((player.y + 40) >= enemyArr[en].y+4)&&((player.y+40) <= (enemyArr[en].y + 36)))&&((player.x+40)>=(enemyArr[en].x+40))) {
						player.x += 40 - player.x + enemyArr[en].x;
					}
					break;
			}
		}
	}
	//下面是检测是否game over的
	function gameOverTest(){
		if ((map.mapArr[24][12] != 5&&GAMEOVER == false)||TANKLIFE == 0){
			setTimeout(function (){
				clearInterval(canvFresh);
				clearInterval(enemyNumTest);
				play1.fire = null;
				GAMEOVER = true;
			},200);
			WIN = false;
		}
		else if (ENEMYDEATH == 0){
			setTimeout(function (){
				clearInterval(canvFresh);
				clearInterval(enemyNumTest);
				play1.fire = null;
				GAMEOVER = true;
			},200);
			WIN = true;
		}
	}
	//下面是检测玩家坦克死亡的事件
	dieFlag = 0;
	function tankDie(){
		if (play1.isLive == false&&dieFlag==0){
			play1.fire = null;
			dieFlag = 1;
			TANKLIFE --;
			window.setTimeout(function (){

				player1Born = new tankBorn(160, 480);
				window.setTimeout(function (){
					play1 = new Player(160, 480, 0, 5, player2, true);
					dieFlag = 0;
				},200);
				
			},3400)
		}
	}

	play1 = new Player(160, 480, 0, 5, player2, true);
	enemyArr[0] = new Enemy(0, 0, 2, 2, enemy1, true, 0);
	enemyArr[1] = new Enemy(180, 0, 2, 2, enemy2, true, 1);
	enemyArr[2] = new Enemy(340, 0, 2, 3.5, enemy3, true, 2);
	enemyArr[3] = new Enemy(500, 0, 2, 3, enemy4[0], true, 3);
	function drawEnemyTank(tank){
		for (en in tank){
			if (tank[en].isLive==false){
				continue;
			}
			canv.drawImage(tank[en].tankType[tank[en].dir], tank[en].x, tank[en].y, 40, 40);
		}
	}
	function drawPlayerTank(tank){
		if (tank.isLive==false){
			return;
		}
		canv.drawImage(tank.tankType[tank.dir], tank.x, tank.y, 40, 40);
	}
	//下面是定义时间然后重新画整个画布的函数；
	function canvDraw(map, player, enemy){

		canv.clearRect(0, 0, 520, 520);
		map.drawMap();
		drawPlayerTank(player);
		drawEnemyTank(enemy);
		if (player1Born != null&&player1Born.isLive == true){
			player1Born.drawBorn();
		}
		if (player1Bullet != null&&player1Bullet.isLive == true){
			canv.drawImage(pbul, player1Bullet.x, player1Bullet.y, 10, 10);
		}
		if (player1BulletBomb != null && player1BulletBomb.isLive == true){
			player1BulletBomb.drawBomb();
		}
		if (player1Bomb != null && player1Bomb.isLive == true&&player.isLive==false){
			player1Bomb.drawBomb();
		}
			
		for (en in enemyArr){
			if (enemyBorn[en] != null&& enemyBorn[en].isLive == true){
				enemyBorn[en].drawBorn();
			}
			if (enemyBullet[en] != null&&enemyBullet[en].isLive == true){
				canv.drawImage(ebul, enemyBullet[en].x, enemyBullet[en].y, 10, 10);
			}
			if (enemyBulletBomb[en] != null && enemyBulletBomb[en].isLive == true){
				enemyBulletBomb[en].drawBomb();
			}
			if (enemyBomb[en] != null&& enemyBomb[en].isLive == true){
				enemyBomb[en].drawBomb();
			}
		}

	}
	//下面的这个是很重要的
	window.onkeypress = function(event){
		switch (event.keyCode){
			case 119: 
				play1.moveUp();
				playerStrikeEnemy(play1);
				break;
			case 100:
				play1.moveRight();
				playerStrikeEnemy(play1);
				break;
			case 115:
				play1.moveDown();
				playerStrikeEnemy(play1);
				break;
			case 97:
				play1.moveLeft();
				playerStrikeEnemy(play1);
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
			[0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,2,2,5,6,2,2,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,2,2,6,6,2,2,0,0,0,0,0,0,0,0,0,0]
		];

	map.drawMap();
	play1.isLive = false;
	for (en in enemyArr){
		enemyArr[en].isLive = false;
	}
	canvFresh = window.setInterval(function(){
		canvDraw(map, play1, enemyArr);
		gameOverTest();
		tankDie();
	}, 10);	


	//下面的还是有问题需要优化  可以了
	enemyNumTest = window.setInterval(function (){
		var enemyNum = new Array();
		var i = 0;
		var n;
		for (var en = 0; en < enemyArr.length; en++){
			if (enemyArr[en].isLive == false){
				enemyNum[i++] = en;
			}
		}
		if ((4 - enemyNum.length) < ENEMYDEATH){

			n = ENEMYDEATH - 4 + enemyNum.length;
			if (n >= enemyNum.length){
				n = enemyNum.length;
			}
			for (var t = 0; t < n; t++){
				switch(enemyNum[t]){
					case 0:
						enemyBorn[0] = new tankBorn(0, 0);
						window.setTimeout(function (){
							enemyArr[0] = new Enemy(0, 0, 2, 2, enemy1, true, 0);
						},200);
						break;
					case 1:
						enemyBorn[1] = new tankBorn(180, 0);
						window.setTimeout(function (){
							enemyArr[1] = new Enemy(180, 0, 2, 2, enemy2, true, 1);
						},200);
						break;
					case 2:
						enemyBorn[2] = new tankBorn(340, 0);
						window.setTimeout(function (){
							enemyArr[2] = new Enemy(340, 0, 2, 3.5, enemy3, true, 2);
						},200);
						break;
					case 3:
						enemyBorn[3] = new tankBorn(340, 0);
						window.setTimeout(function (){
							enemyArr[3] = new Enemy(500, 0, 2, 3, enemy4[0], true, 3);
						},200);
						break;
				}
			}
		}
	}, 7000);
	
	g_Over = setInterval(function (){
		
			if (GAMEOVER == true){
				canv.clearRect(0, 0, 520, 520);
				canvStatic.clearRect(0, 0, 520, 520);
				canv.drawImage(gOver, 0, 0, 80, 5, 140, 192.5, 240, 15);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 10, 140, 192.5, 240, 30)", 100);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 15, 140, 192.5, 240, 45)", 200);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 20, 140, 192.5, 240, 60)", 300);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 25, 140, 192.5, 240, 75)", 400);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 30, 140, 192.5, 240, 90)", 500);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 35, 140, 192.5, 240, 105)", 600);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 40, 140, 192.5, 240, 120)", 700);
				setTimeout("canv.drawImage(gOver, 0, 0, 80, 45, 140, 192.5, 240, 135)", 800);
				clearInterval(g_Over);				
			}
	}, 1000);

}
//下面是地图编辑的方法
function mapDirect(){
	
}
window.onload = function(){
	canv = document.getElementById("canv2").getContext("2d");
	canvStatic = document.getElementById("canv1").getContext("2d");
	gameStart();
}