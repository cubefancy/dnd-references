document.getElementById("class_button").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.pathname = "/classes.html";
});

document.getElementById("race_button").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.pathname = "/races.html";
});

document.getElementById("monster_button").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.pathname = "/monsters.html";
});
