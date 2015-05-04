define(function(require, exports, module){
    var AppInit = brackets.getModule('utils/AppInit'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        React = brackets.getModule('thirdparty/react'),
        ScreenComponent = require('./components/screen');

    ExtensionUtils.loadStyleSheet(module, 'styles/main.less');

    AppInit.appReady(function(){
        var contentNode = $('<div class="ws-content"></div>');
        $('.main-view .content').append(contentNode);

        React.renderComponent(ScreenComponent({

        }), contentNode[0]);
    });
});
