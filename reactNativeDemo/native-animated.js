// 动画实现
import React,{
  AppRegistry,
  Component,
  Animated,
} from 'react-native';

class AwesomeProject extends Component{
	constructor(props: any){
		super(props);
		this.state = {
			// 定义组件的状态 bounceValue
			// Animate 有两个值类型，Value 用于单个值，ValueXY 用于向量值
			bounceValue: new Animated.Value(0),
		};
	}

	render(): ReactElement {
		return (
		  // 要进行动画的组件，可选的组件类型 Image，Text，View	
		  <Animated.Image 
		    source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
		    style={{
		    	flex: 1,
		    	// 动画效果 transform 是一个有序数组，动画按照顺序执行
		    	transform: [
		    	  // 将 bounceValue 赋值给 scale
		    	  {scale: this.state.bounceValue},
		    	]
		    }}
		  />
		)
	}

	componentDidMount(){
		// 当页面都加载完后，改变状态进行动画
		// 相当于 this.setState({bounceValue: 1.5})
		this.state.bounceValue.setValue(1.5);
		// 可选的基本动画类型 spring，decay，timing
		// spring 为弹跳动画
		// 在动画执行的过程中不用重新渲染
		Animated.spring(
			this.state.bounceValue,  // 将 bounceValue 动画化
			{
				toValue: 0.8,  // 将它的值以动画形式改成一个较小的值
				friction: 1,   // 弹跳系数默认为 7
			}
	    ).start();
	}
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
