console.log("Hello world")
//define player variable
var player = {
  position: "absolute",
  positionX: null,
  positionY: null,
  height: 10,
  width: 10,
  color: "black",
  lastdirection:null,
  up:function (){
    this.lastdirection = "up";
    this.positionY -=5;
    // console.log(this.positionY)
    checkBorderCollision();
    checkObjectCollision();
    updateMove();
  },
  down: function(){
    this.lastdirection = "down";
    this.positionY +=5;
    // console.log(this.positionY)
    checkBorderCollision();
    checkObjectCollision();
    updateMove();
  },
  left:function (){
    this.lastdirection = "left"
    this.positionX -=5;
    // console.log(this.positionX)
    checkBorderCollision();
    checkObjectCollision();
    updateMove();
  },
  right: function(){
    this.lastdirection = "right"
    this.positionX +=5;
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
  id: null,
  path:[
    circle(),
    square(),
  ],
}
//define map
var map = {
  height: 500,
  width: 500,
}
//define safeHouse
var safeHouse = {
  position: "absolute",
  height: 100,
  width: 100,
  positionX: 200,
  positionY: 400,
  color: "brown",
}
//define collectible
var collectible = {
  position: "absolute",
  height: 100,
  width: 100,
  positionX: null,
  positionY: null,
  color: "green",
  name: null,
}
//generate player
function generatePlayer(){
  var play = document.createElement("div");
  play.id = "player"
  play.style.position = player.position;
  play.style.height = player.height+"px";
  play.style.width = player.width+"px";
  play.style.top = 0+"px";
  play.style.left = 0+"px";
  play.style.backgroundColor = player.color;
  var map = document.querySelector("#gamearea");
  map.appendChild(play);
}
//generate Armageddon
function multigeddon(){
  document.querySelectorAll(".armageddon").forEach(function(arm){
    arm.remove();
  });
  while(obstacleArray.length!=0){
    obstacleArray.pop();
  }
  var randNum = Math.floor(Math.random()*10);
  for (var i = 0; i < randNum; i++){
    generateArmageddon();
  }
}
//generate obstacle
var obstacleArray = [];
function generateArmageddon(){
  var randPosX = Math.floor(Math.random()*map.width);
  var randPosY = Math.floor(Math.random()*map.height);
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+obstacle.width>map.width || randPosY+obstacle.height>map.height){
      generateArmageddon();
    }else{
        var obj = document.createElement("div");
        obj.setAttribute("class","armageddon");
        obj.setAttribute("id", randPosX);
        obj.style.position = obstacle.position;
        obj.style.height = obstacle.height+"px";
        obj.style.width = obstacle.width+"px";
        obj.style.top = randPosY+"px";
        obj.style.left = randPosX+"px";
        obj.style.backgroundColor = obstacle.color;
        var mapping = document.querySelector("#gamearea");
        mapping.appendChild(obj);

        var newObstacle = {
          position: "absolute",
          positionX: randPosX,
          positionY: randPosY,
          height: obstacle.height,
          width: obstacle.width,
          color: "blue",
          id: randPosX,
        }
        obstacleArray.push(newObstacle);
    }
    checkObjectCollision();
}
//generate obstacle path at random
function circle(){

}

function square(){

}
//generate safehouse
function generateSafeHouse(){
  var obj = document.createElement("div");
  obj.style.position = safeHouse.position;
  obj.style.height = safeHouse.height+"px";
  obj.style.width = safeHouse.width+"px";
  obj.style.top = safeHouse.positionY+"px";
  obj.style.left = safeHouse.positionX+"px";
  obj.style.backgroundColor = safeHouse.color;
  var map = document.querySelector("#gamearea");
  map.appendChild(obj);
}
//generate collectible for player
function generateCollectibles(){
  var randPosX = Math.floor(Math.random()*map.width);
  var randPosY = Math.floor(Math.random()*map.height);
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+collectible.width>map.width || randPosY+collectible.height>map.height){
      generateCollectibles();
    }else{
        var obj = document.createElement("div");
        obj.setAttribute("class","collectible");
        obj.setAttribute("value", randPosX);
        obj.setAttribute("name", randPosY);
        obj.style.position = collectible.position;
        obj.style.height = collectible.height+"px";
        obj.style.width = collectible.width+"px";
        obj.style.top = randPosY+"px";
        obj.style.left = randPosX+"px";
        obj.style.backgroundColor = collectible.color;
        var mapping = document.querySelector("#gamearea");
        mapping.appendChild(obj);

        var newCollectible = {
          position: "absolute",
          positionX: randPosX,
          positionY: randPosY,
          height: obstacle.height,
          width: obstacle.width,
          name: randPosY,
          value: randPosX,
        }
        obstacleArray.push(newCollectible);
    }
    checkObjectCollision();
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
for (var i = 0; i < obstacleArray.length; i++){
  if ((player.positionX+player.width > obstacleArray[i].positionX) && (player.positionX < obstacleArray[i].positionX+obstacleArray[i].width) && (player.positionY+player.height > obstacleArray[i].positionY) && (player.positionY < obstacleArray[i].positionY+obstacleArray[i].height)){

    if (obstacleArray[i].id){
      console.log("collision happened");
    }else if (obstacleArray[i].value){
      var removeElement = document.getElementsByName(obstacleArray[i].name);
      removeElement[0].parentNode.removeChild(removeElement[0]);

      console.log("element removed!");
      obstacleArray.splice(obstacleArray[i],1);
      console.log("powerup happened");
    }
    // console.log(player.lastdirection);
    //check which direction player is accessing the obstacle from
    //move player back in opposite direction
    // switch (player.lastdirection){
    //   case "up": player.positionY+=player.height;
    //   break;
    //   case "down": player.positionY-=player.height;
    //   break;
    //   case "left": player.positionX+=player.width;
    //   break;
    //   case "right": player.positionX-=player.width;
    //   break;
    // }
    // updateMove()
    // console.log("move updated!")
    }
  }
}

// function checkObjectCollision(){
// for (var i = 0; i < obstacleArray.length; i++){
//   if ((player.positionX+player.width > obstacleArray[i].positionX) && (player.positionX < obstacleArray[i].positionX+obstacleArray[i].width) && (player.positionY+player.height > obstacleArray[i].positionY) && (player.positionY < obstacleArray[i].positionY+obstacleArray[i].height)){
//     console.log("collision happened");
//     console.log(player.lastdirection);
//     //check which direction player is accessing the obstacle from
//     //move player back in opposite direction
//     switch (player.lastdirection){
//       case "up": player.positionY+=player.height;
//       break;
//       case "down": player.positionY-=player.height;
//       break;
//       case "left": player.positionX+=player.width;
//       break;
//       case "right": player.positionX-=player.width;
//       break;
//     }
//     updateMove()
//     console.log("move updated!")
//     }
//   }
// }




///////////////////////////////////////////////////////////////////////
// copied code, do not delete yet until obstacle array is resolved!!!//
///////////////////////////////////////////////////////////////////////
// if ((player.positionX+player.width > obstacle.positionX) && (player.positionX < obstacle.positionX+obstacle.width) && (player.positionY+player.height > obstacle.positionY) && (player.positionY < obstacle.positionY+obstacle.height)){
//   console.log("collision happened");
//   console.log(player.lastdirection);
//   //check which direction player is accessing the obstacle from
//   //move player back in opposite direction
//   switch (player.lastdirection){
//     case "up": player.positionY+=player.height;
//     break;
//     case "down": player.positionY-=player.height;
//     break;
//     case "left": player.positionX+=player.width;
//     break;
//     case "right": player.positionX-=player.width;
//     break;
//   }
//   updateMove()
//   console.log("move updated!")
//   }

////////////////
//legacy code//
//////////////
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
