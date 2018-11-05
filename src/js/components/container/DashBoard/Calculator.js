import React, { Component } from "react";

import Add_Element from "./Add_Element";
import Edite_Element from "./Edite_Element";
import BoxSetting from "./BoxSetting"


class Calculator extends Component {

    
    render() {

     

      return (
        <div >
                                                   
              <nav id="sidebar_r" className="active">
                      <button type="button" id="CalcCollapse" className="btn btn-info"><i className="fa fa-cog fa-spin"></i></button>
   
                      <div className="sidebar-header"><h3>Set Up</h3></div>

                         <div id="Paccordion" style={{position:"absolute", top:"100px",left:"52px", width:"290px"}}>
                                    <div class="card mb-3">
                                      <div class="card-header ParentHeader" id="ElemOne">
                                        
                                          <button class="btn btn-link text-white" data-toggle="collapse" data-target="#colOne" aria-expanded="false" aria-controls="colOne">Configurations</button>
                                      
                                      </div>

                                      <div id="colOne" class="collapse " aria-labelledby="ElemOne" data-parent="#Paccordion">
                                        <div class="card-body ParentBody" >
                                                <BoxSetting/>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="card mb-3">
                                      <div class="card-header ParentHeader " id="ElemTwo">
                                      
                                          <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#colTwo" aria-expanded="true" aria-controls="colTwo">Add some elements</button></div>
                                      <div id="colTwo" class="collapse show" aria-labelledby="ElemTwo" data-parent="#Paccordion">
                                        <div class="card-body ParentBody">
                                                <Add_Element/>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="card mb-3">
                                      <div class="card-header ParentHeader" id="ElemThree">
                                          <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#colThree" aria-expanded="false" aria-controls="colThree">Edit</button>
                                       
                                      </div>
                                      <div id="colThree" class="collapse" aria-labelledby="ElemThree" data-parent="#Paccordion">
                                        <div className="card-body ParentBody"  >
                                                <Edite_Element/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                    
                               
                   
                

                </nav>

        </div>
      );
    }
  }



export default Calculator;