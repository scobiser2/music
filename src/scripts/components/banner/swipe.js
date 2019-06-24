import React, { Component } from 'react'
import Swiper from 'swiper'
var count = 0;
export default class Swipe extends Component {
    constructor(props){
        super(props)
    }
   
    componentDidMount(){

    }
    componentWillMount(){
        // console.log("swipe组件--componentWillReceiveProps------0",this.props)
        // let {id,options} = this.props;
        // console.log(id,options)
        // const swiper1 = new Swiper("#"+id,options);
    }
    // componentWillReceiveProps(nextProps){
    //     这个只能搞静态数据   因为数据已经OK的，没有请求过程，全部是同步的
    //     console.log("swipe组件--componentWillReceiveProps------0",nextProps)
    //     let {id,options} = nextProps;
    //     console.log(id,options)
    //     const swiper1 = new Swiper("#"+id,options);
    // }
    componentDidUpdate(){
        console.log(`swipe组件--componentDidUpdate------${count++}`,this.props)
        let {id,options} = this.props;
        console.log(id,options)
        const swiper2 = new Swiper("#"+id,options);
    }
  render() {
    console.log("swipe组件--render------1")
    const {
        id,
        children
    } =this.props;
    console.log("swipe组件----this.props------------2",this.props)
    var col = children&&children.map((child,index)=>{
            return ( child )
        })
    console.log("swipe组件---------col-----------",col)
    return (
        // <div className="swiper-container" id={id}>
        // <div className="swiper-wrapper">
      <div>
          <div className="swiper-container" id={id}>
              <div className="swiper-wrapper">
                   {col}
              </div>
          </div>
      </div>
    )
  }
}


Swipe.item  =  (props)=>{
    console.log("swiper-item",props);  // this.props; 
    return (
        <div className="swiper-slide">
            {props.children}
        </div>
    )
}   
// Swipe.item  =  (props)=>{
//     console.log(props);  // this.props; 
//     return (
//         <div className="swiper-slide">
//             {props.children}
//         </div>
//     )
// } 

//   conteiner
//          wrapper
//                  slide就是Item