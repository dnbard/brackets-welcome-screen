define(function(require, exports, module){
    var React = brackets.getModule('thirdparty/react'),
        ProjectManager = brackets.getModule('project/ProjectManager'),
        DOM = React.DOM,
        ColorsService = require('../services/colors'),
        colors = new ColorsService(),
        dispatcher = require('../services/dispatcher'),
        Actions = require('../enums/actions');

    var Project = React.createClass({
        getInitialState: function(){
            return {
                initial: this.props.name.length > 0 ? this.props.name[0].toUpperCase() : '#',
                color: colors.get(this.props.name)
            };
        },
        onProjectClick: function(){
            ProjectManager.openProject(this.props.path);
            dispatcher.trigger(Actions.CLOSE);
        },
        render: function(){
            return DOM.div({ className: 'ws-project', onClick: this.onProjectClick }, [
                DOM.div({ className: 'ws-project__logo', style: { background: this.state.color } }, this.state.initial),
                DOM.div({ className: 'ws-project__inner' }, [
                    DOM.div({ className: 'ws-project__name' }, this.props.name),
                    DOM.div({ className: 'ws-project__path' }, this.props.path)
                ])
            ]);
        }
    });

    return Project;
});
