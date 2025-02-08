<?php
// team.php

require_once '../controllers/ApiController.php';
require_once '../models/Game.php';

$apiController = new ApiController();

if (isset($_POST['team_name'])) {
    $teamName = $_POST['team_name'];
    $upcomingGames = $apiController->fetchTeamGames($teamName, 'upcoming');
    $lastResults = $apiController->fetchTeamGames($teamName, 'last');
} else {
    $upcomingGames = [];
    $lastResults = [];
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisar Time</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <h1>Pesquisar Time</h1>
    <form method="POST" action="">
        <input type="text" name="team_name" placeholder="Nome do time" required>
        <button type="submit">Pesquisar</button>
    </form>

    <h2>Jogos Programados</h2>
    <?php if (!empty($upcomingGames)): ?>
        <ul>
            <?php foreach ($upcomingGames as $game): ?>
                <li>
                    <?php echo $game->homeTeam . ' vs ' . $game->awayTeam; ?> - 
                    <?php echo $game->date . ' ' . $game->time . ' no ' . $game->stadium; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Nenhum jogo programado encontrado.</p>
    <?php endif; ?>

    <h2>Últimos Resultados</h2>
    <?php if (!empty($lastResults)): ?>
        <ul>
            <?php foreach ($lastResults as $game): ?>
                <li>
                    <?php echo $game->homeTeam . ' vs ' . $game->awayTeam; ?> - 
                    <?php echo $game->date . ' ' . $game->time . ' no ' . $game->stadium; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Nenhum resultado encontrado.</p>
    <?php endif; ?>
</body>
</html>