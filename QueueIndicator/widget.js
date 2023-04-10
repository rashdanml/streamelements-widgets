let subGoal, subCurrent, commandsPri, commandsLive, commandsAll, command, broadcaster, api, interval, requestStatus = 0;

function fetch_queue_status () {
  fetch(api)
    .then(res => res.json())
    .then((out) => {
		if (out.requestsActive == true) {
         	$("span.free span.dotRed").addClass("dotGreen");
        }
    	else if (out.requestsActive == false) {
         	$("span.free span.dotGreen").removeClass("dotGreen");
        }
  })
    .catch(err => { throw err });
}

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj["detail"]["fieldData"];
  	subGoal = fieldData["subGoal"];
  	subCurrent = obj["detail"]["session"]["data"]["subscriber-session"]["count"];
  	commandsPri = fieldData["commandsPri"].split(",");
  	commandsLive = fieldData["commandsLive"].split(",");
  	commandsAll = fieldData["commandsAll"].split(",");
  	broadcaster = fieldData["broadcaster"];
  
  	interval = 5000;
  
  	api = new URL(broadcaster + "/", "https://api.streamersonglist.com/v1/streamers/").toString();
  	
  	setInterval(fetch_queue_status, interval);
});

window.addEventListener('onEventReceived', function (obj) {
    const listener = obj.detail.listener;
  	const event = obj.detail.event;
  
  	if (listener == "message") {
       	if ( (event.data.nick == broadcaster || event.data.nick == "rashdanml" || parseInt(event.data.tags.mod)) && event.data.text.startsWith("!")) {
          text = event.data.text.split(" ");
          command = text[0];
          //$('.test').html(command);
          //$('.main-container').html(text);
          
          if (commandsPri.includes(command)) {
            $("span.priority span.dotRed").toggleClass("dotGreen");
          } 
          else if (commandsLive.includes(command)) {
            $("span.live span.dotRed").toggleClass("dotGreen");
          }
          else if (commandsAll.includes(command)) {
            $("span.priority span.dotRed").toggleClass("dotGreen");
            $("span.live span.dotRed").toggleClass("dotGreen");
          }
        }
    }
});

window.addEventListener('onEventReceived', function (obj) {
    const event = obj.detail.event;
        if (event.listener === 'widget-button') {
          	//$('.test').html("button pressed");
			if (event.field == "priButton") {
             	$("span.priority span.dotRed").toggleClass("dotGreen"); 
            }
            else if (event.field == "liveButton") {
             	$("span.live span.dotRed").toggleClass("dotGreen"); 
            }
         	else if (event.field == "allButton") {
             	$("span.priority span.dotRed").toggleClass("dotGreen");
              	$("span.live span.dotRed").toggleClass("dotGreen"); 
            }
        }
});