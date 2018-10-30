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
    var w = window.innerWidth-300;
    var h = window.innerHeight-150;

    var rang_w = w/100;
    var rang_h = h/100;
    
    const select =this.props.select;
    var src = this.props.workpaper[select].sources;
    var dvc = this.props.workpaper[select].devices;
 
    //Primary data
    var  container = Calculate_interaction(src,dvc);
    
    var  data= Parameters(src,dvc,container);

    const update = this.state.data.concat(data);


    var lay  = Object.assign({},this.props.workpaper[select].layout) 
     
    lay.width= w;lay.height= h;
    lay.xaxis.range = [-rang_w,rang_w];
    lay.yaxis.range = [-rang_h,rang_h];


    
    this.setState({

      data:update,

      layout:lay,
      config:this.props.workpaper[this.props.select].config
    })
   

  }



  //Update the graphic
 componentWillReceiveProps(nextProps) {

    var chang=false;
    var update=this.state.data;

    var w = window.innerWidth-300;
    var h = window.innerHeight-150;

    var rang_w = w/100;
    var rang_h = h/100;

    const select =nextProps.select;
   
    if(nextProps.Changed===true || nextProps.ChangedProject===true ){

      const select =nextProps.select;
      var src = nextProps.workpaper[select].sources;
      var dvc = nextProps.workpaper[select].devices;
      
      var  container = Calculate_interaction(src,dvc);

      var update= Parameters(src,dvc,container);

      chang=true;

    }




    var lay  = Object.assign({},this.props.workpaper[select].layout) 
      
    lay.width= w;lay.height= h;
    lay.xaxis.range = [-rang_w,rang_w];
    lay.yaxis.range = [-rang_h,rang_h];

    var conf = Object.assign({},this.props.workpaper[select].config)
       
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

          Changed:            state.globalState.Changed,
          ChangedProject:     state.workpaper.Datachange,
          username:           state.profile.username,
          workpaper:          state.workpaper.Workpaper,
          select   :          state.workpaper.select
      };
    };
    
    const mapDispatchToProps = dispatch => {
      return {
        onChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
        onDataChanged: (value=true)=>dispatch({type: actionTypes.CHANGED ,value:value}),
      };
    };
    
    export default connect(mapStateToProps, mapDispatchToProps)(Dashborad);
  





