define(function(require){
    var microEvent = require('../vendor/microevent'),
        FileUtils = brackets.getModule('file/FileUtils'),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        ProjectManager = brackets.getModule('project/ProjectManager');

    function getProjectList(){
        var recentProjects = PreferencesManager.getViewState('recentProjects') || [],
            requiredProjects = [],
            i;

        for (i = 1; i < recentProjects.length; i++) {
            requiredProjects[i - 1] = parsePath(FileUtils.stripTrailingSlash(ProjectManager.updateWelcomeProjectPath(recentProjects[i] + "/")));
        }

        return requiredProjects;
    }

    function parsePath(path) {
        var lastSlash = path.lastIndexOf("/"), folder, rest;
        if (lastSlash === path.length - 1) {
            lastSlash = path.slice(0, path.length - 1).lastIndexOf("/");
        }
        if (lastSlash >= 0) {
            rest = " - " + (lastSlash ? path.slice(0, lastSlash) : "/");
            folder = path.slice(lastSlash + 1);
        } else {
            rest = "/";
            folder = path;
        }

        return {path: path, folder: folder, rest: rest};
    }

    function ProjectsStore(){
        this.projects = getProjectList();

        ProjectManager.on('projectOpen', function(){
            setTimeout(function(){
                this.projects = getProjectList();
                this.trigger('changed', this.projects);
            }.bind(this), 100);
        }.bind(this));
    };

    return microEvent.mixin(new ProjectsStore());
});
