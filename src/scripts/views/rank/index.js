
import {Header} from '~/header'
import {RankList} from "~/rank" 
export class Rank extends Component{
    render(){
       return (
           <div>
                  <Header title="排名" show={true}/>
                  <RankList></RankList>
           </div>
      
       )
    }
}

