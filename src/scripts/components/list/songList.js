import React, { Component } from 'react'
import  {Link,NavLink} from "react-router-dom"
// import {Song} from "@/scripts/song"
export class SongListCom extends Component {
    state={
        songList:[]
    }
    componentWillReceiveProps(newProps){
        let {songList} = newProps;
        this.setState(
            {songList:songList}
        )
        this.state.songList.length>0?console.log(this.state.songList):"";
    }
    componentWillMount(){
        console.log("props",this.props)
        let {songList} = this.props;
        this.setState(
            {songList:songList}
        )
        this.state.songList.length>0?console.log(this.state.songList):"";
    }
    render() {
        let {songList} = this.state;
        return (
            <div className="recSongListBox">
                <ul className="recSongList" >
                    {
                        songList&&songList.map((item,i)=>{
                           return (
                            // pathname: `${this.props.match.url}/1`,
                            // myState: '这是我自定义的变量'
                            <NavLink key={i} to={{pathname:`/song/${item.id}`,query:{item}}}>
                                 <li  className="recSongListLi">
                                    <p className="recRank">{i+1}</p>
                                    <div className="recRankMsg">
                                        <p className="recRankName">{item.name}</p>
                                        <p className="recRankAuth">{item.singer[0].name}</p>
                                    </div>
                                 </li>
                            </NavLink>
                                 )
                           
                        })
                    }
                </ul>
                
            </div>
        )
    }
}


