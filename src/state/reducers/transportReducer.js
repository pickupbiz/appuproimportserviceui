const initialState = {
    byweight:{},
    bycbm:{},
}

const transportReducer = (state=initialState, action)=>{
    switch(action.type){
        case "BY_WEIGTH" :
            return{
                ...state,
                byweight : action.payload
            }            
        case "BY_CBM" :
            return{
                ...state,
                bycbm : action.payload
            }      
        
            default:
                return state;
    }
}

export default transportReducer;