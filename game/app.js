const { Socket } = require("socket.io");

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const path = require("path");
const { isBoxedPrimitive } = require("util/types");
const port = 8080;

/**
 * @type {Socket}
 */
const io = require("socket.io")(http);

app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use(express.static("img"));

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.get("/games/skullking", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/games/skullking.html"));
});

app.use(express.static("utils"));

http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});


const sqlite3 = require("sqlite3");
const dbname = "../sqlite.db";

/**
 * Objet permettant la connexion avec la base de données et qui permet d'effectuer des requêtes
 * @type {sqlite3.Database}
 */
const db = new sqlite3.Database(dbname, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});
/**
 * Tableau contenant toutes les rooms
 * @type {Array}
 */
let rooms = [];
const nbTourPartie = 3;
/**
 * Fonction qui permet de gérer le lien entre les joueurs et le serveur, permet les envois et la réception d'informations entre les clients et le serveur
 * @param {Socket} socket - Socket permettant la connexion entre le serveur et le client
 */
io.on("connection", (socket) => {
  console.log("connection faite", socket.id);

  // Le joueur rejoint une partie depuis l'interface, une room lui est attribué, si celle ci est pleine alors la partie ce lance et distribue les cartes a chaque joueur présent dans la partie

  /**
   * Le joueur rejoint une partie depuis l'interface, une room lui est attribué, si celle ci est pleine alors la partie ce lance et distribue les cartes a chaque joueur présent dans la partie
   * @param {Player} player - Objet contenant les informations du joueur
   */
  socket.on("join_room", (player) => {
    let room;
    player.socketId = socket.id;
    if (rooms.length === 0) {
      room = createRoom(player);
      player.tour = true;
      player.roomId = room.id;
      player.idJoueur = room.players.length;
      player.score = 0;
    } else {
      if (
        rooms[rooms.length - 1].players.length < 6 &&
        rooms[rooms.length - 1].begin === false
      ) {
        player.roomId = rooms[rooms.length - 1].id;
        room = rooms[rooms.length - 1];
        room.players.push(player);
        player.idJoueur = room.players.length;
        player.score = 0;
      } else {
        room = createRoom(player);
        player.tour = true;
        player.roomId = room.id;
        player.idJoueur = room.players.length;
        player.score = 0;
      }
    }
    console.log("join room", player.roomId);
    for (i = 0; i < room.players.length; i++) {
      if (room.players[i].socketId !== player.socketId) {
        io.to(room.players[i].socketId).emit("new_player", room.players);
      } else {
        io.to(player.socketId).emit("room joined", player, room.players);
      }
    }
    if (rooms[rooms.length - 1].players.length === 6) {
      PACK_OF_CARDS = [
        "R1",
        "R2",
        "R3",
        "R4",
        "R5",
        "R6",
        "R7",
        "R8",
        "R9",
        "R10",
        "R11",
        "R12",
        "R13",
        "J1",
        "J2",
        "J3",
        "J4",
        "J5",
        "J6",
        "J7",
        "J8",
        "J9",
        "J10",
        "J11",
        "J12",
        "J13",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "B11",
        "B12",
        "B13",
        "N1",
        "N2",
        "N3",
        "N4",
        "N5",
        "N6",
        "N7",
        "N8",
        "N9",
        "N10",
        "N11",
        "N12",
        "N13",
        "P",
        "P",
        "P",
        "P",
        "M",
        "M",
        "T",
        "S",
        "D",
        "D",
        "D",
        "D",
      ];
      shuffleArray(PACK_OF_CARDS);
      rooms[rooms.length - 1].begin = true;
      for (i = 0; i < room.players.length; i++) {
        let cartes = PACK_OF_CARDS.splice(0, player.nbTour);
        io.to(room.players[i].socketId).emit("distrib", cartes, room.players);
      }
    }
  });

  // Le joueur a joué une carte, le serveur compare la carte joué avec celle présente dans le jeu pour déterminer qui fait le plis,
  // il envoie ensuite un message a chaque joueur de la room avec la carte joué et toutes les informations sur la carte faisant le plis a l'instant T

  /**
   * Le joueur a joué une carte, le serveur compare la carte joué avec celle présente dans le jeu pour déterminer qui fait le plis,
   * il envoie ensuite un message a chaque joueur de la room avec la carte joué et toutes les informations sur la carte faisant le plis a l'instant T
   * @param {Card} card - Objet contenant les informations de la carte joué
   * @param {Player} joueur - Objet contenant les informations du joueur ayant joué la carte
   * @param {boolean} tigr - Booléen permettant de savoir si le joueur a joué un tigré ou non   *
   */
  socket.on("play", (card, joueur, tigr) => {
    index = findRoom(joueur.roomId);
    room = rooms[index];
    compareCard(card, joueur);
    for (i = 0; i < room.players.length; i++) {
      if (room.players[i].idJoueur == joueur.idJoueur) {
        console.log(room.players[i].idJoueur + "  " + joueur.idJoueur);
        room.players[i] = joueur;
      }
    }
    for (i = 0; i < room.players.length; i++) {
      io.to(room.players[i].socketId).emit(
        "played",
        card,
        joueur,
        tigr,
        room.players
      );
    }
    setTimeout(function () {
      if (joueur.tabCartesJouées.length === room.players.length) {
        // test si fin de plis
        console.log(
          room.players[joueur.tabCartesJouées[joueur.bestCardIndex].id - 1]
            .nbPlis
        );
        room.players[joueur.tabCartesJouées[joueur.bestCardIndex].id - 1]
          .nbPlis++;
        console.log(
          room.players[joueur.tabCartesJouées[joueur.bestCardIndex].id - 1]
            .nbPlis
        );
        for (i = 0; i < room.players.length; i++) {
          io.to(room.players[i].socketId).emit("endPlis", room.players);
        }
        setTimeout(function () {
          if (joueur.cartes.length === 0) {
            // test si fin de tour
            for (i = 0; i < room.players.length; i++) {
              room.players[i].score += calcScore(
                room.players[i].nbPlis,
                room.players[i].nbPlisPari,
                joueur.nbTour
              );
            }
            joueur.nbTour++;
            if (joueur.nbTour <= nbTourPartie) {
              // test la partie n'est pas encore terminé
              PACK_OF_CARDS = [
                "R1",
                "R2",
                "R3",
                "R4",
                "R5",
                "R6",
                "R7",
                "R8",
                "R9",
                "R10",
                "R11",
                "R12",
                "R13",
                "J1",
                "J2",
                "J3",
                "J4",
                "J5",
                "J6",
                "J7",
                "J8",
                "J9",
                "J10",
                "J11",
                "J12",
                "J13",
                "B1",
                "B2",
                "B3",
                "B4",
                "B5",
                "B6",
                "B7",
                "B8",
                "B9",
                "B10",
                "B11",
                "B12",
                "B13",
                "N1",
                "N2",
                "N3",
                "N4",
                "N5",
                "N6",
                "N7",
                "N8",
                "N9",
                "N10",
                "N11",
                "N12",
                "N13",
                "P",
                "P",
                "P",
                "P",
                "M",
                "M",
                "T",
                "S",
                "D",
                "D",
                "D",
                "D",
              ];
              shuffleArray(PACK_OF_CARDS);
              for (i = 0; i < room.players.length; i++) {
                let cartes = PACK_OF_CARDS.splice(0, joueur.nbTour);
                room.players[i].nbPlisPari = null;
                io.to(room.players[i].socketId).emit(
                  "endTour",
                  cartes,
                  room.players
                );
              }
            } else {
              let sqlstr = "";
              for (i = 0; i < room.players.length; i++) {
                io.to(room.players[i].socketId).emit(
                  "game_ended",
                  room.players
                );
                sqlstr =
                  "UPDATE skbaseuser SET score = score + (" +
                  room.players[i].score +
                  ") WHERE pseudo = '" +
                  room.players[i].username +
                  "';\n";
                console.log(sqlstr);
                db.run(sqlstr, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            }
          }
        }, 1000);
      }
    }, 1000);
  });

  /**
   * Le joueur a parié un nombre de plis, le serveur enregistre le pari et envoie un message a chaque joueur de la room avec le pari du joueur
   * @param {Player} joueur - Objet contenant les informations du joueur ayant parié
   */
  socket.on("parisPris", (joueur) => {
    index = findRoom(joueur.roomId);
    room = rooms[index];
    let bool = true;
    for (i = 0; i < room.players.length; i++) {
      if (joueur.idJoueur === room.players[i].idJoueur) {
        room.players[i] = joueur;
      }
    }
    for (i = 0; i < room.players.length; i++) {
      if (room.players[i].nbPlisPari === null) {
        bool = false;
      }
    }
    if (bool) {
      for (i = 0; i < room.players.length; i++) {
        io.to(room.players[i].socketId).emit("roundLaunch", room.players);
      }
    }
  });

/**
 * Le joueur a quitté la partie, le serveur envoie un message a chaque joueur de la room pour les informer
 */  socket.on("disconnect", () => {
    console.log(`[disconnect] ${socket.id}`);
    let room = null;

    rooms.forEach((r) => {
      r.players.forEach((p) => {
        if (p.socketId === socket.id) {
          room = r;
        }
      });
    });
    if (room !== null) {
      for (i = 0; i < room.players.length; i++) {
        io.to(room.players[i].socketId).emit("player_disconnected");
      }
    }
    rooms = rooms.filter((r) => r !== room);
  });
/**
 * Le joueur a cliqué sur le bouton "prêt", le serveur envoie un message a chaque joueur de la room pour les informer
 */
  socket.on("player_ready", (joueur) => {
    index = findRoom(joueur.roomId);
    room = rooms[index];
    let nb = 0;
    for (i = 0; i < room.players.length; i++) {
      if (joueur.idJoueur === room.players[i].idJoueur) {
        room.players[i] = joueur;
      }
      if (room.players[i].pret) {
        // compte le nombre de joueur prêt
        nb++;
      }
    }
    if (nb === room.players.length && room.players.length > 1) {
      // si tout les joueurs sont prêt et qu'il y a plus d'un joueur
      for (i = 0; i < room.players.length; i++) {
        PACK_OF_CARDS = [
          "R1",
          "R2",
          "R3",
          "R4",
          "R5",
          "R6",
          "R7",
          "R8",
          "R9",
          "R10",
          "R11",
          "R12",
          "R13",
          "J1",
          "J2",
          "J3",
          "J4",
          "J5",
          "J6",
          "J7",
          "J8",
          "J9",
          "J10",
          "J11",
          "J12",
          "J13",
          "B1",
          "B2",
          "B3",
          "B4",
          "B5",
          "B6",
          "B7",
          "B8",
          "B9",
          "B10",
          "B11",
          "B12",
          "B13",
          "N1",
          "N2",
          "N3",
          "N4",
          "N5",
          "N6",
          "N7",
          "N8",
          "N9",
          "N10",
          "N11",
          "N12",
          "N13",
          "P",
          "P",
          "P",
          "P",
          "M",
          "M",
          "T",
          "S",
          "D",
          "D",
          "D",
          "D",
        ];
        shuffleArray(PACK_OF_CARDS);
        room.begin = true;
        for (i = 0; i < room.players.length; i++) {
          let cartes = PACK_OF_CARDS.splice(0, joueur.nbTour); // on distribue les cartes et on lance la partie
          io.to(room.players[i].socketId).emit("distrib", cartes, room.players);
        }
      }
    } else {
      // sinon on indique au joueurs le nombre de joueur prêt
      for (i = 0; i < room.players.length; i++) {
        io.to(room.players[i].socketId).emit("other_ready", room.players);
      }
    }
  });
});


/**
 * fonction qui crée une partie, elle intervient si aucune partie n'est libre pour le joueur
 * @param {object} player 
 * @returns la room créée
 */
function createRoom(player) {
  const room = { id: roomId(), players: [], begin: false };

  player.roomId = room.id;

  room.players.push(player);
  rooms.push(room);

  return room;
}


/**
 * fonction qui génère un ID aléatoire pour la room
 * @returns un ID aléatoire
 */
function roomId() {
  return Math.random().toString(36).substr(2, 9);
}

// fonction permettant de mélangé les cartes
/**
 * fonction permettant de mélangé les cartes, il faut mettre en paramètres un tableau de cartes
 * @param {array} array 
 * @returns le tableau de cartes mélangé
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// fonction trouvant l'index d'une room dans le tableau rooms en fonction de son ID

/**
 * fonction trouvant l'index d'une room dans le tableau rooms en fonction de son ID
 * @param {int} roomId 
 * @returns la room trouvée
 */
function findRoom(roomId) {
  for (i = 0; i < rooms.length; i++) {
    if (rooms[i].id === roomId) {
      return i;
    }
  }
}


/**
 * fonction permettant de détérminé si la carte joué remporte le plis ou non
 * @param {string} card  la carte joué
 * @param {object} joueur le joueur ayant joué la carte
 * @returns le joueur passé en entrée avec la carte joué et la meilleur carte dans ses informations
 */
function compareCard(card, joueur) {
  if (joueur.bestCardIndex != null) {
    let bestCard = joueur.tabCartesJouées[joueur.bestCardIndex].carte;
    let bestCardType = bestCard.substring(0, 1);
    let cardType = card.substring(0, 1);
    switch (cardType) {
      case "R":
      case "J":
      case "B": {
        if (bestCardType === cardType) {
          if (
            Number(bestCard.substring(1, bestCard.length)) <
            Number(card.substring(1, card.length))
          ) {
            joueur.bestCardIndex = joueur.nbPlayedCard;
            break;
          }
        } else if (bestCardType === "D") {
          joueur.bestCardIndex = joueur.nbPlayedCard;
          break;
        }
        break;
      }
      case "N":
        if (
          bestCardType === "R" ||
          bestCardType === "J" ||
          bestCardType === "B" ||
          bestCardType === "D"
        ) {
          joueur.bestCardIndex = joueur.nbPlayedCard;
          break;
        } else if (bestCardType === "N") {
          if (
            Number(bestCard.substring(1, bestCard.length)) <
            Number(card.substring(1, card.length))
          ) {
            joueur.bestCardIndex = joueur.nbPlayedCard;
            break;
          }
        }
        break;

      case "P":
        if (
          bestCardType === "R" ||
          bestCardType === "J" ||
          bestCardType === "B" ||
          bestCardType === "D" ||
          bestCardType === "N"
        ) {
          joueur.bestCardIndex = joueur.nbPlayedCard;
          break;
        } else if (bestCardType === "M") {
          for (i = 0; i < joueur.tabCartesJouées.length; i++) {
            if (joueur.tabCartesJouées[i].carte.substring(0, 1) === "S") {
              break;
            }
          }
          joueur.bestCardIndex = joueur.nbPlayedCard;
          break;
        }
        break;

      case "M":
        if (
          bestCardType === "R" ||
          bestCardType === "J" ||
          bestCardType === "B" ||
          bestCardType === "D" ||
          bestCardType === "N" ||
          bestCardType === "S"
        ) {
          joueur.bestCardIndex = joueur.nbPlayedCard;
          break;
        }
        break;

      case "S":
        if (
          bestCardType === "R" ||
          bestCardType === "J" ||
          bestCardType === "B" ||
          bestCardType === "D" ||
          bestCardType === "N" ||
          bestCardType === "P"
        ) {
          joueur.bestCardIndex = joueur.nbPlayedCard;
          break;
        }
        for (i = 0; i < joueur.tabCartesJouées.length; i++) {
          if (joueur.tabCartesJouées[i].carte.substring(0, 1) === "M") {
            joueur.bestCardIndex = i;
            break;
          }
        }
        break;
    }
  } else {
    joueur.bestCardIndex = joueur.nbPlayedCard;
  }
  return joueur;
}

/**
 * fonction permettant de calculer le score d'un joueur
 * @param {int} plis le nombre de plis gagné par le joueur
 * @param {int} paris le nombre de plis parié par le joueur
 * @param {int} nbTour le nombre de tour joué
 * @returns le score du joueur
 */
function calcScore(plis, paris, nbTour) {
  let score = 0;
  if (paris != 0) {
    if (paris === plis) {
      score = paris * 20;
    } else {
      ecart = Math.abs(paris - plis);
      score = -(10 * ecart);
    }
  } else {
    if (paris === plis) {
      score = nbTour * 10;
    } else {
      score = -(nbTour * 10);
    }
  }
  return score;
}
