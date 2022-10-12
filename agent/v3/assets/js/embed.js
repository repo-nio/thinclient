const hash = window.location.hash;

function showMessage(message, subtitle, image) {
  $(".message h1").text(message);
  $(".message h1").css("position", "absolute");
  $(".message h1").css("top", "10%");
  // $(".message p").text(subtitle);
  $(".message p").css("position", "absolute");
  $(".message p").css("top", "20%");
  // $(".message img").attr("src", image);
}

if (["#break", ""].includes(hash)) {
  showMessage("You are currently on a break!", "Click on ready to start working", "./assets/animations/Agent pause.gif");
} else if (hash === "#ready") {
  showMessage("You are waiting fo contact", "", "./assets/animations/Agent waiting.gif");
}