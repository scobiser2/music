import { TabBar } from 'antd-mobile';
import {foots} from '../footMsg/footer'
import history from '@/utils/history'
import Pubsub from 'pubsub-js'
export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "recommend",
      hidden: false,
      fullScreen: true,
      foots:foots
    };
  }
componentWillMount(){
  PubSub.subscribe('Routeback', (msg, data) => {
    this.setState({selectedTab:data});
  })
}
componentDidMount(){
  setTimeout(()=>{
    this.setState({selectedTab: location.href.split("/app/")[1]})
  },0)
}
componentDidUpdate(){

}
render() {
 

    return (
      <div className="foot">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
            {
                foots.map((item,i)=>{
                    return(
                        <TabBar.Item
                        name={item.name}
                        icon={<i 
                        className={"iconfont icon " + item.icon}
                        style={{
                            width: '22px',
                            height: '22px',
                            display:"block"
                            }}
                        ></i>}
                        selectedIcon={<i 
                            className={"iconfont icon " + item.icon}
                            style={{
                                width: '22px',
                                height: '22px',
                                display:"block"
                                }}
                        ></i>}
                        title={item.txt}
                        key={item.txt}
                        selected={this.state.selectedTab == item.name}
                        //判断的本身就是静态的  这个state属性不参与渲染
                        //页面能监听到改变
                        onPress={() => {
                        this.setState({selectedTab:item.name})
                          history.push(item.path);
                        }}
                      >
                      </TabBar.Item>
                    )
                })
            }
        </TabBar>
      </div>
    );
  }
}


