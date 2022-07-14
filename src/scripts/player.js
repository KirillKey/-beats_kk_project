let player;
const playerContainer = $(".player");
const splash = $(".player__splash");

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  
  const minutes = addZero(Math.round(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);
  
  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  
  return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  const completedSec = player.getCurrentTime();
  
  $(".player__duration-estimate").text(formatTime(durationSec));
  
  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPersent = (completedSec / durationSec) * 100;
    
    $(".player__duration-completed").text(formatTime(completedSec));
        $(".player__playback-button").css({
      left: `${completedPersent}%`
    });

    function gradientGoVideo () {
      document.querySelector(".player__playback").style.
      backgroundImage = 'linear-gradient(90deg, #E01F3D '+completedPersent+'%, #333 0%)';
    };
    gradientGoVideo();

  }, 1000);

  player.setVolume(10);
    
};

const volSlider = $(".player__vol-slider");  
  volSlider.click(e => {
    const volBar = $(e.currentTarget);
    const clickedVolPosition = e.originalEvent.layerX;
    const newVolPositionPercent = (clickedVolPosition / volBar.width()) * 100;


    $(".player__vol-button").css({
      left: `${newVolPositionPercent}%`
    });

    function gradientGoVol () {
      document.querySelector(".player__vol-slider").style.
      backgroundImage = 'linear-gradient(90deg, #E01F3D '+newVolPositionPercent+'%, #333 0%)';
    };
    gradientGoVol();

    player.setVolume(newVolPositionPercent);

   });


const playerVol = $(".player__vol-icon");
playerVol.click(e => {
  if(playerVol.hasClass('mute')){
    playerVol.removeClass('mute')
    player.unMute();
  } else {
    playerVol.addClass('mute')
    player.mute();
  }
});


let eventsInit = () => {
  $('.player__start').click(e =>{
    e.preventDefault();
    
    if(playerContainer.hasClass('paused')){
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });
  
  
  $(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newBtnPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = 
    (player.getDuration() / 100) * newBtnPositionPercent;


    $(".player__playback-button").css({
      left: `${newBtnPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
  })
  
  splash.click(e => {
    player.playVideo();
  });
};

const onPlayerStateChange = event => {
  /* 
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики)
  */
  switch (event.data){
    case 1: 
    playerContainer.addClass("paused");
    playerContainer.addClass("active");
    break;
    case 2: 
    playerContainer.removeClass("paused");
    playerContainer.removeClass("active");
    break;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '392',
    width: '662',
    videoId: 'Ka9y-RNb6jM',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0
    }
  });
  
}


eventsInit();