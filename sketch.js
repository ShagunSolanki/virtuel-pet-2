//Create variables here

var dog, HappyDog;
var database;
var foodS;
var foodStock;
// variables for feed the dog and add the food 
var feed,addfood;
var fedTime,lastFed;
var foodObj;

function preload()
{
	//load images here

dogImage = loadImage("dogimg.png")
happydogImage = loadImage("dogimg1.png")
//milkImage = loadImage("food.png")

}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database()

  dog = createSprite(250,300,20,20)
  dog.addImage(dogImage);
  dog.scale = 0.2

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  // create 2 button for feed the dag and add the food 

  feed = createButton("feed");
  addfood = createButton("addfood")
  feed.mousePressed(feeddog)
  addfood.mousePressed(add_food)
  feed.position(500,50)
  addfood.position(600,50)
}


function draw() {  
background(46,139,87)

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
}



function readStock(data){

foodS = data.val()
}

/*function write stock
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
x=x-1
  }
  database.ref('/').update({
    food:x 

  })

  

}*/

function add_food(){

foodS++;
database.ref('/').update({
food:foodS



})
}


function feeddog(){



  dog.addImage(happydogImage);
foodObj.updatefoodStock(foodObj.getfoodStock()-1);

database.ref('/').update({

food : foodObj.getfoodStock(),
feedtime : hour()

})
}













