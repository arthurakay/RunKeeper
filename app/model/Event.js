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

        if (!cid || !aKa.Data.getModel(cid)) {
            aKa.Data.addModel(this.toJSON());
        }
    }
});