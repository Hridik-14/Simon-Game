var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

var highestScore = 0;

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){

  var randonNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randonNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  setLevel();

  userClickedPattern = [];
}


  $(".btn").click(function(){
    if(started){
      var userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    }
    else{
      alert("Press a key to start!");
    }
  });

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      level++;
      setTimeout(function() {
            nextSequence();
        }, 1000);
    }
  }
  else if(started){
    if(level > highestScore){
      highestScore = level;
    }
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("#highestLevel").text("Highest Score: " + highestScore);
    gamePattern = [];
    playSound("wrong");
    level = 0;
    started = false;
    $("#level-title").text("Press a Key to Start");
  }
}

function animatePress(color){
      $("#" + color).addClass("pressed");
      setTimeout(function() {
        $("#" + color).removeClass("pressed");
      }, 100);
}

function setLevel(){
  $("#level-title").text("Level " + level);
}

$(document).keypress(function() {
  if (!started) {
    setLevel();
    nextSequence();
    started = true;
  }
});
