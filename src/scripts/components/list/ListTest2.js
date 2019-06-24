/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import ReactDOM from 'react-dom'
import axios from 'axios'
import { object } from 'prop-types';
import {series} from 'async';
// mongoimport --db react --collection movieList --file data.json
//data.json  可以直接导入？？？
/**
 * 1.请求第一组数据
 * 2.滑动接请求下一页数据
 * 3.计算得到last的index
 * 4.以便控制loadMore
 */

let count = 0;
let Resdata = [];
//分页条数
let NUM_ROWS = null;//条数怎么控制数据  3条数据   ---》20条
//NUM_ROWS一直为初始值得长度  也就是  params  limit
//初始页面
let pageIndex = 0;
let pageNum = 0;
//Title部分就是不刷新
//数据增多  但是并不返回  ye
//dataArr  只获取了一个ID
function genData(pIndex = 0) {  
    // console.log("length----------2----------")
    //dataArr是记录每一行的key
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  // console.log("dataArr",dataArr);
  return dataArr;
} 

export class ListViewTest2 extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
    rowHasChanged:function(row1, row2){
        return row1 !== row2
    }
    });


    //一开始数据是正在加载   也是页面正在刷新    正在加载  也在刷新
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
  }

  //滑动方式    点击切换 componentDidUpdate  数据改变后执行
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  componentWillMount(){
    console.log("来自componentWillMount的AXIOS请求")
    series([
      (callback)=>{
        axios.get("http://localhost:1901/react/getMovies",{
          params:{
              limit:10,
              pageIndex
          }
      })
          .then((res)=>{
              let {data:{result}} = res;
              Resdata = result;
              // console.log("result-----------1-----------------",result,Resdata);
              NUM_ROWS = Resdata.length;
              callback(null,"1_ok")
          })
      },
      (callback)=>{
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        setTimeout(() => {
            //rData 
          this.rData = genData();
          // console.log("rowData",this.rData)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(genData()),
            height: hei,
            refreshing: false,
            isLoading: false,
          });
          callback(null,"2_ok");
        }, 1500);
      },
      (callback)=>{
        axios.get("http://localhost:1901/react/getMoviesLength")
          .then((res)=>{
            let {data:{length}} = res;
              console.log("-----------------res----num---------------------",length)
              pageNum =  Math.ceil(length/NUM_ROWS);
              console.log("------------------pageNum-------------------",pageNum);
              // console.log("-----------length----------",pageNum)
              callback(null,pageNum)
          })
      },
    ],((err,result) =>{
      if(err) throw err;
      console.log(result);
    }))
  }
  componentDidMount() {
    console.log("来自componentDidMount的render")
  }
  //onfresh  函数   和一开始在加载的状态一样
  onRefresh = () => {
    console.log("来自onRefresh的render")
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
// let Resdata = [];
// //分页条数
// let NUM_ROWS = null;//条数怎么控制数据  3条数据   ---》20条
// //初始页面
// let pageIndex = 0;
      this.setState({
          //初始加载  dataSource
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false
        //加载完成将状态修改成false  false
      });
    }, 600);
  };
//  0    8
//  1    8
//  7    8
  onEndReached = (event) => {
    if(pageIndex+1 == pageNum){
      console.log("------------------------退出------------------------")
      return;
    }
    pageIndex++;
    console.log("-----------pageIndex------pageNum--------",pageNum,(pageIndex-1))
    if(Math.ceil(pageIndex == pageNum)){
      //  6 - 1 = 5 <==> 5
      // 
      console.log("------------------------------------------------------",pageIndex,pageNum)
      this.setState({isLoading:true,hasMore: false });
      // this.state.hasMore = false;
    }
    console.log("来自onEndReached的render")
    if (this.state.isLoading && !this.state.hasMore) {
      console.log("------------------------退出------------------------")
      return;
    }
    /**
     * 获取下10条数据
     */
   
    axios.get("http://localhost:1901/react/getMovies",{
      params:{
          limit:10,
          pageIndex
      }
  })
      .then((res)=>{
          let {data:{result}} = res;
          console.log("=====enreach=======result================",result)
          NUM_ROWS = result.length;
          console.log("-------------enreached--------------",NUM_ROWS)
          Resdata = [...Resdata,...result];
      })

    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(pageIndex)];
      console.log("this.rData",this.rData)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    console.log("-------------------------------render------------------------------")
    // console.log("count-----------",++count)
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: 'red',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = Resdata.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = Resdata.length - 1;
      }
      //data只有3条
      //      if (index < 0) {
      // console.log("Resdata",Resdata)
      const obj = Resdata[index--];
      // console.log(obj);
      return (
          //dataSource用自己的数据渲染这个row
        //   rowID  就像是List下面的  Item key肯定是自增的  自增这个RowID 跟DATA无关
        <div key={rowID}
          style={{
            padding: '0 15px',
            backgroundColor: 'white',
          }}
        >
          {/* <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
            {obj.title}
          </div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
            <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ display: 'inline-block' }}>
              <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>6666666666{obj.des}-{rowData}</div>
              <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
            </div>
          </div> */}
           <div style={{  display: 'flex', padding: '15px' }}>
               <div><p>Title</p><p>{obj&&obj.name}</p></div>
               <div><img style={{width:"100%"}} src={obj&&obj.img} alt=""/></div>
            {/* <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" /> */}
            <div style={{ display: 'inline-block' }}>
              {/* <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>6666666666{obj.des}-{rowData}</div> */}
              <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
            </div>
          </div>
         {/* {rowID} */}


{/* // { "_id" : "5cb57dd4adedb2f60242217a", "id" : "5c1c484b4ef88babbf26e62c", "zhu_id */}
{/* // " : "5be29d81d3a58d4859182105", "name" : "小葱良裁自制 日系可爱猫咪短袖衬衫", "p
// rice" : 139, "discount" : 9, "img" : "https://img.alicdn.com/bao/uploaded/i3/355
// 235862/TB21LLYf4GYBuNjy0FnXXX5lpXa_!!355235862.jpg_180x180.jpg", "type" : { "val */}
{/* // ue" : "shirt", "text" : "衬衫" } } */}
        </div>
      );
    };
    console.log("row",row());
    //渲染了两个组件   一个按钮
    //一个列表
    return (<div>
      {/* <Button
        style={{ margin: '30px 15px' }}
        inline
        onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
      >
        {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
      </Button> */}
      {/* 头部不会变化  这个OK */}
      <div  style={{height:50,backgroundColor:'red',lineHeight:100,textAlign:'center'}}>
      5555
      </div>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        //this.lv
        ref={el => this.lv = el}
        //给这个组件传    dataSource和row一起就可以渲染整个页面信息了
        dataSource={this.state.dataSource}
        //头部拉动提示信息
        renderHeader={() => <span>Pull to refresh</span>}
        //底部提示信息
        //Loading?'Loading...':'Loaded'
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {/* {this.state.isLoading ? 'Loading...' : 'Loaded'} */}
          {/* {this.state.hasMore+"" == "false"?'' :'加载完毕'} */}
          {this.state.hasMore+"" == "undefined"?"正在加载":"加载完毕"}
        </div>)}
        //渲染那个 单个组件   一行的
        renderRow={row}
        //
        renderSeparator={separator}
        //滑动方式   头部固定还是一起滚动
        useBodyScroll={this.state.useBodyScroll}
        //
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        //滑动   pullToRefresh   refreshing   onfresh
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={1}
      />
    </div>);
  }
}

// ReactDOM.render(<App />, mountNode);