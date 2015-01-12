aKa.view.EventView = Backbone.View.extend({
    tagName : 'tr',

    className : 'aKa-event-row',

    events : {
        'click td.eventOptions>button.delete' : 'onDeleteHandler',
        'click td.eventOptions>button.edit'   : 'onEditHandler'
    },

    template : _.template([
        '<td class="eventDate"><%= date %></td>',
        '<td class="eventName"><%= name %></td>',
        '<td class="eventLocation"><%= location %></td>',
        '<td class="eventCost">$<%= cost %></td>',
        '<td class="eventOptions">',
        '    <button class="edit">Edit</button>',
        '    <button class="delete">Delete</button>',
        '</td>'
    ].join('')),

    initialize : function () {
        this.listenTo(this.model, 'change', this.render);

        this.render();
    },

    render : function () {
        var me = this;

        me.$el.html(me.template(me.model.attributes));

        return me;
    },

    onDeleteHandler : function () {
        var me = this;

        //TODO: show mask

        me.model.destroy({
            success : function(model, notSure, request) {
                aKa.Data.removeModel(model.get('cid'));

                //remove from the DOM
                me.remove();
            }
        });
    },

    onEditHandler : function (eventObj) {
        aKa.EventBus.trigger('editmodel', this.model);
    }
});