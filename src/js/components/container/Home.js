import React from "react";
import { connect } from 'react-redux';



import Header from "./Home/Header";
import Tutorial from "./Home/Tutorial";
import Top_Bar from "./Home/Top_Bar";
import SideBar from "./Home/Side_Bar";



import Dashboard from "./DashBoard/Dashboard";

import Profile from "./Profile/Profile";

function Home(props) {

      
      var show_home                   = props.door==="door1"?{display:"block"}:{display:"none"}
      var show_dashboard              = props.door==="door2"?{display:"block"}:{display:"none"}
      var show_profile                = props.door==="door3"?{display:"block"}:{display:"none"}
      return (
        <div id="Home">
        
                    <div className="wrapper">
                              
                                
                               <SideBar/>
                                
                                <div id="content">

                                        <Top_Bar/>

                                        <div id="home_seccion" style={show_home}>
                                    
                                                <Header/>
                                                <Tutorial/>
                                        </div> 
                                        <div id="dashboard_seccion" style={show_dashboard}>
                                                <Dashboard/>
                                        </div> 
                                        <div id="profile_seccion" style={ show_profile}>
                                                <Profile/>
                                        </div> 
                                 </div>
                            </div>
        </div>
      );
    }
  
  

  const mapStateToProps = state => {
    return {
        door: state.globalState.door
    };
  };
  

  
  export default connect(mapStateToProps)(Home);



