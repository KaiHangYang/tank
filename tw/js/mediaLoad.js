	//上面是图片加载
	wall = new Image();
	steel = new Image();
	grass = new Image();
	water = new Image();
	buff1 = new Image();
	buff2 = new Image();
	buff3 = new Image();
	buff4 = new Image();
 	base = new Image();
 	baseDes = new Image();
 	gOver = new Image();
 	win = new Image();
  	player1 = new Array();
	player2 = new Array();
	enemy1 = new Array();
	enemy2 = new Array();
	enemy3 = new Array();
	enemy4 = new Array();
	blast = new Array();
	born = new Array();
	//这里是音频加载
	audStart = new Audio("media/sound/start.wav");
	audBlast = new Audio("media/sound/blast.wav");
	audAdd = new Audio("media/sound/add.wav");
	audFire = new Audio("media/sound/fire.wav");
	audHit = new Audio("media/sound/hit.wav");

	
	for (var i=0; i <= 3; i++){
		player1[i] = new Image();
	}
	for (var i=0; i <= 3; i++){
		player2[i] = new Image();
	}
	for (var i=0; i <= 3; i++){
		enemy1[i] = new Image();
	}
	for (var i=0; i <= 3; i++){
		enemy2[i] = new Image();
	} 
	for (var i=0; i <= 3; i++){
		enemy3[i] = new Image();
	}
	for (var i=0; i <= 3; i++){
		enemy4[i] = new Array();
	}
	for (var i=0; i < 3; i++){
		for (var j=0; j <= 3; j++){
			enemy4[i][j] = new Image();
		}
	}
	for (var i=0; i<8; i++){
		blast[i] = new Image();
	}
	for (var i=0; i<4; i++){
		born[i] = new Image();
	}
	pbul = new Image();
	ebul = new Image();

	wall.src = "media/img/wall/wall.gif";
	steel.src = "media/img/wall/steel.gif";
	grass.src = "media/img/wall/grass.gif";
	water.src = "media/img/wall/water.gif";
	buff1.src = "media/img/buff/bomb.gif";
	buff2.src = "media/img/buff/mintank.gif";
	buff3.src = "media/img/buff/star.gif";
	buff4.src = "media/img/buff/timer.gif";
	base.src = "media/img/others/symbol.gif";
	baseDes.src = "media/img/effect/destory.gif";
	gOver.src = "media/img/others/over.gif";
	win.src = "media/img/others/win.png";
	player1[0].src = "media/img/player/p1tankU.gif";
	player1[1].src = "media/img/player/p1tankR.gif";
	player1[2].src = "media/img/player/p1tankD.gif";
	player1[3].src = "media/img/player/p1tankL.gif";
	player2[0].src = "media/img/player/p2tankU.gif";
	player2[1].src = "media/img/player/p2tankR.gif";
	player2[2].src = "media/img/player/p2tankD.gif";
	player2[3].src = "media/img/player/p2tankL.gif";
	putImgSrc(1,4,enemy1,"e1");
	putImgSrc(1,4,enemy2,"e2");
	putImgSrc(1,4,enemy3,"e3");
	putImgSrc(3,4,enemy4,"e4");
	for (i=0; i<8; i++){
		blast[i].src = "media/img/effect/blast" + (i+1) + ".gif";
	}
	for (i=0; i<4; i++){
		born[i].src = "media/img/effect/born" + (i+1) + ".gif";
	}
	pbul.src = "media/img/others/playerbullet.gif";
	ebul.src = "media/img/others/enemybullet.gif";
	function putImgSrc(arrD1,arrD2,arrName,srcName){
		if (arrD1 > 1){
			for (var i=1; i <= arrD1; i++){
				for (var j=0; j < arrD2; j++){
					arrName[i-1][j].src = "media/img/enemy/" + srcName + "_" + i + "_" + j + ".gif";
				}
			}
		}
		else{
			for (var i=0; i<arrD2; i++){
				arrName[i].src = "media/img/enemy/" + srcName + "_" + i + ".gif";
			}
		}
	}
