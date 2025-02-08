<?php

namespace App\Services;

class FootballApiService
{
    private $apiKey;
    private $baseUrl = 'https://v3.football.api-sports.io';

    public function __construct()
    {
        $this->apiKey = getenv('API_KEY');
        if (!$this->apiKey) {
            throw new \Exception('API Key não configurada');
        }
    }

    public function getMatches($league = 'BR1')
    {
        return $this->makeRequest('/fixtures', [
            'league' => $league,
            'season' => date('Y')
        ]);
    }

    private function makeRequest($endpoint, $params = [])
    {
        $ch = curl_init($this->baseUrl . $endpoint . '?' . http_build_query($params));
        
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'x-rapidapi-host: ' . getenv('API_HOST'),
                'x-rapidapi-key: ' . $this->apiKey
            ]
        ]);

        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            throw new \Exception("Erro na API: $error");
        }

        return json_decode($response, true);
    }
}
