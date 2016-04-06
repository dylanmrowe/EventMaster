/**
 * Created by Andrew on 4/2/2016.
 */

function renderAllActiveEvents() {
    $.getJSON("allEvents.json", function(data) {
        var events = data.events;

        var eventContainer = $(".events");
        eventContainer.html("");

        events.forEach(function(event) {
            if (!event.trashed) {
                renderEvent(event, eventContainer);
            }
        });
    })

}

function renderFutureEvents() {
    $.getJSON("allEvents.json", function(data) {
        var events = data.events;

        var eventContainer = $(".events");
        eventContainer.html("");

        events.forEach(function(event) {
            if (!event.trashed) {
                var eventDate = moment(event.eventDate + ' ' + event.eventTime);
                if (eventDate.isAfter(Date.now())) {
                    renderEvent(event, eventContainer);
                }
            }
        });
    })

}

function renderTrashedEvents() {
    $.getJSON("allEvents.json", function(data) {
        var events = data.events;

        var eventContainer = $(".events");
        eventContainer.html("");

        events.forEach(function(event) {
            if (event.trashed) {
                var eventDate = moment(event.eventDate + ' ' + event.eventTime);
                if (eventDate.isAfter(Date.now())) {
                    renderEvent(event, eventContainer);
                }
            }
        });
    })

}

function renderEvent(event, eventContainer) {
    var img = event.eventImg;
    var description = event.eventDescription;
    var eventDate = moment(event.eventDate + ' ' + event.eventTime);

    //var action = '';
    //if (eventDate.isBefore(Date.now())) {
    //    action = '<button class="smallButton">Rate Event</button>';
    //}
    //else if (event.trashed) {
    //    action = '<button class="smallButton">Remove</button>';
    //}
    //else {
    //    action = '<label><input type="checkbox" name="attendingStatus" value="going" class="checkbox">Going</label>';
    //}

    eventContainer.append("" +
        '<div class="eventContainer">' +
        '   <a href="#" class="eventLink">' +
        '      <div class="event">' +
        '          <img src="' + img + '" class="eventPhoto">' +
        '          <div class="eventDetails">' +
        '          <p class="eventDescription">' + description + '</p>' +
        '          <p class="dateAndTime">' + eventDate.format('MMMM Do [@] h:mm a') + '<br> &nbsp </p>' +
        '      </div>' +
        '   </a>' +
        '</div>');
}

function renderEventLarge(event, eventContainer) {

    var img = event.eventImg;
    var description = event.eventDescription;
    var eventDate = moment(event.eventDate + ' ' + event.eventTime);

    eventContainer.append("" +
        '<div class="large-event-container">' +
        '   <a href="#" class="eventLink">' +
        '       <div class="event">' +
        '           <img src="' + img + '" class="eventPhoto">' +
        '           <p class="eventDescription">' + description + '</p>' +
        '           <p class="dateAndTime">' + eventDate.format('ddd, MMM h:mm a') + '<br> &nbsp </p>' +
        '           <div class="eventDetails">' +
        '       </div>' +
        '   </a>' +
        '</div>');
}