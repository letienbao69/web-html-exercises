// ===== Bài B1 — Weather App (Open-Meteo, không cần API key) =====

const form = document.querySelector("#searchForm");
const input = document.querySelector("#cityInput");
const loadingEl = document.querySelector("#loading");
const errorEl = document.querySelector("#error");
const resultEl = document.querySelector("#result");
const historyList = document.querySelector("#historyList");

let history = JSON.parse(localStorage.getItem("weatherHistory") || "[]");

// Hiện đúng 1 trong 3 state
function showState(state) {
  loadingEl.classList.toggle("hidden", state !== "loading");
  errorEl.classList.toggle("hidden", state !== "error");
  resultEl.classList.toggle("hidden", state !== "success");
}

// Mã thời tiết WMO -> mô tả + icon
const weatherCode = {
  0: ["Trời quang", "☀️"], 1: ["Ít mây", "🌤️"], 2: ["Có mây", "⛅"], 3: ["Nhiều mây", "☁️"],
  45: ["Sương mù", "🌫️"], 48: ["Sương mù", "🌫️"],
  51: ["Mưa phùn nhẹ", "🌦️"], 61: ["Mưa nhẹ", "🌧️"], 63: ["Mưa vừa", "🌧️"], 65: ["Mưa to", "🌧️"],
  71: ["Tuyết nhẹ", "🌨️"], 80: ["Mưa rào", "🌦️"], 95: ["Dông", "⛈️"],
};

async function getWeather(city) {
  showState("loading");
  try {
    // 1) Geocoding: tên thành phố -> toạ độ
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi`
    );
    if (!geoRes.ok) throw new Error(`HTTP ${geoRes.status}`);
    const geo = await geoRes.json();
    if (!geo.results || geo.results.length === 0) {
      throw new Error(`Không tìm thấy thành phố "${city}"`);
    }
    const { latitude, longitude, name, country } = geo.results[0];

    // 2) Forecast: lấy thời tiết hiện tại + độ ẩm
    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code`
    );
    if (!wRes.ok) throw new Error(`HTTP ${wRes.status}`);
    const data = await wRes.json();
    const cur = data.current;

    renderWeather({
      city: name, country,
      temp: cur.temperature_2m,
      humidity: cur.relative_humidity_2m,
      code: cur.weather_code,
    });
    addHistory(name);
  } catch (err) {
    errorEl.textContent = "⚠️ " + err.message;
    showState("error");
  }
}

function renderWeather(w) {
  const [desc, icon] = weatherCode[w.code] || ["Không rõ", "❓"];
  resultEl.innerHTML = ""; // build bằng createElement
  const h2 = document.createElement("h2"); h2.textContent = `${w.city}, ${w.country}`;
  const ic = document.createElement("div"); ic.style.fontSize = "56px"; ic.textContent = icon;
  const temp = document.createElement("div"); temp.className = "temp"; temp.textContent = `${Math.round(w.temp)}°C`;
  const d = document.createElement("p"); d.className = "desc"; d.textContent = desc;
  const meta = document.createElement("div"); meta.className = "meta";
  const hum = document.createElement("div"); hum.textContent = `💧 Độ ẩm: ${w.humidity}%`;
  meta.appendChild(hum);
  resultEl.append(h2, ic, temp, d, meta);
  showState("success");
}

function addHistory(city) {
  history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
  history.unshift(city);
  history = history.slice(0, 5); // giữ 5 gần nhất
  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => { input.value = city; getWeather(city); });
    historyList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) getWeather(city);
});

renderHistory();
