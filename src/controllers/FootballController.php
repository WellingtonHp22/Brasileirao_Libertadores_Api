<?php

namespace App\Controllers;

use App\Services\FootballApiService;
use Exception; // Importe a classe Exception

class FootballController {
    private $apiService;

    public function __construct() {
        try {
            $this->apiService = new FootballApiService();
        } catch (Exception $e) { // Use Exception diretamente
            // Log do erro (melhor prática)
            error_log('Erro de configuração: ' . $e->getMessage());
            // Mensagem amigável para o usuário (em produção, personalize)
            die('Ocorreu um erro na configuração. Tente novamente mais tarde.'); 
        }
    }

    public function showHome() {
        try {
            $competitions = $this->apiService->getCompetitions();
            // Passar dados para a view (melhor prática)
            $data = ['competitions' => $competitions];
            $this->loadView('index', $data); // Usando método loadView
        } catch (Exception $e) {
            $this->handleError($e); // Usando método handleError
        }
    }

    public function showMatches() {
        try {
            $competitionId = $_GET['competition'] ?? null;
            $matches = $this->apiService->getMatches($competitionId);
             // Passar dados para a view (melhor prática)
            $data = ['matches' => $matches, 'competitionId' => $competitionId]; // Passa o ID também
            $this->loadView('matches', $data);
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    public function showTeam() {
        try {
            $teamId = $_GET['team'] ?? null;
            if ($teamId) {
                $teamMatches = $this->apiService->getTeamMatches($teamId);
                $data = ['teamMatches' => $teamMatches, 'teamId' => $teamId]; // Passa o ID também
                $this->loadView('team', $data);
            } else {
                // Lidar com o caso em que teamId não está presente (redirecionar, mensagem, etc.)
                $this->redirectTo('/?error=Team ID is missing'); // Exemplo: redirecionamento
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // Métodos auxiliares para carregar views e lidar com erros
    private function loadView(string $view, array $data = []) {
        extract($data); // Extrai as variáveis do array $data para usar na view
        require_once __DIR__ . '/../Views/' . $view . '.php';
    }

    private function handleError(Exception $e) {
        // Log do erro (essencial para depuração)
        error_log($e); // Loga o objeto Exception completo
        $error = $e->getMessage();
        $this->loadView('error', ['error' => $error]); // Passa o erro para a view
    }

    private function redirectTo(string $url) {
        header('Location: ' . $url);
        exit; // Importante para interromper a execução do script
    }
}