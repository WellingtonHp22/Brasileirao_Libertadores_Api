document.addEventListener('DOMContentLoaded', function() {
    const championshipSelect = document.getElementById('championship');
    const teamSelect = document.getElementById('teamSearch');
    const upcomingMatches = document.getElementById('upcomingMatches');
    const lastResults = document.getElementById('lastResults');
    const loading = document.getElementById('loading');

    // Mapeamento de times por campeonato
    const timesPorCampeonato = {
        brasileirao: [
            { id: 'flamengo', name: 'Flamengo' },
            { id: 'palmeiras', name: 'Palmeiras' },
            { id: 'sao-paulo', name: 'São Paulo' },
            { id: 'corinthians', name: 'Corinthians' },
            { id: 'vasco', name: 'Vasco' },
            { id: 'fluminense', name: 'Fluminense' },
            { id: 'gremio', name: 'Grêmio' },
            { id: 'internacional', name: 'Internacional' },
            { id: 'atletico-mg', name: 'Atlético-MG' },
            { id: 'cruzeiro', name: 'Cruzeiro' }
        ],
        libertadores: [
            { id: 'river-plate', name: 'River Plate' },
            { id: 'boca-juniors', name: 'Boca Juniors' },
            { id: 'palmeiras', name: 'Palmeiras' },
            { id: 'flamengo', name: 'Flamengo' },
            { id: 'fluminense', name: 'Fluminense' }
        ]
    };

    // Atualizar lista de times quando o campeonato for selecionado
    championshipSelect.addEventListener('change', function() {
        const selectedChampionship = this.value;
        updateTeamsList(selectedChampionship);
    });

    function updateTeamsList(championship) {
        teamSelect.innerHTML = '<option value="">Selecione um time</option>';
        
        if (!championship) return;

        const times = timesPorCampeonato[championship] || [];
        times.forEach(time => {
            const option = document.createElement('option');
            option.value = time.id;
            option.textContent = time.name;
            teamSelect.appendChild(option);
        });

        // Habilitar/desabilitar select de times
        teamSelect.disabled = times.length === 0;
    }

    // Dados simulados de jogos
    const jogos = {
        brasileirao: [
            {
                homeTeam: "Internacional",
                awayTeam: "Bahia",
                date: "17/04/2024",
                time: "20:00",
                stadium: "Beira-Rio",
                competition: "Brasileirão Série A"
            },
            {
                homeTeam: "São Paulo",
                awayTeam: "Flamengo",
                date: "17/04/2024",
                time: "21:30",
                stadium: "Morumbi",
                competition: "Brasileirão Série A"
            }
        ],
        libertadores: [
            {
                homeTeam: "River Plate",
                awayTeam: "Palmeiras",
                date: "18/04/2024",
                time: "21:00",
                stadium: "Monumental",
                competition: "Copa Libertadores"
            },
            {
                homeTeam: "Fluminense",
                awayTeam: "Boca Juniors",
                date: "18/04/2024",
                time: "19:30",
                stadium: "Maracanã",
                competition: "Copa Libertadores"
            },
            {
                homeTeam: "Flamengo",
                awayTeam: "Nacional",
                date: "19/04/2024",
                time: "21:30",
                stadium: "Maracanã",
                competition: "Copa Libertadores"
            }
        ]
    };

    // Dados simulados com resultados
    const ultimosResultadosLibertadores = [
        {
            homeTeam: "Boca Juniors",
            awayTeam: "Fluminense",
            homeScore: 2,
            awayScore: 2,
            date: "11/04/2024",
            stadium: "La Bombonera",
            competition: "Copa Libertadores"
        },
        {
            homeTeam: "Palmeiras",
            awayTeam: "River Plate",
            homeScore: 3,
            awayScore: 1,
            date: "10/04/2024",
            stadium: "Allianz Parque",
            competition: "Copa Libertadores"
        },
        {
            homeTeam: "Nacional",
            awayTeam: "Flamengo",
            homeScore: 0,
            awayScore: 2,
            date: "09/04/2024",
            stadium: "Gran Parque Central",
            competition: "Copa Libertadores"
        }
    ];

    const ultimosResultados = [
        ...ultimosResultadosLibertadores,
        {
            homeTeam: "Flamengo",
            awayTeam: "São Paulo",
            homeScore: 2,
            awayScore: 1,
            date: "14/04/2024",
            stadium: "Maracanã",
            competition: "Brasileirão Série A"
        },
        {
            homeTeam: "Palmeiras",
            awayTeam: "Corinthians",
            homeScore: 3,
            awayScore: 2,
            date: "14/04/2024",
            stadium: "Allianz Parque",
            competition: "Brasileirão Série A"
        },
        {
            homeTeam: "Grêmio",
            awayTeam: "Internacional",
            homeScore: 1,
            awayScore: 1,
            date: "13/04/2024",
            stadium: "Arena do Grêmio",
            competition: "Brasileirão Série A"
        },
        {
            homeTeam: "Fluminense",
            awayTeam: "Vasco",
            homeScore: 2,
            awayScore: 0,
            date: "13/04/2024",
            stadium: "Maracanã",
            competition: "Brasileirão Série A"
        }
    ];

    // Carregar jogos do campeonato
    document.getElementById('searchChampionship').addEventListener('click', function() {
        const competition = championshipSelect.value;
        if (!competition) {
            showError('Selecione um campeonato');
            return;
        }

        showLoading();
        setTimeout(() => {
            displayMatches(jogos[competition] || [], upcomingMatches);
            // Ocultar a seção de resultados
            document.getElementById('resultsSection').style.display = 'none';
            hideLoading();
        }, 500);
    });

    // Carregar jogos do time
    document.getElementById('searchTeam').addEventListener('click', function() {
        const team = teamSelect.value;
        const competition = championshipSelect.value;
        
        if (!competition) {
            showError('Selecione um campeonato primeiro');
            return;
        }
        if (!team) {
            showError('Selecione um time');
            return;
        }

        showLoading();
        
        // Filtrar apenas jogos do campeonato selecionado
        const teamMatches = jogos[competition].filter(match => 
            match.homeTeam.toLowerCase().includes(team) || 
            match.awayTeam.toLowerCase().includes(team)
        );

        const teamResults = ultimosResultados
            .filter(match => match.competition.includes(competition === 'brasileirao' ? 'Brasileirão' : 'Libertadores'))
            .filter(match =>
                match.homeTeam.toLowerCase().includes(team) ||
                match.awayTeam.toLowerCase().includes(team)
            );

        setTimeout(() => {
            displayMatches(teamMatches, upcomingMatches);
            // Mostrar a seção de resultados apenas quando buscar por time
            document.getElementById('resultsSection').style.display = 'block';
            displayResults(teamResults, lastResults);
            hideLoading();
        }, 500);
    });

    function displayMatches(matches, container) {
        if (!matches || matches.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Nenhum jogo encontrado</p>';
            return;
        }

        const html = matches.map(match => `
            <div class="match-card">
                <div class="match-header">
                    <span class="competition">${match.competition}</span>
                    <span class="date">${match.date} - ${match.time}</span>
                </div>
                <div class="match-teams">
                    <span class="team home">${match.homeTeam}</span>
                    <span class="versus">x</span>
                    <span class="team away">${match.awayTeam}</span>
                </div>
                ${match.stadium ? `<div class="venue">Estádio: ${match.stadium}</div>` : ''}
            </div>
        `).join('');

        container.innerHTML = html;
    }

    function displayResults(results, container) {
        if (!results || results.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Nenhum resultado encontrado</p>';
            return;
        }

        const html = results.map(match => `
            <div class="match-card">
                <div class="match-header">
                    <span class="competition">${match.competition}</span>
                    <span class="date">${match.date}</span>
                </div>
                <div class="match-teams">
                    <span class="team home">${match.homeTeam}</span>
                    <span class="score">${match.homeScore}</span>
                    <span class="versus">x</span>
                    <span class="score">${match.awayScore}</span>
                    <span class="team away">${match.awayTeam}</span>
                </div>
                <div class="venue">Estádio: ${match.stadium}</div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    function showLoading() {
        loading.classList.remove('d-none');
    }

    function hideLoading() {
        loading.classList.add('d-none');
    }

    function showError(message) {
        upcomingMatches.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        `;
    }

    // Função para mostrar últimos resultados
    function displayLastResults(competition) {
        // Esta função só será chamada quando necessário
        const filteredResults = competition 
            ? ultimosResultados.filter(match =>
                match.competition.includes(competition === 'brasileirao' ? 'Brasileirão' : 'Libertadores'))
            : ultimosResultados;

        displayResults(filteredResults, lastResults);
    }

    // Inicializar com times do primeiro campeonato
    updateTeamsList(championshipSelect.value);
});
