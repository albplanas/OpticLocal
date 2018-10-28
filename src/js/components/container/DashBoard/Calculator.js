import React, { Component } from "react";

import Add_Element from "./Add_Element";
import Edite_Element from "./Edite_Element";
import BoxSetting from "./BoxSetting"


class Calculator extends Component {

    
    render() {

     

      return (
        <div >
                                                   
              <nav id="sidebar_r">
                      <button type="button" id="CalcCollapse" className="btn btn-info"><i className="fa fa-cog fa-spin"></i></button>
   
                      <div className="sidebar-header"><h3>Set Up</h3></div>
                    
                    <BoxSetting info={this.props.info}/>
                    <Add_Element/>
                    <Edite_Element/>

                </nav>

        </div>
      );
    }
  }



export default Calculator;