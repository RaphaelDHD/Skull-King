<?php
/**
 * @file Accueil.php
 * page d'accueil du site
 */




/**
 * Créer l'affichage du leaderboard à partir des meilleurs joueurs enregistrés sur le serveur
 * @return Une variable string servant a l'affichage du leaderboard
 */
function afficherLeaderboard()
{
    $dsn = "sqlite:" . __DIR__ . "/sqlite.db";
    try {
        $pdo = new PDO($dsn, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $sql = $pdo->prepare("SELECT * FROM skbaseuser ORDER BY score DESC LIMIT 10");
        $sql->execute();
    } catch (PDOException $e) {
        echo $e->getMessage() . 'code erreur : ' . $e->getCode();
    }


    $output = '<div class="sidepanel">
        <h2>LEADERBOARD</h2>
        <p>Voici le classement des premiers joueurs mondiaux de SkullKing (Le classement est fait en fonction du score final des parties)</p>';

    while ($row = $sql->fetch()) {
        $output .= '<div class="container">
            <img class="pp" src="/img/avatar/jackSparrow.png">
            <p class="name">' . $row['pseudo'] . '</p>
            <p class="points">' . $row['score'] . 'pts</p>
        </div>';
    }

    $output .= '</div>';

    echo $output;
}




/* Vérifie si l'utilisateur est connecté, si il ne l'est pas il le redirige sur la page de connexion */
if (!isset($_SESSION['pseudo'])) {
    header("Location: /login");
} else {
    $pseudo = $_SESSION['pseudo'];
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Skull King</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='/CSS/Accueil1.css'>
    <script src="/js/accueil.js"></script>
    <script src="https://kit.fontawesome.com/b1e6b13b0e.js" crossorigin="anonymous"></script>
</head>


<body onload="loadURL()">
    <header>
        <img src="img/logo.png" alt="Logo Skull King">
    </header>

    <?= afficherLeaderboard() ?>

    <a href="/profil"><img class='jack' src="img/avatar/jackSparrow.png" alt="Jack Sparrow"></a>
    <a href="/logout" class="logout"><i class="fa-solid fa-right-from-bracket"></i></a>

    <img class='noir2' src="img/cartes/Noir_2.png" alt="Noir 2">
    <img class='rouge6' src="img/cartes/Rouge_6.png" alt="Rouge 6">
    <img class='jaune13' src="img/cartes/Jaune_13.png" alt="Jaune 13">

    <a id="optionsBTN" href="/options"><button type="button" id="options">OPTIONS</button></a>
    <a id="jouerBTN" href=""><button type="button" id="jouer">JOUER</button></a>

    <div id="classement" class="classement">
        <button id="Classement" class="Classement"><img src="img/Classement.png" alt="Classement" onclick="Nav()"></button>
    </div>

    <div class="regle">
        <img class='livre' src="img/VectorAccueil.png" alt="Livre">
        <li>
            <a href="/menu">COMMENT JOUER ?</a>
        </li>
    </div>

    <img src="img/Polygon_1.png" class="Polygon_1" alt="Polygon 1"></img>
    <img src="img/Polygon_2.png" class="Polygon_2" alt="Polygon 2"></img>
    <p class="hide"><?php echo $_SESSION['pseudo'] ?></p>
</body>

</html>