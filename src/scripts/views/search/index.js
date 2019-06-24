import {Header} from '~/header'
import {SearchInput} from '~/search'
import {SearchList} from '~/list/searchList'
export class Search extends Component{
    componentWillMount() {
      
    }
    render(){
        return (
            <div>
                     <Header title="歌手" show={true}/>
                   
                            <SearchInput/> 
                          
                            <SearchList></SearchList>
                  
                    
            </div>
        
        )
     }
}



