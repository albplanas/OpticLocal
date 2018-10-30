var {Interacction_by_Reflexion,Interacction_by_Refraction} = require('./Interaction')
var { Distance} = require('./func');
var {Segment_intercept, Arc_intercept} =require("./Intercepts")


/*************************************************************
 * Those functions I'm using for standaring the entries values
 * *************************************************************/


//Auxiliars functions
function ToNumeber(obj){
    var transf=[];
   for (var prop in obj) {
     if(prop==='fn' || prop==="name"){transf[prop]=obj[prop]; continue;}  
     if(obj[prop]==="inf"){transf[prop]=Infinity}
    else if(prop==="sence" || prop==="sence_back" || prop==="sence_front" ){transf[prop]=obj[prop][0]}
    else transf[prop]=parseFloat(obj[prop]);
  }

    return transf
}


function ToObject(device){


//usefull function  
    function Superfice(x,y,s,r,long,Phy){

          return {
            x:x-0,
            y:y-0,
            m: s==="inf" ? Infinity : s-0,
            r: r === "inf"? Infinity : Math.abs(r-0),
            sence: r<0 ? "-":"+",
            l:long-0,
            Physcis :[Phy]
        }      

    }

    var arr=[{
        fn:device.fn,
        id:device.id,
        indexRefraction:"none"
    }];

     if(device.fn==="mirror")  {  
         arr=arr.concat(Superfice(device.x_origen,device.y_origen,device.slope,device.radius,device.longitud,"Reflexion")) 
        }     

     if(device.fn==="len")  {
        arr=arr.concat(Superfice(device.x_origen,device.y_origen,device.slope,device.radius_front,device.longitud,"Refraction")) ;     
        arr=arr.concat(Superfice(device.x_origen,device.y_origen,device.slope,device.radius_back ,device.longitud,"Refraction")) ;
        arr[0].indexRefraction = device.indexRefraction;
        } 

    return arr
}


//Calculate intercept
function Calculate_Intercept(haz,dvc,num_gen){

    var Global_Intercept={x:undefined, y:undefined};

    var min=1000000,tracker = {dvc:undefined, superf:undefined};

     if( haz.gen >= num_gen) return {Intercept:Global_Intercept, track : tracker}




    for(var i=0;i < dvc.length;i++){
        
                var elem =dvc[i] ;
                
                var Intercept = elem.map((Superf,i)=>{
                    if(i===0){return {x:undefined,y:undefined}}
                    else{

                        return Superf.r === Infinity ?  Segment_intercept(haz,Superf) : Arc_intercept(haz,Superf)
                    }
                })



            for(var j=0;j<Intercept.length;j++){

                var distance = Intercept[j].x === undefined ? 1000001 : Distance(Intercept[j],{x:haz.x_origen, y:haz.y_origen});
                Global_Intercept = distance < min ? Intercept[j] :Global_Intercept;
                tracker = distance < min ? {dvc:i, superf:j} :tracker;
                min = distance < min ? distance : min;
            }


    }
    
    return {Intercept:Global_Intercept, track : tracker}

}


//Calcular Phiscical interacction
function Calcule_Haz_interaction(haz,dvc){
      

       var num_gen=5  // generation Max number 

       var ray=ToNumeber(haz); //Standaring the entrie values

       var Trackers = Calculate_Intercept(ray,dvc,num_gen);
        
       var All_children =[]


       var kids=[];
       
       if( Trackers.track.dvc !==undefined ){
        
                var type=dvc[Trackers.track.dvc][Trackers.track.superf].Physcis[0];

                var Intercept_dvc= Trackers.Intercept;
                var dvc_select = dvc[Trackers.track.dvc];
                var Superf_select= Trackers.track.superf;

               

              if( type=== "Reflexion") {
                    
                   kids = Interacction_by_Reflexion(ray, dvc_select, Intercept_dvc, Superf_select) ;  

                }
               else if( type  === "Refraction")  { 
                  
                   kids = Interacction_by_Refraction(ray, dvc_select, Intercept_dvc, Superf_select) ;

                }  
        }

   

                 if(   kids.length === 0  ) {return  []} 
                 else {
                    
                    All_children= All_children.concat(kids);
                    
                    for(var i=0;i<kids.length;i++){
                            
                            All_children=All_children.concat(Calcule_Haz_interaction(kids[i],dvc))

                        }

                    return All_children

                 }
                                              
                                             
                    


}





/**************Mean Function********************* */
 function Calculate_interaction(src,dvc){

    //Standard the entrie values
  let devices = dvc.map(elem => ToObject(elem));

  var container= src.map( source => Calcule_Haz_interaction(source,devices) );

  return container
}


 module.exports = {
    Calculate_interaction:Calculate_interaction,
    ToNumeber : ToNumeber,
    ToObject : ToObject
}
