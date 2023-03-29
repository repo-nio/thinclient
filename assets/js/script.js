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


  function renderElm(_id) {
    // debugger;
    const _elm = document.getElementById(_id);

    // const _elmFake = document.getElementById(`${_id}-1`);
    if (parseFloat(getComputedStyle(_elm).flexGrow) !== 1) {
      localStorage.setItem(_id, getComputedStyle(_elm).flexGrow);
    }
    // localStorage.setItem(_id, getComputedStyle(_elm).flexGrow)
    if (_elm.querySelector(".resetBtn")) {
      // _elmFake.style.flex = `${getComputedStyle(_elm).flexGrow} 1 0%`
      let _num = 0;
      if (window.innerWidth > 1100) {
        _num = _id === "bottom-left" ? 1.1 : 1.31;
      } else {
        _num = _id === "bottom-left" ? 1.6 : 2.7;
      }

      if (getComputedStyle(_elm)["flexGrow"] > _num) {
        _elm.querySelector(".resetBtn").classList.remove("right");
      } else {
        _elm.querySelector(".resetBtn").classList.remove("left");
        _elm.querySelector(".resetBtn").classList.add("right");
      }
    }
  }
  
  function checkExist(_id) {
    const _elm = document.getElementById(_id);

    if (localStorage.getItem(_id)) {
      _elm.style.flexGrow = localStorage.getItem(_id);
    } else {
      
      if (_elm.querySelector(".resetBtn")) {
        _elm.querySelector(".resetBtn").classList.remove("right");
        _elm.querySelector(".resetBtn").classList.remove("left");
      }
    }
  }


const wrap = document.querySelectorAll(".resize-div");
wrap.forEach(function (e) {
  // debugger;
  checkExist("bottom-left");
  checkExist("bottom-middle-left");
  checkExist("voiceStatusToolStrip");

  function outputsize() {
    // debugger;
    const width = e.offsetWidth;
    const height = e.offsetHeight;

    renderElm("bottom-left");
    renderElm("bottom-middle-left");
    renderElm("voiceStatusToolStrip");
  }
  // outputsize();

  new ResizeObserver(outputsize).observe(e);
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

  // var offsetHeight = document.getElementById('footerMain').offsetHeight;
  // var nFilter = document.getElementById('bottom-left');
  // nFilter.setAttribute("style", "max-height:auto");
  // nFilter.setAttribute("style", "max-height:" + offsetHeight +"px");
  // var nFilterMid = document.getElementById('bottom-middle-left');
  // nFilterMid.setAttribute("style", "max-height:auto");
  // nFilterMid.setAttribute("style", "max-height:" + offsetHeight +"px");

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

      manageResize(md, "offsetHeight", "pageY");
    }
  });
}

setupResizerEvents();

// debugger;
// jQuery(document).ready(function($){    
  $(function() {
      resize_footer_height();
  });
  $(window).resize(function() {
      resize_footer_height();
  });
  function resize_footer_height(){
    // debugger;
      var tempHeight2=$(window).height()/5.25;
      $('.footer-main').height(130);
  };

  $('.resetBtn').click(function(e){
      e.preventDefault();
      console.log($('#bottom-middle-left'))
      let _id = ''
      let _idSecond = ''
      if ($(this).parent().attr('id') === 'bottom-left') {
          _id = 'bottom-left'
          _idSecond = 'bottom-middle-left'
      } else {
          _id = 'bottom-middle-left'
          _idSecond = 'bottom-left'
      }
      $("#rs-1").css('pointer-events','none')
      $("#rs-2").css('pointer-events','none')
      $(`#${_idSecond}`).addClass('overlay')
      $("#voiceStatusToolStrip").addClass('overlay')
      $("#bottom-right").addClass('overlay')
      $(`#${_id} .grid-wrapper`).addClass('expand')
  });

  $('.collapseBtn').click(function(e){
      e.preventDefault();
      if ($(this).parent().parent().attr('id') === 'bottom-left') {
          _id = 'bottom-left'
          _idSecond = 'bottom-middle-left'
      } else {
          _id = 'bottom-middle-left'
          _idSecond = 'bottom-left'
      }
      $("#rs-1").css('pointer-events','auto')
      $("#rs-2").css('pointer-events','auto')
      $(`#${_idSecond}`).removeClass('overlay')
      $("#voiceStatusToolStrip").removeClass('overlay')
      $("#bottom-right").removeClass('overlay')
      $(`#${_id} .grid-wrapper`).removeClass('expand')
     
  });
   ///Click outSide
  $(document).mouseup(function(e) {
  let _id = '';
  let _idSecond = '';
  let elementSelected = '';
  let element_bottom_left = $("#bottom-left .grid-wrapper");
  let element_bottom_middleL = $("#bottom-middle-left .grid-wrapper");
  const compare1 = element_bottom_left.hasClass("expand");
  const compare2 = element_bottom_middleL.hasClass("expand");
      if ( compare1) {
              _id = 'bottom-left'
              _idSecond = 'bottom-middle-left'
              elementSelected = element_bottom_left;
      }
      if ( compare2) {
          _id = 'bottom-middle-left';
          _idSecond = 'bottom-left';
          elementSelected = element_bottom_middleL;
      }  
      if ( elementSelected) {
          if (!elementSelected.is(e.target) && elementSelected.has(e.target).length === 0) {
              $("#rs-1").css('pointer-events','auto')
              $("#rs-2").css('pointer-events','auto')
              $(`#${_idSecond}`).removeClass('overlay');
              $("#voiceStatusToolStrip").removeClass('overlay');
              $("#bottom-right").removeClass('overlay');
              $(`#${_id} .grid-wrapper`).removeClass('expand');
          }
      }
  })
// })


})(jQuery);



