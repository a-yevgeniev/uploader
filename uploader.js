var Uploader = (function () {
    var isAdvancedUpload = function() {
      var div = document.createElement('div');
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

    if (!isAdvancedUpload){
        return;
    }

    var $uploader = $('.uploader'),
        $input = $uploader.find('input[type="file"]'),
        $label = $uploader.find('label'),
        showFiles = function(files) {
          $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
        };

    $input.on('change', function(e) {
      showFiles(e.target.files);
    });

    var droppedFiles = false;

    $uploader.addClass('has-advanced-upload')
    .on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', function() {
        $uploader.addClass('is-dragover');
    })
    .on('dragleave dragend drop', function() {
        $uploader.removeClass('is-dragover');
    })
    .on('drop', function(e) {
        droppedFiles = e.originalEvent.dataTransfer.files;
        showFiles( droppedFiles );
    });

    return {
        getFiles: function(){
            var ajaxData = new FormData();

            if (droppedFiles) {
                $.each( droppedFiles, function(i, file) {
                  ajaxData.append( $input.attr('name'), file );
                });
            }
            return ajaxData;
        }
    }
}());