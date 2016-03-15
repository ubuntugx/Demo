// react native 提供了一种统一的方法来显示静态图片
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
}

class myComponent extends Compontent{
	render(){
		return(
		    <Image
              style={styles.image}
              // 如果同时放了 my-icon.ios.png 和 my-icon.android.png
              // 将根据你的平台不同显示不同的图片
              // 也可以用 @2x 和 @3x 命名用来在不同分辨率的屏幕上显示
              // 写的时候直接写 <Image source={require('./img/check.png')}>
              // 自动根据屏幕的分辨率不同识别
              // 静态图像宽高是已知的所以不用特意定义宽高
              source={require('./my-icon.png')} 
            />
		)
	}
}

// 在通过不同情况显示不同图片时，require 最好整体写，不要和里面的路径分开
var icon = this.state.active ? require('./my-icon-active.png') : require('.my-icon-inactive.png');
<Image source={icon} />

// require 中包括了图片的宽度和高度信息，所以要手动的设置宽高
// 需要设置 style = {width: undefined, height: undefined} 为什么不直接设置宽高
// 混合应用 hybird app，一部分是原生的 react native，一部分是平台原生代码
// 如果在混合应用中，这样处理图片的方法不安全，你需要确定这些图片在应用中都是可靠的，同时也要手动规定图片的尺寸
<Image
  style={{width: 40, height: 40}}
  source={{uri: 'app_icon'}} />


// 如果从网络中获取图片，同样要手动设置图片的尺寸
<Image
  style={{width: 400,height: 400}}
  source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />

// 在 react native 中，图片是异步加载的
// 其中资源属性是一个对象，并且不支持字符串的值，需要定义一个对象属性 uri
// 以后 require 显示静态图片中可能加入支持精灵图的部分，输出裁剪信息 crop

// 还有一种情况就是类似于 web 中的背景图，可以用 Image 标签嵌套其它标签实现
<Image
  style={}
  source={{uri: ''}} >
  <Text>Inside</Text>
</Image>

// 在 react native 中，图片解码是在另一个线程中处理，速度很快，所以不同对于图片还没加载完的情况进行处理
