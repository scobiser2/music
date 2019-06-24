import  {SEARCH}  from "./alias"
const defaultState = {
    inputValue:"许嵩",
    pageSize:1,
    pageNum:30,
    searchList:[]
}
export default (state=defaultState,action)=>{
    console.log(action)
    switch(action.type){
        case "search":
        console.log("------SEARCH------",action)
        return state ;
        break;
    
        default:
            console.log("------------default--------------------")
        return state;
        break;
    }
}