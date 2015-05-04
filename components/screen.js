define(function(require, exports, module){
    var React = brackets.getModule('thirdparty/react'),
        DOM = React.DOM,
        DocumentsStore = require('../stores/documents'),
        ToolbarComponent = require('./toolbar');

    var Screen = React.createClass({
        getInitialState: function(){
            return {
                visible: DocumentsStore.numberOfOpenFiles === 0
            }
        },
        componentWillMount: function(){
            DocumentsStore.bind('changedOpenFiles', function(numberOfOpenFiles){
                this.setState({ visible: numberOfOpenFiles === 0 });
            }.bind(this));
        },
        render: function(){
            if (this.state.visible){
                return DOM.div({
                    className: 'ws-inner'
                }, [
                    ToolbarComponent()
                ]);
            } else {
                return DOM.div({ style:{ display: 'none' } });
            }
        }
    });

    return Screen;
});
