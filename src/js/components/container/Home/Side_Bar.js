import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

// Options Values

var arrayName=["Home","Dashborad","Profile","Forum","Contributions"];
var arrayIcon=["fas fa-home","fas fa-briefcase","fas fa-user","fas fa-user-friends","fas fa-users"];
var arrayId  =[1,2,3,4,5];



//Main
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.toggleclassName= this.toggleclassName.bind(this);
        this.Option=this.Option.bind(this);
    }


    //Helper functions
 Option(name,icon,id){
    return (
        <li className={this.toggleclassName("door"+id,this.props.door)} id={"door"+id} onClick={()=>{return this.props.onSelectMenu("door"+id)}}>

        <a ><i style={{marginLeft:"25px",marginRight:"25px"}} className={icon}></i>{name} </a>
      </li>
    )
}


 toggleclassName(a,b) {
    return a===b?"active":""
 };



    
    render() {
           
      return (
        <div >
                     
                    <nav id="sidebar">
                        <div className="sidebar-header"> 
                                <p style={{marginLeft:"10px",fontSize:"30px",color:"white"}}> <i  className="fas fa-bullseye"></i>PTIC</p>
                        </div>

                        <ul className="list-unstyled components">
                                    <p style={{marginLeft:"25px"}}>Menu</p>
                                        {
                                            arrayName.map((name,i)=>{
                                            return this.Option(name,arrayIcon[i],arrayId[i])
                                        })}
                                  
                        </ul>

                        <button style={{marginLeft:"30px"}} type="button" className="btn btn-info"> Download App <i style={{marginLeft:"25px"}} className="fas fa-download"></i> </button>
                   
                    </nav>

        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
        door: state.globalState.door,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectMenu: (door) => dispatch({type: actionTypes.SELECTMENU , door:door})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);





