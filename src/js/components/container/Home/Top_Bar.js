import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import axios from 'axios';



class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state =  {

            username:'',
            password:"",

            Log_active:""
          }

          this.Show_time      = this.Show_time.bind(this);
          this.Hidden_time    = this.Hidden_time.bind(this)
          this.Sign           = this.Sign.bind(this);
          this.SignGoogle     = this.SignGoogle.bind(this);
          this.onChange       = this.onChange.bind(this);
          this.Logout         = this.Logout.bind(this);
        
    }

    //Helpers functions
    Show_time(e){
       
        this.setState({
            Log_active: e.target.id==="login"?"LOGIN":"REGISTER"
        })
    }
    Hidden_time(){

        this.setState({
            username:'',
            password:"",
            Log_active:"" });
    }

    onChange(){
        this.setState({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        })
    }


    //Sign functions
    Sign(e){
        
        e.preventDefault();

        // get our form data out of state
     var   user={
            username :this.state.username,
            password : this.state.password
        }
        
        if(this.state.Log_active==="LOGIN"){
            axios.post("/login", user)
                .then((result) => {

                   
                    
                     result.data.login ? this.props.Login( result.data.login, result.data.profile) : this.props.Login( result.data.login  , { username   : "", src        : "", email      : "", status     : "", location   : ""})
                     this.props.Papers(result.data.papers)

                   document.getElementById('username').value="";
                   document.getElementById('password').value="";

                   this.setState({
                                    username: "",
                                    password: "",
                                    Log_active:""
                    })

                })
        }
        else{
            axios.post("/register", user)
            .then((result) => {
                      
                this.props.Login(result.data.login,result.data.profile)
                
               document.getElementById('username').value="";
               document.getElementById('password').value="";

               this.setState({
                                username: "",
                                password: "",
                                Log_active:""
                })

            })  
        }
              
    }

    SignGoogle(e){

        e.preventDefault();


            axios.get("/google")
                .then((result) => {
                   
                    this.props.Login(result.data.login,result.data.username)
                    
                   document.getElementById('username').value="";
                   document.getElementById('password').value="";

                   this.setState({
                                username: "",
                                password: "",
                                Log_active:""
                    })

                })

    }

    Logout(e){
        e.preventDefault();


            axios.get("/logout")
                .then((result) => {
                   
                    this.props.Login(result.data.login,result.data.username)
                    
                   document.getElementById('username').value="";
                   document.getElementById('password').value="";
                
                    this.props.CleanData();
                    //this.props.CleanProfile();

                   this.setState({
                                username: "",
                                password: "",
                                Log_active:""
                    })

                })
      
    }


    render() {

     var show_logout=this.props.login?{visibility:"visible"}:{visibility:"hidden"};
     var show_login=this.props.login?{visibility:"hidden"}:{visibility:"visible"};

    var show_login_chart= this.state.Log_active!==""?{display:"block"} :{display:"none"} 
      


      return (
        <div id="Top_bar">
              <div className="row">
                          <div className="col-xs-6">
                              <button  type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.props.OpenMenu}>
                                          
                              <i className="fas fa-bars"></i>
                                               
                              </button>            
                           </div>
                           <div className="col-xs-2">
                                 <p id="Title"><i  style={{color:"#034f84"}}className="fas fa-bullseye"></i>PTIC</p>

                          </div>
                          <div className="row" style={{position:"fixed",right:"5vw"}}>
                                <div className="col-sm-6" id="login" style={show_login} onClick={this.Show_time}>Login</div>    
                                <div className="col-sm-6" id="register" style={show_login} onClick={this.Show_time}>Register</div>
                           </div> 

                          

                          <div style={show_logout}>
                                <div className="btn-group" style ={{position:"fixed", right:"5vw"}} >
                                            <button  className="bg-white rounded border border-dark text-primary " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{width:"auto",marginTop:"15px"}}><span style={{padding:"5px"}}>{"Welcome "+this.props.username} <i style={{marginLeft:"5px"}} className="fas fa-caret-down"></i></span></button>
                                            
                                            <div className="dropdown-menu bg-white">
                                                    <a className="dropdown-item text-primary" onClick={()=>{this.props.ChangePort("A");this.props.LoginLinks("3"); }}>Profile</a>
                                                    <a className="dropdown-item text-primary" onClick={()=>{this.props.ChangePort("B");this.props.LoginLinks("3"); }}>Your projects</a>
                                                    <a className="dropdown-item text-primary" onClick={()=>{this.props.ChangePort("C");this.props.LoginLinks("3"); }}>Messenger</a>
                                                <div className="dropdown-divider"></div>
                                                <div id="logout" className="dropdown-item text-danger"  onClick={this.Logout}>Logout</div> 
                                            </div>
                                    </div>
                          </div>
                          
                





                     <div id="myModal" className="modal" style={show_login_chart}>


                            <div className="modal-content">
                               <div className="sign_form bg-dark">
                                    <button type="button" className="close float-right" aria-label="Close" onClick={this.Hidden_time}><i className="fas fa-times" style={{color:"rgb(233, 75, 60)"}} ></i></button>
                                        <h2 className="title_log">{this.state.Log_active}</h2>
                                      
                                            <input id="username" type="text" name="u" placeholder="Username" required="required" onChange={this.onChange}/>
                                            <input id="password" type="password" name="p" placeholder="Password" required="required" onChange={this.onChange}/>
                                            
                                            <button type="submit" className="btn btn-success btn-block btn-large mt-4 mb-3" onClick={this.Sign}>{this.state.Log_active==="LOGIN"?"Let me in":"Create a new account"}</button>

                                            <p className="subtitle fancy"><span>or sign up with social media</span></p>
                                      <div className="row">
                                       {/*     <div className="col-sm-4"><button className="btn btn-primary btn-block ">Facebook</button></div>
                                            <div className="col-sm-4"><button className="btn btn-info btn-block ">Git Hub</button></div>
                                            <a  className="col-sm-4"><button className="btn btn-danger btn-block " onClick={this.SignGoogle}>Google</button></a>
                                        */}
                                      </div> 
                                     
                               </div>
                            </div>

                      </div>
                          
                          
                     </div>        

              </div>
               
              
     




      );
    }
  }




  const mapStateToProps = state => {
    return {
        open_menu: state.globalState.open_menu,
        login: state.profile.login,
        username:state.profile.username
    };
};

const mapDispatchToProps = dispatch => {
    return {

        OpenMenu    : () => dispatch({type: actionTypes.MAINMENU}),
        Login       : (val, profile) => dispatch({type: actionTypes.LOGIN , value:val, profile:profile}),
        Papers      : (papers) => dispatch({type: actionTypes.PAPERS , papers:papers}),
        CleanData   : () => dispatch({type: actionTypes.CLEANDATA}),
        CleanProfile   : () => dispatch({type: actionTypes.CLEANPROFILE}),
        ChangePort     : (value) => dispatch({type: actionTypes.CHANGEPORT , value: value}),
        LoginLinks     : (value) => dispatch({type: actionTypes.LOGINLINKS , value: value})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);








