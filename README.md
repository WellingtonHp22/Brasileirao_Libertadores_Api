# 🏆 Brasileirão & Libertadores API

## Sobre o Projeto
API REST para consulta de jogos do Brasileirão e Libertadores em tempo real.

## Funcionalidades
- ✅ Consulta de jogos por campeonato
- ✅ Busca por times específicos
- ✅ Próximos jogos e resultados
- ✅ Dados em tempo real

## Tecnologias
- PHP 7.4+
- Composer
- GuzzleHTTP
- PHPUnit

## Instalação
```bash
# Clone o projeto
git clone https://github.com/WellingtonHp22/Brasileirao_Libertadores_Api.git

# Entre na pasta
cd Brasileirao_Libertadores_Api

# Instale dependências
composer install

# Configure o ambiente
cp .env.example .env
# Configure sua API_KEY no .env

# Inicie o servidor
composer start
```

## Endpoints
```http
GET /api/matches?competition={id}  # Lista jogos do campeonato
GET /api/team?name={nome}         # Busca jogos do time
```

## Testes
```bash
composer test
```

## Uso
```php
php -S localhost:8000 -t public
```

## Repositório
[GitHub - WellingtonHp22/Brasileirao_Libertadores_Api](https://github.com/WellingtonHp22/Brasileirao_Libertadores_Api)

## Autor
Wellington | [GitHub](https://github.com/WellingtonHp22)

## Licença
MIT