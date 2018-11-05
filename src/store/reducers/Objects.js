

const initialState = {

    prototypes:[
        //Sources
            //A Single Ray
           {
            fn:"haz",
            name:"unnamed Ray",
            indexRefraction:1,
            x_origen:0,
            y_origen:0,
            slope:1,
            sence:'+',
            gen:0,
            id:Date.now()
             
           },
           //Cone of light
           {
            fn:"coneLight",
            name:"unnamed Cone",
            indexRefraction:1,
            x_origen:0,
            y_origen:0,
            number:5,
            start:0,
            end:45,
            gen:0,
            id:Date.now()
             
           },
           //Strip of light
           {
            fn:"stripRay",
            name:"unnamed Strip",
            indexRefraction:1,
            x_origen:0,
            y_origen:0,
            number:6,
            longitud:2,
            slope:0,
            sence:"+",
            gen:0,
            id:Date.now()
             
           },
           
           
           
    //Devices
            //Mirror
            {
            fn:"mirror", 
            name:"unname Mirror",
            x_origen:'10',
            y_origen:'0',
            slope:'inf',
            radius:"10",
            longitud:"5",
            id:Date.now()
             },
    //Lens
             {
                fn:"len",
                name:"unnamed Len",
                indexRefraction:1.66, 
                x_origen:'5',
                y_origen:'0',
                slope:'inf',
                radius_front:"-10",
                radius_back:"10",
                longitud:"10",
                id:Date.now()
                 },
    //Diaphragms             
                 {
                    fn:"diaphragm",
                    name:"unnamed Diaphragm",
                    x_origen:'5',
                    y_origen:'0',
                    slope:'inf',
                    radius:"10",
                    longitud:"10",
                    id:Date.now()
                 }


    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
                      
    }
    return state;
};

export default reducer;