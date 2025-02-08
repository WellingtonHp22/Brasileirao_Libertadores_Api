document.addEventListener('DOMContentLoaded', function() {
    const competitionSelect = document.getElementById('competition-select');
    const teamSearchForm = document.getElementById('team-search-form');
    const teamInput = document.getElementById('team-input');

    // Fetch competitions and populate the select dropdown
    fetchCompetitions();

    competitionSelect.addEventListener('change', function() {
        const selectedCompetition = competitionSelect.value;
        fetchUpcomingGames(selectedCompetition);
    });

    teamSearchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const teamName = teamInput.value.trim();
        if (teamName) {
            fetchTeamGames(teamName);
        }
    });

    function fetchCompetitions() {
        fetch('/api/competitions')
            .then(response => response.json())
            .then(data => {
                data.forEach(competition => {
                    const option = document.createElement('option');
                    option.value = competition.id;
                    option.textContent = competition.name;
                    competitionSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching competitions:', error));
    }

    function fetchUpcomingGames(competitionId) {
        fetch(`/api/games/upcoming/${competitionId}`)
            .then(response => response.json())
            .then(data => {
                displayGames(data);
            })
            .catch(error => console.error('Error fetching upcoming games:', error));
    }

    function fetchTeamGames(teamName) {
        fetch(`/api/games/team/${teamName}`)
            .then(response => response.json())
            .then(data => {
                displayTeamGames(data);
            })
            .catch(error => console.error('Error fetching team games:', error));
    }

    function displayGames(games) {
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.innerHTML = '';
        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.textContent = `${game.homeTeam} vs ${game.awayTeam} - ${game.date} ${game.time} @ ${game.stadium}`;
            gamesContainer.appendChild(gameElement);
        });
    }

    function displayTeamGames(games) {
        const teamGamesContainer = document.getElementById('team-games-container');
        teamGamesContainer.innerHTML = '';
        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.textContent = `${game.homeTeam} vs ${game.awayTeam} - ${game.date} ${game.time} @ ${game.stadium}`;
            teamGamesContainer.appendChild(gameElement);
        });
    }
});