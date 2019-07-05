console.log("Hello world")
//define player variable
var player = {
  position: "absolute",
  positionX: 0,
  positionY: 0,
  height: 10,
  width: 10,
  color: "black",
  lastdirection:null,
  up:function (){
    this.lastdirection = "up";
    this.positionY -=10;
    // console.log(this.positionY)
    checkBorderCollision();
    checkObjectCollision();
    updateMove();

  },
  down: function(){
    this.lastdirection = "down";
    this.positionY +=10;
    // console.log(this.positionY)
    checkBorderCollision();
    checkObjectCollision();
    updateMove();

  },
  left:function (){
    this.lastdirection = "left"
    this.positionX -=10;
    // console.log(this.positionX)
    checkBorderCollision();
    checkObjectCollision();
    updateMove();

  },
  right: function(){
    this.lastdirection = "right"
    this.positionX +=10;
    // console.log(this.positionX)
    checkBorderCollision()
    checkObjectCollision()
    updateMove()

  }
}
//define obstacle
var obstacle = {
  position: "absolute",
  positionX: 250,
  positionY: 250,
  height: 50,
  width: 50,
  color: "blue",
}
//define map
var map = {
  height: 500,
  width: 500,
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
      break;
    case "ArrowUp":
      player.up();
      break;
    case "ArrowRight":
      player.right();
      break;
    case "ArrowDown":
      player.down();
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
function checkBorderCollision(){
  var gameArea = document.querySelector("#gamearea")
  if (player.positionX+player.width > map.width){
    player.positionX-=player.width;
  }
  if (player.positionX<0){
    player.positionX+=player.width;
  }
  if (player.positionY<0){
    player.positionY+=player.height;
  }
  if (player.positionY+player.height>map.width){
    player.positionY-=player.height;
  }
  updateMove()
}
//function to check for collision
function checkObjectCollision(){
  // console.log(obstacle.positionX)
  // console.log(player.positionX)
  // if ((player.positionX+player.width > obstacle.positionX)){
  //   console.log("hit right")
  // }
  // if ((player.positionX < obstacle.positionX+obstacle.width)){
  //   console.log("hit left")
  // }
  // if (player.positionY+player.height > obstacle.positionY) {
  //   console.log("hit bottom")
  // }
  // if (player.positionY < obstacle.positionY-obstacle.height){
  //   console.log("hit top")
  // }



  if ((player.positionX+player.width > obstacle.positionX) && (player.positionX < obstacle.positionX+obstacle.width) && (player.positionY+player.height > obstacle.positionY) && (player.positionY < obstacle.positionY+obstacle.height)){
    console.log("collision happened");
    console.log(player.lastdirection);
    //check which direction player is accessing the obstacle from
    //move player back in opposite direction
    switch (player.lastdirection){
      case "up": player.positionY+=player.height;
      break;
      case "down": player.positionY-=player.height;
      break;
      case "left": player.positionX+=player.width;
      break;
      case "right": player.positionX-=player.width;
      break;
    }
    updateMove()
    console.log("move updated!")
    }



    // if (player.positionX+player.width > obstacle.positionX){
    //   console.log("movebackleft")
    //   player.positionX-=player.width;
    // }else if (player.positionX<obstacle.positionX+obstacle.width){
    //   console.log("movebackright")
    //   player.positionX+=player.width;
    // }else if (player.positionY<obstacle.positionY+obstacle.height){
    //   console.log("movebackdown")
    //   player.positionY+=player.height;
    // }else if (player.positionY+player.height>obstacle.positionY){
    //   console.log("movebackup")
    //   player.positionY-=player.height;
    // }

}
