const backdrop = $('.backdrop');

backdrop.on('click', () => {
  $('.modal.active').removeClass('active');
  backdrop.removeClass('active');
});

$(".modal [data-close]").on('click', (ev) => {
  $(ev.currentTarget).closest('.modal').removeClass('active');
  backdrop.removeClass('active');
});

$('.column').each((i, column) => {
  // $(column).find('button.btn-1').each((i, button) => {
  //   $(button).on('click', () => {
  //     const _switch = $(button).data("switch");
  //     const target = $(button).data("target");
  //     const mode = $(button).data("mode");

  //     $('button.btn-1').removeClass('active');
  //     $(button).addClass('active');

  //     // Check if element exists
  //     if ($(target).length) {
  //       $(target).addClass('active');
  //       backdrop.addClass('active');
  //     }

  //     if (_switch) {
  //       const image = $('.animation').data(`${_switch}-image`);
  //       $('.animation').attr('src', image);

  //       if (_switch === "ready") {
  //         $(".when-ready").addClass("active")
  //         $("#state").text("Ready")
  //       }

  //       if (_switch === "break") {
  //         $(".when-ready").removeClass("active");
  //         $("#state").text("Break")
  //       }

  //       const url = new URL(window.location.href);
  //       url.pathname = url.pathname + "/../embed.html"
  //       url.hash = _switch;

  //       $("object").attr("data", "");
  //       $("object").on("load", () => {
  //         $("object").off("load");
  //         $("object").attr("data", url.href);
  //       })
  //     }
  //   })
  // })
})

$(".btn-3").on('click', (ev) => {
  const input = $("input#dial");
  input.val(input.val() + $(ev.currentTarget).text());
});

$("#dial-clear").on('click', () => {
  $("input#dial").val("");
});