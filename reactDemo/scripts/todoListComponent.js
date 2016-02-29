/**
 * Created by ideabinder on 16/2/29.
 */
// 3. 应用程序 TodoApp
var TodoList = React.createClass({
    render: function(){
        var createItem = function(item){
            return <li key={item.id}>{item.text}</li>
        };
        // map 由原数组的每个元素调用指定方法返回新数组，不改变原数组
        return <ul>{this.props.items.map(createItem)}</ul>
    }
});
var TodoApp = React.createClass({
    getInitialState: function(){
        return {
            items: [],
            text: ""
        }
    },
    onChange: function(){
        this.setState({ text: e.target.value })
    },
    handleSubmit: function(){
        e.preventDefault();
        var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
        var nextText = "";
        this.setState({items: nextItems, text: nextText});
    },
    render: function(){
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>{"Add #" + (this.state.items.length + 1)}</button>
                </form>
            </div>
        )
    }
});
ReactDOM.render(<TodoApp />, document.getElementById("example"));