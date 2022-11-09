(function ($) {
  const backdrop = $('.backdrop');

  backdrop.on('click', () => {
    $('.modal.active').removeClass('active');
    backdrop.removeClass('active');

    let btnManualDial = document.getElementById('VoiceNewCall');
    removeElementClass(btnManualDial, 'active');
  });

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


})(jQuery);



// (function ($) {
//   $(".close-Script-Trigger").on('click', (ev) => {

//     debugger;
//     $(".when-ready").removeClass("active");
//     alert('test');
//   });

//   function my_fun(){
//     debugger;
//     $(".when-ready").removeClass("active");
//     alert('test');
// }
// })(jQuery);




