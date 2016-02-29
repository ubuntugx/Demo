/**
 * Created by ideabinder on 16/2/29.
 */
// 2. 一个时钟组件
// React chrome 插件: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
var Timer = React.createClass({
    getInitialState: function(){
        return {
            seconds: 0
        }
    },
    // 改变当前秒（组件的 state 中 seconds）
    tick: function(){
        // setState 用来改变组件状态的函数，参数就是一个对象，状态和新的值
        this.setState({
            seconds: this.state.seconds + 1
        })
    },
    // 当文档 DOM 加载完，开始循环
    componentDidMount: function(){
        this.interval = setInterval(this.tick, 1000)
    },
    // 当 DOM 即将被移出，清除计时器
    componentWillUnmount: function(){
        clearInterval(this.interval);
    },
    render: function(){
        return <div>Now, the time is: {this.state.seconds}</div>
    }
});

ReactDOM.render(<Timer />, document.getElementById("example"));