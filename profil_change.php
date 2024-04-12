<?php
/**
 * @file profil_change.php
 * Gère la modification du pseudo de l'utilisateur dans la base de données par la page profil
 */
session_start();

$dsn = "sqlite:".__DIR__."/sqlite.db";
try {

    if($_POST['identité'] != NULL) {
        $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        $sql = $pdo->prepare("SELECT pseudo FROM skbaseuser WHERE pseudo = '".$_POST['identité']."' AND pseudo != '".$_SESSION['pseudo']."'");
        $sql->execute();
        $result = $sql->fetch(PDO::FETCH_ASSOC);
        
        if($result != NULL) {
            header("Location: /profil?modif=false2");
        }
        else {
            $sql = $pdo->prepare("UPDATE skbaseuser SET pseudo ='".$_POST['identité']."' WHERE pseudo = '".$_SESSION['pseudo']."'");
            $sql->execute();
        
            $_SESSION['pseudo'] = $_POST['identité'];
            header("Location: /profil?modif=true");
        }
    }
    else {
        header("Location: Profil?modif=false1");
    }

    
}   
catch (PDOException $e) {
    echo $e->getMessage() . 'code erreur : ' . $e->getCode();
}