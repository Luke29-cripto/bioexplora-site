document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    setupDarkModeToggle();
});

// Função para carregar os vídeos a partir do arquivo JSON
function loadVideos() {
    fetch('data/videos.json')
        .then(response => response.json())
        .then(videos => {
            displayVideos(videos);
            window.allVideos = videos; // Salvar todos os vídeos para futura busca
        })
        .catch(error => {
            console.error('Erro ao carregar os vídeos:', error);
        });
}

// Função para exibir os vídeos na tela
function displayVideos(videos) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';

    if (videos.length === 0) {
        videoList.innerHTML = '<p>Nenhum vídeo encontrado.</p>';
        return;
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';

        card.innerHTML = `
            <h3>${video.titulo}</h3>
            <p>${video.descricao}</p>
            <a href="${video.link}" target="_blank">Assistir</a>
        `;

        videoList.appendChild(card);
    });
}

// Função de busca de vídeos
function searchVideos() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredVideos = window.allVideos.filter(video =>
        video.titulo.toLowerCase().includes(searchInput) ||
        video.descricao.toLowerCase().includes(searchInput)
    );

    displayVideos(filteredVideos);
}

// Dark Mode Toggle
function setupDarkModeToggle() {
    const toggle = document.getElementById('toggleMode');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}
