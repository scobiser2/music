import React, { Component } from 'react'
// import Swipe from './swipe'
// import "./index.scss"
import $ from '@/utils/jq'
import  {Link,NavLink} from "react-router-dom"
import axios from "@/utils/axios"
import { Carousel, WingBlank } from 'antd-mobile';
export class AliBanner extends React.Component {
  state = {
    data: []
  }

  componentWillMount(){
    var _this = this;
    // const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
    const url = "/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
    const params = {
        "g_tk":332325853,
        "uin":1042412192,
        "format":"jsonp",
        "inCharset":"utf-8",
        "outCharset":"utf-8",
        "contentType":"text/html;charset=utf-8",
        "notice":0,
        "platform":"h5",
        "needNewCode":"1",
        "_":new Date().getTime(),
      }
      
    $.ajax({
        crossDomain: true,
        type:"GET",
        jsonp: "callback",
        url,
        data:params,
        dataType: "json", 
        jsonpCallback:"success_jsonpCallback",
        success: function(res){
      
          _this.setState({data:res.data.slider});
        }
    });
}
componentDidMount(){
  $(".am-carousel").css({fontSize:0})
}
  render() {
    let {data}= this.state;
    return (

      // <WingBlank>
        <Carousel
          autoplay
          infinite
          lazyLoad
          style={{background:"#222"}}
          // beforeChange={
          //   (from, to) => console.log(`slide from ${from} to ${to}`)
          // }
          // afterChange={index => console.log('slide to', index)}
        >
          {
            data&&data.map((item,i) => {
              return(
                <Link to=""
                key={i}
                // href={item.linkUrl}
                style={{ display: 'inline-block', width: '100%', height: 160 }}
              >
                <img
                  src={item.picUrl}
                  className="bannerImg"
                  alt=""
                  style={{ width: '100%',height:160, verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </Link>
              )
            }
          )}
        </Carousel>
      // </WingBlank>
    );
  }
}

