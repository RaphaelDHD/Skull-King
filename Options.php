<?php 

/**
 * @file Options.php
 * Page d'options du jeu sur les quelles ont peu modifier le volume des effets sonnores du jeu et signaler un joueur 
 */
    if (!isset($_SESSION['pseudo'])) {
        header("Location: /login");
    }
?>

<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Options</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='CSS/Options1.css'>
    

</head>

<body>
    <h1>OPTIONS</h1>

    <label class= "musique">MUSIQUE  <img class='musiqueimg' src="img/musique.png" alt="Musique"></label>
    <div id = "barre_noire" class = "barre_noire">
        <div class = "rond1" ></div>
    </div>
    <p class= "pourcent">0%</p>

    <label class= "effet">EFFETS SONORES  <img class='son' src="img/son.png" alt="Son"></label>
    <div id = "barre_noire2" class = "barre_noire2">
        <div class = "rond2"></div>
    </div>
    <p class= "pourcent1">0%</p>

    <form action="traitement-options" method="post" enctype="multipart/form-data">
        <label for="message" class="signaler">SIGNALER UN JOUEUR / UN BUG</label>
        <textarea id="message" name="message" placeholder="Je vous signale XxTueur2002xX, car..."></textarea>
        <button class="envoie" type="submit">Envoyer</button>
    </form>

    <p id="succesfull" class="hide">Message envoyé avec succès !</p>

    <a href="/home"><button type="button" id="bouton">Retour à l'accueil</button></a>

</body>
    <script src='/js/options.js'></script>
</html>

