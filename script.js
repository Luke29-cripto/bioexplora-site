// ========================
// BioExplora - script.js
// Versão Intermediária Avançada - 2025
// ========================

// Elementos principais
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

// Histórico de buscas
let searchHistory = [];

// ========================
// Modo Claro / Escuro com LocalStorage
// ========================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadSearchHistory();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = "☀️ Modo Claro";
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = "🌙 Modo Escuro";
        localStorage.setItem('theme', 'light');
    }
});

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = "☀️ Modo Claro";
    } else {
        themeToggle.textContent = "🌙 Modo Escuro";
    }
}

// ========================
// Função Principal de Pesquisa
// ========================
function search() {
    const input = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (input.length === 0) {
        displayMessage('Por favor, digite um termo para pesquisar.', 'warning');
        return;
    }

    // Adicionar ao histórico
    addToHistory(input);

    // Lista de resultados simulados
    const fakeDatabase = [
        { keyword: 'célula', result: 'Estrutura e funções da célula.' },
        { keyword: 'genética', result: 'Princípios básicos da genética.' },
        { keyword: 'fotossíntese', result: 'Processo de transformação de energia luminosa.' },
        { keyword: 'ecologia', result: 'Relações entre os seres vivos e o ambiente.' },
        { keyword: 'evolução', result: 'Teorias evolutivas e seleção natural.' }
    ];

    const matchedResults = fakeDatabase.filter(item => item.keyword.includes(input) || item.result.toLowerCase().includes(input));

    if (matchedResults.length === 0) {
        displayMessage('Nenhum resultado encontrado para: ' + input, 'error');
        return;
    }

    matchedResults.forEach((item, index) => {
        const p = document.createElement('p');
        p.innerHTML = `📌 <strong>${item.keyword.toUpperCase()}:</strong> ${item.result}`;
        p.classList.add('result-item');
        p.style.opacity = '0';
        p.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            p.style.opacity = '1';
        }, 150 * index);

        resultsContainer.appendChild(p);
    });
}

// ========================
// Exibir Mensagens de Alerta
// ========================
function displayMessage(msg, type) {
    const div = document.createElement('div');
    div.classList.add('message', type);
    div.textContent = msg;
    resultsContainer.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// ========================
// Histórico de Pesquisas
// ========================
function addToHistory(term) {
    searchHistory.push(term);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    updateHistoryDisplay();
}

function loadSearchHistory() {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

function updateHistoryDisplay() {
    let historyDiv = document.getElementById('history');

    if (!historyDiv) {
        historyDiv = document.createElement('div');
        historyDiv.id = 'history';
        historyDiv.innerHTML = '<h3>🔎 Histórico de Pesquisas:</h3>';
        resultsContainer.parentNode.insertBefore(historyDiv, resultsContainer);
    }

    historyDiv.innerHTML = '<h3>🔎 Histórico de Pesquisas:</h3>';

    if (searchHistory.length === 0) {
        historyDiv.innerHTML += '<p>Nenhuma pesquisa recente.</p>';
        return;
    }

    searchHistory.slice(-5).reverse().forEach((item, index) => {
        const p = document.createElement('p');
        p.textContent = `${index + 1}. ${item}`;
        historyDiv.appendChild(p);
    });

    // Botão para limpar histórico
    const clearBtn = document.createElement('button');
    clearBtn.textContent = '🗑️ Limpar Histórico';
    clearBtn.classList.add('clear-history-btn');
    clearBtn.addEventListener('click', clearHistory);
    historyDiv.appendChild(clearBtn);
}

function clearHistory() {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    updateHistoryDisplay();
    displayMessage('Histórico limpo com sucesso!', 'success');
}

// ========================
// Limpar Resultados
// ========================
function clearResults() {
    resultsContainer.innerHTML = '';
}

// ========================
// Eventos de Teclado (Enter para pesquisar)
// ========================
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search();
    }
});

// ========================
// Animação de carregamento inicial
// ========================
window.onload = function() {
    const introSection = document.querySelector('.intro');
    introSection.style.opacity = '0';
    introSection.style.transition = 'opacity 1.5s ease';
    setTimeout(() => {
        introSection.style.opacity = '1';
    }, 300);
};

// ========================
// Extra: Exemplo de função para futura integração com API
// ========================
async function futureAPISearch(query) {
    // Simulação de integração futura com API
    console.log(`Futuramente pesquisando na API por: ${query}`);
    // Exemplo de fetch (API real futura):
    // let response = await fetch(`https://api.bioexplora.com/search?q=${query}`);
    // let data = await response.json();
    // console.log(data);
}

// ========================
// Fim do script.js
// ========================
