
function cellToCoord(cell) {
y = cell.charCodeAt(0)-97;
x = parseInt(cell.charAt(1))-1;
if (x<0 || x>7 || y<0 || y>7) return null;
return {"x":x,"y":y};
}

function coordToCell(x,y) {
	if (x<0 || x>7 || y<0 || y>7) return null;
	return String.fromCharCode(97 + y)+(x+1);
}

function randomInt(max) {
    return Math.floor(Math.random()*(max+1));
}




function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        	theField.step("ArrowLeft");
            /* right swipe */ 
        } else {
        	theField.step("ArrowRight");
            /* left swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
        	theField.step("ArrowUp");
            /* down swipe */ 
        } else { 
        	theField.step("ArrowDown");
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};