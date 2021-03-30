/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  } else {
  $.post('/tweets', $(this).serialize(), function(data, status) {
    $.get('/tweets', addTweet)
    $(".alert").removeClass("alert-deny");
    $(".alert").addClass("alert-accept");
    $(".alert").text("Tweet submitted!");
    $(".alert").slideDown();
    setTimeout(function() {$(".alert").slideUp()}, 2000);
    console.log(status);
  })
};
});

loadTweets();

});

/* $(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const mainRef = $("main.container");
  mainRef.append(createTweetElement(tweetData));

  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    console.log($(this).serialize())
    $.post('/tweets', $(this).serialize(), function(data, status) {
      alert("\nStatus: " + status);
    })
  });
}); */


/* 
const addTweetsToPage = $(function() {
  const $button = $('#submit-tweet');
  $button.on('click', function () {
    $.ajax('more-posts.html', { method: 'GET' })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
      $button.replaceWith(morePostsHtml);
    });
  });
}); */