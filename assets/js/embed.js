const hash = window.location.hash;

function showMessage(message, subtitle, image) {

  debugger;
  $(".message h1").text(message);
  $(".message p").text(subtitle);
  $(".message img").attr("src", image);
}

if (["#break", ""].includes(hash)) {
  showMessage("You are currently on a break!", "Click on ready to start working", "./assets/animations/Agent pause.gif");
} else if (hash === "#ready") {
  showMessage("You are waiting fo contact", "", "./assets/animations/Agent waiting.gif");
}