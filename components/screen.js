define(function(require, exports, module){
    var React = brackets.getModule('thirdparty/react'),
        ProjectManager = brackets.getModule('project/ProjectManager'),
        DOM = React.DOM,
        DocumentsStore = require('../stores/documents'),
        ToolbarComponent = require('./toolbar'),
        dispatcher = require('../services/dispatcher'),
        Actions = require('../enums/actions');

    var Screen = React.createClass({
        getInitialState: function(){
            return { visible: true }
        },
        onCloseHandler: null,
        componentWillMount: function(){
            if (this.onCloseHandler === null){
                this.onCloseHandler = function(){
                    this.setState({ visible: false });
                }.bind(this);
            }

            DocumentsStore.bind('changedOpenFiles', function(numberOfOpenFiles){
                this.setState({ visible: numberOfOpenFiles === 0 });
            }.bind(this));

            ProjectManager.on('projectOpen', function(){
                this.setState({ visible: DocumentsStore.numberOfOpenFiles === 0 });
            }.bind(this));

            dispatcher.bind(Actions.CLOSE, this.onCloseHandler);
        },
        componentWillUnmount: function(){
            dispatcher.unbind(Actions.CLOSE, this.onCloseHandler);
        },
        onClose: function(){
            this.setState({ visible: false });
        },
        render: function(){
            if (this.state.visible){
                return DOM.div({ className: 'ws-inner' }, [
                    ToolbarComponent({ onClose: this.onClose })
                ]);
            } else {
                return DOM.div({ style:{ display: 'none' } });
            }
        }
    });

    return Screen;
});
