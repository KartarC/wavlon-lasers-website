document.querySelectorAll('[data-ultracut-video]').forEach(function(player){
  var button=player.querySelector('button'); button.hidden=false;
  button.addEventListener('click',function(){
    var frame=document.createElement('iframe');
    frame.src='https://www.youtube-nocookie.com/embed/z6HYC59Ine8?autoplay=1&rel=0';
    frame.title='Wavlon UltraCut Series marketing video';
    frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen=true;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    player.replaceChildren(frame); frame.focus();
  });
});
