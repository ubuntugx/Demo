/**
 * Created by ThinkPad on 2016/2/27.
 */
requirejs.config({
    // ������� baseUrl + path ȥ��
    // �����������������
    // Ends in ".js".
    // Starts with a "/".
    // Contains an URL protocol, like "http:" or "https:".
    baseUrl: 'scripts/lib',

    // paths����ָ������ģ��ļ���·��
    paths: {
        "jquery": "jquery-1.12.1.min",
        "jcanvas": "jcanvas"
    }
});
requirejs(["jquery", "jcanvas"],function($, jCanvas){

});