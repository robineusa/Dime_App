function CambiarVideo1() {
   
        var video = document.getElementById('Video');
        var source = document.getElementById('Source');
        video.pause();
       source.src = "~/Resources/Videos/VideoPrueba.mp4";
        video.currentTime = 0;
        video.load();
        video.play();
}
