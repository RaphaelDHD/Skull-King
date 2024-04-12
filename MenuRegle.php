<?php 

/**
 * @file MenuRegle.php
 * Page des règles du jeu
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
    <title>Comment Jouer</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='CSS/MenuRegle1.css'>
    <script src='main.js'></script>

</head>

<body>
    
<a href="/regles"><div class="Regles">
    <h1> LES RÈGLES </h1>
    <p>SkullKing est un jeu dans lequel le but est de pronostiquer le 
        nombre de plis que vous pensez pouvoir faire au cours d’une manche. 
        Vous devez par la suite, tout faire pour effectuer ce nombre exact 
        de plis pronostiqués.
    </p>
</div></a>

<a href="/cartes"><div class="Cartes">
    <h2> LES CARTES </h2>
    <img class='combo_carte' src="img/combo_carte.png" alt="Combo_carte">
</div></a>

<a href="/hierarchie"><section class="Hierarchie">
    <h3> LA HIERARCHIE </h3>
    <img class='suite_carte' src="img/suite_carte.png" alt="Suite_carte">
</section></a>

    <button type="button" id="bouton"><a href="/home">RETOUR A L'ACCUEIL</a></button>
</body>
</html>
