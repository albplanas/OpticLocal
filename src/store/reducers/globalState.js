import * as actionTypes from '../actions';

const initialState = {

    Changed:false,
    open_menu:true,
    door:"door1"
}

const reducer = (state = initialState, action) => {
    switch(action.type){


            case actionTypes.MAINMENU:

                    return {
                        ...state,
                        open_menu: state.open_menu===false?true:false 
                    } 

            case actionTypes.SELECTMENU:

                    return {
                        ...state,
                            door: action.door
                    }


           case actionTypes.CHANGED:

                     return {
                                         ...state,
                                         Changed: action.value
                                      } 
           case actionTypes.LOGINLINKS:
                                      return {
                                          ...state,
                                         door:"door"+action.value 
                                       }                                                   
    }
    return state;
};

export default reducer;