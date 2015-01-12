aKa.model.Event = Backbone.Model.extend({
    defaults : {
        date     : '2015-01-01',
        name     : 'Default Event Name',
        location : '',
        cost     : 0
    },

    cid : 'cid',

    reDate : /[\d]{4}\-[\d]{2}\-[\d]{2}/,
    reText : /[.]*/gi,
    reNum  : /[\d]/,

    saveLocalData : function() {
        var cid = this.get('cid');

        //for newly-created models, be sure they're added to localStorage
        if (!cid || !aKa.Data.getModel(cid)) {
            aKa.Data.addModel(this.toJSON());
        }
        else {
            aKa.Data.saveModel(cid, this.toJSON());
        }
    },

    validate : function(attrs, options) {
        if (!this.reDate.test(attrs.date)) { return 'The model must have a valid DATE.'; }
        if (!this.reText.test(attrs.name)) { return 'The model must have a valid NAME.'; }
        if (!this.reText.test(attrs.location)) { return 'The model must have a valid LOCATION.'; }
        if (!this.reNum.test(attrs.cost)) { return 'The model must have a valid COST.'; }
    },

    //OVERRIDE the default save() method because we are saving things via localStorage
    save: function(key, val, options) {
        var attrs, method, attributes = this.attributes;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (key == null || typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        options = _.extend({validate: true}, options);

        // If we're not waiting and attributes exist, save acts as
        // `set(attr).save(null, opts)` with validation. Otherwise, check if
        // the model will be valid when the attributes, if any, are set.
        if (attrs) {
            if (!this.set(attrs, options)) return false;
        }

        this.saveLocalData();

        return this;
    }
});