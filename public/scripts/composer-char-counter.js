// script that will update the text counter on inputs to the textbox and clicks/keyboard-hits to the "tweet" submit button

$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    var enteredLength = 140 - $(this).val().length; // remaining characters that a user can input into the text-box
    var destination = $(this).siblings(".submit-thing").children('.counter')

    destination.text(enteredLength);  // updating the counter
    
    if (enteredLength < 0) {
      destination.addClass("error");
    } 
    else {
      destination.removeClass("error");
    }
  })
  $(".submit-thing").on("click", function() {
    if (!$('.counter').hasClass("error")) { // only revert the counter back to 140 if there's no error in submission
      $('.counter').text('140');
    }
  })
});