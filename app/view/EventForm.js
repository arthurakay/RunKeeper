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

    onUpdateEvent : function (e) {
        //don't actually submit the form
        e.preventDefault();

        var m = this.model,
            values = {};

        _.each(this.$('input'), function(field) {
            if (field.name) {
                values[field.name] = field.value
            }
        });

        //TODO: validate/sanitize the model

        if (!m) {
            m = new aKa.model.Event(values);

            //TODO: fire event, passing new/updated model
        }
        else {
            //TODO: apply values to existing model
        }

        this.resetForm();
    },

    resetForm : function () {
        this.model = null;

        //clear form fields
        this.$el[0].reset();
    }
});