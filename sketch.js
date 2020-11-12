var bananaImage, obstacleImage, obstaclegroup, background, score, foodgroup;

function preload() {
  backImage = loadImage("jungle.jpg")
  player_running =
    loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png")

}

function setup() {
  foodgroup = new Group()
  obstaclegroup = new Group()
  backgr = createSprite(0, 0, 800, 400)
  backgr.addImage(backImage)
  backgr.scale = 1.5
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4
  createCanvas(800, 400);
  monkey = createSprite(100, 340, 20, 50)
  monkey.addAnimation("running", player_running)
  monkey.scale = 0.1

  ground = createSprite(400, 350, 800.10)
  ground.velocityX = -4
  ground.x = ground.width / 2;
  ground.visible = false;
  score=0
}

function draw() {
  background(220);
  //reset ground
  if (backgr.x<0) {
    backgr.x=backgr.width/2
    ground.x=ground.width/2
  }
  // monkey jump
  if (keyDown("space")) {
    monkey.velocityY= -12
  }
  monkey.velocityY= monkey.velocityY+0.8
  // call the functions
  spawnFood ()
  spawnObstacles ()
  
  if(monkey.isTouching(foodgroup)) {
    score=score+2
    foodgroup.destroyEach ()
    if (score%10==0 && score<=30) {
      monkey.scale=monkey.scale+0.1
    }
  }
  if (monkey.isTouching(obstaclegroup)) {
    monkey.scale=0.1
  }
  monkey.collide(ground)
  drawSprites()
  
  stroke("white")
  textSize (20)
  fill ("white")
 text ("score="+score,500,50)

}


function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    banana.depth = banana.depth + 1;
    //add each banana to the group
    foodgroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800, 300, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle 
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group 
    obstaclegroup.add(obstacle);
  }
}