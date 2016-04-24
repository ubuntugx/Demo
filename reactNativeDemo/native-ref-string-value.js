// ref 属性实例
// 这里写的是传统的 ref 字符串引用！！！
// ref 属性可以用来绑定到 render() 出的任何一个组件中
// 这个属性允许你用 render 返回相应的支撑实例，而不是虚拟 DOM
// 这样想要获得相应的实例就可以直接写
// <Input ref='myInput' />
// 需要获取真实 DOM （支撑实例）的时候就可以直接写
// this.ref.myInput
// 想要获取组件的 DOM 节点时可以写
// this.ref.myInput.getDOMNode()

// ref 是给子组件发送消息的很好的方式
// 这里用到的是点击按钮后 TextInput 获取焦点，为了获取 TextInput 这个组件
// 给 TextInput 设置了 ref 值，为了取得真实 DOM
// 然后调用 this.refs.theInput.focus() 给 TextInput 焦点

// 注意，不要在组件的 render 方法中访问 refs

// 还有，不明白输入框显示文字为什么还要通过 state。
// 输入框显示文字时，value = {this.state.userInput}
// 在 onChange 时用 this.refs.theInput.value 获取输入的值
// 在 React 不是 Native 中，输入框的值用 e.target.value 获取

import React,{
	Component,
	AppRegistry,
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

class AwesomeProject extends Component {
	constructor(props){
		super(props);
		this.state = {
			userInput: ''
		}
	}
	_handleChange = (value) => {
		this.setState({
			// 获取真实组件输入的值，改变状态
			// 在 React 不是 Native 中用 e.target.value
			userInput: value,
		})
		console.log('value: '+value);
	};
	_clearAndFocusInput = () => {
		// console.log(this.refs.theInput.props.value);
		console.log(this.state.userInput);
		this.setState({userInput: ''}, function () {
			// 取得它的真实 DOM 节点，然后获得焦点
			this.refs.theInput.focus();
		})
	};
	render(){
		console.log('enter render');
		return(
			// 像 TextInput 这种组件一定要写在 View 里面，写在外面会报错
			<View style={styles.container}>
			    <TouchableOpacity onPress={this._clearAndFocusInput}>
			        <View style={styles.button}>
			            <Text style={styles.buttonText}>CLick to Focus and Reset</Text>
			        </View>
			    </TouchableOpacity>
			    <TextInput style={styles.textInput} ref='theInput' value={this.state.userInput} onChangeText={(this._handleChange)} />
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
	button: {
		backgroundColor: '#000',
	},
	buttonText: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: 'bold',
	},
	textInput: {
		height: 40,
		borderColor: 'rgba(0,0,0,.2)',
		borderWidth: 1,
	}
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
