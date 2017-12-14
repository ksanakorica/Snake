//settings
var snakeX = 2;
var snakeY = 2;
var height = 20;
var width = 20;
var interval = 100;
var increment = 1;

//game variables
var length = 0;
var tailX = [snakeX];
var tailY =[snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //up = 0; down = -1; left = 1; right = 2;
var int;
var score = 0;
var eatSound = new Howl({
  src: ['https://ksanakorica.github.io/Snake/sounds/Alert/Alert-04.mp3']
});
var wallSound = new Howl({
  src: ['https://ksanakorica.github.io/Snake/sounds/Alert/Alert-02.mp3']
});
/**
entry point of the game
*/
function run(){
  init();
  int = setInterval(gameLoop, interval);
}
function init(){
  createMap();
  createSnake();
  createFruit();
}

/**
*Generates the Map for the snake
*/
function createMap(){
  if (document.getElementById("map")) {
    document.getElementById("map").remove();
    document.getElementById("score").innerHTML = "SCORE: "+ score;

  }
  var table = document.createElement("table");
  table.setAttribute("id", "map");
  for( var y = 0; y < height; y++){
    var tr = document.createElement("tr");
    for( var x = 0; x < width; x++){
      if(x == 0 || x == width -1 || y == 0 || y == height -1){
        tr.innerHTML += "<td class='wall' id='"+ x + "-" + y +"'></td>";
      }
      else{
        tr.innerHTML += "<td class='blank' id='"+ x + "-" + y +"'></td>";

      }
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);

}

function createSnake(){
  set(snakeX, snakeY, "snake");
}
function get(x,y){
  return document.getElementById(x+"-"+y);
}
function set(x,y,value){
  if(x != null && y != null);
  get(x,y).setAttribute("class", value);
}

function rand(min,max){
  return Math.floor(Math.random()* (max - min) + min);
}
function getType(x,y){
  return get(x,y).getAttribute("class");
}

function createFruit(){
  var found = false;
  while(!found && (length < (width-2) * (height-2) +1)){
    var fruitX = rand(1, width-1);
    var fruitY = rand(1, height-1);
    if(getType(fruitX,fruitY) == "blank")
       found = true;
    }
    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY;
}
// keypress
window.addEventListener("keydown", function key(event) {
  //if key is W set direction Up
  var key = event.keyCode;
  console.log(key)
  if(direction != -1 && (key == 38))
     direction = 0;
  //if key is S set direction Down
  else if(direction != 0 && (key == 40))
      direction = -1;
  //if key is A set direction left
  else if(direction != 2 && (key == 37))
      direction = 1;
  //if key is D set direction right
  else if(direction !=1 && (key == 39 ))
      direction = 2;

  if(!running)
     running = true;
  else if(key == 32)
     running = false;

});

function gameLoop(){
  if(running && !gameOver){
    update();
  }
  else if(gameOver){
    clearInterval(int);
    console.log('game over??')
    wallSound.play();

  }
}

function update(){
  set(fX, fY, "fruit");
  updateTail();
  set(tailX[length], tailY[length], "blank");
  if(direction == 0)
     snakeY --;
  else if(direction == -1)
     snakeY ++;
  else if(direction == 1)
     snakeX --;
  else if(direction == 2)
    snakeX ++;
  set(snakeX, snakeY, "snake");
  for(var i = tailX.length -1; i >=0; i--){
    if(snakeX == tailX[i] && snakeY == tailY[i]){
      gameOver = true;
      break;
    }
  }
  if(snakeX == 0 || snakeX == width -1 || snakeY == 0 || snakeY == height -1)
     gameOver = true;
  else if(snakeX == fX && snakeY == fY){
    console.log('ate fruit?!?!?')
    eatSound.play()
    score+=1;
    createFruit()
    length+=increment;

  }

  document.getElementById("score").innerHTML = "SCORE: "+ score;
}
function updateTail(){
  for(var i = length; i > 0; i --){
    tailX[i] = tailX[i-1];
    tailY[i] = tailY[i-1];
  }
  tailX[0] = snakeX;
  tailY[0] = snakeY;

}

function restart() {
  clearInterval(int);

  snakeX = 2;
  snakeY = 2;

  length = 0;
  tailX = [snakeX];
  tailY =[snakeY];
  running = false;
  gameOver = false;
  direction = -1;
  score = 0;

  run();
}

//function preload (){
  //eatSound = loadSound(/Users/Akadachnikava/Desktop/Snake_game/Sounds/Alert/Alert-06.mp3)
//}


run();
