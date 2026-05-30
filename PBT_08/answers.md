# PHIẾU BÀI TẬP 08 — JavaScript Functions, Arrays & Objects

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5
- **Trường:** Đại học Thủy Lợi

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Function Declaration vs Expression vs Arrow

```javascript
// 1. Function Declaration
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
}

// 2. Function Expression
const tinhThueBaoHiem2 = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};
```

> Đề ghi object `{ thuong, thuc_nhan }` nhưng nội dung là "thuế", nên mình đặt key `thue` cho đúng nghĩa; nếu thầy yêu cầu đúng tên `thuong` thì đổi lại key.

**Hoisting có khác nhau không? CÓ.**
- **Function Declaration** được hoist *toàn bộ* (cả thân hàm) → gọi được TRƯỚC dòng khai báo:
  ```javascript
  console.log(f(5)); // chạy được
  function f(x){ return x; }
  ```
- **Function Expression / Arrow** gán vào biến: chỉ *tên biến* được hoist. Với `const`/`let` thì nằm trong TDZ → gọi trước khai báo bị `ReferenceError`; với `var` thì biến = `undefined` → gọi báo `TypeError: ... is not a function`.
  ```javascript
  console.log(g(5)); // ReferenceError (TDZ)
  const g = (x) => x;
  ```

### Câu A2 — Scope & Closure

**Đoạn 1:**
| Lệnh | Output |
|------|--------|
| `c.increment()` | `1` |
| `c.increment()` | `2` |
| `c.increment()` | `3` |
| `c.decrement()` | `2` |
| `c.getCount()` | `2` |

`counter()` trả về 3 hàm cùng "đóng gói" (closure) biến `count` của lời gọi `counter()` đó. `count` không bị thu hồi sau khi `counter()` kết thúc vì các hàm con vẫn tham chiếu tới nó → giá trị được giữ và cộng dồn.

**Đoạn 2:**
- Vòng `var`: in `var: 3` **ba lần**.
- Vòng `let`: in `let: 0`, `let: 1`, `let: 2`.

**Tại sao khác nhau:** `var` có *function scope* → cả 3 callback chia sẻ **chung một** biến `i`; khi `setTimeout` chạy (sau vòng lặp) thì `i` đã = 3. `let` có *block scope* → **mỗi vòng lặp tạo một bản `j` riêng**, mỗi callback nhớ đúng giá trị của vòng đó.

### Câu A3 — Array Methods (mỗi câu 1 dòng)

```javascript
const nums = [1,2,3,4,5,6,7,8,9,10];

1. nums.filter(n => n % 2 === 0);                                  // [2,4,6,8,10]
2. nums.map(n => n * 3);                                           // [3,6,...,30]
3. nums.reduce((a, b) => a + b, 0);                                // 55
4. nums.find(n => n > 7);                                          // 8
5. nums.some(n => n > 10);                                         // false
6. nums.every(n => n > 0);                                         // true
7. nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);     // ["Số 1 là lẻ", ...]
8. [...nums].reverse();                                            // [10,...,1] (không mutate gốc)
```

### Câu A4 — Destructuring & Spread

| Lệnh | Output | Giải thích |
|------|--------|-----------|
| `console.log(name, price, ram, color)` | `iPhone 16 25990000 8 Titan` | destructuring lồng lấy `ram`, `color` từ `specs` |
| `console.log(specs)` | **ReferenceError** | `specs: { ram, color }` chỉ "đào" vào trong, KHÔNG tạo biến `specs` |
| `updated.price` | `23990000` | spread copy rồi ghi đè `price` |
| `updated.sale` | `true` | thêm thuộc tính mới |
| `product.price` | `25990000` | gốc KHÔNG đổi (spread tạo object mới) |
| `product.specs.ram` (sau `copy.specs.ram = 16`) | `16` | ⚠️ spread là **shallow copy**: object lồng `specs` vẫn dùng chung tham chiếu, nên sửa `copy.specs` ảnh hưởng cả `product.specs` |

Muốn copy sâu (deep copy) để tránh gotcha này: `structuredClone(product)` hoặc copy thủ công từng tầng.

---

## PHẦN C — SUY LUẬN

### Câu C1 — Refactor

```javascript
const processOrders = (orders) =>
  orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({
      id, customer, total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

Từ ~30 dòng (2 vòng lặp lồng + bubble sort thủ công) còn 8 dòng: `filter` thay cặp `if`, `map` + destructuring thay việc dựng object, `sort` thay bubble sort.

### Câu C2 — miniArray

Xem file `miniarray.js` (đã chạy, pass cả 3 test). Ý chính:
- `map`: lặp, đẩy `fn(phần_tử)` vào mảng mới.
- `filter`: lặp, chỉ đẩy phần tử khi `fn(...)` trả về truthy.
- `reduce`: giữ biến tích lũy `acc`; nếu không có `initialValue` thì lấy phần tử đầu làm `acc` và bắt đầu từ index 1.

---

## PHẦN D — VIDEO

> Để trống theo yêu cầu.
