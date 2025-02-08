<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Futebol</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header>
        <h1>Bem-vindo ao Sistema de Futebol</h1>
    </header>
    <main>
        <section>
            <h2>Escolha um Campeonato</h2>
            <form action="games.php" method="GET">
                <label for="competition">Selecione o Campeonato:</label>
                <select name="competition" id="competition" required>
                    <option value="">--Selecione--</option>
                    <!-- As opções de campeonatos serão preenchidas dinamicamente -->
                </select>
                <button type="submit">Ver Jogos</button>
            </form>
        </section>
        <section>
            <h2>Pesquisar por Time</h2>
            <form action="team.php" method="GET">
                <label for="team">Nome do Time:</label>
                <input type="text" name="team" id="team" required>
                <button type="submit">Pesquisar</button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 Sistema de Futebol. Todos os direitos reservados.</p>
    </footer>
    <script src="../assets/js/script.js"></script>
</body>
</html>