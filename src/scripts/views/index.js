import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"

import {App} from '@/scripts/views/app'
import {SongList} from '@/scripts/views/songList'
import {Song} from '@/scripts/views/Song'
import {Provider} from "react-redux";
import store from "@/scripts/store"
export class RouteToHome extends Component{
    render(){
        return (
            <div>
                   <Provider store={store} >
                        <Router>
                            <div id="main">
                                <Route path="" exact component={Routes}  />    {/* 第一次访问网站的地址 .com [""]  .com/ [/]*/}
                            </div>
                        </Router>
                </Provider>
            </div>
        )
    }
}

export class Routes extends Component{
    render(){
        return (
           
                <div className="hundred">
                    <Switch>
                    {/* <Route path="/"  exact render={()=>(<Redirect to="/singer"/>)} /> */}
                    <Route path="/app/" strtic component={App}/>  
                    <Route path="/songList/:id"  component={SongList}/>  
                    <Route path="/song/:id"  component={Song}/>  
                    <Route 
                        render={
                            ()=>(<Redirect to="/app/" />   )
                        }
                    />
                </Switch>
                </div>
           
        )
    }
}