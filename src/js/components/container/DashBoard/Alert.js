import React, { Component } from "react";



class Alert extends Component {
  constructor(props) {
    super(props);

    this.state={
        LoginAlert      :false,
        SuccessAlert    :false,
        DeleteAlert     :false
    }

      }

    
      //Update the graphic
     componentWillReceiveProps(nextProps) {

                if(nextProps.info.LoginAlert!==this.state.LoginAlert || nextProps.info.SuccessAlert!==this.state.SuccessAlert || nextProps.info.DeleteAlert!==this.state.DeleteAlert ){
                    this.setState({
                        LoginAlert: nextProps.info.LoginAlert,
                        SuccessAlert:nextProps.info.SuccessAlert,
                        DeleteAlert:nextProps.info.DeleteAlert
                       
                    })
        }
                if(nextProps.info.SuccessAlert!==this.state.SuccessAlert){
                    this.setState({
                        SuccessAlert:nextProps.info.SuccessAlert,
                    
                    })
}
       
        
      }

    render() {


              var LoginAlert = this.state.LoginAlert? {display:"block"} : {display:"none"}
              var SuccessAlert = this.state.SuccessAlert? {display:"block"} : {display:"none"}
              var DeleteAlert =this.state.DeleteAlert? {display:"block"} : {display:"none"}
                  return (
                      <div>
                                 
                            <div class="alert alert-warning w-75 text-center" role="alert" style={LoginAlert}>
                                         <strong>Hi there!</strong> You should login or register first
                              </div>

                            <div class="alert alert-success w-75 text-center" role="alert" style={SuccessAlert}>
                                     Your sheet was saved successfully!
                              </div>
                              <div class="alert alert-danger w-75 text-center" role="alert" style={DeleteAlert}>
                                     Your sheet was delete successfully!
                              </div>
                      </div>      
                          ) 
        }
   }



export default Alert;