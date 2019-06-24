import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {NavBar,Icon} from "antd-mobile"
import history from '@/utils/history'
import axios from "@/utils/axios"
import {SongListCom} from "~/list/songList"
export class SongList extends Component {
    state={
        SongList:[],
        title:'',
        bgImg:''
    }
    componentWillMount(){
    const url = "https://www.easy-mock.com/mock/5bc00da00b3a4e257d956bbc/songsList";
    axios.get(url).then((res)=>{
        // console.log(res.data.data.cdlist[0].songlist)//songList
        if(res){
            this.setState({
                title:res.data.data.cdlist[0].dissname,
                bgImg:res.data.data.cdlist[0].logo,
                SongList:this.editSongs(res.data.data.cdlist[0].songlist) 
            })
        }
        let {SongList} = this.state;
        SongList?console.log(SongList):"";
    })
    }
    editSongs(list){
        let newList = []; 
        for(var i=0;i<list.length;i++){
           var item = {
                //不全
                // 歌曲ID
                id:list[i].songid,
                //歌曲名
                name:list[i].songname,
                //专辑封面
                img:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                //歌曲时长
                interval:list[i].interval,
                //歌曲mid
                songmid:list[i].songmid,
                //歌手的姓名(数组)
                singer:list[i].singer,
                //专辑
                album:list[i].albumname
            };
            newList.push(item)
        }
        return newList
    }

  render() {
   let {title,bgImg,SongList} = this.state;
    return (
      <div style={{overflow:"hidden"}}>
         {/* <div style={{position:"fixed",width:"100%",top:0,wifth:"100%",lineHeight:"50px",fontSize:"18px",color:"white",textAlign:"center"}}>{title?title:""}</div> */}
         <NavBar
         className="songListHead"
         style={{position:"fixed",top:0,width:"100%"}}
         icon={<Icon type="left" />}
         onLeftClick={() =>history.goBack()}
       >{title}</NavBar>
         <div style={{ position:"absolute",marginTop:"46px",zIndex:6}}>
             <img style={{position: "fixed",zIndex: 5}}src={bgImg} alt=""/>
         </div>
         <SongListCom  songList={SongList} ></SongListCom>
      </div>
    )
  }
}

{/* <script>
    import SongList from '@/components/songsList'
    import { getCdInfo,getSingerList } from '@/api'
    export default {
        data(){
            return{
                SongList:[],
                title:'',
                bgImg:''
            }
        },
        created(){
            this.getCdInfoList()
        },
        methods:{
            getCdInfoList(){
                getCdInfo().then(res => {
                    // console.log(res)
                    if(res){
                       this.title = res.data.cdlist[0].dissname;
                       this.bgImg = res.data.cdlist[0].logo;
                       this.SongList = this.editSongs(res.data.cdlist[0].songlist) 
                    }
                    
                })
            },
            //对数据进行处理
            editSongs(list){
                let nList = []; 
                for(var i=0;i<list.length;i++){
                   var item = {
                        //不全
                        // 歌曲ID
                        id:list[i].songid,
                        //歌曲名
                        name:list[i].songname,
                        //专辑封面
                        img:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                        //歌曲时长
                        interval:list[i].interval,
                        //歌曲mid
                        songmid:list[i].songmid,
                        //歌手的姓名(数组)
                        singer:list[i].singer,
                        //专辑
                        album:list[i].albumname
                    };
                    nList.push(item)
                }
                return nList
            }
        },
        components:{
            SongList
        }
    }
</script> */}
