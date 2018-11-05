
import React, { Component } from "react";    
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';


import {pan,zoomBack,zoomIn,zoomBox,lasso,downloadImage,}   from './HelperFunctions';
import Alert from './Alert'





 

/************************************************
 *            Main Component
 * ************************************************/   

class Boxtools  extends Component {

    constructor(props) {
      super(props);

      this.state={
          saveCard:false,
          title:'',
          description:'',
          workpaper:[],
          username : "",
          select  : 0,
          alert:false,
          success:false

      }
        this.save=this.save.bind(this);
        this.newBoard=this.newBoard.bind(this)
        this.cancel=this.cancel.bind(this);
        this.done=this.done.bind(this);
        this.change=this.change.bind(this)
        
    }



    change(){
      this.setState({
        title : document.getElementById("TitleSave").value,
        description: document.getElementById("DescriptionSave").value
    })
    }

    save(){
          this.setState({
              saveCard:true
          })
    }

    cancel(){
            this.setState({
              saveCard:false,
              title:            this.props.workpaper[this.props.select].title,
              description:      this.props.workpaper[this.props.select].description
          })
    }


        newBoard(){
         
          this.props.NewTitle();
        }

        done(){

              
                let  username = this.state.username
                let  select = this.state.select

                var arr=this.state.workpaper.map(elem=>elem)
                arr[select].title=this.state.title
                arr[select].description=this.state.description
                  

                  if(username.length > 0){

                        this.props.EditTitle(arr);
                        
                        axios.post("/saveProject", {username, arr})
                        .then((result) => {
                            
                          })

                              // Sent to database


                          this.setState({
                            saveCard:false,
                            success:true
                        })
                        setTimeout(()=>{
                          this.setState({
                              success   :false,
                             
                        })
                      }, 3000);

                  }
                  else{
                    this.setState({
                      alert:true,
                  })
                  setTimeout(()=>{
                    this.setState({
                        alert   :false,
                       
                  })
                }, 3000);
                  }

           
             
            
    }

    componentWillMount() {

          this.setState({
            username :        this.props.username,
            select  :         this.props.select,
            workpaper:        this.props.workpaper,
            title:            this.props.workpaper[this.props.select].title,
            description:      this.props.workpaper[this.props.select].description


        })
  
    }
  
  
  
    //Update the graphic
   componentWillReceiveProps(nextProps) {
         if(nextProps.change){

          this.setState({

            username :       nextProps.username,
            select  :        nextProps.select,
            workpaper:       nextProps.workpaper,
            title:           nextProps.workpaper[nextProps.select].title,
            description:     nextProps.workpaper[nextProps.select].description,

        })
         }

      
    }


    render(){



      var id="plotGraph";

      var layout=this.state.workpaper[this.state.select].layout;

      var w = window.innerWidth-300;
      var h = window.innerHeight-150;
  
      var rang_w = w/100;
      var rang_h = h/100;

      layout.width= w;layout.height= h;
      layout.xaxis.range = [-rang_w,rang_w];
      layout.yaxis.range = [-rang_h,rang_h];

      var saveShow = this.state.saveCard ? {display:"block"} : {display:"none"}
      
      var navStyle ={
 
           height:"auto",
           borderRadius: "50px",
           width:window.innerWidth-400,
           marginLeft: "0px",
           paddingLeft:"30px"
         
      } 

     var pk= {
        LoginAlert:this.state.alert,
        SuccessAlert:this.state.success,
        DeleteAlert :false
       } 
  
      
      
              return(
  
                      <div>
                         
                
  
                              <div  className="flex-container mb-3 shadow border border-dark " id="setbox" style={navStyle}>
                                  
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="lasso"          onClick={()=>lasso(id,layout)}><i className="fas fa-pencil-alt" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="zoom box"   onClick={()=>zoomBox(id,layout)}><i className="fas fa-square" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="zoom in"   onClick={()=>zoomIn(id,layout)}><i className="fas fa-search-plus" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="zoom out"      onClick={()=>zoomBack(id,layout)}><i className="fas fa-search-minus" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="pan"            onClick={()=>pan(id,layout)}><i className="fas fa-hand-rock" style={{color:"white"}}></i></button> 
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="download image" onClick={()=>downloadImage(id)}><i className="fas fa-camera" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="save" onClick={this.save}><i className="fas fa-save" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph btn-sm btn-primary m-1" data-toggle="tooltip" data-placement="top" title="new sheet" onClick={this.newBoard}><i className="fas fa-file" style={{color:"white"}}></i></button>
                              </div> 

                                <Alert info={pk}/>

                              <div className="card w-50 ml-5 mt-3 mb-3" style={saveShow}>
                                      <div className="card-body">

                                              <label className="text-danger" for="TitleSave">Title</label>
                                                  <div class="input-group mb-3 ">
                                                    <input  type="text" className="form-control" id="TitleSave" value={this.state.title} onChange={this.change}/>
                                                  </div>

                                                  <label className="text-danger" for="DescriptionSave">Description</label>
                                                  <div class="input-group mb-3 ">
                                                    <textarea  type="text" class="form-control" id="DescriptionSave" aria-describedby="basic-addon3" value={this.state.description} onChange={this.change} />
                                                  </div>
                                                  <div className="text-right"  >
                                                      <button type="button" className="btn  btn-primary mr-2 mb-1 mt-3" onClick={this.done } >Done</button>
                                                      <button type="button" className="btn  btn-danger mb-1 mt-3" onClick={this.cancel }  >Cancel</button>
                                                  </div>
                                      </div>
                              </div>

                               
  
                      </div>
  
              )

    }
   }    


 
   const mapStateToProps = state => {
      
    return {
                username:     state.profile.username,
                select:       state.workpaper.select,
                workpaper    : state.workpaper.Workpaper,
                change        : state.workpaper.change,
              
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      EditTitle: (workpaper)=>dispatch({type: actionTypes.EDITTILE , workpaper:workpaper}),
      NewTitle: ()=>dispatch({type: actionTypes.NEWTITLE })

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Boxtools);