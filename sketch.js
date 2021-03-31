//to create the sprites objects
var dustbinObj;
var groundObject;
var ball;	
var engine, world;
var boy;
var backgroundImg;
var score = 0;
var turns = 0;
var gameState = "start";
//var bg = "bg1.png";

//physics engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

//to preload the images
function preload(){

  backgroundImg = loadImage("bg1.png");

	boy = loadImage("boy.png");

  //getBackgroundImg();

}

function setup() {

	//to create the canvas
	createCanvas(1600, 700);

	//rectMode
	rectMode(CENTER);

	//to create the engine and world
	engine = Engine.create();
	world = engine.world;

	//to create the game objects
	groundObject = new ground(width/2, 690, width, 20);

	hoop = new Hoop(1200, 670);

	ball = new basketBall(0, 0, 35);

	chain = new Chain(ball.body, {x : 545, y : 460});

	//to run the engine
	Engine.run(engine);
  
}

function draw() {

  //to give the background
  //if(backgroundImg){

  background(backgroundImg);

  //}

  //to update the engine
  Engine.update(engine);

  //rectMode	
  rectMode(CENTER);

  //to display the game objects 
  groundObject.display();

  image(boy, 500, 375, 250, 400);
  
  hoop.display();

  ball.display();

  chain.display();

  //to draw the sprites
  drawSprites();

  //to display the text
  textSize(30);
  strokeWeight(4);
  stroke("black");
  fill("brown");
  text("Score : " + score, 20, 50);
  text("Turns Done : " + turns, 20, 90);
  text("Drag the ball, aiming it towards the goal to score a point.", 20, 130);
  text("Press the 'SPACE KEY' to reset the ball's position.", 20, 170);

  //to increase the score
  if(ball.body.position.x > 1110 && ball.body.position.x <1175 && ball.body.position.y > 240 && ball.body.position.y < 325 ){
 
    score = score+1;

  }

  //to end the game
  if(turns == 5){

    gameState = "end";

    textSize(50);
    strokeWeight(8);
    stroke("black");
    fill("blue");
    text("Game Over", 700, 300);
    text("Press 'BACKSPACE' to restart.", 500, 370);

  }

  //to restart the game
  if(gameState == "end" && keyCode === 8){

    gameState = "start";
    score = 0;
    turns = 0;

  }

}


function mouseDragged(){

	Matter.Body.setPosition(ball.body, {x : mouseX, y : mouseY});
  
}

function mouseReleased(){

	chain.fly();
  turns = turns+1;

}

function keyPressed(){

	if(keyCode === 32){

		this.chain.attach(ball.body);
		Matter.Body.setPosition(ball.body, {x : 545, y : 460});

	}

}

  //async function getBackgroundImg(){
    //var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //var responseJSON = await response.json();

    //var datetime = responseJSON.datetime;
    //var hour = datetime.slice(11,13);
    
    //if(hour>=0600 && hour<=1900){
      //  bg = "sprites/bg1.png";
    //}
    //else{
      //  bg = "sprites/bg2.jpg";
    //}

    //backgroundImg = loadImage(bg);
    //console.log(backgroundImg);
  //}