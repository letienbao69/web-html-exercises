// ===== Bài B4 — Multi-API Dashboard (Promise.allSettled) =====
// 3 API: Open-Meteo (thời tiết), REST Countries (quốc gia), Random User.

const refreshBtn = document.querySelector("#refreshBtn");
const loadTimeEl = document.querySelector("#loadTime");

// Mỗi widget: id + hàm fetch riêng + hàm render riêng
const widgets = [
  {
    id: "widget-weather",
    fetch: async () => {
      const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current=temperature_2m,relative_humidity_2m,wind_speed_10m");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    render: (el, data) => {
      const c = data.current;
      el.innerHTML = "";
      const temp = document.createElement("div"); temp.className = "big-temp"; temp.textContent = `${Math.round(c.temperature_2m)}°C`;
      const hum = document.createElement("div"); hum.className = "row"; hum.innerHTML = `<span>Độ ẩm</span><span>${c.relative_humidity_2m}%</span>`;
      const wind = document.createElement("div"); wind.className = "row"; wind.innerHTML = `<span>Gió</span><span>${c.wind_speed_10m} km/h</span>`;
      el.append(temp, hum, wind);
    },
  },
  {
    id: "widget-country",
    fetch: async () => {
      const res = await fetch("https://restcountries.com/v3.1/name/vietnam?fields=name,capital,population,flag,region");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    render: (el, data) => {
      const c = data[0];
      el.innerHTML = "";
      const flag = document.createElement("div"); flag.className = "country-flag"; flag.textContent = c.flag;
      const cap = document.createElement("div"); cap.className = "row"; cap.innerHTML = `<span>Thủ đô</span><span>${c.capital[0]}</span>`;
      const pop = document.createElement("div"); pop.className = "row"; pop.innerHTML = `<span>Dân số</span><span>${c.population.toLocaleString("vi-VN")}</span>`;
      const reg = document.createElement("div"); reg.className = "row"; reg.innerHTML = `<span>Khu vực</span><span>${c.region}</span>`;
      el.append(flag, cap, pop, reg);
    },
  },
  {
    id: "widget-users",
    fetch: async () => {
      const res = await fetch("https://randomuser.me/api/?results=4&nat=us");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    render: (el, data) => {
      el.innerHTML = "";
      data.results.forEach(u => {
        const row = document.createElement("div"); row.className = "user-row";
        const img = document.createElement("img"); img.src = u.picture.thumbnail; img.alt = "";
        const span = document.createElement("span"); span.textContent = `${u.name.first} ${u.name.last}`;
        row.append(img, span);
        el.appendChild(row);
      });
    },
  },
];

function setWidgetLoading(id) {
  const el = document.querySelector(`#${id} .content`);
  el.innerHTML = '<div class="loading"><div class="spinner"></div>Đang tải...</div>';
}
function setWidgetError(id, message) {
  const el = document.querySelector(`#${id} .content`);
  el.innerHTML = "";
  const div = document.createElement("div"); div.className = "widget-error"; div.textContent = "⚠️ " + message;
  el.appendChild(div);
}

async function loadDashboard() {
  refreshBtn.disabled = true;
  loadTimeEl.textContent = "";
  const start = Date.now();

  // Hiện loading cho tất cả widget
  widgets.forEach(w => setWidgetLoading(w.id));

  // Gọi song song — 1 API lỗi KHÔNG làm hỏng widget khác
  const results = await Promise.allSettled(widgets.map(w => w.fetch()));

  results.forEach((result, i) => {
    const w = widgets[i];
    const el = document.querySelector(`#${w.id} .content`);
    if (result.status === "fulfilled") {
      try { w.render(el, result.value); }
      catch (e) { setWidgetError(w.id, "Lỗi hiển thị dữ liệu"); }
    } else {
      setWidgetError(w.id, result.reason.message);
    }
  });

  loadTimeEl.textContent = `Tải xong trong ${Date.now() - start}ms`;
  refreshBtn.disabled = false;
}

refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
