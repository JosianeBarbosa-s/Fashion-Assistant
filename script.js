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
