<?php

/**
 * @file mdp_change.php
 * Modifie le mot de passe de l'utilisateur par un nouveaux rentré, il est hashé avant d'être envoyé dans la base de données
 */

session_start();


$dsn = "sqlite:".__DIR__."/sqlite.db";
try {
    if($_POST['mdp'] != NULL) {
        $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        $psw = password_hash($_POST['mdp'], PASSWORD_DEFAULT);

        $sql = $pdo->prepare("UPDATE skbaseuser SET mdp ='".$psw."' WHERE pseudo = '".$_SESSION['pseudo']."'");
        $sql->execute();
    
        header("Location: /profil");
    }
    else {
        header("Location: /profil?modif=false3");
    }
}   
catch (PDOException $e) {
    echo $e->getMessage() . 'code erreur : ' . $e->getCode();
}