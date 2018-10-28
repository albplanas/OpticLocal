import React, { Component } from "react";

import { connect } from 'react-redux';


import Personal from "./Personal";
import WorkSheet from "./WorkSheet";

class Profile extends Component {
      constructor(props) {
        super(props);

        this.state={
                door:"personal_session"
        }
        this.Active = this.Active.bind(this);
  }


        Active(e){
            let id=e.target.id[e.target.id.length-1];
            
            this.setState({
                door:id==="1" ? "personal_session": "worksheet_session"
            })
        }



  render(){

            if(this.props.login){
                 
                var showPersonal = this.state.door === "personal_session" ? {display:"block"}: {display:"none"};
                var showWorksheet = this.state.door === "worksheet_session" ? {display:"block"}: {display:"none"};

                return (
                    <div className="wrapper_r">
                     
                     
                      <div className="card w-75 " style={{marginLeft:"10vw"}}>
                                <div className="card-header " >
                                    <ul className="nav nav-tabs card-header-tabs ">
                                            <li id="li1" className="nav-item " onClick={this.Active}>
                                                <a id="ai1" className={this.state.door === "personal_session" ? "nav-link active text-primary": "nav-link text-secondary" } >Personal</a>
                                            </li>
                                            <li id="li2"className="nav-item"   onClick={this.Active}> 
                                                <a id="ai2" className={this.state.door === "worksheet_session" ? "nav-link active text-primary": "nav-link text-secondary" }  >Worksheets</a>
                                            </li>
                                    </ul>
                                </div>
                                <div id="personal_session" className="card-body"  style={showPersonal}>
                                         <Personal />
                                </div>
                                <div id="worksheet_session" className="card-body" style={showWorksheet}>
                                         <WorkSheet/>
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
            login: state.profile.login
      };
    };
    
    const mapDispatchToProps = dispatch => {
      return {
    
      };
    };
    
    export default connect(mapStateToProps, mapDispatchToProps)(Profile);
  