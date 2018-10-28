import * as actionTypes from '../actions';

const initialState = {

    prototypes:[
           {
            fn:"haz",
            name:"ray",
            indexRefraction:1,
            x_origen:1,
            y_origen:1,
            slope:0.5,
            sence:'+',
            gen:0,
            id:1
             
           }, {
            fn:"mirror", 
            name:"mirror",
            x_origen:'6',
            y_origen:'4',
            slope:'0.1',
            radius:"10",
            longitud:"10",
            id:2
             },{
                fn:"len",
                indexRefraction:1.66, 
                name:"len",
                x_origen:'10',
                y_origen:'0',
                slope:'1',
                radius_front:"10",
                radius_back:"10",
                longitud:"10",
                id:5
                 }

    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
                      
    }
    return state;
};

export default reducer;