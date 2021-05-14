var player, player_img;
var background_img, back_ground;
var gameState = "play";
var score = 0;

var obstacle_img1,obstacle_img2,obstacle_img3, obstacle_img4;
var obstacle1, obstacle2, obstacle3, obstacle4;
var obstacle1Group, obstacle2Group, obstacle3Group, obstacle4Group;
var background2_img;

var side_sound, losing_sound,winning_sound, crashing_sound;
var edges, edge1, egde2;

function preload(){
    player_img = loadImage("spaceship.png");
    background_img = loadImage("background1.png");
    background2_img = loadImage("background2.png");
    obstacle_img1 = loadImage("obstacle3.png");
    obstacle_img2 = loadImage("obstacle1.png");
    obstacle_img3 = loadImage("obstacle2.png");
    obstacle_img4 = loadImage("obstacle4.png");

    side_sound = loadSound("jump.wav");
    losing_sound = loadSound("losing.wav");
    crashing_sound = loadSound("crashing.wav");
    winning_sound = loadSound("wining.wav");


}

function setup(){

 createCanvas(800,800);

 back_ground = createSprite(400,400,800,800);
 back_ground.addImage(background_img);
 back_ground.scale = 3;

 player = createSprite(400, 650, 50, 50);
 player.addImage(player_img);
 player.scale = 0.4;

 edge1 = createSprite(0,400,10,800);
 edge1.visible = false;

 edge2 = createSprite(800,400,10,800);
 edge2.visible = false;

 obstacle1Group = new Group();
 obstacle2Group = new Group();
 obstacle3Group = new Group();
 obstacle4Group = new Group();

}

async function draw(){

  

 if(gameState === "play"){

    back_ground.velocityY = ( 4 + 3*score/100);

     if(back_ground.y > 700){
         back_ground.y = 400;
     }
     if(keyDown(LEFT_ARROW)){
         player.x = player.x - (5*score/100);
     //    side_sound.play();
         
     }
     if(keyDown(RIGHT_ARROW)){
         player.x = player.x + (5*score/100);
     //    side_sound.play();
     }

/*     if(score >= 100){
         gameState = "end";
     }*/
       score = score + Math.round(getFrameRate()/60);

       if(player.isTouching(obstacle2Group) && score > 100){
         score = score - 100;
         obstacle2Group.destroyEach();
       }
       if(player.isTouching(obstacle2Group)&& score <= 100){
         score = 0;
          obstacle2Group.destroyEach();
       }

       if(player.isTouching(obstacle3Group)){
         for(var i = 0; i<5; i++){
             spawnObstacle4();
         }
      await  sleep(10);
      //  timeOut();
        
       }
       if(player.isTouching(obstacle3Group)){
         obstacle3Group.destroyEach();
       }

       player.bounceOff(edge1);
       player.bounceOff(edge2);

  spawnObstacle1();
  spawnObstacle2();
  spawnObstacle3();
  
 // edges = createEdgeSprites();

    drawSprites();

  if(player.isTouching(obstacle1Group)|| player.isTouching(obstacle4Group)|| score >= 1000){
     gameState = "end";

  }
    

 }
 if( gameState === "end"){
     if(score >= 1000){
     background(background2_img);
     stroke(20);
     fill("orange");
     textSize(50);
     text("YOU WON", 280, 300);
   //  winning_sound.play();
     }
   else{

     stroke(20);
     fill("yellow");
     textSize(50);
     text("YOU LOSE", 280, 300);
   //  losing_sound.play();
   }


 }

     stroke(10);
     fill("red");
     textSize(30);
     text("Score: "+ score, 10,50);
}

function spawnObstacle1(){
    if( frameCount % 80 === 0){
      obstacle1 = createSprite(Math.round(random(50,750)),20,30,30);
      obstacle1.addImage(obstacle_img1);
      obstacle1.velocityY = (6+3*score/100);
      obstacle1.scale = 0.15;
      obstacle1.lifetime = 500;
      obstacle1Group.add(obstacle1);
    }

}

function spawnObstacle2(){
  if( frameCount% 60 === 0){
    obstacle2 = createSprite(Math.round(random(50,750)),20,30,30);
    obstacle2.addImage(obstacle_img2);
    obstacle2.velocityY = (6+ 4*score/100);
     obstacle2.scale = 0.3;
      obstacle2.lifetime = 500;
      obstacle2Group.add(obstacle2);
    }
  }


function spawnObstacle3(){
    if( frameCount% 100 === 0){
    obstacle3 = createSprite(Math.round(random(50,750)),20,30,30);
    obstacle3.addImage(obstacle_img3);
    obstacle3.velocityY = (6+ 5*score/100);
     obstacle3.scale = 0.3;
      obstacle3.lifetime = 500;
      obstacle3Group.add(obstacle3);
    }
  }
  function spawnObstacle4(){
    if( frameCount% 30 === 0){
     obstacle4 = createSprite(Math.round(random(50,750)),20,30,30);
     obstacle4.addImage(obstacle_img4);
     obstacle4.velocityY = (6+ 5*score/100);
     obstacle4.scale = 0.15;
      obstacle4.lifetime = 500;
      obstacle4Group.add(obstacle4);
    }
  }
 function timeOut(){
   for(var i = 0; i<50; i++){
     console.log(i);
   }
 }