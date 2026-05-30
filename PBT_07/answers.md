# PHIẾU BÀI TẬP 07 — JavaScript Basics

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5
- **Trường:** Đại học Thủy Lợi

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const

| Đoạn | Output | Giải thích |
|------|--------|-----------|
| 1 | `undefined` | **Hoisting**: khai báo `var x` được kéo lên đầu scope nhưng phép gán `= 5` thì không. Lúc `console.log(x)` chạy, `x` đã tồn tại nhưng chưa gán → `undefined`. |
| 2 | `ReferenceError` | `let y` cũng được hoist nhưng nằm trong **TDZ (Temporal Dead Zone)** — không truy cập được trước dòng khai báo → ném lỗi *Cannot access 'y' before initialization*. |
| 3 | `TypeError` | `const` không cho gán lại → *Assignment to constant variable*. |
| 4 | `[1, 2, 3, 4]` | `const` chỉ khóa **binding** (không trỏ sang mảng khác), còn **nội dung** mảng vẫn thay đổi được → `push` hợp lệ. |
| 5 | `Trong block: 2` rồi `Ngoài block: 1` | `let` có **block scope**: biến `a` trong `{}` là biến *khác* với `a` ngoài, không ghi đè. |

Kết quả bất ngờ nhất: đoạn 1 ra `undefined` thay vì lỗi (do hoisting), còn đoạn 2 lại lỗi (do TDZ) — cùng "dùng trước khai báo" nhưng `var` và `let` hành xử khác nhau.

### Câu A2 — Data Types & Coercion

| Biểu thức | Kết quả | |
|-----------|---------|---|
| `typeof null` | `"object"` | lỗi lịch sử của JS |
| `typeof undefined` | `"undefined"` | |
| `typeof NaN` | `"number"` | NaN vẫn thuộc kiểu number |
| `"5" + 3` | `"53"` | có string → `+` nối chuỗi |
| `"5" - 3` | `2` | `-` không nối chuỗi → ép cả 2 về số |
| `"5" * "3"` | `15` | `*` ép về số |
| `true + true` | `2` | `true` ép thành `1` |
| `[] + []` | `""` | mảng → chuỗi rỗng, nối lại = "" |
| `[] + {}` | `"[object Object]"` | `[]`→"", `{}`→"[object Object]" |
| `{} + []` | `"[object Object]"` (khi là biểu thức) | ⚠️ nếu `{}` đứng đầu *câu lệnh* sẽ bị coi là block rỗng, khi đó `+[]` = `0` |

**Tại sao `"5" + 3` khác `"5" - 3`?**
Toán tử `+` bị **quá tải**: nếu một toán hạng là chuỗi, nó làm phép **nối chuỗi** → `"5"+3 = "53"`. Toán tử `-` không có nghĩa nối chuỗi nên JS **ép kiểu cả hai về số** rồi trừ → `"5"-3 = 2`.

### Câu A3 — == vs ===

| Biểu thức | Kết quả |
|-----------|---------|
| `5 == "5"` | `true` (ép kiểu rồi so sánh) |
| `5 === "5"` | `false` (khác kiểu) |
| `null == undefined` | `true` |
| `null === undefined` | `false` |
| `NaN == NaN` | `false` (NaN không bằng chính nó) |
| `0 == false` | `true` |
| `0 === false` | `false` (number vs boolean) |
| `"" == false` | `true` |

**Quy tắc:** Luôn dùng `===` (strict equality). `==` ép kiểu ngầm gây nhiều kết quả khó lường (như `0 == ""`, `null == undefined`); `===` so sánh cả giá trị lẫn kiểu nên rõ ràng, ít bug.

### Câu A4 — Truthy & Falsy

**8 giá trị Falsy:** `false`, `0`, `-0`, `0n` (BigInt 0), `""` (chuỗi rỗng), `null`, `undefined`, `NaN`. Mọi giá trị khác là truthy.

| Câu | In? | Lý do |
|-----|-----|-------|
| `if ("0")` | ✅ In **A** | chuỗi không rỗng → truthy |
| `if ("")` | ❌ | chuỗi rỗng → falsy |
| `if ([])` | ✅ In **C** | mảng (kể cả rỗng) là object → truthy |
| `if ({})` | ✅ In **D** | object → truthy |
| `if (null)` | ❌ | falsy |
| `if (0)` | ❌ | falsy |
| `if (-1)` | ✅ In **G** | số khác 0 → truthy |
| `if (" ")` | ✅ In **H** | chuỗi 1 dấu cách → không rỗng → truthy |

→ In ra: **A, C, D, G, H**.

### Câu A5 — Template Literals

```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

---

## PHẦN C — SUY LUẬN

### Câu C1 — Debug JavaScript

Các lỗi tìm được:

1. **`if (giaSauGiam = 0)`** — dùng `=` (gán) thay vì `===` (so sánh). Nó gán `giaSauGiam = 0` rồi điều kiện thành falsy. Sửa: `if (giaSauGiam === 0)`.
2. **Input là chuỗi:** `tinhGiaGiamGia("100000", 20)` truyền chuỗi `"100000"`. Phép `*` may mắn ép được, nhưng nên ép số rõ ràng và validate. Sửa: `giaBan = Number(giaBan);` + kiểm tra `Number.isNaN`.
3. **Kiểu trả về không nhất quán:** lúc trả chuỗi lỗi, lúc trả số. Khó dùng lại. Nên thống nhất (ví dụ throw lỗi hoặc trả object `{ok, value}`).
4. **Thiếu dấu `;`** ở nhiều dòng (dựa vào ASI — dễ sinh bug). Nên thêm đầy đủ.
5. **`for (var i...)` + `setTimeout`** — lỗi closure: vì `var` có function scope, cả 5 callback dùng *chung* một biến `i`; khi callback chạy (sau 1s) thì `i` đã = 5 → in ra `Item 5` năm lần. Sửa bằng `let i` (block scope, mỗi vòng lặp một bản `i` riêng) → in `Item 0..4`.
6. **Hệ quả của lỗi 1:** sau khi sửa, khối "Sản phẩm miễn phí!" mới chạy đúng khi giá thực sự = 0 (trước đó nó luôn ghi đè giaSauGiam thành 0).

Bản sửa:

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  giaBan = Number(giaBan);
  if (Number.isNaN(giaBan)) return "Giá bán không hợp lệ";
  if (phanTramGiam < 0 || phanTramGiam > 100) return "Phần trăm giảm không hợp lệ";

  const giamGia = giaBan * phanTramGiam / 100;
  const giaSauGiam = giaBan - giamGia;

  if (giaSauGiam === 0) console.log("Sản phẩm miễn phí!");
  return giaSauGiam;
}

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log("Item " + i), 1000);  // let -> Item 0..4
}
```

### Câu C2 — Tính hóa đơn nhà hàng

Xem file `restaurant_bill.js` (đã chạy, output hóa đơn dạng khung). Logic giảm giá: tổng > 1tr → 15%, > 500k → 10%; thứ 4 cộng thêm 5%; VAT 8% trên giá sau giảm; tip 5% tùy chọn.

---

## PHẦN D — VIDEO

> Để trống theo yêu cầu.
