import React, { Component } from 'react'
import {NavBar,Icon} from 'antd-mobile'
import { connect } from 'react-redux'
import $ from '@/utils/jq'
import history from '@/utils/history'
import Pubsub from 'pubsub-js'
export class Header extends Component {

componentDidMount(){
console.log("header")
Pubsub.publish("Routeback",location.href.split("#/app/")[1])
$(".am-navbar").css({"height":"50px"})
$(".am-search").css({"height":"50px"})
}
  render() {
    let {show,title} = this.props;
    console.log(history)
    return (
      <div className="header" style={{background:"#222",color:"#ffcd32"}}>
             <NavBar
                style={{background:"#222",color:"#ffcd32"}}
                // mode="light"
                icon={show&&<Icon type="left" />}
                onLeftClick={() =>show&&history.goBack()}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
    >{title}</NavBar>
      </div>
    )
  }
}




