const { ReScale}  = require('./func');
const {Selector}  = require("./IndexRefractionSource")

//Useful function to calculate a sence
function SegmentSolution(x,y,m,r){
     console.log(x,y,m,r)
    if(r===0){
        return [{x:x,y:y}]
    }
    else{
        var deltX = m===Infinity ? 0 :  Math.sqrt(r*r/(1+m*m)) ;
        var deltY = m===Infinity ? r : m* Math.sqrt(r*r/(1+m*m)) ;

        return [{x:x+deltX, y:y+deltY},{x:x-deltX, y:y-deltY}]
    }
}


function Sence(angle){
        
    angle = ReScale(angle);
    return (angle >270 || angle <=90) ? "+" : "-" ;

}


function Slope(m,mode){

    if(mode=="angle"){
        angle = ReScale(m);
       console.log(angle)
        return Math.tan(angle*2*Math.PI/360)
    }
    else if(mode==="perpendicular"){

        if(m===Infinity || m==="inf"){
            return 0
        }
        else if (m===0){
            return Infinity
        }
        else{
            return -1/m;
        }
    }
   
}

//Conic Source

            function Cone(elem){

                            const n                 =elem.number-0;
                            var arrayRay            =[];

                                //ReScale
                            var start               = ReScale(elem.start-0)-0;
                            var end                 = ReScale(elem.end-0)-0;

                            console.log(start,end)
                                

                            var delt = start > end ? (360-start)+end : end - start;

                            //case start === end

                            if(delt===0 || n==1){
                                return [{
                                            fn              :"haz",
                                            name            :"ConeRay_"+0,
                                            indexRefraction :elem.indexRefraction,
                                            x_origen        :elem.x_origen,
                                            y_origen        :elem.y_origen,
                                            slope           :Slope(start,"angle"),
                                            sence           :Sence(start),
                                            gen             :0,
                                            id              :Date.now()/(1+Math.random()*100)
                                    
                                }]
                            }
                            else if(n===0)  return [];

                            else{

                                    const deltAng = delt/(n-1);

                                

                                        for(var i=0;i<n;i++){


                                            var alpha = i!==(n-1)? ReScale(start + i*deltAng ) : end;


                                        

                                            arrayRay=arrayRay.concat( {
                                                fn              :"haz",
                                                name            :"ConeRay_"+i,
                                                indexRefraction :elem.indexRefraction,
                                                x_origen        :elem.x_origen,
                                                y_origen        :elem.y_origen,
                                                slope           :Slope(alpha,"angle"),
                                                sence           :Sence(alpha),
                                                gen             :0,
                                                id              :Date.now()/(i+1+Math.random()*100)
                                                
                                            })
                                    }

                                    return arrayRay;
                            }
                
            


            }



//Strip Source

function Strip(elem,dvc){

    const n                 =elem.number-0;
    var arrayRay            =[];

    var l = elem.longitud < 0 ? 0 : elem.longitud-0

   
    
    //case start === end

    if(l===0 || n==1){
       
        return [{
                    fn              :"haz",
                    name            :"StripRay_"+0,
                    indexRefraction :elem.indexRefraction,
                    x_origen        :elem.x_origen,
                    y_origen        :elem.y_origen,
                    slope           :elem.slope,
                    sence           :elem.sence,
                    gen             :0,
                    id              :Date.now()/(1+Math.random()*100)
            
        }]
    }
    else if(n===0)  return [];

    else{
        

        const k = (n%2)===0 ? (n/2) : ((n+1)/2);
        
        const d = l/(n-1);

       
        const x = elem.x_origen-0;
        const y = elem.y_origen-0;
        const slope = (elem.slope ===Infinity || elem.slope==="inf")? Infinity : elem.slope-0;
        var s;
        if(slope ===Infinity ){s=0;}
        else if(slope===0){s=Infinity;}
        else{s=-1/slope}
        
        

        for(var i=0;i<k;i++){

            var rat =l/2 -i*d;

            var Ptos = SegmentSolution(x,y,s,rat)
            
            for(var j=0; j<Ptos.length;j++){

                        var ind = Selector(Ptos[j],dvc) 

                        console.log(ind,Ptos[j])

                        arrayRay = arrayRay.concat({
                            fn              :"haz",
                            name            :"StripRay_"+j,
                            indexRefraction :ind,
                            x_origen        :Ptos[j].x,
                            y_origen        :Ptos[j].y,
                            slope           :elem.slope,
                            sence           :elem.sence,
                            gen             :0,
                            id              :Date.now()/(j+1+Math.random()*100)
                        }) 
            }

        }
        
       console.log(arrayRay)
return arrayRay
           
    }




}





function splitRays(src,dvc){

    var arr;
    console.log("src",src)
     arr=src.map(elem=>{
        if(elem.fn==="haz"){
            return elem;
        }
        else if(elem.fn==="coneLight"){
            return Cone(elem)
        }
        else if(elem.fn==="stripRay"){
            
           return Strip(elem,dvc)
        }
    })

    var merged = [].concat.apply([],arr);
    console.log("merged",merged)
    return merged
}

module.exports = {
    splitRays  : splitRays
}