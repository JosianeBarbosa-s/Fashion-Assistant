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
renderHistory();
