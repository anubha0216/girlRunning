var background,backgroundImg;
var girl, girlImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var dog,dogImg,dog_collided;
var coin,coinImg1,coinImg2,coinImg3;
var invisibleGround;
var dogGroup,coinsGroup;

function preload(){
  backgroundImg = loadImage("./Images/bgImg.jpg");
  girlImg = loadAnimation("Images/run1.png","Images/run2.png","Images/run3.png");
  dogImg = loadAnimation("Images/dog (1).png","Images/dog (2).png");
  dog_collided = loadImage("Images/dog (2).png");
  coinImg1 = loadImage("Images/coin (1).png");
  coinImg2 = loadImage("Images/coin (2).png");
  coinImg3 = loadImage("Images/coin (3).png");
}
function setup() {
  createCanvas(800,400);

  // sprite for background
  background = createSprite(320,200);
  background.addImage("track",backgroundImg);
  background.velocityX = -3;
  background.x = background.width/2;
  background.scale = 2.5

  // sprite for girl 
  girl = createSprite(70,350,10,10);
  girl.addAnimation("standing",girlImg);
  girl.scale= 2;

 
 /*dog = createSprite(730,300,50,50);
    dog.addAnimation("running",dogImg);
  dog.velocityX = -3
  dog.scale = 0.5; */
 

  invisibleGround = createSprite(50,380,900,20);
  invisibleGround.visible = false;


  girl.setCollider("rectangle",0,0,girl.width,girl.height);
  girl.debug = false;

  // creating  group
  dogGroup = createGroup();
  coinsGroup = createGroup();
}

function draw() {

// displaying score 
text("Score: "+score,350,250);




//stop girl from falling down
girl.collide(invisibleGround);    

// gameState for game 
if (gameState === PLAY) {
  
  // moving background
 if (background.x < 0){
  background.x = background.width/2;
}
 // background.velocityX = -(4 + 3* score/100)

  //adding space 
  if(keyDown("space")) {
    girl.velocityY = -12;
}

//add gravity
girl.velocityY = girl.velocityY + 0.8;

dogObstacle();
if (coinsGroup.isTouching(girl)){
  coinsGroup.visible = false;
}
  

 // adding isTouching function
  if(dog.isTouching(girl)){
    gameState = END;
   dogObstacles.velocityX = 0;
}

} 
else if (gameState === END){

   // changing dog image and velocityX
   dogObstacle.velocityX = 0;

   //dog.changeAnimation("collided", dog_collided);

  // changing background velocityX
  background.velocityX = 0;

  coinsGroup.setVelocityXEach(0);
     dogGroup.setVelocityXEach(0);  

}

  drawSprites();
  coinObstacles();
}

function dogObstacle(){
  if (frameCount % 100 === 0){
    
    var dogObstacles = createSprite(730,300,10,10);
        dogObstacles.addAnimation("running",dogImg);
        dogObstacles.velocityX = -3
        dogObstacles.scale = 0.5;
        dogObstacles.lifetime = 300;


  }

   //adjust the depth
    //dog.depth = girl.depth;
    //girl.depth = girl.depth + 1;

    //add each obstacle to the group
     dogGroup.add(dogObstacles);
  }


  function coinObstacles(){
    if (frameCount % 120 === 0){
      var coin = createSprite(770,300,10,40);
     // coin.velocityX = -(6 + score/100);
        coin.velocityX = -3;
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: coin.addImage(coinImg1);
                 break;
         case 2: coin.addImage(coinImg2);
                 break;
         case 3: coin.addImage(coinImg3);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       coin.scale = 0.5;
       coin.lifetime = 300;
      

        //adjust the depth
   // coin.depth = coin.depth;
    //girl.depth = girl.depth + 1;

      //add each obstacle to the group
       coinsGroup.add(coin);
    }
   }