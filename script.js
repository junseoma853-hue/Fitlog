const form = document.getElementById("log-form");
const logBody = document.getElementById("log-body");

// 기존 기록 불러오기
let logs = JSON.parse(localStorage.getItem("fitlog_records")) || [];
renderTable();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const exercise = document.getElementById("exercise").value.trim();
  const duration = document.getElementById("duration").value.trim();
  const calories = document.getElementById("calories").value.trim();

  if (!exercise || !duration || !calories) return;

  const newLog = {
    date: new Date().toLocaleDateString(),
    exercise,
    duration,
    calories,
  };

  logs.push(newLog);
  localStorage.setItem("fitlog_records", JSON.stringify(logs));
  renderTable();

  form.reset();
});

function renderTable() {
  logBody.innerHTML = "";
  logs.forEach((log) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${log.date}</td>
      <td>${log.exercise}</td>
      <td>${log.duration}</td>
      <td>${log.calories}</td>
    `;
    logBody.appendChild(row);
  });
}