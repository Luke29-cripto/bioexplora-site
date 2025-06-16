document.getElementById("toggleTheme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

function login() {
    const user = document.getElementById("username").value.trim();
    if (user) {
        document.getElementById("loginSection").classList.add("hidden");
        document.querySelectorAll("section:not(#loginSection)").forEach(sec => sec.classList.remove("hidden"));
        alert(`Bem-vindo ao BioExplora, ${user}!`);
    } else {
        alert("Digite seu nome para continuar.");
    }
}

function searchContent() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const results = document.getElementById("searchResults");
    results.innerHTML = "";

    const videos = {
        "fotossíntese": "https://www.youtube.com/watch?v=KzKw4CyO2uQ",
        "célula": "https://www.youtube.com/watch?v=oa7gFRZTQHU",
        "ecologia": "https://www.youtube.com/watch?v=gVWaGzpuKDo"
    };

    if (videos[query]) {
        results.innerHTML = `<a href="${videos[query]}" target="_blank">Assista no Canal Profe Ju: ${query}</a>`;
    } else {
        results.innerHTML = "Nenhum vídeo encontrado no canal Profe Ju para este tema.";
    }
}

function saveNotes() {
    const notes = document.getElementById("notes").value;
    localStorage.setItem("bioexplora_notes", notes);
    alert("Anotações salvas com sucesso!");
}

function askAI() {
    const question = document.getElementById("aiInput").value.toLowerCase();
    const aiResponse = document.getElementById("aiResponse");

    const respostas = {
        "fotossíntese": "Fotossíntese é o processo pelo qual plantas transformam luz em energia química.",
        "célula": "A célula é a menor unidade funcional dos seres vivos.",
        "ecologia": "Ecologia estuda a relação dos seres vivos com o meio ambiente."
    };

    aiResponse.innerText = respostas[question] || "Gio: Ainda estou aprendendo! Tente outro termo de Biologia.";
}

function generateSummary() {
    const topic = document.getElementById("resumeInput").value.toLowerCase();
    const summaryResult = document.getElementById("summaryResult");

    const resumos = {
        "fotossíntese": "Resumo: Fotossíntese é um processo fundamental que converte energia solar em energia química nas plantas.",
        "célula": "Resumo: As células são as unidades básicas da vida, contendo estruturas como núcleo e citoplasma.",
        "ecologia": "Resumo: Ecologia é o ramo da biologia que estuda as interações entre organismos e seu ambiente."
    };

    summaryResult.innerText = resumos[topic] || "Nenhum resumo encontrado para esse tema.";
}

function generateMindMap(topic) {
    const mapDiv = document.getElementById("mindMap");
    mapDiv.innerHTML = `Mapa mental gerado para o tema: ${topic}. [Função futura para expansão gráfica]`;
}

const rankingTopics = ["Fotossíntese", "Célula", "Ecologia"];
const rankingList = document.getElementById("rankingList");

rankingTopics.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}º - ${item}`;
    rankingList.appendChild(li);
});
