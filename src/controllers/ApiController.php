<?php
namespace App\Controllers;

class ApiController {
    private $apiUrl = 'https://api.football-data.org/v2/';
    private $apiToken;

    public function __construct() {
        $this->apiToken = getenv('FOOTBALL_API_TOKEN');
        if (!$this->apiToken) {
            throw new \Exception('API Token não configurado');
        }
    }

    public function index() {
        return [
            'status' => 'success',
            'message' => 'API está funcionando'
        ];
    }

    public function fetchCompetitions() {
        return $this->makeApiRequest('competitions');
    }

    public function fetchUpcomingGames($competitionId = null) {
        $endpoint = $competitionId 
            ? "competitions/{$competitionId}/matches?status=SCHEDULED" 
            : "matches?status=SCHEDULED";
        return $this->makeApiRequest($endpoint);
    }

    public function fetchTeamGames($teamId) {
        return $this->makeApiRequest("teams/{$teamId}/matches");
    }

    public function fetchLiveGames($competitionId = null) {
        $today = date('Y-m-d');
        $endpoint = $competitionId 
            ? "competitions/{$competitionId}/matches?dateFrom={$today}&dateTo={$today}" 
            : "matches?dateFrom={$today}&dateTo={$today}";
            
        return $this->makeApiRequest($endpoint);
    }

    private function makeApiRequest($endpoint) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->apiUrl . $endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'X-Auth-Token: ' . $this->apiToken,
                'Accept: application/json'
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            throw new \Exception(curl_error($ch));
        }
        
        curl_close($ch);

        return [
            'status' => $httpCode,
            'data' => json_decode($response, true)
        ];
    }
}