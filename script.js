// script.js

// Simulação de banco de dados simples let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {}; let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || null;

// Modo claro/escuro const toggleTheme = document.getElementById('toggle-theme'); toggleTheme.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });

// IA de ajuda simples (respostas simuladas) function respostaIA(pergunta) { const respostas = { 'fotossíntese': 'A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia química.', 'dna': 'O DNA é a molécula que carrega as informações genéticas dos seres vivos.', 'mitose': 'Mitose é o processo de divisão celular que gera duas células-filhas idênticas.', 'meiose': 'Meiose é uma divisão celular que reduz pela metade o número de cromossomos, formando gametas.' }; pergunta = pergunta.toLowerCase(); return respostas[pergunta] || 'Desculpe, ainda estou aprendendo sobre isso!'; }

function perguntarIA() { const pergunta = document.getElementById('input-pergunta').value; const resposta = respostaIA(pergunta); document.getElementById('resposta-ia').innerText = resposta; }

// Busca de vídeos no canal da Profe Ju function buscarVideos() { const termo = document.getElementById('searchInput').value; const resultado = document.getElementById('resultados'); resultado.innerHTML = '';

const link = document.createElement('a'); link.href = https://www.youtube.com/results?search_query=${encodeURIComponent(termo + ' Profe Ju')}; link.target = '_blank'; link.innerText = Ver resultados para "${termo}" no canal da Profe Ju;

const li = document.createElement('li'); li.appendChild(link); resultado.appendChild(li);

salvarHistoricoPesquisa(termo); }

// Bloco de notas function salvarNota() { const nota = document.getElementById('blocoNota').value; if (usuarioAtual) { usuarios[usuarioAtual.email].nota = nota; localStorage.setItem('usuarios', JSON.stringify(usuarios)); alert('Nota salva!'); } else { alert('Você precisa estar logado para salvar notas.'); } }

function carregarNota() { if (usuarioAtual) { document.getElementById('blocoNota').value = usuarios[usuarioAtual.email]?.nota || ''; } }

// Histórico de pesquisas function salvarHistoricoPesquisa(termo) { if (usuarioAtual) { const historico = usuarios[usuarioAtual.email].historico || []; historico.push(termo); usuarios[usuarioAtual.email].historico = historico; localStorage.setItem('usuarios', JSON.stringify(usuarios)); } }

function mostrarHistorico() { if (usuarioAtual) { const historico = usuarios[usuarioAtual.email].historico || []; alert('Seu histórico de pesquisas:\n' + historico.join('\n')); } }

// Login e cadastro function cadastrar() { const email = prompt('Digite seu e-mail:'); const senha = prompt('Crie uma senha:'); if (!usuarios[email]) { usuarios[email] = { senha, nota: '', historico: [] }; localStorage.setItem('usuarios', JSON.stringify(usuarios)); alert('Cadastro realizado!'); } else { alert('Este e-mail já está cadastrado.'); } }

function login() { const email = prompt('Digite seu e-mail:'); const senha = prompt('Digite sua senha:'); if (usuarios[email] && usuarios[email].senha === senha) { usuarioAtual = { email }; localStorage.setItem('usuarioAtual', JSON.stringify(usuarioAtual)); alert('Login realizado!'); carregarNota(); } else { alert('E-mail ou senha inválidos.'); } }

function logout() { usuarioAtual = null; localStorage.removeItem('usuarioAtual'); alert('Você saiu da conta.'); }

// Chamada de carregamento automático window.onload = () => { carregarNota(); };

