<?php
require_once '../controllers/ApiController.php';
require_once '../models/Game.php';

$apiController = new ApiController();
$competitions = $apiController->fetchCompetitions();

$selectedCompetition = isset($_GET['competition']) ? $_GET['competition'] : null;
$upcomingGames = [];
$lastResults = [];

if ($selectedCompetition) {
    $upcomingGames = $apiController->fetchUpcomingGames($selectedCompetition);
    $lastResults = $apiController->fetchTeamGames($selectedCompetition);
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/style.css">
    <title>Jogos do Campeonato</title>
</head>
<body>
    <h1>Jogos Programados</h1>

    <form method="GET" action="games.php">
        <label for="competition">Escolha um Campeonato:</label>
        <select name="competition" id="competition" onchange="this.form.submit()">
            <option value="">Selecione</option>
            <?php foreach ($competitions as $competition): ?>
                <option value="<?= $competition['id'] ?>" <?= $selectedCompetition == $competition['id'] ? 'selected' : '' ?>>
                    <?= $competition['name'] ?>
                </option>
            <?php endforeach; ?>
        </select>
    </form>

    <?php if ($selectedCompetition): ?>
        <h2>Jogos Programados para <?= $selectedCompetition ?></h2>
        <ul>
            <?php foreach ($upcomingGames as $game): ?>
                <?php $gameObj = new Game($game); ?>
                <li>
                    <?= $gameObj->homeTeam ?> vs <?= $gameObj->awayTeam ?> - <?= $gameObj->date ?> às <?= $gameObj->time ?> no <?= $gameObj->stadium ?>
                </li>
            <?php endforeach; ?>
        </ul>

        <h2>Últimos Resultados</h2>
        <ul>
            <?php foreach ($lastResults as $result): ?>
                <?php $gameObj = new Game($result); ?>
                <li>
                    <?= $gameObj->homeTeam ?> <?= $result['homeScore'] ?> - <?= $result['awayScore'] ?> <?= $gameObj->awayTeam ?> - <?= $gameObj->date ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</body>
</html>