window.onload = function(){
	//画笔
	canv = document.getElementById("canv1").getContext("2d");
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
		}
		this.moveDown = function(){
			this.y += this.rate;
			if (this.y >= 480){
				this.y = 480;
			}
			this.dir = 2;
		}
		this.moveRight = function(){
			this.x += this.rate;
			if (this.x >= 480){
				this.x = 480;
			}
			this.dir = 1;
		}
		this.moveLeft = function(){
			this.x -= this.rate;
			if (this.x <= 0)	{
				this.x = 0;
			}
			this.dir = 3;
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
							enemyBulletBomb[whichTank] = new bulletBomb(bullet.x - 5, bullet.y - 5);
							break;
						case 2:
							enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x - 5, bullet.y - 20);
							break;	
						case 3:
							enemyBulletBomb[whichTank] =  new bulletBomb(bullet.x, bullet.y - 5);
							break;	
					}

				}
			}
			else {
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
			switch (player.dir){
				case 0:
					player1Bullet = new Bullet(player.x + 15, player.y - 5, 10, player.dir);
					break;
				case 1:
					player1Bullet = new Bullet(player.x + 40, player.y + 15, 10, player.dir);
					break;
				case 2:
					player1Bullet = new Bullet(player.x + 15, player.y + 40, 10, player.dir);
					break;
				case 3:
					player1Bullet = new Bullet(player.x - 5, player.y + 15, 10, player.dir);
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

		enemy.move = function(){
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
			//其中1代表一般的墙，2代表铁墙，3代表水，4代表草，5代表基地
			for (i in map.mapArr){
				for (j in map.mapArr[i]){
					switch (map.mapArr[i][j]){
						case 1: canv.drawImage(wall, j*20, i*20, 20, 20);break;
						case 2: canv.drawImage(steel, j*20, i*20, 20, 20);break;
						case 3: canv.drawImage(water, j*20, i*20, 20, 20);break;
						case 4: canv.drawImage(grass, j*20, i*20, 20, 20);break;
						case 5: canv.drawImage(base, j*20, i*20, 40, 40);break;
					}
				}
			}
		}

		return map;
	}









	//下面是画坦克的函数就只负责绘制；
	function drawTank(tank){
		canv.drawImage(tank.tankType[tank.dir], tank.x, tank.y, 40, 40);
	}
	//下面是定义时间然后重新画整个画布的函数；
	function canvDraw(map, player){

		canv.clearRect(0, 0, 520, 520);
		map.drawMap();
		drawTank(player);
		if (player1Bullet != null){
			canv.drawImage(pbul, player1Bullet.x, player1Bullet.y, 10, 10);
		}
		if (player1BulletBomb != null && player1BulletBomb.isLive == true){
			player1BulletBomb.drawBomb();
		}


	}
	//下面是临时测试以及涉及到最后的实现。
	play = new Player(0, 0, 0, 5, player1, true);
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
			case 32:
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
			[0,0,0,0,0,0,0,0,0,0,1,1,5,0,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0]
		];
	var canvFresh = window.setInterval(function(){
		canvDraw(map, play);
	}, 20);

}
