/**************************************************************************************
		This file has all of physcis's law functions using to calculate 
               position, direction, and other characteristic of the light 
**************************************************************************************/
var {Convert_to_Grade} = require('./func.js');

/*************************************
 * 
 * Auxiliars function
 * 
 *********************************/
var Angle_Transformation = function(slope,sence){

    let angle = Math.atan(slope);

    if(sence ==="+"){angle=angle+Math.PI}
    else{
       angle = angle >= 0? angle : angle+ 2*Math.PI
    }
    return angle;
}

/**********************************************
                Laws Functions
 **********************************************/
function  Reflection(hs,h_sence,ms){
    
     //Some particulars case
    if(hs===ms){return {slope:hs ,sence:h_sence}}

    let  point_C = Angle_Transformation(hs,h_sence);
    let  point_A = Angle_Transformation(ms,"+");
    let  point_B = Angle_Transformation(ms,"-");

    

    deltA=Math.abs(point_C-point_A);
    deltA=deltA<=Math.PI? deltA:2*Math.PI- deltA;
    deltB=Math.abs(Math.PI-deltA);

    

    var alpha= deltA < deltB ? Math.PI/2 - deltA : Math.PI/2 - deltB ;

   

    if(deltA<=deltB){
        //case between  point A and PointA midlle 
        if(point_C > point_A && point_C < point_B){
       
             angle = point_A + Math.PI/2 + alpha;
        }
         //case between PointB midlle and point A
        else{
 
         angle = point_B+Math.PI/2 - alpha 
         angle = angle > 2*Math.PI ? angle - 2*Math.PI : angle 
        }
    }
    //case B
    else{
        //case between  point A middle and PointB
        if(point_C > point_A && point_C < point_B){
         
            angle = point_A + Math.PI/2 - alpha;

        }
        else{
   
            angle = point_B+Math.PI/2 + alpha 
            angle = angle > 2*Math.PI ? angle - 2*Math.PI : angle 
        }
    }
 
 
 
    slope=Math.tan(angle)
 
             if(angle<=Math.PI/2 || angle >1.5*Math.PI){sence="+"}
             else{sence="-"}
 
 
    return {slope:slope, sence:sence}

}

function  Refraction(hs,h_sence,ms,n1,n2){
     

    
    let sinO1;
    let N=n1/n2;
   if(hs===Infinity) {
       sinO1=(ms)/(Math.sqrt(1+ms*ms))
    }
   else if(ms===Infinity) {
       sinO1=(hs)/(Math.sqrt(1+hs*hs))
    }
   else{
       sinO1=(1+hs*ms)/(Math.sqrt(1+ms*ms)*Math.sqrt(1+hs*hs));
    }

    let cita=Math.asin(N*sinO1);

   let  point_A = Math.min(Angle_Transformation(ms,"+"),Angle_Transformation(ms,"-"))
   let  point_B = Math.max(Angle_Transformation(ms,"+"),Angle_Transformation(ms,"-"))
   let  point_C = Angle_Transformation(hs,h_sence);

   

   deltA=Math.abs(point_C-point_A)
   deltA=deltA<=Math.PI? deltA:2*Math.PI- deltA;
   deltB=Math.abs(Math.PI-deltA)
   

   if(deltA<=deltB){
       //case between  point A and PointA midlle 
       if(point_C > point_A && point_C < point_B){
           
            angle = point_B-cita+Math.PI/2;
            angle = angle>2*Math.PI?angle-2*Math.PI:angle
       }
        //case between PointB midlle and point A
       else{

        angle = point_B+cita-Math.PI/2;
       }
   }
   //case B
   else{
       //case between  point A middle and PointB
       if(point_C > point_A && point_C < point_B){
        
        angle = point_A+cita-Math.PI/2;
        angle = angle<0?angle+2*Math.PI:angle
       }
       else{
  
        angle = point_A-cita+Math.PI/2;
       }
   }



   slope=Math.tan(angle)

            if(angle<=Math.PI/2 || angle >1.5*Math.PI){sence="+"}
            else{sence="-"}


   return {slope:slope, sence:sence}
}




 
module.exports = {
    Reflection : Reflection,
    Refraction:Refraction
}


