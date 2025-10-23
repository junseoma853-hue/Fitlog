// ✅ 운동 루틴 추가
const input = document.getElementById("routine-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("routine-list");

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return alert("운동을 입력하세요!");
  const item = document.createElement("div");
  item.className = "routine-item";
  item.innerHTML = `
    <span>${text}</span>
    <button class="done-btn">✔ 완료</button>
  `;
  list.appendChild(item);
  input.value = "";

  item.querySelector(".done-btn").addEventListener("click", () => {
    item.style.textDecoration = "line-through";
    item.style.opacity = "0.6";
  });
});

// ✅ 타이머 기능
let timer;
let seconds = 0;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTime() {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  timeDisplay.textContent = `${min}:${sec}`;
}

startBtn.addEventListener("click", () => {
  if (timer) return;
  timer = setInterval(() => {
    seconds++;
    updateTime();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  updateTime();
});

updateTime();