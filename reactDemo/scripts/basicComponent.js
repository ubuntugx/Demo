/**
 * Created by ideabinder on 16/2/29.
 */
// 1. 创建一个基本组件
var HelloMessage = React.createClass({
    render: function(){
        return <div>Hello, {this.props.name}</div>
    }
});

// 将模版转化为 HTML 语言，并插入到指定的 DOM 节点
ReactDOM.render(<HelloMessage name="ubuntugx"/>, document.getElementById('example'));