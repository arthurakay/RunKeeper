if (!window.aKa) {
    aKa = {
        model      : {},
        view       : {},
        collection : {},

        EventBus : _.extend({}, Backbone.Events)
    };
}