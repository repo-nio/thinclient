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
  $(column).find('button.btn-1').each((i, button) => {
    $(button).on('click', () => {
      const target = $(button).data("target");

      $('button.btn-1').removeClass('active');
      $(button).addClass('active');

      // Check if element exists
      if ($(target).length) {
        $(target).addClass('active');
        backdrop.addClass('active');
      }
    })
  })
})
