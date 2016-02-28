/**
 * Created by ThinkPad on 2016/2/28.
 */
// node.js 是 JavaScript 在服务器端编程
// 参照 CommonJS 规范，在 CommonJS 中，有一个全局性的方法 require() 用于加载模块
// var math = require("math");  // 加载数学模块 math.js
// math.add(2,3);   // 5

// 但是 CommonJS 在浏览器端却不适用，第二行math.add(2,3)，一定要在第一行之后运行
// 因此必须等 math.js 模块加载完成，而在浏览器端，等待的时间取决于网速的快慢，可能会等很长时间，让浏览器处于假死状态

// 于是出现了 AMD (Asynchronous Module Definition) 异步加载模块
// 用异步的方式加载模块，模块的加载不影响后面语句的运行。
// 所有依赖这个模块的语句，都定义在一个回调函数中，等它加载完成后，这个回调函数才会执行。
// AMD 也用 require() 加载模块，不同的是它要求两个参数，第二个参数是回调函数
// require(["math"],function(math){
//     math.add(2,3);
// });
// 这样不会使浏览器发生假死。
// 目前有两个库实现了 AMD 规范，requireJS 和 curlJS