<?php

// 1. Carregar o Autoload do Composer
require_once __DIR__ . '/../vendor/autoload.php';

// 2. Carregar as Variáveis de Ambiente
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// 3. Configurações de Erro para Desenvolvimento
if ($_ENV['APP_ENV'] === 'development') { // Verifica se o ambiente é de desenvolvimento
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// 4. Definir Timezone
date_default_timezone_set($_ENV['TIMEZONE'] ?? 'America/Sao_Paulo'); // Usa variável de ambiente ou padrão

// 5. Resto do seu Código

// Exemplo de como acessar as variáveis de ambiente
echo "Host do banco de dados: " . $_ENV['DATABASE_HOST'] . "<br>";
echo "Nome do banco de dados: " . $_ENV['DATABASE_NAME'] . "<br>";
echo "Ambiente: " . $_ENV['APP_ENV'] . "<br>";
echo "Timezone: " . date_default_timezone_get() . "<br>";

// ... (seu código continua aqui)

?>