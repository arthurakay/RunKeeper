aKa.view.EventTable = Backbone.View.extend({
    collection : aKa.collection.Events,

    tagName : 'table',

    className : 'aka-event-table',

    initialize : function () {
        //render all of the existing events in the collection
        this.renderRows();

        aKa.EventBus.on('newmodel', this.newEvent, this);
    },

    addEvent : function(event) {
        var row = new aKa.view.EventView({
            model : event
        });

        this.$el.append(row.$el);
    },

    newEvent : function(event) {
        this.collection.add(event);

        //TODO: is there a more efficient/smoother way of doing this?
        this.$el.html('');
        
        this.renderRows();
    },

    renderRows : function() {
        _.each(this.collection.models, this.addEvent, this);
    }
});