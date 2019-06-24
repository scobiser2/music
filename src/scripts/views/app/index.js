import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import {Rank} from "@/scripts/views/rank"
import {Recommend} from "@/scripts/views/recommend"
import {Search} from "@/scripts/views/search"
import {Singer} from "@/scripts/views/singer"
import {Footer} from '~/AliFooter'
export class App extends Component{
    render(){
        return (
            <div className="hundred">
                {/* <div className="header">
                </div> */}
                {/* <div className="sec"> */}
                <div className="pdtb50">
                <AppRoute></AppRoute>
                </div>
				{/* </div> */}
                {/* <div className="foot"> */}
                <Footer></Footer>
                {/* </div> */}
            </div>
         
        )
    }
}


class AppRoute extends Component{
    render(){
        return(
        <Switch>
            <Route path="/app/recommend" strtic component={Recommend}/>  
            <Route path="/app/singer" strtic component={Singer}/>  
            <Route path="/app/rank" strtic component={Rank}/>  
            <Route path="/app/search" strtic component={Search}/>  
            {/* <Route path="/app/song" strtic component={Search}/>   */}
                {/* <Route path="/songList/:id" component={SongList}/>   */}
             {/* <Route path="/app/songList/:id" component={SongList}/>   */}
            <Route 
                render={
                    ()=>(<Redirect to="/app/recommend" />   )
                }
            />
        </Switch>)
    }
}


import { NavBar, Icon } from 'antd-mobile';

// ReactDOM.render(
//   <div>
//     <NavBar
//       mode="light"
//       icon={<Icon type="left" />}
//       onLeftClick={() => console.log('onLeftClick')}
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>

//     <NavBar
//       mode="dark"
//       leftContent="Back"
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>
//   </div>
//   , mountNode);