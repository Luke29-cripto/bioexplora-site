document.addEventListener('DOMContentLoaded', () => {
    let allVideos = [];

    // Função para carregar os vídeos do JSON
    function loadVideos() {
        fetch('./data/videos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o arquivo JSON.');
                }
                return response.json();
            })
            .then(data => {
                allVideos = data;
                displayVideos(allVideos);
            })
            .catch(error => {
                console.error('Erro no carregamento:', error);
                const videoList = document.getElementById('videoList');
                if (videoList) {
                    videoList.innerHTML = '<p>Erro ao carregar os vídeos. Verifique a conexão ou o arquivo JSON.</p>';
                }
            });
    }

    // Função para exibir vídeos
    function displayVideos(videos) {
        const videoList = document.getElementById('videoList');
        if (!videoList) return;

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

    // Função para fazer a busca de vídeos
    function searchVideos() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        const termo = searchInput.value.toLowerCase();
        const resultado = allVideos.filter(video =>
            video.titulo.toLowerCase().includes(termo) ||
            video.descricao.toLowerCase().includes(termo)
        );

        displayVideos(resultado);
    }

    // Função para ativar o Dark Mode
    function setupDarkModeToggle() {
        const toggle = document.getElementById('toggleMode');
        if (toggle) {
            toggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
            });
        }
    }

    // Setup inicial
    loadVideos();
    setupDarkModeToggle();

    // Configurar a busca (quando clicar no botão de buscar)
    const searchButton = document.querySelector('button');
    if (searchButton) {
        searchButton.addEventListener('click', searchVideos);
    }
});
