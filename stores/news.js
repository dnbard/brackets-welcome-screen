define(function(require){
    var data = null,
        microEvent = require('../vendor/microevent');

    function NewsStore(){
        $.ajax({
            contentType: "application/json",
            dataType: 'json',
            url:'http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://blog.brackets.io/feed/',
            success: function(response){
                var data = response.responseData,
                    feed = data.feed,
                    entries = feed.entries;

                this.trigger('changed', { entries: entries })
            }.bind(this),
            method: 'GET'
        });
    }

    return microEvent.mixin(new NewsStore());
});
