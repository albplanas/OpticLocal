/**************************************************************************************
		This file has all of Plot functions using to plot devices
**************************************************************************************/

var {Distance}=require("./func");


var {Convert_Center_Mirror_to_Center_Circle,
      Conversor_from_L_to_angle } = require('./func')

function Circunference(r,cx,cy,angle_init,angle_end,Num_ofpoints=100){

       let x_dot = [];
       let y_dot = [];

       
         let diff = Math.abs(angle_end-angle_init);

         diff = diff <= Math.PI ? diff : 2*Math.PI - diff

         let delt_angle= diff/Num_ofpoints;

         let init,end;

         var check = (angle_init + diff) < 2*Math.PI ? angle_init+diff : (angle_init+diff - 2*Math.PI);

         init = Math.abs(check-angle_end)>0.0001 ?  angle_end : angle_init
         end  = Math.abs(check-angle_end)>0.0001 ?  angle_init : angle_end


        for(var i=0;i<= Num_ofpoints ;i++){

            var angle_cir = i === Num_ofpoints ? end : init+i*delt_angle;

            x_dot.push(r*Math.cos(angle_cir)+cx) ;
            y_dot.push(r*Math.sin(angle_cir)+cy) ;
        }

       return {x:x_dot, y:y_dot}
}

function Plot_Circular_Superficie(Superficie,Num_ofpoints=100){


    if(Superficie.r===Infinity){

        let x=Superficie.x;
        let y=Superficie.y;
        let l=Superficie.l;
        let m=Superficie.m;

       let delt_x = m===Infinity? 0: (l/2)*Math.sqrt(1/(Math.pow(m,2)+1));
       let delt_y = m===Infinity? l/2: m*(l/2)*Math.sqrt(1/(Math.pow(m,2)+1));

       return {x:[x-delt_x,x+delt_x], y:[y-delt_y,y+delt_y]} 

    }
    else{

        let Angles = Conversor_from_L_to_angle(Superficie);
        let center = Convert_Center_Mirror_to_Center_Circle(Superficie);
        
       
        let point=Circunference(Superficie.r , center.x,center.y, Angles.init,Angles.end, Num_ofpoints);
        
        return {x: point.x, y:point.y}
    }

}

function Plot_Multiply(dvc,Num_ofpoints=100){


    var points_X= new Array();
    var points_Y= new Array();

    for(var i=1;i < dvc.length ;i++){

        var  Superficie=dvc[i];
        var Point_superficie = Plot_Circular_Superficie(Superficie,Num_ofpoints);

     
        if(i===1){
            points_X=points_X.concat(Point_superficie.x);
            points_Y=points_Y.concat(Point_superficie.y);
        }
        else{
            var last_x = points_X[points_X.length-1];
            var last_y = points_Y[points_Y.length-1];

            distA=Distance({x:last_x, y:last_y},{x:Point_superficie.x[0], y:Point_superficie.y[0]});
            distB=Distance({x:last_x, y:last_y},{x:Point_superficie.x[Num_ofpoints], y:Point_superficie.y[Num_ofpoints]});

            if(distA > distB){
       
                points_X=points_X.concat(Point_superficie.x.reverse());
                points_Y=points_Y.concat(Point_superficie.y.reverse());
            }
            else{
                points_X=points_X.concat(Point_superficie.x);
                points_Y=points_Y.concat(Point_superficie.y);
            }
           
        }

    }
    return {x:points_X, y:points_Y}
}


module.exports = {
    Plot_Circular_Superficie: Plot_Circular_Superficie,
    Plot_Multiply:Plot_Multiply
}