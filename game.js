/*create a new array with the colours*/
var buttonColours = ["red", "blue", "green", "yellow"];
/*create an empty array*/
var gamePattern = [];
var userClickedPattern = [];

/* It is a way to keep track if the game has started or not,
so you only call nextSequence() on the first keypress */
var started = false;
var level = 0;

/***************************************************************************/
/* Using jquery to detect when a keyboard key has been pressed, and when that
happens for the first time, call nextSequence()
The h1 title starts out saying "Press a key to start", and when the game
has started, change this to say "Level 0" */
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
/***************************************************************************/
/* Using jquery to detect when any of buttons are clicked, and trigger a handler
function.Inside handler, create a new variable called userChosenColour to store
the id of the button that got clicked.
Add the content of the variable userChosenColour to end of this userClickedPattern.
In the same way we played sound in nextSequence(), when a user clicks on a button,
the corresponding sound should be played.*/

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
/***************************************************************************/
/* Create and If statement to check if the most recent user answer is the same
as the game pattern.If so then call nextSequence(), otherwise add class game-over,
and jquery changes de text to "Game Over, Press Any Key to Restart"
Call startOver() method if the user gets the sequence over and reset all variables */
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
/***************************************************************************/
/* Inside this function, increase the level by 1 everytime nextSequence() is called.
Update the h1 with this change in the value of level
create a random number using Math.floor() and Math.random()
add this color on the new array gamePattern
Use jquery to select the button with the same id as the randomChosenColour,
and animate a flash
call the function playSound() */
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

/***************************************************************************/
/* Use jquery to add this pressed class to the button that gets clicked Inside
animatedPress(). After that, remove class pressed after 100 milliseconds (1 second) */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/***************************************************************************/
/* Creating a new object to add and play sounds */

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/***************************************************************************/
/* Inside this fuction, you will need to reset the values of level, gamePattern
and started (boolean) to false */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

/***************************************************************************/
