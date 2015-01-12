aKa.view.EventForm = Backbone.View.extend({
    model : null, //aKa.model.Event,

    events : {
        'click input[type=submit]' : 'onUpdateEvent'
    },

    initialize : function () {
        aKa.EventBus.on('editmodel', this.onEditModel, this);
    },

    onEditModel : function (model) {
        this.model = model;

        _.each(this.$('input'), function(field) {
            if (field.name) {
                field.value = model.get(field.name);
            }
        });
    },

    onUpdateEvent : function (e) {
        //don't actually submit the form
        e.preventDefault();

        var m = this.model,
            values = {},
            newModel = false;

        _.each(this.$('input'), function(field) {
            if (field.name) {
                values[field.name] = field.value
            }
        });

        if (!m) {
            m = new aKa.model.Event();
            newModel = true;
        }

        //validate/sanitize the model
        var error = m.set(values, { validate : true });

        if (error === false) {
            //TODO: display error message
            return;
        }

        m.save();
        if (newModel) { aKa.EventBus.trigger('newmodel', m); }

        this.resetForm();
    },

    resetForm : function () {
        this.model = null;

        //clear form fields
        this.$el[0].reset();
    }
});