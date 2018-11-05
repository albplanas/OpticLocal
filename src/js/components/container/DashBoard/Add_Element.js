import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {dragElement}   from './HelperFunctions';

const  {IndexCorrection}          = require('../../../math/IndexRefractionSource');





class Add_Element extends Component {
    constructor(props) {
        super(props);
        this.state =  {
              select:"Choose", 
              Properties:{},
              Wp:[],
              selectWp:0,
              door:""
          }

        this.Add                = this.Add.bind(this);
        this.change             = this.change.bind(this);
        this.Cancel             = this.Cancel.bind(this);
        this.Select             = this.Select.bind(this);
        this.SelectPrototype    = this.SelectPrototype.bind(this);
        this.PropertiesList     = this.PropertiesList.bind(this);
       
    }


//Helper functions
    Cancel(){
        this.setState({  select:"Choose" });
        
    }

    change(e){
       var prop = e.target.name;
       var  changeProperties =Object.assign({},this.state.Properties);
       changeProperties[prop]=e.target.value;
       this.setState({ 
        
        Properties : changeProperties
       });
    }

   Select(e){

         

        var Selected=this.SelectPrototype(e.target.id);

        this.setState({ 
             select:e.target.id,
             Properties : Selected.length > 0 ? Selected[0] : {} 
            });
    }

    Add(){
//I need to make a function for alowed values

        var properties=Object.assign({},this.state.Properties)

        properties.id=Date.now();
          
        var selectQ =this.state.selectWp
        var newWp  =this.state.Wp;

       
        
     //Update
     if(properties.fn=="haz" || properties.fn=="coneLight" || properties.fn==="stripRay"){

        newWp[selectQ].sources = newWp[selectQ].sources.concat(properties)
        
        }
      else{
        newWp[selectQ].devices = newWp[selectQ].devices.concat(properties)
      }  

   
    //Corrections of the Index of refraction 
    newWp[selectQ].sources=IndexCorrection(newWp[selectQ].sources,newWp[selectQ].devices)

    

        this.props.Add_function(newWp);
               

                
        this.props.onChanged(true);

                this.setState({  
                    select:"Choose",
                    Properties :  {}  
                });
        
    }

    SelectPrototype(select){
        
        var prototypes=this.props.prototypes;
        
        var Selected = prototypes.filter(elem => elem.fn===select)

        return Selected;
    }

    PropertiesList(){

            
            var array=[];
       
           var  Properties =Object.assign({},this.state.Properties)
            
            if(this.state.select!=="Choose"){

                for (var prop in Properties){

                    if(prop==="fn" || prop==="id" || prop==="gen"  ){continue}

                    if(prop==="indexRefraction" && (Properties.fn==="haz" || Properties.fn==="coneLight" || Properties.fn==="stripRay")  ){continue}

                   else if(prop==="sence"  ){
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
                                                <input id={"Add_"+prop}  type="text" className="form-control" name={prop} value={Properties[prop]} onChange={this.change}/>
                                                
                            </div> 
                        )
                   }
                   
                }
                array.push(
                    <div className="input-group input-group-sm mb-2 mt-5">
                         <button  className="btn btn-success btn-block"style={{borderRadius: "50px"}} onClick={this.Add}>Add</button>
                          <button className="btn btn-danger btn-block" style={{borderRadius: "50px"}} onClick={this.Cancel}>Cancel</button>
                    </div> 
                          
                )
            }

            return array
    }


 //Cyclelife functions
 componentDidMount() {
        var AddChart = document.getElementById("Add_Chart")
        dragElement(AddChart);
  } 

  //CycleLyfe functions


componentWillMount() {

    this.setState({
        Wp          :this.props.workpaper,
        selectWp    :this.props.selectQ,
        door        : this.state.door

    })

  }



  //Update props
 componentWillReceiveProps(nextProps) {

        if(nextProps.change===true || nextProps.Datachange===true){

            this.setState({
                Wp:             nextProps.workpaper,
                selectWp:         nextProps.selectQ,
                door :          nextProps.door

            })

        }
    
  }


    render() {


        var Properties_List=this.PropertiesList();


        var show_add= this.state.select==="Choose"? {display:"none"}:{display:"block"}

       
        


      return (
                    <div id="add_elem">
                        <ul class="list-unstyled components">
                        <li className="mb-3">
                          <a href="#SourcesSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle bg-dark text-success shadow-sm rounded">Sources</a>
                                <ul class="collapse list-unstyled" id="SourcesSubmenu">
                                    <li>
                                    <a href="#RaySubmenus" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle bg-dark text-success shadow-sm rounded">Ray</a>
                                
                                                <ul class="collapse list-unstyled" id="RaySubmenus">
                                                    <li>
                                                        <a id="haz" onClick={this.Select}>A Single ray</a>
                                                    </li>
                                                    <li>
                                                        <a id="stripRay" onClick={this.Select}>Strip of light</a>
                                                    </li>
                                                    <li>
                                                        <a id="coneLight" onClick={this.Select}>Cone of light</a>
                                                    </li>
                                                </ul>
                                    </li>
                                   
                                </ul>
                         </li> 
                         <li className="mb-1">       
                                <a href="#DevicesSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle bg-dark text-success shadow-sm rounded">Devices</a>
                                
                                    <ul class="collapse list-unstyled" id="DevicesSubmenu">
                                        <li>
                                            <a id="mirror" onClick={this.Select}>Mirror</a>
                                        </li>
                                        <li>
                                            <a id="len" onClick={this.Select}>Len</a>
                                        </li>
                                        <li>
                                            <a id="diaphragm" onClick={this.Select}>Diaphragm</a>
                                        </li>
                                    </ul>
                         </li>           
                               
                   </ul>    
                          

                                
                            <div className="card border-primary mb-2 shadow" id="Add_Chart" style={show_add}>
                                <div className="card-header bg-primary text-center" id="Add_Chart_header">{this.state.select+"'s poperties"}</div>
                                <div className="card-body  p-4" >
                                                                
                                    {Properties_List}
                                   
                                </div>
                          </div>
                    
     
            </div>

      );
    }
  }

  const mapStateToProps = state => {
    return {
        door                    : state.globalState.door,
        prototypes              : state.object.prototypes,
        workpaper       :         state.workpaper.Workpaper,
        selectQ          :         state.workpaper.select,
        change          :         state.workpaper.change,
        dataChange      :         state.workpaper.Datachange
    };
};

const mapDispatchToProps = dispatch => {
    return {
Add_function: (Wp) => dispatch({type: actionTypes.ADDFUNCTION ,Wp:Wp}),
onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add_Element);










 