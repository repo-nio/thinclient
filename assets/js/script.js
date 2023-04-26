(function ($) {
  const backdrop = $('.backdrop');

  // backdrop.on('click', () => {
  //   $('.modal.active').removeClass('active');
  //   backdrop.removeClass('active');

  //   let btnManualDial = document.getElementById('VoiceNewCall');
  //   removeElementClass(btnManualDial, 'active');
  // });

  $(".modal [data-close]").on('click', (ev) => {
    $(ev.currentTarget).closest('.modal').removeClass('active');
    backdrop.removeClass('active');
  });

  $('.column').each((i, column) => {
    $(column).find('button.btn-1').each((i, button) => {
      $(button).on('click', () => {
        const _switch = $(button).data("switch");
        const target = $(button).data("target");
        const mode = $(button).data("mode");
       
        // debugger;

        if(button.childNodes.length > 3 && (button.childNodes[3].id == 'Pause' || button.childNodes[3].id == 'WaitForCall'
            ||button.childNodes[3].id == 'RequestAssistance'))
        {
          return;
        }

        if(button.childNodes.length > 3 && (button.childNodes[3].id == 'Pause' || button.childNodes[3].id == 'WaitForCall'))
        {
          $('button.btn-1').removeClass('active');
        }       
        else if(button.childNodes.length > 3)
        {
          var allbtns = $('button.btn-1');

          for(let i = 0; i < allbtns.length; i++)
          {
            var item = allbtns[i];

            if(item.childNodes.length > 3 && item.childNodes[3].id != 'Pause' && item.childNodes[3].id != 'WaitForCall')
            {
              removeElementClass(allbtns[i], 'active');
            }
          }
        }
        else
        {
          $('button.btn-1').removeClass('active'); 
        }
        
        // $('button.btn-1').removeClass('active');


        $(button).addClass('active');

        // Check if element exists
        if ($(target).length) 
        {
          $(target).addClass('active');
          backdrop.addClass('active');

          // if(target == '#search-mode')
          // {
          //   $(".when-ready").addClass("active")
          //   // $("#state").text("Ready")
          // }
        }
        else
        {
          // $(".when-ready").removeClass("active");
        }

        if (_switch) {
          const image = $('.animation').data(`${_switch}-image`);
          $('.animation').attr('src', image);

          if (_switch === "ready") 
          {
            // $(".when-ready").addClass("active")
            $("#state").text("Waiting (V)")
          }

          if (_switch === "break") {
            // $(".when-ready").removeClass("active");
            // $("#state").text("Break")
          }

          const url = new URL(window.location.href);
          url.pathname = url.pathname + "/../embed.html"
          url.hash = _switch;

          $("object").attr("data", "");
          $("object").on("load", () => {
            $("object").off("load");
            $("object").attr("data", url.href);
          })
        }
      })
    })
  })

  $(".btn-3").on('click', (ev) => {
    const input = $("input#dial");
    input.val(input.val() + $(ev.currentTarget).text());
  });

  $("#dial-clear").on('click', () => {
    $("input#dial").val("");
  });

/*
  function renderElm(_id) {
    // debugger;
    const _elm = document.getElementById(_id);

    if (_elm.querySelector(".resetBtn")) {      
      const gridComputedStyle = window.getComputedStyle(
        document.getElementById(`${_id}`).children[1]
      );
      let gridColumnCount = gridComputedStyle
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
        let tempHeightFooter = parseInt(
          $("#footerMain").css("height").split("p")[0]
        );
        if (_id == "bottom-left") {
          switch (tempHeightFooter) {
            case 140:
              if (gridColumnCount <= 4) {
                document.getElementById("resetBtn-1").style.display = "block";
              } else {
                document.getElementById("resetBtn-1").style.display = "none";
              }
              break;
            case 210:
              if (gridColumnCount <= 3) {
                document.getElementById("resetBtn-1").style.display = "block";
              } else {
                document.getElementById("resetBtn-1").style.display = "none";
              }
              break;
            case 280:
              if (gridColumnCount <= 2) {
                document.getElementById("resetBtn-1").style.display = "block";
              } else {
                document.getElementById("resetBtn-1").style.display = "none";
              }
              break;
            case 350:
              if (gridColumnCount <= 1) {
                document.getElementById("resetBtn-1").style.display = "block";
              } else {
                document.getElementById("resetBtn-1").style.display = "none";
              }
              break;
        }
      }

      if (_id == "bottom-middle-left") {
        switch (tempHeightFooter) {
          case 140:
            if (gridColumnCount <= 5) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              document.getElementById("resetBtn-2").style.display = "none";
            }
            break;
          case 210:
            if (gridColumnCount < 4) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              document.getElementById("resetBtn-2").style.display = "none";
            }
            break;
          case 280:
            if (gridColumnCount < 3) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              document.getElementById("resetBtn-2").style.display = "none";
            }
            break;
          case 350:
            if (gridColumnCount <= 2) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              document.getElementById("resetBtn-2").style.display = "none";
            }
            break;
        }
      }
    }
  }
  
  function checkExist(_id) {
    const _elm = document.getElementById(_id);

    if (localStorage.getItem(_id) && _id === "footerMain") {
      _elm.setAttribute("style", `height: ${localStorage.getItem(_id)}`);
      document
        .getElementById("footer-child")
        .setAttribute("style", `height: ${localStorage.getItem(_id)}`);
    }
    if (localStorage.getItem(_id) && _id !== "footerMain") {
      $(`#${_id}`).css("width", localStorage.getItem(_id));

    }
  }


const wrap = document.querySelectorAll(".resize-div");
const obver = new ResizeObserver((entries) => {
  for (entry of entries) {
    checkExist(entry.target.id);
    renderElm(entry.target.id);
  }
  // outputsize();

  wrap.forEach((w) => obver.observe(w));
});

function manageResize(md, sizeProp, posProp) {
  // debugger;

  var r = md.target;

  var prev = r.previousElementSibling;
  var next = r.nextElementSibling;
  if (!prev || !next) {
    return;
  }

  md.preventDefault();

  var prevSize = prev[sizeProp];
  var nextSize = next[sizeProp];
  var sumSize = prevSize + nextSize;
  var prevGrow = Number(prev.style.flexGrow);
  var nextGrow = Number(next.style.flexGrow);
  var sumGrow = prevGrow + nextGrow;
  var lastPos = md[posProp];

  function onMouseMove(mm) {
    // debugger;
    var pos = mm[posProp];
    var d = pos - lastPos;
    prevSize += d;
    nextSize -= d;

    if (nextSize - 280 > 0 && sizeProp === "offsetHeight") {
      return;
    }

    if (prevSize < 0) {
      nextSize += prevSize;
      pos -= prevSize;
      prevSize = 0;
    }
    if (nextSize < 0) {
      prevSize += nextSize;
      pos += nextSize;
      nextSize = 0;
    }

    var prevGrowNew = sumGrow * (prevSize / sumSize);
    var nextGrowNew = sumGrow * (nextSize / sumSize);

    prev.style.flexGrow = prevGrowNew;
    next.style.flexGrow = nextGrowNew;

    lastPos = pos;
  }

  
  function onMouseUp(mu) {

    // debugger;
    // Change cursor to signal a state's change: stop resizing.
    const html = document.querySelector("html");
    html.style.cursor = "default";

    if (posProp === "pageX") {
      r.style.cursor = "ew-resize";
    } else {
      r.style.cursor = "ns-resize";
    }

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}



function setupResizerEvents() 
{
  // debugger;

  document.body.addEventListener("mousedown", function (md) {
    // Used to avoid cursor's flickering
    const html = document.querySelector("html");

    var target = md.target;
    if (target.nodeType !== 1 || target.tagName !== "FLEX-RESIZER") {
      return;
    }
    var parent = target.parentNode;
    var h = parent.classList.contains("h");
    var v = parent.classList.contains("v");
    if (h && v) {
      return;
    } else if (h) {
      // Change cursor to signal a state's change: begin resizing on H.
      target.style.cursor = "col-resize";
      html.style.cursor = "col-resize"; // avoid cursor's flickering

      // use offsetWidth versus scrollWidth to avoid splitter's jump on resize when content overflow.
      manageResize(md, "offsetWidth", "pageX");
    } else if (v) {
      // Change cursor to signal a state's change: begin resizing on V.
      target.style.cursor = "row-resize";
      html.style.cursor = "row-resize"; // avoid cursor's flickering

      // manageResize(md, "offsetHeight", "pageY");
    }
  });
}

setupResizerEvents();
*/

// debugger;
  
  $(function () {
    resize_footer_height();
  });
  $(window).resize(function () {
    resize_footer_height();
  });
  function resize_footer_height() {
    var tempHeight2 = $(window).height() / 5.25;
    // $('.footer-main').height(tempHeight2);
    $(".footer-main").height(140);
  }

  $(".resetBtn").click(function (e) {
    // debugger;
    e.preventDefault();
    let _id = "";
    let _idSecond = "";
    if ($(this).parent().attr("id") === "bottom-left") {
      _id = "bottom-left";
      _idSecond = "bottom-middle-left";
    } else {
      _id = "bottom-middle-left";
      _idSecond = "bottom-left";
    }
    $("#rs-1").css("pointer-events", "none");
    $("#rs-2").css("pointer-events", "none");
    $(`#${_idSecond}`).addClass("overlay");
    $("#bottom-middle-right").addClass("overlay");
    $("#bottom-right").addClass("overlay");
    $(`#${_id} .grid-wrapper`).addClass("expand");
  });

  $(".collapseBtn").click(function (e) {
    e.preventDefault();
    if ($(this).parent().parent().attr("id") === "bottom-left") {
      _id = "bottom-left";
      _idSecond = "bottom-middle-left";
    } else {
      _id = "bottom-middle-left";
      _idSecond = "bottom-left";
    }
    $("#rs-1").css("pointer-events", "auto");
    $("#rs-2").css("pointer-events", "auto");
    $(`#${_idSecond}`).removeClass("overlay");
    $("#bottom-middle-right").removeClass("overlay");
    $("#bottom-right").removeClass("overlay");
    $(`#${_id} .grid-wrapper`).removeClass("expand");
  });

   ///Click outSide
  $(document).mouseup(function (e) {
          let _id = "";
          let _idSecond = "";
          let elementSelected = "";
          let element_bottom_left = $("#bottom-left .grid-wrapper");
          let element_bottom_middleL = $("#bottom-middle-left .grid-wrapper");
          const compare1 = element_bottom_left.hasClass("expand");
          const compare2 = element_bottom_middleL.hasClass("expand");
          if (compare1) {
            _id = "bottom-left";
            _idSecond = "bottom-middle-left";
            elementSelected = element_bottom_left;
          }
          if (compare2) {
            _id = "bottom-middle-left";
            _idSecond = "bottom-left";
            elementSelected = element_bottom_middleL;
          }
          if (elementSelected) {
            if (
              !elementSelected.is(e.target) &&
              elementSelected.has(e.target).length === 0
            ) {
              $("#rs-1").css("pointer-events", "auto");
              $("#rs-2").css("pointer-events", "auto");
              $(`#${_idSecond}`).removeClass("overlay");
              $("#bottom-middle-right").removeClass("overlay");
              $("#bottom-right").removeClass("overlay");
              $(`#${_id} .grid-wrapper`).removeClass("expand");
            }
          }
        });



// debugger;
let topCurrentHeight = 0,
    bottomCurrentHeight = 0,
    currentPosition = 0,
    newPosition = 0,
    direction = "Released",
    tempHeight = 70,
    leftCurrentWidth = 0,
    rightCurrentWidth = 0,
    currentPositionWidth = 0,
    newPositionWidth = 0,
    directionWidth = "ReleasedWidth";
  /////////////////////////bottomLeft/////////////////////
  let rightCurrentWidthRS1 = 0,
    leftCurrentWidthRS1 = 0,
    directionWidthRS1 = "ReleasedWidthRS1",
    currentPositionWidthRS1 = 0,
    newPositionWidthRS1 = 0;
  ///////////////////////////bottomMiddleRight/////////////////////
  let rightCurrentWidthRS2 = 0,
    leftCurrentWidthRS2 = 0,
    directionWidthRS2 = "ReleasedWidthRS2",
    currentPositionWidthRS2 = 0,
    newPositionWidthRS2 = 0;

  const mouseDownHandler = function (e) {
    direction = "Pressed";
    currentPosition = event.pageY;
    topTempHeight = $("#content").css("height");
    topHeightArray = topTempHeight.split("p");
    topCurrentHeight = parseInt(topHeightArray[0]);
    bottomTempHeight = $("#footerMain").css("height");
    bottomHeightArray = bottomTempHeight.split("p");
    bottomCurrentHeight = parseInt(bottomHeightArray[0]);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseDownWidthHandler = function (e) {
    directionWidth = "PressedWidth";
    currentPositionWidth = event.pageX;
    rightTempWidth = $("#bottom-right").css("width");
    rightWidthArray = rightTempWidth.split("p");
    rightCurrentWidth = parseInt(rightWidthArray[0]);

    leftTempHeight = $("#voiceStatusToolStrip").css("width");
    leftWidthArray = leftTempHeight.split("p");
    leftCurrentWidth = parseInt(leftWidthArray[0]);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  /////////////////////////////Resize-bottom-left///////////////////
  const mouseDownWidthBottomLeftHandler = function (e) {
    directionWidthRS1 = "PressedWidthRS1";
    currentPositionWidthRS1 = event.pageX;
    leftTempWidth = $("#bottom-left").css("width");
    leftWidthArray = leftTempWidth.split("p");
    leftCurrentWidthRS1 = parseInt(leftWidthArray[0]);

    rightTempWidth = $("#bottom-middle-left").css("width");
    rightWidthArray = rightTempWidth.split("p");
    rightCurrentWidthRS1 = parseInt(rightWidthArray[0]);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  //////////Resize-bottom-middle-right - voiceStatusToolStrip ////////////////////////
  const mouseDownWidthBottomRightHandler = function (e) {
    directionWidthRS2 = "PressedWidthRS2";
    currentPositionWidthRS2 = event.pageX;

    leftTempWidth = $("#bottom-middle-left").css("width");
    leftWidthArray = leftTempWidth.split("p");
    leftCurrentWidthRS2 = parseInt(leftWidthArray[0]);

    rightTempWidth = $("#voiceStatusToolStrip").css("width");
    rightWidthArray = rightTempWidth.split("p");
    rightCurrentWidthRS2 = parseInt(rightWidthArray[0]);

    tempBottomLeftWidth = $("#bottom-left").css("width");
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseMoveHandler = function (e) {
    if (direction == "Pressed") {
      newPosition = event.pageY;
      let movePerPixels = parseInt(newPosition - currentPosition);
      let topDivNewLocation = parseInt(topCurrentHeight + movePerPixels);
      let bottomDivNewLocation = parseInt(bottomCurrentHeight - movePerPixels);
      let tempPer = Math.round(bottomDivNewLocation / tempHeight);
      if (tempPer <= 2) {
        tempPer = 2;
      } else if (tempPer >= 5) {
        tempPer = 5;
      } else {
        tempPer = tempPer;
      }
      let sumHeight = tempPer * tempHeight;
      $("#footerMain").css("height", sumHeight + "px");
      // debugger;
      $("#divFooter").css("height", sumHeight + "px");
      localStorage.setItem("footerMain", sumHeight + "px");
      document.getElementById("resize-1").style.cursor = "row-resize";
      document.body.style.cursor = "row-resize";
      document.getElementById("content").style.userSelect = "none";
      document.getElementById("content").style.pointerEvents = "none";
      document.getElementById("footerMain").style.userSelect = "none";
      document.getElementById("footerMain").style.pointerEvents = "none";
    }
    if (directionWidth == "PressedWidth") {
      newPositionWidth = event.pageX;
      let movePerPixels = parseInt(newPositionWidth - currentPositionWidth);
      let rightDivNewLocation = parseInt(rightCurrentWidth - movePerPixels);
      let leftDivNewLocation = parseInt(leftCurrentWidth + movePerPixels);
      let temp = parseInt($("#voiceStatusToolStrip").css("width").split("p")[0]);
      let tempBottRight = parseInt(
        $("#bottom-right").css("width").split("p")[0]
      );
      document.getElementById("rs-1").style.cursor = "col-resize";
      document.body.style.cursor = "col-resize";

      document.getElementById("bottom-left").style.userSelect = "none";
      document.getElementById("bottom-left").style.pointerEvents = "none";

      document.getElementById("bottom-middle-left").style.userSelect = "none";
      document.getElementById("bottom-middle-left").style.pointerEvents =
        "none";

      document.getElementById("voiceStatusToolStrip").style.userSelect = "none";
      document.getElementById("voiceStatusToolStrip").style.pointerEvents =
        "none";
      document.getElementById("bottom-right").style.userSelect = "none";
      document.getElementById("bottom-right").style.pointerEvents = "none";
      if (temp == 230 && movePerPixels < 0) {
        $("#voiceStatusToolStrip").css("width", "230px");
        localStorage.setItem("voiceStatusToolStrip", "230px");
        return;
      }
      if (tempBottRight == 230 && movePerPixels > 0) {
        $("#bottom-right").css("width", "230px");
        localStorage.setItem("bottom-right", "230px");
        return;
      }
      $("#bottom-right").css("width", rightDivNewLocation + "px");
      $("#voiceStatusToolStrip").css("width", leftDivNewLocation + "px");
      localStorage.setItem("bottom-right", rightDivNewLocation + "px");
      localStorage.setItem("voiceStatusToolStrip", leftDivNewLocation + "px");
    }
    if (directionWidthRS1 == "PressedWidthRS1") {
      newPositionWidthRS1 = event.pageX;
      let movePerPixels = parseInt(
        newPositionWidthRS1 - currentPositionWidthRS1
      );
      let leftDivNewLocation = parseInt(leftCurrentWidthRS1 + movePerPixels);
      let rightDivNewLocation = parseInt(rightCurrentWidthRS1 - movePerPixels);
      let temp_bottom_m_left = parseInt(
        $("#bottom-middle-left").css("width").split("p")[0]
      );
      let temp_bottom_left = parseInt(
        $("#bottom-left").css("width").split("p")[0]
      );
      document.getElementById("rs-1").style.cursor = "col-resize";
      document.body.style.cursor = "col-resize";
      document.getElementById("bottom-left").style.userSelect = "none";
      document.getElementById("bottom-left").style.pointerEvents = "none";

      document.getElementById("bottom-middle-left").style.userSelect = "none";
      document.getElementById("bottom-middle-left").style.pointerEvents =
        "none";

      document.getElementById("voiceStatusToolStrip").style.userSelect = "none";
      document.getElementById("voiceStatusToolStrip").style.pointerEvents =
        "none";
      document.getElementById("bottom-right").style.userSelect = "none";
      document.getElementById("bottom-right").style.pointerEvents = "none";
      document.body.style.cursor = "col-resize";
      if (temp_bottom_m_left == 100 && movePerPixels > 0) {
        $("#bottom-middle-left").css("width", "100px");
        localStorage.setItem("bottom-middle-left", "100px");
        return;
      }
      if (temp_bottom_left == 100 && movePerPixels < 0) {
        $("#bottom-left").css("width", "100px");
        localStorage.setItem("bottom-left", "100px");
        return;
      }
      $("#bottom-left").css("width", leftDivNewLocation + "px");
      $("#bottom-middle-left").css("width", rightDivNewLocation + "px");
      localStorage.setItem("bottom-left", leftDivNewLocation + "px");
      localStorage.setItem("bottom-middle-left", rightDivNewLocation + "px");
    }
    if (directionWidthRS2 == "PressedWidthRS2") {
      newPositionWidthRS2 = event.pageX;
      let movePerPixels = parseInt(
        newPositionWidthRS2 - currentPositionWidthRS2
      );
      let leftDivNewLocation = parseInt(leftCurrentWidthRS2 + movePerPixels);
      let rightDivNewLocation = parseInt(rightCurrentWidthRS2 - movePerPixels);
      let temp_bottom_m_right = parseInt(
        $("#voiceStatusToolStrip").css("width").split("p")[0]
      );
      let temp_bottom_m_left = parseInt(
        $("#bottom-middle-left").css("width").split("p")[0]
      );
      document.getElementById("rs-1").style.cursor = "col-resize";
      document.body.style.cursor = "col-resize";
      document.getElementById("bottom-left").style.userSelect = "none";
      document.getElementById("bottom-left").style.pointerEvents = "none";

      document.getElementById("bottom-middle-left").style.userSelect = "none";
      document.getElementById("bottom-middle-left").style.pointerEvents =
        "none";

      document.getElementById("voiceStatusToolStrip").style.userSelect = "none";
      document.getElementById("voiceStatusToolStrip").style.pointerEvents =
        "none";
      document.getElementById("bottom-right").style.userSelect = "none";
      document.getElementById("bottom-right").style.pointerEvents = "none";
      document.body.style.cursor = "col-resize";

      if (temp_bottom_m_right == 230 && movePerPixels > 0) {
        $("#voiceStatusToolStrip").css("width", "230px");
        localStorage.setItem("voiceStatusToolStrip", "230px");
        return;
      }
      if (temp_bottom_m_left == 100 && movePerPixels < 0) {
        $("#bottom-middle-left").css("width", "100px");
        localStorage.setItem("bottom-middle-left", "100px");
        return;
      }
      $("#bottom-middle-left").css("width", leftDivNewLocation + "px");
      $("#voiceStatusToolStrip").css("width", rightDivNewLocation + "px");
      localStorage.setItem("bottom-middle-left", leftDivNewLocation + "px");
      localStorage.setItem("voiceStatusToolStrip", rightDivNewLocation + "px");
    }
  };
  const mouseUpHandler = function (e) {
    direction = "Released";
    directionWidthRS1 = "ReleasedWidthRS1";
    directionWidthRS2 = "ReleasedWidthRS2";
    directionWidth = "ReleasedWidth";
    ///////////////////////width////////////
    setTimeout(() => {
      document.getElementById("resize-1").style.removeProperty("cursor");
      document.getElementById("rs-3").style.removeProperty("cursor");
      document.getElementById("rs-3").style.cursor = "ew-resize";
      document.getElementById("rs-1").style.removeProperty("cursor");
      document.getElementById("rs-1").style.cursor = "ew-resize";
      document.getElementById("rs-2").style.removeProperty("cursor");
      document.getElementById("rs-2").style.cursor = "ew-resize";
      document
        .getElementById("bottom-left")
        .style.removeProperty("user-select");
      document
        .getElementById("bottom-middle-left")
        .style.removeProperty("user-select");
      document
        .getElementById("voiceStatusToolStrip")
        .style.removeProperty("user-select");
      document
        .getElementById("bottom-right")
        .style.removeProperty("user-select");
      document
        .getElementById("bottom-left")
        .style.removeProperty("pointer-events");
      document
        .getElementById("bottom-middle-left")
        .style.removeProperty("pointer-events");
      document
        .getElementById("voiceStatusToolStrip")
        .style.removeProperty("pointer-events");
      document
        .getElementById("bottom-right")
        .style.removeProperty("pointer-events");
      ///////////////////////////height//////////////////////////////////////
      document.getElementById("content").style.removeProperty("user-select");
      document
        .getElementById("footerMain")
        .style.removeProperty("pointer-events");
      document.getElementById("footerMain").style.removeProperty("user-select");
      document.getElementById("content").style.removeProperty("pointer-events");
    }, 500);
    //////////////////////all////////////////////
    document.body.style.cursor = "default";
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };
  $("#resize-1").mousedown(function (event) {
    mouseDownHandler();
  });
  $("#rs-3").mousedown(function (event) {
    mouseDownWidthHandler();
  });
  $("#rs-1").mousedown(function (event) {
    mouseDownWidthBottomLeftHandler();
  });
  $("#rs-2").mousedown(function (event) {
    mouseDownWidthBottomRightHandler();
  });

  // debugger;

  

  function renderElm(_id) {
    // debugger;
    const _elm = document.getElementById(_id);
    console.log(_elm.querySelector(".resetBtn"));
    if (_elm.querySelector(".resetBtn")) {
      let elementToCheck = document.getElementById(`${_id}`).children[1];
      if(!elementToCheck) return;

      const gridComputedStyle = window.getComputedStyle(elementToCheck);
      let gridColumnCount = gridComputedStyle
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
      let tempHeightFooter = parseInt(
        $("#footerMain").css("height").split("p")[0]
      );
      if (_id == "bottom-left") {
        switch (tempHeightFooter) {
          case 140:
            if (gridColumnCount <= 4) {
              document.getElementById("resetBtn-1").style.display = "block";
            } else {
              $("#resetBtn-1").hide();
            }
            break;
          case 210:
            if (gridColumnCount <= 3) {
              document.getElementById("resetBtn-1").style.display = "block";
            } else {
              $("#resetBtn-1").hide();
            }
            break;
          case 280:
            if (gridColumnCount <= 2) {
              document.getElementById("resetBtn-1").style.display = "block";
            } else {
              $("#resetBtn-1").hide();
            }
            break;
          case 350:
            if (gridColumnCount <= 1) {
              document.getElementById("resetBtn-1").style.display = "block";
            } else {
              $("#resetBtn-1").hide();
            }
            break;
        }
      }
      if (_id == "bottom-middle-left") {
        switch (tempHeightFooter) {
          case 140:
            if (gridColumnCount <= 5) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              $("#resetBtn-2").hide();
            }
            break;
          case 210:
            if (gridColumnCount < 4) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              $("#resetBtn-2").hide();
            }
            break;
          case 280:
            if (gridColumnCount < 3) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              $("#resetBtn-2").hide();
            }
            break;
          case 350:
            if (gridColumnCount <= 2) {
              document.getElementById("resetBtn-2").style.display = "block";
            } else {
              document.getElementById("resetBtn-2").style.display = "none";
            }
            break;
        }
      }
    }
  }

  function checkExist(_id) {
    const _elm = document.getElementById(_id);
    if (localStorage.getItem(_id) && _id === "footerMain") {
      _elm.setAttribute("style", `height: ${localStorage.getItem(_id)}`);
      document
        .getElementById("divFooter")
        .setAttribute("style", `height: ${localStorage.getItem(_id)}`);
    }
    if (localStorage.getItem(_id) && _id !== "footerMain") {
      $(`#${_id}`).css("width", localStorage.getItem(_id));
    }
  }
  const wrap = document.querySelectorAll(".resize-div");
  const obver = new ResizeObserver((entries) => {
    for (entry of entries) {
      checkExist(entry.target.id);
      renderElm(entry.target.id);
    }
  });
  wrap.forEach((w) => obver.observe(w));

})(jQuery);



