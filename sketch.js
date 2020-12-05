var PLAY = 1;
var END = 0;
var gameState = PLAY;

// CREATING KNIFE, FRUITS AND OTHERS.
var sword , swordImage;
var fruit; 
var fruit1;
var fruit2;
var fruit3;
var fruit4;
var monster , monsterImage;
var gameOver , gameOverImage;
var fruitsGroup;
var enemyGroup;
var score = 0;
var chopSound , gameOverSound;

function preload() {
  
  swordImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png")
  
  chopSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
}

function setup() {
  createCanvas(500, 480);
  
// CREATING SWORD.
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  fruitsGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw(){
  background("black");
  
  fill("red");
  stroke(140);
  textSize(20);
  text("score : " + score, 70,50)
  
  sword.debug = false;
  sword.setCollider("circle",0,0,40)
  
  
  if(gameState === PLAY) {
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;
    
  enemy();
  fruits();
    
  if(sword.isTouching(fruitsGroup)) {
    fruitsGroup.destroyEach();
    score = score + 1;
    chopSound.play();
  }
    
  if(sword.isTouching(enemyGroup)) {
    enemyGroup.destroyEach();
    fruitsGroup.destroyEach();
    gameOverSound.play();
    gameState = END;
  }
    


} else if (gameState === END) {
  
    sword.visible = false;
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameover = createSprite(300,200,20,20);
    gameover.addImage(gameOverImage);
  
}

  drawSprites();
  
}

function fruits() {

  if(frameCount % 80 === 0) {
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    fruit.velocityX = -(15+(score/4))
    fruit.setLifetime = 100;
    var r = Math.round(random(1,4,7,9));
    if(r === 1) {
      fruit.addImage(fruit1);
    } else if (r === 2) {
      fruit.addImage(fruit2);
    } else if (r === 3) {
      fruit.addImage(fruit3);
    } else if (r === 4) {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    
    var position = Math.round(random (1,2));
    if(position==1){
    fruit.x=600
    fruit.velocityX=-(20+(score/5));
    
      
   }else{
   
   if(position==2){
    fruit.x=0;
    fruit.velocityX=(20+(score/5));
    
   //increse the speed after score 4 or 10
    
         }
       }
    
  
      
    fruitsGroup.add(fruit);
  }
}

function enemy() {
  
  if(World.frameCount % 200 === 0) {
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.x = Math.round(random(100,300))
    monster.velocityX = -(15+(score/5));
    monster.setLifetime = 50;
    
    
    enemyGroup.add(monster);
  }
  
}



