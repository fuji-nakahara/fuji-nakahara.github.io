$(function () {
  $.get('https://fuji-nakahara.hatenablog.com/feed', function (data) {
    $(data).find('entry').each(function () {
      var entry = $(this);
      var title = entry.children('title').text();
      var link = entry.children('link').first().attr('href');

      $('<a></a>')
        .addClass('list-group-item list-group-item-action')
        .attr('href', link)
        .text(title)
        .appendTo('#blog-entries');
    });
  });
});
