// {...this.props} 解析：对象的扩展运算符
// http://es6.ruanyifeng.com/#docs/object
// es6 允许直接写入变量和函数，作为对象的属性和方法
var foo = 'bar';
var baz = {foo};
// 即 foo 作为对象 baz 的一个属性，而 foo 的值为 'bar'
baz // {foo: 'bar'}
// 等同于
var baz = {foo: foo}

// es6 中允许只写属性名，不谢属性值，这时候属性值等于属性名代表的变量
function f(x, y) {
	// 返回一个由参数组成的对象，这里对象没有写值
	// 默认值为属性名
	return {x, y};
}
// 等同于
function f(x, y){
	return {x: x, y: y}
} 

f(1, 2) // Object {x: 1, y: 2}

// 除了属性，方法也可以简写
var o = {
	method(){
		return 'Hello!';
	}
}

// 等同于
var o = {
	method: function(){
		return 'Hello';
	}
}

// 下面是一个实际的例子
var birth = '2000/01/01';

var Person = {
	name: '张三',
	// 等同于 birth: birth
	birth, 
	// 等同于 hello: function()...
	hello(){console.log('我的名字是：', this.name); }
};

// 这种写法用于写一个函数的返回值，将会非常方便
function getPoint(){
	var x = 1;
	var y = 10;
	// 即 return{x: x,y: y}
	return {x, y};
}

getPoint()
// {x: 1,y: 10}

// 用 CommonJS 模块输出变量，就非常适合使用简洁写法
var ms = {};  // key: value
function getItem(key){
	// 返回 key 是否在 ms 中，在的话返回相应的值，不在的话返回 null
	return key in ms ? ms[key] : null;
}
function setItem(key, value){
	ms[key] = value;
}
function clear(){
	ms = {};
}
// 导出模块的时候只需要写对象的 key，value 自己对应的取值
module.exports = {getItem, setItem, clear}; // 导出这些模块

// 等同于
module.exports = {
	getItem: getItem,
	setItem: setItem,
	clear: clear,
}

// 属性的赋值器和取值器也是一样的原理
var cart = {
	_wheels: 4,
	get wheels(){
		return this._wheels;
	},
	set wheels(value){
		if(value < this._wheels){
			throw new Error('数值太小了！')
		}
		this._wheels = value;
	}
}

// 注意，简洁写法的属性名总是字符串，这样会导致看上去比较奇怪的效果
var obj = {
	class (){} // 这样写相当于定义一个属性 class，值为一个函数
}
// 等同于
var obj = {
	'class': function(){}  // 这里 class 作为属性名，但因为它是字符串，所以不会有什么不妥
}

// 如果某个方法的值是一个 Generator 函数，前面需要加上 * 号
// Generator 函数是什么。。
var obj ＝ {
	* m(){
		yield 'hello world';
	}
}

// 2. 属性名表达式
//  JavaScript 中定义元素的属性，有两种方法
obj.foo = true;
obj['a'+'bc'] = 123;  // 这种方法的好处是可以把变量名写在中括号里，可以拼接字符串

var obj = {
	foo: true,
	abc: 123,
}
// 但是，如果用字面量形式定义对象(上面的大括号)，ES5 中只能用方法1来取对象的值
// 在 ES6 中，如果以字面量形式定义对象时，可以用第二种方法获得对象值
let propKey = 'foo';

let obj = {
	[propKey]: true,
	['a'+'bc']: 123,
}

// 下面是另一个例子
var lastWord ＝ 'last word';
var a = {
	'first word': 'hello',
	[lastWord]: 'world'
}

a['first word']  // 'hello'
a[lastWord]      // 'world'
a['last word']   // 'world' 

// 表达式还可以用来定义方法名
let obj ＝ {
	// 方法名也可以通过拼接字符串的方法来获取
	['h' + 'ello'](){
		return 'hi';
	}
};
obj.hello()    // hi

// 注意，属性表达式和简洁表示法不能同时使用，否则会报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };

// 正确
var foo = 'bar';
var bar = {[foo]: 'abc'}

// 3. 方法的 name 属性（想知道函数名吗？）
// 函数有 name 属性，返回函数名，对象方法也是函数，，因此也有 name 属性
var person = {
	sayName(){
		console.log(this.name);
	},
	get firstName(){
		return 'Nicholas'
	}
}
// 方法的 name 属性返回方法名
// 如果是取值函数，函数名前面会加上 get
// 如果是存值函数，函数名前面会加上 set
person.sayName.name // sayName
person.firstName.name // get firstName

// 有两种特殊情况: 用 bind 方法创建的函数，name 返回 bound 加上函数名字
//               用 Function 构造函数创建的函数，name 属性返回 anonymous
(new Function()).name   // anonymous
var doSomething = function(){}
doSomething.bind().name // bound doSomething 
// 并没有。。只显示了 bound

// 如果对象方法是一个 Symbol 值，则 name 属性返回的是 Symbol 值的描述
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
	[key1]() {},
	[key2]() {}.
};
obj[key1].name // '[description]'
obj[key2].name // ''
// 上述代码中，key1 对应的 symbol 值有描述，key2 对应的没有

// 4.Object.is()
// ES5 中比较两个元素是否相等，只有两个运算符：相等运算符（==）和严格相等运算符
// 它们各自有缺点，前者会自动转换数据类型，后者在比较时 NaN 不等于自身，+0 等于 －0
// JavaScript 缺乏一种运算，只要两个值是相等的，它就是相等的(不用转化)
// ES6 提出了 同值相等 的算法，不用像 == 一样进行转化，也不会比错
// Object.is 用来部署这个 同值相等 的算法，用来比较两个值是否严格相等，和 严格相等（===）类似
Object.is('foo', 'foo')  // true
Object.is({}, {})        // false 两个对象不相等，因为就像是 new 出来的，是不同的对象
// 不同之处只有两个，一是 +0 不等于 -0，二是 NaN 等于自身
// 所以用 Object.is() 方法可以进行正确的判断
Object.is(+0, -0);
Object.is(NaN, NaN);
// 相当于改掉了 === 的 bug
// ES5 可以通过下面的代码部署 Object.is()
Object.defineProperty(Object, 'is', {
	value: function(x, y){
		// 针对 +0 不等于 -0 的情况
		if(x === y){
			// 如果 x 是 0 的话，用 1 除的方法判断是否相等
			return x !== 0 || 1 / x === 1 / y;
		}
		// 针对 NaN 的情况
		// 如果 x 不等于自身并且 y 不等于自身，即 x 和 y 都是 NaN 的时候，返回 true
		return x !== x && y !== y;
	},
	configurable: true,
	enumerable: false,
	writable: true,
});
// 应该出现的结果 NaN === NaN 返回 true
//              +0 === -0 返回 false，一正一负不应该相等!!!

// 5. Object.assign()
// 用于对象方法的合并，将原对象的所有可枚举属性，复制到目标对象中。
var target = {a: 1};
var source1 = {b: 2};
var source2 = {c: 3};

Object.assign(target, source1, source2);
target   // {a: 1, b: 2, c: 3} 
// assign 至少接受两个参数，第一个参数是目标对象，后面的参数是源对象
// 三个参数一定都是对象。
// 如果原对象和目标对象有同名的属性，后面的属性会覆盖前面的。

// Object.assign 只拷贝自身属性，不可枚举的属性和继承下来的属性不会被拷贝
// 于是 defineProperty 是什么意思
Object.assign({b: 'c'},
	// invisible 不可枚举的属性
    Object.defineProperty({}, 'invisible', {
    	enumerable: false,
    	value: 'hello'
    })
)
// {b: 'c'}
// 属性名是 Symbol 的属性，也会被拷贝进去
// Object.assign 方法进行的是浅拷贝，就是如果源中某个属性的值是对象，则目标对象将得到对象得到引用
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b // 2 

// 因为拷贝的是对象的引用，所以原对象有什么变化，都会反映在目标对象上
// 对于这种嵌套的属性，如果遇到同名情况，处理的方案是替换，而不是添加在一起
// 为对象添加方法
Object.assign(someClass.prototype, {
	// 相当于 someMethod: function(arg1, arg2){}
	// 然后用这个方法将方法添加到对象上
	someMethod(arg1, arg2){

	},
	anotherMethod(){

	}
})
// 等同于下面的写法
SomeClass.prototype.someMethod = function(arg1, arg2){};
SomeClass.prototype.anotherMethod = function(){};
// 同时 Object.assign() 的第一个参数是空对象时，相当于克隆了后面的对象，保存了引用
// 不过，它只是克隆了原始对象自身的值，并没有克隆继承的值，如果想保持继承链，可以使用下面的代码
function clone(origin){
	let originProto = Object.getPrototypeOf(origin);
	return Object.assign(Object.create(originProto), origin);
}
// 合并多个对象
// 将多个对象合并到某个对象
// source 前面的 ... 表示这里的参数可以有多个
const merge = (target, ...sources) => Object.assign(target, ...sources)
// 如果希望合并之后返回一个新对象，将函数改为，将后面的源合并到前面的空目标中
const merge = (...sources) => Object.assign({}, ...sources)

// 对象有 可枚举性 属性，ES5 和 ES6 有一些操作会忽略这个属性
// 有 6 种方法可以遍历对象的属性

// 8. __proto__ 属性，Object.setPrototypeOf()，Object.getPrototypeOf() 
// 1）__proto__ 属性
// 用来读取或设置当前的对象的 prototype 浏览器都支持这个规则。所有浏览器都支持这个规则
// es6 的写法
var obj = {
	method: function(){ ... }
}
// 不要这样写，因为是浏览器内部实现的一个属性
obj.__proto__ = someOtherObj;

// es5 的写法
var obj = Object.create(someOtherObj);
obj.method = function(){ ... }

// 想写的话用下面的来写
Object.setPrototypeOf()   // 写操作
Object.getPrototypeOf()   // 读操作
Object.create()           // 生成操作

// 例子：设置原型对象
Object.setPrototypeOf(object, prototype);
var o = Object.setPrototypeOf({}, null);



// 终于到了：对象的扩展运算符！！！
// 这个是 ES7 的提案，目前 Babel 转码器已经支持该功能。
// Rest 解构赋值：用于从一个对象上取值，把所有可遍历但尚未读取的值都放到指定的对象上。
let {x, y, ...z} = {x: 1,y: 2,a: 3,b: 4};
x // 1
y // 2
z // {a: 3,b: 4}
// 上面的代码中，z 是解构赋值的对象，它获取等号右边所有未读取的值，将它们和它们的值拷贝过来
// Rest 解构赋值要求右面是一个对象，所以如果等号右面是 undefined 或 null 就会报错，因为它们无法转换为对象
let {x, y, ...z} = null;    // 运行时错误
let {x, y, ...z} = null;    // 运行时错误
// Rest 解构赋值必须是最后一个参数，否则会报错
let {...x, y, z} = obj;    // 句法错误
let {x, ...y, ...z} = obj; // 句法错误
// 这里的拷贝和 Object.assign 一样，都是浅拷贝，即得到的是引用而不是原始值
