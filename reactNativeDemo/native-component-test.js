// ReWrite Component
// 重写 movie 的函数
// 1. 导入组件
import{
	AppRegistry,
	Component,
	View,
	Text,
	ListView,
	StyleSheet,
	Image,
} from 'react-native';

// 5. 定义获取数据的 URL
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

// 2. 定义自己的组件
class AwesomeProject extends Component{
	// 3. 定义组件的初始状态
	constructor(props){
		super(states);
		this.state = {
			dataSource: new ListView.DataSource({
				// 箭头函数后面的结果就直接返回了，不用写 return
				rowhasChanged: (row1, row2) => row1 !== row2
			}),
			// 判断数据是否加载完毕
			loaded: false
		}
	}
	// 4. DOM 结构加载完成后，获取数据
	ComponentDidMount(){
		this.fetchData();
	}
	fetchData(){
		fetch(REQUEST_URL)
		  // 将它们的返回值作为参数
		  .then((response) => response.json())
		  // 这里返回的 json 作为参数
		  .then((responseData) => {
		  	this.setState({
		  	  dataSource: this.state.datasource.cloneWithRows(responseData.movies),
		  	  loaded: true
		  	});
		  })
		  .done()
		}
    render(){
    	if(this.state.loaded){
    		this.renderLoadingMovie()
    		return;
    	}
    	return(
    	  <ListView
    	    // 还有很多别的方法
    	    style={styles.listView}
    	    dataSource={this.state.dataSource}
    	    // renderRow 是一个函数
    	    // 参数：rowData, sectionID, rowID, highlightRow
    	    renderRow={this.renderMovie} />
    	)
    }
    renderLoadingMovie(){
    	return (
    		<View style={styles.contains}>
               <Text>loading...</Text>
    		</View>
    	)
    }
    // 数据从 renderRow 传进来
    // 这里获取第一个参数 rowData
    renderMovie(movie){
    	return(
    		<View style={styles.contains}>
    		  <Image
    		    style={styles.thumbnail}
    		    // image 的 source 用的 uri
    		    source={{uri: movie.posters.thumbnail}} />
    		  <View style={styles.rightContainer}>
    		    <Text style={styles.title}>{movie.title}</Text>
    		    <Text style={styles.year}>{movie.year}</Text>
    		  </View>
    		</View>
    	)
    }
}

var styles = StyleSheet.create({
	contains: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	thumbnail: {
		width: 53,
		height: 81,
	},
	rightContainer: {
		flex: 1,
	},
	title: {
		// 这里默认不用写单位
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center',
	},
	year: {
		textAlign: 'center',
	},
	listView: {
		paddingTop: 8,
		backgroundColor: '#F5FCFF',
	}
})

// 6. 注册组件
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
