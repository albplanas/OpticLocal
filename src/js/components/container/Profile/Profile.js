import React, { Component } from "react";
import * as actionTypes from '../../../../store/actions';
import { connect } from 'react-redux';


import Personal from "./Personal";
import WorkSheet from "./WorkSheet";
import Messenger from "./Messenger";

class Profile extends Component {
      constructor(props) {
        super(props);

        this.state={
                port:"A",
                login:false
        }
        
  }


  componentWillMount() {



    this.setState({

        port:this.props.port,
        login:this.props.login
  
    })
   

  }



 componentWillReceiveProps(nextProps) {
    
    if(nextProps.port!==this.state.port || nextProps.login!==this.state.login)
        this.setState({
            port:nextProps.port,
            login:nextProps.login
            
        })


    }



  render(){

            if(this.state.login){
                 
                var showPersonal = this.state.port === "A" ? {display:"block"}: {display:"none"};
                var showWorksheet = this.state.port === "B" ? {display:"block"}: {display:"none"};
                var showMessenger = this.state.port === "C" ? {display:"block"}: {display:"none"};

                return (
                    <div className="wrapper_r">
                     
                     
                      <div className="card w-75 " style={{marginLeft:"10vw"}}>
                                <div className="card-header " >
                                    <ul className="nav nav-tabs card-header-tabs ">
                                            <li id="li1" className="nav-item " onClick={()=> this.props.ChangePort("A")}>
                                                <a id="ai1" className={this.state.port === "A" ? "nav-link active text-primary": "nav-link text-secondary" } >Personal</a>
                                            </li>
                                            <li id="li2"className="nav-item"   onClick={()=> this.props.ChangePort("B")}> 
                                                <a id="ai2" className={this.state.port === "B" ? "nav-link active text-primary": "nav-link text-secondary" }  >Worksheets</a>
                                            </li>
                                            <li id="li3"className="nav-item"   onClick={()=> this.props.ChangePort("C")}> 
                                                <a id="ai3" className={this.state.port === "C" ? "nav-link active text-primary": "nav-link text-secondary" }  >Messenger</a>
                                            </li>
                                    </ul>
                                </div>
                                    <div id="personal_session" className="card-body"  style={showPersonal}>
                                            <Personal />
                                    </div>
                                    <div id="worksheet_session" className="card-body" style={showWorksheet}>
                                            <WorkSheet/>
                                    </div>
                                    <div id="messenger_session" className="card-body" style={showMessenger}>
                                           <Messenger/>
                                    </div>
                                </div>
                  </div>
                );
            }
            else{
                return (
                    <div className="wrapper_r">
                      <div className="card w-50 " style={{marginLeft:"20vw"}}>
                            <h5 className="card-header bg-warning"></h5>
                            <div className="card-body ">
                                <h5 className="card-title">Please Login or Register first </h5>
                                <p className="card-text">You do not have been registered yet, please, go to the topbar and login or create a new account to have a profile. </p>
                               
                            </div>
                        </div>
                      
                  </div>
                );
            }
            

        

       }
    }





    const mapStateToProps = state => {
      return {
            login: state.profile.login,
            port: state.profile.port
      };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
    
            ChangePort     : (value) => dispatch({type: actionTypes.CHANGEPORT , value: value}),
            LoginLinks     : (value) => dispatch({type: actionTypes.LOGINLINKS , value: value})
        };
    };
    
    export default connect(mapStateToProps,mapDispatchToProps)(Profile);
  