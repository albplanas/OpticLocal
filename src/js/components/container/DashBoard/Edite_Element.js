import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

const  {IndexCorrection}          = require('../../../math/IndexRefractionSource');


class Edite_Element extends Component {
    constructor(props) {
        super(props);
        this.state =  {
                Wp:[],
                select:0,
                door:"",
                change:false,
                dataChange:false
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

                                                        <div className="col-sm-6 edit "> <div> <p style={{textAlign:"left",fontSize:"14px",marginTop:"5px", color:"white"}}>{elem.name.slice(0,7)}</p> </div> </div> 
                                                    
                                                        <div className="col-sm-4" id={"c"+elem.id}> 
                                                            <button id={"d"+elem.id}  data-placement="top" title={"Delete "+elem.name}  data-toggle="tooltip" className="btn" style={{background:"withe",borderRadius:"50%",marginLeft:"0px"}} onClick={this.Delete}><i id={"e"+elem.id} style={{color:"rgb(233, 75, 60)"}} className="fas fa-trash-alt" onClick={this.Delete}/></button>
                                                        </div>
                                </div>
                                
                            </div>
                            <div id={"collapse"+elem.id} className="collapse " aria-labelledby={"heading"+elem.id} data-parent="#accordion">
                              <div className="card-body">  <Edit_card info={this.state} elem={elem} edit_funct={this.props.Edit_function} onChange_funct={this.props.onChanged}/> </div> 
                            </div>
                    </div>

                )
            }


    //Delete Element
    Delete(e){
       
        var id = e.target.id.length<1? e.target.parentNode.id.slice(1,e.target.parentNode.id.length) : e.target.id.slice(1,e.target.id.length)
        
        if(id.length>0 && id!==undefined){
                    var select =this.state.select
                    var newWp  =this.state.Wp;


                    newWp[select].sources =  this.state.Wp[select].sources.filter( (src) => src.id+'' !== id );

                    newWp[select].devices =  this.state.Wp[select].devices.filter( dvc =>  dvc.id+'' !== id);

                    
                   //Corrections of the Index of refraction 
                     newWp[select].sources=IndexCorrection(newWp[select].sources,newWp[select].devices)


                    this.props.Delete_function(newWp);
                    this.props.onChanged(true);

                    this.setState({
                        Wp:newWp
                    })
        }


    }

//CycleLyfe functions


componentWillMount() {

    this.setState({
        Wp:this.props.workpaper,
        select:this.props.select,
        door : this.state.door

    })

  }



  //Update props
 componentWillReceiveProps(nextProps) {

    

        if(nextProps.change===true || nextProps.Datachange===true || nextProps.editChange===true){
           
            this.setState({
                Wp:             nextProps.workpaper,
                select:         nextProps.select,
                door :          nextProps.door,
                change:         nextProps.change,
                dataChange:     nextProps.Datachange

            })

            nextProps.UpdateSuccess();

        }
    
  }







    
    render() {

        
        
        const sources = this.state.Wp.length > 0  ?  this.state.Wp[this.state.select].sources  : [];
        const devices = this.state.Wp.length > 0  ?  this.state.Wp[this.state.select].devices  : []



        var src_lis=sources.map(elem => this.list_elem(elem))

        var dvc_lis=devices.map(elem => this.list_elem(elem) ) 

       

            return (
            <div  >
           
              <div id="accordion" > 
                        {src_lis}
                        <hr/>
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
              Wp:[],
              select:"",
              properties:{}
            }

        this.Edite=this.Edite.bind(this);
        this.Math_list=this.Math_list.bind(this);
        this.Open_Door=this.Open_Door.bind(this);
        this.change = this.change.bind(this);
    }

    componentWillMount() {

        this.setState({
            Wp:this.props.info.Wp,
            select:this.props.info.select,
            properties:this.props.elem
        })
    
      }
    

    
      //Update props
     componentWillReceiveProps(nextProps) {
            
            if(nextProps.info.change===true || nextProps.info.datachange===true ){
    
                this.setState({
                    Wp:             nextProps.info.Wp,
                    select:         nextProps.info.select,
                    properties:     nextProps.elem
                })
              
            }
        
      }
        
      change(){
        var Prop = Object.assign({},this.state.properties)
        for (var prop in Prop){
            if(prop==="fn" || prop==="id" || prop==="gen" || prop==="indexRefraction"){continue}
           Prop[prop]=document.getElementById("MathInput_"+prop+"_"+Prop.id).value
            
        }

        this.setState({
            properties:Prop
        })
    }

    Open_Door(e){

        var d= e.target.id[e.target.id.length-1]-0;

        this.setState({  edit_door :d });
    }

    // Helper Function
     Math_list(){
        var array=[];
       var list= Object.assign({},this.state.properties)

        for (var prop in list){
            if(prop==="fn" || prop==="id" || prop==="gen" ||prop==="indexRefraction"){continue}
           
            array.push(
                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >{prop.slice(0,8)}</span>
                                    </div>
                                   {
                                       prop==="sence" ? (<select className="custom-select  form-control" name={prop} id={"MathInput_"+prop+"_"+list.id} value={list[prop]} onChange={this.change}>
                                       <option value="+" selected >+</option>
                                       <option value="-" >-</option>
                                   </select> ) :
                                                        (<input id={"MathInput_"+prop+"_"+list.id} type="text" className="form-control" name={prop} value={list[prop]} onChange={this.change} />)
                                   } 
                </div> 
            )
        }
        return array
    }

    //Edite Element function
    Edite(){

        var properties=Object.assign({},this.state.properties)

        
          
            var select =this.state.select
            var newWp  =this.state.Wp;
            var id = properties.id+''
            
         //Update
            newWp[select].sources =  this.state.Wp[select].sources.map( (src) =>{
                            return src.id+'' === id ? properties : src
                } );

            newWp[select].devices =  this.state.Wp[select].devices.map( (dvc) =>{
                    return dvc.id+'' === id ? properties : dvc
        } );


        //Corrections of the Index of refraction 
        newWp[select].sources=IndexCorrection(newWp[select].sources,newWp[select].devices)


        this.props.edit_funct(newWp);
        this.props.onChange_funct(true);

            this.setState({
                Wp:newWp
            })

              
                
    }

    
    render() {

           

           var show_edit_math_door = this.state.edit_door===0? {display:"block"}:{display:"none"}
           var select_math=this.state.edit_door===0? {color:"rgb(92,184,92)"}: {color:"white"}

            
          
           var  info_list = this.Math_list();

            return (
            <div >
                        <ul id="EditContainer">
                                <li  id="li_0" onClick={this.Open_Door}><a id="li_0" style={select_math}>Math</a></li>
                               
                                <button className="btn btn-success btn-sm" onClick={this.Edite} ><i className="material-icons" >send</i></button>
                        </ul>

                        <div id="editMath" style={show_edit_math_door}>
                           <div className="container">
                            <div className="mb-2 mt-3" >{this.state.properties.fn}</div>
                            {info_list}
                            </div>
                        </div>

                       
            </div>
            );
    }
  }
 
  

  const mapStateToProps = state => {
    return {
        door            :         state.globalState.door,
        workpaper       :         state.workpaper.Workpaper,
        select          :         state.workpaper.select,
        change          :         state.workpaper.change,
        dataChange      :         state.workpaper.Datachange,
        editChange      :         state.workpaper.EditChange
    };
};

const mapDispatchToProps = dispatch => {
    return {

                Delete_function: (Wp) => dispatch({type: actionTypes.DELETEFUNCTION ,Wp:Wp}),
                Edit_function: (Wp) => dispatch({type: actionTypes.EDITFUNCTION ,Wp:Wp}),
                onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
                UpdateSuccess: ()=>dispatch({type: actionTypes.UPDATEDATE})
}

};

export default connect(mapStateToProps, mapDispatchToProps)(Edite_Element);