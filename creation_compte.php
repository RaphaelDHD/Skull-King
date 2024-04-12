<?php
/* @file creation_compte.php 
* page affichant le formulaire de création de compte et créer l'utilisateur si il est valide
*/
    $dsn = "sqlite:".__DIR__."/sqlite.db";
    try {
        $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        if (!empty($_POST)) {
            $pseudo = $pdo->quote($_POST['identité']);
            $mdp = $pdo->quote($_POST['mdp']);
            $cmdp = $pdo->quote($_POST['mdp_conf']);

            if (!empty($pseudo) and !empty($mdp) and $cmdp === $mdp) {
                $hash = $pdo->quote(password_hash($_POST['mdp'],PASSWORD_DEFAULT));
                $query = $pdo->prepare('INSERT INTO skbaseuser VALUES (null, '. $pseudo .' , '. $hash .',0,0,0)');
                if ($query->execute()) {
                    header("Location: /login");
                    die();
                } else {
                }
            } else {
            }
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
    <title>Créez votre compte</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='CSS\Creation_compte1.css'>
    <script src="/js/crea_compte.js"></script>
</head>

<body>

    <header>
        <img class = "logo" src="img/logo.png" alt="Logo Skull King">
    </header>

    <img src="img/Polygon_1.png" class="Polygon_1" alt="Polygon 1">

    <img class='bleu9' src="img/cartes/Bleu_9.png" alt="Bleu 9">
    <img class='noir2' src="img/cartes/Noir_2.png" alt="Noir 2">
    <img class='rouge6' src="img/cartes/Rouge_6.png" alt="Rouge 6">
    <img class='jaune13' src="img/cartes/Jaune_13.png" alt="Jaune 13">
    <form action="" method="post">
        <label id = "errorPseudo">Le pseudo dépasse 15 caractères</label>
        <input type="text" id="id" name="identité" placeholder="PSEUDO" onkeydown="confirmLonger()">

        <input type="password" id="pw" name="mdp" placeholder="MOT DE PASSE">

        <label id  = "errorPassword">Ne correspond pas au mot de passe</label>
        <input type="password" id="pw_conf" name="mdp_conf" placeholder="CONFIRMER MOT DE PASSE" onkeyup="confirmMdp()">

        <button type="submit" id="sub" disabled>CREATION</button>
    </form>

    <a href="/login">Vous avez déjà un compte ? Connectez-vous!</a>

    <img src="img/Polygon_2.png" class="Polygon_2" alt="Polygon 2">

</body>

</html>