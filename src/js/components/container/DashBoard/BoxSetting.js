
import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';


import {dragElement}   from './HelperFunctions';



//Properties prototypes
const Axes={ 

   showgrid: true,
   gridcolor: "Gainsboro",
   gridwidth: 0.5,

   zeroline: true,
   zerolinecolor: 'black',
   zerolinewidth: 1,

   showline: false,
   linecolor: '',
   linewidth: '',

   type:"line"
}



/************************************************
 *            Main Component
 * ************************************************/       
class BoxSetting extends Component {
   constructor(props) {

               super(props);
           
               this.state =  {
                   select:  "choose",
                   layout:  ""
               }

           
           this.Select=this.Select.bind(this);
           this.Cancel=this.Cancel.bind(this);
       
       }
       // Cancel button
       Cancel(){  this.setState({  select:"choose" });} 
  
       //Selector channel
       Select(e){
        
      
        this.setState({  select:e.target.id });
    }
        
     

     componentWillMount() {
        var Numselect =this.props.Numselect;

        var w = window.innerWidth-300;
            var h = window.innerHeight-150;
        
            var rang_w = w/100;
            var rang_h = h/100;

            var lay  = Object.assign({},this.props.workpaper[Numselect].layout) 
          
            lay.width= w;lay.height= h;
            lay.xaxis.range = [-rang_w,rang_w];
            lay.yaxis.range = [-rang_h,rang_h];

            this.setState({
                    layout:lay
            }) 

    
      }
    

     componentWillReceiveProps(nextProps) {
    
    
        var Numselect =nextProps.Numselect;
       
        if(nextProps.Changed===true || nextProps.ChangedProject===true ){

            var w = window.innerWidth-300;
            var h = window.innerHeight-150;
        
            var rang_w = w/100;
            var rang_h = h/100;

            var lay  = Object.assign({},nextProps.workpaper[Numselect].layout) 
          
            lay.width= w;lay.height= h;
            lay.xaxis.range = [-rang_w,rang_w];
            lay.yaxis.range = [-rang_h,rang_h];

            this.setState({
                    layout:lay
            })
    
        }
      

       
        nextProps.onChanged(false);
        nextProps.onDataChanged(false)
        
      }

   render(){

         
       
       


               return(

               
                
   
                       <div >
                             <ul class="list-unstyled components">
                                        <li className="mb-3">
                                        <a href="#LayoutSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle bg-dark text-success shadow-sm rounded">Layout</a>
                                                <ul class="collapse list-unstyled" id="LayoutSubmenu">
                                                    <li>
                                                    <a href="#AxesSubmenus" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle bg-dark text-success shadow-sm rounded">Axes</a>
                                                
                                                                <ul class="collapse list-unstyled" id="AxesSubmenus">
                                                                    <li>
                                                                        <a id="xaxis" onClick={this.Select}>X axis</a>
                                                                    </li>
                                                                    <li>
                                                                        <a id="yaxis" onClick={this.Select}>Y axis</a>
                                                                    </li>
                                                                </ul>
                                                    </li>
                                                
                                                </ul>
                                        </li> 
                                        <li className="mb-1">       
                                                <a href="#EnviromentSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle bg-dark text-success shadow-sm rounded">Environment</a>
                                                
                                                    <ul class="collapse list-unstyled" id="EnviromentSubmenu">
                                                        <li>
                                                            <a id="mathPhy" onClick={this.Select}>Math and Physcis</a>
                                                        </li>
                                                    </ul>
                                        </li>           
                                            
                                </ul> 

 
                                            <Configuration info ={this.state} cancel={this.Cancel}/>
                               
                       </div>
   
               )

   }    

}



class Configuration extends React.Component {

    constructor(props) {

        super(props);
    
        this.state =  {
          select:"choose",
          Properties:{},
          layout:{}
        }

        this.change=this.change.bind(this)
        this.doneLayout=this.doneLayout.bind(this)
}

//Done
doneLayout(){
           
      var  newLayout=Object.assign({},this.state.layout);
      var  passProper=Object.assign({},this.state.Properties);
      var select =this.state.select;

        if(select ==="xaxis" || select ==="yaxis"){

            for (var prop in passProper){
                newLayout[select][prop]=passProper[prop]
            }

        }
       
        var Tester=document.getElementById("plotGraph");

            Plotly.relayout(Tester, newLayout);
    
   this.props.cancel()
    
}


 change(e){

        var prop=e.target.name;

        var ChangeProper = Object.assign({},this.state.Properties);
        if(prop === "showgrid" || prop === "zeroline" || prop === "showline"){
            ChangeProper[prop]=ChangeProper[prop]?false: true
            document.getElementById("config"+prop).checked=ChangeProper[prop]
        }
        else{
            ChangeProper[prop]=e.target.value;
        }
       

        this.setState({
            Properties:ChangeProper
        })
 }
 
    componentDidMount() {
        var ConfigChart = document.getElementById("Config_Chart")
        dragElement(ConfigChart);
    } 

  componentWillReceiveProps(nextProps) {

               
                var select=nextProps.info.select;
                if(select!==this.state.select){

                    var layout  = Object.assign({},nextProps.info.layout); 
                    var Properties={};

                    if(select !=="choose"){


                        if(select ==="xaxis" || select ==="yaxis"){Properties=Object.assign({},Axes);}
                    
                        for (var prop in Axes){
                               
                            Properties[prop] = layout[select].hasOwnProperty(prop) ?   layout[select][prop] : Properties[prop];
                       }

                    }
                    
                
                        this.setState({
                            Properties:Properties,
                            select: select,
                            layout: nextProps.info.layout
                        })


                }
 
                    
                   
 
     }


    render() {
        var array=[];

       
      
                 for (var prop in this.state.Properties){ 
      
                  var Context= this.state.Properties[prop];
      
      //Select Type
                              if(prop === "type"){
                              
                                  array.push( 
                                      <div className="input-group input-group-sm mb-2">
      
                                              <div className="input-group-prepend">
                                                  <span className="input-group-text" >Type</span>
                                              </div>
      
                                          <select className="custom-select" id="configtype" >                                        
                                                                      <option name={prop} onChange={this.change}  value="lineal" >Lineal</option>
                                                                      <option name={prop} value="log" >Logarithmic</option>
                                          </select> 
                                      </div> 
                                                          
                                              )
                              }
      //radiobuttom
      
              else if(prop === "showgrid" || prop === "zeroline" || prop === "showline"){

                

                  array.push( 
                              <div className="custom-control custom-checkbox mb-2 mt-3 ">
                                  <input type="checkbox" className="custom-control-input" id={"config"+prop} checked={Context} onChange={this.change} name={prop}/>
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
                                          <input id={"config"+prop}  type="text" className="form-control"value={Context} name={prop} onChange={this.change} />
                      </div> 
                  )
             }
             
        
          }
          array.push(
              <div className="input-group input-group-sm mb-2 mt-5">
                   <button className="btn btn-success btn-block" style={{borderRadius: "50px"}}  onClick={this.doneLayout} >Done</button>
                    <button className="btn btn-danger btn-block" style={{borderRadius: "50px"}} onClick={this.props.cancel} >Cancel</button>
              </div> 
                    
          )
      
          var show = this.state.select==="choose"? {display:"none"}:{display:"block"}     
          
          return (
            <div className="card border-primary mb-2 shadow" id="Config_Chart" style={show}>
                                   <div className="card-header bg-primary text-center" id="Config_Chart_header" >{"Configuration for "+this.state.select}</div>
                                   <div className="card-body p-4">

                                        {array}

                                       
                                   </div>
                             </div> )
                     
    }
  }







const mapStateToProps = state => {
      
    return {

        Changed:            state.globalState.Changed,
        ChangedProject:     state.workpaper.Datachange,

        workpaper:          state.workpaper.Workpaper,
        Numselect   :          state.workpaper.select
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
        onDataChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(BoxSetting);


