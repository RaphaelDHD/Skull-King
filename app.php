<?php

/**
 * @file app.php
 * fichier gérant les routes, il redirige sur la page demandé dans le lien
 */
const APP = __DIR__ . '/';

session_start();
$path = $_SERVER['PATH_INFO'] ?? '/';
ob_start();

switch ($path) {
    case '/':
        require APP . 'index.php';
        break;
    case '/login':
        require APP . 'index.php';
        break;
    case '/home':
        require APP . 'Accueil.php';
        break;
    case '/options':
        require APP . 'Options.php';
        break;
    case '/profil':
        require APP . 'Profil.php';
        break;
    case '/menu':
        require APP . 'MenuRegle.php';
        break;
    case '/admin':
        require APP . 'admin.php';
        break;
    case '/regles':
        require APP . 'Regle.php';
        break;
    case '/hierarchie':
        require APP . 'Hierarchie.php';
        break;
    case '/cartes':
        require APP . 'carteRouge.php';
        break;
    case '/create':
        require APP . 'creation_compte.php';
        break;
    case '/traitement-admin':
        require APP . 'traitement-admin.php';
        break;
    case '/traitement-options':
        require APP . 'traitement-options.php';
        break;
    case '/profil_change':
        require APP . 'profil_change.php';
        break;
    case '/mdp_change':
        require APP . 'mdp_change.php';
        break;
    case '/logout':
        require APP . 'logout.php';
        break;
    default:
        header('HTTP/1.0 404 Not Found');
        break;
}
