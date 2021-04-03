var database;
var form, player, game, playerCount;  
var gameState = 0;
var allPlayers;
var car1, car2, car3, car4, cars;
var car1IMG, car2IMG, car3IMG, car4IMG, track, ground;

function preload(){
  car1IMG = loadImage("images/car1.png");
  car2IMG = loadImage("images/car2.png");
  car3IMG = loadImage("images/car3.png");
  car4IMG = loadImage("images/car4.png");
  track = loadImage("images/track.jpg");
  ground = loadImage("images/ground.png");

}

function setup(){
  database = firebase.database();
  createCanvas(displayWidth, displayHeight);

  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  //background("yellow")
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    game.play();
  }
}

