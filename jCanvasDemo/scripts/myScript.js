/**
 * Created by ThinkPad on 2016/2/27.
 */
requirejs.config({
    // ������� baseUrl + path ȥ��
    // ����������������
    // Ends in ".js".
    // Starts with a "/".
    // Contains an URL protocol, like "http:" or "https:".
    baseUrl: 'scripts/lib',

    // paths����ָ������ģ��ļ���·��
    paths: {
        "jquery": "jquery-1.12.1.min",
        // jcanvas 符合 AMD 格式所以不用写 shim
        "jcanvas": "jcanvas"
    },
    //shim: {
    //    "jcanvas": {
    //        defs: ["jquery"],
    //        exports: "jcanvas"
    //    }
    //}
});
requirejs(["jquery", "jcanvas"],function($, jCanvas){
    $("canvas").drawArc({
        draggable: true,
        fillStyle: "green",
        x: 100, y: 100,
        radius: 50
    });
});