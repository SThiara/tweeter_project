$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    var enteredLength = 140 - $(this).val().length;
    var destination = $(this).siblings(".submit-thing").children('.counter')
    destination.text(enteredLength);
    if (enteredLength < 0) {
      destination.addClass("error");
    } else {
      destination.removeClass("error");
    }
  })
});