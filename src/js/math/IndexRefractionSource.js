
const { Segment_intercept,Arc_intercept}  = require('./Intercepts');
const { ToObject}                 = require('./calculus');


function Selector(ray,devices,IndexGlobalEnv=1){

     var hazQ=Object.assign({},{
         x_origen:ray.x_origen,
         y_origen:ray.y_origen,
         slope:0,
         sence:"+"
     })

    
    var index =IndexGlobalEnv;
    
    

        for(var k=0;k<devices.length;k++){

                    var cont=0;

                    if(devices[k].length<3){continue;}

                    else{
                        
                        for(var i=1;i<devices[k].length;i++){

                            var Superf = Object.assign({}, devices[k][i])
                            var Intercept = Superf.r === Infinity ?  Segment_intercept(hazQ,Superf) : Arc_intercept(hazQ,Superf)
                        
                          
                            cont = Intercept.x===undefined ? cont%2 : (cont +1)%2;
                        }
                       
                        index =   cont%2  === 1  ? devices[k][0].indexRefraction-0  : index-0;
                        
                    }
                    
                    

        }

     
 

    return index 

}

function IndexCorrection(src,dvc){
    var NewSrc=src 
    let devices = dvc.map(elem => ToObject(elem));
    for(var i in src){
        NewSrc[i].indexRefraction= Selector(src[i],devices) 
    }
    
    return NewSrc
}
    
module.exports = {
    IndexCorrection   : IndexCorrection,
    Selector: Selector
}