<?php
/**
 * @file CarteRouge.php
 * Pages affichant la description de chacune des cartes du jeux
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
    <title>Carte Rouge</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='\CSS\Cartes.css'>
    
</head>

<body>
<div class="retour">
    <a href="/menu"><img src="img/FlecheJaune.png" class="FlecheJaune" alt="FlecheJaune"></img></a>
    <h1> LES CARTES </h1>
</div>

<img src="img/RondRouge.png" class="RondRouge" alt="RondRouge"></img>

<img src="img/cartes/Rouge.png" class="Rouge" alt="Rouge"></img>

<img src="img/cartes/Rouge_Desc.png" class="Rouge_Desc" alt="Rouge_Desc"></img>

<div class="cartes">
<div class = "carre_rouge"><img src="img/cartes/Vector.png" class="Vector" alt="Vector"></img></div>
<div class = "carre_bleu"><img src="img/cartes/Ancre.png" class="Ancre" alt="Ancre"></img></div>
<div class = "carre_jaune"><img src="img/cartes/coin.png" class="coin" alt="coin"></img></div>
<div class = "carre_noir"><img src="img/cartes/cannon-ball.png" class="cannon" alt="cannon"></img></div>
<div class = "carre_blanc"><img src="img/cartes/drapeau.png" class="drapeau" alt="drapeau"></img></div>
<div class = "carre_rose"><img src="img/cartes/mermaid.png" class="mermaid" alt="mermaid"></img></div>
<div class = "carre_vert"><img src="img/cartes/tigresse_1.png" class="tigresse" alt="tigresse"></img></div>
<div class = "carre_gris"><img src="img/cartes/pirate_1.png" class="pirate" alt="pirate"></img></div>
<div class = "carre_violet"><img src="img/cartes/skullking.png" class="skullking" alt="skullking"></img></div>
</div>

</body>
    <script src='/js/cartes.js'></script>
</html>