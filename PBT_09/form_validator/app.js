// ===== Bài B3 — Form Validator (real-time) =====

const form = document.querySelector("#signupForm");
const submitBtn = document.querySelector("#submitBtn");
const modalRoot = document.querySelector("#modalRoot");

const fields = {
  name:     document.querySelector("#name"),
  email:    document.querySelector("#email"),
  password: document.querySelector("#password"),
  confirm:  document.querySelector("#confirm"),
  phone:    document.querySelector("#phone"),
};

// Trạng thái valid của từng field
const valid = { name: false, email: false, password: false, confirm: false, phone: false };

// Helper hiển thị thông báo + viền màu
function setStatus(input, ok, message) {
  const msg = input.parentElement.querySelector(".msg");
  input.classList.toggle("valid", ok);
  input.classList.toggle("invalid", !ok && input.value.length > 0);
  if (msg && !msg.id) { // không ghi đè #strengthText
    msg.textContent = message;
    msg.className = "msg " + (ok ? "ok" : "err");
  }
  updateSubmit();
}

function updateSubmit() {
  submitBtn.disabled = !Object.values(valid).every(Boolean);
}

// --- Tên: 2–50 ký tự ---
fields.name.addEventListener("input", () => {
  const v = fields.name.value.trim();
  valid.name = v.length >= 2 && v.length <= 50;
  setStatus(fields.name, valid.name, valid.name ? "✅ Hợp lệ" : "❌ Tên cần 2–50 ký tự");
});

// --- Email: regex ---
fields.email.addEventListener("input", () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  valid.email = re.test(fields.email.value);
  setStatus(fields.email, valid.email, valid.email ? "✅ Hợp lệ" : "❌ Email không đúng định dạng");
});

// --- Password strength meter ---
const bar = document.querySelector("#strengthBar");
const strengthText = document.querySelector("#strengthText");

function passwordStrength(pw) {
  if (pw.length < 8) return { level: "Yếu", color: "#ef4444", width: "33%", ok: false };
  const strong = /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw);
  const medium = /[a-zA-Z]/.test(pw) && /\d/.test(pw);
  if (strong) return { level: "Mạnh", color: "#22c55e", width: "100%", ok: true };
  if (medium) return { level: "Trung bình", color: "#eab308", width: "66%", ok: true };
  return { level: "Yếu", color: "#ef4444", width: "33%", ok: false };
}

fields.password.addEventListener("input", () => {
  const s = passwordStrength(fields.password.value);
  bar.style.width = s.width;
  bar.style.background = s.color;
  strengthText.textContent = fields.password.value ? "Độ mạnh: " + s.level : "";
  strengthText.className = "msg";
  strengthText.style.color = s.color;
  valid.password = s.ok;
  fields.password.classList.toggle("valid", s.ok);
  fields.password.classList.toggle("invalid", !s.ok && fields.password.value.length > 0);
  // kiểm tra lại confirm khi password đổi
  fields.confirm.dispatchEvent(new Event("input"));
  updateSubmit();
});

// --- Confirm password ---
fields.confirm.addEventListener("input", () => {
  valid.confirm = fields.confirm.value !== "" && fields.confirm.value === fields.password.value;
  setStatus(fields.confirm, valid.confirm, valid.confirm ? "✅ Khớp" : "❌ Mật khẩu không khớp");
});

// --- Phone: 10 số, tự thêm gạch 0901-234-567 ---
fields.phone.addEventListener("input", () => {
  let digits = fields.phone.value.replace(/\D/g, "").slice(0, 10);
  let formatted = digits;
  if (digits.length > 7) formatted = `${digits.slice(0,4)}-${digits.slice(4,7)}-${digits.slice(7)}`;
  else if (digits.length > 4) formatted = `${digits.slice(0,4)}-${digits.slice(4)}`;
  fields.phone.value = formatted;
  valid.phone = digits.length === 10;
  setStatus(fields.phone, valid.phone, valid.phone ? "✅ Hợp lệ" : "❌ Cần đủ 10 chữ số");
});

// --- Submit → modal thành công ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!Object.values(valid).every(Boolean)) return;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  const modal = document.createElement("div");
  modal.className = "modal";

  const h2 = document.createElement("h2"); h2.textContent = "🎉 Đăng ký thành công!";
  const ul = document.createElement("ul");
  ul.innerHTML = ""; // build bằng createElement
  [["Tên", fields.name.value], ["Email", fields.email.value], ["SĐT", fields.phone.value]]
    .forEach(([k, v]) => {
      const li = document.createElement("li");
      li.textContent = `${k}: ${v}`;
      ul.appendChild(li);
    });
  const close = document.createElement("button"); close.textContent = "Đóng";
  close.addEventListener("click", () => overlay.remove());

  modal.append(h2, ul, close);
  overlay.appendChild(modal);
  modalRoot.appendChild(overlay);
});
