/**
 * Created by ThinkPad on 2016/2/28.
 */
// javascript 模块的基本写法
// 声明了一个匿名函数，自动执行
// 这样内部声明的变量就不会被读取
var module = (function(){
    var _count = 0;
    var m1 = function(){};
    var m2 = function(){};
    return {
        m1: m1,
        m2: m2
    }
})();

// 模块的放大模式
// 一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，就要采用放大模式了
// 给 module1 添加一个新方法 m3()，然后返回新的 module1 模块
// 最后的括号里是函数的参数，这里把 module1 作为参数又传了进去，给它赋属性 m3
var module1 = (function(mod){
    mod.m3 = function(){

    };
    return mod;
})(module1);

// 上面 m1 m2（: 左面的），m3 都相当于对象的属性？？？

// 宽放大模式
// 在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。
// 如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。
// 这样 立即执行函数 的参数可以是一个空对象
var module2 = (function(mod){
    return mod
})(window.module2 || {});

// 输入全局变量
// 独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。
// 为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
var module4 = (function($, YAHOO){

})(jQuery, YAHOO);