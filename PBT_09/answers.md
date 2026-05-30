# PHIẾU BÀI TẬP 09 — DOM Manipulation & Events

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5
- **Trường:** Đại học Thủy Lợi

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree

```
#app (div)
├── header
│   ├── h1  "Todo App"
│   └── nav
│       ├── a.active  "All"
│       ├── a         "Active"
│       └── a         "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button  "Add"
    └── ul#todoList
        ├── li.todo-item            "Learn HTML"
        └── li.todo-item.completed  "Learn CSS"
```

**querySelector cho từng yêu cầu:**

```javascript
document.querySelector("h1");                       // thẻ <h1>
document.querySelector("#todoForm input");          // input trong form (hoặc #todoInput)
document.querySelectorAll(".todo-item");            // tất cả .todo-item
document.querySelector("nav a.active");             // link đang active
document.querySelector("#todoList li:first-child"); // <li> đầu tiên trong #todoList
document.querySelectorAll("nav a");                 // tất cả <a> trong <nav>
```

### Câu A2 — innerHTML vs textContent

- `innerHTML`: đọc/ghi chuỗi **dưới dạng HTML** — trình duyệt sẽ *parse* và tạo node. Dùng khi cần chèn cấu trúc HTML.
- `textContent`: đọc/ghi **văn bản thuần** — mọi ký tự `<`, `>` được hiển thị nguyên văn, không tạo thẻ. Dùng khi chỉ đặt chữ (an toàn hơn, nhanh hơn).

**Lỗ hổng XSS:** nếu gán dữ liệu người dùng vào `innerHTML`, đoạn HTML/script độc trong đó sẽ được trình duyệt thực thi:

```javascript
const userInput = document.querySelector("#search").value;
// Nếu userInput = <img src=x onerror="alert('Hacked!')">
document.querySelector("#result").innerHTML = userInput; // ← chạy mã độc!
```

**Cách sửa:** dùng `textContent` (không parse HTML) khi chỉ cần hiển thị chữ:

```javascript
document.querySelector("#result").textContent = userInput; // an toàn
```

Nếu bắt buộc render HTML từ người dùng thì phải *sanitize* (vd thư viện DOMPurify) trước khi gán.

### Câu A3 — Event Bubbling

Click vào button → sự kiện đi từ trong ra ngoài (bubbling), nên output:

```
BUTTON
INNER
OUTER
```

Nếu **bỏ comment `e.stopPropagation()`** trong handler của button → sự kiện dừng lan lên cha, output chỉ còn:

```
BUTTON
```

---

## PHẦN C — DEBUG & PHÂN TÍCH

### Câu C1 — Debug DOM Code (các lỗi)

1. **`addEventListener("onclick", ...)`** cho nút decrement — tên sự kiện sai. `addEventListener` nhận tên KHÔNG có "on" → phải là `"click"`.
2. **`countDisplay = count;`** trong reset — gán đè lên biến phần tử (lại là `const` nên ném *TypeError*). Phải là `countDisplay.textContent = count;`.
3. **`historyList.innerHTML = null;`** — gán `null` sẽ thành chuỗi `"null"` hiển thị ra. Phải dùng `""`.
4. **`item.remove;`** trong clearHistory — thiếu dấu ngoặc gọi hàm. Phải là `item.remove();`.
5. **`count = localStorage.getItem("count");`** khi load — `getItem` trả **chuỗi**, các phép `count++` sau đó sẽ nối chuỗi sai. Phải ép số: `count = Number(localStorage.getItem("count")) || 0;`.
6. **Không khôi phục history** — code lưu `history` vào localStorage nhưng lúc `load` không đọc lại; thiếu logic restore (và nếu restore bằng `innerHTML` thì mất event click — nên render lại bằng createElement + event delegation).
7. **`countDisplay.innerHTML = count`** (cả 2 nút) — nên dùng `textContent` cho số (an toàn, nhanh hơn); không phải lỗi chạy nhưng là bad practice.
8. **Khi load mà localStorage trống** → `count` = `null` → hiển thị "null"; cần fallback `|| 0` (gắn với lỗi 5).

Bản sửa rút gọn các điểm chính:

```javascript
document.querySelector("#decrementBtn").addEventListener("click", () => {  // "click"
  count--;
  countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;   // sửa
  historyList.innerHTML = "";         // "" thay vì null
});

document.querySelector("#clearHistory").addEventListener("click", () => {
  historyList.querySelectorAll("li").forEach(item => item.remove()); // có ()
});

window.addEventListener("load", () => {
  count = Number(localStorage.getItem("count")) || 0;  // ép số + fallback
  countDisplay.textContent = count;
});
```

### Câu C2 — Performance

**1. Vì sao bind event lên 1000 element là bad practice?**
Mỗi `addEventListener` tốn bộ nhớ và thời gian gắn; 1000 listener làm trang nặng, khó quản lý (thêm/xóa element phải gắn/gỡ tay). **Event Delegation** giải quyết bằng cách gắn **một** listener lên phần tử cha; nhờ event bubbling, click ở con sẽ nổi lên cha, ta đọc `e.target` để biết phần tử nào được click. Ưu điểm: ít listener, tự động áp dụng cho cả element thêm sau này.

**2. DocumentFragment refactor:**

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);     // thêm vào fragment trong bộ nhớ, KHÔNG đụng DOM thật
}
document.body.appendChild(fragment); // chỉ 1 lần chèn -> 1 lần reflow
```

**Tại sao nhanh hơn:** `DocumentFragment` là cây DOM ngoài màn hình (off-screen). Thêm 1000 node vào fragment không gây *reflow/repaint* vì nó chưa nằm trong document hiển thị. Chỉ khi `appendChild(fragment)` cuối cùng, toàn bộ node mới được chèn một lần → trình duyệt chỉ tính lại layout một lần thay vì 1000 lần.

---

## PHẦN D — VIDEO

> Để trống theo yêu cầu.
