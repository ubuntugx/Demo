/**
 * Created by ThinkPad on 2016/3/20.
 */
// react �пɿ�����Ͳ��ɿ����
// 1. ���ɿ����
// <Input type="text" defaultValue="Hello World!" />
// ��������е������� state �ǲ���Ӧ�ģ����ɿ����
// ��Ҫ�õ������ value ��Ҫ�õ���ǰ�� DOM �ڵ㣬��ȥȡ���� value
var InputValue = React.findDOMNode(this.refs.input).value;
// ���ַ�����Ҫ���� DOM �ڵ㣬���ܲ��ã�������ɿ�

// 2.�ɿ����(����)
// <Input type="text" value={this.state.userInput} onChangeText={(this._handleChange)} />
// var inputValue = this.state.value