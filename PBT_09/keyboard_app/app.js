// ===== Bài B4 — Keyboard Shortcuts & Accessibility =====

const images = [
  { src: "https://placehold.co/600x340?text=Ảnh+1", caption: "Ảnh 1 — Núi" },
  { src: "https://placehold.co/600x340?text=Ảnh+2", caption: "Ảnh 2 — Biển" },
  { src: "https://placehold.co/600x340?text=Ảnh+3", caption: "Ảnh 3 — Rừng" },
  { src: "https://placehold.co/600x340?text=Ảnh+4", caption: "Ảnh 4 — Sa mạc" },
  { src: "https://placehold.co/600x340?text=Ảnh+5", caption: "Ảnh 5 — Thành phố" },
];

const img = document.querySelector("#galleryImg");
const caption = document.querySelector("#caption");
const slideStatus = document.querySelector("#slideStatus");
const palette = document.querySelector("#palette");
const paletteInput = document.querySelector("#paletteInput");
const paletteList = document.querySelector("#paletteList");

let current = 0;
let slideTimer = null;

function showImage(i) {
  current = (i + images.length) % images.length; // wrap vòng
  img.src = images[current].src;
  caption.textContent = `${images[current].caption}  (${current + 1}/${images.length})`;
}
function next() { showImage(current + 1); }
function prev() { showImage(current - 1); }

function toggleSlideshow() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
    slideStatus.textContent = "Slideshow: tắt";
  } else {
    slideTimer = setInterval(next, 1500);
    slideStatus.textContent = "Slideshow: đang chạy (Space để dừng)";
  }
}

document.querySelector("#nextBtn").addEventListener("click", next);
document.querySelector("#prevBtn").addEventListener("click", prev);

// ----- Command palette -----
const commands = [
  { label: "Ảnh sau", run: next },
  { label: "Ảnh trước", run: prev },
  { label: "Play/Pause slideshow", run: toggleSlideshow },
  { label: "Về ảnh đầu", run: () => showImage(0) },
  { label: "Tới ảnh cuối", run: () => showImage(images.length - 1) },
];
let activeCmd = 0;

function openPalette() {
  palette.classList.remove("hidden");
  paletteInput.value = "";
  renderCommands("");
  paletteInput.focus();
}
function closePalette() { palette.classList.add("hidden"); }

function renderCommands(keyword) {
  const filtered = commands.filter(c => c.label.toLowerCase().includes(keyword.toLowerCase()));
  paletteList.innerHTML = "";
  activeCmd = 0;
  filtered.forEach((c, idx) => {
    const li = document.createElement("li");
    li.textContent = c.label;
    li.setAttribute("role", "option");
    if (idx === 0) li.classList.add("active");
    li.addEventListener("click", () => { c.run(); closePalette(); });
    paletteList.appendChild(li);
  });
  paletteList._filtered = filtered;
}

paletteInput.addEventListener("input", () => renderCommands(paletteInput.value));

paletteInput.addEventListener("keydown", (e) => {
  const items = paletteList.querySelectorAll("li");
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeCmd = Math.min(activeCmd + 1, items.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeCmd = Math.max(activeCmd - 1, 0);
  } else if (e.key === "Enter") {
    e.preventDefault();
    const filtered = paletteList._filtered || [];
    if (filtered[activeCmd]) { filtered[activeCmd].run(); closePalette(); }
    return;
  }
  items.forEach((li, i) => li.classList.toggle("active", i === activeCmd));
});

// ----- Global keyboard shortcuts -----
document.addEventListener("keydown", (e) => {
  // Ctrl+K mở palette
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    palette.classList.contains("hidden") ? openPalette() : closePalette();
    return;
  }
  // Esc đóng palette
  if (e.key === "Escape") { closePalette(); return; }

  // Khi palette đang mở thì không xử lý phím gallery
  if (!palette.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft") prev();
  else if (e.key === " ") { e.preventDefault(); toggleSlideshow(); }
  else if (/^[1-9]$/.test(e.key)) {
    const idx = Number(e.key) - 1;
    if (idx < images.length) showImage(idx);
  }
});

// Init
showImage(0);
