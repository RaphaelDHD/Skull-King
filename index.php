<?php
/**
 * @file index.php
 * page de connexion du site, gestion des erreurs de connexion
 */

$errorcpt = false;
    $dsn = "sqlite:".__DIR__."/sqlite.db";
    if(isset($_POST['identité'])) $pseudo = $_POST['identité'];
    if(isset($_POST['mdp'])) $mdp = $_POST['mdp'];
    try {
        $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        if (!empty($_POST)) {
            if (!empty($pseudo) and !empty($mdp)) {
                $query = $pdo->prepare('SELECT pseudo, mdp from skbaseuser where pseudo = "' . $pseudo . '";');
                $query->execute();
                $result = $query->fetch();
                if ($result ) {
                   
                    if (password_verify($mdp, $result["mdp"])) {
                        $_SESSION['pseudo'] = $pseudo;
                        header('Location: /home');
                    } else {    
                        $errormdp = true;
                    }
                }   
                else {
                    $errorcpt = true;
                }
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
    <title>Connexion</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link  rel='stylesheet' type='text/css' media='screen' href='/CSS/Connexion1.css'>
    <script src='main.js'></script>

</head>

<body>

    <header>
        <img src="img/logo.png" alt="Logo Skull King">
    </header>

    <img src="img/Polygon_1.png" class="Polygon_1" alt="Polygon 1">

    <img class='bleu9' src="img/cartes/Bleu_9.png" alt="Bleu 9">
    <img class='noir2' src="img/cartes/Noir_2.png" alt="Noir 2">
    <img class='rouge6' src="img/cartes/Rouge_6.png" alt="Rouge 6">
    <img class='jaune13' src="img/cartes/Jaune_13.png" alt="Jaune 13">

    <form action="" method="post">
        <input type="text" id="id" name="identité" placeholder="PSEUDO" <?php if(isset($errormdp)) { if($errormdp) { echo "value ='$pseudo'"; } }?>>    

        <input type="password" id="pw" name="mdp" placeholder="MOT DE PASSE">
        
        <label id="error" <?php if(isset($errormdp)) { if($errormdp) { echo "style='display : unset'"; } else { echo "style='display : none'"; } }
                                if(isset($errorcpt)) { if($errorcpt) { echo "style='display : unset'"; } else { echo "style='display : none'"; } }
                          ?>
        > 
        <?php if(isset($errormdp)) { if($errormdp){ echo "Mot de passe incorrect"; } } else if(isset($errorcpt)) { if($errorcpt){ echo "Aucun compte avec ce pseudo"; } }?></label>
        <button type="submit" id="sub">CONNEXION</button>

    </form>

    <a href="/create">Vous n'avez pas compte? Créez-en un!</a>

    <img src="img/Polygon_2.png" class="Polygon_2" alt="Polygon 2">

</body>

</html>