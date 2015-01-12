aKa.view.EventTable = Backbone.View.extend({
    collection : aKa.collection.Events,

    tagName : 'table',

    className : 'aka-event-table',

    events : {
        //TODO: listen for when new models are added
    },

    initialize : function () {
        var events = this.collection;

        //render all of the existing events in the collection
        _.each(events.models, this.addEvent, this);

        //this.collection.on('change', function() {
        //    debugger;
        //
        //    //this.render();
        //});
    },

    addEvent : function(event) {
        var row = new aKa.view.EventView({
            model : event
        });

        this.$el.append(row.$el);
    }
});