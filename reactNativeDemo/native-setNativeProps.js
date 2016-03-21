// 直接操作 setNativeProps 不使用 state 和 props 的方法
// 用于创建连续的动画，直接更新 DOM 节点 UIView，不用状态变化导致的重新渲染组件。
// 但是因为没有状态的更新，逻辑会比较混乱，所以只在创建连续动画时使用
// 在使用这个方法前先考虑 setState 和 shouldComponentUpdate

// 在 TouchableOpacity 这个按钮组件中默认实现了这个方法，在按钮按下时透明度降低
// 这样在用这个组件的时候不用进行额外的处理

// 这里面方法前面加 _ 表示定义的是私有方法
// <TouchableOpacity onPress={this._handlePress}>
//     <View style={styles.button}>
//         <Text>Press me!</Text>
//     </View>
// </TouchableOpacity>

// 如果不用这种方法，就要用 state 设置透明度，然后在点击时改变 state 的值，重新渲染组件
// getInitialState(){
// 	return { myButtonOpacity: 1 }
// },
// render(){
// 	return 
// 	<TouchableOpacity onPress={() => this.setState({myButtonOpacity: 0.5})} onPressOut={() => this.setState({myButtonOpacity: 1})}>
//         <View style={[styles.button, {opacity: myButtonOpacity}]}></View>
// 	</TouchableOpacity>
// }

import React,{
	Component,
	AppRegistry,
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native'

class MyButton extends Component{
	setNativeProps(nativeProps){
		// 这样可以在组件里调用 setNativeProps 方法了
		this._root.setNativeProps(nativeProps);
	}
	render(){
		return(
			// 本来里面不能
			// 这里用了 ref 回调的方法，link 标签中的是 rel='stylesheet'，不是一回事。。
			// 组件中的 refs：
			// render 返回的是虚拟 DOM，并不是真正的组件实例，而是当前组件树的一个快照
			// 在用组件时，你会用到在 render() 返回的组件实例上调用方法（不就是在自己上调用方法）
			// 大多数情况下是不必要的，因为组件会自动将 props 属性给 render() 输出的子组件中。
			// 但是，还是有一些情况下是必要的，比如说，找到 DOM 标记的组件和在不用 React 的环境中引入 React 组件。
			// 有一种情况，<Input /> 作为一个组件的子组件，现在想取到 Input 的值。需要的真正的 Input 交流。

			// 解释这里的 ref：将真实的组件实例赋给 this._root，以便操作真实的组件
			// 因为 TouchableOpacity 本身也是一个复合组件，所以在执行 setNativeProps 以外
			// 还要对触摸事件进行处理，所以还要传递 props
			// 与之相对的是 TouchableHighLight 它由原生视图构成，所以只需要实现 setNativeProps
			
			// 组件传递 http://reactjs.cn/react/docs/transferring-props.html
                        // 传入的属性将会被复制到组件内，这里就是将父组件的属性传递给子组件
      
                        // 这里的 this 是父组件 myButton
                        // 组件的 props 不要修改，因为 React 不能帮你检查属性类型，即使属性类型错误也不会有提示
                        // 所以即使你知道组件的全部类型，也不要把它们全部罗列在上面
                        // 所以有组件的新特性：展开属性 {...this.props}
                        // 传入对象的属性将会被复制到组件内，注意后面的属性会覆盖前面的
			<View ref={component => this._root = component} {...this.props} style={styles.button}>
			    <Text>{this.props.label}</Text>
			</View>
		)
	}
}

class AwesomeProject extends Component{
	render(){
		return(
			// TouchableOpacity 中用了 setNativeProps 方法，但是它的子组件不是原生组件
			// 所以要将这个方法传递给原生组件封装的子组件
		    <View style={{flex: 1,justifyContent:'center',alignItems: 'center'}}>
		        <TouchableOpacity>
		            <MyButton label='Press me!'/>
		        </TouchableOpacity>
		    </View>
		)
	}
}

var styles = StyleSheet.create({
	button: {
		width: 100,
		height: 50,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,.1)'
	}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
