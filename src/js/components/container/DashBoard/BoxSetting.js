
import React, { Component } from "react";


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
//Properties prototypes
var Axes={ 
   showgrid: true,
   gridcolor: '#bdbdbd',
   gridwidth: 2,

   zeroline: true,
   zerolinecolor: '#969696',
   zerolinewidth: 4,

   showline: true,
   linecolor: '#636363',
   linewidth: 6,

   type:"line"
}



/************************************************
 *            Main Component
 * ************************************************/       
class BoxSetting extends Component {
   constructor(props) {

               super(props);
           
               this.state =  {
                   select:"choose"
               }

           this.configurationChart=this.configurationChart.bind(this);
           this.Select=this.Select.bind(this);
           this.Cancel=this.Cancel.bind(this);
           this.Done=this.Done.bind(this);
       
       }
       // Cancel button
       Cancel(){
           
           this.setState({  select:"choose" });
           document.getElementById('choose').selected="selected"
       }

        // Cancel button
        Done(){
           
           var proper = {};
           var Properties;
           var select= this.state.select;
           
           if(select!=="choose"){

               

               if(select ==="xaxis" || select ==="yaxis"){Properties=Object.assign({},Axes)}
              
           
               for (var prop in Properties){
                  
                   //radiobuttom
                   if(prop === "showgrid" || prop === "zeroline" || prop === "showline"){

                       Properties[prop] = document.getElementById("config"+prop).checked;
                       Object.defineProperty(proper, prop, {
                           value: document.getElementById("config"+prop).checked,
                           writable: true
                           });
                      
                   }
                  else{
                   
                   if(document.getElementById("config"+prop).value!==""){
                       Object.defineProperty(proper, prop, {
                           value: document.getElementById("config"+prop).value,
                           writable: true
                           });
                   }
                       
                  }
                  
               }
           }
           

           var newLayout = Object.assign({},this.props.info.layout);
               newLayout[select] = Object.assign(proper,newLayout[select]);



           var Tester=document.getElementById(this.props.info.graphicId);

           Plotly.relayout(Tester, newLayout);
           
           this.setState({  select:"choose" });
           document.getElementById('choose').selected="selected"
       }


       //Selector channel
       Select(){

           let d=document.getElementById("inputGroupSelect02").value;
            this.setState({  select:d });
        }
        



       //Configuration chart
       configurationChart(){
           var array=[];
           var select= this.state.select;
          
           if(select==="choose"){<div></div>}
           else{
               var Properties;
               if(select ==="xaxis" || select ==="yaxis"){Properties=Object.assign({},Axes)}
              
           
               for (var prop in Properties){

                  

                   if(prop === "type"){
                      
                        array.push( 
                           <div className="input-group input-group-sm mb-2">

                                   <div className="input-group-prepend">
                                       <span className="input-group-text" >Type</span>
                                   </div>

                               <select className="custom-select" id="configtype" >                                        
                                                           <option  value="lineal" >Lineal</option>
                                                           <option  value="log" >Logarithmic</option>
                               </select> 
                           </div> 
                                                
                                    )
                    }
                   //radiobuttom
                   else if(prop === "showgrid" || prop === "zeroline" || prop === "showline"){

                     var  val=true;

                       //Settings default values
                       if(prop in this.props.info.layout[select]){
                               val=this.props.info.layout[select][prop]
                           }
                        else {
                           val = prop==="showline" ? false:true
                        } 

                        //check
                        val = val===true? true: false;
                        //element 
                       array.push( 
                                   <div className="custom-control custom-checkbox mb-2 mt-3 ">
                                       <input type="checkbox" className="custom-control-input" id={"config"+prop} checked={val}/>
                                       <label className="custom-control-label text-primary" for={"config"+prop} >{prop}</label>
                                   </div>      
                                   )
                   }
                  else{
                       array.push(
                           <div className="input-group input-group-sm mb-2">
                                               <div className="input-group-prepend">
                                                   <span className="input-group-text text-primary" >{prop}</span>
                                               </div>
                                               <input id={"config"+prop}  type="text" className="form-control" name={prop}  />
                           </div> 
                       )
                  }
                  
               }
       
               array.push(
                   <div className="input-group input-group-sm mb-2 mt-5">
                        <button className="btn btn-success btn-block" onClick={this.Done}>Done</button>
                         <button className="btn btn-danger btn-block" onClick={this.Cancel}>Cancel</button>
                   </div> 
                         
               )
               return array
           }
          
       }

       componentDidMount() {
           var ConfigChart = document.getElementById("Config_Chart")
            dragElement(ConfigChart);
     } 


   render(){
       var id=this.props.info.graphicId;
       var layout=this.props.info.layout;
       
       var show_config= this.state.select==="choose"? {display:"none"}:{display:"block"}
       var chart=this.configurationChart();


               return(
   
                       <div id="setGraphic">
                           <p style={{color:"rgb(200,200,200)",fontSize:"20px"}}>{"Tools & Layout"}</p>

                               <select className="custom-select" id="inputGroupSelect02" onChange={this.Select}>
                                           <option id="choose" value="choose" selected >Configuration ...</option>
                                           <option id="xaxis" value="xaxis" >X Axis</option>
                                           <option id="yaxis" value="yaxis" >Y Axis</option>
                                </select>   
   
                               <div className="card border-primary mb-2" id="Config_Chart" style={show_config}>
                                   <div className="card-header bg-primary" id="Config_Chart_header" >Styling Graphic</div>
                                   <div className="card-body ">
                                       {chart}
                                   </div>
                             </div>
                       </div>
   
               )

   }    

}
 
export default BoxSetting;