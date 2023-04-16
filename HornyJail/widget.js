let command, commands, cooldown, challenges, url = 0;

function getRandom (min, max) {
  return Math.random() * (Number(max) - Number(min)) + Number(min);
}

function reset_animation() {
  // Reset Animation
  var el = document.getElementByClassName('throw');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj["detail"]["fieldData"];
  	commandsTrigger = fieldData["commandsTrigger"].split(",");
  	broadcaster = fieldData["broadcaster"];
  	duration = Number(fieldData["duration"]);
  	start = fieldData["startAt"].split(",");
  	end = fieldData["endAt"].split(",");
  
  	path = fieldData["path"];
  
  	start = {"x":start[0],"y":start[1]};
  	end = {"x":end[0],"y":end[1]};
  
  	$('div.thrower').css("top",start.y+"px");
  	$('div.thrower').css("left",start.x+"px");
  
  	//$('.main-container').html(start.x + ";" + end.x);
  
  	startAt = "M"+start.x+","+start.y+" ";
    endAt =  " "+String(Number(end.x))+","+String(Number(end.y));
  
	//$('.curve').html(url);
  	//$('.main-container').hide();
    //$('#path path').attr("d",path);
  	
});

window.addEventListener('onEventReceived', function (obj) {
    const listener = obj.detail.listener;
  	const event = obj.detail.event;
  
  	if (listener == "message") {
       	if (event.data.text.startsWith("!")) {
        	text = event.data.text.split(" ");
          	
          	// determine thrower (user of command), receiver (@username), thrown items from chat response
          	command = text[0];
          	//$('.main-container').html(thrower + "," + item + "," + receiver);
          
          	if (commandsTrigger.includes(command)) {
                // randomize curvature of path
                curveBy = "Q" + getRandom(start.x,end.x) + "," + getRandom(start.y,end.y);
                path = startAt+curveBy+endAt;
                SE_API.setField("path", path);

                //$('.curve').html(data[item])        	

                setTimeout(reset_animation, 500);

                //$("div#item").addClass("motion")
                //$('.motion-demo').toggle();
            }
        }
    }
});