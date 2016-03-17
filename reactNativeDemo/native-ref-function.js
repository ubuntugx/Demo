// ref 属性实例
// ref 引用！！！
// 组件中的 render 返回的并不是真实的 DOM 节点，不是一个组件实例
// 而是一个 ReactElement，是 React 想 DOM 结构应该是什么样的

// var myComponentElement = <MyComponent /> // 这是一个 React 元素，不是真实的 DOM 节点
// var myComponentInstance = ReactDOM.render(myComponentElement, myContainer);
// myComponentInstance.doSomething();  // 这个才是真实的 DOM 节点

// ref 的值是一个回调函数的情况 
// React 中提供了特殊的属性，可以附加到其他的组件
// 当 ref 是一个回调函数时，函数将在组件装载后被立即执行

render: function(){
	return(
		// 这里的参数就是这个组件本身
		<TextInput ref={function(input){
			if(input != null){
				input.focus();
			}
		}}/>
	)
}

// 或者用 es6 的写法
render: function(){
	// ref 中回调函数的参数是组件本身，现在把组件本身赋到 this._input 上
	return <TextInput ref={(c) => this._input = c} />
},
componentDidMount: function(){
	this._input.focus();
}

// 当把 ref 赋给复合组件 TextInput 上后，将会得到组件实例。这时候你可以调用组件的任何方法
// 注意当组件没有被装载时，原来的 ref 的参数被赋值为 null，用来防止内存泄漏。
// 注意把 ref 作为像例子中的行内函数使用时，每次更新时函数对象都不同，在 ref 中参数值为组件实例前，ref 中参数值会是 null