<?php

namespace App\Routes;

use App\Controllers\FootballController;

class Router
{
    private $controller;

    public function __construct()
    {
        $this->controller = new FootballController();
    }

    public function dispatch($uri)
    {
        switch ($uri) {
            case '/':
                $this->controller->showHome();
                break;
            
            case '/matches':
                $this->controller->showMatches();
                break;
            
            case '/team':
                $this->controller->showTeam();
                break;
            
            default:
                header('HTTP/1.1 404 Not Found');
                echo '404 - Página não encontrada';
                break;
        }
    }
}