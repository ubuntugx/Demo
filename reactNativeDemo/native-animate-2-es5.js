// 动画效果 2 ES5
'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Component,
	Text,
	View,
	TouchableOpacity,
	LayoutAnimation,	
} = React;

var AwesomeProject = React.createClass({
	componentWillMount(){
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	},
	getInitialState(){
		console.log(this);
		return{
			width: 100,
			height: 100,
		}
	},
	_onPress(){
		// 在变大的基础上增加了抖动的效果
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		// 点击后宽高在原来基础上加 15
		console.log(this);
		this.setState({
			width: this.state.width + 15,
			height: this.state.height + 15,
		})
	},
	render: function(){
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
})

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
module.exports = AppRegistry;