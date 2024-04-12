<?php   
/**
 * @file admin.php
 * page exclusif a l'administrateur du site
 */



/**
 * 
 * Génère le panel avec tous les utilisateurs de la base de données, cette fonction génère aussi des boutons 
 * pour gérer le rang des utilisateurs, si on veut les supprimer ou non et aussi les modifiers
 * 
 * @return Un string contenant le code html du panel
 */
function generatePanel() {
    $dsn = "sqlite:".__DIR__."/sqlite.db";

    try {
        $pdo = new PDO($dsn, null, null, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
        $sql = $pdo->prepare("SELECT * FROM skbaseuser ORDER BY id_user");
        $sql->execute();

    } catch (PDOException $e) {
         echo $e->getMessage() . 'code erreur : ' . $e->getCode();
    }

    $panel = '<div class="panel">';
    $cpt = 0;
    while($row = $sql->fetch()) {
        $panel .= '<div class="container">';
        $panel .= '<img class="pp" src="/img/avatar/jackSparrow.png">';
        $panel .= '<p id="name" class="' . ($row['adminPerms'] == 1 ? "admin" : "") . '">' . $row['pseudo'] . '</p>';
        if ($row['pseudo'] != 'Admin'){
            $panel .= '<button type="button" id="upgrade" ' . ($row['pseudo'] == "Admin" ? 'style="visibility:hidden"' : "") . ' ' . ($row['adminPerms'] == 1 ? 'class="hide"' : "") . ' onclick="window.location.href=\'traitement-admin?action=upgrade&user=' . $row['pseudo'] . '\'"><i class="fa-solid fa-crown"></i>PASSER ADMIN</button>';
            $panel .= '<button type="button" id="unrank" ' . ($row['adminPerms'] == 0 ? 'class="hide"' : "") . ' onclick="window.location.href=\'traitement-admin?action=unrank&user=' . $row['pseudo'] . '\'"><i class="fa-solid fa-xmark"></i>ENLEVER ADMIN</button>';
        }
        $panel .= '<button type="button" id="modify' . $cpt . '" onclick="switchFunc(' . $cpt . ')"><i class="fa-solid fa-pen"></i>MODIFIER LE PSEUDO</button>';
        $panel .= '<button type="button" id="modifyScore' . $cpt . '" onclick="switchFunc3(' . $cpt . ')"><i class="fa-solid fa-pen"></i>MODIFIER LE SCORE</button>';
        $panel .= '<form action="traitement-admin?action=modifyScore&user=' . $row['pseudo'] . '" method="post"><input type="text" id="newScore' . $cpt . '" class="hide" name="newScore" placeholder="Nombre de points à ajouter/enlever"></input></form>';
        $panel .= '<button type="button" id="delete" onclick="window.location.href=\'traitement-admin?action=delete&user=' . $row['pseudo'] . '\'"><i class="fa-solid fa-trash"></i>SUPPRIMER</button>';
        $panel .= '<form action="traitement-admin?action=modify&user=' . $row['pseudo'] . '" method="post"><input type="text" id="newPseudo' . $cpt . '" class="hide" name="newPseudo" placeholder="Nouveau pseudo"></input></form>';
        $panel .= '</div>';
        $cpt++;
    }
    $panel .= '</div>';
    return $panel;
}




/* Vérifie si l'utilisateur est connecté, si il ne l'est pas il le redirige sur la page de connexion */

    if (!isset($_SESSION['pseudo'])) {
        header("Location: /login");
    }

    $pseudo = $_SESSION['pseudo'];
    
?>

<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Admin dashboard</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='\CSS\admin.css'>
    <script src="https://kit.fontawesome.com/b1e6b13b0e.js" crossorigin="anonymous"></script>
</head>

<body>
<div class="retour">
    <a href="/profil"><img src="img/FlecheJaune.png" class="FlecheJaune" alt="FlecheJaune"></img></a>
    <h1> ADMIN DASHBOARD </h1>
</div>

<?= generatePanel()?>

<button type="button" id="add" onclick="switchFunc2()"><i class="fa-solid fa-plus"></i>AJOUTER UN UTILISATEUR</button>
<form action="traitement-admin?action=add" method="post">
    <input type="text" id="new" class="hide" name="newPseudo" placeholder="Nouveau pseudo"></input>
</form>

<script src="/js/admin.js"></script>
</body>
</html>