/**
 * Created by Andrew on 4/2/2016.
 */


function getEvents(callback) {
    $.getJSON("allEvents.json", function(data) {
        var events = data.events;
        callback(events);
    });
}

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
    });

}

function renderFutureEvents() {
    $.getJSON("allEvents.json", function(data) {
        var events = data.events;

        var eventContainer = $(".events");
        eventContainer.html("");

        events.forEach(function(event) {
            if (event.attendingStatus == "going" && event.notification == "true") {
                //var eventDate = moment(event.eventDate + ' ' + event.eventTime);
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
                //var eventDate = moment(event.eventDate + ' ' + event.eventTime);
                renderEvent(event, eventContainer);
            }
        });
	
    })

}

function renderEvent(event, eventContainer) {
    var img = event.eventImg;
    var description = event.eventName;
    var sampleString = "Polka Party";
    var eventDate = moment(event.eventDate + ' ' + event.eventTime);

    //var action = '';
    //if (eventDate.isBefore(Date.now())) {
    //    action = '<button class="smallButton">Rate Event</button>';
    //}
    //else if (event.attendingStatus == "trashed") {
    //    action = '<button class="smallButton">Remove</button>';
    //}

    eventContainer.append("" +
        '<div class="eventContainer">' +
        '   <a onclick="showBigPage(\''+event.eventName+'\')" href="#" class="eventLink">' +
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

    var name = event.eventName;
    var img = event.eventImgBig ? event.eventImgBig : event.eventImg;
    var description = event.eventDescription;
    var eventDate = moment(event.eventDate + ' ' + event.eventTime);
    var friends = event.friendsGoing;

    eventContainer.append("" +
        '<div class="large-event-container undraggable">' +
        '   <div class="event">' +
        '       <img src="' + img + '" class="eventPhotoLarge undraggable">' +
        '       <div class="eventInfo smallLines">' +
        '           <h2>' + name + '</h2>' +
        '           <div class="dateAndTime smallLines"><em>' + eventDate.format('ddd, MMM h:mm a') + '</em><br> &nbsp </div>' +
        '           <div class="eventDescription smallLines">' + description + '</div>' +
        '           <br> <br> <div class="friendsGoing ">' +
        '              <div><b>Friends Going:</b> <br> -  ' + friends.join(', ') + '</div>' +
 //       '              <br><div class="">' + friends.join(', ') + '</div>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>');
}

function showBigPage(eventName){
    var eventList = [];
    var index = 0;
    var eventContainer = $(".savedEvents");


    getEvents(function(events) {

        eventList = events;
        eventContainer.html("");

        while (events[index].eventName != eventName) {
            index++;
        }

        renderEventLarge(events[index], eventContainer);

        $("body").mouseup(function(e) {
            RELEASE(e
                    , function() {
                        //index++;
                        if (index < eventList.length) {
                            index++;
                            /*while(events[index].attendingStatus != "interested" || events[index].attendingStatus != "going"){
                                
                                if(index >= eventList.length){
                                    return;
                                }
                                index++;
                            }*/
                            eventContainer.html("");
                            renderEventLarge(events[index], eventContainer);
                        }
                        else {
                            return;
                        }
                    }
                    , function() {
                    if (index > 0) {
                        index--;
                        eventContainer.html("");
                        renderEventLarge(events[index], eventContainer);
                    }
                    else {
                        var url = document.URL;
                        location.replace(url.replace("searchEvents", "search"));
                    }
                }
            );
        });
        $("body").mousedown(PRESS);
        console.log("searchEvent swiping ready");
    });
}