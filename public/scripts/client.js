$(document).ready(function() {

const createTweetElement = function(tweetObject) { // creating the new tweet object with all the necessary classes and ids
  const $tweetToReturn = $("<article>").addClass("tweet-display")
  .append($("<h5>").addClass("example-head").append($("<div>").addClass("avatar-name").html(`<img src='${tweetObject.user.avatars}'>` + tweetObject.user.name), 
  $("<div>").addClass("user-handle").text(tweetObject.user.handle)), 
  $("<div>").attr('id', 'example-text').text(tweetObject.content.text), 
  $("<footer>").addClass("example-foot").append($("<div>").text(moment(tweetObject.created_at).fromNow()), $("<div>").html(`<img src="/images/twitter-retweet-icon-10.png">`)))

  return $tweetToReturn;
}

const renderTweets = function(tweets) {
  for (let index = tweets.length - 1; index >= 0; index--) { // reverse C-style loop to load tweets from most to least recent
    $('main.container').append(createTweetElement(tweets[index]));
  }
}

const addTweet = function(tweets) {
  $('section.new-tweets').prepend(createTweetElement(tweets[tweets.length - 1]));
}

const loadTweets = function() {
  $.get('/tweets', renderTweets)
}

const failureAlertBox = function() {
  $(".alert").removeClass("alert-accept");
  $(".alert").addClass("alert-deny");
  $(".alert").slideDown();
  setTimeout(function() {$(".alert").slideUp()}, 2000);
}

const successAlertBox = function() {
  $(".alert").removeClass("alert-deny");
  $(".alert").addClass("alert-accept");
  $(".alert").text("Tweet submitted!");
  $(".alert").slideDown();
  setTimeout(function() {$(".alert").slideUp()}, 2000);
}

$("#new-tweet").submit(function(event) {
  event.preventDefault();
  const tweetBody = document.getElementById("tweet-text").value;

  if (tweetBody === "" || tweetBody === undefined) {
    $(".alert").text("Tweet content not present!");
    failureAlertBox();
  }
  else if (tweetBody.length > 140) {
    $(".alert").text("Tweet content too long!");
    failureAlertBox();
  } 
  else {
  $.post('/tweets', $(this).serialize(), function(data, status) {
    $.get('/tweets', addTweet);
    successAlertBox();
    $("#tweet-text").val("");
  })
  };
});

loadTweets();

});