import React, { Component } from "react";
//import Sample from "./../Tutorials/";
//Server needs to server the sample file 

//Helper Functions
function Card(name,src,text){
      return (
        <div className="card tutorial-card" >
              <img className="card-img-top" src={src}  />
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{text}</p>
                
            </div>
            <button className="btn btn-primary btn-bloc">Come on in</button>
       </div>
      )
}

//Card values
var arrayName=["Rays","Mirror","Lents","Bla bla bla bla"];

var arraySrc=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcAiYeT5popEQa5qdmmTb2GGdGsl0QZmy66DgEfPweoZXLug5",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcAiYeT5popEQa5qdmmTb2GGdGsl0QZmy66DgEfPweoZXLug5",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcAiYeT5popEQa5qdmmTb2GGdGsl0QZmy66DgEfPweoZXLug5",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcAiYeT5popEQa5qdmmTb2GGdGsl0QZmy66DgEfPweoZXLug5",
           ];
 var arrayText=["1","2","3","4"];


 class Tutorial extends Component{

  constructor(props) {
       super(props);

       this.state={

               worksheet:[],
               mode:[],
               username:"",
               select:0

       }
      }
      render(){


        return (
          <div id="Tutorial">
               <h1>Tutorial</h1>
               <hr/>
               <div className="searchform">
                  <input type="text" placeholder="Let me help you out!"/>
                  <button>Go</button>
              </div>
  
              <div className="flex-container">
                   
                   {arrayName.map((elem,index)=>{
                     return Card(elem, arraySrc[index] , arrayText[index])
                   })}
                   
              </div>
  
         </div>   
        );

      }
    }
  

  export default Tutorial;                                 
