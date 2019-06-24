// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State


import { combineReducers } from 'redux';   // 合并
import search from "./search";
export const reducers = combineReducers({
    searchList:search,
    //reactMsg  是一个函数   初始返回一个defaultvalue
    //左边的值是需要解构的值
    //右边都是函数组件
})















// 定义默认的组件的状态 
// const defaultState = {
//     count:1901,
//     city:"大武汉",
//     msg:"daydayup~",
//     data:{

//     },
//     word:"Are you ok "
// }

// // uesd by createStore 
// export const reducers =  (state=defaultState,action)=>{
//     console.log(action);  // type 
    
//     switch(action.type){

//         case "COUNTADD":
//         state.count  = state.count + 1;
//         console.log(state);
//         return state;
//         break;

//         case COUNTDESC:
//         state.count--;
//         return state;
//         break;

//         case INCREMENT:
//         return {...state,...{count:state.count+action.num} }
//         break;

//         case DECREMENT:
//         return {...state,...{count:state.count-action.num} }
//         break;

//         case CHANGECITY:
//         return {...state, city:action.city }
//         break;

//         case CHANGEMSG:
//         return {...state, msg:action.msg }
//         break;

//         case CHANGEWORD:
//         return {...state, word:action.word }
//         break;


//         default:
//         return state;
//         break;
//     }
// }