define(function(require){
    var microEvent = require('../vendor/microevent'),
        MainViewManager = brackets.getModule('view/MainViewManager');

    function DocumentsStore(){
        this.numberOfOpenFiles = MainViewManager.getAllOpenFiles().length;
        MainViewManager.on('activePaneChange', this.checkOpenFiles.bind(this));
        MainViewManager.on('workingSetAdd', this.checkOpenFiles.bind(this));
        MainViewManager.on('workingSetAddList', this.checkOpenFiles.bind(this));
        MainViewManager.on('workingSetRemove', this.checkOpenFiles.bind(this));
        MainViewManager.on('workingSetRemoveList', this.checkOpenFiles.bind(this));
    };

    DocumentsStore.prototype.checkOpenFiles = function(){
        var currentNumberOfOpenFiles = MainViewManager.getAllOpenFiles().length;

        if (this.numberOfOpenFiles !== currentNumberOfOpenFiles){
            this.numberOfOpenFiles = currentNumberOfOpenFiles;
            this.trigger('changedOpenFiles', this.numberOfOpenFiles);
        }
    }

    return microEvent.mixin(new DocumentsStore());
});
