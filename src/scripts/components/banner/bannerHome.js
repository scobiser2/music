import React, { Component } from 'react'
import Swipe from './swipe'
// import "./index.scss"
import axios from "@/utils/axios"
import Swiper from "swiper"
let SwipeItem = Swipe.item;
export  class BannerHome extends Component {
    constructor(props){
        super(props)
        this.state={
            arr:[]
        }
    }
componentWillMount(){
        console.log("BannerHome---will mount  start")
                axios.get("/vue/movie",{
                    params:{
                        limit:4
                    }
                }).then(res=>{
                    setTimeout(()=>{
                        this.setState({arr:res.data.result});
                        console.log(this.state.arr)
                    },0)
                    
                })
                console.log("BannerHome---componentWillMount  end")
            }

            componentDidUpdate(){
                new Swiper("#sss",{loop:true,speed:1000,autoplay:true})
                console.log("Ok")
            }

  render() {
      let {arr} = this.state;
        return(
            <div className="swiper-container" id="sss">
                <div className="swiper-wrapper">
                    {
                        (arr.length>0)&&arr.map((item,i)=>
                            <div key={i} className="swiper-slide">
                                <img src={item.img} alt=""/>
                            </div>
                        )
                    }
                </div>
            </div>
        )
  }
}
