import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import axios from 'axios';

class Personal extends Component {
    constructor(props) {
        super(props);

        this.state={
                mode:"show",
                src:"",
                username:"",
                email:"",
                status:"",
                location:""
        }

        this.editMode=this.editMode.bind(this)
        this.showMode=this.showMode.bind(this)
        this.done    =this.done.bind(this)
        this.cancel  =this.done.bind(this)
        this.change  =this.change.bind(this)
    }

        //Helper Functions
    editMode(){
        this.setState({
            mode:"edit"
        })
    }
    showMode(){
        this.setState({
            mode:"show"
        })
    }

    cancel(){
        this.setState({
            src           : this.props.profile.src,
            username      :this.props.profile.username,
            email         :this.props.profile.email,
            status        :this.props.profile.status,
            location      :this.props.profile.location,
            mode          : "show"
        }) 
    }

    done(){
       
        var profile={
                    src: document.getElementById("imageInput").value,
                    username:document.getElementById("usernameInput").value,
                    email:document.getElementById("emailInput").value,
                    status:document.getElementById("statusInput").value,
                    location:document.getElementById("locationInput").value                  
        }
      
        this.props.onEdit(profile);

        axios.post("/editProfile",profile)
                .then((result) => {
                     console.log(result.data)
                })
                this.setState({
                    mode:"show"   
                })  
    }
    change(){
        this.setState({
            src: document.getElementById("imageInput").value,
            username:document.getElementById("usernameInput").value,
            email:document.getElementById("emailInput").value,
            status:document.getElementById("statusInput").value,
            location:document.getElementById("locationInput").value
        })
    }


          // LifeCycle Functions

       componentWillMount() {
               this.setState({
            src           : this.props.profile.src,
            username      :this.props.profile.username,
            email         :this.props.profile.email,
            status        :this.props.profile.status,
            location      :this.props.profile.location,
        }) 
      }
        
        
        
        componentWillReceiveProps(nextProps) {
       
        

            if(nextProps.profile.change){
                this.setState({
                    src           : nextProps.profile.src,
                    username      :nextProps.profile.username,
                    email         :nextProps.profile.email,
                    status        :nextProps.profile.status,
                    location      :nextProps.profile.location,
                }) 
                nextProps.onChangeProfile(false);
            }

           

            
         }
  
  render(){

          var  showButtons = this.state.mode==="show"?{display:"none"}:{display:"block"}
          var  showEdit    = this.state.mode==="edit"?{display:"none"}:{display:"block"}
          var  extension   = this.state.mode==="edit"? "" :"-plaintext";

         
                    return (
                        <div className="container-fluid ">
                                     <div class="row">
                                                <div className="col-sm-4 " style={{width:"200px", height:"200px"}} >
                                                    <img src={this.state.src.length > 0? this.state.src: "https://www.limestone.edu/sites/default/files/user.png"} className="rounded mx-auto d-block" style={{maxWidth: "200px",height: "200px",marginTop:"20px"}} />
                                                    <input id="imageInput" className="col-sm-12 mt-3 mb-3" type="text" placeholder="Copy an image address to update the image"  style={showButtons} onChange={this.change} value={this.state.src}/>      
            
                                                </div>
                                                <div className="col-sm-8">
                                                <form className="mt-4">
                                                        <div className="form-group form-inline">
                                                                <label className="control-label col-sm-3 text-primary" for="email">Username</label>
                                                                <input  id="usernameInput" type="email" className={" col-sm-8 form-control"+extension} onChange={this.state.mode==="edit"?this.change:this.showMode}  value={this.state.username}/>      
                                                        </div>
                                                        <div className="form-group form-inline">
                                                                <label class="control-label col-sm-3 text-primary" for="email">Email</label>
                                                                <input  id="emailInput" type="email" className={" col-sm-8 form-control"+extension}  onChange={this.state.mode==="edit"?this.change:this.showMode}   value={this.state.email}/>      
                                                        </div>
                                                        <div className="form-group form-inline">
                                                                <label class="control-label col-sm-3 text-primary" for="email">Status</label>
                                                                <input  id="statusInput" type="email" className={" col-sm-8 form-control"+extension}   onChange={this.state.mode==="edit"?this.change:this.showMode}  value={this.state.status}/>      
                                                        </div>
                                                        <div className="form-group form-inline">
                                                                <label class="control-label col-sm-3 text-primary" for="email">Location</label>
                                                                <input  id="locationInput" type="email" className={" col-sm-8 form-control"+extension}   onChange={this.state.mode==="edit"?this.change:this.showMode}   value={this.state.location}/>      
                                                        </div>
                                                      
                                                    </form>
                                                   
                                                </div>
                                     </div >   
                                <div className="text-right" style={showEdit} >
                                    <button type="button" className="btn  btn-success mr-2 mb-3 mt-3" onClick={this.editMode}><i className="fas fa-user-edit"></i></button>
                                    
                                </div>
                                <div className="text-right" style={showButtons} >
                                    <button type="button" className="btn  btn-primary mr-2 mb-3 mt-3" onClick={this.done}><i className="fas fa-check-circle"></i></button>
                                    <button type="button" className="btn  btn-danger mb-3 mt-3" onClick={this.cancel}><i className="fas fa-times-circle"></i></button>
                                </div>
                        </div>    
                              
                   

                    );
                   

            }    
}
   
    
    const mapStateToProps = state => {
      return {
                profile: state.profile
                
      };
    };
    
    const mapDispatchToProps = dispatch => {
      return {
        onEdit: (profile)=>dispatch({type: actionTypes.EDITPROFILE ,profile:profile}),
        onChangeProfile: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value})
      };
    };
    
    export default connect(mapStateToProps, mapDispatchToProps)(Personal);