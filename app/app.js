(function () {
    var eventTable = new aKa.view.EventTable();

    //add Events table to existing DOM
    $('#eventTable').html(eventTable.$el);

    //apply Backbone view to form
    var form = new aKa.view.EventForm({
        el : '#addEvent'
    });
})();