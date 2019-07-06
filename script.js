console.log("Hello world")
//define global variable
function startGame(){
  document.querySelector("#startbutton").remove()
  generateMap()
  generateStatCount()
  generateCarryCount()
  generateButtonControl()
  generateSafeHouse()
  generatePlayer()
  generateBombardment()
}
function restartGame(){
  player.collecteditems = 0;
  player.score = 0;
  obstacleArray = [];
  document.querySelector("#losecontainer").remove()
  generateMap()
  generateStatCount()
  generateCarryCount()
  generateButtonControl()
  generateSafeHouse()
  generatePlayer()
  generateBombardment()
  stopGame = setInterval(function(){
    move();
    updatePlayerMove();
    updateObjectMove();
    checkBorderCollision();
    checkAnimalDeath()
    checkObjectCollision();
    checkObjectBorderCollision();
    checkLoseState();
  },5)
}
var bombsAway = null;
var animalsAway = null;
var obstacleArray = [];
var safeHouse = null;
//define player variable
var player = {
  active: false,
  lose: false,
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
//generate button keys
function generateButtonControl(){
  var btnContainer = document.createElement("div");
  btnContainer.setAttribute("id", "controls")
  btnContainer.style.height="100px";
  btnContainer.style.width="100px";
  btnContainer.style.margin="auto";
  btnContainer.style.display="flex";
  btnContainer.style.justifyContent="center";
  btnContainer.style.alignItems="center";
  var btnUp = document.createElement("button");
  btnUp.type="button";
  btnUp.name="button";
  btnUp.style.textAlign="center";
  btnUp.innerText="UP";
  btnUp.style.border="1px solid black"
  btnUp.style.height="20px";
  btnUp.style.width="50px";
  btnUp.style.backgroundColor="red";
  btnUp.setAttribute("id","up")
  btnUp.setAttribute("onclick", "moveSetSecondary()");
  var btnDown = document.createElement("button");
  btnDown.type="button";
  btnDown.type="button";
  btnDown.style.textAlign="center";
  btnDown.innerText="DOWN";
  btnDown.style.border="1px solid black"
  btnDown.style.height="20px";
  btnDown.style.width="50px";
  btnDown.style.backgroundColor="red";
  btnDown.setAttribute("id","down")
  btnDown.setAttribute("onclick", "moveSetSecondary()");
  var btnLeft = document.createElement("button");
  btnLeft.type="button";
  btnLeft.style.textAlign="center";
  btnLeft.innerText="LEFT";
  btnLeft.style.border="1px solid black"
  btnLeft.style.height="20px";
  btnLeft.style.width="50px";
  btnLeft.style.backgroundColor="red";
  btnLeft.setAttribute("id","left")
  btnLeft.setAttribute("onclick", "moveSetSecondary()");
  var btnRight = document.createElement("button");
  btnRight.type="button";
  btnRight.style.textAlign="center";
  btnRight.innerText="RIGHT";
  btnRight.style.border="1px solid black"
  btnRight.style.height="20px";
  btnRight.style.width="50px";
  btnRight.style.backgroundColor="red";
  btnRight.setAttribute("id","right")
  btnRight.setAttribute("onclick", "moveSetSecondary()");
  var leftDiv=document.createElement("div");
  var rightDiv=document.createElement("div");
  var upDownDiv=document.createElement("div");
  var spacing=document.createElement("div");
  spacing.style.height="20px"
  spacing.style.width="50px"
  upDownDiv.appendChild(btnUp);
  upDownDiv.appendChild(spacing);
  upDownDiv.appendChild(btnDown);
  leftDiv.appendChild(btnLeft);
  rightDiv.appendChild(btnRight);
  btnContainer.appendChild(leftDiv);
  btnContainer.appendChild(upDownDiv);
  btnContainer.appendChild(rightDiv);
  document.body.appendChild(btnContainer);
}
//generate stat counter
function generateStatCount(){
  var statCount = document.createElement("div");
  statCount.setAttribute("id", "scorecounter")
  statCount.style.position = "absolute";
  statCount.style.top = "20px";
  statCount.style.right = "20px";
  statCount.style.height = "20px";
  statCount.style.width = "250px";
  statCount.style.backgroundColor = "rgba(255,0,0,0.5)"
  statCount.style.color = "white";
  statCount.innerText = "Your score is: Nothing so far";
  document.querySelector("#gamearea").appendChild(statCount);
}
//generate how many items you picked up
function generateCarryCount(){
  var statCount = document.createElement("div");
  statCount.setAttribute("id", "carrycounter")
  statCount.style.position = "absolute";
  statCount.style.top = "40px";
  statCount.style.right = "20px";
  statCount.style.height = "20px";
  statCount.style.width = "250px";
  statCount.style.backgroundColor = "rgba(255,0,0,0.5)"
  statCount.style.color = "white";
  statCount.innerText = `You are carrying ZERO animals`;
  document.querySelector("#gamearea").appendChild(statCount);
}
//generate player
function generatePlayer(){
  var randNum = Math.floor(Math.random()*map.width);
  var play = document.createElement("div");
  play.id = "player"
  play.style.position = player.position;
  play.style.height = player.height+"px";
  play.style.width = player.width+"px";
  play.style.top = randNum+"px";
  play.style.left = randNum+"px";
  play.style.backgroundColor = player.color;
  player.active = true;
  var mapping = document.querySelector("#gamearea");
  mapping.appendChild(play);
}
//generate safehouse
function generateSafeHouse(){
  safeHouse = {
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
//the function that calls down the animals and bombs

function generateBombardment(){
  bombsAway = setInterval(generateMultigeddon,3000)
  animalsAway = setInterval(generateCollectibles,300)
}
//generate many bombs on map and clears previous
function generateMultigeddon(){
  var randNum = Math.floor(Math.random()*10)+1;
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
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+10>map.width || randPosY+10>map.height || ((randPosX+10>safeHouse.positionX) && (randPosX<safeHouse.positionX+safeHouse.width) && (randPosY+10>safeHouse.positionY) && (randPosY<safeHouse.positionY+safeHouse.height))){
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
      obstacleArray.push(newObstacle);
      setBombToExplode(obj,newObstacle);
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
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+collectible.width>map.width || randPosY+collectible.height>map.height||((randPosX+10>safeHouse.positionX) && (randPosX<safeHouse.positionX+safeHouse.width) && (randPosY+10>safeHouse.positionY) && (randPosY<safeHouse.positionY+safeHouse.height))){
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
      obstacleArray.push(collectible);
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
function setBombToExplode (obj,gameObject){
  var randNum = Math.floor(Math.random()*6000)+3000;
  var timeBomb = setTimeout(expandBlast, randNum, obj,gameObject);
}
//explodes the bomb
function expandBlast(obj,gameObject){
  gameObject.status = true;
  var randNum = Math.floor(Math.random()*20)+5;
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
    if (count === randNum){
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
var up = false;
var down = false;
var left = false;
var right = false;
document.addEventListener("keydown", function (){
  if (event.key === "ArrowLeft"){
    left = true;
  }
  if (event.key === "ArrowRight"){
    right = true;
  }
  if (event.key === "ArrowUp"){
    up = true;
  }
  if (event.key === "ArrowDown"){
    down = true;
  }
});
document.addEventListener("keyup", function (){
  if (event.key === "ArrowLeft"){
    left = false;
  }
  if (event.key === "ArrowRight"){
    right = false;
  }
  if (event.key === "ArrowUp"){
    up = false;
  }
  if (event.key === "ArrowDown"){
    down = false;
  }
});
function move(){
    if (left){
      player.positionX-=1;
    }
    if (right){
      player.positionX+=1;
    }
    if (up){
      player.positionY-=1;
    }
    if (down){
      player.positionY+=1;
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
// function to update objects as they move
function updateObjectMove(){
  if (player.active === true){
    for (var i = 0; i < obstacleArray.length; i++){
      var num = obstacleArray[i].id;
      var txt = num.toString();
      var obj = document.getElementById(txt);
      obj.style.top = obstacleArray[i].positionY+"px";
      obj.style.left = obstacleArray[i].positionX+"px";
      if (obstacleArray[i]["type"] === "boom" || obstacleArray[i]["type"] === "good"){
        randomMovement(obj,obstacleArray[i])
      }
    }
  }
}
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
        player.active = false;
        player.lose = true;
        clearInterval(stopGame);
        clearInterval(bombsAway);
        clearInterval(animalsAway);
      }else if (obstacleArray[i].type === "good"){
        var num = obstacleArray[i].id;
        var txt = num.toString();
        var removeElement = document.getElementById(txt);
        removeElement.remove();
        obstacleArray.splice(i,1);
        player.collecteditems +=1;
        var carry = document.querySelector("#carrycounter")
        carry.innerText = `You are currently carrying ${player.collecteditems} animals`;
      }else if (obstacleArray[i].type === "safe"){
        player.score += player.collecteditems;
        player.collecteditems = 0;
        var score = document.querySelector("#scorecounter")
        score.innerText = `Your score is: ${player.score}`;
        document.querySelector("#carrycounter").innerText = `You are currently carrying ${player.collecteditems} animals`;
      }
    }
    if (obstacleArray[i].type === "good"){
      for (var k = 0; k < obstacleArray.length; k++){
        if ((obstacleArray[i].positionX+obstacleArray[i].width > obstacleArray[k].positionX) && (obstacleArray[i].positionX < obstacleArray[k].positionX+obstacleArray[k].width) && (obstacleArray[i].positionY+obstacleArray[i].height > obstacleArray[k].positionY) && (obstacleArray[i].positionY < obstacleArray[k].positionY+obstacleArray[k].height)){
          if (obstacleArray[k].type === "boom" && obstacleArray[k].status===true){
            console.log("boom!")
            var num = obstacleArray[i].id;
            var txt = num.toString();
            var removeElement = document.getElementById(txt);
            removeElement.remove();
            obstacleArray.splice(i,1);
            break;
          }
        }
      }
    }
  }
}
//function to check if animal died during bombing
function checkAnimalDeath(){
//   for (var j = 0; j < obstacleArray.length; j++){
//     if (obstacleArray[j].type === "good"){
//       for (var k = 0; k < obstacleArray.length; k++){
//         if ((obstacleArray[j].positionX+obstacleArray[j].width > obstacleArray[k].positionX) && (obstacleArray[j].positionX < obstacleArray[k].positionX+obstacleArray[k].width) && (obstacleArray[j].positionY+obstacleArray[j].height > obstacleArray[k].positionY) && (obstacleArray[j].positionY < obstacleArray[k].positionY+obstacleArray[k].height)){
//           if (obstacleArray[k].type === "boom" && obstacleArray[k].status===true){
//             console.log("boom!")
//             var num = obstacleArray[j].id;
//             var txt = num.toString();
//             var removeElement = document.getElementById(txt);
//             removeElement.remove();
//             obstacleArray.splice(j,1);
//           }
//         }
//       }
//     }
//   }
}


var stopGame = setInterval(function(){
  move();
  updatePlayerMove();
  updateObjectMove();
  checkBorderCollision();
  checkAnimalDeath()
  checkObjectCollision();
  checkObjectBorderCollision();
  checkLoseState();
},5)

function checkLoseState(){
  if (player.lose === true){
    player.lose = false;
    document.querySelector("#gamearea").remove()
    document.querySelector("#controls").remove()
    var loseContainer = document.createElement("div");
    loseContainer.setAttribute("id","losecontainer")
    loseContainer.style.textAlign = "center"
    loseContainer.style.height = "300px";
    loseContainer.style.width = "500px";
    loseContainer.style.backgroundColor = "white";
    loseContainer.style.margin = "auto";
    var lose = document.createElement("h1");
    lose.innerText = "AHHHHH YOU DIED!!! Try again?";
    var stats = document.createElement("h2");
    if (player.score === 0 ||player.score === null){
      stats.innerText = `You saved: ZERO animals! For shame!`
    }else{
      stats.innerText = `You saved: ${player.score} animals!`
    }
    var tryAgain = document.createElement("button");
    tryAgain.type="button";
    tryAgain.style.textAlign="center";
    tryAgain.innerText="Try Again";
    tryAgain.style.border="1px solid black"
    tryAgain.style.height="20px";
    tryAgain.style.width="150px";
    tryAgain.style.backgroundColor="red";
    tryAgain.setAttribute("id","tryagain")
    tryAgain.setAttribute("onclick", "restartGame()");
    loseContainer.appendChild(lose);
    loseContainer.appendChild(stats);
    loseContainer.appendChild(tryAgain);
    document.body.appendChild(loseContainer);
  }
}
