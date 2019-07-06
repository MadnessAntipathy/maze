console.log("Hello world")
//define global variable
var obstacleArray = [];
//define player variable
var player = {
  active: false,
  position: "absolute",
  positionX: null,
  positionY: null,
  height: 10,
  width: 10,
  color: "black",
  lastdirection:null,
  collecteditems: null,
  score: null,
  up:function (){
    this.lastdirection = "up";
    this.positionY -=5;
  },
  down: function(){
    this.lastdirection = "down";
    this.positionY +=5;
  },
  left:function (){
    this.lastdirection = "left"
    this.positionX -=5;
  },
  right: function(){
    this.lastdirection = "right"
    this.positionX +=5;
  }
}
//define map
var map = {
  height: 500,
  width: 500,
  color: "brown",
  margin: "auto",
  position: "relative",
  id: "gamearea"
}
//generate map
function generateMap(){
  var gameMap = document.createElement("div");
  gameMap.style.height = map.height+"px";
  gameMap.style.height = map.width+"px";
  gameMap.style.backgroundColor = map.color;
  gameMap.style.margin = map.margin;
  gameMap.style.position = map.position;
  gameMap.setAttribute("id", map.id);
  document.querySelector("#gamecontainer").appendChild(gameMap);
}
//generate stat counter
function generateStatCount(){
  var statCount = document.createElement("div");
  statCount.setAttribute("id", "scorecounter")
  statCount.style.position = "absolute";
  statCount.style.top = "20px";
  statCount.style.right = "20px";
  statCount.style.height = "20px";
  statCount.style.width = "150px";
  statCount.style.backgroundColor = "rgba(255,0,0,0.5)"
  statCount.style.color = "white";
  statCount.innerText = "Your score is: ";
  document.querySelector("#gamearea").appendChild(statCount);
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
  player.active = true;
  var map = document.querySelector("#gamearea");
  map.appendChild(play);
}
//generate safehouse
function generateSafeHouse(){
  var safeHouse = {
    position: "absolute",
    height: 100,
    width: 100,
    positionX: 200,
    positionY: 400,
    color: "yellow",
    type: "safe",
    id: "safehouse",
  }
  obstacleArray.push(safeHouse);
  var obj = document.createElement("div");
  obj.setAttribute("id", safeHouse.id);
  obj.style.position = safeHouse.position;
  obj.style.height = safeHouse.height+"px";
  obj.style.width = safeHouse.width+"px";
  obj.style.top = safeHouse.positionY+"px";
  obj.style.left = safeHouse.positionX+"px";
  obj.style.backgroundColor = safeHouse.color;
  var map = document.querySelector("#gamearea");
  map.appendChild(obj);
}
//generate many bombs on map and clears previous
function generateMultigeddon(){
  var randNum = Math.floor(Math.random()*10);
  for (var i = 0; i < randNum; i++){
    generateArmageddon();
  }
}
function generateArmageddon(){
  var randId = Math.floor(Math.random()*100000)
  var randPosX = Math.floor(Math.random()*map.width);
  var randPosY = Math.floor(Math.random()*map.height);
  var newObstacle = {
    position: "absolute",
    class: "armageddon",
    positionX: randPosX,
    positionY: randPosY,
    height: 10,
    width: 10,
    status: false,
    color: "blue",
    id: randId,
    type: "boom",
  }
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+10>map.width || randPosY+10>map.height){
      generateArmageddon();
    }else{
      var obj = document.createElement("div");
      obj.setAttribute("class",newObstacle.class);
      obj.setAttribute("id", newObstacle.id);
      obj.style.position = newObstacle.position;
      obj.style.height = newObstacle.height+"px";
      obj.style.width = newObstacle.width+"px";
      obj.style.top = newObstacle.positionY+"px";
      obj.style.left = newObstacle.positionX+"px";
      obj.style.backgroundColor = newObstacle.color;
      var mapping = document.querySelector("#gamearea");
      mapping.appendChild(obj);
      animateObjects(obj, newObstacle);
      obstacleArray.push(newObstacle);
    }
}
//generate collectible items
function generateCollectibles(){
  var randId = Math.floor(Math.random()*100000)
  var randPosX = Math.floor(Math.random()*map.width);
  var randPosY = Math.floor(Math.random()*map.height);
  var collectible = {
    position: "absolute",
    class: "collectible",
    height: 10,
    width: 10,
    positionX: randPosX,
    positionY: randPosY,
    color: "green",
    id: randId,
    status: false,
    type: "good",
  }
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+collectible.width>map.width || randPosY+collectible.height>map.height){
      generateCollectibles();
    }else{
      var obj = document.createElement("div");
      obj.setAttribute("class",collectible.class);
      obj.setAttribute("id", collectible.id);
      obj.style.position = collectible.position;
      obj.style.height = collectible.height+"px";
      obj.style.width = collectible.width+"px";
      obj.style.top = collectible.positionY+"px";
      obj.style.left = collectible.positionX+"px";
      obj.style.backgroundColor = collectible.color;
      var mapping = document.querySelector("#gamearea");
      mapping.appendChild(obj);
      animateObjects(obj, collectible);
      obstacleArray.push(collectible);
    }
}
//generate movement at random
function animateObjects(obj, gameObject){
  var moveIt = setInterval(randomMovement,20, obj, gameObject);
  if (gameObject.type === "boom"){
    explode(obj,gameObject);
  }
}
//generate random movement for each object type
function randomMovement(obj,gameObject){
  var randNum = Math.floor(Math.random()*4)
  switch (randNum){
    case 0:
      gameObject.positionX -= 1;
      obj.style.left = gameObject.positionX+"px"
    break;
    case 1:
      gameObject.positionX += 1;
      obj.style.left = gameObject.positionX+"px"
    break;
    case 2:
      gameObject.positionY += 1;
      obj.style.top = gameObject.positionY+"px"
    break;
    case 3:
      gameObject.positionY -= 1;
      obj.style.top = gameObject.positionY+"px"
    break;
  }
}
//function to explode bomb when landed
function explode (obj,gameObject){
  var timeBomb = setTimeout(expand, 10000, obj,gameObject);
}
//explodes the bomb
function expand(obj,gameObject){
  gameObject.status = true;
  var exploding = setInterval(expanding,20,obj, gameObject)
  var count = 0;
  function expanding(obj, gameObject){
      gameObject.positionY-=1;
      gameObject.positionX-=1;
      gameObject.height+=2;
      gameObject.width+=2;
      obj.style.height = gameObject.height+"px";
      obj.style.width = gameObject.width+"px";
      obj.style.top = gameObject.positionY+"px";
      obj.style.left = gameObject.positionX+"px";
      count++;
    if (count === 20){
      clearInterval(exploding);
      setTimeout(removeDebris,200,obj, gameObject)
    }
  }
}
//clear bomb elements after explosion
function removeDebris(obj, gameObject){
  for (var i = 0; i < obstacleArray.length; i ++){
    if (obstacleArray[i]["id"] === gameObject.id){
        obstacleArray.splice(i,1);
        obj.remove();
    }
  }
}
//movement for player using arrow keys
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
}
//function to update move each time player pushes a key
function updatePlayerMove(){
  if (player.active === true){
    var updateMovement = document.querySelector("#player");
    updateMovement.style.top = player.positionY+"px";
    updateMovement.style.left = player.positionX+"px";
  }
}
//function to update objects as they move
// function updateObjectMove(){
//   for (var i = 0; i < obstacleArray.length; i++){
//     var num = obstacleArray[i].id;
//     var txt = num.toString();
//     var obj = document.getElementById(txt);
//     obj.style.top = obstacleArray[i].positionY+"px";
//     obj.style.left = obstacleArray[i].positionX+"px";
//   }
// }
//function to check collision
function checkBorderCollision(){
  var gameArea = document.querySelector("#gamearea")
  if (player.positionX+player.width > map.width){
    player.positionX-=player.width;
  }else if (player.positionX<0){
    player.positionX+=player.width;
  }else if (player.positionY<0){
    player.positionY+=player.height;
  }else if (player.positionY+player.height>map.width){
    player.positionY-=player.height;
  }
}
//checks if object is going out of play area
function checkObjectBorderCollision(){
  for (var i = 0; i < obstacleArray.length; i++){
    var num = obstacleArray[i].id;
    var txt = num.toString();
    var obj = document.getElementById(txt);
    if (obstacleArray[i].positionX+obstacleArray[i].width > map.width){
      obstacleArray[i].positionX-=obstacleArray[i].width;
    }
    if (obstacleArray[i].positionX<0){
      obstacleArray[i].positionX+=obstacleArray[i].width;
    }
    if (obstacleArray[i].positionY<0){
      obstacleArray[i].positionY+=obstacleArray[i].height;
    }
    if (obstacleArray[i].positionY+obstacleArray[i].height>map.width){
      obstacleArray[i].positionY-=obstacleArray[i].height;
    }
  }
}
//function to check for collision between objects and player
function checkObjectCollision(){
  for (var i = 0; i < obstacleArray.length; i++){
    if ((player.positionX+player.width > obstacleArray[i].positionX) && (player.positionX < obstacleArray[i].positionX+obstacleArray[i].width) && (player.positionY+player.height > obstacleArray[i].positionY) && (player.positionY < obstacleArray[i].positionY+obstacleArray[i].height)){
      if (obstacleArray[i].type === "boom" && obstacleArray[i].status===true){
        console.log("boom!")
      }else if (obstacleArray[i].type === "good"){
        var num = obstacleArray[i].id;
        var txt = num.toString();
        var removeElement = document.getElementById(txt);
        removeElement.remove();
        obstacleArray.splice(i,1);
        player.collecteditems +=1;
      }else if (obstacleArray[i].type === "safe"){
        player.score += player.collecteditems;
        var score = document.querySelector("#scorecounter")
        score.innerText = "Your score is: "+player.score;
        player.collecteditems = 0;
      }
    }
  }
  for (var j = 0; j < obstacleArray.length; j++){
    if (obstacleArray[j].type === "good"){
      for (var k = 0; k < obstacleArray.length; k++){
        if ((obstacleArray[j].positionX+obstacleArray[j].width > obstacleArray[k].positionX) && (obstacleArray[j].positionX < obstacleArray[k].positionX+obstacleArray[k].width) && (obstacleArray[j].positionY+obstacleArray[j].height > obstacleArray[k].positionY) && (obstacleArray[j].positionY < obstacleArray[k].positionY+obstacleArray[k].height)){
          if (obstacleArray[k].type === "boom" && obstacleArray[k].status===true){
            console.log("boom!")
            var num = obstacleArray[j].id;
            var txt = num.toString();
            var removeElement = document.getElementById(txt);
            removeElement.remove();
            obstacleArray.splice(j,1);
          }
        }
      }
    }
  }
}
setInterval(function(){
  updatePlayerMove();
  // updateObjectMove();
  checkBorderCollision();
  checkObjectCollision();
  checkObjectBorderCollision();
},10)

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
