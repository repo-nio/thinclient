const showModal = (name) => {
    let modal;
    if (name === "first") {
        modal = document.getElementById("bottom-left");
        document.getElementById("bottom-middle-left").style.display = "none";
    } else {
        modal = document.getElementById("bottom-middle-left");
        document.getElementById("bottom-left").style.display = "none";
    }
    document.getElementById("exit-modal").style.display = "block";
    document.getElementById("bottom-middle-right").style.display = "none";
    document.getElementById("bottom-right").style.display = "none";
    modal.style.display = "grid";
    modal.style.width = "100%";
    modal.style.resize = "none";
    modal.style.borderRight = "none";
}


const exitModal = () => {
    const bottomLeft = document.getElementById("bottom-left");
    const bottomMiddleLeft = document.getElementById("bottom-middle-left");
    
    for (let element of [bottomLeft, bottomMiddleLeft]) {
        element.style.display = "none";
        element.style.width = "25%";
        element.style.resize = "horizontal";
        element.style.borderRight = "2px solid silver";
    }

    document.getElementById("exit-modal").style.display = "none";
    document.getElementById("bottom-middle-right").style.display = "grid";
    document.getElementById("bottom-right").style.display = "grid";
}


document.addEventListener("resize", (event) => {});

onresize = (event) => {
    if (window.innerWidth > 1000) {
        document.getElementById("bottom-left").style.display = "grid";
        document.getElementById("bottom-middle-left").style.display = "grid";
    } else {
        document.getElementById("bottom-left").style.display = "none";
        document.getElementById("bottom-middle-left").style.display = "none";
    }
}