var { Interception_rect ,
    Interception_rect_circle,
    Convert_Center_Mirror_to_Center_Circle, 
    Conversor_from_L_to_angle,
    Angle_in_the_Circle,
    Distance} = require('./func');


function Segment_intercept(haz,segment){

    var  rect_1={
        x:haz.x_origen,
        y:haz.y_origen,
        m:haz.slope,
        sence:haz.sence
    }
    Intercept=Interception_rect(rect_1,segment);


    var  L=Distance(Intercept,segment)
    var  F=Distance(Intercept,rect_1 )
  
    
    if( segment.l/2.0 < L )                      { Intercept = {x:undefined,y:undefined} } 

    if( F < 0.000001)          { Intercept = {x:undefined,y:undefined} } 


    if( haz.sence==="+" && Intercept.x < haz.x_origen ) { Intercept = {x:undefined,y:undefined} } 
    

    if( haz.sence==="-" && Intercept.x > haz.x_origen ) { Intercept = {x:undefined,y:undefined} } 
    return Intercept
}


function Arc_intercept(haz,arc){


                    var  rect_1={
                        x:haz.x_origen,
                        y:haz.y_origen,
                        m:haz.slope,
                        sence:haz.sence
                    }

                    var center=Convert_Center_Mirror_to_Center_Circle(arc);
                    
                    var Circle = { x:center.x, y:center.y,r:arc.r }

                    let Sol = Interception_rect_circle(rect_1,Circle);
                    
                   

                    let Angles = Conversor_from_L_to_angle(arc);


                    function Filter(x,y){

                    

                //Sence filter
                        if(haz.sence==="+" && x < haz.x_origen )return  {x:undefined,y:undefined}
                        if(haz.sence==="-" && x > haz.x_origen )return {x:undefined, y:undefined}
                        if(x === haz.x_origen){
                        if(haz.sence==="+" && y <= haz.y_origen )return  {x:undefined,y:undefined}
                        if(haz.sence==="-" && y >= haz.y_origen )return  {x:undefined,y:undefined}
                        }
                //Belong Filter
                        let ang_Sol = Angle_in_the_Circle({x:x,y:y },Circle);



                        let diff = Math.abs(Angles.init-Angles.end);
                        diff = diff <= Math.PI ? diff : 2*Math.PI - diff;

                        let diff_init = Math.abs(Angles.init-ang_Sol);
                        diff_init = diff_init <= Math.PI ? diff_init : 2*Math.PI - diff_init;

                        let diff_end = Math.abs(Angles.end-ang_Sol);
                        diff_end = diff_end <= Math.PI ? diff_end : 2*Math.PI - diff_end;

                        if(Math.abs(diff_end+diff_init-diff)>0.00001)  {return  {x:undefined,y:undefined} }

                    
                //The point is the origen
                    if( Distance({x:x,y:y},rect_1 )<=0.000001)          { return {x:undefined,y:undefined} }    

                    return {x:x , y:y}
                    }

                    Solution_1=Filter(Sol.x1,Sol.y1) ;
                    Solution_2=Filter(Sol.x2,Sol.y2) ;

                    
                    // Test for check nearest point
                    let min=1000000;
                    let d1,d2;
                    
                    Intercept={x:undefined,y:undefined};

                    d1 = Solution_1.x === undefined? 1000001 :  Distance(rect_1,Solution_1);
                    Intercept = d1 < min? Solution_1: Intercept
                    min = d1 < min ? d1 :min;

                    d2 = Solution_2.x === undefined? 1000000 :  Distance(rect_1,Solution_2);
                    Intercept = d2 < min? Solution_2: Intercept
                    min = d2 < min ? d2 :min;
           

                    return Intercept

}

module.exports = {
    Segment_intercept:Segment_intercept,
    Arc_intercept:Arc_intercept
}