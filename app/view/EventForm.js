aKa.view.EventForm = Backbone.View.extend({
    model : null, //aKa.model.Event,

    events : {
        'click input[type=submit]' : 'onUpdateEvent'
    },

    initialize : function () {
        //TODO: this doesn't work
        this.listenTo($('body'), 'editmodel', this.onEditModel);
    },

    onEditModel : function (model) {
        this.model = model;
    },

    onUpdateEvent : function () {
        var m = this.model;

        if (!m) {
            m = new aKa.model.Event({

            });
        }

        //TODO: fire event, passing new/updated model


        this.resetForm();
    },

    resetForm : function () {
        this.model = null;

        //clear form fields?
    }
});