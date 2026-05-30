// ===== Bài B2 — Interactive Product Catalog (Vanilla JS) =====

const products = [
  { id: 1,  name: "iPhone 16",    price: 25990000, category: "phone",     image: "https://placehold.co/200?text=iPhone+16",  rating: 4.5, inStock: true },
  { id: 2,  name: "Samsung S24",  price: 22990000, category: "phone",     image: "https://placehold.co/200?text=Galaxy+S24", rating: 4.4, inStock: true },
  { id: 3,  name: "Pixel 9",      price: 19990000, category: "phone",     image: "https://placehold.co/200?text=Pixel+9",    rating: 4.6, inStock: false },
  { id: 4,  name: "MacBook Pro",  price: 45990000, category: "laptop",    image: "https://placehold.co/200?text=MacBook",    rating: 4.8, inStock: true },
  { id: 5,  name: "Dell XPS 15",  price: 35990000, category: "laptop",    image: "https://placehold.co/200?text=Dell+XPS",   rating: 4.7, inStock: true },
  { id: 6,  name: "ThinkPad X1",  price: 32990000, category: "laptop",    image: "https://placehold.co/200?text=ThinkPad",   rating: 4.5, inStock: false },
  { id: 7,  name: "iPad Air",     price: 16990000, category: "tablet",    image: "https://placehold.co/200?text=iPad+Air",   rating: 4.6, inStock: true },
  { id: 8,  name: "Xiaomi Pad 6", price: 7990000,  category: "tablet",    image: "https://placehold.co/200?text=Xiaomi+Pad", rating: 4.2, inStock: true },
  { id: 9,  name: "Galaxy Tab S9",price: 18990000, category: "tablet",    image: "https://placehold.co/200?text=Tab+S9",     rating: 4.3, inStock: true },
  { id: 10, name: "AirPods Pro",  price: 6990000,  category: "accessory", image: "https://placehold.co/200?text=AirPods",    rating: 4.3, inStock: true },
  { id: 11, name: "Galaxy Buds",  price: 3490000,  category: "accessory", image: "https://placehold.co/200?text=Buds",       rating: 4.1, inStock: true },
  { id: 12, name: "Logitech MX",  price: 2490000,  category: "accessory", image: "https://placehold.co/200?text=MX+Master",  rating: 4.9, inStock: true },
];

const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#sort");
const catNav = document.querySelector("#categories");
const cartBadge = document.querySelector("#cartBadge");
const modalRoot = document.querySelector("#modalRoot");

let state = { category: "all", keyword: "", sort: "default" };
let cartCount = 0;

const formatPrice = (n) => n.toLocaleString("vi-VN") + "đ";

// Render các nút category từ dữ liệu
function renderCategories() {
  const cats = ["all", ...new Set(products.map(p => p.category))];
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-btn" + (cat === "all" ? " active" : "");
    btn.textContent = cat === "all" ? "Tất cả" : cat;
    btn.dataset.cat = cat;
    catNav.appendChild(btn);
  });
}

// Lọc + sắp xếp rồi trả mảng để render
function getVisibleProducts() {
  let list = products.filter(p =>
    (state.category === "all" || p.category === state.category) &&
    p.name.toLowerCase().includes(state.keyword.toLowerCase())
  );
  switch (state.sort) {
    case "price-asc":  list = [...list].sort((a, b) => a.price - b.price); break;
    case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
    case "name":       list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
    case "rating":     list = [...list].sort((a, b) => b.rating - a.rating); break;
  }
  return list;
}

// Tạo 1 card bằng createElement
function createCard(p) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = p.id;

  const img = document.createElement("img");
  img.src = p.image; img.alt = p.name;

  const info = document.createElement("div");
  info.className = "info";

  const h3 = document.createElement("h3"); h3.textContent = p.name;
  const price = document.createElement("p"); price.className = "price"; price.textContent = formatPrice(p.price);
  const rating = document.createElement("p"); rating.className = "rating"; rating.textContent = "★ " + p.rating;
  const add = document.createElement("button");
  add.className = "add"; add.textContent = p.inStock ? "Thêm giỏ" : "Hết hàng";
  add.disabled = !p.inStock;

  info.append(h3, price, rating, add);
  if (!p.inStock) {
    const out = document.createElement("span"); out.className = "out"; out.textContent = " (hết hàng)";
    h3.appendChild(out);
  }
  card.append(img, info);
  return card;
}

function renderProducts() {
  grid.innerHTML = "";
  const list = getVisibleProducts();
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty"; empty.textContent = "Không tìm thấy sản phẩm.";
    grid.appendChild(empty);
    return;
  }
  list.forEach(p => grid.appendChild(createCard(p)));
}

// Modal chi tiết (tạo bằng JS)
function openModal(p) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = ""; // sẽ build bằng createElement

  const modal = document.createElement("div");
  modal.className = "modal";

  const close = document.createElement("button");
  close.className = "close"; close.textContent = "×";

  const img = document.createElement("img"); img.src = p.image; img.alt = p.name;
  const h2 = document.createElement("h2"); h2.textContent = p.name;
  const cat = document.createElement("p"); cat.textContent = "Danh mục: " + p.category;
  const price = document.createElement("p"); price.className = "price"; price.textContent = formatPrice(p.price);
  const rating = document.createElement("p"); rating.className = "rating"; rating.textContent = "Đánh giá: ★ " + p.rating;

  modal.append(close, img, h2, cat, price, rating);
  overlay.appendChild(modal);
  modalRoot.appendChild(overlay);

  const remove = () => overlay.remove();
  close.addEventListener("click", remove);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) remove(); });
}

// ----- Events (event delegation cho grid) -----
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const p = products.find(p => p.id === Number(card.dataset.id));

  if (e.target.classList.contains("add")) {
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.classList.remove("hidden");
    e.stopPropagation();   // không mở modal khi bấm "Thêm giỏ"
    return;
  }
  openModal(p);
});

searchInput.addEventListener("input", (e) => { state.keyword = e.target.value; renderProducts(); });
sortSelect.addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

catNav.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cat-btn")) return;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  state.category = e.target.dataset.cat;
  renderProducts();
});

document.querySelector("#darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Init
renderCategories();
renderProducts();
