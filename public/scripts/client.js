$(document).ready(function() {

const createTweetElement = function(tweetObject) {
  const $tweetToReturn = $("<article>").addClass("tweet-display")
  .append($("<h5>").addClass("example-head").append($("<div>").addClass("avatar-name").html(`<img src='${tweetObject.user.avatars}'>` + tweetObject.user.name), 
  $("<div>").addClass("user-handle").text(tweetObject.user.handle)), 
  $("<div>").attr('id', 'example-text').text(tweetObject.content.text), 
  $("<footer>").addClass("example-foot").append($("<div>").text(moment(tweetObject.created_at).fromNow()), $("<div>").html(`<img src="/images/twitter-retweet-icon-10.png">`)))

  return $tweetToReturn;
}

const renderTweets = function(tweets) {
  for (let index = tweets.length - 1; index >= 0; index--) {
    $('main.container').append(createTweetElement(tweets[index]));
  }
}

const addTweet = function(tweets) {
  $('section.new-tweets').prepend(createTweetElement(tweets[tweets.length - 1]));
}

const loadTweets = function() {
  $.get('/tweets', renderTweets)
}

$("#new-tweet").submit(function(event) {
  event.preventDefault();
  const tweetBody = document.getElementById("tweet-text").value;

  if (tweetBody === "" || tweetBody === undefined) {
    $(".alert").removeClass("alert-accept");
    $(".alert").addClass("alert-deny");
    $(".alert").text("Tweet content not present!");
    $(".alert").slideDown();
    setTimeout(function() {$(".alert").slideUp()}, 2000);
  }
  else if (tweetBody.length > 140) {
    console.log(tweetBody);
    $(".alert").removeClass("alert-accept");
    $(".alert").addClass("alert-deny");
    $(".alert").text("Tweet content too long!");
    $(".alert").slideDown();
    setTimeout(function() {$(".alert").slideUp()}, 2000);
  } 
  else {
  $.post('/tweets', $(this).serialize(), function(data, status) {
    $.get('/tweets', addTweet)
    $(".alert").removeClass("alert-deny");
    $(".alert").addClass("alert-accept");
    $(".alert").text("Tweet submitted!");
    $(".alert").slideDown();
    setTimeout(function() {$(".alert").slideUp()}, 2000);
    $("#tweet-text").val("");
  })
  };
});

loadTweets();

});