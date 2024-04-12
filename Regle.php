<?php

/**
 * @file Regle.php
 * Page affichant le détail des règles aux joueurs 
 * */


    if (!isset($_SESSION['pseudo'])) {
        header("Location: /login");
    }
?>

<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Règles</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='\CSS\Regle1.css'>
    
</head>

<body>

    <div class="retour">
        <a href="/menu"><img src="img/FlecheJaune.png" class="FlecheJaune" alt="FlecheJaune"></img></a>
        <h1> LES REGLES </h1>
    </div>

    <section class = 'p_principal'>
        <p class = 'p1'><span class="jaune"> SkullKing </span> est un jeu dans lequel le but est de pronostiquer 
        <span class="jaune"> le nombre de plis </span> que vous pensez pouvoir faire au cours d’une manche.
        Vous devez, par la suite, tout faire pour effectuer ce nombre de plis pronostiqué.</p>
        <p class = 'p2'>Une partie se joue en <span class="jaune"> dix manches</span>, chaque manche se joue avec un 
        nombre de cartes égal au <span class="jaune"> numéro de la manche</span>. (manche 6 = 6 cartes par joueur).</p>
        <p class = 'p3'>Au début de chaque manche, toutes les cartes sont mélangées
        et distribuées de manière complètement <span class="jaune"> aléatoire</span>.</p>
        <p class = 'p4'>Durant une partie, si un joueur joue une carte de couleur, 
            tous les autres joueurs sont dans 
         <span class="jaune"> l'obligation </span> 
        de jouer une carte de cette même couleur (s'ils en possèdent).</p>
    </section>

    <section class = 'resultat'>
        <h2>RESULTATS DES PLIS :</h2>
        <p class = 'p5'>Pronostic réussi : <span class="vert"> +20pts </span> par plis </p>
        <p class = 'p6'>Pronostic non réussi : <span class="rouge"> -10pts </span> par plis en trop/en moins </p>
        <p class = 'p7'>Pronostic 0 réussi : <span class="vert"> +10pts </span> x numéro de la manche</p>
        <p class = 'p8'>Pronostic 0 non réussi : <span class="rouge"> -10pts </span > x numéro de la manche</p>
    </section>
    