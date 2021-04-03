class Game{
    constructor(){
        
    }

    async start(){
       if(gameState === 0){
        //background("yellow");
        player = new Player();
        var playerCountRef = await database.ref("playerCount").once("value");
        if(playerCountRef.exists){
            playerCount = playerCountRef.val();
            player.getCount();
        }
           form = new Form();
           form.display();
           
       }
       car1= createSprite(300,700);
       car1.addImage(car1IMG);
       
       car2= createSprite(400,700);
       car2.addImage(car2IMG);
       
       car3= createSprite(600,700);
       car3.addImage(car3IMG);
       
       car4= createSprite(800,700);
       car4.addImage(car4IMG);

       cars = [car1, car2, car3, car4];

    }
    getState(){
        var gameStateRef= database.ref("gameState");       
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })     
    }
    update(state){
        database.ref("/").update({gameState: state})
    }

    play(){
        form.hide();  
        //text("Game Starts",900,400);
        Player.getPlayerInfo();
        player.getRank();
        if(allPlayers !== undefined){
            background("yellow");
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
           //index of the array
            var index = 0;
            //var displayPosition = 130;
            // x and y position of the cars
            var x = 230;
            var y;
            
            for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index+1;
                //position the cars little away from each other in x direction
                x = x + 220;
                // use data from the database to display cars in y position
                    y = displayHeight-allPlayers[plr].distance;
                    cars[index-1].x = x;
                    cars[index-1].y = y;

                if(index === player.index){
                    //cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                    fill("red");
                    ellipse(x, y, 60,60);

                    //fill("red");
                }
                   
                /*else{
                    fill("black");
                }*/
                //displayPosition = displayPosition+ 20;
                //textSize(15);
                //text(allPlayers[plr].name+ ":"+ allPlayers[plr].distance, 150, displayPosition);
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance = player.distance + 50;
            player.update();
        }
        //console.log(player.distance);
        if(player.distance> 4100){
            gameState= 2;
            player.rank += 1;
            player.updateRank(player.rank);
           // console.log(player.rank);
           textSize(50);
           fill("red");
            text("Your Rank Is" + player.rank, displayWidth/2, y - 150);
        }
     drawSprites();                 
    }
}