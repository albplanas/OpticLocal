import React, { Component } from "react";
import * as actionTypes from '../../../../store/actions';
import { connect } from 'react-redux';




class Messenger extends Component {
      constructor(props) {
        super(props);

        this.state={
                
        }
        
  }


  componentWillMount() {



  
   

  }



 componentWillReceiveProps(nextProps) {
    
    
       


    }



  render(){
            return (
                <div>
                    
                         There aren't any message for you now 
                </div>
            )

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
    
    export default connect(mapStateToProps,mapDispatchToProps)(Messenger);
  