import axios from  "@/utils/axios"
import {SEARCH} from "@/scripts/reducers/alias"
import $ from  "@/utils/jq"

export const searchList = (keyword,p=1,n=100)=>{
    return (dispatch)=>{
    const url = `/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=54453227511471822&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&g_tk=1695008182&loginUin=983915916&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&w=${keyword}&p=${p}&n=${n}`;
    return $.ajax({
          crossDomain: true,
          type:"GET",
          jsonp: "jsonpCallback",
          url,
          dataType: "jsonp", 
          jsonpCallback:"MusicJsonCallback738146078219388",
          success(result){
              return dispatch({
                type:SEARCH,
                result
            })
          }
      })
    }
  }

// export const singerList = (keyword,p=1,n=100)=>{
//     const url = `/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=54453227511471822&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&g_tk=1695008182&loginUin=983915916&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&w=${keyword}&p=${p}&n=${n}`;
//     return $.ajax({
//           crossDomain: true,
//           type:"GET",
//           jsonp: "jsonpCallback",
//           url,
//           dataType: "jsonp", 
//           jsonpCallback:"MusicJsonCallback738146078219388",
//           success(result){
//               return {
//                   type:SEARCH,
//                   result
//               }
//           },
//           error(err){
//               console.log(err)
//           }
//       })
//   }

