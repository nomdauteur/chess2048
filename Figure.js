
TYPES={ //Maybe also directions
	1:{"name":"pawn", "symbols":{"black":"♟","white":"♙"},"move_directions":[[1,0],[0,1],[-1,0],[0,-1]],"dir_scalable":0},
	2:{"name":"knight", "symbols":{"black":"♞","white":"♘"},"move_directions":[[1,2],[2,1],[-1,2],[2,-1],[1,-2],[-2,1],[-1,-2],[-2,-1]],"dir_scalable":0},
	3:{"name":"bishop", "symbols":{"black":"♝","white":"♗"},"move_directions":[[1,1],[1,-1],[-1,1],[-1,-1]],"dir_scalable":1},
	4:{"name":"rook", "symbols":{"black":"♜","white":"♖"},"move_directions":[[1,0],[0,1],[-1,0],[0,-1]],"dir_scalable":1},
	5:{"name":"queen", "symbols":{"black":"♛","white":"♕"},"move_directions":[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[0,1],[-1,0],[0,-1]],"dir_scalable":1},
	6:{"name":"king", "symbols":{"black":"♚","white":"♔"},"move_directions":[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[0,1],[-1,0],[0,-1]],"dir_scalable":0},
	0:{"name":"absence"}
};

class Figure {
	

	constructor(type,x,y) { //type as num, cell as e4
		this.type=TYPES[type];
		this.typeNo=type;
		this.cell={"x":x,"y":y};
		this.cellName=coordToCell(x,y);
		this.visited=0;

	}


	existsNextCell(eventKey) {
	if (eventKey!="ArrowRight" && eventKey!="ArrowLeft" && eventKey!="ArrowUp"&& eventKey!="ArrowDown") return false;
	if (eventKey=="ArrowRight") return (this.cell.x<7);
	if (eventKey=="ArrowLeft") return (this.cell.x>0);
	if (eventKey=="ArrowUp") return (this.cell.y>0);
	if (eventKey=="ArrowDown") return (this.cell.y<7);
}

    existsNextCellInDir(dir) {
    	return (this.cell.x+dir[1]>=0 && this.cell.x+dir[1]<=7 && this.cell.y+dir[0]>=0 && this.cell.y+dir[0]<=7);
    }

	

}