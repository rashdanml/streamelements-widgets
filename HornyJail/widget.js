let command, commands, cooldown, challenges, url, lastUsed = 0;

function getRandom (min, max) {
  return Math.random() * (Number(max) - Number(min)) + Number(min);
}

function reset_jail() {
  // Reset Animation
  var el = document.getElementById('jail');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

function reset_jailee() {
  // Reset Animation
  var el = document.getElementById('jailee');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

function setImageUrl () {
  	$.ajax({
      url: profileUrl + jailee,
      type: 'GET',
      data: {},
      success: function (data) { $('#jailee').attr("src",data); },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
}

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj["detail"]["fieldData"];
  	commandsTrigger = fieldData["commandsTrigger"].split(",");
  	broadcaster = fieldData["broadcaster"];
  	duration = Number(fieldData["duration"]);
  	start = fieldData["startAt"].split(",");
  	end = fieldData["endAt"].split(",");
  	cooldown = fieldData["cooldown"] * 1000;
  	profileUrl = fieldData["profileUrl"];
  
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
      	time = Date.now();
       	if (event.data.text.startsWith("!")) {
        	text = event.data.text.split(" ");
          	
          	// determine thrower (user of command), receiver (@username), thrown items from chat response
          	command = text[0];
         
            if (text[1]) {
              //$('.main-container').html(jailee);
              jailee = text[1];
              setImageUrl();
            }
            else {	
              //$('.main-container').html(event.data.nick);
              jailee = broadcaster;
              setImageUrl();
            }

          	if ( commandsTrigger.includes(command) && ((time - lastUsed) > cooldown) ) {
                // randomize curvature of path
                curveBy = "Q" + getRandom(start.x,end.x) + "," + getRandom(start.y,end.y);
                path = 'path("'+startAt+curveBy+endAt+'")';
              	
                setTimeout(reset_jail(),500);
              	setTimeout(reset_jailee(),500);
          		  lastUsed = Date.now();
            }
        }
    }
});