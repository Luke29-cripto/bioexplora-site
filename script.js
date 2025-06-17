document.addEventListener('DOMContentLoaded', () => {
    let allVideos = [];
    const videoList = document.getElementById('videoList');
    const searchInput = document.getElementById('searchInput');
    const toggleButton = document.getElementById('toggleMode');
    const searchButton = document.getElementById('searchButton');
    const categorySelect = document.getElementById('categorySelect');
    const resultCount = document.getElementById('resultCount');
    const titleTyping = document.getElementById('typingTitle');

    // 1. Efeito de digitação no título
    const siteTitle = "🌱 BioExplora - Portal de Biologia";
    let charIndex = 0;
    function typeEffect() {
        if (titleTyping) {
            if (charIndex < siteTitle.length) {
                titleTyping.textContent += siteTitle.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 70);
            }
        }
    }
    typeEffect();

    // 2. Mensagem de boas-vindas
    function welcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerText = "Bem-vindo ao BioExplora! 🌿 Explore os vídeos da Profe Ju.";
        document.body.insertBefore(welcomeDiv, document.body.firstChild);

        setTimeout(() => {
            welcomeDiv.style.opacity = '0';
            setTimeout(() => welcomeDiv.remove(), 2000);
        }, 3000);
    }
    welcomeMessage();

    // 3. Dark Mode Toggle
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // 4. Função para carregar os vídeos
    function loadVideos() {
        fetch('./data/videos.json')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar JSON');
                return response.json();
            })
            .then(data => {
                allVideos = data;
                populateCategories(allVideos);
                displayVideos(allVideos);
            })
            .catch(error => {
                console.error(error);
                if (videoList) videoList.innerHTML = '<p>Erro ao carregar vídeos.</p>';
            });
    }

    // 5. Exibir vídeos na tela
    function displayVideos(videos) {
        if (!videoList) return;
        videoList.innerHTML = '';

        if (videos.length === 0) {
            videoList.innerHTML = '<p>Nenhum vídeo encontrado.</p>';
            resultCount.textContent = '0 vídeo(s)';
            return;
        }

        resultCount.textContent = `${videos.length} vídeo(s) encontrado(s)`;

        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card animate-card';

            card.innerHTML = `
                <h3>${video.titulo}</h3>
                <p>${video.descricao}</p>
                <p class="category-tag">${video.categoria || 'Categoria: Geral'}</p>
                <a href="${video.link}" target="_blank">Assistir</a>
            `;
            videoList.appendChild(card);
        });
    }

    // 6. Função de Busca
    function searchVideos() {
        if (!searchInput) return;

        const termo = searchInput.value.trim().toLowerCase();
        const categoriaSelecionada = categorySelect.value;

        let resultado = allVideos;

        if (termo !== '') {
            resultado = resultado.filter(video =>
                video.titulo.toLowerCase().includes(termo) ||
                video.descricao.toLowerCase().includes(termo)
            );
        }

        if (categoriaSelecionada !== 'todas') {
            resultado = resultado.filter(video =>
                (video.categoria || '').toLowerCase() === categoriaSelecionada
            );
        }

        displayVideos(resultado);
        scrollToResults();
    }

    // 7. Popular select de categorias
    function populateCategories(videos) {
        if (!categorySelect) return;

        const categorias = new Set();
        videos.forEach(video => {
            if (video.categoria) categorias.add(video.categoria.toLowerCase());
        });

        categorySelect.innerHTML = `
            <option value="todas">Todas as Categorias</option>
        `;

        categorias.forEach(cat => {
            categorySelect.innerHTML += `<option value="${cat}">${capitalize(cat)}</option>`;
        });
    }

    // 8. Função para deixar as categorias com primeira letra maiúscula
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // 9. Animação de scroll suave até os resultados
    function scrollToResults() {
        const y = videoList.offsetTop - 50;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // 10. Eventos
    if (searchButton) searchButton.addEventListener('click', searchVideos);
    if (categorySelect) categorySelect.addEventListener('change', searchVideos);

    // 11. Pressionar Enter no campo de busca
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchVideos();
            }
        });
    }

    // 12. Efeito de fade nos cards
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    // Observar quando os cards aparecem
    const observeCards = () => {
        document.querySelectorAll('.video-card').forEach(card => {
            observer.observe(card);
        });
    };

    // Rodar após exibir vídeos
    const originalDisplayVideos = displayVideos;
    displayVideos = function(videos) {
        originalDisplayVideos(videos);
        observeCards();
    };

    // Carregar tudo
    loadVideos();
});
