define(function(require, exports, module){
    var React = brackets.getModule('thirdparty/react'),
        DOM = React.DOM;

    var Project = React.createClass({
        render: function(){
            return DOM.div({ className: 'ws-project' }, [
                DOM.div({ className: 'ws-project__name' }, this.props.name),
                DOM.div({ className: 'ws-project__path' }, this.props.path)
            ]);
        }
    });

    return Project;
});
