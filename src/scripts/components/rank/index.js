import React, { Component } from 'react'
import  {Link,NavLink} from "react-router-dom"
export class RankList extends Component {
    constructor(props){
        super(props)
        this.state={
            rankList:[]
        }
    }
    
componentWillMount() {
    let _this = this;
    let count = 0;
    const url = '/v8/fcg-bin/fcg_myqq_toplist.fcg';
        const data = {
        format: 'jsonp',
        g_tk: 5381,
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
    }

    $.ajax({
        crossDomain: true,
        type:"GET",
        url,
        jsonpCallback:'MusicJsonCallback',
        jsonp:"jsonpCallback",
        dataType:"jsonp",
        data,
        success: function(res){
            //res.data.topList    array
            _this.setState({rankList:res.data.topList})
        },error(err){
            console.log(err)
        }})
}


  render() {
      let {rankList} = this.state;
      console.log("rener,",rankList);
    return (
      <div style={{overflow:"auto"}} >
          <ul style={{position:"fixed",fontSize:"30px"}}>
              {
                  rankList&&rankList.map((item,i)=>{
                      return(
                        <NavLink key={i} to={``}>
                          <div>
                              <div>
                                  <img src="" alt=""/>
                              </div>
                              <div>
                                 {
                                     item.songList.map((item,i)=>{
                                         return <p key={i}><span>{item.songname}</span><span>{item.singername}</span></p>
                                     })
                                 }
                              </div>
                          </div>
                          </NavLink >
                      )
                  })
              }
          </ul>
      </div>
    )
  }
}

// export function getRankList(){
//     const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
//     const params = {
//         format: 'jsonp',
//         g_tk: 5381,
//         uin: 0,
//         inCharset: 'utf-8',
//         outCharset: 'utf-8',
//         notice: 0,
//         platform: 'h5',
//         needNewCode: 1,
//         _: new Date().getTime()
//     }
//     const data = Object.assign(params,{
//         jsonpCallback:'MusicJsonCallback',
//         jsonp:"jsonpCallback"
//     })
//     return Vue.http.jsonp(url,data).then((res) => {
//         return Promise.resolve(res.data)
//     })
//   }