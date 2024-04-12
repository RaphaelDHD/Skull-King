const enemy = document.getElementById("enemy");
const playing = document.getElementById("playing");
const player = document.getElementById("player");
const pariDiv = document.getElementById("pariDiv");
const tourSpan = document.querySelector(".nomTour");

/**
 * @description Objet joueur
 * username: nom du joueur
 * idJoueur: idJoueur dans la partie
 * cartes: main du joueur
 * roomId: id de la room
 * socketId: id du Socket
 * tour: indique si c'est au tour du joueur de joué
 * nbTour: nombre de tour de la partie
 * nbPlayedCard: nombre de carte joué
 * tabCartesJouées: tableau des cartes joué avec l'id joueur associé
 * bestCardIndex: index de la carte gagnante actuellement
 * nbPlis: nombre de plis fait lors de cette manche
 * nbPlisPari: nombre de plis parié lors de cette manche
 * score: score du joueur
 * pret: indique si le joueur est pret
 * partiLancer: indique si la partie est lancé
 *
 */
let joueur = {
  username: null, // nom du joueur
  idJoueur: null, // idJoueur dans la partie
  cartes: [], // main du joueur
  roomId: null, // id de la room
  socketId: null, // id du Socket
  tour: false, // indique si c'est au tour du joueur de joué
  nbTour: 1,
  nbPlayedCard: 0, // nombre de carte joué
  tabCartesJouées: [], // tableau des cartes joué avec l'id joueur associé
  bestCardIndex: null, //index de la carte gagnante actuellement
  nbPlis: 0, // nombre de plis fait lors de cette manche
  nbPlisPari: null, // nombre de plis parié lors de cette manche
  score: 0, // score du joueur
  pret: false,
  partiLancer: false,
};

const socket = io();

/**
 * Distribue les cartes aux joueurs et lance la partie pour chacun des joueurs
 * @param {Array} cards - tableau des cartes du joueur
 * @param {Array} tabJoueur - tableau des joueurs de la partie
 */
socket.on("distrib", (cards, tabJoueur) => {
  switch (tabJoueur.length) {
    case 2:
      document.getElementById("playing0").style.left = "42%";
      document.getElementById("playing1").style.left = "51%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "46.5%";
      break;
    case 3:
      document.getElementById("playing0").style.left = "37%";
      document.getElementById("playing1").style.left = "46%";
      document.getElementById("playing2").style.left = "55%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      break;
    case 4:
      document.getElementById("playing0").style.left = "33%";
      document.getElementById("playing1").style.left = "42%";
      document.getElementById("playing2").style.left = "51%";
      document.getElementById("playing3").style.left = "60%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      break;
    case 5:
      document.getElementById("playing0").style.left = "28%";
      document.getElementById("playing1").style.left = "37%";
      document.getElementById("playing2").style.left = "46%";
      document.getElementById("playing3").style.left = "55%";
      document.getElementById("playing4").style.left = "64%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "40%";
      document.querySelector(".Backcards4").style.left = "55%";
      break;
    case 6:
      document.getElementById("playing0").style.left = "24%";
      document.getElementById("playing1").style.left = "33%";
      document.getElementById("playing2").style.left = "42%";
      document.getElementById("playing3").style.left = "51%";
      document.getElementById("playing4").style.left = "60%";
      document.getElementById("playing5").style.left = "69%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards5").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "10%";
      document.querySelector(".Backcards2").style.left = "85%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      document.querySelector(".Backcards4").style.left = "10%";
      document.querySelector(".Backcards4").style.top = "40%";
      document.querySelector(".Backcards5").style.left = "85%";
      document.querySelector(".Backcards5").style.top = "40%";
      break;
  }

  joueur.partiLancer = true;
  document.getElementById("boutonPret").classList.add("hide");
  document.getElementById("message").classList.add("hide");
  joueur.cartes = cards;
  for (i = 0; i < joueur.cartes.length; i++) {
    $card = joueur.cartes[i];
    $html =
      '<img id="card' +
      i +
      '" class="image backcard imgPlayer  playercard' +
      i +
      '" src="/' +
      joueur.cartes[i] +
      '.png">';
  }
  player.innerHTML = $html;
  $html = "";
  pariDiv.innerHTML = "";
  for (i = 0; i <= joueur.cartes.length; i++) {
    $card = joueur.cartes[i];
    $html += '<img class="cardPari parisButton" src="/Pari' + i + '.png">';
  }
  pariDiv.innerHTML += $html;

  // unhide button pour parier et add event listener
  $buttonPari = document.getElementById("btnLetsPari");
  $buttonPari.classList.remove("hide");

  document.getElementById("btnLetsPari").addEventListener("click", () => {
    pariDiv.classList.remove("hide");
    $buttonPari.classList.add("hide");
    document.querySelector(".plateau").classList.add("blur");
  });

  // add event listener sur les paris
  $paris = document.getElementsByClassName("parisButton");

  for (i = 0; i < $paris.length; i++) {
    let x = i;
    $paris[i].addEventListener("click", ({ target }) => {
      parisPris(x);
      document.querySelector(".plateau").classList.remove("blur");
    });
  }

  for (i = 0; i < tabJoueur.length; i++) {
    document.querySelector("#enemyName" + i).innerHTML = tabJoueur[i].username;
  }

  for (i = 0; i < tabJoueur.length; i++) {
    document.getElementById("enemyName" + i).classList.remove("hide");
    document.getElementById("enemyPlis" + i).classList.remove("hide");
    document.getElementById("enemyParis" + i).classList.remove("hide");
    document.getElementById("enemyScore" + i).classList.remove("hide");
  }

  document.getElementById("indication").classList.add("hide");
  document.getElementById("message").classList.add("hide");
  document.getElementById("playerName").classList.remove("hide");
  document.getElementById("playerPlis").classList.remove("hide");
  document.getElementById("playerParis").classList.remove("hide");
  document.getElementById("playerScore").classList.remove("hide");
  document.querySelector(".Polygon_2").classList.remove("hide");
  document.querySelector("#tour").classList.remove("hide");
  document.querySelector(".options").classList.remove("hide");
  document.querySelector(".HIG").classList.remove("hide");
  document.querySelector("#scoreButton").classList.remove("hide");
  document.querySelector("#plisButton").classList.remove("hide");

  for (i = 0; i < tabJoueur.lenght; i++) {
    document.querySelector("#playing" + i).classList.remove("hide");
  }

  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].tour) {
      tourSpan.innerHTML = tabJoueur[i].username;
    }
  }

  for (j = 0; j < tabJoueur.length; j++) {
    document.querySelector("#nameEnemyScore" + j).innerHTML =
      tabJoueur[j].username;
    document.querySelector("#scoreEnemy" + j).innerHTML = 0;
    document.querySelector("#nameEnemyPlis" + j).innerHTML =
      tabJoueur[j].username;
    document.querySelector("#plisEnemy" + j).innerHTML = 0;
    document.querySelector("#parisEnemy" + j).innerHTML = 0;
  }

  for (i = 0; i < tabJoueur.length; i++) {
    document.querySelector("#playing" + i).classList.remove("hide");
  }
});

/**
 * Fonction qui attribue toutes les données du joueur sur réception du serveur
 * @param {object} player - le joueur qui rejoins la partie
 * @param {array} tabJoueur - tableau contenant tous les joueurs de la partie
 */
socket.on("room joined", (player, tabJoueur) => {
  joueur = player;
  let nb = 0;
  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].pret === true) {
      nb++;
    }
  }
  document.getElementById("indication").classList.remove("hide");
  document.getElementById("indication").innerHTML =
    "Attente d'avoir tous les joueurs de la partie prêts ou que 6 joueurs se connectent";
  document.getElementById("message").classList.remove("hide");
  document.getElementById("message").innerHTML =
    nb + " / " + tabJoueur.length + " joueur(s) prêt(s)";
  document.getElementById("boutonPret").classList.remove("hide");
  document.getElementById("boutonPret").addEventListener("click", () => {
    joueur.pret = true;
    socket.emit("player_ready", joueur);
    document.getElementById("boutonPret").classList.add("hide");
  });

  if (tabJoueur.length === 1) {
    document.getElementById("indication").innerHTML +=
      "<br>Vous êtes le seul joueur connecté, attendez que d'autres joueurs se connectent";
  }
});

/**
 * Fonction qui affiche le nombre de joueur prêt
 * @param {array} tabJoueur - tableau contenant tous les joueurs de la partie
 */
socket.on("other_ready", (tabJoueur) => {
  let nb = 0;
  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].pret === true) {
      nb++;
    }
  }
  document.getElementById("message").classList.remove("hide");
  document.getElementById("message").innerHTML =
    nb + " / " + tabJoueur.length + " joueur(s) prêt(s)";
});

/**
 * Fonction qui gère la fin d'un plis dans la partie
 * @param {array} tabJoueur - tableau contenant tous les joueurs de la partie
 */
socket.on("endPlis", (tabJoueur) => {
  document.querySelector("#pariDiv").classList.add("hide");
  joueur.nbPlayedCard = 0;
  $html = "";
  for (i = 0; i < tabJoueur.length; i++) {
    $html += '<img id="playing' + i + '" src="/Case.png">';
  }
  playing.innerHTML = $html;
  joueur.tour = false;
  tourSpan.innerHTML =
    tabJoueur[joueur.tabCartesJouées[joueur.bestCardIndex].id - 1].username;
  if (joueur.idJoueur === joueur.tabCartesJouées[joueur.bestCardIndex].id) {
    joueur.nbPlis++;
    joueur.tour = true;
  }

  //tabJoueur[joueur.tabCartesJouées[joueur.bestCardIndex].id - 1].nbPlis++;
  for (i = 0; i < tabJoueur.length; i++) {
    document.querySelector("#plisEnemy" + i).innerHTML = tabJoueur[i].nbPlis;
  }
  //document.getElementById('enemy').innerHTML = 'Plis : ' + joueur.nbPlis;
  //document.querySelector('#plisEnemy' + (joueur.idJoueur)).innerHTML = joueur.nbPlis;
  /*for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].idJoueur === joueur.tabCartéesJoues[joueur.bestCardIndex].id) {
      document.querySelector('#plisEnemy' + i).innerHTML = joueur.nbPlis;
    }
  }
}
else {
  for (i = 0; i < tabJoueur.length; i++) {
      document.getElementById('enemyPlis' + i).innerHTML = 'Plis : ' + tabJoueur[i].nbPlis;
      document.querySelector('#plisEnemy' + i).innerHTML = tabJoueur[i].nbPlis;
    }
    //if (tabJoueur[i].idJoueur === joueur.tabCartesJouées[joueur.bestCardIndex].id) {
    //}*/

  $html = "";
  for (i = 0; i < joueur.cartes.length; i++) {
    $html +=
      '<img class="image backcard imgPlayer playercard' +
      i +
      '" id = "card' +
      i +
      '" src="/' +
      joueur.cartes[i] +
      '.png">';
  }
  player.innerHTML = $html;
  for (i = 0; i < joueur.cartes.length; i++) {
    $cartes = document.querySelector(".playercard" + i);
    let text = $cartes.src;
    let wait = text.substring(text.lastIndexOf("/") + 1, text.length);
    let $carteJouer = wait.substring(0, wait.lastIndexOf("."));
    $cartes.removeEventListener("click", playCard);
    let playCardFunction = function (e) {
      playCard($carteJouer, false);
    };
    $cartes.addEventListener("click", playCardFunction);
  }

  joueur.bestCardIndex = null;
  joueur.tabCartesJouées = [];
});

/**
 * Fonction qui gère la fin d'un tour dans la partie
 * @param {array} cards - tableau contenant toutes les nouvelles cartes du joueurs
 * @param {array} tabJoueur - tableau contenant tous les joueurs de la partie
 */
socket.on("endTour", (cards, tabJoueur) => {
  switch (tabJoueur.length) {
    case 2:
      document.getElementById("playing0").style.left = "42%";
      document.getElementById("playing1").style.left = "51%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "46.5%";
      break;
    case 3:
      document.getElementById("playing0").style.left = "37%";
      document.getElementById("playing1").style.left = "46%";
      document.getElementById("playing2").style.left = "55%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      break;
    case 4:
      document.getElementById("playing0").style.left = "33%";
      document.getElementById("playing1").style.left = "42%";
      document.getElementById("playing2").style.left = "51%";
      document.getElementById("playing3").style.left = "60%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      break;
    case 5:
      document.getElementById("playing0").style.left = "28%";
      document.getElementById("playing1").style.left = "37%";
      document.getElementById("playing2").style.left = "46%";
      document.getElementById("playing3").style.left = "55%";
      document.getElementById("playing4").style.left = "64%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "40%";
      document.querySelector(".Backcards4").style.left = "55%";
      break;
    case 6:
      document.getElementById("playing0").style.left = "24%";
      document.getElementById("playing1").style.left = "33%";
      document.getElementById("playing2").style.left = "42%";
      document.getElementById("playing3").style.left = "51%";
      document.getElementById("playing4").style.left = "60%";
      document.getElementById("playing5").style.left = "69%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards5").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "10%";
      document.querySelector(".Backcards2").style.left = "85%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      document.querySelector(".Backcards4").style.left = "10%";
      document.querySelector(".Backcards4").style.top = "40%";
      document.querySelector(".Backcards5").style.left = "85%";
      document.querySelector(".Backcards5").style.top = "40%";
      break;
  }

  joueur.cartes = cards;
  joueur.nbTour++;
  joueur.nbPlis = 0;
  joueur.nbPlisPari = 0;
  $html = "";
  joueur.tour = false;
  if (joueur.idJoueur === (joueur.nbTour % tabJoueur.length) + 1) {
    joueur.tour = true;
  }

  tourSpan.innerHTML = tabJoueur[joueur.nbTour % tabJoueur.length].username;

  for (i = 0; i < joueur.cartes.length; i++) {
    $card = joueur.cartes[i];
    $html +=
      '<img id = "card' +
      i +
      '" class="image backcard imgPlayer playercard' +
      i +
      '" src="/' +
      joueur.cartes[i] +
      '.png">';
  }
  player.innerHTML = $html;

  $html = "";
  for (i = 0; i <= joueur.cartes.length; i++) {
    $card = joueur.cartes[i];
    $html += '<img class="cardPari parisButton" src="/Pari' + i + '.png">';
  }
  pariDiv.innerHTML += $html;

  // unhide button pour parier et add event listener
  $buttonPari = document.getElementById("btnLetsPari");
  $buttonPari.classList.remove("hide");

  document.getElementById("btnLetsPari").addEventListener("click", () => {
    pariDiv.classList.remove("hide");
    $buttonPari.classList.add("hide");
    document.querySelector(".plateau").classList.add("blur");
  });

  // add event listener sur les paris
  $paris = document.getElementsByClassName("parisButton");
  for (i = 0; i < $paris.length; i++) {
    let x = i;
    $paris[i].addEventListener("click", ({ target }) => {
      parisPris(x);
      document.querySelector(".plateau").classList.remove("blur");
    });
  }
  document.getElementById("playerParis").innerHTML = "Paris : 0";
  document.getElementById("playerPlis").innerHTML = "Plis : 0";

  for (i = 0; i < tabJoueur.length; i++) {
    document.getElementById("enemyParis" + i).innerHTML = "Paris : 0";
    document.getElementById("enemyPlis" + i).innerHTML = "Plis : 0";
  }

  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].idJoueur === joueur.idJoueur) {
      joueur.score = tabJoueur[i].score;
      document.getElementById("playerScore").innerHTML =
        "Score : " + joueur.score;
      document.querySelector("#scoreEnemy" + i).innerHTML = joueur.score;

      document.getElementById("playerParis").innerHTML = "Paris : " + "0";
      document.querySelector("#parisEnemy" + i).innerHTML = 0;

      document.getElementById("playerPlis").innerHTML = "Plis : " + "0";
      document.querySelector("#plisEnemy" + i).innerHTML = "0";
    } else {
      document.getElementById("enemyScore" + i).innerHTML =
        "Score : " + tabJoueur[i].score;
      document.querySelector("#scoreEnemy" + i).innerHTML = tabJoueur[i].score;

      document.getElementById("enemyParis" + i).innerHTML = "Paris : " + "0";
      document.querySelector("#parisEnemy" + i).innerHTML = "0";

      document.getElementById("enemyPlis" + i).innerHTML = "Plis : " + "0";
      document.querySelector("#plisEnemy" + i).innerHTML = "0";
    }
  }
});

// fonction qui gère la réception d'une carte joué par un joueur
/**
 * Fonction qui gère la réception d'une carte joué par un joueur
 * @param {*} $card - la carte jouée
 * @param {object} receive - le joueur qui a jouée la carte
 * @param {boolean} tigr - true si la carte jouée provient d'une tigresse (Drapeau ou Sirène)
 * @param {array} tabJoueur - le tableau des joueurs
 */
socket.on("played", ($card, receive, tigr, tabJoueur) => {
  if (receive.idJoueur !== joueur.idJoueur) {
    let carteJouée = { carte: $card, id: receive.idJoueur };
    joueur.tabCartesJouées[joueur.nbPlayedCard] = carteJouée;

    if (tigr) {
      if ($card === "D") {
        let ligne = document.getElementById("playing" + joueur.nbPlayedCard);
        ligne.classList.add("image");
        ligne.src = "/TD.png";
      } else {
        let ligne = document.getElementById("playing" + joueur.nbPlayedCard);
        ligne.classList.add("image");
        ligne.src = "/TP.png";
      }
    } else {
      let ligne = document.getElementById("playing" + joueur.nbPlayedCard);
      ligne.classList.add("image");
      ligne.src = "/" + $card + ".png";
    }

    if (
      joueur.idJoueur ===
      (joueur.tabCartesJouées[joueur.nbPlayedCard].id % tabJoueur.length) + 1
    ) {
      joueur.tour = true;
    }

    $html = "";
    for (i = 0; i < joueur.cartes.length; i++) {
      $html +=
        '<img class="image backcard imgPlayer playercard' +
        i +
        '" id = "card' +
        i +
        '" src="/' +
        joueur.cartes[i] +
        '.png">';
    }
    player.innerHTML = $html;

    let typeCardFirst = joueur.tabCartesJouées[0].carte.substring(0, 1);
    if (
      typeCardFirst === "R" ||
      typeCardFirst === "J" ||
      typeCardFirst === "B" ||
      typeCardFirst === "N"
    ) {
      let bool = false;
      for (i = 0; i < joueur.cartes.length; i++) {
        let typeCard = joueur.cartes[i].substring(0, 1);
        if (typeCard === typeCardFirst) {
          bool = true;
        }
      }

      for (i = 0; i < joueur.cartes.length; i++) {
        $cartes = document.querySelector(".playercard" + i);
        let text = $cartes.src;
        let wait = text.substring(text.lastIndexOf("/") + 1, text.length);
        let $carteJouer = wait.substring(0, wait.lastIndexOf("."));
        $cartes.removeEventListener("click", playCard);

        if (bool) {
          let typeCard = joueur.cartes[i].substring(0, 1);
          switch (typeCard) {
            case "R":
            case "J":
            case "B":
            case "N":
              if (typeCard !== typeCardFirst) {
                document.querySelector(".playercard" + i).classList.add("BaW");
              } else {
                $cartes.addEventListener("click", ({ target }) => {
                  playCard($carteJouer, false);
                });
              }
              break;
            default:
              $cartes.addEventListener("click", ({ target }) => {
                playCard($carteJouer, false);
              });
              break;
          }
        } else {
          let playCardFunction = function (e) {
            playCard($carteJouer, false);
          };
          $cartes.addEventListener("click", playCardFunction);
        }
      }
    } else {
      for (i = 0; i < joueur.cartes.length; i++) {
        $cartes = document.querySelector(".playercard" + i);
        let text = $cartes.src;
        let wait = text.substring(text.lastIndexOf("/") + 1, text.length);
        let $carteJouer = wait.substring(0, wait.lastIndexOf("."));
        $cartes.removeEventListener("click", playCard);
        let playCardFunction = function (e) {
          playCard($carteJouer, false);
        };
        $cartes.addEventListener("click", playCardFunction);
      }
    }

    joueur.nbPlayedCard++;
  }
  joueur.bestCardIndex = receive.bestCardIndex;
  tourSpan.innerHTML = tabJoueur[receive.idJoueur % tabJoueur.length].username;

  switch (tabJoueur.length) {
    case 2:
      document.getElementById("playing0").style.left = "42%";
      document.getElementById("playing1").style.left = "51%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "46.5%";
      break;
    case 3:
      document.getElementById("playing0").style.left = "37%";
      document.getElementById("playing1").style.left = "46%";
      document.getElementById("playing2").style.left = "55%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      break;
    case 4:
      document.getElementById("playing0").style.left = "33%";
      document.getElementById("playing1").style.left = "42%";
      document.getElementById("playing2").style.left = "51%";
      document.getElementById("playing3").style.left = "60%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      break;
    case 5:
      document.getElementById("playing0").style.left = "28%";
      document.getElementById("playing1").style.left = "37%";
      document.getElementById("playing2").style.left = "46%";
      document.getElementById("playing3").style.left = "55%";
      document.getElementById("playing4").style.left = "64%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "40%";
      document.querySelector(".Backcards4").style.left = "55%";
      break;
    case 6:
      document.getElementById("playing0").style.left = "24%";
      document.getElementById("playing1").style.left = "33%";
      document.getElementById("playing2").style.left = "42%";
      document.getElementById("playing3").style.left = "51%";
      document.getElementById("playing4").style.left = "60%";
      document.getElementById("playing5").style.left = "69%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards5").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "10%";
      document.querySelector(".Backcards2").style.left = "85%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      document.querySelector(".Backcards4").style.left = "10%";
      document.querySelector(".Backcards4").style.top = "40%";
      document.querySelector(".Backcards5").style.left = "85%";
      document.querySelector(".Backcards5").style.top = "40%";
      break;
    default:
      document.querySelector(".Backcards1").classList.add("hide");
      document.querySelector(".Backcards2").classList.add("hide");
      document.querySelector(".Backcards3").classList.add("hide");
      document.querySelector(".Backcards4").classList.add("hide");
      document.querySelector(".Backcards5").classList.add("hide");
      break;
  }

  for (i = 0; i < tabJoueur.length - 1; i++) {
    console.log(tabJoueur[i].cartes.length);
    if (
      tabJoueur[i].cartes.length == 0 &&
      joueur.idJoueur != tabJoueur[i].idJoueur
    ) {
      console.log("plus de cartes " + i);
      document.querySelector(".Backcards" + (i + 1)).classList.add("hide");
    }
  }
});

/**
 * Fonction qui gère le lancement d'un tour
 * @param {array} tabJoueur - Tableau des joueurs de la partie
 */
socket.on("roundLaunch", (tabJoueur) => {
  // add event listener sur les cartes
  for (i = 0; i < joueur.cartes.length; i++) {
    $card = document.querySelector(".playercard" + i);
    let text = $card.src;
    let wait = text.substring(text.lastIndexOf("/") + 1, text.length);
    let $carteJouer = wait.substring(0, wait.lastIndexOf("."));
    $card.removeEventListener("click", playCard);
    let playCardFunction = function (e) {
      playCard($carteJouer, false);
    };
    $card.addEventListener("click", playCardFunction);
  }
  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].idJoueur === joueur.idJoueur) {
      document.getElementById("playerParis").innerHTML =
        "Paris : " + joueur.nbPlisPari;
      document.querySelector("#parisEnemy" + i).innerHTML = joueur.nbPlisPari;
    } else {
      document.getElementById("enemyParis" + i).innerHTML =
        "Paris : " + tabJoueur[i].nbPlisPari;
      document.querySelector("#parisEnemy" + i).innerHTML =
        tabJoueur[i].nbPlisPari;
    }
  }

  switch (tabJoueur.length) {
    case 2:
      document.getElementById("playing0").style.left = "42%";
      document.getElementById("playing1").style.left = "51%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "46.5%";
      break;
    case 3:
      document.getElementById("playing0").style.left = "37%";
      document.getElementById("playing1").style.left = "46%";
      document.getElementById("playing2").style.left = "55%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      break;
    case 4:
      document.getElementById("playing0").style.left = "33%";
      document.getElementById("playing1").style.left = "42%";
      document.getElementById("playing2").style.left = "51%";
      document.getElementById("playing3").style.left = "60%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      break;
    case 5:
      document.getElementById("playing0").style.left = "28%";
      document.getElementById("playing1").style.left = "37%";
      document.getElementById("playing2").style.left = "46%";
      document.getElementById("playing3").style.left = "55%";
      document.getElementById("playing4").style.left = "64%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "20%";
      document.querySelector(".Backcards2").style.left = "75%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "40%";
      document.querySelector(".Backcards4").style.left = "55%";
      break;
    case 6:
      document.getElementById("playing0").style.left = "24%";
      document.getElementById("playing1").style.left = "33%";
      document.getElementById("playing2").style.left = "42%";
      document.getElementById("playing3").style.left = "51%";
      document.getElementById("playing4").style.left = "60%";
      document.getElementById("playing5").style.left = "69%";
      document.querySelector(".Backcards1").classList.remove("hide");
      document.querySelector(".Backcards2").classList.remove("hide");
      document.querySelector(".Backcards3").classList.remove("hide");
      document.querySelector(".Backcards4").classList.remove("hide");
      document.querySelector(".Backcards5").classList.remove("hide");
      document.querySelector(".Backcards1").style.left = "10%";
      document.querySelector(".Backcards2").style.left = "85%";
      document.querySelector(".Backcards1").style.top = "10%";
      document.querySelector(".Backcards2").style.top = "10%";
      document.querySelector(".Backcards3").style.left = "46.5%";
      document.querySelector(".Backcards4").style.left = "10%";
      document.querySelector(".Backcards4").style.top = "40%";
      document.querySelector(".Backcards5").style.left = "85%";
      document.querySelector(".Backcards5").style.top = "40%";
      break;
    default:
      document.querySelector(".Backcards1").classList.add("hide");
      document.querySelector(".Backcards2").classList.add("hide");
      document.querySelector(".Backcards3").classList.add("hide");
      document.querySelector(".Backcards4").classList.add("hide");
      document.querySelector(".Backcards5").classList.add("hide");
      break;
  }
});

/**
 * Fonction qui gère la fin d'une partie
 * @param {array} tabJoueur - Tableau des joueurs de la partie
 */
socket.on("game_ended", (tabJoueur) => {
  let win = false;
  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].idJoueur === joueur.idJoueur) {
      joueur.score = tabJoueur[i].score;
    }
  }
  let max = -4545864684;
  let id_max = -45648564495;
  console.log(joueur.score + " " + joueur.idJoueur)
  for (i = 0; i < tabJoueur.length; i++) {
    console.log(tabJoueur[i].score + " " + i)
    if (tabJoueur[i].score >= max) {
      max = tabJoueur[i].score;
      id_max = i;
    }
    if (id_max == joueur.idJoueur) {
      win = true;
    }
  }
  console.log("win : " + win);

  enemy.classList.add("hide");
  playing.classList.add("hide");
  player.classList.add("hide");

  for (i = 0; i < tabJoueur.length; i++) {
    document.getElementById("enemyName" + i).classList.add("hide");
    document.getElementById("enemyPlis" + i).classList.add("hide");
    document.getElementById("enemyParis" + i).classList.add("hide");
    document.getElementById("enemyScore" + i).classList.add("hide");
    document.querySelector("#playing" + i).classList.add("hide");
  }

  for (i = 0; i < 5; i++) {
    document.querySelector(".Backcards" + (i + 1)).classList.add("hide");
  }

  document.getElementById("message").classList.remove("hide");

  document.getElementById("playerName").classList.add("hide");
  document.getElementById("playerPlis").classList.add("hide");
  document.getElementById("tablePlis").classList.add("hide");
  document.getElementById("playerParis").classList.add("hide");
  document.getElementById("playerScore").classList.add("hide");
  document.getElementById("plisButton").classList.add("hide");
  document.getElementById("scoreButton").classList.add("hide");

  //document.querySelector(".Polygon_1").classList.add('hide');
  document.querySelector(".Bcard").classList.add("hide");
  document.querySelector(".Polygon_2").classList.add("hide");
  document.querySelector("#tour").classList.add("hide");
  document.querySelector(".options").classList.add("hide");
  document.querySelector(".HIG").classList.add("hide");
  document.getElementById("boutonAccueil").classList.remove("hide");

  let message = document.getElementById("message");
  if (win) {
    message.innerHTML = "Tu as gagné félicitations ! <br>";
  } else {
    message.innerHTML = "Tu as perdu... <br>";
  }
  let test = getCurrentURL();
  let url = test.substring(0, test.length - 5) + ":808/home";

  let bouton = document.getElementById("lienAccueil");
  bouton.href = url;
});

/**
 * Fonction qui gère la déconnexion d'un joueur de la partie
 */
socket.on("player_disconnected", () => {
  if (joueur.partiLancer) {
    document.getElementById("message").classList.remove("hide");
    document.getElementById("message").innerHTML =
      "Un joueur c'est déconnecté, la partie est terminée.";
    enemy.classList.add("hide");
    playing.classList.add("hide");
    player.classList.add("hide");
    document.querySelector(".Bcard").classList.add("hide");
    document.getElementById("message").classList.remove("hide");
    document.getElementById("playerName").classList.add("hide");
    document.getElementById("playerPlis").classList.add("hide");
    document.getElementById("playerParis").classList.add("hide");
    document.getElementById("playerScore").classList.add("hide");
    document.getElementById("tablePlis").classList.add("hide");
    document.querySelector("#plisButton").classList.add("hide");
    document.querySelector("#scoreButton").classList.add("hide");
    document.querySelector(".HIG").classList.add("hide");
    document.querySelector("#tour").classList.add("hide");
    document.querySelector(".Polygon_2").classList.add("hide");
    document.querySelector(".options").classList.add("hide");
    document.getElementById("boutonAccueil").classList.remove("hide");

    for (i = 0; i < 6; i++) {
      document.querySelector("#playing" + i).classList.add("hide");
    }

    for (i = 0; i < 5; i++) {
      document.querySelector(".Backcards" + (i + 1)).classList.add("hide");
    }

    //document.querySelector(".Polygon_1").classList.add('hide');

    let test = getCurrentURL();
    let url = test.substring(0, test.length - 5) + ":808/home";

    let bouton = document.getElementById("lienAccueil");
    bouton.href = url;
  } else {
    joueur.pret = false;
    socket.emit("join_room", joueur);
  }
});

socket.on("new_player", (tabJoueur) => {
  let nb = 0;
  for (i = 0; i < tabJoueur.length; i++) {
    if (tabJoueur[i].pret === true) {
      nb++;
    }
  }
  document.getElementById("message").innerHTML =
    nb + " / " + tabJoueur.length + " joueur(s) prêt(s)";
  document.getElementById("indication").innerHTML =
    "Attente d'avoir tous les joueurs de la partie prêts ou que 6 joueurs se connectent";
});

/**
 * Fonction qui retourn l'url de la page
 * @returns {string}
 */
function getCurrentURL() {
  return window.location.origin;
}

// fonction qui gère l'affichage et l'envoie au serveur de la carte joué

/**
 * Fonction qui gère l'affichage et l'envoie au serveur de la carte joué
 *
 * @param {string} $card
 * @param {boolean} tigr
 */
function playCard($card, tigr) {
  if (joueur.tour) {
    if ($card === "T") {
      document.querySelector(".plateau").classList.add("blur");
      pariDiv.innerHTML = '<img class="TigresseC TigresseCard" src="/TD.png">';
      pariDiv.innerHTML += '<img class="TigresseC TigresseCard" src="/TP.png">';
      pariDiv.classList.remove("hide");
      tigr = document.getElementsByClassName("TigresseCard");
      tigr[0].addEventListener("click", ({ target }) => {
        playCard("D", true);
        pariDiv.innerHTML = "";
        pariDiv.classList.add("hide");
        document.querySelector(".plateau").classList.remove("blur");
      });
      tigr[1].addEventListener("click", ({ target }) => {
        playCard("P", true);
        pariDiv.innerHTML = "";
        pariDiv.classList.add("hide");
        document.querySelector(".plateau").classList.remove("blur");
      });
    } else {
      let carteJouée = { carte: $card, id: joueur.idJoueur };
      joueur.tabCartesJouées[joueur.nbPlayedCard] = carteJouée;
      const ligne = document.getElementById("playing" + joueur.nbPlayedCard);
      ligne.classList.add("image");
      ligne.src = "/" + $card + ".png";
      ligne.innerHTML = '<img class="image" src="/' + $card + '.png">';
      if (tigr) {
        if ($card === "P") {
          const ligne = document.getElementById(
            "playing" + joueur.nbPlayedCard
          );
          ligne.classList.add("image");
          ligne.src = "/TP.png";
          ligne.innerHTML = '<img class="image" src="/BackCards.png">';
        } else {
          const ligne = document.getElementById(
            "playing" + joueur.nbPlayedCard
          );
          ligne.classList.add("image");
          ligne.src = "/TD.png";
          ligne.innerHTML = '<img class="image" src="/BackCards.png">';
        }

        let index = joueur.cartes.indexOf("T");
        if (index > -1) {
          joueur.cartes.splice(index, 1);
        }
        socket.emit("play", $card, joueur, true);
      } else {
        const ligne = document.getElementById("playing" + joueur.nbPlayedCard);
        ligne.classList.add("image");
        ligne.src = "/" + $card + ".png";
        ligne.innerHTML = '<img class="image" src="/' + $card + '.png">';
        let index = joueur.cartes.indexOf($card);
        if (index > -1) {
          joueur.cartes.splice(index, 1);
        }
        socket.emit("play", $card, joueur, false);
      }

      joueur.nbPlayedCard++;
      joueur.tour = false;

      $html = "";
      for (i = 0; i < joueur.cartes.length; i++) {
        $html +=
          '<img class="image backcard imgPlayer playercard' +
          i +
          '" id = "card' +
          i +
          '" src="/' +
          joueur.cartes[i] +
          '.png">';
      }
      player.innerHTML = $html;
      for (i = 0; i < joueur.cartes.length; i++) {
        $cartes = document.querySelector(".playercard" + i);
        let text = $cartes.src;
        let wait = text.substring(text.lastIndexOf("/") + 1, text.length);
        let $carteJouer = wait.substring(0, wait.lastIndexOf("."));
        $cartes.removeEventListener("click", playCard);
        let playCardFunction = function (e) {
          playCard($carteJouer, false);
        };
        $cartes.addEventListener("click", playCardFunction);
      }
      if (joueur.nbPlayedCard === null) {
        joueur.bestCardIndex = 0;
      }
    }
  }
}

function plis() {
  const tabDiv = document.getElementById('tabPlis');
  if (tabDiv.classList.contains("hide")) {
    tabDiv.classList.remove('hide');
  }
  else {
    tabDiv.classList.add('hide');
  }
}

function score() {
  const tabDiv = document.getElementById('tabScore');
  if (tabDiv.classList.contains("hide")) {
    tabDiv.classList.remove('hide');
  }
  else {
    tabDiv.classList.add('hide');
  }
}

/**
 * Fonction qui gère l'affichage et l'envoie au serveur du pari
 * @param {int} i
 */
function parisPris(i) {
  joueur.nbPlisPari = i;
  socket.emit("parisPris", joueur);
  pariDiv.innerHTML = "";
  document.getElementById("playerParis").innerHTML = "Pari = " + i;
  document.querySelector("#parisEnemy" + (joueur.idJoueur - 1)).innerHTML = i;
}

/**
 * Fonction de connection au serveur
 */
function mess() {
  joueur.username = window.location.search.substring(
    8,
    window.location.search.length
  );

  socket.emit("join_room", joueur);
  document.getElementById("joinButton").classList.add("hide");
}
