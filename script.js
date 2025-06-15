document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const temas = ['DNA', 'RNA', 'Fotossíntese', 'Ecossistemas', 'Mitose', 'Meiose'];

function buscarVideos() {
  const termo = document.getElementById('searchInput').value.toLowerCase();
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = '';

  const filtrados = temas.filter(t => t.toLowerCase().includes(termo));

  if (filtrados.length === 0) {
    resultados.innerHTML = '<li>Nenhum vídeo encontrado.</li>';
    return;
  }

  filtrados.forEach(t => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(t + ' Profe Ju')}`;
    link.textContent = t;
    link.target = '_blank';
    li.appendChild(link);
    resultados.appendChild(li);
  });
}
