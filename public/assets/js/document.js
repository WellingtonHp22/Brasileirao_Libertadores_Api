document.addEventListener('DOMContentLoaded', function() {
    const championshipForm = document.getElementById('championship-form');
    const teamForm = document.getElementById('team-form');

    championshipForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const championship = document.getElementById('championship').value;
        fetchGames(championship);
    });

    teamForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const team = document.getElementById('team').value;
        fetchTeamGames(team);
    });

    function fetchGames(championship) {
        // Aqui você fará a chamada à API para buscar os jogos do campeonato selecionado
        // Exemplo de chamada à API:
        // fetch(`URL_DA_API/${championship}/games`)
        //     .then(response => response.json())
        //     .then(data => {
        //         // Processar e exibir os dados dos jogos
        //     })
        //     .catch(error => console.error('Erro ao buscar jogos:', error));
    }

    function fetchTeamGames(team) {
        // Aqui você fará a chamada à API para buscar os jogos do time específico
        // Exemplo de chamada à API:
        // fetch(`URL_DA_API/teams/${team}/games`)
        //     .then(response => response.json())
        //     .then(data => {
        //         // Processar e exibir os dados dos jogos do time
        //     })
        //     .catch(error => console.error('Erro ao buscar jogos do time:', error));
    }
});