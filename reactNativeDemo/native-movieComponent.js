// index.ios.js movie
var MOCKED_MOVIES_DATA = [
// 定义数组，数组项为对象
{title: 'Title', year:'2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

// 引入 React 的组件，因为要显示图片，用 image 组件
import React, {
  AppRegistry,
  Component,
  Image,
  ListView, // 显示竖直滚动列表，用列表形式显示电影内容，列表作用已渲染但是不在屏幕中显示的项从视图结构中移除
  StyleSheet,
  Text,
  View,
} from 'react-native';

// 获取数据的 url
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

// 用 es6 的写法定义一个组件
// 调用方法:1. 定义状态 constructor
//         2. 渲染组件 render
//         3. 没有获取电影数据 renderloadingView
//         4. 加载完 DOM，componentDidMount
//         5. 获取电影数据 fetchData
//         6. state 改变，重新渲染 DOM，render
//         7. 获取到了电影值 renderMovie
// renderloadingView 和 renderMovie 为 render 的返回值，返回的 html 结构
class AwesomeProject extends Component {
  // 定义初始状态，相当于 React.createClass({}) 后的 getInitialState
  constructor(props) {
    console.log("enter setState");
    super(props);  
    // 这里获取数据不用直接定义一个 movie 了
    // 而是直接给 dataSource 赋值，判断行是否改变，如果两个行不相等返回 true
    this.state = {
      // 给 ListView 赋数据源，用这种方法
      dataSource: new ListView.DataSource({
      	// 在这里判断行是否改变
      	rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount(){
    console.log('enter componentDidMount');
    this.fetchData();
  }
  fetchData(){
    console.log('enter fetchData');
    // fetch 还在实验阶段，只有少部分浏览器支持，异步的获取资源
    // 在不支持的浏览器可以用 XMLHttpRequest 来获取（ajax 中的）
    fetch(REQUEST_URL)
      // fetch 返回 Respone 对象
      // 这里将 respone 转换为 json 格式，返回转换完的对象
      .then((response) => response.json())
      .then((responseData) => {
      	// 在函数中设置 state 值
        this.setState({
          // 不是 clone 数据源，还判断当前数据源是否变化来更新数据源
          // 源代码中的注释指出，数据源是不可变的设计，更新它的方法是用 cloneWithRows 方法
          // react native 关心如何去改变状态和改变状态后重新渲染组件
          // 一般每次更新一行数据，不过可以改变这些
          // 所以，通过组件状态改变渲染组件，组件状态改变时由函数判断是否增加或删除行
          // 源码中的注释说：他并不克隆数据源中的数据，它只是传递函数给指定的数据源
          // 如果你希望维持现有数据，需要把现有数据和新数据合并通过 dataBlob
          // 参数为返回数据的 json 形式
          // 判断数据源是否需要更新
          // cloneWithRows 用来判断整个列表是否改变
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }
  render(){
    console.log("enter render");
    // 通过状态判断是否开始加载
    if(!this.state.loaded){
      return this.renderloadingView();
    }
    // var movie = this.state.movies[0];
    return (
      <ListView
        style={styles.listView}
        // 返回它的数据源
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie} 
      />
    );
  }
  renderloadingView(){
  	// 返回 html 结构要写括号！！
    console.log('enter renderloadingView');
    return(
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    )
  }
  // 这里的参数是怎么传进去的
  renderMovie(movie){
    console.log('enter renderMovie');
    // styles.title.fontSize = 50; 没有作用
    return(
      // 样式一层大括号表示是 javascript 语法
      // 为了避免冲突，如果定义了两个或以上的 style，右面的优先级更高，并且 false undefined null 将被忽略
      // 一般来说通过 state 来判断要改变的 style
      // 在 state.active 返回 true 时，设置 style.active，否则后面的结果是 false，false 值被忽略
      // 不用 native 时，加一个类 active 来解决，this.silbings.reomveClass('active')
      // <View style={style.base, this.state.active&&style.active}>
      <View style={styles.container}>
        <Image
          // 两层括号一层表示是 javascript 语法，一层表示是样式对象
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

// 采用驼峰式拼写法
// 因为每一个属性都是一个对象，里面又有属性，所以中间用, 分隔
// 主要支持 flexbox 中样式对象 6 种，
// alignItems, alignSelf, flex, flexDirection, flexWrap, justifyContents
// StyleSheet.create 保证 style 的值是在内部不可改变的，通过它们转化为纯数字存入内部表中
// 就是内部的样式用键值的形式在内部存了一个表，表隐藏在内部不可改变
// 最好最好最好写在页面底部，使它们只会被创建一次，不是每次渲染页面时都会被创建
// 可以写在 render 里但最好不写，因为这样每次渲染都会重新创建
// *(未看 http://reactnative.cn/docs/0.21/style.html#content)为了能够在调用组件的地方对其子组件样式进行自定义，你还可以将样式作为参数进行传递。
var styles = StyleSheet.create({
  container: {
    // 伸缩项目的放大比例，默认为 0，即有空的位置也不放大，如果都设置为1，则每个伸缩项目设置一个大小相等的剩余空间
    flex: 1,
    // 子元素排列方向水平，react native 中默认为垂直
    flexDirection: 'row',
    // 伸缩项目沿主轴线对齐方式，这里是沿中心对齐，相当于竖直轴上对齐方式
    justifyContent: 'center',
    // 伸缩项目在伸缩容器交叉轴上对齐方式，在交叉轴上中心对齐，相当于水平轴上对齐方式
    alignItems: 'center',
    // 背景颜色
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    backgroundColor: '#FFFF00',
    // 所以里面的项目占据所有的剩余空间
    flex: 1,
  },
  // 文字居中
  title: {
    fontSize: 20,
    marginBottom: 8,
    backgroundColor: '#236800',
    textAlign: 'center',
  },
  year: {
    backgroundColor: '#245867',
    textAlign: 'center',
  },
  listView: {
  	paddingTop: 20,
  	backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
