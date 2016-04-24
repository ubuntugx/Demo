/**
 * Created by ThinkPad on 2016/3/20.
 */
// react 中可控组件和不可控组件
// 1. 不可控组件
// <Input type="text" defaultValue="Hello World!" />
// 这样组件中的数据与 state 是不对应的，不可控组件
// 想要得到组件的 value 需要拿到当前的 DOM 节点，在去取它的 value
var InputValue = React.findDOMNode(this.refs.input).value;
// 这种方法需要遍历 DOM 节点，性能不好，组件不可控

// 2.可控组件(更好)
// <Input type="text" value={this.state.userInput} onChangeText={(this._handleChange)} />
// var inputValue = this.state.value