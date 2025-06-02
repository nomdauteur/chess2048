
var LEFT_OFFSET;
var TOP_OFFSET;
var SIDE;

var lastAdShown;


class FieldOfChess {
	constructor() {
		this.width = 8;
		this.height = 8;
		this.field = Array(this.height).fill(0).map(x => Array(this.width).fill(0));

		
		this.isPlaying=false;
		this.score=0;
		//document.getElementById("score").textContent="Счет: "+this.score;

		

	}

	

	
	init_field() {

		for (var i = 0; i < 8; i++)
			for (var j = 0; j < 8; j++)
				this.field[i][j]=new Figure(0,j,i);
		this.score=0;
		while (window.dataLoadFinished == 0) {
			sleep(250);
		}
		if (window.loadedScore!=0 && window.loadedScore !== undefined) this.score=window.loadedScore;
		if (window.loadedField != null && window.loadedField !== undefined) {
			for (var i = 0; i < 8; i++)
			for (var j = 0; j < 8; j++)
				this.field[i][j]=new Figure(window.loadedField[i][j],j,i);
		}
		window.loadedScore=0;
		window.loadedField=null;
		document.getElementById("score").textContent=setText("Счет: ","Score: ")+this.score;
		LEFT_OFFSET=vw(10);
		TOP_OFFSET=vh(10);
		SIDE=vmin(9);


		var init_y = randomInt(7);
		var init_x = randomInt(7);
		var fig = randomInt(1)+1;
		
		this.field[init_y][init_x]=new Figure(fig,init_x,init_y);
		
		
		

		for (var j=0; j < this.width; j++) {
			var d= document.createElement("div");
			d.id='cell_-1'+'_'+j;
			d.className = d.className + "legend";
			    d.style.left=(LEFT_OFFSET+j*SIDE)+"px";
                d.style.top=(TOP_OFFSET-SIDE)+"px";
                d.textContent=String(j+1);
                d.style.width=SIDE+"px";
                d.style.height=SIDE+"px";
                d.style.fontSize="7vmin";

                document.getElementById("game").appendChild(d);
		}
		for (var i=0; i < this.height; i++) {
			var d= document.createElement("div");
			d.id='cell_'+i+'_-1';
			d.className = d.className + "legend";
                d.style.left=(LEFT_OFFSET-SIDE)+"px";
                d.style.top=(TOP_OFFSET+SIDE*i)+"px";
                d.textContent=String.fromCharCode(97 + i);
                d.style.width=SIDE+"px";
                d.style.height=SIDE+"px";
                d.style.fontSize="7vmin";
                document.getElementById("game").appendChild(d);
		}
		for (var i = 0; i <this.height; i++) {
			for (var j=0; j < this.width; j++) {
				console.log("Wtf: left off is "+LEFT_OFFSET+" TOP OFFSET IS "+TOP_OFFSET+" side is "+SIDE+" j is "+j+" i is "+i);
				var d= document.createElement("div");
                d.id='cell_'+i+'_'+j;
                //d.className = d.className + "cell";
                if ((i+j) % 2 == 0) d.className = "whitecell";
                else d.className = "blackcell";
                d.style.left=(LEFT_OFFSET+j*SIDE)+"px";
                d.style.top=(TOP_OFFSET+SIDE*i)+"px";
                d.style.width=SIDE+"px";
                d.style.height=SIDE+"px";
                d.style.fontSize="7vmin";

                const _i=i;
                const _j=j;
                
                
                
                document.getElementById("game").appendChild(d);
                
    		}
    	}
        
        document.getElementById("newGame").style.bottom="5vh";
    	document.getElementById("score").style.bottom="5vh";

    	/*if (window.innerHeight<window.innerWidth)  {
    			document.getElementById("writings_0").style.bottom=(vmin(12)+document.getElementById("writings1").style.height)+"px"
    	}*/

    		if (window.innerHeight>=window.innerWidth) 
		{


	document.getElementById("newGame").style.left="90vw";
	document.getElementById("score").style.left="70vw";
	document.getElementById("newGame").style.bottom="5vh";

		/*document.getElementById("writings_0").style.left="13vw";
	document.getElementById("writings_0").style.width="40vw";
	document.getElementById("writings_0").style.bottom=(vh(100)-TOP_OFFSET-9*SIDE-vh(1))+"px";
	document.getElementById("writings_0").style.fontSize="1.5vmin";*/

	document.getElementById("writings1").style.left="15vw";
	document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings1").style.top=(TOP_OFFSET+9*SIDE+vh(1.5))+"px";
	document.getElementById("writings1").style.fontSize="1.5vmin";

	document.getElementById("writings2").style.left="25vw";
	document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings2").style.top=(TOP_OFFSET+9*SIDE+vh(1.5))+"px";
	document.getElementById("writings2").style.fontSize="1.5vmin";

	document.getElementById("writings3").style.left="35vw";
	document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings3").style.top=(TOP_OFFSET+9*SIDE+vh(1.5))+"px";
	document.getElementById("writings3").style.fontSize="1.5vmin";

}
    this.isPlaying=true;

     YaGames.init()

    .then((ysdk) => {
      

     
        // Informing about starting the gameplay.

        ysdk.features.GameplayAPI?.start();


    });  

    this.draw();
	}

	getNextPlace(y,x,eventKey) { 
		var ret={"x":-1,"y":-1};
		var name = this.field[y][x].type.name;
		if (!this.field[y][x].existsNextCell(eventKey)) return {"x":x,"y":y};
		else {
		var incr_x=(eventKey=="ArrowLeft"?-1:(eventKey=="ArrowRight"?1:0));
		var incr_y=(eventKey=="ArrowDown"?1:(eventKey=="ArrowUp"?-1:0));
		if (this.field[y][x].type.name=="pawn"){
			if (this.field[y+incr_y][x+incr_x].type.name=="absence" || this.field[y+incr_y][x+incr_x].type.name==name)
				return {"x":x+incr_x,"y":y+incr_y};
			else return {"x":x,"y":y};
		}
		if (this.field[y][x].type.name=="king") {
			if (this.field[y+incr_y][x+incr_x].type.name=="absence" )
				return {"x":x+incr_x,"y":y+incr_y};
			else return {"x":x,"y":y};
		}
		else if (this.field[y][x].type.name=="rook" || this.field[y][x].type.name=="queen") {
			while ((this.field[y][x].existsNextCell(eventKey)) && ((this.field[y+incr_y][x+incr_x].type.name=="absence") || this.field[y+incr_y][x+incr_x].type.name==name) ) {
				//if (!this.field[y][x].existsNextCell(eventKey)) break;
				x+=incr_x; y+=incr_y;
				if (this.field[y][x].type.name==name) break;
				//if (Math.random()>0.5) break; //randomness, or boring
			}
		

			return {"x":x,"y":y};
		}
		else if (this.field[y][x].type.name=="bishop") {
			dirs = this.field[y][x].type.move_directions.filter((v)=>v[0]==incr_y || v[1]==incr_x).sort( () => Math.random()-0.5 );
			var dir=[];
			for (var d of dirs) {
				if (!this.field[y][x].existsNextCellInDir(d)) continue;
				if ((this.field[y+d[0]][x+d[1]].type.name=="absence") ||this.field[y+d[0]][x+d[1]].type.name==name) {dir=d;break;}
			}
			while ((this.field[y][x].existsNextCellInDir(dir)) && ((this.field[y+dir[0]][x+dir[1]].type.name=="absence")||this.field[y+dir[0]][x+dir[1]].type.name==name) ) {
				//if (!this.field[y][x].existsNextCell(eventKey)) break;
				x+=dir[1]; y+=dir[0];
				if (this.field[y][x].type.name==name) break;
				//if (Math.random()>0.5) break; //randomness, or boring
			}
			return {"x":x,"y":y};
			
		}
		else if (this.field[y][x].type.name=="knight") {

			var dirs = this.field[y][x].type.move_directions.filter((v)=>v[0]==incr_y*2 || v[1]==incr_x*2).sort( () => Math.random()-0.5 );;
			var dir=[0,0];
			for (var d of dirs) {
				if (!this.field[y][x].existsNextCellInDir(d)) continue;
				if (this.field[y+d[0]][x+d[1]].type.name=="absence" || this.field[y+d[0]][x+d[1]].type.name==name) {dir=d; break;}
			}
			
			return {"x":x+dir[1],"y":y+dir[0]};
	}
	
	}
}

	step(eventKey) //"ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown" 
	{	if (!this.isPlaying) return;
		if (eventKey!="ArrowRight" && eventKey!="ArrowLeft" && eventKey!="ArrowUp"&& eventKey!="ArrowDown") return;
		for (var a = 0; a < 8; a++)
			for (var b = 0; b < 8; b++)
				this.field[a][b].visited=0;
		var TRAVERSE_DIR_X_BEGIN=(eventKey=="ArrowRight")?7:0;
		var TRAVERSE_DIR_X_END=(eventKey=="ArrowRight")?0:7;
		var X_INCR=(eventKey=="ArrowRight")?-1:1;
		var TRAVERSE_DIR_Y_BEGIN=(eventKey=="ArrowDown")?7:0;
		var TRAVERSE_DIR_Y_END=(eventKey=="ArrowDown")?0:7;
		var Y_INCR=(eventKey=="ArrowDown")?-1:1;
		var _i=TRAVERSE_DIR_Y_BEGIN;
		var _j=TRAVERSE_DIR_X_BEGIN;
		
		do {
			do {
				if ((this.field[_i][_j].type.name!="absence") && (this.field[_i][_j].visited!=1) ) {
				var pos = this.getNextPlace(_i,_j,eventKey);
				if ((this.field[pos.y][pos.x].type.name=="absence")|| (_i==pos.y && _j==pos.x)) {
				this.field[pos.y][pos.x].type=this.field[_i][_j].type;
				this.field[pos.y][pos.x].typeNo=this.field[_i][_j].typeNo;
				this.field[pos.y][pos.x].visited=1;
				if (_i!=pos.y || _j!=pos.x) {
					this.field[_i][_j]=new Figure(0,_j,_i);
					document.getElementById("writings_all").innerHTML+="<p>"+this.field[pos.y][pos.x].type.symbols.black+this.field[_i][_j].cellName+"-"+this.field[pos.y][pos.x].cellName+"</p>";
				}
			    }
			    else if (this.field[pos.y][pos.x].type.name==this.field[_i][_j].type.name) {
			    	this.score+=Math.pow(2,this.field[_i][_j].typeNo);
			    	if (this.score > window.prev_score)
        {
          YaGames.init()

    .then((ysdk) => {

      ysdk.getLeaderboards()
  .then(lb => {
   
    lb.setLeaderboardScore('chess2048', Math.min(this.score,2147483647));
    window.prev_score = this.score;
    
  });

    });
     
  }
			    	document.getElementById("score").textContent=setText("Счет: ","Score: ")+this.score;
			    this.field[pos.y][pos.x].typeNo=Math.min(this.field[_i][_j].typeNo+1,6);
			    this.field[pos.y][pos.x].type=TYPES[this.field[pos.y][pos.x].typeNo];
				this.field[pos.y][pos.x].visited=1;
				if (_i!=pos.y || _j!=pos.x) this.field[_i][_j]=new Figure(0,_j,_i);
				document.getElementById("writings_all").innerHTML+="<p>"+this.field[pos.y][pos.x].type.symbols.black+this.field[_i][_j].cellName+"x"+this.field[pos.y][pos.x].cellName+"</p>";
			    }
				
			}
			_j+=X_INCR;
			} while (_j !=TRAVERSE_DIR_X_END+X_INCR);
			_i+=Y_INCR;
			_j=TRAVERSE_DIR_X_BEGIN;
		} while (_i !=TRAVERSE_DIR_Y_END+Y_INCR);

	//if no space, gameover
	if (Object.keys(Object.fromEntries(Object.entries(theField.field.flat()).filter(([k,v]) => v.type.name=="absence"))).length==0) {
		this.draw();
		this.gameover();


		
		
		//new game logic
		return;
	}

	//else spawn smth new	

	
	var free_x=[];
	var free_y=[];
	
		for (var a = 0; a<8;a++) {
		for (var b = 0; b<8;b++) {
			if (this.field[a][b].typeNo==0) {
				free_y.push(a);
				free_x.push(b);
			}
		}
		}
		
	var init_y;
	var init_x;
		var init_cnt= randomInt(free_x.length-1);
	init_y = free_y[init_cnt];
	init_x = free_x[init_cnt];
	
	var fig = randomInt(1)+1;
		
	this.field[init_y][init_x]=new Figure(fig,init_x,init_y);


	YaGames.init()

    .then((ysdk) => {
    	var fieldSave=Array(this.height).fill(0).map(x => Array(this.width).fill(0));

    for (var i = 0; i < 8; i++)
    	for (var j = 0; j < 8; j++)
    		fieldSave[i][j]=theField.field[i][j].typeNo;

     window.player.setData({
        fieldSave: fieldSave,
        score: this.score
    }).then(() => {
        console.log('data is set');
    });

    });

	

	this.draw();
	}



draw() {
	document.getElementById("writings1").innerHTML=document.getElementById("writings_all").innerHTML;
	document.getElementById("writings2").innerHTML=document.getElementById("writings_all").innerHTML;
	document.getElementById("writings3").innerHTML=document.getElementById("writings_all").innerHTML;

	for(var el of Array.from(document.getElementById("writings1").children).slice(0,-27)) {
			document.getElementById("writings1").removeChild(el);
		}
		
	for(var el of Array.from(document.getElementById("writings1").children).slice(-18)) {
			document.getElementById("writings1").removeChild(el);
		}
		
	for(var el of Array.from(document.getElementById("writings2").children).slice(0,-18)) {
			document.getElementById("writings2").removeChild(el);
		}
		
		for(var el of Array.from(document.getElementById("writings2").children).slice(-9)) {
			document.getElementById("writings2").removeChild(el);
		}
		
		
	for(var el of Array.from(document.getElementById("writings3").children).slice(0,-9)) {
			document.getElementById("writings3").removeChild(el);
		}


	for (var i = 0; i < 8; i++)
			for (var j = 0; j < 8; j++) {
				console.log("cell_"+i+"_"+j);
				document.getElementById("cell_"+i+"_"+j).textContent="";
				if (this.field[i][j].type.name!="absence")
				document.getElementById("cell_"+i+"_"+j).textContent=this.field[i][j].type.symbols.black;
	}

	var a = new Date(); 
	if (a-lastAdShown >=120000) {
		YaGames.init()

    .then((ysdk) => {

          ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {
           lastAdShown=new Date();

        },

        onError: function(error) {

          console.log(error);

        }

    }
	});

	
});
}

}

gameover() {

YaGames.init()

    .then((ysdk) => {
    
    var fieldSave=Array(8).fill(0).map(x => Array(8).fill(0));

     window.player.setData({
        fieldSave: fieldSave,
        score: 0
    }).then(() => {
        console.log('data is set');
    });

      ysdk.getLeaderboards()
  .then(lb => {
    
    lb.setLeaderboardScore('chess2048', Math.min(Math.max(this.score,window.prev_score),2147483647));
    window.prev_score = Math.max(this.score,window.prev_score);

    lb.getLeaderboardEntries('chess2048', { quantityTop: 5, includeUser: true, quantityAround:1 })
      .then(res => {console.log(res); window.leaderboard=res; /*drawLeaderboard();*/});
    
    
  });

        ysdk.features.GameplayAPI?.stop();

    });

	this.isPlaying=false;
	document.getElementById("score").textContent=setText("Вы проиграли","You lost");
	for (var i = 0; i < 8; i++)
			for (var j = 0; j < 8; j++) {

		document.getElementById("cell_"+i+"_"+j).textContent="";
		sleep(250);
		

}
}

}
	

function resize() {
	document.getElementById("newGame").style.bottom="5vh";
    	document.getElementById("score").style.bottom="5vh";
	var elements = document.getElementsByClassName("blackcell");
	
	 LEFT_OFFSET=vw(10);
		 TOP_OFFSET=vh(10);
		 SIDE=vmin(9);
	for (i = 0; i < elements.length;i++) {
		var coord=elements[i].id.substring(5).split("_");
		elements[i].style.left=(LEFT_OFFSET+coord[1]*SIDE)+"px";
                elements[i].style.top=(TOP_OFFSET+SIDE*coord[0])+"px";
                
                elements[i].style.width=SIDE+"px";
                elements[i].style.height=SIDE+"px";
                elements[i].style.fontSize=vmin(7)+"px";

	}

	elements = document.getElementsByClassName("whitecell");
	
	LEFT_OFFSET=vw(10);
	TOP_OFFSET=vh(10);
	SIDE=vmin(9);
	for (i = 0; i < elements.length;i++) {
		var coord=elements[i].id.substring(5).split("_");
		elements[i].style.left=(LEFT_OFFSET+coord[1]*SIDE)+"px";
                elements[i].style.top=(TOP_OFFSET+SIDE*coord[0])+"px";
                
                elements[i].style.width=SIDE+"px";
                elements[i].style.height=SIDE+"px";
                elements[i].style.fontSize=vmin(7)+"px";

	}

	elements=document.getElementsByClassName("legend");
	for (i = 0; i < elements.length;i++) {
		var coord=elements[i].id.substring(5).split("_");
		elements[i].style.left=(LEFT_OFFSET+coord[1]*SIDE)+"px";
                elements[i].style.top=(TOP_OFFSET+SIDE*coord[0])+"px";
                
                elements[i].style.width=SIDE+"px";
                elements[i].style.height=SIDE+"px";
                elements[i].style.fontSize=vmin(7)+"px";

	}

	if (window.innerWidth>window.innerHeight) {
	document.getElementById("score").style.left="65vw";
	document.getElementById("newGame").style.left="85vw";

	/*document.getElementById("writings_0").style.left="68.5vw";
	document.getElementById("writings_0").style.width="27vw";
	document.getElementById("writings_0").style.bottom=(vmin(12)+document.getElementById("writings1").style.height)+"px";
    
	document.getElementById("writings_0").style.fontSize="2vmin";*/

	document.getElementById("writings1").style.left="73vw";
		document.getElementById("writings1").style.top="20vmin";
		document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings1").style.fontSize="2vmin";

	document.getElementById("writings2").style.left="83vw";
	document.getElementById("writings2").style.top="20vmin";
	document.getElementById("writings2").style.bottom="20vmin";
	document.getElementById("writings2").style.fontSize="2vmin";

	document.getElementById("writings3").style.left="93vw";
	document.getElementById("writings3").style.top="20vmin";
	document.getElementById("writings3").style.bottom="20vmin";
	document.getElementById("writings3").style.fontSize="2vmin";	
}
else {

	document.getElementById("score").style.left="60vw";	
	document.getElementById("newGame").style.left="80vw";
	document.getElementById("newGame").style.bottom="5vh";

		/*document.getElementById("writings_0").style.left="13vw";
	document.getElementById("writings_0").style.width="40vw";
	document.getElementById("writings_0").style.bottom=(vh(100)-TOP_OFFSET-9*SIDE-vh(1))+"px";
	document.getElementById("writings_0").style.fontSize="1.5vmin";*/

	document.getElementById("writings1").style.left="15vw";
	document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings1").style.top=(TOP_OFFSET+9*SIDE+vh(1.5))+"px";
	document.getElementById("writings1").style.fontSize="1.5vmin";

	document.getElementById("writings2").style.left="25vw";
	document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings2").style.top=(TOP_OFFSET+9*SIDE+vh(1.5))+"px";
	document.getElementById("writings2").style.fontSize="1.5vmin";

	document.getElementById("writings3").style.left="35vw";
	document.getElementById("writings1").style.bottom="20vmin";
	document.getElementById("writings3").style.top=(TOP_OFFSET+9*SIDE+vh(1.5))+"px";
	document.getElementById("writings3").style.fontSize="1.5vmin";

}

	
}

