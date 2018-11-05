import React, { Component } from "react";
import logo1 from './../../../../Images/img_1.png' // relative path to image 
import logo2 from './../../../../Images/img_2.png'
import logo3 from './../../../../Images/img_3.png'


  class Header extends Component { 
    render() { 
        return ( 
          
            <div id="Header">
              
             <div className="Presentation">
             <h3 className="text-white">Optic app</h3>
             <br/>
                  <p style={{color:"rgb(240,240,240,0.8)"}}>This is an app completely free with the proposal to serve to physcis's students who need to deploy projects or simply to obtain another point of view  of optical phenomenal  </p>
            </div>
              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  ` <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img className="d-block "  src={logo1} alt={"logo"}/> 
                        
                      </div>
                      <div class="carousel-item">
                      <img className="d-block " src={logo2} alt={"logo"}/> 
                      </div>
                      <div class="carousel-item">
                      <img className="d-block w-100 " src={logo3} alt={"logo"}/> 
                      </div>
                    </div>
                    <a className="carousel-control-prev " href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon "  aria-hidden="true"></span>
                      <span class="sr-only " >Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>`
            </div>
            </div>
          );
    }
}
      
    
  

  export default Header;

 

