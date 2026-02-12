
const occasion = document.getElementById("occasion");
const weather = document.getElementById("weather");
const place = document.getElementById("place");
const bodyType = document.getElementById("bodyType");
const style = document.getElementById("style");
const generateBtn = document.getElementById("generate");
const resultDiv = document.getElementById("result");
const historyDiv = document.getElementById("history");
const toggleTheme = document.getElementById("toggleTheme");
const clearHistoryBtn = document.getElementById("clearHistory"); // NOVO

let history = JSON.parse(localStorage.getItem("lookHistory")) || [];
let theme = localStorage.getItem("theme") || "light";

/* Theme */
if(theme === "dark"){
  document.body.classList.add("dark");
}

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", current);
});

/* Generate look */
function generateLook() {
  if (!occasion.value || !weather.value || !place.value || !bodyType.value || !style.value) {
    resultDiv.innerText = "Preencha todos os campos para gerar a sugestão.";
    return;
  }

  const lookText = `
Estilo ${style.value} para ${occasion.value}, clima ${weather.value}, local ${place.value}, 
tipo de corpo ${bodyType.value}. 
Composição equilibrada entre estética, conforto e identidade visual do estilo escolhido.
`;

  resultDiv.innerText = lookText;

  const lookData = {
    text: lookText,
    date: new Date().toLocaleString()
  };

  history.unshift(lookData);
  if (history.length > 6) history.pop();



const form = document.getElementById("fashion-form");
const result = document.getElementById("result");
const historyList = document.getElementById("history-list");

const fields = ["occasion", "temperature", "location", "bodyType", "style"];

const looks = [
  {
    style: "y2k",
    outfit: "Top cropped, calça baixa, tênis retrô e bolsa pequena"
  },
  {
    style: "quiet",
    outfit: "Camisa neutra de alfaiataria, calça reta e sapato minimalista"
  },
  {
    style: "streetwear",
    outfit: "Camiseta oversized, calça cargo e tênis urbano"
  },
  {
    style: "cottagecore",
    outfit: "Vestido fluido, cardigã leve e sapatilha delicada"
  },
  {
    style: "coquette",
    outfit: "Saia rodada, laço no cabelo e sapatilha balletcore"
  },
  {
    style: "glam",
    outfit: "Look marcante com brilho, salto e acessórios ousados"
  }
];

let history = JSON.parse(localStorage.getItem("lookHistory")) || [];

function savePreferences(data) {
  localStorage.setItem("preferences", JSON.stringify(data));
}

function loadPreferences() {
  const saved = JSON.parse(localStorage.getItem("preferences"));
  if (!saved) return;

  fields.forEach(field => {
    if (saved[field]) {
      document.getElementById(field).value = saved[field];
    }
  });
}

function saveHistory(item) {
  history.unshift(item);
  history = history.slice(0, 5);

  localStorage.setItem("lookHistory", JSON.stringify(history));
  renderHistory();
}


/* Render history */
function renderHistory() {
  historyDiv.innerHTML = "";

  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `<strong>${item.date}</strong><br><br>${item.text}`;
    historyDiv.appendChild(div);
  });
}

/* BOTÃO LIMPAR HISTÓRICO */
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("lookHistory");
  renderHistory();
});

generateBtn.addEventListener("click", generateLook);


function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(h => {
    const li = document.createElement("li");
    li.textContent = h;
    historyList.appendChild(li);
  });
}

function getLookByStyle(style) {
  return looks.find(l => l.style === style);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {};
  fields.forEach(field => {
    data[field] = document.getElementById(field).value;
  });

  savePreferences(data);

  const look = getLookByStyle(data.style);

  const text = look
    ? `✨ Look sugerido: ${look.outfit}`
    : "Escolha peças versáteis e confortáveis para a ocasião 😉";

  result.textContent = text;
  result.classList.remove("show");

  setTimeout(() => {
    result.classList.add("show");
  }, 100);

  saveHistory(text);
});

loadPreferences();


renderHistory();

}
