document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('themeToggle');
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = "☀️ Modo Claro";
    } else {
        btn.textContent = "🌙 Modo Escuro";
    }
});

function search() {
    const input = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (input === '') {
        results.innerHTML = '<p>Digite algo para pesquisar!</p>';
        return;
    }

    // Simulação de resultados
    const fakeResults = [
        `Você pesquisou por: <strong>${input}</strong>`,
        'Resultado 1: Introdução à Biologia',
        'Resultado 2: Estrutura da Célula',
        'Resultado 3: Genética Básica'
    ];

    fakeResults.forEach(result => {
        const p = document.createElement('p');
        p.innerHTML = result;
        results.appendChild(p);
    });
}
