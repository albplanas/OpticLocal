/**************************************************************************************
		This file has all of math functions using to calculate 
               position, direction, and other characteristic of the light 
**************************************************************************************/

/*********************************************** *
                   Math Function
*********************************************** */

                /*********************************************** *
                                 Interception
                *********************************************** */

                function Interception(r){

                    return r.m===Infinity?Infinity:r.y-r.m*r.x;

                }

                /*********************************************** *
                                 Interception rect vs rect
                *********************************************** */

                function Interception_rect(r1,r2){

                        var n1=Interception(r1);
                        var n2=Interception(r2);

                        if(r1.m===r2.m){
                            return {x:undefined,y:undefined}
                        }
                        if(r1.m===Infinity)
                            return {
                                x:r1.x,
                                y:r2.m*r1.x+n2
                            }
                        if(r2.m===Infinity)
                            return {
                                x:r2.x,
                                y:r1.m*r2.x+n1
                            }
                        
                        
                        let   x=-(n2-n1)/(r2.m-r1.m);
                        let   y=r1.m*x+n1;
                        

                        return {x:x,y:y}
                }
                /*********************************************** *
                                Interception rect vs circle
                *********************************************** */

               function Interception_rect_circle(rect,Circle){

              
                    if(rect.m===Infinity){
                        var D=Math.pow(Circle.r,2)-Math.pow(rect.x-Circle.x,2)
                        return D<0? {
                                        x1:undefined,
                                        x2:undefined,
                                        y1:undefined,
                                        y2:undefined
                                 }:{
                                        x1: rect.x,
                                        x2: rect.x,
                                        y1: Circle.y+Math.pow(D,0.5),
                                        y2: Circle.y-Math.pow(D,0.5)
                                    }
                    }

                    else{
                        var n=Interception(rect);

                        //Coeficients
                        var a= Math.pow(rect.m,2)+1
                        var b= 2*(rect.m*(n-Circle.y)-Circle.x)
                        var c= Math.pow(n-Circle.y,2)+Math.pow(Circle.x,2)-Math.pow(Circle.r,2)
        
        
                        var ptos = Discriminant(a,b,c);


                        return ptos.sol_1 === "Imaginary"? {
                                                                x1:undefined,
                                                                x2:undefined,
                                                                y1:undefined,
                                                                y2:undefined
                                                                
                                                            }:
                                                            {
                                                                x1:ptos.sol_1,
                                                                x2:ptos.sol_2,
                                                                y1:ptos.sol_1*rect.m+n,
                                                                y2:ptos.sol_2*rect.m+n
                                                            }
                    }

        }
        
              
                /*********************************************** *
                                 Distance
                *********************************************** */

                function Distance(p1,p2){

                    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
                }

                /*********************************************** *
                                 Discriminant
                *********************************************** */

                function Discriminant(a,b,c){
                            if( b*b < 4*a*c ) return {sol_1:"Imaginary" ,sol_2:"Imaginary"}
                            else{
                            D=Math.pow(b*b - 4*a*c,0.5)
                            
                            return { 
                                        sol_1:(-b-D)/(2*a),
                                        sol_2:(-b+D)/(2*a)
                                    }
                            }

                }
//Finding de Extremes point of rays
                function Find_Extreme_point(array,id){
    
                    if(array===[]){return {x:Infinity,y:Infinity} }
                   
                    var filter=array.filter((elem)=> elem.id_parent===id)
                    
                   
                    return  (filter === undefined || filter.length == 0) ? {x:Infinity,y:Infinity} : {x:filter[0].x_origen ,y :filter[0].y_origen}
                
                }
                
                
                function Vector(x,y,x_extreme,y_extreme,m,sence){
                
                        if( m === Infinity ){
                
                            if(x_extreme === Infinity){
                              return  sence==="+" ? [x,y+1000] : [x,y-1000]
                            }
                
                            else{
                                return [x_extreme,y_extreme]
                            }
                        }
                        else{
                            if(x_extreme === Infinity){
                                return  sence==="+" ? [x+1000,m*(1000)+y] : [x-1000,m*(-1000)+y]
                              }
                            else{
                                return [x_extreme,y_extreme]
                            }  
                        }
                
                }

//Transform using ratio, longitud of the arc , slope return => angle init and angle end

    function Conversor_from_L_to_angle(arc){

        let center =  Convert_Center_Mirror_to_Center_Circle(arc);

        let l=arc.l;
        let m= arc.m;

        let middle = { 
            x:arc.x , 
            y:arc.y
        }
        


        let delt_x = m===Infinity? 0 : (l/2)*Math.sqrt(1/(Math.pow(m,2)+1))
        let delt_y = m===Infinity? (l/2) : m*(l/2)*Math.sqrt(1/(Math.pow(m,2)+1))



        let sol_x = [ middle.x - delt_x , middle.x + delt_x ];
        let sol_y = [ middle.y - delt_y , middle.y + delt_y ];
         
        

        let point_A={
                        x:sol_x[0],
                        y:sol_y[0]
        }

        let point_B={
                        x:sol_x[1],
                        y:sol_y[1]
        }


        let ang_A = Angle_in_the_Circle(point_A,center);
        let ang_B = Angle_in_the_Circle(point_B,center);

        

        return {
            init:ang_A ,
            end: ang_B
        }
            
    }         

    function  Convert_to_Grade(m,sence){
        var alpha = Math.atan(m)
        if(m===0){cita=0}
        var cita ;
     

        if(sence==="-" && alpha>0 && alpha<Math.PI/2){cita=alpha}
        if(sence==="+" && alpha>=Math.PI/2 && alpha<Math.PI){cita=alpha}
        if(sence==="+" && alpha>=0 && alpha<Math.PI/2){cita=alpha+Math.PI}
        if(sence==="-" && alpha>=Math.PI/2 && alpha<Math.PI){cita=alpha+Math.PI}
     
     
         return  cita
     }

     function  Convert_Center_Mirror_to_Center_Circle(arc){
              
                        let r=arc.r;
                        let l=arc.l;
                        let middle = { 
                                        x:arc.x , 
                                        y:arc.y
                                    }
                        let m= arc.m;
                
                    if( l >= 2*r || r===Infinity){ return middle}
                    else{

                        let h = Math.sqrt( Math.pow(r,2)- Math.pow(l,2)/4);

                        let delt_x = m=== Infinity ? h : h*Math.sqrt((m*m)/(m*m+1)) ;

                        let sol_x = [ middle.x - delt_x , middle.x + delt_x];
                        
                        let sol_y;
                    
                        if( m === Infinity ){sol_y=[middle.y, middle.y]}

                        else if( m === 0 ) {sol_y=[ middle.y + h , middle.y - h ]}

                        else{ sol_y=[ middle.y + delt_x/m , middle.y - delt_x/m ] }

                        
                    result= arc.sence === "+" ? { 
                                                            x: sol_x[0],
                                                            y: sol_y[0]
                                                        }:
                                                        { 
                                                            x: sol_x[1],
                                                            y: sol_y[1]
                                                        }
                    
                    return result
            }
              
            

     }

    function Angle_in_the_Circle(pto,Circle){

        let a = pto.y-Circle.y;
        let b = pto.x-Circle.x;
        let alpha = Math.atan(a/b);
       

        //general case
        if( alpha >= 0 ){
            alpha = b > 0 ? alpha : alpha + Math.PI
        }
        else{
            alpha = b > 0 ? alpha +2*Math.PI : alpha + Math.PI
        }

        //case b=0
        if(b===0){ return  a>=0? 0.5*Math.PI : 1.5*Math.PI   }
        return alpha
    }
//Useful functions
    function Slope_in_the_Circle(pto,Circle){
       
        let a = pto.y-Circle.y;
        let b = pto.x-Circle.x;
        return a===0? Infinity: -b/a
    }

    function Slope(ptoA,ptoB){
        return ptoB.x===ptoA.x? Infinity : (ptoB.y-ptoA.y)/(ptoB.x-ptoA.x);
    }

    function ReScale(angle){

        if(angle<0){
            return ReScale(angle +360)
        }
       else if(angle >=360){
           return ReScale(angle-360)
       }
        else{
            return angle
        }
       
    }

    
 module.exports = {
                    Interception                                        : Interception,
                    Interception_rect                                   : Interception_rect,
                    Interception_rect_circle                            : Interception_rect_circle ,

                    Distance                                            : Distance,
                    Discriminant                                        : Discriminant,

                    Find_Extreme_point                                  : Find_Extreme_point,
                    Vector                                              : Vector,


                    Conversor_from_L_to_angle                           : Conversor_from_L_to_angle,
                    Convert_to_Grade                                    : Convert_to_Grade,
                    Convert_Center_Mirror_to_Center_Circle              : Convert_Center_Mirror_to_Center_Circle,
                    Angle_in_the_Circle                                 : Angle_in_the_Circle ,
                    Slope_in_the_Circle                                 : Slope_in_the_Circle,


                    Slope:Slope,
                    ReScale:ReScale
                   
                }
                

 
