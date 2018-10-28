import * as actionTypes from '../actions';

const initialState = {
    change :false,
    login:false,
    src:"",
    username:"",
    email:"",
    status:"",
    location:""
}

const reducer = (state = initialState, action) => {
    switch(action.type){

           case actionTypes.LOGIN:
                                    
                                      return {
                                          ...state,
                                          login: action.value,
                                          username   : action.profile.username,
                                          src        : action.profile.src,
                                          email      : action.profile.email,
                                          status     : action.profile.status,
                                          location   : action.profile.location
                                       }  
            case actionTypes.EDITPROFILE:
                                    
                                       return {
                                           ...state,
                                           change:true,

                                            username   : action.profile.username,
                                            src        : action.profile.src,
                                            email      : action.profile.email,
                                            status     : action.profile.status,
                                            location   : action.profile.location
                                        }  

            case actionTypes.CHANGEPROFILE:
                                    
                                        return {
                                            ...state,
                                            change:action.value
                                         }                                                                                 
    }
    return state;
};

export default reducer;