// Modo claro/escuro
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Carregar tema ao abrir
window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  loadUser();
  loadHistory();
  loadNotes();
};

// Simulação de banco de usuários
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;

// Login
function login() {
  const email = prompt('Digite seu e-mail:');
  const senha = prompt('Digite sua senha:');

  if (users[email] && users[email] === senha) {
    currentUser = email;
    alert('Login bem-sucedido!');
    localStorage.setItem('currentUser', email);
    loadHistory();
    loadNotes();
  } else {
    alert('Usuário não encontrado. Por favor, registre-se.');
  }
}

// Registro
function register() {
  const email = prompt('Cadastre seu e-mail:');
  const senha = prompt('Crie uma senha:');

  if (email && senha) {
    users[email] = senha;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro realizado! Agora faça login.');
  }
}

// Carregar usuário ativo
function loadUser() {
  const user = localStorage.getItem('currentUser');
  if (user) {
    currentUser = user;
  }
}

// Histórico de pesquisas
function saveHistory(term) {
  if (!currentUser) return;
  let history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
  history.push(term);
  localStorage.setItem(`history_${currentUser}`, JSON.stringify(history));
}

function loadHistory() {
  if (!currentUser) return;
  const history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
  const historyDiv = document.getElementById('history');
  if (historyDiv) {
    historyDiv.innerHTML = '<h3>Histórico de Pesquisas:</h3><ul>' +
      history.map(item => `<li>${item}</li>`).join('') + '</ul>';
  }
}

// Bloco de notas
function saveNotes() {
  if (!currentUser) return;
  const notes = document.getElementById('notesArea').value;
  localStorage.setItem(`notes_${currentUser}`, notes);
  alert('Bloco de notas salvo!');
}

function loadNotes() {
  if (!currentUser) return;
  const notes = localStorage.getItem(`notes_${currentUser}`);
  if (document.getElementById('notesArea') && notes !== null) {
    document.getElementById('notesArea').value = notes;
  }
}

// Busca de vídeos só do canal da Profe Ju
function buscarVideos() {
  const termo = document.getElementById('searchInput').value.trim();
  if (termo === '') return;
  saveHistory(termo);

  const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(termo + ' site:youtube.com/c/ProfeJuoficial')}`;
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = `<li><a href="${link}" target="_blank">Ver vídeos sobre "${termo}" no canal da Profe Ju</a></li>`;
}

// IA Gio - Respostas pré-programadas
function perguntarGio() {
  const pergunta = prompt('Digite sua pergunta de Biologia:').toLowerCase();
  let resposta = '';

  if (pergunta.includes('dna')) resposta = 'DNA é a molécula responsável pelo armazenamento genético.';
  else if (pergunta.includes('fotossíntese')) resposta = 'Fotossíntese é o processo onde plantas produzem energia usando luz solar.';
  else if (pergunta.includes('sistema nervoso')) resposta = 'O sistema nervoso é responsável pela comunicação entre o cérebro e o corpo.';
  else resposta = 'Desculpe, ainda estou aprendendo. Pesquise o tema no canal da Profe Ju!';

  alert(`Gio diz: ${resposta}`);
}

// Criador de Resumo simples
function gerarResumo() {
  const termo = document.getElementById('searchInput').value.trim();
  if (!termo) return alert('Digite um tema para gerar o resumo.');

  let resumo = '';

  if (termo.toLowerCase().includes('fotossíntese')) {
    resumo = 'A fotossíntese é um processo biológico onde as plantas convertem luz solar em energia química.';
  } else if (termo.toLowerCase().includes('mitose')) {
    resumo = 'A mitose é um processo de divisão celular que resulta em duas células-filhas geneticamente idênticas.';
  } else {
    resumo = `Resumo automático sobre "${termo}": consulte os vídeos da Profe Ju para mais informações.`;
  }

  document.getElementById('resumoArea').innerText = resumo;
}
