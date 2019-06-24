import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from '@/utils/jq'
import './index.scss'
import  {Link,NavLink} from "react-router-dom"
export class RecommendList extends Component {
    state={
        songList:[]
    }
    componentWillMount() {
        let _this =this;
            //  const url= https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1553131216063&g_tk=332325853&uin=1042412192&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1
              const url = "/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
              const params = {
                  g_tk:332325853,
                  uin:1042412192,
                  format:"jsonp",
                  inCharset:"utf-8",
                  outCharset:"utf-8",
                  notice:0,
                  platform:"h5",
                  needNewCode:"1",
                  _:new Date().getTime()
                }
                //assign合并对象
                $.ajax({
                    crossDomain: true,
                    type:"GET",
                    jsonp: "callback",
                    url,
                    data:params,
                    dataType: "json", 
                    jsonpCallback:"success_jsonpCallback",
                    success: function(res){
                    _this.setState({songList:res.data.songList});
                        console.log(res.data.songList)
                    }})
          
    }
    
    render() {
        let {songList} = this.state;
        return (
            <div style={{marginTop:"210px"}}>
                <ul >
                    {
                        songList&&songList.map((item,i)=>{
                           return( 
                            <NavLink key={i} to={`/songList/id=${item.id}`}>
                           <li className="songListLi" >
                            <div><img className="rec_img" src={item.picUrl} alt=""/></div>
                            <div className="recBox">
                                <p className="rec_auth">{item.songListAuthor}</p>
                                <p className="rec_desc">{item.songListDesc}</p>
                            </div>
                           </li>
                           </NavLink>)
                        })
                    }
                   
                </ul>

                </div>
        )
    }
}


