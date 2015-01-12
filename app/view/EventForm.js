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

        //TODO: ...
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

        if (!m) {
            m = new aKa.model.Event();
        }

        //validate/sanitize the model
        var error = m.set(values, { validate : true });

        if (error === false) {
            //TODO: display error message
            return;
        }

        m.save();
        //TODO: fire event, passing new/updated model
        this.resetForm();
    },

    resetForm : function () {
        this.model = null;

        //clear form fields
        this.$el[0].reset();
    }
});