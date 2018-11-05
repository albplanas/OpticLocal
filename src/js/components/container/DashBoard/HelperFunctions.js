/********************************************
 *              Draggable Component
 ********************************************/

 //Dragable mode
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
     
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
   
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  } 

/********************************************
 *     Tools buttons functions
 ********************************************/
   
function downloadImage(id) {
    var Tester=document.getElementById(id);
    Plotly.downloadImage(Tester);
  }
 
 function lasso(id,layout){
 
 
 var newLayout = Object.assign({},layout);
 newLayout.dragmode = 'lasso';
 
 var Tester=document.getElementById(id);
 Plotly.relayout(Tester, newLayout);
 }
 
 function zoomBox(id,layout){
 
   
 
    var newLayout = Object.assign({},layout);
    newLayout.dragmode = 'zoom';
    
    var Tester=document.getElementById(id);
    Plotly.relayout(Tester, newLayout);
    }
 
 function zoomBack(id,layout){
        var newLayout = Object.assign({},layout);
        newLayout.xaxis.range = [layout.xaxis.range[0]*2,layout.xaxis.range[1]*2];
        newLayout.yaxis.range = [layout.yaxis.range[0]*2,layout.yaxis.range[1]*2];
        
        var Tester=document.getElementById(id);
        Plotly.relayout(Tester, newLayout);
        }
 function zoomIn(id,layout){
          var newLayout = Object.assign({},layout);
          newLayout.xaxis.range = [layout.xaxis.range[0]/2,layout.xaxis.range[1]/2];
          newLayout.yaxis.range = [layout.yaxis.range[0]/2,layout.yaxis.range[1]/2];
          
          var Tester=document.getElementById(id);
          Plotly.relayout(Tester, newLayout);
          }      
 
 function pan(id,layout){
 
                var newLayout = Object.assign({},layout);
                newLayout.dragmode = 'pan';
                var Tester=document.getElementById(id);
                Plotly.relayout(Tester, newLayout);
            }




/********************************************
 *    Export functions
 ********************************************/

module.exports = {
                pan:pan,
                zoomBack:zoomBack,
                zoomIn:zoomIn,
                zoomBox:zoomBox,
                lasso:lasso,
                downloadImage:downloadImage,
                dragElement:dragElement
            }