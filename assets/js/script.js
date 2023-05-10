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
    CODES FOR AGENT BOTTOM PANEL
*/

/*
  
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

*/


let min_width_pre = 0,
    min_width_next = 0,
    currentPosition = 0,
    newPosition = 0,
    direction = "ReleasedHeight",
    newPositionWidth = 0,
    directionWidth = "ReleasedWidth",
    preId = "",
    nextId = "",
    size = "";

  const showItem = "bg_w";
  const heightGrid = 70;
  const footer_main = "footerMain";
  const content = "content";
  const mouseDownResizeWidth = function (e, pre, next, orientation) {
    if (orientation === "horizontal") {
      directionWidth = "Pressed";
      min_width_pre =
        pre === "bottom-left" || pre === "bottom-middle-left" ? 100 : 230;
      min_width_next =
        next === "bottom-left" || next === "bottom-middle-left" ? 100 : 230;
      size = "width";
      currentPosition = event.clientX;
    }
    if (orientation === "vertical") {
      direction = "Pressed";
      size = "height";
      currentPosition = event.clientY;
    }
    preId = pre;
    nextId = next;
    preCurrentWidth = parseInt($(`#${preId}`).css(size).split("p")[0]);
    nextCurrentWidth = parseInt($(`#${nextId}`).css(size).split("p")[0]);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseMoveHandler = function (e) {
    document.getElementById(`${preId}`).style.userSelect = "none";
    document.getElementById(`${preId}`).style.pointerEvents = "none";
    document.getElementById(`${preId}`).style.userSelect = "none";
    document.getElementById(`${nextId}`).style.pointerEvents = "none";
    if (direction === "Pressed") {
      newPosition = event.pageY;
      let movePerPixels = parseInt(newPosition - currentPosition);
      let bottomDivNewLocation = parseInt(preCurrentWidth - movePerPixels);
      if (
        bottomDivNewLocation >= window.innerHeight &&
        !checkResizeHeight(bottomDivNewLocation)
      ) {
        $(`#${preId}`).css("height", window.innerHeight + 4 + "px");
        $("#footer-child").css("height", window.innerHeight + 4 + "px");
        localStorage.setItem(`${preId}`, window.innerHeight + 4 + "px");
        localStorage.setItem(`${content}`, "0px");
        $(`#${content}`).css("height", "0px");
        return;
      }
      checkShowButton(bottomDivNewLocation);
      if (bottomDivNewLocation <= heightGrid * 2) {
        $(`.${showItem}`).css("height", 0 + "px");
        localStorage.setItem(`${showItem}`, 0 + "px");
        $(`#${preId}`).css("height", heightGrid * 2 + "px");
        $("#footer-child").css("height", heightGrid * 2 + "px");
        localStorage.setItem(`${preId}`, heightGrid * 2 + "px");
        localStorage.setItem(`${content}`, `calc(100% - ${heightGrid * 2}px)`);
        $(`#${content}`).css("height", `calc(100% - ${heightGrid * 2}px)`);
        return;
      }

      if (!checkResizeHeight(bottomDivNewLocation)) {
        $(`#${preId}`).css("height", bottomDivNewLocation + "px");
        $("#footer-child").css("height", bottomDivNewLocation + "px");
        localStorage.setItem(`${preId}`, bottomDivNewLocation + "px");
        $(`#${content}`).css(
          "height",
          `calc(100% - ${bottomDivNewLocation}px)`
        );
        localStorage.setItem(
          `${content}`,
          `calc(100% - ${bottomDivNewLocation}px)`
        );
        checkShowButton(bottomDivNewLocation);
        return;
      } else {
        $(`.${showItem}`).css("height", 0 + "px");
        localStorage.setItem(`${showItem}`, 0 + "px");
        $(`#${preId}`).css(
          "height",
          checkResizeHeight(bottomDivNewLocation) + "px"
        );
        $("#footer-child").css(
          "height",
          checkResizeHeight(bottomDivNewLocation) + "px"
        );
        localStorage.setItem(
          `${preId}`,
          checkResizeHeight(bottomDivNewLocation) + "px"
        );
        $(`#${content}`).css(
          "height",
          `calc(100% - ${checkResizeHeight(bottomDivNewLocation)}px)`
        );
        localStorage.setItem(
          `${content}`,
          `calc(100% - ${checkResizeHeight(bottomDivNewLocation)}px)`
        );
        return;
      }
    }
    if (directionWidth === "Pressed") {
      newPositionWidth = event.pageX;
      let movePerPixels = parseInt(newPositionWidth - currentPosition);
      let tempToTal = preCurrentWidth + nextCurrentWidth;
      let leftDivNewLocation = parseInt(preCurrentWidth + movePerPixels);
      let rightDivNewLocation = parseInt(nextCurrentWidth - movePerPixels);
      let temp_pre_size = parseInt($(`#${preId}`).css(size).split("p")[0]);
      let temp_next_size = parseInt($(`#${nextId}`).css(size).split("p")[0]);
      autoReszieHeight(
        parseInt($(`#${footer_main}`).css("height").split("p")[0])
      );

      if (temp_next_size <= min_width_next && movePerPixels > 0) {
        $(`#${nextId}`).css(size, `${min_width_next}px`);
        $(`#${preId}`).css(size, parseInt(tempToTal) - min_width_next + "px");
        localStorage.setItem(`${nextId}`, `${min_width_next}px`);
        localStorage.setItem(
          `${preId}`,
          parseInt(tempToTal) - min_width_next + "px"
        );
        return;
      }
      if (temp_pre_size <= min_width_pre && movePerPixels < 0) {
        $(`#${preId}`).css(size, `${min_width_pre}px`);
        $(`#${nextId}`).css(size, parseInt(tempToTal) - min_width_pre + "px");
        localStorage.setItem(
          `${nextId}`,
          parseInt(tempToTal) - min_width_pre + "px"
        );
        localStorage.setItem(`${preId}`, `${min_width_pre}px`);
        return;
      }
      $(`#${preId}`).css(size, leftDivNewLocation + "px");
      $(`#${nextId}`).css(size, rightDivNewLocation + "px");
      localStorage.setItem(`${preId}`, leftDivNewLocation + "px");
      localStorage.setItem(`${nextId}`, rightDivNewLocation + "px");
    }
  };
  const mouseUpHandler = function (e) {
    document.getElementById(`${preId}`).style.removeProperty("user-select");
    document.getElementById(`${preId}`).style.removeProperty("pointer-events");

    document.getElementById(`${preId}`).style.removeProperty("user-select");
    document.getElementById(`${nextId}`).style.removeProperty("pointer-events");
    direction = "Released";
    directionWidth = "ReleasedWidth";
    document.body.style.cursor = "default";
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };
  $("#resize-1").mousedown(function (event) {
    mouseDownResizeWidth(event, footer_main, "content", "vertical");
  });
  $("#rs-3").mousedown(function (event) {
    mouseDownResizeWidth(
      event,
      "bottom-middle-right",
      "bottom-right",
      "horizontal"
    );
  });
  $("#rs-1").mousedown(function (event) {
    mouseDownResizeWidth(
      event,
      "bottom-left",
      "bottom-middle-left",
      "horizontal"
    );
  });
  $("#rs-2").mousedown(function (event) {
    mouseDownResizeWidth(
      event,
      "bottom-middle-left",
      "bottom-middle-right",
      "horizontal"
    );
  });
  function checkResizeHeight(arguHeight) {
    const { gridColCount2, gridColCount1, sumButton2, sumButton1 } = readGrid(
      "bottom-left",
      "bottom-middle-left"
    );
    let rowGridShow = Math.floor(arguHeight / heightGrid);
    let countShowButton = 0;
    let currentDisplayedButton1 = rowGridShow * gridColCount1;
    let currentDisplayedButton2 = rowGridShow * gridColCount2;
    if (currentDisplayedButton1 >= currentDisplayedButton2) {
      if (sumButton2 - currentDisplayedButton2 <= 0) {
        countShowButton = Math.ceil(sumButton2 / gridColCount2);
        return (tempHeight = countShowButton * heightGrid);
      } else {
        countShowButton = rowGridShow;
        return false;
      }
    }
    if (currentDisplayedButton1 < currentDisplayedButton2) {
      if (sumButton1 - currentDisplayedButton1 <= 0) {
        countShowButton = Math.ceil(sumButton1 / gridColCount1);
        return (tempHeight = countShowButton * heightGrid);
      } else {
        countShowButton = rowGridShow;
        return false;
      }
    }
  }
  function checkShowButton(arguHeight) {
    let countButton = Math.floor(arguHeight / heightGrid);
    let heightButton = countButton * heightGrid;
    $(`.${showItem}`).css("height", arguHeight - heightButton + "px");
    localStorage.setItem(`${showItem}`, arguHeight - heightButton + "px");
  }
  function autoReszieHeight(arguHeight) {
    const { gridColCount2, gridColCount1, sumButton2, sumButton1 } = readGrid(
      "bottom-left",
      "bottom-middle-left"
    );
    currentRow = Math.floor(arguHeight / heightGrid);
    let currentDisplayedButton1 = Math.ceil(sumButton1 / gridColCount1);
    let currentDisplayedButton2 = Math.ceil(sumButton2 / gridColCount2);
    if (currentDisplayedButton1 >= currentDisplayedButton2) {
      if (currentRow > currentDisplayedButton1) {
        $(`.${showItem}`).css("height", 0 + "px");
        localStorage.setItem(`${showItem}`, 0 + "px");
        $("#footer-child").css(
          "height",
          currentDisplayedButton1 * heightGrid + "px"
        );
        $(`#${footer_main}`).css(
          "height",
          currentDisplayedButton1 * heightGrid + "px"
        );
        let temp = currentDisplayedButton1 * heightGrid;
        $(`#${content}`).css("height", `calc(100% - ${temp}px)`);
        localStorage.setItem(`${content}`, `calc(100% - ${temp}px)`);
        localStorage.setItem(
          `${footer_main}`,
          currentDisplayedButton1 * heightGrid + "px"
        );
      }
    }
    if (currentDisplayedButton2 > currentDisplayedButton1) {
      if (currentRow > currentDisplayedButton2) {
        $(`.${showItem}`).css("height", 0 + "px");
        localStorage.setItem(`${showItem}`, 0 + "px");
        $(`#${footer_main}`).css(
          "height",
          currentDisplayedButton2 * heightGrid + "px"
        );
        $("#footer-child").css(
          "height",
          currentDisplayedButton2 * heightGrid + "px"
        );
        let temp = currentDisplayedButton2 * heightGrid;
        localStorage.setItem(
          `${footer_main}`,
          currentDisplayedButton2 * heightGrid + "px"
        );
        $(`#${content}`).css("height", `calc(100% - ${temp}px)`);
        localStorage.setItem(`${content}`, `calc(100% - ${temp}px)`);
      }
    }
  }
  
function readGrid(id_1, id_2) {
  const gridComputedStyle1 = window.getComputedStyle(
    document.getElementById(`${id_1}`).children[1]
  );
  const gridComputedStyle2 = window.getComputedStyle(
    document.getElementById(`${id_2}`).children[1]
  );
  let gridColCount1 = gridComputedStyle1
    .getPropertyValue("grid-template-columns")
    .split(" ").length;
  let gridColCount2 = gridComputedStyle2
    .getPropertyValue("grid-template-columns")
    .split(" ").length;
  let sumButton1 = parseInt(
    document
      .getElementById(`${id_1}`)
      .querySelector(".grid-wrapper")
      .querySelectorAll(".btn-1").length
  );
  let sumButton2 = parseInt(
    document
      .getElementById(`${id_2}`)
      .querySelector(".grid-wrapper")
      .querySelectorAll(".btn-1").length
  );
  return {
    gridComputedStyle1,
    gridComputedStyle2,
    gridColCount1,
    gridColCount2,
    sumButton1,
    sumButton2,
  };
}


/*     */

let checkRadius = true;
  let checkKey = false;
  // const showItem = "bg_w";
  // const heightGrid = 70;
  // const footer_main = "footerMain";
  // const backdrop = $(".backdrop");
  // const content = "content";


  function autoReszieHeight(arguHeight) {
    const gridComputedStyle1 = window.getComputedStyle(
      document.getElementById(`bottom-left`).children[1]
    );
    const gridComputedStyle2 = window.getComputedStyle(
      document.getElementById(`bottom-middle-left`).children[1]
    );
    let gridColCount1 = gridComputedStyle1
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    let gridColCount2 = gridComputedStyle2
      .getPropertyValue("grid-template-columns")
      .split(" ").length;

    let sumButton1 = parseInt(document.getElementById(`bottom-left`).querySelector(".grid-wrapper")
                              .querySelectorAll(".btn-1").length);

    let sumButton2 = parseInt(document.getElementById(`bottom-middle-left`).querySelector(".grid-wrapper")
                              .querySelectorAll(".btn-1").length);
                              
    currentRow = Math.floor(arguHeight / heightGrid);
    let currentDisplayedButton1 = Math.ceil(sumButton1 / gridColCount1);
    let currentDisplayedButton2 = Math.ceil(sumButton2 / gridColCount2);
    if (currentDisplayedButton1 >= currentDisplayedButton2) {
      if (currentRow > currentDisplayedButton1) {
        $(`.${showItem}`).css("height", 0 + "px");
        localStorage.setItem(`${showItem}`, 0 + "px");
        $("#footer-child").css(
          "height",
          currentDisplayedButton1 * heightGrid + "px"
        );
        $(`#${footer_main}`).css(
          "height",
          currentDisplayedButton1 * heightGrid + "px"
        );
        let temp = currentDisplayedButton1 * heightGrid;
        $(`#${content}`).css("height", `calc(100% - ${temp}px)`);
        localStorage.setItem(`${content}`, `calc(100% - ${temp}px)`);
        localStorage.setItem(
          `${footer_main}`,
          currentDisplayedButton1 * heightGrid + "px"
        );
      }
    }
    if (currentDisplayedButton2 > currentDisplayedButton1) {
      if (currentRow > currentDisplayedButton2) {
        $(`.${showItem}`).css("height", 0 + "px");
        localStorage.setItem(`${showItem}`, 0 + "px");
        $(`#${footer_main}`).css(
          "height",
          currentDisplayedButton2 * heightGrid + "px"
        );
        $("#footer-child").css(
          "height",
          currentDisplayedButton2 * heightGrid + "px"
        );
        let temp = currentDisplayedButton2 * heightGrid;
        localStorage.setItem(
          `${footer_main}`,
          currentDisplayedButton2 * heightGrid + "px"
        );
        $(`#${content}`).css("height", `calc(100% - ${temp}px)`);
        localStorage.setItem(`${content}`, `calc(100% - ${temp}px)`);
      }
    }
  }
 
  function handleHeightChange(val) {
    const heightFooterMain = document.querySelector("#footerMain").offsetHeight;
    const statusBox = document.querySelector("#statusBox-gird");
    const chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
      .children;
    const chilren = document
      .querySelector("#statusBox-gird")
      .querySelectorAll(".status");

    let count = heightFooterMain;

    if (chilrens.length == 1) {
      $("#resetBtn-3").hide();
      const boxItem = document.querySelector("#status-box");

      if(boxItem)
      {
        boxItem.style.display = "flex";
        (boxItem.style.flexDirection = "column"),
          (boxItem.style.justifyContent = "center");
      }
    }

    if (chilrens.length == 2) {
      $("#resetBtn-3").hide();
      chilren.forEach((child) => {
        child.style.fontSize = "12px";
        child.style.overflow = "hidden";
        const bx = child.querySelector("#status-box");
        // bx.style.display = "flex";
        // (bx.style.flexDirection = "column"),
        //   (bx.style.justifyContent = "center");
      });

      chilren[0].style.marginBottom = "10px";

      chilren.forEach((item) => {
        item.children[0].children[0].style.width = "60px";
        // item.style.padding = "12px";
        if (heightFooterMain > chilren.length * 70) {
          item.style.height = "70px";
        }
      });
    }

    if (chilrens.length >= 3) {
      chilren[0].style.marginBottom = "0px";
      chilren.forEach((item) => {
        const itemActive = item.classList.contains("active");
        if (itemActive) {
          count -= 80;
        }
      });

      if (heightFooterMain > statusBox.offsetHeight) {
        chilren.forEach((item) => {
          item.style.height = "auto";
          const itemActive = item.classList.contains("active");
          if (!itemActive) {
            item.style.height = count / (chilrens.length - 1) + "px";
          }
        });
      }
      if (val && statusBox.offsetHeight > heightFooterMain) {
        chilren.forEach((item) => (item.style.height = "70px"));
      }
      chilren.forEach((item) => {
        if (heightFooterMain > chilren.length * 70) {
          item.style.height = "70px";
        }
      });
    }

    // check heightFooterMain > status item => full width
    const img = statusBox.querySelectorAll("img");
    if (heightFooterMain > chilren.length * 70 + chilren.length * 6) {
      setWidtItemFull();
    } else {
      SetWidthOfBox();
    }

    if (
      heightFooterMain > chilren.length * 70 + chilren.length * 6 ||
      checkKey ||
      chilren.length === 2
    ) {
      img.forEach((item) => {
        item.style.width = "60px";
      });
    } else {
      img.forEach((item) => {
        item.style.width = "36px";
      });
      $(".cardBoxLayer").each(function () {
        if ($(this).hasClass("active")) {
          $(this)[0].children[0].children[0].style.width = "60px";
        }
      });
    }
  }

  function renderElm(_id) {
    $(".collapseBtn-3").hide();
    const _elm = document.getElementById(_id);
    if (_elm.querySelector(".resetBtn")) {
      const gridComputedStyle1 = window.getComputedStyle(
        document.getElementById(`bottom-left`).children[1]
      );
      const gridComputedStyle2 = window.getComputedStyle(
        document.getElementById(`bottom-middle-left`).children[1]
      );
      let gridColCount1 = gridComputedStyle1
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
      let gridColCount2 = gridComputedStyle2
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
      let sumButton1 = parseInt(
        document
          .getElementById(`bottom-left`)
          .querySelector(".grid-wrapper")
          .querySelectorAll(".btn-1").length
      );
      let sumButton2 = parseInt(
        document
          .getElementById(`bottom-middle-left`)
          .querySelector(".grid-wrapper")
          .querySelectorAll(".btn-1").length
      );
      let tempHeightFooter = parseInt(
        $(`#footerMain`).css("height").split("p")[0]
      );
      let tempRow = Math.floor(tempHeightFooter / 70);
      if (_id == "bottom-left") {
        let isChecked = showButtonArrow(gridColCount1, tempRow, sumButton1);
        if (!_elm.querySelector(".grid-wrapper").querySelector(".btn-1")) {
          $("#resetBtn-1").hide();
        }
        if (isChecked) {
          $("#resetBtn-1").hide();
        }
        if (!isChecked) {
          document.getElementById("resetBtn-1").style.display = "block";
        }
      }
      if (_id == "bottom-middle-left") {
        let isChecked = showButtonArrow(gridColCount2, tempRow, sumButton2);
        if (!_elm.querySelector(".grid-wrapper").querySelector(".btn-1")) {
          $("#resetBtn-2").hide();
        }
        if (isChecked) {
          $("#resetBtn-2").hide();
        }
        if (!isChecked) {
          document.getElementById("resetBtn-2").style.display = "block";
        }
      }
      if (_id == "bottom-middle-right") {
        const el = $(".status");
        if (el.length < 1) {
          $("#resetBtn-3").hide();
        }
      }
    }
    handleHeightChange((key = false));

    const heightFooterMain = document.querySelector("#footerMain").offsetHeight;
    const chilren = document
      .querySelector("#statusBox-gird")
      .querySelectorAll(".status");
    if (heightFooterMain < chilren.length * 70 + chilren.length * 6) {
      chilren.forEach((item) => {
        item.style.marginTop = "";
      });
    }

    styleRadiusDefault();
    $(".cardBoxLayer").each(function () {
      if ($(this).hasClass("active")) {
        $(this)[0].children[0].children[0].style.width = "60px";
      }
    });
  }
  function checkExist(_id) {
    const _elm = document.getElementById(_id);

    if (
      (localStorage.getItem(_id) && _id === "footerMain") ||
      (localStorage.getItem(_id) && _id === "content")
    ) {
      _elm.setAttribute("style", `height: ${localStorage.getItem(_id)}`);

      if (_id === "footerMain" && document) {
        document.getElementById("footer-child").setAttribute("style", `height: ${localStorage.getItem(_id)}`);
      }
    }

    if (
      localStorage.getItem(_id) &&
      _id !== "footerMain" &&
      _id !== "content"
    ) {
      $(`#${_id}`).css("width", localStorage.getItem(_id));
    }

    if (localStorage.getItem("bg_w")) {
      $(`.bg_w`).css("height", localStorage.getItem("bg_w"));
    }
  }
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
    renderElm(_id);
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
        elementSelected.has(e.target).length == 0
      ) {
        $("#rs-1").css("pointer-events", "auto");
        $("#rs-2").css("pointer-events", "auto");
        $(`#${_idSecond}`).removeClass("overlay");
        $("#bottom-middle-right").removeClass("overlay");
        $("#bottom-right").removeClass("overlay");
        $(`#${_id} .grid-wrapper`).removeClass("expand");
        renderElm(_id);
      }
    }
  });

  const wrap = document.querySelectorAll(".resize-div");
  const obver = new ResizeObserver((entries) => {
    for (entry of entries) {
      checkExist(entry.target.id);
      renderElm(entry.target.id);
    }
  });

  wrap.forEach((w) => obver.observe(w));
  window.addEventListener(
    "resize",
    function () {
      localStorage.removeItem("bottom-right");
      localStorage.removeItem("bottom-middle-right");
      localStorage.removeItem("bottom-middle-left");
      localStorage.removeItem("bottom-left");
      $(`#bottom-middle-right`).css("width", "25%");
      $(`#bottom-right`).css("width", "25%");
      $(`#bottom-middle-left`).css("width", "25%");
      $(`#bottom-left`).css("width", "25%");
      autoReszieHeight(
        parseInt($(`#${footer_main}`).css("height").split("p")[0])
      );
      checkExist("#footerMain");
    },
    true
  );

  function showButtonArrow(currentCol, currentRow, sumButton) {
    let temp = Math.ceil(sumButton / currentCol);
    if (temp > currentRow) {
      return false;
    } else {
      return true;
    }
  }

  $("#resetBtn-3").click(() => {
    checkRadius = false;
    checkKey = true;
    const heigthFooterMain = document.getElementById("footerMain").clientHeight;
    const chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
      .children;
    const chilren = document.querySelector("#statusBox-gird");
    const chilrenItem = document
      .querySelector("#statusBox-gird")
      .querySelector(".active").clientHeight;
    const itemBox = chilren.querySelectorAll(".cardBoxLayer");
    const heigthWrapperItem =
      chilrens.length * chilrenItem + 36 + itemBox.length * 6;
    if (heigthFooterMain < heigthWrapperItem) {
      chilren.style.height =
        heigthWrapperItem < 400 ? heigthWrapperItem + "px" : "400px";
      chilren.style.position = "absolute";
      chilren.style.zIndex = "1000";
      chilren.style.bottom = "0";
      chilren.style.left = "0";
      chilren.style.width = "100%";
      chilren.style.background = "#333333";
      chilren.style.paddingTop = "12px";
      chilren.style.paddingBottom = "12px";
      chilren.style.borderRadius = "0px";
      chilren.style.border = "2px solid silver";
      chilren.style.borderBottom = "none";
      chilren.style.overflow = "hidden auto";
    }

    if (heigthWrapperItem < 400) {
      chilren.style.paddingRight = "10px";
    }

    $("#resetBtn-3").hide();
    $(".collapseBtn-3").show();

    handleHeightChange((key = true));
    setWidtItemFull();
  });

  $(".collapseBtn-3").click((e) => {
    e.preventDefault();
    checkRadius = true;
    checkKey = false;
    styleChildrenStatus();
    // styleDefaultItem();
    SetWidthOfBox();
    styleRadiusActive();

    $(".collapseBtn-3").hide();
    $("#resetBtn-3").show();
  });

  // Click item status box
  $(".cardBoxLayer").each(function (index) {
    $(this).on("click", function (e) {
      localStorage.setItem("pos-status", index);
      e.preventDefault();
      clearStyle();
      $(this).addClass("active");
      handleHeightChange((key = false));
      if ($(this).hasClass("active")) {
        $(this)[0].children[0].children[0].style.width = "60px";
      }

      styleRadiusDefault();
    });
  });
  function clearStyle() {
    buttonWithActive = $(".cardBoxLayer.active");
    buttonWithActive.removeClass("active");
  }

  $(document).mousedown((e) => {
    e.preventDefault();

    const boxExpend = $("#statusBox-gird");
    const chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
      .children;

    if (!boxExpend.is(e.target) && boxExpend.has(e.target).length == 0) {
      $(".collapseBtn-3").hide();
      $("#rs-1").css("pointer-events", "auto");
      $("#rs-2").css("pointer-events", "auto");
      $(`#bottom-left`).removeClass("overlay");
      $(`#bottom-middle-left`).removeClass("overlay");
      $("#bottom-right").removeClass("overlay");
      $(`#bottom-middle-right.statusBox`).removeClass("expand");

      if (chilrens.length >= 3) {
        $("#resetBtn-3").show();
      }
      styleChildrenStatus();
      // styleDefaultItem();
      SetWidthOfBox();
      checkRadius = true;
      checkKey = false;
    }

    handleHeightChange((key = false));
  });

  function styleChildrenStatus() {
    const children = document.querySelector("#statusBox-gird");
    const itemBox = children.querySelectorAll(".cardBoxLayer");
    const heigthWrapperItem = itemBox.length * 70 + 36 + itemBox.length * 6;

    children.style.height = "100%";
    children.style.position = "";
    children.style.zIndex = "";
    children.style.bottom = "";
    children.style.left = "";
    children.style.width = "";
    children.style.background = "";
    children.style.paddingTop = "";
    children.style.paddingBottom = "";
    children.style.borderRadius = "none";
    children.style.overflow = "hidden";

    children.style.border = "none";
    children.style.borderBottom = "none";

    itemBox.forEach((item) => {
      item.style.marginTop = "";
    });

    if (heigthWrapperItem < 400) {
      children.style.paddingRight = "0px";
    }
  }

  function SetWidthOfBox() {
    const heightFooterMain = document.querySelector("#footerMain").offsetHeight;
    const statusBox = document.querySelector("#statusBox-gird").offsetHeight;
    if (heightFooterMain < statusBox) return;
    // debugger;
    var chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
      .children;
    var childIndex = 0;

    var parentWidth = 100;
    var widthOffset = 4;

    if (chilrens) {
      for (var i = 0; i < chilrens.length; i++) {
        var child = chilrens[i];
        if (child.className?.includes("active")) {
          childIndex = i;
        }
      }

      let preActive = [];
      let suffActive = [];
      let styleWidth = 0;
      let finalMgForLess = 0;
      for (var i = 0; i < chilrens.length; i++) {
        var child = chilrens[i];

        if (i < childIndex) {
          preActive = [...preActive, chilrens[i]];
          child.onclick = contact_clicked;
        }
        if (i > childIndex) {
          suffActive = [...suffActive, chilrens[i]];
          child.onclick = contact_clicked;
        }
      }

      if (preActive.length > suffActive.length) {
        styleWidth = preActive.length * widthOffset;
        finalMgForLess = styleWidth / suffActive.length;
      } else {
        styleWidth = suffActive.length * widthOffset;
        finalMgForLess = styleWidth / preActive.length;
      }
      if (preActive.length < suffActive.length) {
        preActive.reverse().forEach((item, index) => {
          item.style.marginLeft = (finalMgForLess * (index + 1)) / 2 + "%";
          item.style.width = parentWidth - finalMgForLess * (index + 1) + "%";
        });
        suffActive.forEach((item, index) => {
          item.style.marginLeft = (widthOffset * (index + 1)) / 2 + "%";
          item.style.width = parentWidth - widthOffset * (index + 1) + "%";
        });
      } else {
        preActive.reverse().forEach((item, index) => {
          item.style.marginLeft = (widthOffset * (index + 1)) / 2 + "%";
          item.style.width = parentWidth - widthOffset * (index + 1) + "%";
        });
        suffActive.forEach((item, index) => {
          item.style.marginLeft = (finalMgForLess * (index + 1)) / 2 + "%";
          item.style.width = parentWidth - finalMgForLess * (index + 1) + "%";
        });
      }
      // }
    }
  }

  
function contact_clicked(sender) {
  var chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
    .children;
  const heightFooterMain = document.querySelector("#footerMain").offsetHeight;
  const chilren = document
    .querySelector("#statusBox-gird")
    .querySelectorAll(".status");
  if (chilrens) {
    for (var i = 0; i < chilrens.length; i++) {
      var child = chilrens[i];
      if (child.tagName.toLowerCase() != "div") continue;
      child.style.marginTop = child.OriginalMarginTop;
    }
  }
  if (heightFooterMain < chilren.length * 70 + chilren.length * 6) {
    SetWidthOfBox();
  }
  SetZindex();
}

  function setWidtItemFull() {
    const itemBox = document
      .querySelector("#statusBox-gird")
      .querySelectorAll(".cardBoxLayer");
    itemBox.forEach((item) => {
      item.style.width = "94%";
      item.style.marginLeft = "3%";
      item.style.marginRight = "3%";
      item.style.marginTop = "6px";
    });
  }

  $(".cardBoxLayer").mouseover((e) => {
    const heigthFooterMain = $("#footerMain").css("height").split("p")[0];
    const chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
      .children;
    const chilren = document
      .querySelector("#statusBox-gird")
      .querySelectorAll(".cardBoxLayer");
    const chilrenItem = document
      .querySelector("#statusBox-gird")
      .querySelector(".active").clientHeight;
    const heigthWrapperItem =
      chilrens.length * chilrenItem + 36 + chilren.length * 6;

    if (
      parseInt(heigthFooterMain) < parseInt(heigthWrapperItem) &&
      checkRadius
    ) {
      styleRadiusActive();
    } else {
      styleRadiusDefault();
    }
  });

  function styleRadiusActive() {
    let childIndex = 0;
    const chilrens = document.querySelectorAll("#bottom-middle-right div")[0]
      .children;

    for (let i = 0; i < chilrens.length; i++) {
      let child = chilrens[i];
      if (child.className?.includes("active")) {
        childIndex = i;
      }
    }
    for (let i = 0; i < chilrens.length; i++) {
      let child = chilrens[i];

      if (i < childIndex && chilrens.length != 2) {
        child.style.borderBottomLeftRadius = "0px";
        child.style.borderBottomRightRadius = "0px";
      }
      if (i > childIndex && chilrens.length != 2) {
        child.style.borderTopLeftRadius = "0px";
        child.style.borderTopRightRadius = "0px";
      }
    }
  }

  function styleRadiusDefault() {
    const chilrens = document.querySelectorAll("#bottom-middle-right div");
    [...chilrens].forEach((item) => {
      item.style.borderRadius = "5px";
    });
  }

  // window.onload = () => {
    checkActionStatus();
    handleHeightChange((key = false));
  // };
  
  function checkActionStatus() {
    const buttonActive = localStorage.getItem("button-active");
    const posStatus = localStorage.getItem("pos-status");
    const item = document.querySelectorAll(".cardBoxLayer");

    if (posStatus) {
      const buttonWithActive = document.querySelector(".cardBoxLayer.active");
      buttonWithActive.classList.remove("active");

      item[posStatus].classList.add("active");
    }

    $(`[data-keep-target='${buttonActive}']`).addClass("active");
  }

  window.dc = function () {
    return {
      handleHeightChange,
      SetWidthOfBox,
      styleChildrenStatus,
      styleRadiusDefault,
      styleRadiusActive,
      renderElm,
      obver,
    };
  };

  


  $(".collapseBtn-3").hide();
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

  $(".ovl-btn").click(function (e) {
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

  $("#resetBtn-3").click(function (e) {
    e.preventDefault();
    $("#rs-1").css("pointer-events", "none");
    $("#rs-2").css("pointer-events", "none");
    $(`#bottom-left`).addClass("overlay");
    $(`#bottom-middle-left`).addClass("overlay");
    $("#bottom-right").addClass("overlay");
    $(`#bottom-middle-right.statusBox`).addClass("expand");
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

  $(".collapseBtn-3").click((e) => {
    e.preventDefault();
    $("#rs-1").css("pointer-events", "auto");
    $("#rs-2").css("pointer-events", "auto");
    $(`#bottom-left`).removeClass("overlay");
    $(`#bottom-middle-left`).removeClass("overlay");
    $("#bottom-right").removeClass("overlay");
    $(`#bottom-middle-right.statusBox`).removeClass("expand");
  });

  $(document).mouseup(function (event) {
    let arrayModal = document.querySelectorAll(".modal");
    let temp = [...arrayModal].find((item) =>
      item.classList.contains("active")
    );
    if (temp) {
    }
  });



  const showModal = (name) => {
    let modal;
    if (name === "first") {
      modal = document.getElementById("bottom-left");
      // document.getElementById("bottom-middle-left").style.display = "none";
    } else {
      modal = document.getElementById("bottom-middle-left");
      //   document.getElementById("bottom-left").style.display = "none";
    }
    document.getElementById("exit-modal").style.display = "block";
    // document.getElementById("bottom-middle-right").style.display = "none";
    //document.getElementById("bottom-right").style.display = "none";
    modal.style.display = "grid";
    modal.style.width = "100%";
    modal.style.resize = "none";
    modal.style.borderRight = "none";
  };
  
  const exitModal = () => {
    const bottomLeft = document.getElementById("bottom-left");
    const bottomMiddleLeft = document.getElementById("bottom-middle-left");
  
    for (let element of [bottomLeft, bottomMiddleLeft]) {
      //    element.style.display = "none";
      element.style.width = "33.33%";
      element.style.resize = "horizontal";
      element.style.borderRight = "2px solid silver";
    }
  
    //  document.getElementById("exit-modal").style.display = "none";
    document.getElementById("bottom-middle-right").style.display = "grid";
    // document.getElementById("bottom-right").style.display = "grid";
  };
  
  document.addEventListener("resize", (event) => {});
  
  onresize = (event) => {
    if (window.innerWidth > 1000) {
      document.getElementById("bottom-left").style.display = "grid";
      document.getElementById("bottom-middle-left").style.display = "grid";
    } else {
      //    document.getElementById("bottom-left").style.display = "none";
      //   document.getElementById("bottom-middle-left").style.display = "none";
    }
  };
  
  const handleMoveModal = () => {
    setTimeout(() => {
      const modalActive = document.querySelector(".modal.active");
      let modalHeader = null;

      if(document.querySelector(".modal.active") && document.querySelector(".modal.active").querySelector(".modal-header"))
      {
        modalHeader = document.querySelector(".modal.active").querySelector(".modal-header");
      }

      dragElement(modalActive);
  
      function dragElement(elmnt) {
        let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
  
        if(modalHeader)
        {
          modalHeader.onmousedown = dragMouseDown;
          function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
          }
        }
  
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }
  
        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    }, 500);
  };
  
  function handleSearch() {   
    showOverLayModal(true);
    handleMoveModal();
  }

  function handleSetPosModal() {
    const modalActive = document.querySelector(".modal.active");
    modalActive.style.top = "50%";
    modalActive.style.left = "50%";
    modalActive.style.transform = "translate(-50%, -50%)";
  }

  const btn1 = document.querySelectorAll("[data-target]");
  btn1.forEach((item) => {
    item.addEventListener("click", handleSearch);
  });

  const showOverLayModal = (argu) => {
    argu === true
      ? (document.getElementById("overlay-modal").style.zIndex = 101)
      : (document.getElementById("overlay-modal").style.zIndex = -1);
  };


  function handleChangePage(argu_id) {
    let tempArray = document
      .getElementById("search-modal-header")
      .querySelectorAll("div");
    const isCheck = document
      .getElementById(argu_id)
      .classList.contains("search-tab-active");
    if (isCheck) {
      return;
    } else {
      let itemCurrentActive = [...tempArray].find(
        (item) => item.classList.contains("search-tab-active") === true
      );
      if (itemCurrentActive) {
        itemCurrentActive.classList.remove("search-tab-active");
        document.getElementById(argu_id).classList.add("search-tab-active");
      } else {
        document.getElementById(argu_id).classList.add("search-tab-active");
      }
    }
  }

})(jQuery);



