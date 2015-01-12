aKa.model.Event = Backbone.Model.extend({
    defaults : {
        date     : '2015-01-01',
        name     : 'Default Event Name',
        location : '',
        cost     : 0
    },

    cid : 'cid',

    initialize : function() {
        var cid = this.get('cid');

        //for newly-created models, be sure they're added to localStorage
        if (!cid || !aKa.Data.getModel(cid)) {
            aKa.Data.addModel(this.toJSON());
        }
    }
});