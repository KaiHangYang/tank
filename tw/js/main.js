//先搞出canvas’画笔‘
canv = document.getElementById("canv1").getContext('2d');
//先写出来所需要的数组
enemyBullet = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
player1Bullet = null;
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
//写Tank类
function Tank(x, y, dir, rate, tankType, isLive){
	var tank = {};
	tank.x = x;
	tank.y = y;
	tank.dir = dir;
	tank.rate = rate;
	tank.tankType = tankType;
	tank.isLive = isLive;
	
	tank.moveUp = function(){
		tank.y -= tank.rate;
		if (tank.y <= 0){
			tank.y = 0;
		}
		tank.dir = 0;
	}
	tank.moveDown = function(){
		tank.y += tank.rate;
		if (tank.y >= 520){
			tank.y = 520;
		}
		tank.dir = 2;
	}
	tank.moveRight = function(){
		tank.x += tank.rate;
		if (tank.x >= 520){
			tank.x = 520;
		}
		tank.dir = 1;
	}
	tank.moveLeft = function(){
		tank.x -= tank.rate;
		if (tank.x <= 0){
			tank.x = 0;
		}
		tank.dir = 3;
	}
	return tank;
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
						
				}
			}
		}
	}

	return bullet;
}
//下来是对于玩家和enemy的tank 需要继承于原来的Tank
function Player (x, y, dir, rate, tankType, isLive){
	var player = {};
	player.tank = new Tank(x, y, dir, rate, tankType, isLive);

	player.attackEnemy = function(){
		if (playerBullet != null){
			return;
		}
		switch (player.tank.dir){
			case 0:
				playerBullet = new
		}
	}
	return player;
}
