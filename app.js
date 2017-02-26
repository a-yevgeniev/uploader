(function () {
    var $form = $('.form');

    $form
    .on('submit', function(e) {
      if ($form.hasClass('is-uploading')) return false;

      $form.addClass('is-uploading').removeClass('is-error');
      e.preventDefault();

      var attachments = Uploader.getFiles();

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: {
            ajaxData: 'someData',
            attachments: attachments
        },
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        complete: function() {
          $form.removeClass('is-uploading');
        },
        success: function(data) {
          $form.addClass( data.success == true ? 'is-success' : 'is-error' );
          if (!data.success) $errorMsg.text(data.error);
        },
        error: function() {
          // Log the error, show an alert, whatever works for you
        }
      });
    });
}());