<?php

/**
 * @file Profil.php
 * Page affichant les informations de profil du jeu et permettant de modifier les informations de l'utilisateurs
 */
if (!isset($_SESSION['pseudo'])) {
    header("Location: /login");
}

$dsn = "sqlite:" . __DIR__ . "/sqlite.db";
try {
    $pdo = new PDO($dsn, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    $pseudo = $pdo->quote($_SESSION['pseudo']);

    $sql = $pdo->prepare("SELECT adminPerms FROM skbaseuser WHERE pseudo =" . $pseudo);
    $sql->execute();
    if ($sql->execute()) {
        $admin = $sql->fetchColumn();
    }
} catch (PDOException $e) {
    echo $e->getMessage() . 'code erreur : ' . $e->getCode();
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Profil</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='CSS/Profil1.css'>

</head>

<body>

    <header>
        <img class='ellipse' src="img/Ellipse.png" alt="Ellipse">
    </header>

    <img class='jack' src="img/avatar/jackSparrow.png" alt="Jack Sparrow">

    <img class='tigresse' src="img/cartes/Tigresse.png" alt="Tigresse">
    <img class='pirate' src="img/cartes/Pirate.png" alt="Pirate">

    <form action="/profil_change" method="post" class="formID">

        <label for="id" class="pseudo">PSEUDO</label>
        <input type="text" id="id" name="identité" value="<?php echo $_SESSION['pseudo'] ?>" disabled>

        <button type='button' id="sub" name="modifyP" onclick="activePseudo()"><img class='vector' alt="V"
                src="img/Vector.png"></button>
        <button type='submit' id="sub3" name="validate"><img class='validate' alt="V" src="img/validate.png"></button>

    </form>

    <p id="error" class="hide">Merci de rentrer un pseudo valide</p>
    <p id="error2" class="hide">Ce pseudo est déja utilisé !</p>
    <p id="error3" class="hide">Merci de rentrer un mot de passe valide</p>

    <form action="/mdp_change" method="post" class="formMDP">

        <label for="pw" class="mdp">MOT DE PASSE</label>
        <input type="password" id="pw" name="mdp" placeholder="Reinitialiser votre mot de passe" disabled>

        <button type='button' id="sub1" name="modifyP" onclick="activeMdp()"><img class='vector' alt="V"
                src="img/Vector.png"></button>
        <button type='submit' id="sub4" name="validate"><img class='validate' alt="V" src="img/validate.png"></button>

    </form>

    <button type="button" id="bouton"><a id="aBouton" href="/home">RETOUR A L'ACCUEIL</a></button>

    <?php
    if ($admin === 1) {
        echo '<button type="button" id="dashboard"><a id="aDashboard" href="/admin">ADMIN DASHBOARD</a></button>';
    }
    ?>

</body>
<script src='/js/profil.js'></script>

</html>