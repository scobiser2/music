import {HashRouter as Router,Route,Switch,Redirect,NavLink} from "react-router-dom"
import {Badge} from  'antd-mobile';
import "./index.scss"
export const foots =  [
  {txt:"推荐",path:"/app/recommend",name:"recommend",icon:"icon-home-line"},
  {txt:"歌手",path:"/app/singer",name:"singer",icon:"icon-fenlei-xuanzhong"},
  {txt:"排名",path:"/app/rank",name:"rank",icon:"icon-dianshangfuwu"},
  {txt:"搜索",path:"/app/search",name:"search",icon:"icon-user"}
]
export default class Foot extends Component {
  render() {

    return (
      
        <footer>
         <ul className="footer">
         {
            foots.map((item,i)=>{
              return (
                <li className="footerli" key={i}>
                  <p>{item.name}</p>
                      <NavLink activeClassName="nav-active"  to={`/app/${item.name}`}><i className={"iconfont icon " + item.icon}></i>{i==2&&<Badge text={8} style={{ marginLeft: 12 }}></Badge>}
                      <p>{item.name}</p></NavLink>
                </li>
              )
            })
          }
         </ul>
         
        </footer>
    )
  }
}
