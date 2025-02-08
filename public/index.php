<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

use App\Controllers\FootballController;

$controller = new FootballController();

$page = $_GET['page'] ?? 'home';

switch ($page) {
    case 'matches':
        $controller->showMatches();
        break;
    case 'team':
        $controller->showTeam();
        break;
    default:
        $controller->showHome();
}