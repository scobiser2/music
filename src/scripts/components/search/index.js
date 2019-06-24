import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import $ from "@/utils/jq";
import { connect } from 'react-redux';
import {searchList} from "@/scripts/actions"
@connect(
  //state取自于reducers  或者是 store
  state=>{
      return {
          ...state,
      }
  },
  //state作为props注入到UI组件
  //action取自于action.js
  dispatch=>{
      return {
          searchList:(val)=>dispatch(searchList(val))
      }
  }
)
export class SearchInput extends React.Component {
  state = {
    value: '',
  };
  componentDidMount() {
    $(".am-search").css({"background-color":"#333"})
    $(".am-search-input").css({"background-color":"#333"})
    $(".am-search-input input[type='search']").css({color:"white"})
    $(".am-search-cancel").css({"color":"#bbb"})
  }
  componentWillMount(){

  }
  search = (value) => {
    let {searchList} = this.props;
    // console.log(searchList);
    searchList(value)
  };
  test(val){
    console.log(val)
  }
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
  render() {
    return (
    <div style={{position: "fixed",width: "100%",zIndex:1,background:"rgb(51, 51, 51)"}}>
      <SearchBar
        // value={this.state.value}
        placeholder="搜索更多歌曲..."
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        // onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={(val)=>this.search(val)}
      />
    </div>);
  }
}

