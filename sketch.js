var trex, trex_running, trex_collided;
var chao, chaoimg
var chaoinv
var cloudImage
var cactusgrupo
var cactus, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6
var score = 0
var inicio = 1
var fim = 0
var gameOver
var gameOverImage
var restart
var restartImage
var gameState = inicio
var cloudgroup
function preload() {
  //animação t-rex
  trex_running = loadAnimation("./images/trex1.png", "./images/trex3.png", "./images/trex4.png");
  chaoimg = loadImage("./images/ground2.png");
  cloudImage = loadImage("./images/cloud.png");
  //adicionar imagem
  cactus1 = loadImage("./images/obstacle1.png");
  cactus2 = loadImage("./images/obstacle2.png");
  cactus3 = loadImage("./images/obstacle3.png");
  cactus4 = loadImage("./images/obstacle4.png");
  cactus5 = loadImage("./images/obstacle5.png");
  cactus6 = loadImage("./images/obstacle6.png");
  gameOverImage = loadImage("./images/gameOver.png");
  restartImage = loadImage("./images/restart.png");
 
}

function setup() {
  createCanvas(600, 200)

  //sprite de trex
  trex = createSprite(50, 170, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5
  chao = createSprite(300, 195, 600, 5);
  cloudgroup = createGroup();
  chao.addImage(chaoimg);
  //gravidade   

  //sprite chão

  chaoinv = createSprite(300, 200, 600, 5)
  chaoinv.visible = false;
  cactusgrupo = createGroup()
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImage)
  restart=createSprite(300,100)
  restart.addImage(restartImage)
  restart.visible=false
  gameOver.visible=false
}

function draw() {
  background("LightSkyBlue")
  if (gameState == inicio) {
    score = score + Math.round(frameCount / 60)
   
    if (keyDown("space")) {
      trex.velocityY = -10;
    }
  

    trex.velocityY = trex.velocityY + 0.85;

    chao.velocityX = -5
    if (chao.x < 0) {
      chao.x = chao.width / 2
    }

  }

  textSize(15)
  fill("gray")
  text("score: " + score, 170, 10)
  
 
  if (cactusgrupo.isTouching(trex)) {
    gameState = "fim";
  } else if (gameState == "fim") {
  //  chao.velocityX = 0
  //  cactus.velocityX = 0
  }

  
  trex.collide(chaoinv)
  spawnClouds();

  gerarcactus()


  console.log(trex.y)
  drawSprites();

}
function spawnClouds() {
  if (frameCount % 60 == 0) {
    var cloud = createSprite(600, 100, 40, 10);
    cloud.velocityX = -5;
    cloud.y = Math.round(random(10, 70));
    cloud.addImage(cloudImage);
    cloud.depth = trex.depth - 1;
    cloud.lifetime = 150;
    cloudgroup.add(cloud);
  }

}

function gerarcactus() {
  if (frameCount % 60 === 0) {

    var cactus = createSprite(575, 180)
    cactus.velocityX = -5

    cactusRandom = Math.round(random(1, 6));

    switch (cactusRandom) {
      case 1: cactus.addImage(cactus1);
        break;
      case 2: cactus.addImage(cactus2);
        break;
      case 3: cactus.addImage(cactus3);
        break;
      case 4: cactus.addImage(cactus4);
        break;
      case 5: cactus.addImage(cactus5);
        break;
      case 6: cactus.addImage(cactus6);
        break;

      default: break;
    }

    cactus.scale = 0.6

    cactus.lifetime = 150;
    cactusgrupo.add(cactus)
  }
}

function reset(){
trex.addAnimation("running", trex_running)
}
