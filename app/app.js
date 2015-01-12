(function () {
    var data = aKa.Data.getLocalData(true),
        events = new aKa.collection.Events();

    events.add(data);

    var eventTable = new aKa.view.EventTable({
        collection : events
    });

    //add Events table to existing DOM
    $('#eventTable').html(eventTable.$el);

    //apply Backbone view to form
    var form = new aKa.view.EventForm({
        el : '#addEvent'
    });
})();