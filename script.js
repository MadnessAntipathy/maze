document.addEventListener("DOMContentLoaded", function(){
  console.log("DOM Content Loaded!")
});
//define global variable
function startGame(){
  document.querySelector("#startbutton").remove()
  document.querySelector("#introtext").remove()
  selectDifficulty()
}
function selectDifficulty(){
  var difficulty = document.createElement("div");
  difficulty.setAttribute("id","difficulty");
  var text = document.createElement("h2");
  text.style.color ="white";
  text.style.textAlign="center";
  text.innerText = "Select Difficulty"
  var easy = document.createElement("button");
  easy.type = "button";
  easy.style.textAlign = "center";
  easy.style.border = "1px solid black";
  easy.style.height="20px";
  easy.style.width="150px";
  easy.innerText = "Lamb Chop Easy";
  easy.style.backgroundColor="rgba(255,255,255,0.5)";
  easy.setAttribute("id", "easy");
  easy.addEventListener("click", setDifficulty);
  easy.addEventListener("mouseover", changeColor);
  easy.addEventListener("mouseout", changeBack);
  var normal = document.createElement("button");
  normal.type = "button";
  normal.style.textAlign = "center";
  normal.style.border = "1px solid black";
  normal.innerText = "Normal";
  normal.style.height="20px";
  normal.style.width="150px";
  normal.style.backgroundColor="rgba(255,255,255,0.5)";
  normal.setAttribute("id", "normal");
  normal.addEventListener("click", setDifficulty);
  normal.addEventListener("mouseover", changeColor);
  normal.addEventListener("mouseout", changeBack);
  var farmegeddon = document.createElement("button");
  farmegeddon.type = "button";
  farmegeddon.style.textAlign = "center";
  farmegeddon.style.border = "1px solid black";
  farmegeddon.style.height="20px";
  farmegeddon.style.width="150px";
  farmegeddon.innerText = "Farmegeddon";
  farmegeddon.style.backgroundColor="rgba(255,255,255,0.5)";
  farmegeddon.setAttribute("id", "farmegeddon");
  farmegeddon.addEventListener("click", setDifficulty);
  farmegeddon.addEventListener("mouseover", changeColor);
  farmegeddon.addEventListener("mouseout", changeBack);
  difficulty.appendChild(text);
  difficulty.appendChild(easy);
  difficulty.appendChild(normal);
  difficulty.appendChild(farmegeddon);
  document.querySelector("#pagecontent").appendChild(difficulty);
}
//change color of difficulty option on mouseover
function changeColor(){
  var text = event.target;
  if (text.id === "easy"){
    text.style.backgroundColor = "rgba(255,255,0,0.5)";
  }
  if (text.id === "normal"){
    text.style.backgroundColor = "rgba(0,255,0,0.5)";
  }
  if (text.id === "farmegeddon"){
    text.style.backgroundColor = "rgba(255,0,0,0.5)";
  }
}
//change color of difficulty option back to original
function changeBack(){
  var text = event.target;
  text.style.backgroundColor = "rgba(255,255,255,0.5)";
}
function setDifficulty(){
  document.querySelector("#difficulty").remove();
  var difficulty = event.target.id;
  if (difficulty === "easy"){
    dropRate = 300;
  }
  if (difficulty === "normal"){
    dropRate = 200;
  }
  if (difficulty === "farmegeddon"){
    dropRate = 100;
  }
  var siren = new Audio("sounds/air-raid.mp3")
  siren.play();
  generateMap()
  generateOverallStats()
  generateSafeHouse()
  generatePlayer()
  //checks game state every 10ms - the global clock
  stopGame = setInterval(function(){
    move();
    updateObjectMove();
    checkObjectCollision();
    if (globalCounter % dropRate === 0 && globalCounter != 0){
      generateMultigeddon();
      generateCollectibles();
    }
    globalCounter++;
  },10)
}
function restartGame(){
  document.querySelector("#gamearea").remove()
  document.querySelector("#controls").remove()
  document.querySelector("#losecontainer").remove()
  player.collecteditems = 0;
  player.animaldeath = 0;
  player.score = 0;
  player.barnstate = 0;
  obstacleArray = [];
  selectDifficulty()
}
//global variables defined
var obstacleArray = [];
var safeHouse = null;
var stopGame;
var globalCounter = 0;
//define player variable
var player = {
  active: false, //whether player is generated in game
  lose: false,
  movestatus: true, //whether player can move
  livestatus: null,
  id: "player",
  type: "player",
  position: "absolute",
  positionX: null,
  positionY: null,
  height: 20,
  width: 10,
  animaldeath: 0,
  animaldeathlimit: 10,
  color: "black",
  collecteditems: 0,
  score: 0,
  barnstate: 0,
  up: function(){
    player.positionY-=2;
  },
  down: function(){
    player.positionY+=2;
  },
  left: function(){
    player.positionX-=2;
  },
  right: function(){
    player.positionX+=2;
  },
}
//define map
var map = {
  id: "gamearea",
  height: 500,
  width: 500,
  color: "brown",
  margin: "auto",
  position: "relative",
}
//generate map
function generateMap(){
  var gameMap = document.createElement("div");
  gameMap.style.height = map.height+"px";
  gameMap.style.height = map.width+"px";
  gameMap.style.backgroundColor = map.color;
  gameMap.style.overflow = "hidden";
  gameMap.style.margin = map.margin;
  gameMap.style.position = map.position;
  gameMap.style.backgroundImage = "url(images/dirt-500x500.png)";
  gameMap.setAttribute("id", map.id);
  document.querySelector("#gamecontainer").appendChild(gameMap);
}
//generate button keys(for those who like to play games the hard way... good luck!)
// function generateButtonControl(){
  // var btnContainer = document.createElement("div");
  // btnContainer.setAttribute("id", "controls")
  // btnContainer.style.height="100px";
  // btnContainer.style.width="100px";
  // btnContainer.style.margin="0 auto";
  // btnContainer.style.padding="0";
  // btnContainer.style.justifyContent="center";
  // btnContainer.style.alignItems="center";
  // var btnUp = document.createElement("button");
  // btnUp.type="button";
  // btnUp.name="button";
  // btnUp.style.textAlign="center";
  // btnUp.innerText="UP";
  // btnUp.style.border="1px solid black"
  // btnUp.style.height="20px";
  // btnUp.style.width="50px";
  // btnUp.style.backgroundColor="rgba(255,255,255,0.5)";
  // btnUp.setAttribute("id","up")
  // btnUp.setAttribute("onclick", "moveSetSecondary()");
  // var btnDown = document.createElement("button");
  // btnDown.type="button";
  // btnDown.type="button";
  // btnDown.style.textAlign="center";
  // btnDown.innerText="DOWN";
  // btnDown.style.border="1px solid black"
  // btnDown.style.height="20px";
  // btnDown.style.width="50px";
  // btnDown.style.backgroundColor="rgba(255,255,255,0.5)";
  // btnDown.setAttribute("id","down")
  // btnDown.setAttribute("onclick", "moveSetSecondary()");
  // var btnLeft = document.createElement("button");
  // btnLeft.type="button";
  // btnLeft.style.textAlign="center";
  // btnLeft.innerText="LEFT";
  // btnLeft.style.border="1px solid black"
  // btnLeft.style.height="20px";
  // btnLeft.style.width="50px";
  // btnLeft.style.backgroundColor="rgba(255,255,255,0.5)";
  // btnLeft.setAttribute("id","left")
  // btnLeft.setAttribute("onclick", "moveSetSecondary()");
  // var btnRight = document.createElement("button");
  // btnRight.type="button";
  // btnRight.style.textAlign="center";
  // btnRight.innerText="RIGHT";
  // btnRight.style.border="1px solid black"
  // btnRight.style.height="20px";
  // btnRight.style.width="50px";
  // btnRight.style.backgroundColor="rgba(255,255,255,0.5)";
  // btnRight.setAttribute("id","right")
  // btnRight.setAttribute("onclick", "moveSetSecondary()");
  // var leftDiv=document.createElement("div");
  // var rightDiv=document.createElement("div");
  // var upDownDiv=document.createElement("div");
  // var spacing=document.createElement("div");
  // spacing.style.height="20px"
  // spacing.style.width="50px"
  // upDownDiv.appendChild(btnUp);
  // upDownDiv.appendChild(spacing);
  // upDownDiv.appendChild(btnDown);
  // leftDiv.appendChild(btnLeft);
  // rightDiv.appendChild(btnRight);
  // btnContainer.appendChild(leftDiv);
  // btnContainer.appendChild(upDownDiv);
  // btnContainer.appendChild(rightDiv);
  // document.querySelector("#game").appendChild(btnContainer);
// }
//generate stats for player
function generateOverallStats(){
  var statCount = document.createElement("div");
  statCount.setAttribute("id", "scorecounter")
  statCount.style.height = "20px";
  statCount.style.width = "250px";
  statCount.style.color = "white";
  statCount.style.zIndex = "3";
  statCount.innerText = "Your score is: Nothing so far";
  var carryCount = document.createElement("div");
  carryCount.setAttribute("id", "carrycounter")
  carryCount.style.height = "20px";
  carryCount.style.width = "250px";
  carryCount.style.color = "white";
  carryCount.style.zIndex = "3";
  carryCount.innerText = `You are carrying ZERO animals`;
  var deathCount = document.createElement("div");
  deathCount.setAttribute("id", "deathcounter")
  deathCount.style.height = "20px";
  deathCount.style.width = "250px";
  deathCount.style.color = "white";
  deathCount.style.zIndex = "3";
  deathCount.innerText = `${player.animaldeath} animals have died`;
  var statContainer = document.createElement("div");
  statContainer.setAttribute("id", "controls")
  statContainer.style.height="100px";
  statContainer.style.width="300px";
  statContainer.style.margin="0 auto";
  statContainer.style.padding="0";
  statContainer.style.display="flex";
  statContainer.style.flexDirection="column";
  statContainer.style.justifyContent="center";
  statContainer.style.alignItems="center";
  statContainer.style.textAlign="center";
  statContainer.style.backgroundColor="rgba(0,0,0,0.5)";
  statContainer.appendChild(statCount);
  statContainer.appendChild(deathCount);
  statContainer.appendChild(carryCount);
  document.querySelector("#game").appendChild(statContainer);
}
//generate player
function generatePlayer(){
  var randNum = Math.floor(Math.random()*map.width);
  player.positionX = randNum;
  player.positionY = randNum;
  var play = document.createElement("div");
  play.id = "player"
  play.style.position = player.position;
  play.style.zIndex = "1";
  play.style.height = player.height+"px";
  play.style.width = player.width+"px";
  play.style.top = randNum+"px";
  play.style.left = randNum+"px";
  play.style.backgroundImage = "url(images/human-black-10x20.png)";
  player.active = true;
  var mapping = document.querySelector("#gamearea");
  obstacleArray.push(player);
  mapping.appendChild(play);
}
//generate safehouse
function generateSafeHouse(){
  safeHouse = {
    type: "safe",
    id: "safehouse",
    position: "absolute",
    height: 100,
    width: 100,
    positionX: 200,
    positionY: 400,
    color: "rgba(255,255,0,0.5)",
  }
  obstacleArray.push(safeHouse);
  var obj = document.createElement("div");
  obj.setAttribute("id", safeHouse.id);
  obj.style.position = safeHouse.position;
  obj.style.height = safeHouse.height+"px";
  obj.style.width = safeHouse.width+"px";
  obj.style.top = safeHouse.positionY+"px";
  obj.style.left = safeHouse.positionX+"px";
  obj.style.backgroundImage = "url(images/barn3-100x100.png)";
  obj.style.zIndex = "2"
  var map = document.querySelector("#gamearea");
  map.appendChild(obj);
}
//generate many bombs on map
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
    id: randId,
    type: "boom",
    movestatus: false, //whether bomb can move
    livestatus: false, //drop state of the object
    explodestatus: false, //whether object is in kill switch
    position: "absolute",
    class: "armageddon",
    positionX: randPosX,
    positionY: 0,
    dropY: randPosY,
    height: 17,
    width: 8,
    color: "blue",
    counter: 0, //count down to end of explosion
  }
  var newShadow = {
    id: randId*randId,
    type: "shadow",
    status: false, //check if shadow has finished showing
    position: "absolute",
    positionX: randPosX,
    positionY: randPosY,
    height: 1,
    width: 1,
    color: "black",
    zIndex: 0,
    counter: 0, //count down till explosion
  }
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+newObstacle.width>map.width || randPosY+newObstacle.height>map.height || ((randPosX+newObstacle.width>safeHouse.positionX) && (randPosX<safeHouse.positionX+safeHouse.width) && (randPosY+newObstacle.height>safeHouse.positionY) && (randPosY<safeHouse.positionY+safeHouse.height))){
      generateArmageddon();
    }else{
      var obj = document.createElement("div");
      obj.setAttribute("class",newObstacle.class);
      obj.setAttribute("id", newObstacle.id);
      obj.style.position = newObstacle.position;
      obj.style.height = newObstacle.height+"px";
      obj.style.width = newObstacle.width+"px";
      obj.style.zIndex = "2";
      obj.style.top = 0+"px";
      obj.style.left = newObstacle.positionX+"px";
      obj.style.backgroundImage = "url(images/bomb2-8x17.png)";
      var objShadow = document.createElement("div");
      objShadow.setAttribute("id", newShadow.id);
      objShadow.style.position = newObstacle.position;
      objShadow.style.height = newShadow.height+"px";
      objShadow.style.width = newShadow.width+"px";
      objShadow.style.zIndex = newShadow.zIndex;
      objShadow.style.top = newShadow.positionY+newObstacle.height+"px";
      objShadow.style.left = newShadow.positionX+(newObstacle.width/2)+"px";
      objShadow.style.backgroundColor = newShadow.color;
      var mapping = document.querySelector("#gamearea");
      mapping.appendChild(objShadow);
      mapping.appendChild(obj);
      obstacleArray.push(newObstacle);
      obstacleArray.push(newShadow);
    }
}
//generate collectible items
function generateCollectibles(){
  var randId = Math.floor(Math.random()*100000)
  var randPosX = Math.floor(Math.random()*map.width);
  var randPosY = Math.floor(Math.random()*map.height);
  var collectible = {
    id: randId,
    type: "good",
    status: false,
    movestatus: true, //whether object can move
    livestatus: false, //whether object is in follow mode
    position: "absolute",
    class: "collectible",
    height: 18,
    width: 10,
    positionX: randPosX,
    positionY: randPosY,
    color: "green",
    statuscollected: false,
  }
  if (randPosX%10!=0 || randPosY%10!=0 || randPosX+collectible.width>map.width || randPosY+collectible.height>map.height||((randPosX+collectible.width>safeHouse.positionX) && (randPosX<safeHouse.positionX+safeHouse.width) && (randPosY+collectible.height>safeHouse.positionY) && (randPosY<safeHouse.positionY+safeHouse.height))){
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
      obj.style.backgroundImage = "url(images/sheep-10x18.png)";
      var mapping = document.querySelector("#gamearea");
      mapping.appendChild(obj);
      obstacleArray.push(collectible);
    }
}
//have the bombs drop from top of the map to their starting positions
function dropping(obj,newObstacle){
  if (newObstacle.positionY === newObstacle.dropY ){
    newObstacle.livestatus = true;
    sound(newObstacle);
    exploding(obj,newObstacle);
    // objShadow.remove();
  }else{
    newObstacle.positionY+=5;
  }
}
//explodes the bomb, sets status to true so that if player or animal caught in blast, they will be destroyed
function exploding(obj, gameObject){
  gameObject.explodestatus = true;
  var randNum = Math.floor(Math.random()*20)+5;
  obj.style.backgroundImage="url(images/explode-15x20.png)"
  obj.style.backgroundSize="cover";
  obj.style.borderRadius="25";
  obj.style.zIndex="2";
  gameObject.positionY-=1;
  gameObject.positionX-=1;
  gameObject.height+=2;
  gameObject.width+=2;
  obj.style.height = gameObject.height+"px";
  obj.style.width = gameObject.width+"px";
  obj.style.top = gameObject.positionY+"px";
  obj.style.left = gameObject.positionX+"px";
  gameObject.counter++;
  if (gameObject.counter >= randNum){
    gameObject.explodestatus = false;
    setTimeout(removeDebris,1000,obj, gameObject)
    obj.style.backgroundImage="url(images/smoke-15x20.png)"
    obj.style.backgroundSize="cover";
    obj.style.borderRadius="25";
    obj.style.zIndex="2";
  }
}
//forms shadows below objects
function shadowForm(obj, gameObject){
  obj.style.width = gameObject.width+"px";
  obj.style.height = gameObject.height+"px";
  if (gameObject.counter > (gameObject.positionY/3)*2){
    if (gameObject.width < 15){
      gameObject.width+=2;
      gameObject.positionX--;
    }
    if (gameObject.height < 2){
      gameObject.height++
      gameObject.positionY+=3
    }
  }
  gameObject.counter+=5
  if (gameObject.counter >= gameObject.positionY){
    gameObject.status = true;
    for (var i = 0; i < obstacleArray.length; i ++){
      if (obstacleArray[i]["id"] === gameObject.id){
        obstacleArray.splice(i,1);
        obj.remove();
      }
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
//generate follow command for sheep based on player position
function followMovement(obj,gameObject){
  if (gameObject.positionX > player.positionX){
    gameObject.positionX--;
  }
  if (gameObject.positionX < player.positionX){
    gameObject.positionX++;
  }
  if (gameObject.positionY < player.positionY){
    gameObject.positionY++;
  }
  if (gameObject.positionY > player.positionY){
    gameObject.positionY--;
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
  if (player.active === true){
    if (left){
      player.left();
    }
    if (right){
      player.right();
    }
    if (up){
      player.up();
    }
    if (down){
      player.down();
    }
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
// function to update objects as they move
function updateObjectMove(){
  if (player.active === true){
    for (var i = 0; i < obstacleArray.length; i++){
      var num = obstacleArray[i].id;
      var txt = num.toString();
      var obj = document.getElementById(txt);
      obj.style.top = obstacleArray[i].positionY+"px";
      obj.style.left = obstacleArray[i].positionX+"px";
      // move objects only if they have the status set to true. bombs will not continue moving once they have been set off
      if (obstacleArray[i]["type"] === "good" && obstacleArray[i]["movestatus"] === true && obstacleArray[i]["livestatus"] === false){
        randomMovement(obj,obstacleArray[i]);
      }else if (obstacleArray[i]["type"] === "good" && obstacleArray[i]["movestatus"] === true && obstacleArray[i]["livestatus"] === true){
        followMovement(obj,obstacleArray[i]);
      }else if (obstacleArray[i]["type"] === "boom" && obstacleArray[i]["livestatus"] === false && obstacleArray[i]["explodestatus"] === false){
        dropping(obj,obstacleArray[i]);
      }else if (obstacleArray[i]["type"] === "boom" && obstacleArray[i]["livestatus"] === true && obstacleArray[i]["explodestatus"] === true){
        exploding(obj,obstacleArray[i]);
      }else if (obstacleArray[i]["type"] === "shadow" && obstacleArray[i]["status"] === false){
        shadowForm(obj,obstacleArray[i]);
      }
    }
  }
}
//function to check for collision between objects and player and if player is out of map boundary
function checkObjectCollision(){
  for (var i = 0; i < obstacleArray.length; i++){
    //check if object is out of map boundary
    if (obstacleArray[i]["movestatus"] === true){
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
    if ((player.positionX+player.width > obstacleArray[i].positionX) && (player.positionX < obstacleArray[i].positionX+obstacleArray[i].width) && (player.positionY+player.height > obstacleArray[i].positionY) && (player.positionY < obstacleArray[i].positionY+obstacleArray[i].height)){
      if (obstacleArray[i].type === "good" && obstacleArray[i].statuscollected === false){
        sound(obstacleArray[i])
        obstacleArray[i]["livestatus"] = true; //sheep will start following player now
        obstacleArray[i].statuscollected = true;
        player.collecteditems +=1;
        var carry = document.querySelector("#carrycounter")
        carry.innerText = `You are currently carrying ${player.collecteditems} animals`;
      }else if (obstacleArray[i].type === "boom" && obstacleArray[i].explodestatus===true){
        console.log("boom!")
        player.active = false;
        player.lose = true;
        checkLoseState();
      }
    }

    //check if a sheep has been blown up by a bomb or bumps into another sheep or has ben deposited into the barn
    if (obstacleArray[i].type === "boom" && obstacleArray[i].explodestatus===true){
      for (var k = 0; k < obstacleArray.length; k++){
        if ((obstacleArray[i].positionX+obstacleArray[i].width > obstacleArray[k].positionX) && (obstacleArray[i].positionX < obstacleArray[k].positionX+obstacleArray[k].width) && (obstacleArray[i].positionY+obstacleArray[i].height > obstacleArray[k].positionY) && (obstacleArray[i].positionY < obstacleArray[k].positionY+obstacleArray[k].height)){
          if (obstacleArray[k].type === "good"){
            if (obstacleArray[k].livestatus === true){
              player.collecteditems-=1;
              document.querySelector("#carrycounter").innerText = `You are currently carrying ${player.collecteditems} animals`;
            }
            console.log("boom!")
            obstacleArray[k].type = "dead";
            sound(obstacleArray[k]);
            var num = obstacleArray[k].id;
            var txt = num.toString();
            var removeElement = document.getElementById(txt);
            removeElement.remove();
            obstacleArray.splice(k,1);
            player.animaldeath+=1;
            //if too many animals died, game over
            if (player.animaldeath >= player.animaldeathlimit){
              checkLoseState();
            }
            var death = document.querySelector("#deathcounter")
            death.innerText = `${player.animaldeath} animals have died!`;
            break;
          }
        }
      }
    }
    if (obstacleArray[i].type === "good" && obstacleArray[i].livestatus === true){
      for (var j = 0; j < obstacleArray.length; j++){
        if ((obstacleArray[i].positionX+obstacleArray[i].width > obstacleArray[j].positionX) && (obstacleArray[i].positionX < obstacleArray[j].positionX+obstacleArray[j].width) && (obstacleArray[i].positionY+obstacleArray[i].height > obstacleArray[j].positionY) && (obstacleArray[i].positionY < obstacleArray[j].positionY+obstacleArray[j].height)){
          if (obstacleArray[j].type === "good" && obstacleArray[j].livestatus===true){
            var randBump = Math.floor(Math.random()*4);
            switch (randBump){
              case 0:
                obstacleArray[i].positionY-=obstacleArray[i].height;
                obstacleArray[j].positionY+=obstacleArray[j].height;
              break;
              case 1:
                obstacleArray[i].positionY+=obstacleArray[i].height;
                obstacleArray[j].positionY-=obstacleArray[j].height;
              break;
              case 2:
                obstacleArray[i].positionX+=obstacleArray[i].width;
                obstacleArray[j].positionX-=obstacleArray[j].width;
              break;
              case 3:
                obstacleArray[i].positionX-=obstacleArray[i].width;
                obstacleArray[j].positionX+=obstacleArray[j].width;
              break;
            }
          }
          if (obstacleArray[j].type === "safe"){
            player.score ++;
            player.collecteditems--;
            document.querySelector("#scorecounter").innerText = `Your score is: ${player.score}`;
            document.querySelector("#carrycounter").innerText = `You are currently carrying ${player.collecteditems} animals`;
            var num = obstacleArray[i].id;
            var txt = num.toString();
            var removeElement = document.getElementById(txt);
            removeElement.remove();
            obstacleArray.splice(i,1);
            if (player.score>0 && player.barnstate === 0){
              var sheep = document.createElement("div");
              sheep.style.position = "absolute";
              sheep.style.height = "18px";
              sheep.style.width = "10px";
              sheep.style.top = "82px";
              sheep.style.left = "50px";
              sheep.style.backgroundImage = "url(images/sheep-10x18.png)";
              document.querySelector("#safehouse").appendChild(sheep)
              player.barnstate = 1;
            }
            break;
          }
        }
      }
    }
  }
}
//check if game ends based on condtions: player got hit by bomb or if animal death count reaches 10
function checkLoseState(){
  if (player.lose === true || player.animaldeath >= player.animaldeathlimit){
    clearInterval(stopGame);
    var loseContainer = document.createElement("div");
    loseContainer.setAttribute("id","losecontainer")
    loseContainer.style.position = "absolute";
    loseContainer.style.top = "50%";
    loseContainer.style.left = "50%";
    loseContainer.style.transform = "translate(-50%,-50%)";
    loseContainer.style.zIndex = "4";
    loseContainer.style.textAlign = "center"
    loseContainer.style.display = "flex";
    loseContainer.style.flexDirection = "column";
    loseContainer.style.justifyContent = "center";
    loseContainer.style.alignItems = "center";
    loseContainer.style.height = "300px";
    loseContainer.style.width = "600px";
    loseContainer.style.backgroundColor = "rgba(255,255,255,0.5)";
    loseContainer.style.margin = "auto";
    var lose = document.createElement("h1");
    var stats = document.createElement("h2");
    var death = document.createElement("h2");
    if (player.lose === true){
      lose.innerText = "AHHHHH YOU DIED!!! Try again?";
    }else{
      lose.innerText = `${player.animaldeathlimit} animals died!!! Try again?`;
    }
    if (player.score === 0){
      stats.innerText = `You saved: ZERO animals! For shame!`
    }else{
      stats.innerText = `You saved: ${player.score} animals!`
    }
    if (player.animaldeath < player.animaldeathlimit){
      death.innerText = `Animal Deaths: ${player.animaldeath}`
    }
    var tryAgain = document.createElement("button");
    tryAgain.type="button";
    tryAgain.style.textAlign="center";
    tryAgain.innerText="Try Again";
    tryAgain.style.border="1px solid black"
    tryAgain.style.height="20px";
    tryAgain.style.width="150px";
    tryAgain.style.backgroundColor="rgba(255,255,255,0.5)";
    tryAgain.setAttribute("id","tryagain")
    tryAgain.setAttribute("onclick", "restartGame()");
    loseContainer.appendChild(lose);
    loseContainer.appendChild(stats);
    loseContainer.appendChild(death);
    loseContainer.appendChild(tryAgain);
    document.body.appendChild(loseContainer);
    player.lose = false;
  }
}
//plays sound during object interactions
function sound(gameObject){
  var sheepAudio = new Audio("sounds/sheep.wav")
  var sheepDeathAudio = new Audio("sounds/sheep-death.wav")
  var bombAudio = new Audio("sounds/explode.wav")
  if (gameObject.type === "boom"){
    bombAudio.play();
  }
  if (gameObject.type === "good"){
    sheepAudio.play();
  }
  if (gameObject.type === "dead"){
    sheepDeathAudio.play();
  }
}
//prevent arrow keys from scrolling down the page
window.addEventListener("keydown", function(){
  if ([32,37,38,39,40].indexOf(event.keyCode) >-1){
    event.preventDefault();
  }
});
