var playlist = [
	{
		"song"    : "Eu não sou racista",
		"album"   : "N/A",
		"artist"  : "Nego Max ",
		"artwork" : "https://images.genius.com/451b9cb2cdb3eaba4dd275e63e8ef7ba.400x400x1.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/eunaosouracsita.mp3"
	},
	{
		"song"    : "APAGA LUZ APAGA TUDO CHALLENGE",
		"album"   : "Detona Funk",
		"artist"  : "MC Topre (DJ TN Beat, DJ TS, DJ Duarte)",
		"artwork" : "https://i1.sndcdn.com/avatars-000707790979-34rs67-t500x500.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/apagaluz.mp3"
	},
	{
		"song"    : "Sistema Obtuso",
		"album"   : "N/A",
		"artist"  : "Criolo & Tropkillaz",
		"artwork" : "https://cdns-images.dzcdn.net/images/artist/52f0b02397f5c263e9e64b1fabc18d75/500x500.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/sistemaobtuso.mp3"
	},
	{
		"song"    : "É PIC4 NAS MACONHEIRAS",
		"album"   : "Metralha dos Bailes",
		"artist"  : "MC Topre - juliana",
		"artwork" : "https://i1.sndcdn.com/avatars-000644951631-2ozsih-t500x500.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/picanascmaconheira.mp3"
	},
	{
		"song"    : "777-666",
		"album"   : "N/A",
		"artist"  : "Matuê",
		"artwork" : "https://i1.sndcdn.com/artworks-000407615976-b6e0je-t500x500.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/666.mp3"
    },
	{
		"song"    : "OLHA O BARULHINHO DA CAMA RENK RENK RENK",
		"album"   : "Detona Funk",
		"artist"  : "MC RD, MC MN, MC FEFE ORIGINAL (DJ K O Bruxo)",
		"artwork" : "https://i1.sndcdn.com/avatars-000707790979-34rs67-t500x500.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/barulhodacamarenk.mp3"
    },
    {
		"song"    : "PIKA NAS MACONHEIRAS VS FOGO NO PARQUINHO",
		"album"   : "JMEGA BERIMBAU AUTOMOTIVO",
		"artist"  : "DJ Olliver",
		"artwork" : "https://i1.sndcdn.com/avatars-SzjyzASluy2KZ7Kr-1dnK7A-t500x500.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/berimbau.mp3"
    },
    {
		"song"    : "Medo",
		"album"   : "N/A",
		"artist"  : "Zé Vaqueiro",
		"artwork" : "https://images.suamusica.com.br/Yn7juj8-q64eRhxIIuQcuU8uS6A=/500x500/29621022/2965204/cd_cover.jpg",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/zevaqueirotenhomedo.mp3"
    },
    {
		"song"    : "Pilantragem",
		"album"   : "N/A",
		"artist"  : "MC Livinho",
		"artwork" : "https://lastfm.freetls.fastly.net/i/u/300x300/012e2898d90182e7c07ceb71b5cf9304",
		"mp3"     : "https://vitormartinsalves.github.io/fivem-script-link.github.io/pilantragem.mp3"
	}
    
];

var rot = 0;
var duration;
var playPercent;
var bufferPercent;
var currentSong = 0;
var arm_rotate_timer;
var arm = document.getElementById("arm");
var next = document.getElementById("next");
var song = document.getElementById("song");
var timer = document.getElementById("timer");
var music = document.getElementById("music");
var album = document.getElementById("album");
var artist = document.getElementById("artist");
var volume = document.getElementById("volume");
var playButton = document.getElementById("play");
var timeline = document.getElementById("slider");
var playhead = document.getElementById("elapsed");
var previous = document.getElementById("previous");
var pauseButton = document.getElementById("pause");
var bufferhead = document.getElementById("buffered");
var artwork = document.getElementsByClassName("artwork")[0];
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
var visablevolume = document.getElementsByClassName("volume")[0];

music.addEventListener("ended", _next, false);
music.addEventListener("timeupdate", timeUpdate, false);
music.addEventListener("progress", 	bufferUpdate, false);
load();

function load(){
	pauseButton.style.visibility = "hidden";
	song.innerHTML = playlist[currentSong]['song'];
	song.title = playlist[currentSong]['song'];
	album.innerHTML = playlist[currentSong]['album'];
	album.title = playlist[currentSong]['album'];
	artist.innerHTML = playlist[currentSong]['artist'];
	artist.title = playlist[currentSong]['artist'];
	artwork.setAttribute("style", "background: url('"+playlist[currentSong]['artwork']+"') center no-repeat;");
	music.innerHTML = '<source src="'+playlist[currentSong]['mp3']+'" type="audio/mp3">';
	music.load();
}

function reset(){ 
	rotate_reset = setInterval(function(){
		if(rot == 0){
			clearTimeout(rotate_reset);
		}
	}, 1);
	fireEvent(pauseButton, 'click');
	playhead.style.width = "0px";
	bufferhead.style.width = "0px";
	timer.innerHTML = "0:00";
	music.innerHTML = "";
	currentSong = 0; // set to first song, to stay on last song: currentSong = playlist.length - 1;
	song.innerHTML = playlist[currentSong]['song'];
	song.title = playlist[currentSong]['song'];
	album.innerHTML = playlist[currentSong]['album'];
	album.title = playlist[currentSong]['album'];
	artist.innerHTML = playlist[currentSong]['artist'];
	artist.title = playlist[currentSong]['artist'];
	artwork.setAttribute("style", "background: url('"+playlist[currentSong]['artwork']+"') center no-repeat;");
	music.innerHTML = '<source src="'+playlist[currentSong]['mp3']+'" type="audio/mp3">';
	music.load();
}

function formatSecondsAsTime(secs, format) {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  if (sec < 10){ 
    sec  = "0" + sec;
  }
  return min + ':' + sec;
}

function timeUpdate() {
	bufferUpdate();
	playPercent = timelineWidth * (music.currentTime / duration);
	playhead.style.width = playPercent + "px";
	timer.innerHTML = formatSecondsAsTime(music.currentTime.toString());
}

function bufferUpdate() {
	bufferPercent = timelineWidth * (music.buffered.end(0) / duration);
	bufferhead.style.width = bufferPercent + "px";
}

function RotateArm(){
	if(armrot > -12){
		arm.style.transform = 'rotate(-38deg)';
		armrot = -45;
	} else {
		arm.style.transform = 'rotate('+armrot+'deg)';
		armrot = armrot + (26 / duration);
	}
}

function fireEvent(el, etype){
	if (el.fireEvent) {
		el.fireEvent('on' + etype);
	} else {
		var evObj = document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}

function _next(){
	if(currentSong == playlist.length - 1){
		reset();
	} else {
		fireEvent(next, 'click');
	}
}

playButton.onclick = function() {
	music.play();
}

pauseButton.onclick = function() {
	music.pause();
}

music.addEventListener("play", function () {
	playButton.style.visibility = "hidden";
	pause.style.visibility = "visible";
	rotate_timer = setInterval(function(){ 
		if(!music.paused && !music.ended && 0 < music.currentTime){
			
		}
	}, 10);	
	if(armrot != -45){
		arm.setAttribute("style", "transition: transform 800ms;");
		arm.style.transform = 'rotate('+armrot+'deg)';
	}
	arm_rotate_timer = setInterval(function(){ 
		if(!music.paused && !music.ended && 0 < music.currentTime){
			if(armrot == -45){
				arm.setAttribute("style", "transition: transform 800ms;");
				arm.style.transform = 'rotate(-38deg)';
				armrot = -38;
			}
			if(arm.style.transition != ""){
				setTimeout(function(){
					arm.style.transition = "";
				}, 1000);
			}
			RotateArm();
		}
	}, 1000);
}, false);

music.addEventListener("pause", function () {
	arm.setAttribute("style", "transition: transform 800ms;");
	arm.style.transform = 'rotate(-45deg)';
	playButton.style.visibility = "visible";
	pause.style.visibility = "hidden";
	clearTimeout(rotate_timer);
	clearTimeout(arm_rotate_timer);
}, false);

next.onclick = function(){
	arm.setAttribute("style", "transition: transform 800ms;");
	arm.style.transform = 'rotate(-45deg)';
	clearTimeout(rotate_timer);
	clearTimeout(arm_rotate_timer);
	playhead.style.width = "0px";
	bufferhead.style.width = "0px";
	timer.innerHTML = "0:00";
	music.innerHTML = "";
	arm.style.transform = 'rotate(-45deg)';
	armrot = -45;
	if((currentSong + 1) == playlist.length){
		currentSong = 0;
		music.innerHTML = '<source src="'+playlist[currentSong]['mp3']+'" type="audio/mp3">';
	} else {
		currentSong++;
		music.innerHTML = '<source src="'+playlist[currentSong]['mp3']+'" type="audio/mp3">';
	}
	song.innerHTML = playlist[currentSong]['song'];
	song.title = playlist[currentSong]['song'];
	album.innerHTML = playlist[currentSong]['album'];
	album.title = playlist[currentSong]['album'];
	artist.innerHTML = playlist[currentSong]['artist'];
	artist.title = playlist[currentSong]['artist'];
	artwork.setAttribute("style", "background: url('"+playlist[currentSong]['artwork']+"') center no-repeat;");
	music.load();
	duration = music.duration;
	music.play();
}

previous.onclick = function(){
	arm.setAttribute("style", "transition: transform 800ms;");
	arm.style.transform = 'rotate(-45deg)';
	clearTimeout(rotate_timer);
	clearTimeout(arm_rotate_timer);
	playhead.style.width = "0px";
	bufferhead.style.width = "0px";
	timer.innerHTML = "0:00";
	music.innerHTML = "";
	arm.style.transform = 'rotate(-45deg)';
	armrot = -45;
	if((currentSong - 1) == -1){
		currentSong = playlist.length - 1;
		music.innerHTML = '<source src="'+playlist[currentSong]['mp3']+'" type="audio/mp3">';
	} else {
		currentSong--;
		music.innerHTML = '<source src="'+playlist[currentSong]['mp3']+'" type="audio/mp3">';
	}
	song.innerHTML = playlist[currentSong]['song'];
	song.title = playlist[currentSong]['song'];
	album.innerHTML = playlist[currentSong]['album'];
	album.title = playlist[currentSong]['album'];
	artist.innerHTML = playlist[currentSong]['artist'];
	artist.title = playlist[currentSong]['artist'];
	artwork.setAttribute("style", "background: url('"+playlist[currentSong]['artwork']+"') center no-repeat;");
	music.load();
	duration = music.duration;
	music.play();
}

volume.oninput = function(){
	music.volume = volume.value;
	visablevolume.style.width = (80 - 11) * volume.value + "px";
}

music.addEventListener("canplay", function () {
	duration = music.duration;
}, false);

const bd = document.body, cur = document.getElementById("fare");
bd.addEventListener("mousemove", function(n) {
    (cur.style.left = n.clientX + "px"), (cur.style.top = n.clientY + "px")
})
