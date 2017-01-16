/* Use jQuery to add the following features:
  /// Initially, the Tweet button and the character count button should be hidden (CSS).
  /// When the user clicks on the textarea, the textarea should double in size and the character count and Tweet buttons should be revealed.
  * As the user types, the character count should decrease.
  * When there are 10 or less characters, the character counter should turn red.
  * If the user puts in more than 140 characters, the tweet button should be disabled (and re-enabled when there are <= 140 chars).
  * When the user successfully inputs characters and clicks the “Tweet” button, a new tweet should be created and added to the tweet stream in the main column, using the user’s fake profile image in the top left and username/fullname.
  */

$(document).ready(function() {

//User Info
var userName = 'Bob Boblaw';
var handle = '@boboblawlaw';

var $tweet = $('.tweet');

//Timestamp
function setTimeStamp() {
  return new Date();
};

var currentDate = setTimeStamp();

//Year
var yearDate = currentDate.getFullYear();

//Month
function returnMonthName(dateObj) {
  var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthArray[dateObj.getMonth()];
};

var monthDate = currentDate.getMonth();
var monthName = returnMonthName(currentDate);

//Day
function returnDayName(dateObj) {
  var weekdayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekdayArray[dateObj.getDay()];
};

var dayDate = currentDate.getDate();
var dayName = returnDayName(currentDate);

//Time
function returnStandardTime(dateObj) {
  var milHour = dateObj.getHours().toString();
  var amPM = (milHour <= 12) ? "AM" : "PM";
  var stdHour = (milHour <= 12) ? milHour.toString() : (milHour - 12).toString();
  var minutes = dateObj.getMinutes()
  var addedDigitMinutes = (minutes.length < 2) ? ('0' + minutes.toString()) : minutes
  return stdHour + ':' + addedDigitMinutes + ' ' + amPM;
};

var timeOfDay = returnStandardTime(currentDate);


//Display
$('#profile-summary .content p').text(userName);

// Dashboard expands upon click

$('#dashboard .tweet-compose').on('click', function(e) {
  $(this).animate({height:'6em'}, '200');
  $('#tweet-controls').animate({opacity:'1'}, '200');
});

// Character count

$('.tweet-compose').on('keyup', function(e) {
  var max = 140;
  var len = 140 - $(this).val().length;
  $('#char-count').text(len);
  //USE TERNARY INSTEAD!!?
  if (len <= 10) {
    $('#char-count').fadeIn('200').css('color', 'red');
  } else {
    $('#char-count').css('color', 'black');
  };
  if (len < 0) {
    $('#char-count').text('0');
    $('#tweet-submit').prop('disabled', true);
  } else {
    $('#tweet-submit').prop('disabled', false);
  };
});

// Add submitted Tweet to top of Tweet Stream
$('#tweet-submit').on('click', function(e) {

  var $tweetText = $('.tweet-compose').val();

  $('#dashboard .tweet-compose').animate({height:'2.5em'}, '200');
  $('#tweet-controls').animate({opacity:'0'}, '200');
  $('#char-count').text('140')

  //timestamp
  var newTimeStamp = setTimeStamp();
  var stampTime = returnStandardTime(newTimeStamp);
  var stampDay = newTimeStamp.getDate().toString();
  var stampMonth = returnMonthName(newTimeStamp);
  var stampYear = currentDate.getFullYear().toString().substr(2,2);

  var newTweet = '<div class="tweet"> \n'
                  + '<div class="content"> \n'
                  + '<img class="avatar" src="img/alagoon.jpg" /> \n'
                  + '<strong class="fullname">' + userName + '</strong> \n'
                  + '<span class="username">' + handle + '</span> \n'
                  + '<p class="tweet-text">' + $tweetText + '</p> \n'
                  + '<div class="tweet-actions"> \n'
                  + '<ul> \n'
                  + '<li><span class="icon action-reply"></span> Reply</li> \n'
                  + '<li><span class="icon action-retweet"></span> Retweet</li> \n'
                  + '<li><span class="icon action-favorite"></span> Favorite</li> \n'
                  + '<li><span class="icon action-more"></span> More</li> \n'
                  + '</ul> \n'
                  + '</div> \n'
                  + '<div class="stats"> \n'
                  + '<div class="retweets"> \n'
                  + '<p class="num-retweets">30</p> \n'
                  + '<p>RETWEETS</p> \n'
                  + '</div> \n'
                  + '<div class="favorites"> \n'
                  + '<p class="num-favorites">6</p> \n'
                  + '<p>FAVORITES</p> \n'
                  + '</div> \n'
                  + '<div class="users-interact"> \n'
                  + '<div> \n'
                  + '<img src="img/jennyshen.jpg" /> \n'
                  + '<img src="img/damenleeturks.jpg" /> \n'
                  + '</div> \n'
                  + ' </div> \n'
                  + '<div class="time"> \n'
                  + '<p>' + stampTime + ' - ' + stampDay + ' ' + stampMonth + ' ' + stampYear + '</p> \n'
                  + ' </div> \n'
                  + ' </div> \n'
                  + '<div class="reply"> \n'
                  + '<img class="avatar" src="img/alagoon.jpg" /> \n'
                  + '<textarea class="tweet-compose" placeholder="Reply to @theonion"/></textarea> \n'
                  + '</div> \n'
                  + ' </div> \n'
                  + '</div><!-- .tweet --> \n';

    $('.tweet-compose').val('');

    $('#stream').prepend(newTweet);

  });
  
  //expand stats and reply

  $tweet.on('click', function(e) {
    $(this).find($('.reply, .stats')).show(200);
    e.preventDefault();
  });


});



