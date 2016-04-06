/**
 * Created by Andrew on 4/2/2016.
 */

function renderAllActiveEvents() {
    $.getJSON("allEvents.json", function(data) {
        var events = data.events;

        var eventContainer = $(".events");
        eventContainer.html("");

        events.forEach(function(event) {
            if (event.attendingStatus == "interested" || event.attendingStatus == "going") {
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
            if (event.attendingStatus == "going" && event.notification == "true") {
                var eventDate = moment(event.eventDate + ' ' + event.eventTime);
                renderEvent(event, eventContainer);
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
            if (event.attendingStatus == "trashed") {
                var eventDate = moment(event.eventDate + ' ' + event.eventTime);
                renderEvent(event, eventContainer);
            }
        });
	
    })

}

function renderEvent(event, eventContainer) {
    var img = event.eventImg;
    var description = event.eventDescription;
    var eventDate = moment(event.eventDate + ' ' + event.eventTime);

    var action = '';
    if (eventDate.isBefore(Date.now())) {
        action = '<button class="smallButton">Rate Event</button>';
    }
    else if (event.attendingStatus == "trashed") {
        action = '<button class="smallButton">Remove</button>';
    }

    eventContainer.append("" +
        '<div class="eventContainer">' +
        '<a href="#" class="eventLink">' +
        '<div class="event">' +
        '<img src="' + img + '" class="eventPhoto">' +
        '<div class="eventDetails">' +
        '<p class="eventDescription">' + description + '</p>' +
        '<p class="dateAndTime"> ' + eventDate.format('MMMM Do [@] h:mm a') + '<br> &nbsp </p>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>');
}