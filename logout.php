<?php
/**
 * @file logout.php
 * deconnecte l'utilisateur connecté
 */

session_start();
session_destroy();
$_SESSION = [];

header("Location: /login");