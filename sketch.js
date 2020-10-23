var PLAY=1;
var END = 0;
var gameState=1;
var monkey , monkey_running, monkey_stop;
var gameOverImage,gameOver;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var hungerLevel=150;
var ground,groundImage;
var invisibleGround;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    gameOverImage=loadImage("gameOver1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("18b4ac88-ad8b-4d53-8307-c6cf59e6e7cf.png");
  monkey_stop=loadAnimation("050906ad-6e73-4d97-8b58-b0f882962fd8.png")

}



function setup() {
  createCanvas(600,400);
  //for group
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //for monkey
  monkey=createSprite(75,320,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.1;
  
  
  //for ground
  ground = createSprite(300,350,1200,10);
  ground.velocityX=-(4+(survivalTime/30));
  ground.x=ground.width/2;
  ground.addImage(groundImage)
  console.log(ground.x);
  invisibleGround = createSprite(300,360,1200,10);
  invisibleGround.visible = false;
 
  //for gameOver
  gameOver=createSprite(300,180,20,20);
  gameOver.addImage("gameOverImg",gameOverImage);
  gameOver.scale=1.5;
  gameOver.visible=false;
}


function draw() {
background(255);
 
  
  if(gameState===PLAY){
  
  //for resetting
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //for survival time
    survivalTime=Math.ceil(frameCount/frameRate());
    
    
   //for making monkey jump
    if(keyDown("space")&& monkey.y>=318){
      monkey.velocityY=-20;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 1;
    
    //for depth and stuff
    if(ground.depth=monkey.depth){
      monkey.depth=monkey.depth+10000000000;
    }
        if(ground.depth=obstacleGroup.depthEach){
      obstacleGroup.depthEach=obstacleGroup.depthEach+1;
    }
    
    spawnBanana();
    spawnObstacles();
    
    //for hungry monkey's food
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      hungerLevel=hungerLevel-1;
    }
    
    //for touching obstacles 
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      monkey.velocityY=0;
    }
}else if(gameState===END){
  ground.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  monkey.changeAnimation("stop",monkey_stop);
  gameOver.visible=true;
  
  if(FoodGroup.depthEach>=gameOver.depth){
    gameOver.depth=gameOver.depth+1;
  }
}
  
//for colliding monkey
  monkey.collide(invisibleGround);
 
  drawSprites();
  //for survival time
  stroke(254, 141, 119);
  textSize(20);
  fill(0);
  text("Survival Time:"+survivalTime,10,50);
  
  //for hungerLevel
  if(hungerLevel>=0){
  stroke(0);
  textSize(15);
  fill(254, 141, 119);
  text("Hunger Level:"+hungerLevel,480,20);
}
   if(hungerLevel===0&&gameState===PLAY){
     stroke(0);
     fill("black");
     textSize(25);
     text("YOU AREN'T HUNGRY ANYMORE",100,200)
   }
}

//function for spawning banana
function spawnBanana(){
  if(frameCount%80===0&&hungerLevel>-1){
    banana=createSprite(600,300,20,20);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(150,320));
    banana.velocityX=-5;
    banana.setLifetime=125;
    FoodGroup.add(banana);
    banana.scale=0.1;
  }
  
}

//function for spawning obstacle
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(5+(survivalTime/30));
    obstacle.setLifetime=125;
    obstacleGroup.add(obstacle);
    obstacle.scale=0.13;
  }
  
}


