<?php
/**
 * @file traitement-admin.php
 * Fichier de traitement de la page "admin.php" qui gère les actions de l'administrateur et la base de données
 * Elle peut recevoir par méthode post : 
 * upgrade pour passer un autre utilisateur administrateur,
 * unrank afin de repasser un utilisateur administrateur à un utilisateur normal
 * delete pour supprimer un utilisateur
 * modify pour modifier le pseudo d'un joueur
 * add pour ajouter un utilisateur directement depuis cet interface
 * modifyScore afin de modifier le score d'un utilisateur
 */

$dsn = "sqlite:".__DIR__."/sqlite.db";

try {
    $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    if($_GET['action'] == "upgrade") {
        $sql = $pdo->prepare("UPDATE 'skbaseuser' SET adminPerms = 1 WHERE pseudo='".$_GET['user']."'");
        $sql->execute();
    }
    if($_GET['action'] == "unrank") {
        if($_GET['user'] != "Admin") {
            $sql = $pdo->prepare("UPDATE 'skbaseuser' SET adminPerms = 0 WHERE pseudo='".$_GET['user']."'");
            $sql->execute();
        }
        else {
            if($_SESSION['pseudo'] == "Admin") {
                $sql = $pdo->prepare("UPDATE 'skbaseuser' SET adminPerms = 0 WHERE pseudo='".$_GET['user']."'");
                $sql->execute();
            }
        }
    }
    if($_GET['action'] == "delete") {
        $sql = $pdo->prepare("DELETE FROM skbaseuser WHERE pseudo='".$_GET['user']."'");
        $sql->execute();    
    }
    if($_GET['action'] == "modify") {
        $sql = $pdo->prepare("UPDATE skbaseuser SET pseudo ='" .$_POST['newPseudo']."' WHERE pseudo='".$_GET['user']."'");
        $sql->execute(); 
    }
    if($_GET['action'] == "add") {
        $pseudo = $_POST['newPseudo'];
        $sql = $pdo->prepare("INSERT INTO skbaseuser VALUES(null, '". $pseudo ."' , '". password_hash($pseudo, PASSWORD_DEFAULT) ."',0,0,0)");
        $sql->execute(); 
    }
    if($_GET['action'] == "modifyScore") {
        $sql = $pdo->prepare("SELECT score FROM skbaseuser WHERE pseudo='".$_GET['user']."'");
        $sql->execute(); 
        $row = $sql->fetch();

        $score = $row['score'] + $_POST['newScore'];
        $sql = $pdo->prepare("UPDATE skbaseuser SET score =" .$score." WHERE pseudo='".$_GET['user']."'");
        $sql->execute(); 
    }

    header("Location: /admin");

} catch (PDOException $e) {
        echo $e->getMessage() . 'code erreur : ' . $e->getCode();
}

