<?php
/**
 * @file traitement-options.php
 * Page de traitement des informations entrées par l'utilisateur provenant de la page option, elle reçoit un message destiné aux développeurs et le transmet dans la base de données
 */
session_start();

$dsn = "sqlite:".__DIR__."/sqlite.db";
try {
    $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    $sql = $pdo->prepare("SELECT id_user FROM skbaseuser WHERE pseudo ='".$_SESSION['pseudo']."'");
    $sql->execute();
    $user = $sql->fetchColumn();

    if($_POST['message'] != "") {
        $sql = $pdo->prepare('INSERT INTO report VALUES (null, '.$user.',"'.$_POST['message'].'")');
        $sql->execute();

        header("Location: /options?send=true");
    }
    else {
        header("Location: /options");
    }
}   
catch (PDOException $e) {
    echo $e->getMessage() . 'code erreur : ' . $e->getCode();
}