import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';




class Add_Element extends Component {
    constructor(props) {
        super(props);
        this.state =  {
              select:"Choose"
          }

        this.Add=this.Add.bind(this);
        this.Cancel=this.Cancel.bind(this);
        this.Select=this.Select.bind(this);
        this.SelectPrototype =  this.SelectPrototype.bind(this);
        this.PropertiesList =  this.PropertiesList.bind(this);
        this.dragElement =  this.dragElement.bind(this);
    }
//Helper functions
Cancel(){
    document.getElementById("inputGroupSelect01").value="Choose";
    this.setState({  select:"Choose" });
    
}
   Select(){

       let d=document.getElementById("inputGroupSelect01").value;
        this.setState({  select:d });
    }

    Add(){
        var sub=true;

        if(this.state.select !="Choose"){

            var fn=this.state.select
            var properties=this.SelectPrototype(fn,this.props.prototypes)
      
            var properties_list= Object.assign({}, properties[0]);
            
            for (var prop in properties[0]){

                if(prop==="fn" ){properties_list[prop]=fn; continue}
                if(prop==="id" ){properties_list[prop]=Date.now(); continue}
                if(prop==="gen" ){ properties_list[prop]=0; continue}
                if(prop==="name" ){ properties_list[prop]=document.getElementById("Add_"+prop).value; continue}

               var value=document.getElementById("Add_"+prop).value
              
               if(value.length>0){ 
                   properties_list[prop]= value }
               else{
                   sub=false;
                   document.getElementById("Add_"+prop).placeholder="required"
                   break;
               }
               
               
            }
              if(sub===true){

                document.getElementById('choose').selected="selected"
                
                //inicialization
                for (var prop in properties[0]){

                    if(prop==="fn" || prop==="id" || prop==="gen"){ continue;}
                    else{
                        document.getElementById("Add_"+prop).value=""
                    }
                }
                
                document.getElementById("inputGroupSelect01").value="Choose";
                this.setState({  select:"Choose" });
                this.props.Add_function(properties_list);
                this.props.onChanged(true);
              }
        }

    }

    SelectPrototype(select,prototypes){

        var Selected = prototypes.filter(elem => elem.fn===select)

        return Selected;
    }

    PropertiesList(select,prototypes){

            var Selected=this.SelectPrototype(select,prototypes);
            var array=[];
       
            
            if(Selected===[]){array=[]}
            else{
                for (var prop in Selected[0]){

                    if(prop==="fn" || prop==="id" || prop==="gen" ){continue}

                   if(prop==="sence" || prop==="sence_front" || prop==="sence_back" ){
                                array.push(
                                    <div className="input-group input-group-sm mb-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text text-primary">{prop}</span>
                                                        </div>
                                                        <select className="custom-select" id={"Add_"+prop} >
                                                            <option value="+" selected >+</option>
                                                            <option value="-" >-</option>
                                                        </select> 
                                    </div> 
                                )
                   }
                   else{
                        array.push(
                            <div className="input-group input-group-sm mb-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text text-primary" >{prop}</span>
                                                </div>
                                                <input id={"Add_"+prop}  type="text" className="form-control" name={prop} />
                                                
                            </div> 
                        )
                   }
                   
                }
                array.push(
                    <div className="input-group input-group-sm mb-2 mt-5">
                         <button  className="btn btn-success btn-block" onClick={this.Add}>Add</button>
                          <button className="btn btn-danger btn-block" onClick={this.Cancel}>Cancel</button>
                    </div> 
                          
                )
            }

            return array
    }

     dragElement(elmnt) {
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

 //Cyclelife functions
 componentDidMount() {
        var AddChart = document.getElementById("Add_Chart")
        this.dragElement(AddChart);
  }   
    render() {

        var prototypes=this.props.prototypes;
        var select=this.state.select;
        var Properties_List=this.PropertiesList(select,prototypes);


        var show_add= this.state.select==="Choose"? {display:"none"}:{display:"block"}

       
        


      return (
                    <div id="add_elem">
                            <p style={{color:"rgb(200,200,200)",fontSize:"20px"}}>Add</p>
                           <div className="input-group mb-2">
                                    <select className="custom-select" id="inputGroupSelect01" onChange={this.Select}>
                                        <option id="choose" value="Choose" selected >Choose...</option>
                                        <option id="haz" value="haz" >Ray</option>
                                        <option id="mirror" value="mirror">Mirror</option>
                                        <option id="len" value="len">Lens</option>
                                    </select>      
                            </div>

                            <div className="card border-primary mb-2" id="Add_Chart" style={show_add}>
                                <div className="card-header bg-primary" id="Add_Chart_header">Define properties</div>
                                <div className="card-body ">
                                                                
                                    {Properties_List}
                                   
                                </div>
                          </div>
                    
     
            </div>

      );
    }
  }

  const mapStateToProps = state => {
    return {
        door: state.globalState.door,
        prototypes:state.object.prototypes
    };
};

const mapDispatchToProps = dispatch => {
    return {
Add_function: (properties) => dispatch({type: actionTypes.ADDFUNCTION ,properties:properties}),
onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add_Element);










 