import {Header} from '~/header'
import {AliBanner} from '~/banner/aliBanner'
// import {BannerHome} from '~/banner/bannerHome'
// import {Test} from '@/test'
import {Mid} from '~/middle/staticMid'
import {RecommendList} from '~/list/recommendList'
export class Recommend extends Component{
        render(){
           return (
           <div className="hundred" style={{overflow:"hidden"}}>
                       <Header title="推荐" show={false}/>
                       {/* <div style={{position:"fixed",width:"100%"}}> */}
                       <div style={{position:"fixed",width:"100%"}}>
                            <AliBanner></AliBanner>
                            <Mid></Mid>
                       </div>
                       <RecommendList></RecommendList>
                       {/* </div> */}
                      
            </div>
            )
        }
    }
    
    
