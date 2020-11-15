var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisBlock, invisBlockGroup;
var gameState = "play";
var spookySound;
var score = 0;

function preload() {
  towerImg = loadImage('tower.png');
  doorImg = loadImage('door.png');
  climberImg = loadImage('climber.png');
  ghostImg = loadImage('ghost-standing.png');
  spookySound = loadSound('spooky.wav');
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300,1,1);
  tower.addImage(towerImg);
  
  doorGroup = new Group();
  
  climberGroup = new Group();
  
  ghost = createSprite(width/2,height/2,1,1);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  invisBlockGroup = new Group();
}

function draw() {
  background(51);
  if(gameState == "play") {
    score = Math.round(score + getFrameRate()/60);
    spookySound.loop();
    tower.velocityY = 5;
    if(tower.y > 400) {
       tower.y = 300;
    }
    if(keyDown("space")) {
      ghost.velocityY = -8;
    } else if(keyDown(RIGHT_ARROW)) {
      ghost.x += 4;
    } else if(keyDown(LEFT_ARROW)) {
      ghost.x -= 4;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
     if(ghost.isTouching(climberGroup)){
      ghost.setVelocity(0,0);
    }
    if(invisBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    spawnDoors();
    //ghost.collide(climberGroup);
    drawSprites();
    textSize(20);
    fill(255);
    text("Score: " + score, width/2-30,30);
}
  if(gameState == "end") {
    spookySound.stop();
    textSize(30);
    fill(220);
    text("Game Over",width/2-60,height/2);   
  }
}

function spawnDoors() {
  if(frameCount % 250 == 0) {
    var r = Math.round(random(100,500));
    door = createSprite(r,-50,1,1);
    door.addImage(doorImg);
    ghost.depth = door.depth + 1;
    door.velocityY = 1;
    door.lifetime = 700;
    doorGroup.add(door);
    climber = createSprite(door.x,door.y+65,1,1);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 700;
    climberGroup.add(climber);
    invisBlock = createSprite(climber.x,climber.y,climber.width,2);
    invisBlock.velocityY = 1;
    invisBlock.debug = true;
    invisBlockGroup.add(invisBlock);
  }
}