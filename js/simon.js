// Simon JS

var playerMoves = [];
var computerMoves = [];
var playerRound = 0;
var strictMode = "no";
var speed = 1000;

//Function that resets the game when a player loses in strict mode
//Or if player presses the reset button
function resetGame() {
    document.getElementById("counterLabel").innerHTML = "Count";
    playerMoves = [];
    computerMoves = [];
    playerRound = 0;
    strictMode = "no";
    document.getElementById("counter").innerHTML = playerRound;
    $("#strictRadio").prop("disabled", false);
    $("#strictRadio").removeAttr("checked");
}

//Functions that removes the cellXFlash CSS classes to make the cells flash on and off
//upon player click or computer's random choice
function flashCell1() {
  $("#cell-1").removeClass("cell1Flash");
}

function flashCell2() {
  $("#cell-2").removeClass("cell2Flash");
}

function flashCell3() {
  $("#cell-3").removeClass("cell3Flash");
}

function flashCell4() {
  $("#cell-4").removeClass("cell4Flash");
}

function computerTurn() {

  //Checks first to see if the player has reached round 20, if so game is won
  if (playerRound === 20) {
    document.getElementById("counterLabel").innerHTML = "You Win!"
    window.setTimeout(resetGame, 1000);
  }

  //These turn off cells so player can't click during computer's turn
  $("#cell-1").unbind("click");
  $("#cell-2").unbind("click");
  $("#cell-3").unbind("click");
  $("#cell-4").unbind("click");

  playerRound++;
  //Chooses a random cell and pushes that value into the computerMoves array
  var randomMove = Math.floor(Math.random() * 4) + 1;
  computerMoves.push(randomMove);

  //Loop that iterates through computerMoves array and flashes the cell, plays
  //the sound
  var loopCounter = 0;
  function flashLoop() {
    window.setTimeout(function() {
      if (computerMoves[loopCounter] === 1) {
        $("#cell-1").addClass("cell1Flash");
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        audio.play();
        window.setTimeout(flashCell1, 500);
      } else if (computerMoves[loopCounter] === 2) {
        $("#cell-2").addClass("cell2Flash");
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        audio.play();
        window.setTimeout(flashCell2, 500);
      } else if (computerMoves[loopCounter] === 3) {
        $("#cell-3").addClass("cell3Flash");
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        audio.play();
        window.setTimeout(flashCell3, 500);
      } else if (computerMoves[loopCounter] === 4) {
          $("#cell-4").addClass("cell4Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
          audio.play();
          window.setTimeout(flashCell4, 500);
      }
      //Iterate loopCounter variable
      loopCounter++;

      //Controls whether or not the loop runs again based on length of computerMoves array
      //and loopCounter variable
      if (loopCounter < computerMoves.length) {
        flashLoop();
      }

      //If loopCounter is the same length as computerMoves array, reenable cells
      //so player can click them
      if (loopCounter === computerMoves.length) {
        $("#cell-1").bind("click", function(){
          $("#cell-1").addClass("cell1Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
          audio.play();
          window.setTimeout(flashCell1, 250);
          playerTurn(1);
        });

        $("#cell-2").bind("click", function(){
          $("#cell-2").addClass("cell2Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
          audio.play();
          window.setTimeout(flashCell2, 250);
          playerTurn(2);
        });

        $("#cell-3").bind("click", function(){
          $("#cell-3").addClass("cell3Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
          audio.play();
          window.setTimeout(flashCell3, 250);
          playerTurn(3);
        });

        $("#cell-4").bind("click", function(){
          $("#cell-4").addClass("cell4Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
          audio.play();
          window.setTimeout(flashCell4, 250);
          playerTurn(4);
        });
      }
    }, speed);
  }

  //Invokes flashLoop() function
  flashLoop();
  //Clears playerMoves array so it is empty for player's next turn
  playerMoves = [];

}

//This function is the same as computerTurn except that a new random cell is
//not generated and pushed into the computerMoves array
//This is called when a player makes a mistake while NOT in strict mode
//This function replays the current sequence so players can take another stab
function recallComputerTurn () {

  //These turn off cells so player can't click during computer's turn
  $("#cell-1").unbind("click");
  $("#cell-2").unbind("click");
  $("#cell-3").unbind("click");
  $("#cell-4").unbind("click");

  //Resets counterLabel to "Count"
  document.getElementById("counterLabel").innerHTML = "Count";

  ////Loop that iterates through computerMoves array and flashes the cell, plays
  //the sound
  var loopCounter = 0;
  function flashLoop() {
    window.setTimeout(function() {
      if (computerMoves[loopCounter] === 1) {
        $("#cell-1").addClass("cell1Flash");
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        audio.play();
        window.setTimeout(flashCell1, 500);
      } else if (computerMoves[loopCounter] === 2) {
        $("#cell-2").addClass("cell2Flash");
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        audio.play();
        window.setTimeout(flashCell2, 500);
      } else if (computerMoves[loopCounter] === 3) {
        $("#cell-3").addClass("cell3Flash");
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        audio.play();
        window.setTimeout(flashCell3, 500);
      } else if (computerMoves[loopCounter] === 4) {
          $("#cell-4").addClass("cell4Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
          audio.play();
          window.setTimeout(flashCell4, 500);
      }
      //Iterate loopCounter variable
      loopCounter++;
      //If loopCounter is the same length as computerMoves array, reenable cells
      //so player can click them
      if (loopCounter < computerMoves.length) {
        flashLoop();
      }
      if (loopCounter === computerMoves.length) {
        //These turn the cells back on after computers turn so player can play.
        $("#cell-1").bind("click", function(){
          $("#cell-1").addClass("cell1Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
          audio.play();
          window.setTimeout(flashCell1, 250);
          playerTurn(1);
        });

        $("#cell-2").bind("click", function(){
          $("#cell-2").addClass("cell2Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
          audio.play();
          window.setTimeout(flashCell2, 250);
          playerTurn(2);
        });

        $("#cell-3").bind("click", function(){
          $("#cell-3").addClass("cell3Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
          audio.play();
          window.setTimeout(flashCell3, 250);
          playerTurn(3);
        });

        $("#cell-4").bind("click", function(){
          $("#cell-4").addClass("cell4Flash");
          var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
          audio.play();
          window.setTimeout(flashCell4, 250);
          playerTurn(4);
        });
      }
    }, speed);
  }
  //Invokes flashLoop() function
  flashLoop();
  //Clears playerMoves array so it is empty for player's next turn
  playerMoves = [];
}

//Function that determines what to do when a player inputs an incorrect sequence
//If strict mode is enabled, it calls resetGame() function
//If strict mode is not enabled, it calls recallComputerTurn() function
function playerLoses() {
  if (strictMode === "no") {
    document.getElementById("counterLabel").innerHTML = "Try Again!";
    setTimeout(recallComputerTurn, 1000);
  } else if (strictMode === "yes") {
    document.getElementById("counterLabel").innerHTML = "Game Over!";
    setTimeout(resetGame, 1000);
  }
}


//Function that runs upon a player clicking a cell during his/her turn
function playerTurn(cell) {
  //Otherwise, the players click is added to the playerMoves array
  playerMoves.push(cell);
  //If each index of playerMoves array is not equal to the same index of the computerMoves
  //array, call playerLoses() function
  for(var i = 0; i < playerMoves.length; i++) {
    if (playerMoves[i] !== computerMoves[i]) {
      playerLoses();
      return;
    }
  }
  //If all indices are equal and playerMoves array is the same length as
  //computerMoves array, call computerTurn() function
  if (playerMoves.length >= computerMoves.length) {
    document.getElementById("counter").innerHTML = playerRound;
    computerTurn();
  }
}

//Click handler for Start button. Calls computerTurn function and deactivates
//strict radio button so player cannot change mode once a game has started.
$("#startButton").click(function() {
  $("#strictRadio").prop("disabled", true);
  computerTurn();
});

//Click handler for Reset button. Calls resetGame() function
$("#resetButton").click(function(){
  resetGame();
});

//Click handler for Strict mode radio button
$("#strictRadio").click(function(){
  strictMode = "yes";
});
