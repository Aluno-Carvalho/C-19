var boy, boyRunning, boyJumping, boyCollided, boyDead;
var ground;
var canvas;
var backgroundPhoto, backgroundImage;
var zombie, zombieRunning;
var coin, coinImage, coinSound, coinGroup;
var spike, spikeImg1, spikeImg2, spikeImg3, spikeImg4, spikeGroup;
var score = 0;
var Play = 1;
var End = 0;
var Restart = -1;
var gameState = Play;
var sorteio;
var defeatSound;
var jumpSound;

function preload(){
boyRunning = loadAnimation("Run (1).png","Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png", "Run (9).png", "Run (10).png", "Run (11).png", "Run (12).png", "Run (13).png", "Run (14).png", "Run (15).png");
boyJumping = loadAnimation("Jump (1).png", "Jump (2).png", "Jump (3).png", "Jump (4).png", "Jump (5).png", "Jump (6).png", "Jump (7).png", "Jump (8).png", "Jump (9).png", "Jump (10).png", "Jump (11).png", "Jump (12).png", "Jump (13).png", "Jump (14).png", "Jump (15).png");
boyCollided = loadAnimation("Dead (1).png", "Dead (2).png", "Dead (3).png", "Dead (4).png", "Dead (5).png", "Dead (6).png", "Dead (7).png", "Dead (8).png", "Dead (9).png", "Dead (10).png", "Dead (11).png", "Dead (12).png", "Dead (13).png", "Dead (14).png", "Dead (15).png");
zombieRunning = loadAnimation("Zombie_1_Running0001.png", "Zombie_1_Running0002.png", "Zombie_1_Running0003.png", "Zombie_1_Running0004.png", "Zombie_1_Running0005.png", "Zombie_1_Running0006.png", "Zombie_1_Running0007.png", "Zombie_1_Running0008.png", "Zombie_1_Running0009.png", "Zombie_1_Running0010.png", "Zombie_1_Running0011.png", "Zombie_1_Running0012.png");

coinImage = loadImage("coin.png");

coinSound = loadSound("Coin.mp3");
defeatSound = loadSound("Defeat.mp3");
jumpSound = loadSound("JumpSound.mp3");

backgroundImage = loadImage("3_game_background.jpg");

spikeImg1 = loadImage("spike A.png");
spikeImg2 = loadImage("spike B.png");
spikeImg3 = loadImage("spike C.png");
spikeImg4 = loadImage("spike D.png");
boyDead = loadImage("Dead (15).png");
}

function setup() {
 canvas = createCanvas(600 , 400);

 ground = createSprite(200,390,800,10);
 ground.visible = false;

 score = 0;
 score.depth = 1;

 boy = createSprite(300,350,20,50);
 boy.addAnimation("running" ,boyRunning);
 boy.addAnimation("jumping" ,boyJumping);
 boy.addAnimation("collided" ,boyCollided);
 boy.scale = 0.2;
 boy.setCollider("rectangle", -150, 0, boy.height - 300, boy.width - 150);
 boy.depth = 2;
   
 zombie = createSprite(80,390,20,50);
 zombie.addAnimation("running zombie" ,zombieRunning);
 zombie.scale = 1;
 zombie.depth = 2;

 backgroundPhoto = createSprite(400,100,400,400);
 backgroundPhoto.addImage("background", backgroundImage);
 backgroundPhoto.scale = 1;
 backgroundPhoto.velocityX = -5;
 backgroundPhoto.visible = true;
 backgroundPhoto.depth = 0;

 coinGroup = new Group();
 spikeGroup = new Group();
}

function draw() {
 
    if (gameState === Play) {
        backgroundPhoto.visible = true;
        boy.visible = true;
        boy.x = 300;
        zombie.visible = true;
        backgroundPhoto.velocityX = -5;

        if (keyDown("space") && boy.y > 330) { 
            boy.velocityY = -12;
            boy.changeAnimation("jumping",boyJumping);
          }

        gravidade()
        spawnCoin()
        spawnSpike()

        if (boy.isTouching(ground)){

            boy.changeAnimation("running", boyRunning);
        }

        if (backgroundPhoto.x < -1){

            backgroundPhoto.x = backgroundPhoto.width/2;
        }

        if (boy.isTouching(spikeGroup)){

            gameState = End;
            defeatSound.play();
            boy.visible = false;
        }

        if (boy.isTouching(coinGroup)){
            score = score + 35;
            coinSound.play();
            coinGroup.destroyEach();
        }

        if (zombie.isTouching(spikeGroup)){
            zombie.velocityY = -12;
        }
    }

    if (gameState === End){

        backgroundPhoto.velocityX = 0;
        coinGroup.destroyEach();
        spikeGroup.destroyEach();
        backgroundPhoto.visible = false;
        gameState = Restart
        zombie.visible = false;
    }


    if(gameState === Restart && keyDown("r")){
      score = 0;
      gameState = Play;
    }

    boy.collide(ground);
    zombie.collide(ground);

    textSize(50);
    strokeWeight(2);
    text.depth = 3;
    text("Pontuação: " + score,140,50);

    textSize(30);
    strokeWeight(2);
    text.depth = 3;
    text("Pressione (R) para recomeçar",110,90);

    drawSprites();
   }

function gravidade(){
    boy.velocityY += 0.5;
    zombie.velocityY += 0.5;
}

function spawnCoin(){
 
    if (frameCount % 110 === 0) {
       coin = createSprite(600,390,30,30);
       coin. addAnimation("coin",coinImage);
       coin.velocityX = -5;
       coin.y= Math.round(350,250);
       coin.scale = 0.05;
       coin.lifetime = 310;
       coin.depth = 1;
       coinGroup.add(coin);
    }
   }

   function spawnSpike() {

    if (frameCount % 150 === 0){
        
    spike = createSprite(600,350,30,30);
       
        spike.velocityX = -5;
        sorteio = Math.round(random(1,4));
         switch (sorteio) {
             case 1: spike.addAnimation("spike1",spikeImg1);    
                 break;
            case 2: spike.addAnimation("spike2",spikeImg2); 
                  break;
            case 3: spike.addAnimation("spike3",spikeImg3); 
                   break;
            case 4: spike.addAnimation("spike4",spikeImg4); 
                   break;
         }

        spike.scale= (0.3);
        spike.depth = 1;
        spike.lifetime = 310;
        spike.debug = false;
        spikeGroup.add(spike);
     }
    }
    