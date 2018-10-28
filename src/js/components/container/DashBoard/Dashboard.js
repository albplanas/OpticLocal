import React, { Component } from "react";

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

const { Calculate_interaction} = require('../../../math/calculus');
const { Parameters} = require('../../../math/parameters');

import Graphic from "./Graphic";
import Calculator from "./Calculator";
import Boxtools from "./Boxtools";


class Dashborad extends Component {
      constructor(props) {
        super(props);

        this.state={

          graphicId:"plotGraph",

          Changed:false,
          
          data: [],
          
          config: {},
          
          layout: {},

          title: "Hello",

          description: "Something"
        }

  }


  componentWillMount() {


    //size of graph
    var w = window.innerWidth-500;
    var h = window.innerHeight-150;

    var rang_w = w/100;
    var rang_h = h/100;
    
 
    //Primary data
    var  container = Calculate_interaction(this.props.src,this.props.dvc);
    
    var  data= Parameters(this.props.src,this.props.dvc,container);

    const update = this.state.data.concat(data);


    var lay  = this.props.layout;
     
    lay.width= w;lay.height= h;
    lay.xaxis.range = [-rang_w,rang_w];
    lay.yaxis.range = [-rang_h,rang_h];

    var conf = this.props.config

    this.setState({

      data:update,

      layout:lay,
      config:conf
    })
   

  }



  //Update the graphic
 componentWillReceiveProps(nextProps) {

    var chang=false;
    var update=this.state.data;

    var w = window.innerWidth-500;
    var h = window.innerHeight-150;

    var rang_w = w/100;
    var rang_h = h/100;
   
    if(nextProps.Changed===true || nextProps.ChangedProject===true ){

      
      var  container = Calculate_interaction(nextProps.src,nextProps.dvc);

      var update= Parameters(nextProps.src,nextProps.dvc,container);

      chang=true;

    }




    var lay  = this.props.layout;
      
    lay.width= w;lay.height= h;
    lay.xaxis.range = [-rang_w,rang_w];
    lay.yaxis.range = [-rang_h,rang_h];

    var conf = this.props.config
       
    this.setState({
      data:update,
      Changed:chang,
      layout:lay,
      config:conf
    })
   
    nextProps.onChanged(false);
    nextProps.onDataChanged(false)
    
  }






  render(){

            return (
              <div className="wrapper_r">
                
                    <div id="content_r">
                       <Boxtools/>
                        <Graphic info={this.state}/>
                       
                      </div>

                      <Calculator  info={this.state}/>
                
            </div>

            );

       }
    }





    const mapStateToProps = state => {
      
      return {
          src:                state.workpaper.Workpaper[state.workpaper.select].sources,
          dvc:                state.workpaper.Workpaper[state.workpaper.select].devices,
          Changed:            state.globalState.Changed,
          ChangedProject:     state.workpaper.Datachange,
          username:           state.profile.username,
          layout:             state.workpaper.Workpaper[state.workpaper.select].layout,
          config :            state.workpaper.Workpaper[state.workpaper.select].config
      };
    };
    
    const mapDispatchToProps = dispatch => {
      return {
        onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
        onDataChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
      };
    };
    
    export default connect(mapStateToProps, mapDispatchToProps)(Dashborad);
  





