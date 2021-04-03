class Player{
    constructor(){
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = null;
    }
        
    getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance: this.distance,

    });
  }
  static getPlayerInfo(){
    var info = database.ref('players');
    info.on("value",(data)=>{
    allPlayers = data.val();  
    }) 
  }
    getRank(){
      var rankRef = database.ref('rank');
      rankRef.on("value",(data)=>{
        this.rank = data.val();
      })
    }

     updateRank(rank){
      database.ref('/').update({
        rank: rank
      });
    }
    
}
