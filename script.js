console.log("Hello world")
//define player variable
var player = {
  position: "relative",
  positionX: 0,
  positionY: 0,
  height: 10,
  width: 10,
  color: "black",
  up:function (){
    this.positionY -=10;
    console.log(this.positionY)
  },
  down: function(){
    this.positionY +=10;
    console.log(this.positionY)
  },
  left:function (){
    this.positionX -=10;
    console.log(this.positionX)
  },
  right: function(){
    this.positionX +=10;
    console.log(this.positionX)
  }
}
//define obstacle
var obstacle = {
  position: "relative",
  positionX: 250,
  positionY: 250,
  height: 50,
  width: 50,
  color: "blue",
}
//generate player
function generatePlayer(){
  var play = document.createElement("div");
  play.id = "player"
  play.style.position = player.position;
  play.style.height = player.height+"px";
  play.style.width = player.width+"px";
  play.style.top = player.positionY+"px";
  play.style.left = player.positionX+"px";
  play.style.backgroundColor = player.color;
  var map = document.querySelector("#gamearea");
  map.appendChild(play);
}
//generate obstacle
function generateObstacle(){
  var obj = document.createElement("div");
  obj.style.position = obstacle.position;
  obj.style.height = obstacle.height+"px";
  obj.style.width = obstacle.width+"px";
  obj.style.top = obstacle.positionY+"px";
  obj.style.left = obstacle.positionX+"px";
  obj.style.backgroundColor = obstacle.color;
  var map = document.querySelector("#gamearea");
  map.appendChild(obj);
}




//movement for player taking input from button pressed to calling the corresponding function
document.addEventListener("keydown", move);
function move(){
  switch(event.key){
    case "ArrowLeft":
      player.left();
      updateMove()
      checkCollision()
      break;
    case "ArrowUp":
      player.up();
      updateMove()
      checkCollision()
      break;
    case "ArrowRight":
      player.right();
      updateMove()
      checkCollision()
      break;
    case "ArrowDown":
      player.down();
      updateMove()
      checkCollision()
      break;
  }
}
//for use in case arrow keys do not work
function moveSetSecondary (){

  var moving = event.target
  for (var i = 0; i < Object.keys(player).length; i++){
    if (Object.keys(player)[i] === moving.id){
      var direction = Object.keys(player)[i];
      player[direction]();
    }
  }
  updateMove()
}
//function to update move each time player pushes a key
function updateMove(){
  var updateMove = document.querySelector("#player");
  updateMove.style.top = player.positionY+"px";
  updateMove.style.left = player.positionX+"px";
}
//function to check collision
function checkCollision(){
  var gameArea = document.querySelector("#gamearea")
  console.log(gameArea.style.width)
  console.log(gameArea.style.height)
  if (player.positionX > gameArea.width+player.width){
    player.positionX -=10;
  } else if (player.positionX < 0-player.width){
    player.positionX +=10;
  } else if (player.positionY > gameArea.height+player.height){
    player.positionY -=10;
  } else if (player.positionY < 0-player.height){
    player.positionY +=10;
  }
  updateMove()
}
