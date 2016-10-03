/*  
  MEMORY GAME:

  1) USER CHOOSES A LEVEL TO PLAY
  2) USER SELECTS START TO BEGIN
  3) GAME RENDERS A SET OF TILES NUMBERED IN A SPIRAL PATTERN
  4) NUMBERS ARE WIPED AWAY AND TILES ARE SHUFFLED
  5) IF TWO FLIPPED CARDS MATCH, THEY ARE TAKEN OFF THE BOARD
  6) ONCE ALL CARDS ARE MATCHED, GAME IS FINISHED
*/
var Game = (function($) {

  /**SET GLOBAL GAME VARIABLES*/
  var pair = [];
  var found = 0;
  var width, height, num, level;
  var highScores = {
    easy: 0,
    medium: 0,
    hard: 0
  };
  /**SETS LEVEL AND TURNS SELECTED BUTTON TO GREY*/
  var setLevel = function (selected) {
    level = selected;
    $('#easy').css('background-color', '#4db6ac');
    $('#medium').css('background-color', '#4db6ac');
    $('#hard').css('background-color', '#4db6ac');
    $('#' + selected).css('background-color', 'grey');
  };
  /**CREATES GAME BOARD*/
  var setBoard = function(level) {
    if(level === 'medium') {
      $('.board').css('width', '600px');
      width = 5;
      height = 4;
      num = 20;
    } else if(level === 'hard') {
      $('.board').css('width', '750px');
      width = 6;
      height = 5;
      num = 30;
    } else {
      $('.board').css('width', '500px');
      width = 4;
      height = 2;
      num = 8;
    }
  };
  /**DISPLAYS CURRENT LEVEL AND HIGHSCORE*/
  var setScores = function(level) {
    $('#score').html(highScores[level]);
    $('#level').html(level);    
  };
  /**CREATES AN ARRAY OF CARDS*/
  var createCards = function(num) {
    var array = [];
    var images = [
      './images/puppy1.png',
      './images/puppy2.png',
      './images/puppy3.png',
      './images/puppy4.png',
      './images/puppy5.png',
      './images/puppy6.png',
      './images/puppy7.png',
      './images/puppy8.png',
      './images/puppy9.png',
      './images/puppy10.png',
      './images/puppy11.png',
      './images/puppy12.png',
      './images/puppy13.png',
      './images/puppy14.png',
      './images/puppy15.png',
    ];
    var count = 0;
    for(var i=0; i<num; i=i+2) {
      array.push(new Card(i+1, images[count]));
      array.push(new Card(i+2, images[count]));
      count++;
    }
    return array;
  };
  /**DISPLAYS CARDS IN SPIRAL ORDER, THEN SHUFFLES*/
  var renderCards = function(cards) {
    var spiralledCards = spiral(cards, width, height);
    for(var t=0; t<num; t++) {
      $('.board').append('<div class="container"><div class="card" id="' + spiralledCards[t].value + '"><div class="front">'+ spiralledCards[t].value +'</div></div></div>');
    }
    setTimeout(function() {
      $('.board').empty();
      var shuffledCards = shuffle(cards);
      for(var t=0; t<num; t++) {
        $('.board').append('<div class="container"><div class="card" onclick="Game.flip('+ shuffledCards[t].value + ')" id="' + shuffledCards[t].value + '"><div class="front"></div><div class="back"><img src="'+ shuffledCards[t].image +'"></div></div></div>');
      } 
    }, 2000);
  };
  /**CREATES NEW GAME*/
  var newGame = function(level) {
    $('.board').empty();
    $('#clickCounter').html(0);
    found = 0;

    setBoard(level);
    setScores(level);
    renderCards(createCards(num));
  };
  /**FINISHED MESSAGE AND DETERMINES IF NEW HIGHSCORE*/
  var allMatchesFound = function(level) {
    var score = parseInt($('#clickCounter').html()); 
    $('.board').empty();
    if(score < highScores[level] || highScores[level] === 0) {
      highScores[level] = score;
      $('#score').html(score);
      $('.board').append('<div class="done">You finished the game in ' + score + ' clicks</div><div class="done">Thats a new high score!</div>');
    } else {
      $('.board').append('<div class="done">You finished the game in ' + score + ' clicks</div>');
    }
  }
  /**CLEARS MATCHING CARDS*/
  var foundMatch = function(id) {
    setTimeout(function() {
      $('#' + pair[1]).replaceWith('<div class="emptyCard"></div>');
      $('#' + id).replaceWith('<div class="emptyCard"></div>');
      found = found + 2;
      pair = [];
      if(found === num) {
        allMatchesFound(level);
      }
    }, 700);
  }
  /**INCREMENTS CURRENT SCORE*/
  var incrementCounter = function() {
    $('#clickCounter').html(function(i, val) {
      return +val+1 
    });
  };
  /**FLIPS CARD AND HANDLES MATCHING LOGIC*/
  var flip = function(id) {
    incrementCounter();
    if(id === pair[1]) { 
      return; 
    }
    $('#' + id).toggleClass('flipped');
    if(pair.length) {
      var val2 = $('#' + id + ' .back').html();
      if(pair[0] === val2) {
        foundMatch(id);
      } else {
        var prevId = pair[1];
        setTimeout(function() {
          $('#' + prevId).toggleClass('flipped');
          $('#' + id).toggleClass('flipped');
        }, 700);
        pair = [];
      }
    } else {
      var val1 = $('#' + id + ' .back').html();
      pair.push(val1);
      pair.push(id);
    }
  };
  /**INITIALIZE BUTTON EVENT HANDLERS*/
  var init = function() {
    $('#easy').on('click', function() {
      setLevel('easy');
    });
    $('#medium').on('click', function() {
      setLevel('medium');
    });
    $('#hard').on('click', function() {
      setLevel('hard');
    });

    $('#start').on('click', function() {
      if(!level) {
        setLevel('easy');
      }
      newGame(level);
    })
  };

  /**EXPOSE PUBLIC METHODS*/
  return {
    init: init,
    flip: flip
  };

})(jQuery);

/**CARD CLASS*/
var Card = function(val, img) {
  this.value = val;
  this.image = img;
};


$(document).ready(Game.init);
