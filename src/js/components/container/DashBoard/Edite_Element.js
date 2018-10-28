import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';




class Edite_Element extends Component {
    constructor(props) {
        super(props);
        this.state =  {

          }
       
        this.Delete=this.Delete.bind(this)
        this.list_elem=this.list_elem.bind(this)
    }

    //Helper Function
     list_elem(elem){

                    return(
                    <div className="card bg-dark" style={{marginTop:"5px"}}>
                            <div className="card-header" style={{height:"60px"}} id={"heading"+elem.id}>
                                    <div className="row " id={elem.id}  data-placement="top" title={"Edit "+elem.name}  data-toggle="tooltip">

                                                        <div className="col-sm-2">
                                                            <button id={"e"+elem.id} className=" btn btn-link "   style={{marginLeft:"-15px"}} data-toggle="collapse" data-target={"#collapse"+elem.id} aria-expanded="true" aria-controls={"#collapse"+elem.id}><i className="fas fa-edit"   style={{ color:"green"}}   /></button>
                                                        </div>

                                                        <div className="col-sm-7 edit "> <div> <p style={{textAlign:"left",fontSize:"14px",marginTop:"5px", color:"white"}}>{elem.name}</p> </div> </div> 
                                                    
                                                        <div className="col-sm-3" id={"c"+elem.id}> 
                                                            <button id={"d"+elem.id}  data-placement="top" title={"Delete "+elem.name}  data-toggle="tooltip" className="btn" style={{background:"withe",borderRadius:"50%",marginLeft:"-5px"}} onClick={this.Delete}><i id={"e"+elem.id} style={{color:"rgb(233, 75, 60)"}} className="fas fa-trash-alt" onClick={this.Delete}></i></button>
                                                        </div>
                                </div>
                                
                            </div>
                            <div id={"collapse"+elem.id} className="collapse " aria-labelledby={"heading"+elem.id} data-parent="#accordion">
                                <div className="card-body">  <Edit_card info={elem} edit_funct={this.props.Edit_function} onChange_funct={this.props.onChanged}/> </div>
                            </div>
                    </div>

                )
            }


    //Delete Element
    Delete(e){

        var id = e.target.id.length<1? e.target.parentNode.id.slice(1,e.target.parentNode.id.length) : e.target.id.slice(1,e.target.id.length)

        this.props.Delete_function(id);
        this.props.onChanged(true);
    }

    
    render() {

        const sources = this.props.src;
        const devices = this.props.dvc;



        var src_lis=sources.map(elem => this.list_elem(elem))

        var dvc_lis=devices.map(elem => this.list_elem(elem) ) 

            return (
            <div id="edite_elem" >
               <p style={{color:"rgb(200,200,200)",fontSize:"20px"}}>Edit</p>
                <div id="accordion">
                        <p>Sources</p>                 
                            {src_lis}
                        <hr/>
                        <p>Devices</p> 
                            {dvc_lis}
                </div>
            </div>
            );
    }
  }

/*********************Edit Card********************** */

  class Edit_card extends Component {
    constructor(props) {
        super(props);

        this.state =  {
              edit_door:0,
              properties:[]
            }

        this.Edite=this.Edite.bind(this);
        this.Math_list=this.Math_list.bind(this);
        this.Open_Door=this.Open_Door.bind(this);
    }

    componentWillMount() {
        this.setState({ properties:this.props.info });
      }

      componentWillReceiveProps(nextProps){
        
        this.setState({ 
            properties:JSON.stringify(nextProps.info) !== JSON.stringify(this.state.properties) ? nextProps.info : this.state.properties
         });
        
      }

    Open_Door(e){

        var d= e.target.id[e.target.id.length-1]-0;

        this.setState({  edit_door :d });
    }

    // Helper Function
     Math_list(list){
        var array=[];
       
        for (var prop in list){
            if(prop==="fn" || prop==="id" || prop==="gen" ){continue}
           
            array.push(
                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >{prop}</span>
                                    </div>
                                    <input id={"MathInput_"+prop+"_"+list.id} type="text" className="form-control" name={prop} placeholder={prop==="sence"?list[prop][0]:list[prop]} />
                </div> 
            )
        }
        return array
    }

    //Edite Element function
    Edite(e){
       
       var id=this.state.properties.id;

       var proper={};

       for (var prop in this.state.properties){

        if(prop==="fn" || prop==="id" || prop==="gen" ){proper[prop]=this.state.properties[prop];}

        else{

            var element=document.getElementById("MathInput_"+prop+"_"+id);

            proper[prop]= element.value!==""? element.value : this.state.properties[prop] ;

            element.value="";   
        }
    }
    this.props.edit_funct(id,proper);
    this.props.onChange_funct(true);
    }

    
    render() {

           var info=this.state.properties;

           var show_edit_math_door = this.state.edit_door===0? {display:"block"}:{display:"none"}
           var select_math=this.state.edit_door===0? {color:"rgb(92,184,92)"}: {color:"white"}

           var show_edit_style_door = this.state.edit_door===1? {display:"block"}:{display:"none"}
           var select_style=this.state.edit_door===1? {color:"rgb(92,184,92)"}: {color:"white"}
            
          
           var  info_list = this.Math_list(info);

            return (
            <div >
                        <ul id="EditContainer">
                                <li  id="li_0" onClick={this.Open_Door}><a id="li_0" style={select_math}>Math</a></li>
                                <li  id="li_1" onClick={this.Open_Door}><a id="li_1" style={select_style}>Style</a></li>
                                <button className="btn btn-success btn-sm" onClick={this.Edite} ><i className="material-icons" >send</i></button>
                        </ul>

                        <div id="editMath" style={show_edit_math_door}>
                           <div className="container">
                            <div className="mb-2 mt-3" >{info.fn}</div>
                            {info_list}
                            </div>
                        </div>

                        <div id="editStyle" style={show_edit_style_door}>
                                <div className="container">

                                     <div className="input-group input-group-sm mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" >Color</span>
                                            </div>
                                            <input type="text" className="form-control"  placeholder="rgb(92,184,92)" />
                                     </div> 
                                     <div className="input-group input-group-sm mb-2">

                                            <div className="input-group-prepend">
                                                <span className="input-group-text" >Type</span>
                                            </div>

                                            <select className="custom-select"  >
                                                            <option value="line" selected >line</option>
                                                            <option value="scatter" >scatter</option>
                                             </select> 
                                     </div> 
                                    
                                </div>
                         </div>
            </div>
            );
    }
  }

  

  const mapStateToProps = state => {
    return {
        door:         state.globalState.door,
        src:          state.workpaper.Workpaper[state.workpaper.select].sources,
        dvc:          state.workpaper.Workpaper[state.workpaper.select].devices,
    };
};

const mapDispatchToProps = dispatch => {
    return {

                Delete_function: (id) => dispatch({type: actionTypes.DELETEFUNCTION ,id:id}),
                Edit_function: (id,element_edit) => dispatch({type: actionTypes.EDITFUNCTION ,id:id , properties: element_edit}),
                onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value})
}

};

export default connect(mapStateToProps, mapDispatchToProps)(Edite_Element);