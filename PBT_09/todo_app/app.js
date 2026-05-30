// ===== Bài B1 — Todo App (Vanilla JS) =====

const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countEl = document.querySelector("#count");
const clearBtn = document.querySelector("#clearCompleted");
const filterLinks = document.querySelectorAll(".filter");

let todos = JSON.parse(localStorage.getItem("todos") || "[]"); // [{id, text, done}]
let filter = "all";

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Tạo 1 <li> bằng createElement (KHÔNG dùng innerHTML cho item)
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item" + (todo.done ? " completed" : "");
  li.dataset.id = todo.id;

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = todo.text;

  const del = document.createElement("button");
  del.className = "del";
  del.textContent = "❌";

  li.append(span, del);
  return li;
}

function render() {
  list.innerHTML = ""; // chỉ xóa container, item tạo bằng createElement
  const visible = todos.filter(t =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );
  for (const todo of visible) list.appendChild(createTodoElement(todo));

  const left = todos.filter(t => !t.done).length;
  countEl.textContent = `${left} việc chưa xong`;
}

// Thêm todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  save();
  render();
  input.value = "";
  input.focus();
});

// EVENT DELEGATION: bind 1 lần lên #todoList
list.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.classList.contains("del")) {
    todos = todos.filter(t => t.id !== id);  // xóa
  } else if (e.target.classList.contains("text")) {
    const t = todos.find(t => t.id === id);  // toggle completed
    t.done = !t.done;
  }
  save();
  render();
});

// EDIT: double-click vào text -> input -> Enter để lưu
list.addEventListener("dblclick", (e) => {
  if (!e.target.classList.contains("text")) return;
  const li = e.target.closest(".todo-item");
  const id = Number(li.dataset.id);
  const todo = todos.find(t => t.id === id);

  const editInput = document.createElement("input");
  editInput.className = "edit-input";
  editInput.value = todo.text;
  li.replaceChild(editInput, e.target);
  editInput.focus();

  function commit() {
    const val = editInput.value.trim();
    if (val) todo.text = val;
    save();
    render();
  }
  editInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") commit();
    if (ev.key === "Escape") render();
  });
  editInput.addEventListener("blur", commit);
});

// Filter
filterLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    filterLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    filter = link.dataset.filter;
    render();
  });
});

// Clear completed
clearBtn.addEventListener("click", () => {
  todos = todos.filter(t => !t.done);
  save();
  render();
});

render(); // load lần đầu (gồm dữ liệu từ localStorage)
