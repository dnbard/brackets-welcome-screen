define(function(require, exports, module){
    var React = brackets.getModule('thirdparty/react'),
        DOM = React.DOM,
        ProjectsStore = require('../stores/projects'),
        ProjectComponent = require('./project');

    var Toolbar = React.createClass({
        getInitialState: function(){
            return {
                projects: ProjectsStore.projects || []
            }
        },
        componentDidMount: function(){
            this.onProjectsUpdate = function(projects){
                this.setState({ projects: projects });
            }.bind(this);

            ProjectsStore.bind('changed', this.onProjectsUpdate);
        },
        componentWillUnmount: function(){
            ProjectsStore.unbind('changed', this.onProjectsUpdate);
        },
        render: function(){
            return DOM.div({ className: 'ws-toolbar'},[
                DOM.button({ className: 'ws-close', onClick: this.props.onClose }, 'x'),
                DOM.div({ className: 'ws-logo' },
                    DOM.span({ className: 'ws-logo__icon' })),
                DOM.div({ className: 'ws-header' }, 'Start'),
                DOM.div({}, [
                    DOM.div({ className: 'ws-option' }, 'Open a Project'),
                    DOM.div({ className: 'ws-option' }, 'Choose a Theme'),
                    DOM.div({ className: 'ws-option' }, 'Learn some Shortcuts')
                ]),
                DOM.div({ className: 'ws-header' }, 'Recent'),
                DOM.div({}, this.state.projects.map(function(project){
                    return ProjectComponent({ name: project.folder, path: project.path });
                }))
            ]);
        }
    });

    module.exports = Toolbar;
});
