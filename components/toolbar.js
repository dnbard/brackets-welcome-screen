define(function(require, exports, module){
    var React = brackets.getModule('thirdparty/react'),
        DOM = React.DOM,
        ProjectsStore = require('../stores/projects');

    var Toolbar = React.createClass({
        getInitialState: function(){
            return {
                projects: ProjectsStore.projects || []
            }
        },
        render: function(){
            return DOM.div({
                className: 'ws-toolbar'
            },[
                DOM.div({
                    className: 'ws-logo'
                }, DOM.span({ className: 'ws-logo__icon' })),
                DOM.div({
                    className: 'ws-header'
                }, 'Start'),
                DOM.div({
                    className: 'ws-header'
                }, 'Recent'),
                DOM.div({}, this.state.projects.map(function(project){
                    return DOM.div({ className: 'ws-project' }, [
                        DOM.div({ className: 'ws-project__name' }, project.folder),
                        DOM.div({ className: 'ws-project__path' }, project.path)
                    ]);
                }))
            ]);
        }
    });

    module.exports = Toolbar;
});
