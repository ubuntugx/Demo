/**
 * Created by ideabinder on 16/3/9.
 */
var HelloWorld = React.createClass({
    render: function(){
        return (
            <p>
                {/* 一般注释 */}
                /*
                 * 多行注释
                 */
                Hello, <input type="text" placeholder="Your name here"/>!
                It is {this.props.date.toTimeString()}
            </p>
        )
    }
})

// 每半秒钟重新刷新组件，刷新组件的过程中获取时间，总觉得这样写不好
// 一个 react 组件只能渲染单个根节点
// 在组件里 prop 属性是只读的，不能随意改变，这里是在 render 中改变
// 可以把 react 的组件看作一个函数，参数有 props 和 state
setInterval(function(){
    ReactDOM.render(
        <HelloWorld date={new Date()} />,
        document.getElementById("example")
    )
},500);

// 因为 JSX 就是 javascript，一些 javascript 的关键字不建议用做 XML 属性名，建议将 class 替换为 className，将 for 替换为 htmlFor