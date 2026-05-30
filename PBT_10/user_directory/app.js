// ===== Bài B2 — User Directory CRUD (JSONPlaceholder) =====
// Lưu ý: JSONPlaceholder là API giả lập — POST/PUT/DELETE trả về kết quả
// "như thật" nhưng KHÔNG lưu trên server. Ta cập nhật danh sách phía client.

// -------- API LAYER --------
const api = {
  baseURL: "https://jsonplaceholder.typicode.com",

  async getUsers() {
    const res = await fetch(`${this.baseURL}/users`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async getUser(id) {
    const res = await fetch(`${this.baseURL}/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async createUser(data) {
    const res = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async updateUser(id, data) {
    const res = await fetch(`${this.baseURL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async deleteUser(id) {
    const res = await fetch(`${this.baseURL}/users/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  },
};

// -------- UI LAYER --------
const grid = document.querySelector("#userGrid");
const toast = document.querySelector("#toast");
const modalRoot = document.querySelector("#modalRoot");

const ui = {
  showLoading() {
    grid.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const sk = document.createElement("div");
      sk.className = "skeleton";
      sk.innerHTML = '<div class="line"></div><div class="line short"></div><div class="line short"></div>';
      grid.appendChild(sk);
    }
  },
  renderUsers(users) {
    grid.innerHTML = "";
    if (users.length === 0) {
      const p = document.createElement("p");
      p.textContent = "Không có user nào.";
      p.style.padding = "24px";
      grid.appendChild(p);
      return;
    }
    users.forEach(u => grid.appendChild(this.createCard(u)));
  },
  createCard(u) {
    const card = document.createElement("div");
    card.className = "user-card";
    card.dataset.id = u.id;

    const h3 = document.createElement("h3"); h3.textContent = u.name;
    const email = document.createElement("p"); email.textContent = "📧 " + u.email;
    const phone = document.createElement("p"); phone.textContent = "📞 " + (u.phone || "—");
    const company = document.createElement("p"); company.textContent = "🏢 " + (u.company?.name || "—");

    const btns = document.createElement("div"); btns.className = "btns";
    const editBtn = document.createElement("button"); editBtn.className = "edit"; editBtn.textContent = "Sửa";
    const delBtn = document.createElement("button"); delBtn.className = "del"; delBtn.textContent = "Xóa";
    btns.append(editBtn, delBtn);

    card.append(h3, email, phone, company, btns);
    return card;
  },
  showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add("hidden"), 2500);
  },
};

// -------- STATE --------
let users = [];

async function init() {
  ui.showLoading();
  try {
    users = await api.getUsers();
    ui.renderUsers(users);
  } catch (err) {
    grid.innerHTML = "";
    ui.showToast("Lỗi tải danh sách: " + err.message, "error");
  }
}

// SEARCH (client-side)
document.querySelector("#search").addEventListener("input", (e) => {
  const kw = e.target.value.toLowerCase();
  ui.renderUsers(users.filter(u =>
    u.name.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw)
  ));
});

// Form modal dùng cho cả Create và Update
function openForm(user = null) {
  const isEdit = !!user;
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <h2>${isEdit ? "Sửa user" : "Thêm user"}</h2>
    <label>Tên</label><input id="f-name" value="${isEdit ? user.name : ""}">
    <label>Email</label><input id="f-email" value="${isEdit ? user.email : ""}">
    <label>Điện thoại</label><input id="f-phone" value="${isEdit ? (user.phone || "") : ""}">
    <div class="modal-btns">
      <button class="cancel">Hủy</button>
      <button class="save">${isEdit ? "Cập nhật" : "Tạo"}</button>
    </div>`;
  overlay.appendChild(modal);
  modalRoot.appendChild(overlay);

  modal.querySelector(".cancel").addEventListener("click", () => overlay.remove());
  modal.querySelector(".save").addEventListener("click", async () => {
    const data = {
      name: modal.querySelector("#f-name").value.trim(),
      email: modal.querySelector("#f-email").value.trim(),
      phone: modal.querySelector("#f-phone").value.trim(),
    };
    if (!data.name || !data.email) { ui.showToast("Tên và email là bắt buộc", "error"); return; }
    try {
      if (isEdit) {
        const updated = await api.updateUser(user.id, data);
        const idx = users.findIndex(u => u.id === user.id);
        users[idx] = { ...users[idx], ...updated };
        ui.showToast("Đã cập nhật user");
      } else {
        const created = await api.createUser(data);
        // JSONPlaceholder luôn trả id = 11; ta gán id tạm để hiển thị
        users.unshift({ ...data, id: created.id || Date.now(), company: { name: "—" } });
        ui.showToast("Đã thêm user");
      }
      ui.renderUsers(users);
      overlay.remove();
    } catch (err) {
      ui.showToast("Lỗi: " + err.message, "error");
    }
  });
}

document.querySelector("#addBtn").addEventListener("click", () => openForm());

// Event delegation cho Edit / Delete
grid.addEventListener("click", async (e) => {
  const card = e.target.closest(".user-card");
  if (!card) return;
  const id = Number(card.dataset.id);
  const user = users.find(u => u.id === id);

  if (e.target.classList.contains("edit")) {
    openForm(user);
  } else if (e.target.classList.contains("del")) {
    if (!confirm(`Xóa user "${user.name}"?`)) return;
    try {
      await api.deleteUser(id);
      users = users.filter(u => u.id !== id);
      ui.renderUsers(users);
      ui.showToast("Đã xóa user");
    } catch (err) {
      ui.showToast("Lỗi xóa: " + err.message, "error");
    }
  }
});

init();
