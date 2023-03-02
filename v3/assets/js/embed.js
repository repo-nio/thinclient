const hash = window.location.hash;

function showMessage(message, subtitle, image) {
  // $(".message h1").text(message);
  // $(".message p").text(subtitle);
  // $(".message img").attr("src", image);
}

if (["#break", ""].includes(hash)) {
	
  showMessage("You are currently on a break", "Click on ready to start working", "/agent/v3/assets/animations/Agent_pause.gif");
} else if (hash === "#ready") {
  showMessage("You are waiting for contact", "", "/agent/v3/assets/animations/Agent_waiting.gif");
}