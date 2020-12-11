var monkey ,monkey_running
var fruit,bananaImage,obstacleImage,stone
var score 
var gameState;
var PLAY=1;
var END=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
monkey=createSprite(50,350,10,10)
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(200,350,400,10);
   
  ground.shapeColor="brown";
   score=0
   food=0
  gameState="PLAY"
  foodGroup = new Group()
  obstacleGroup= new Group();
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
}


function draw() {
  background("white")
  fill("black");
  text("SURVIVAL TIME:"+score,10,30)
  text("FOOD COUNT:"+food,200 ,30)
  if(gameState==="PLAY"){
    
     score = score + Math.round(getFrameRate()/60);
   
  if(keyDown("space")&&monkey.y>=300){
    monkey.velocityY=-12
  }
  monkey.velocityY=monkey.velocityY+0.8
    
     spawnObstacles();
  spawnFruits();
    if(foodGroup.isTouching(monkey)){
      food=food+1;
      foodGroup.destroyEach();
    }
     if(obstacleGroup.isTouching(monkey)){
     gameState=END
    }
  }
  if(gameState===END){
    obstacleGroup.setVelocityXEach=0
    foodGroup.setVelocityXEach=0
    obstacleGroup.setLifetimeEach=-1
    foodGroup.setLifetimeEach=-1
    textSize(20);
    fill("black")
    text("GAMEOVER",200,200);
  }

 
   monkey.collide(ground);
drawSprites();
 
}


function spawnFruits(){
  
  if(frameCount%180===0){
    fruit=createSprite(400,330);
    fruit.y=random(300,200);
    fruit.addImage(bananaImage);
    fruit.scale=0.1
    fruit.velocityX=-2;
  fruit.lifetime=400
    foodGroup.add(fruit);
  }
}


function spawnObstacles(){
  
  if(frameCount%180===0){
    stone=createSprite(400,320);
    stone.addImage(obstacleImage);
    stone.scale=0.1
    stone.velocityX=-2;
    stone.lifetime=400
    obstacleGroup.add(stone)
  }
}






