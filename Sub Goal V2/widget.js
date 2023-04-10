let command, commands, cooldown, challenges, imageUrl, time, lastUsed = 0;

window.addEventListener('onWidgetLoad', function (obj) {
	fieldData = obj["detail"]["fieldData"];
  	subGoal = fieldData["subGoal"];
  	commandsTrigger = fieldData["commandsTrigger"].split(",");
  	subCurrent = obj["detail"]["session"]["data"]["subscriber-session"]["count"];
  	//subCurrentTest = Number(fieldData["subCurrentTest"]);
  	autoIncrement = fieldData["autoIncrement"];
	autoIncrementBy = Number(fieldData["subGoalIncrement"]);
  
  	$('.subCurrent').html(subCurrent);
  	$('.subGoal').html(subGoal);
	//$('.main-container').html(JSON.stringify(subGoal));
});

window.addEventListener('onEventReceived', function (obj) {
	const listener = obj.detail.listener;
  	const event = obj.detail.event;
  
  	if (listener == "message") {
	   	if ( (event.data.nick == broadcaster || event.data.nick == "rashdanml" || parseInt(event.data.tags.mod)) && event.data.text.startsWith("!")) {
		  text = event.data.text.split(" ");
		  if ( text.length == 1 ) {
			command = text[0];
			subGoal = "69";
			
		  }          
		  else if ( text.length == 2 ) {
		  	command = text[0].toString();
			subGoal = text[1].toString();
		  }
		  
		  if ( commandsTrigger.includes(command) ) {   
			SE_API.setField("subGoal", subGoal)
			$('.subGoal').html(subGoal);
		  }
		}
	}
});

window.addEventListener('onEventReceived', function (obj) {
	const listener = obj.detail.listener;
  	const event = obj.detail.event;
  
  	if (listener == "subscriber-latest") {
	   	//subCurrentTest += 1;
	  	//SE_API.setField("subCurrentTest", subCurrentTest)
	  	subCurrent += 1;
	  	$('.subCurrent').html(subCurrent);
	  
	  	if (autoIncrement && subCurrent >= subGoal) {
		  	subGoal += autoIncrementBy;
		  	SE_API.setField("subGoal", subGoal)
			$('.subGoal').html(subGoal);
		}
	}
});