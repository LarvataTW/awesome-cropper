// Generated by CoffeeScript 1.4.0
(function() {
  var $;

  $ = jQuery;

  $.awesomeCropper = function(inputAttachTo, options) {
    var $container, $dropArea, $fileSelect, $imagesContainer, $inputAttachTo, $previewIm, $progressBar, $sourceIm, $urlSelect, $urlSelectButton, div, handleDragOver, handleDropFileSelect, handleFileSelect, image, input, log, readFile, removeAreaSelect, removeLoading, row, setAreaSelect, setImages, setLoading, settings;
    settings = {
      width: 100,
      height: 100,
      debug: true
    };
    input = function(type, name) {
      return $("<input type = \"" + type + "\" />");
    };
    div = function() {
      return $("<div/>");
    };
    image = function() {
      return $('<img/>');
    };
    row = function() {
      return div().addClass('row');
    };
    settings = $.extend(settings, options);
    log = function(msg) {
      if (settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };
    $inputAttachTo = $(inputAttachTo);
    $container = div().insertAfter($inputAttachTo).addClass('awesome-cropper row');
    $fileSelect = input('file');
    $container.append(row().append(div().addClass('span6 control-group').append($fileSelect)));
    $urlSelect = input('text');
    $urlSelect.addClass('asd');
    $urlSelectButton = input('button');
    $urlSelectButton.val('Upload from url');
    $container.append(row().append(div().addClass('span4 control-group').append($urlSelect)).append(div().addClass('span2 control-group').append($urlSelectButton)));
    $dropArea = div().html('or Drop file here');
    $dropArea.addClass('awesome-cropper-drop-area well');
    $container.append(row().append(div().addClass('span6 control-group').append($dropArea)));
    $progressBar = div().addClass('progress progress-striped active hide').append(div().addClass('bar').css('width', '100%'));
    $container.append($progressBar);
    $previewIm = image().css({
      width: settings.width + "px",
      height: settings.height + "px",
      'max-width': 'none'
    });
    $sourceIm = image();
    $imagesContainer = row().append(div().addClass('span9').append($sourceIm)).append(div().addClass('span3').css({
      width: settings.width + "px",
      height: settings.height + "px",
      overflow: 'hidden'
    }).append($previewIm));
    $container.append($imagesContainer);
    setLoading = function() {
      $imagesContainer.hide();
      return $progressBar.removeClass('hide');
    };
    removeLoading = function() {
      $imagesContainer.show();
      return $progressBar.addClass('hide');
    };
    setImages = function(uri) {
      $previewIm.attr('src', uri);
      $sourceIm.attr('src', uri);
      return setAreaSelect($sourceIm);
    };
    setAreaSelect = function(image) {
      var _this = this;
      return image.imgAreaSelect({
        aspectRatio: '1:1',
        handles: true,
        onSelectChange: function(img, selection) {
          var scaleX, scaleY;
          scaleX = 100 / (selection.width || 1);
          scaleY = 100 / (selection.height || 1);
          return $previewIm.css({
            width: Math.round(scaleX * $(img).width()) + 'px',
            height: Math.round(scaleY * $(img).height()) + 'px',
            marginLeft: '-' + Math.round(100 / selection.width * selection.x1) + 'px',
            marginTop: '-' + Math.round(100 / selection.height * selection.y1) + 'px'
          });
        },
        onSelectEnd: function(img, selection) {
          var input_format;
          input_format = $(img).attr('data-input-format');
          console.log($("input[id^=\"" + input_format + "x\"]"));
          $("input[id*=\"" + input_format + "x\"]").val(selection.x1);
          $("input[id*=\"" + input_format + "y\"]").val(selection.y1);
          $("input[id*=\"" + input_format + "w\"]").val(selection.width);
          return $("input[id*=\"" + input_format + "h\"]").val(selection.height);
        }
      });
    };
    removeAreaSelect = function(image) {
      return image.imgAreaSelect.remove();
    };
    readFile = function(file) {
      var reader;
      reader = new FileReader();
      setLoading();
      reader.onload = function(e) {
        setImages(e.target.result);
        return removeLoading();
      };
      return reader.readAsDataURL(file);
    };
    handleDropFileSelect = function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      return readFile(evt.originalEvent.dataTransfer.files[0]);
    };
    handleDragOver = function(e) {
      e.originalEvent.dataTransfer.dropEffect = "copy";
      e.stopPropagation();
      return e.preventDefault();
    };
    handleFileSelect = function(evt) {
      return readFile(evt.target.files[0]);
    };
    $fileSelect.bind('change', handleFileSelect);
    $dropArea.bind('dragover', handleDragOver);
    $dropArea.bind('drop', handleDropFileSelect);
    return $urlSelectButton.click(function() {
      setLoading();
      return setImages($urlSelect.val()).load(function() {
        return removeLoading();
      });
    });
  };

  $.fn.extend({
    awesomeCropper: function(options) {
      return this.each(function() {
        if ($(this).data("awesomeCropper")) {
          if (options.remove) {
            $(this).data("awesomeCropper").remove();
            $(this).removeData("awesomeCropper");
          } else {
            $(this).data("awesomeCropper").setOptions(options);
          }
        } else if (!options.remove) {
          $(this).data("awesomeCropper", new $.awesomeCropper(this, options));
        }
        if (options.instance) {
          return $(this).data("awesomeCropper");
        }
        return this;
      });
    }
  });

}).call(this);
