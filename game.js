// $("h1").css("color","red");

var buttonColors =[ "red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickPattern=[];

var started =false;
var level =0;




// main functon
function nextSequence() {
  userClickPattern = [];
  level++;

  $("#level-title").text("Level "+ level);
  
   
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour= buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    //flash 
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

     playSound(randomChosenColour);
    // console.log(randomChosenColour);
    }

//color sequence array when user clicked

$(".btn").click(function () {
          
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  console.log(userClickPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length-1);
  
});


//sound play function
function playSound(name) {
  var audio = new Audio('sounds/'+name+'.mp3');
   audio.play();
}

//animations
function animatePress(currentColor) {
  var active = $("."+currentColor);
  active.addClass("pressed");

  setTimeout(function () {
    active.removeClass("pressed")
  },100);
}


//game_over background

function game_over() {
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  },200);
}


// when the first key is pressed
$(document).keypress( function () {
     
  
  if (!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
     started=true;

  }
 
});

//logic function
function checkAnswer(currentLevel) {
  
 if (gamePattern[currentLevel]==userClickPattern[currentLevel]) {
            console.log("success");
            
            if (gamePattern.length===userClickPattern.length) {
                setTimeout(function () {
                  nextSequence();
                },1000);
            }
 }
 else{
   console.log("wrong");
   var wrong = new Audio('sounds/wrong.mp3');
     wrong.play();

     game_over();
     startOver();

     $("#level-title").text("Game Over, Press Any Key to Restart");


 }
}


//restart game

function startOver() {
  level =0;
  gamePattern=[];
  started=false;
}



// setInterval(nextSequence,1000);
