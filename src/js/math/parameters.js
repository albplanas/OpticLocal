var { Find_Extreme_point, Vector} = require('./func')
var {ToNumeber, ToObject} = require('./calculus')
var { Plot_Multiply} =require("./Data_plot");





/*****************************
            KIDS
 ********************************/

function Configuration_kids(kids){
 
  var General=  kids.map( elem =>{

           
          
            var array= elem.map((ray_parent)=>{
                
                var  extreme = Find_Extreme_point( elem, ray_parent.id);
            
                var vector = Vector(ray_parent.x_origen, ray_parent.y_origen, extreme.x, extreme.y, ray_parent.slope , ray_parent.sence)
        
            return { x :[ray_parent.x_origen,vector[0]] , y : [ray_parent.y_origen,vector[1]],showlegend:false , mode: 'lines', marker: { size: "2"}}
            
            });

            return array;
})
    
  
    var merged = [].concat.apply([], General);
    return merged
   
}

/*****************************
            Sources
 ********************************/

function Configuration_src(src,kids){
    
    var array=src.map((source,i)=>{
        
        switch(source.fn){

            case "haz":
                    var haz=ToNumeber(source)
                    
                    var  extreme = Find_Extreme_point( kids[i], haz.id);
                   
                    var vector = Vector(haz.x_origen, haz.y_origen, extreme.x, extreme.y, haz.slope , haz.sence)
                
                    
                   return { x:[haz.x_origen,vector[0]] , y: [haz.y_origen,vector[1]], mode: 'lines',name:haz.name, marker: {color: 'rgb(255,0,0)', size: 4} }

    }
    return {};
    });
   
   return array;
}

/*****************************
            Devices
 ********************************/


function Configuration_dvc(dvc){

    var array=dvc.map((device)=>{

        device_select=ToObject(device);
   
        if(device_select.length<3){
            let Point_plot=Plot_Multiply(device_select,20)
            return {x: Point_plot.x, y:Point_plot.y,name:device.name, mode: 'lines',marker: {color: 'green'} }
        }
        else{
            let Point_plot=Plot_Multiply(device_select,20)
            return {x: Point_plot.x, y:Point_plot.y,fill: "toself",name:device.name, mode: 'lines',marker: {color: 'blue'} }
        }


    });

   return array;
}

/*************************** 
       MAIN FUNCTION
*****************************/

function Parameters(src,dvc,kids){


    var result_func=[];

     var C_Kids = kids===[] ? [] : Configuration_kids(kids);
     var C_Src = src===[] ? [] : Configuration_src(src,kids);
     var C_Dvc = dvc===[] ? [] : Configuration_dvc(dvc);

     

     for(var i=0; i<C_Kids.length;i++){ result_func=result_func.concat(C_Kids[i])}
     for(var i=0; i<C_Src.length;i++){ result_func=result_func.concat(C_Src[i])}
     for(var i=0; i<C_Dvc.length;i++){ result_func=result_func.concat(C_Dvc[i])}
    
    

    return result_func;
}

module.exports = {
    Parameters:Parameters
}
