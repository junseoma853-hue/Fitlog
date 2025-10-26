document.addEventListener("DOMContentLoaded", () => {
  const today = document.getElementById("today");
  const exerciseInput = document.getElementById("exercise");
  const countInput = document.getElementById("count");
  const saveBtn = document.getElementById("saveBtn");
  const recordList = document.getElementById("recordList");
  const clearBtn = document.getElementById("clearBtn");
  const goalInput = document.getElementById("goalInput");
  const setGoalBtn = document.getElementById("setGoal");
  const summary = document.getElementById("summary");

  let records = JSON.parse(localStorage.getItem("fitlog_records")) || [];
  let goal = parseInt(localStorage.getItem("fitlog_goal")) || 0;

  // 오늘 날짜 표시
  const date = new Date();
  today.textContent = `오늘 날짜: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  // 목표 표시
  if (goal > 0) summary.textContent = `현재 목표: ${goal}회`;

  renderList();

  // ✅ 운동 추가 버튼
  saveBtn.addEventListener("click", () => {
    const exercise = exerciseInput.value.trim();
    const count = parseInt(countInput.value.trim());

    if (!exercise || isNaN(count) || count <= 0) {
      alert("운동 이름과 횟수를 정확히 입력하세요!");
      return;
    }

    const record = {
      date: new Date().toLocaleDateString("ko-KR"),
      exercise,
      count,
    };

    records.push(record);
    localStorage.setItem("fitlog_records", JSON.stringify(records));

    exerciseInput.value = "";
    countInput.value = "";
    renderList();
  });

  // ✅ 목표 설정 버튼
  setGoalBtn.addEventListener("click", () => {
    const newGoal = parseInt(goalInput.value.trim());
    if (isNaN(newGoal) || newGoal <= 0) {
      alert("올바른 목표 횟수를 입력하세요!");
      return;
    }
    goal = newGoal;
    localStorage.setItem("fitlog_goal", goal);
    summary.textContent = `현재 목표: ${goal}회`;
    goalInput.value = "";
  });

  // ✅ 전체 삭제 버튼
  clearBtn.addEventListener("click", () => {
    if (confirm("정말 모든 기록을 삭제하시겠습니까?")) {
      records = [];
      localStorage.removeItem("fitlog_records");
      renderList();
      alert("기록이 삭제되었습니다!");
    }
  });

  // ✅ 리스트 렌더링
  function renderList() {
    recordList.innerHTML = "";
    if (records.length === 0) {
      recordList.innerHTML = "<li>아직 운동 기록이 없습니다.</li>";
      return;
    }

    let total = 0;
    records.forEach((r, i) => {
      total += r.count;
      const li = document.createElement("li");
      li.textContent = `${r.date} - ${r.exercise}: ${r.count}회`;
      recordList.appendChild(li);
    });

    if (goal > 0) {
      const percent = Math.min(Math.round((total / goal) * 100), 100);
      summary.textContent = `현재 총 ${total}회 / 목표 ${goal}회 (${percent}%)`;
    } else {
      summary.textContent = `현재 총 ${total}회`;
    }

    updateChart();
  }

  // ✅ 차트 업데이트 (주간 운동량)
  function updateChart() {
    const ctx = document.getElementById("chart");
    if (!ctx) return;

    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const data = new Array(7).fill(0);

    records.forEach(r => {
      const d = new Date(r.date);
      const day = d.getDay();
      const idx = (day === 0 ? 6 : day - 1);
      data[idx] += r.count;
    });

    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: "운동 횟수",
            data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
});