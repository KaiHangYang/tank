window.onload = function(){
	//这里是制造地图的矩阵 一小格代表20px；
	var mapCanv = document.getElementById("canv1");
	var mapCtx = mapCanv.getContext("2d");
	var warCanv = document.getElementById("canv2");
	var warCtx = warCanv.getContext("2d");

	var mapVar = [
		[1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
		[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,1,9,0,1,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0]
		];
	//下来是对图像进行加载。
	var wall = new Image();
	var steel = new Image();
	var grass = new Image();
	var water = new Image();
	var buff1 = new Image();
	var buff2 = new Image();
	var buff3 = new Image();
	var buff4 = new Image();
	var base = new Image();
	var player1 = new Array(4);
	var player2 = new Array(4);
	for (var i=0; i <= 3; i++){
		player1[i] = new Image();
	}
	for (var i=0; i <= 3; i++){
		player2[i] = new Image();
	}

	wall.src = "media/img/wall/wall.gif";
	steel.src = "media/img/wall/steel.gif";
	grass.src = "media/img/wall/grass.gif";
	water.src = "media/img/wall/water.gif";
	buff1.src = "media/img/buff/bomb.gif";
	buff2.src = "media/img/buff/mintank.gif";
	buff3.src = "media/img/buff/star.gif";
	buff4.src = "media/img/buff/timer.gif";
	base.src = "media/img/others/symbol.gif";
	player1[0].src = "media/img/player/p1tankU.gif";
	player1[1].src = "media/img/player/p1tankR.gif";
	player1[2].src = "media/img/player/p1tankD.gif";
	player1[3].src = "media/img/player/p1tankL.gif";
	player2[0].src = "media/img/player/p2tankU.gif";
	player2[1].src = "media/img/player/p2tankR.gif";
	player2[2].src = "media/img/player/p2tankD.gif";
	player2[3].src = "media/img/player/p2tankL.gif";
	//下来是地图对象map话说只用画墙还有增益
	function norMap(){
		var map = {};
		map.wallP = [{X:0,Y:0}];//墙代表1
		map.waterP = [{X:2,Y:0}];//水代表3
		map.steelP = [{X:4,Y:0}];//金属代表2
		map.grassP = [{X:6,Y:0}];//草代表4
		map.buff = [{X:0,Y:0},{X:0,Y:0},{X:0,Y:0},{X:0,Y:0}];//buff[0] 5代表bomb，buff[1] 6mintank，buff[2] 7star，buff[3] 8timer。

		map.draw = function(){
			//先画墙再画buff
			for (i in mapVar){
				for (j in mapVar[i]){
					switch(mapVar[i][j]){
						case 1:mapCtx.drawImage(wall,j*20,i*20,20,20);break;
						case 2:mapCtx.drawImage(steel,j*20,i*20,20,20);break;
						case 3:mapCtx.drawImage(water,j*20,i*20,20,20);break;
						case 4:mapCtx.drawImage(grass,j*20,i*20,20,20);break;
						case 9:mapCtx.drawImage(base,j*20,i*20,40,40);break;
						default:break;
					}
				}
			}
			for (i in mapVar){
				for (j in mapVar[i]){
					switch(mapVar[i][j]){
						case 5: mapCtx.drawImage(buff1,j*20,i*20,20,20);break;
						case 6: mapCtx.drawImage(buff2,j*20,i*20,20,20);break;
						case 7: mapCtx.drawImage(buff3,j*20,i*20,20,20);break;
						case 8: mapCtx.drawImage(buff4,j*20,i*20,20,20);break;
						default:break;
					}
				}
			}
		}
		return map;
	}
	function warMap(){
		var map = {};
		map.draw = function(){
			warCtx.clearRect(0,0,520,520);
			warCtx.fillStyle = "rgb(3,3,3)";
			warCtx.fillRect(0,0,520,520);
		}
		return map;
	}
	//下面是实验
	var a = new norMap();
	var b = new warMap();
	player2[3].onload = function(){a.draw();}
	b.draw();//上面是实验
	//下面是tank对象
	
}
