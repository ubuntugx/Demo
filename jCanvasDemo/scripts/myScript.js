/**
 * Created by ThinkPad on 2016/2/27.
 */
requirejs.config({
    // 下面的用 baseUrl + path 去找
    // 除非以下三种情况：
    // Ends in ".js".
    // Starts with a "/".
    // Contains an URL protocol, like "http:" or "https:".
    baseUrl: 'scripts/lib',

    // paths属性指定各个模块的加载路径
    paths: {
        "jquery": "jquery-1.12.1.min",
        "jcanvas": "jcanvas"
    }
});
requirejs(["jquery", "jcanvas"],function($, jCanvas){

});