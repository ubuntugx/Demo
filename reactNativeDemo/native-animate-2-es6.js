//  动画效果 2 ES6
import React,{
	AppRegistry,
	StyleSheet,
	Component,
	Text,
	View,
	TouchableOpacity,
	LayoutAnimation,	
} from 'react-native';

class AwesomeProject extends Component{
	componentWillMount(){
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	}
	constructor(props){
		super(props);   // 调用父类的 constructor(props)
		console.log(this);
		this.state = {
			width: 100,
			height: 100,
		}
		console.log("width old: " + this.state.width);
	}
	// 自定义方法，写成属性的方式，this 就是组件了!!!
	_onPress = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		// 点击后宽高在原来基础上加 15
		// 这里的 this 并不是控件，而只有一个函数
		console.log(this.state);
		this.setState({
			width: this.state.width + 15,
			height: this.state.height + 15,
		})
	};
	render(){
		return(
			<View style={styles.container}>
			    <View style={[styles.box, {width: this.state.width, height: this.state.height}]} />
			    <TouchableOpacity onPress={this._onPress}>
			        <View style={styles.button}>
			            <Text style={styles.buttonText}>Press me!</Text>
			        </View>
			    </TouchableOpacity>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		backgroundColor: '#F00',
	},
	button:{
		marginTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#000',
	},
	buttonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold',
	}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
