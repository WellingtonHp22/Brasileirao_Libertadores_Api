document.addEventListener('DOMContentLoaded', function() {
    const championshipSelect = document.getElementById('championship');
    const teamSelect = document.getElementById('teamSearch');
    const upcomingMatches = document.getElementById('upcomingMatches');
    const lastResults = document.getElementById('lastResults');
    const loading = document.getElementById('loading');

    // Lista de times por campeonato
    const times = {
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

    // Atualizar lista de times quando selecionar campeonato
    championshipSelect.addEventListener('change', function() {
        const selectedChampionship = this.value;
        updateTeamsList(selectedChampionship);
        // Limpar resultados anteriores
        upcomingMatches.innerHTML = '';
        lastResults.innerHTML = '';
        document.getElementById('resultsSection').style.display = 'none';
    });

    function updateTeamsList(championship) {
        teamSelect.innerHTML = '<option value="">Selecione um time</option>';
        
        if (!championship) {
            teamSelect.disabled = true;
            return;
        }

        const timesList = times[championship] || [];
        timesList.forEach(time => {
            const option = document.createElement('option');
            option.value = time.id;
            option.textContent = time.name;
            teamSelect.appendChild(option);
        });

        teamSelect.disabled = false;
    }

    // Buscar jogos quando clicar no botão
    document.getElementById('searchChampionship').addEventListener('click', function() {
        const championship = championshipSelect.value;
        if (!championship) {
            alert('Selecione um campeonato');
            return;
        }
        showLoading();
        // Simular busca de jogos
        setTimeout(() => {
            const jogos = getJogosPorCampeonato(championship);
            displayMatches(jogos);
            hideLoading();
        }, 500);
    });

    function showLoading() {
        loading.classList.remove('d-none');
    }

    function hideLoading() {
        loading.classList.add('d-none');
    }

    // Inicializar com times do campeonato selecionado
    updateTeamsList(championshipSelect.value);
});

// Função auxiliar para simular jogos
function getJogosPorCampeonato(championship) {
    // Simular dados de jogos
    return championship === 'brasileirao' ? 
        [
            {
                homeTeam: "Flamengo",
                awayTeam: "São Paulo",
                date: "17/04/2024",
                time: "20:00",
                stadium: "Maracanã",
                competition: "Brasileirão"
            }
        ] : 
        [
            {
                homeTeam: "River Plate",
                awayTeam: "Flamengo",
                date: "18/04/2024",
                time: "21:30",
                stadium: "Monumental",
                competition: "Libertadores"
            }
        ];
}
