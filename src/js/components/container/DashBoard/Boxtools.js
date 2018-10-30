
import React, { Component } from "react";    
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';




//Methods  
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

function pan(id,layout){

               var newLayout = Object.assign({},layout);
               newLayout.dragmode = 'pan';
               var Tester=document.getElementById(id);
               Plotly.relayout(Tester, newLayout);
           }




 

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
              title : this.props.title,
              description:this.props.description
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
                        })

                  }
                  else{
                    alert("it's just working for user, please login first")
                  }

           
             
            
    }

    componentWillMount() {

          this.setState({
            username :        this.props.username,
            select  :         this.props.select,
            workpaper:        this.props.workpaper

        })
  
    }
  
  
  
    //Update the graphic
   componentWillReceiveProps(nextProps) {
         if(nextProps.change){

          this.setState({

            username :       nextProps.username,
            select  :        nextProps.select,
            workpaper:       nextProps.workpaper

        })
         }

      
    }


    render(){

      var id="plotGraph";

      var layout=this.state.workpaper[this.state.select].layout;
      var saveShow = this.state.saveCard ? {display:"block"} : {display:"none"}

      var navStyle ={
         width : window.innerWidth-300,
         height: "54px",
         padding: "6px",
         background: "#444"
         
      } 
      
              return(
  
                      <div>
                         
  
  
                              <div  id="setbox" style={navStyle}>
                                  
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="lasso"          onClick={()=>lasso(id,layout)}><i className="fas fa-pencil-alt" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="zoom in"   onClick={()=>zoomBox(id,layout)}><i className="fas fa-search-plus" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="zoom out"      onClick={()=>zoomBack(id,layout)}><i className="fas fa-search-minus" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="pan"            onClick={()=>pan(id,layout)}><i className="fas fa-hand-rock" style={{color:"white"}}></i></button> 
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="download image" onClick={()=>downloadImage(id)}><i className="fas fa-camera" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="save" onClick={this.save}><i className="fas fa-save" style={{color:"white"}}></i></button>
                                  <button className="btn setgraph" data-toggle="tooltip" data-placement="top" title="new sheet" onClick={this.newBoard}><i className="fas fa-file" style={{color:"white"}}></i></button>
                              </div> 

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
                change        : state.workpaper.change
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      EditTitle: (workpaper)=>dispatch({type: actionTypes.EDITTILE , workpaper:workpaper}),
      NewTitle: ()=>dispatch({type: actionTypes.NEWTITLE })

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Boxtools);