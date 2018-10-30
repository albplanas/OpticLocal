import * as actionTypes from '../actions';

const  Model={
    title:"New Project",
    description:"Describe your project here",

    sources:[ ],
    devices:[ ],

    layout:{
        width: 550,
        height: 550, 
        title: 'New title',
        xaxis: {
          range: [-50,50],
          autorange: false
        },
        yaxis: {
          range: [-50,50],
          autorange: false
        },
        dragmode: 'pan',
        
  },
      config:{
        scrollZoom: true,
        editable: true,
        displayModeBar: false,
        displaylogo: false,
        modeBarButtonsToRemove: ["sendDataToCloud","autoScale2d","hoverCompareCartesian","zoom2d"]
      }
}



const initialState = {
    change:false,
    Datachange:false,
    select: 0,
   
    Workpaper:[
        Model
    ]
}


const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ADDFUNCTION:

                    var Wp = state.Workpaper;

                     if(action.properties.fn==="haz"){
                        Wp[state.select].sources =  Wp[state.select].sources .concat(action.properties);
                     }
                     else{
                        Wp[state.select].devices  =  Wp[state.select].devices .concat(action.properties);
                     }
                     return {
                        ...state,
                        Workpaper:Wp,
                        Datachange:true
                    } 


        case actionTypes.DELETEFUNCTION:

                    var Wp = state.Workpaper;
                    Wp[state.select].sources =  Wp[state.select].sources.filter( src =>  src.id.toString() !== action.id.toString());

                    Wp[state.select].devices =  Wp[state.select].devices.filter( src =>  src.id.toString() !== action.id.toString());

                    return {
                                            ...state,
                                            Workpaper: Wp,
                                            Datachange:true
                                        }
                    
        
        case actionTypes.EDITFUNCTION:
                       
                    var Wp = state.Workpaper;
                                        
                    Wp[state.select].sources = Wp[state.select].sources.map(elem => {
                                           
                                            return elem.id.toString()===action.id.toString()? action.properties :elem
                                        } );
          
                    Wp[state.select].devices = Wp[state.select].devices.map(elem => {
                                           
                                            return elem.id.toString()===action.id.toString()? action.properties :elem
                                        } );
                                      
                    return {
                                            ...state,
                                            Workpaper: Wp,
                                            Datachange:true
                                        }                                   


        case actionTypes.PAPERS:
                                                        
                            return {
                                ...state,
                                Workpaper:action.papers.length > 0 ? action.papers: state.Workpaper ,
                                change:true,
                                Datachange:true
                                
                            } 
                            
        case actionTypes.PAPERSCHANGE:
                                                        
                            return {
                                ...state,
                                change : action.val
                            }  

        case actionTypes.NEWTITLE:
        
                               
                                var l = state.Workpaper.length

                                return {
                                    ...state,
                                    Workpaper :state.Workpaper.concat( Model),
                                    select:l,
                                    change:true,
                                    Datachange:true

                                } 
       case actionTypes.EDITTILE:

    
                                    return {
                                        ...state,
                                        Workpaper : action.workpaper,
                                        change : true,
                                    }  
                                    
       case actionTypes.OPENPROJECT:
                                    
                                    return{
                                        ...state,
                                        select:action.val,
                                        change : true
                                    }    
       
      case actionTypes.DELETEPROJECT:
           console.log("Delete",action)
                        return {
                            ...state,
                            change : true,
                            Datachange:true,
                            select:     action.Wp.length > 0 ? action.value :0,
                            Workpaper: action.Wp.length > 0 ? action.Wp :[Model]
                        }  
            
                 

       case actionTypes.CLEANDATA:

                                    return {
                                        ...state,
                                        change : true,
                                        Datachange:true,
                                        select: 0,
                                        Workpaper:[Model]
                                    }                              
                                    
    }
    return state;
};

export default reducer;






