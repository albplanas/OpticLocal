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
    EditChange:false,
    ProfileChange:false,

    select: 0,
   
    Workpaper:[
        Model
    ]
}


const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ADDFUNCTION:

   
                   
                 return {
                                    ...state,
                                    Workpaper:action.Wp,
                                    Datachange:true,
                                    change:true,
                                    EditChange:true
                                } 

        case actionTypes.UPDATEDATE:


                     return  {
                                    ...state,
                                    Datachange:false,
                                    change:false,
                                    EditChange:false
                                }



        case actionTypes.DELETEFUNCTION:

                   

                    return {
                                            ...state,
                                            Workpaper: action.Wp,
                                            Datachange:true,
                                            change:true,
                                            EditChange:true
                                        }
                    
        
        case actionTypes.EDITFUNCTION:
                                        
  
                    
                    return {
                                            ...state,
                                            Workpaper: action.Wp,
                                            Datachange:true,
                                            change:true,
                                            EditChange:true
                                        }                                   


        case actionTypes.PAPERS:
                             console.log(action.papers)                           
                            return {
                                ...state,
                                Workpaper:action.papers.length > 0 ? action.papers: state.Workpaper ,
                                change:true,
                                Datachange:true,
                                ProfileChange:true
                                
                            } 
                            
        case actionTypes.PAPERSCHANGE:
                                                        
                            return {
                                ...state,
                                change : action.val,
                                ProfileChange:false
                            }  

        case actionTypes.NEWTITLE:
        
                               var Update = state.Workpaper.map((elem)=>elem).concat(Model)
                                
                              
                                return {
                                    ...state,
                                    Workpaper :     Update,
                                    select:         Update.length-1,
                                    change:         true,
                                    Datachange:     true

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
           
                        return {
                            ...state,
                            change : true,
                            Datachange:true,
                            ProfileChange:true,
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






