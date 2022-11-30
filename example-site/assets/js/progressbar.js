// Moves progress bar when the users scrolls up or down.
window.onscroll = function() {move_progressbar()};

function move_progressbar() {
    console.log("thingy");
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progress_bar").style.width = scrolled + "%";
}
