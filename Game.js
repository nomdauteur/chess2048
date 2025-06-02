
theField = new FieldOfChess();

var xDown = null;                                                        
var yDown = null;


function load() {
window.dataLoadFinished=0;
lastAdShown = new Date();


document.addEventListener('keydown', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    theField.step(event.key);
});
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

    window.requestAnimationFrame(function(){theField.draw()});

    



  

YaGames.init()

    .then((ysdk) => {

        
        document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
        document.getElementById("newGame").textContent=setText("Новая игра","New game");
    document.getElementById("score").textContent=setText("Счет: ","Score: ");
        ysdk.features.LoadingAPI?.ready();


ysdk.getPlayer().then(_player => {
        window.player = _player;
        window.player.getData().then((data) => {
          console.log("Loaded previous data");
          console.log(data);
          if (data != null) {
            window.loadedField=data.fieldSave;
            window.loadedScore=data.score;
            console.log("field is");
            console.log(window.loadedField);
            console.log("Score is "+window.loadedScore);

          }
          window.dataLoadFinished=1;
          theField.init_field();
        
    });
    }).catch(err => {
        // Ошибка при инициализации объекта Player.
    });

         ysdk.getLeaderboards()
  .then(lb => {
    // С использованием всех значений по умолчанию.
    lb.getLeaderboardEntries('chess2048', { quantityTop: 5, includeUser: true, quantityAround: 1  })
      .then(res => {console.log(res); window.leaderboard=res;});

      lb.getLeaderboardPlayerEntry('chess2048')
  .then(res => {console.log(res);
   window.prev_score=res.score;})
  .catch(err => {
    if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
      window.prev_score=0;}
    });
  });
  
 
        while (document.getElementById("lang").textContent == "Language") {
            console.log("Language loading");
            sleep(20);
        }

        
    



    })

    .catch(console.error);



 
}

function newGame() {
  document.body.removeChild(document.getElementById("banner"));
  while (document.getElementById("game").firstChild) {
            document.getElementById("game").removeChild(document.getElementById("game").lastChild);
        }

    while (document.getElementById("writings_all").firstChild) {
            document.getElementById("writings_all").removeChild(document.getElementById("writings_all").lastChild);
        }

    while (document.getElementById("writings1").firstChild) {
            document.getElementById("writings1").removeChild(document.getElementById("writings1").lastChild);
        }

    while (document.getElementById("writings2").firstChild) {
            document.getElementById("writings2").removeChild(document.getElementById("writings2").lastChild);
        }

    while (document.getElementById("writings3").firstChild) {
            document.getElementById("writings3").removeChild(document.getElementById("writings3").lastChild);
        }


         YaGames.init()

    .then((ysdk) => {

          ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {
           theField.init_field();

        },

        onError: function(error) {

          console.log(error);

        }

    }

})});



    

}


  function drawLeaderboard() {
  ll = document.getElementById("leaderboard");
  ll.style.display="table";



  while (ll.firstChild) {
            ll.removeChild(ll.lastChild);
        }

        var h = document.createElement("h1");
        h.textContent=setText("Лучшие шахматисты","Chess masters");
        h.style.textAlign="left";
        h.style.paddingLeft=vmin(2);

        ll.appendChild(h);


  for (i = 0; i < window.leaderboard.entries.length;i++) {
    var d = document.createElement("p");
    d.style.display="table-row";
var d1=document.createElement("div");
d1.style.display="table-cell";
d1.style.textAlign="left";
d1.style.paddingLeft=vmin(2);

var d2=document.createElement("div");
d2.style.display="table-cell";
d2.style.textAlign="right";
d2.style.paddingRight=vmin(2);

d1.textContent=window.leaderboard.entries[i].rank+". "+window.leaderboard.entries[i].player.publicName;

d2.textContent=window.leaderboard.entries[i].score;
d.appendChild(d1);
d.appendChild(d2);

    ll.appendChild(d);
  }
  
}


