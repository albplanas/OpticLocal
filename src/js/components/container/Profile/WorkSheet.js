import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import axios from 'axios';

class WorkSheet extends Component{

   constructor(props) {
        super(props);

        this.state={

                worksheet:[],
                mode:[],
                username:"",
                select:0

        }

        this.Card     =this.Card.bind(this);
        this.editMode =this.editMode.bind(this);
        this.showMode =this.showMode.bind(this);
        this.done     =this.done.bind(this);
        this.delete   =this.delete.bind(this);
        this.change   =this.change.bind(this);
        this.Open     =this.Open.bind(this);
    }

    /****************************************************
 *                  Change mode of a cards
 * *****************************************************/   
        editMode(e){
            e.preventDefault();

           var index = e.target.id.slice(8,e.target.id.length);
               index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index

           if(index!==''){
               index=index-0;
             
             var obj= this.state.mode
             obj[index]="edit";

             this.setState({
                mode:obj
            })
           }
             
        }

        showMode(e){
            e.preventDefault();
            var index = e.target.id.slice(8,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index
            if(index!==''){
                index=index-0;
              
                var obj= this.state.mode
                obj[index]="show";
 
                this.setState({  mode:obj })
            }
        }
/****************************************************
 *                  DONE
 * *****************************************************/    
        done(e){

            e.preventDefault();

            var index = e.target.id.slice(8,e.target.id.length);

            index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index;

            if(index!==''){
                index=index-0;
              
                var obj= this.state.mode
                obj[index]="show";
 
                this.setState({  mode:obj })
            }

            var arr=[] ;
            var username = this.state.username
              
              
              for(var i=0;i<this.state.worksheet.length;i++){
                      arr=arr.concat(this.state.worksheet[i])
                  
              }
              
              this.props.EditTitle(arr);

              axios.post("/saveProject",{username,arr} )
                .then((result) => {
                        

                }) 
        }
/****************************************************
 *                  Delete
 * *****************************************************/    
        delete(e){
            e.preventDefault();
            var index = e.target.id.slice(8,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index;

            if(index!==''){

                index=index-0;

              //sent to reducer the data and sent to database

              var select = index < select ? index : index-1;
              if(select===-1){select=0}


              var arr=[] ;
              var username = this.state.username
              
              
              for(var i=0;i<this.state.worksheet.length;i++){
  
                  if (i.toString()!== index.toString()){
  
                      arr=arr.concat(this.state.worksheet[i])
                  }
              }

       

              this.props.DeleteProject(arr,select)
              

              axios.post("/saveProject",{username,arr} )
                .then((result) => {
                        

                }) 
            }

            

        }
/****************************************************
 *                  Open Project
 * *****************************************************/   
        Open(e){
            e.preventDefault();

            var index = e.target.id.slice(8,e.target.id.length);
            if(index.length>0){

                index=index-0;
                
                this.props.OpenProject(index);
                this.props.OpenDashboard(2);
            }
        
        }
/****************************************************
 *                  Change helper
 * *****************************************************/   
        change(e){

            var index = e.target.id.slice(5,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(5,e.target.parentNode.id.length)  :  index
            if(index!==''){
                index=index-0;
              
              var obj= this.state.worksheet

              obj[index].title=document.getElementById("name_"+index).value;
              obj[index].description=document.getElementById("text_"+index).value;

              this.setState({
                 worksheet:obj
             })
            }
        }
 /****************************************************
 *                 Card Component
 * *****************************************************/   
 Card(elem,i,mode){

    var  extension  = mode==="edit"? "" :"-plaintext";
    
    var Edit  = mode === "edit" ? {display:"block"}: {display:"none"};
    var Show  = mode === "show" ? {display:"block"}: {display:"none"};

    return (
        <div class="card text-left mb-3 ">
                <div className="card-header bg-primary ">
                            
                           <div className="row">
                                <div className="col-sm-9">
                                         <input id={"name_"+i} onChange={this.change}  className={"text-white w-100 form-control"+extension} style={{background :"rgb(255,255,255,0)",paddingLeft:"5px", fontSize:"16px"}} value={elem.title}/>
                                </div>
                                <div className="col-sm-3">
                                      <button id={"btnOpen_"+i} onClick={this.Open} type="button" className="btn bg-danger text-white float-right"><i id={"btnOpen-"+i} onClick={this.Open} className="mr-2 fas fa-door-open"></i>Open</button>
                                </div>
                           </div>
                                     
                                    
                                
                </div>
                <div class="card-body ">
                     <h6 className="card-title">Description</h6>
                     <textarea id={"text_"+i}  className={"text-dark form-control"+extension} onChange={this.change} rows="2" value={elem.description}/>
                </div>

                <div className="card-footer bg-white " style={Show}>
                        <div className="btn-toolbar bg-white float-right " role="toolbar"  >
                                <div class="btn-group mr-1 " role="group" aria-label="First group">
                                    <button id={"btnEdit_"+i} type="button" className="btn bg-white" onClick={this.editMode}  ><i  id={"btnEdit-"+i} onClick={this.editMode}  className="fas fa-edit mr-2 text-success" /> </button>
                                    <button id={"btnTras_"+i} onClick={this.delete} type="button" className="btn bg-white"><i id={"btnTras-"+i} onClick={this.delete} className="fas fa-trash mr-2 text-danger"/></button>
                                </div>
                        </div>        
                </div>
                <div className="card-footer bg-white " style={Edit}>
                        <div className="btn-toolbar bg-white float-right " role="toolbar" >
                                <div class="btn-group mr-1 " role="group" aria-label="First group">
                                    <button id={"btnSend_"+i} onClick={this.done} type="button" className="btn bg-white" ><i id={"btnSend-"+i} onClick={this.done}  className="fas fa-paper-plane mr-2 text-success"/></button>
                                    <button id={"btnCanc_"+i} onClick={this.showMode} type="button" className="btn bg-white"  ><i id={"btnCanc-"+i} onClick={this.showMode} className="fas fa-times mr-2 text-danger" /></button>
                                </div>
                        </div>        
                </div>
      </div>
    )
}


          // LifeCycle Functions

componentWillMount() {
    
            this.setState({
                                 worksheet:     this.props.workpaper,
                                 mode :         this.props.workpaper.map(elem => "show" ),
                                 select:        this.props.select,
                                 username:      this.props.username
     }) 
   }
     
     
     
     componentWillReceiveProps(nextProps) {
    
     

         if(nextProps.change){
           
            this.setState({
                worksheet:      nextProps.workpaper,
                mode :          nextProps.workpaper.map(elem => "show" ),
                select:        nextProps.select,
                username:      nextProps.username
            }) 
             nextProps.Change (false);
         }

        

         
      }


        render(){
            var Sheets= this.state.worksheet;
            
            return (
        
                    <div className="container-fluid">
                         
                         {Sheets.map((elem,index)=>{
                           return this.Card(elem,index,this.state.mode[index])
                         })}
                         
                    </div>
 
              );
        }
     
    }
  

    const mapStateToProps = state => {
        return {
            workpaper     : state.workpaper.Workpaper,
            change        : state.workpaper.change,
            select        : state.workpaper.select,
            username      : state.profile.username
        };
      };
      
    const mapDispatchToProps = dispatch => {
        return {
            Papers      : (papers) => dispatch({type: actionTypes.PAPERS , papers:papers}),
            Change      : (val) => dispatch({type: actionTypes.PAPERSCHANGE , val:val}),
            OpenProject : (val) => dispatch({type: actionTypes.OPENPROJECT , val:val}),
            OpenDashboard   : (value) => dispatch({type: actionTypes.LOGINLINKS , value: value}),
            EditTitle: (workpaper)=>dispatch({type: actionTypes.EDITTILE , workpaper:workpaper}),
            DeleteProject   : (Wp,value) => dispatch({type: actionTypes.DELETEPROJECT ,Wp:Wp,value: value})
        };
      };
      
      export default connect(mapStateToProps, mapDispatchToProps)(WorkSheet);