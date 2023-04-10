let cooldown, api_url, url;

function fetch_current_song () {
  fetch(url.queue)
    .then(res => res.json())
    .then((out) => {
    $('.artist').html(out.list[0].song.artist);
    $('.song').html(out.list[0].song.title);
    $('.requested').html(out.list[0].requests.map(req => `${ req.name }${ req.amount ? `(${ symbol }${ req.amount })`:""}`).join(", "));
    //$('.main-container').html(JSON.stringify();
  })
    .catch(err => { throw err });
}

window.addEventListener('onWidgetLoad', function (obj) {
    const fieldData = obj["detail"]["fieldData"];
  	interval = fieldData["interval"] * 1000;
  	broadcaster = fieldData["broadcaster"];
  	symbol = fieldData["currency_symbol"];
  	api = new URL(broadcaster + "/", "https://api.streamersonglist.com/v1/streamers/").toString();
  	url = {"queue": new URL("queue", api).toString(), "songs": new URL("songs", api).toString()};
  	//$('.main-container').html(JSON.stringify(url.queue));

  	setInterval(fetch_current_song, interval);
});