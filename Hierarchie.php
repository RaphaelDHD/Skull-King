<?php

/**
 * @file Hierarchie.php
 * Page affichant la hierarchie des cartes
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
    <title>Hiérarchie</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='\CSS\Hierarchie.css'>
    
</head>

<body>
<div class="retour">
    <a href="/menu"><img src="img/FlecheJaune.png" class="FlecheJaune" alt="FlecheJaune"></img></a>
    <h1> LA HIERARCHIE </h1>
</div>

<img src="img/Hierarchie.png" alt="Hierarchie" class="Hierarchie"></img>

</body>
</html>