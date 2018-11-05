var {Reflection,Refraction} = require('./laws');
var {  Convert_Center_Mirror_to_Center_Circle, Slope_in_the_Circle } = require('./func');



/*********************************************** *
                   Interaction Functions
*********************************************** 
1-I don't care the sense of the mirror, just i want the sense of the ray (so far) 
************************************************/

function Interacction_by_Reflexion(haz,dvc,Intercept,superf){

       
        var mirror=dvc[superf];

       
        var center = Convert_Center_Mirror_to_Center_Circle(mirror);
                
        ms= mirror.r===Infinity? mirror.m: Slope_in_the_Circle(Intercept,  { x:center.x, y:center.y, r:mirror.r} )
        
        return Intercept.x===undefined? []: [{
                                            x_origen:Intercept.x,
                                            y_origen:Intercept.y,
                                            name:"child"+haz.id,
                                            indexRefraction:haz.indexRefraction,
                                            slope:Reflection(haz.slope,haz.sence,ms).slope,
                                            sence:Reflection(haz.slope,haz.sence,ms).sence,
                                            gen:haz.gen+1,
                                            id:Date.now(),
                                            id_parent:haz.id
                                    }]
}

function Interacction_by_Refraction (haz,dvc,Intercept,superf){
        
    var len_index = dvc[0].indexRefraction-0 ;
    

    var len=dvc[superf];

   
    //belong to a superficie
    var center = Convert_Center_Mirror_to_Center_Circle(len);
        
    var ms = len.r === Infinity ? len.m: Slope_in_the_Circle( Intercept,  { x:center.x, y:center.y, r:len.r} )   
   
       
   
   var envairoment=1.0;

  var n1=haz.indexRefraction-0;
  var n2= n1===len_index? envairoment : len_index;

  

   result= Intercept.x===undefined? []: [{
                                                x_origen:Intercept.x,
                                                y_origen:Intercept.y,
                                                name:"child"+haz.id,
                                                indexRefraction:n2,
                                                slope:Refraction(haz.slope,haz.sence,ms,n1,n2).slope,
                                                sence:Refraction(haz.slope,haz.sence,ms,n1,n2).sence,
                                                gen:haz.gen+1,
                                                id:Date.now()/(haz.gen+1+Math.random()*100),
                                                id_parent:haz.id
                                        }]

     return result
    
}
function Interacction_by_Absorption (haz,dvc,Intercept,superf){
        
   return [{
                x_origen:Intercept.x,
                y_origen:Intercept.y,
                name:'Absorption',
                indexRefraction:undefined,
                slope:undefined,
                sence:undefined,
                gen:haz.gen+1,
                id:Date.now()/(haz.gen+1+Math.random()*100),
                id_parent:haz.id
   }];
    
}
module.exports = {
    Interacction_by_Reflexion : Interacction_by_Reflexion,
    Interacction_by_Refraction : Interacction_by_Refraction ,
    Interacction_by_Absorption : Interacction_by_Absorption
}