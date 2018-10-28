import React, { Component } from "react";








class Graphic extends Component {
  constructor(props) {
    super(props);

    this.state={
      data: [],
      
      config: {},
      
      layout: {}
    }
 
      }
    
      //Load a graphic properties if there are any
      
      componentWillMount() {
        
        this.setState({
          data:this.props.info.data,
         layout:this.props.info.layout,
         config:this.props.info.config
        })
       
        
      }

      // draw a Loader
      componentDidMount() {

          var Tester=document.getElementById('plotGraph');
          
          var data=this.state.data;
          var layout=this.state.layout;
          var config= this.state.config;

          Plotly.newPlot(Tester, data, layout, config)

      }

      //Update the graphic
     componentWillReceiveProps(nextProps) {

     

        if(nextProps.info.Changed===true){

           
           var data=nextProps.info.data;
           var layout=nextProps.info.layout;
           var config= nextProps.info.config;
           
          this.setState({
                        data:data,
                        layout:layout,
                        config:config
          })

        
         var Tester=document.getElementById('plotGraph');


         Plotly.newPlot(Tester, data, layout, config )
         

        }
       
       
        
      }

    render() {
                
                  return (<div>
                                <div id="plotGraph"  />
                          </div>
                          ) 
        }
   }



export default Graphic;