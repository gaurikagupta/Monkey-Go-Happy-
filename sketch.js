var PLAY=1;
var END=0;
var gameState=PLAY;
var back, backImage;
var back2, backImage2;
var back3;
var collidedMonkey;
var monkey, monkeyImage;
var food, foodImage;
var obs, obsImage;
var bananasGroup;
var obsGroup;
var score;
var gameover, gameoverImage;
var restart, restartImage;
var bird, birdImage;
var birdGroup;

function preload(){
backImage=loadImage("jungle.jpg");
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
backImage2=loadImage("jungle.jpg");
foodImage=loadImage("banana.png");
obsImage=loadImage("stone.png");
gameoverImage=loadImage("gameOver.png");
collidedMonkey=loadImage("Monkey_01.png");
restartImage=loadImage("restart.png");
birdImage=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png");
}

function setup(){
createCanvas(1600,600);

back2=createSprite(1000,300);
back2.addImage(backImage2);
back2.scale=1.5;

back=createSprite(1600,200);
back.addImage(backImage);
back.x=back.width/2;
back.scale=2;

back3=createSprite(800,560,1600,80);
back3.visible=false;

monkey=createSprite(380,500);
monkey.addAnimation("running",monkeyImage);
monkey.addAnimation("collided",collidedMonkey);
monkey.scale=0.1;

bananasGroup=createGroup();
obsGroup=createGroup();
birdGroup=createGroup();

score=0;


gameover=createSprite(630,170);
gameover.addImage(gameoverImage);


restart=createSprite(640,330);
restart.addImage(restartImage);
restart.scale=0.5;
}

function draw(){
  background("black");

  if(gameState===PLAY){
   monkey.changeAnimation("running",monkeyImage);
   gameover.visible=false;
   restart.visible=false;
   if(back.x<400){
      back.x=back.width/2;
   }
   back.velocityX=-4;
   bananas();
   obstacles();
   if(keyDown("UP_ARROW")&&monkey.y>300){
     monkey.velocityY=-14;
   }
   Birds();
   monkey.velocityY=monkey.velocityY+0.5;
   if(monkey.isTouching(bananasGroup)){
     score=score+5;
     bananasGroup.destroyEach();
     monkey.scale=monkey.scale+0.03;
     monkey.velocityY=monkey.velocityY+1;
     obsGroup.scale=obsGroup.scale+1;
   }
   if(monkey.isTouching(obsGroup)){
     gameState=END;
     monkey.scale=0.1;
   }
  }

  if(gameState===END){
    score=0;
    gameover.visible=true;
    restart.visible=true;
    back.velocityX=0;
    monkey.changeAnimation("collided",collidedMonkey);
    monkey.velocityY=monkey.velocityY+0.5;
    obsGroup.destroyEach();
    bananasGroup.destroyEach();
    birdGroup.destroyEach();
    if(mousePressedOver(restart)){
    gameState=PLAY;
    }
  }
  monkey.collide(back3);
  drawSprites();
  fill("black");
  stroke(100);
  textSize(20);
  text("SCORE : "+score,1000,50);
}

function bananas(){
  if(frameCount%80===0){
    food=createSprite(550,350);
    food.addImage(foodImage);
    food.velocityX=-4;
    food.lifetime=1600;
    food.scale=0.05;
    bananasGroup.add(food);
  }
}

function obstacles(){
  if(frameCount%120===0){
  obs=createSprite(650,500);
  obs.addImage(obsImage);
  obs.velocityX=-4;
  obs.lifetime=1600;
  obs.scale=0.2;
  obsGroup.add(obs);
  }
}

function Birds(){
  if(frameCount%200===0){
  bird=createSprite(1200,100);
  bird.addAnimation("flying",birdImage);
  bird.velocityX=-8;
  bird.scale=0.5;
  birdGroup.add(bird);
  }
} 
