# PHIẾU BÀI TẬP 10 — Async JavaScript & API Integration

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5
- **Trường:** Đại học Thủy Lợi

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

**Thứ tự output:**

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

**Giải thích Event Loop:**
- Code đồng bộ chạy trước trên call stack → in `1 - Start`, `4 - End`.
- `Promise.then` đưa callback vào **Microtask Queue**; `setTimeout` đưa vào **Macrotask Queue**.
- Sau khi stack rỗng, Event Loop **vét sạch Microtask trước** → in `3 - Promise`, rồi `6 - Promise 2` (và `6` đăng ký thêm 1 setTimeout nested vào macrotask).
- Hết microtask mới tới **Macrotask**: `2 - Timeout 0ms` (đăng ký sớm nhất, delay 0), rồi `7 - Nested timeout` (delay 0 nhưng đăng ký sau), cuối cùng `5 - Timeout 100ms` (delay lớn hơn nên tới hạn muộn nhất).

Tóm lại: **đồng bộ → microtask (Promise) → macrotask (setTimeout)**.

### Câu A2 — Fetch API

1. `await fetch(...)`: `fetch` trả về một **Promise** giải quyết thành đối tượng `Response`. Cần `await` để chờ Promise đó hoàn tất rồi mới lấy `Response` ra dùng (nếu không sẽ nhận về Promise chưa resolve).
2. `response.ok`: là `true` khi status trong khoảng 200–299; `false` với các status lỗi. Ví dụ: `404` (không tìm thấy), `500` (lỗi server), `403` (bị từ chối).
3. `response.json()`: cũng trả về một **Promise** vì việc đọc và parse body (stream) là bất đồng bộ → cần `await` lần nữa để lấy dữ liệu đã parse.
4. `try...catch`: bắt **lỗi mạng** (mất kết nối, DNS fail — `fetch` reject) và **lỗi parse JSON** (body không phải JSON hợp lệ). Lưu ý: `fetch` **KHÔNG** tự reject với 404/500 — đó là lý do phải tự kiểm tra `response.ok` rồi `throw` để catch bắt được.

### Câu A3 — Promise States

```
            ┌─────────────┐
            │   Pending   │
            └──────┬──────┘
         resolve() │ reject()
        ┌──────────┴──────────┐
        ▼                     ▼
  ┌───────────┐         ┌───────────┐
  │ Fulfilled │         │ Rejected  │
  └───────────┘         └───────────┘
   (.then nhận           (.catch nhận
    giá trị)              lý do lỗi)
```

Một Promise chỉ chuyển trạng thái **một lần** (settled rồi thì cố định).

**Callback Hell** = lồng nhiều callback bất đồng bộ vào nhau, code thụt lề sâu, khó đọc/khó xử lý lỗi ("kim tự tháp tử thần"):

```javascript
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetail(orders[0].id, (detail) => {
      getShipping(detail.shipId, (shipping) => {
        console.log(shipping); // 4 cấp lồng nhau
      });
    });
  });
});
```

Refactor bằng async/await — phẳng, dễ đọc, try/catch tập trung:

```javascript
async function loadData() {
  try {
    const user = await getUser(1);
    const orders = await getOrders(user.id);
    const detail = await getOrderDetail(orders[0].id);
    const shipping = await getShipping(detail.shipId);
    console.log(shipping);
  } catch (err) {
    console.error("Lỗi:", err.message);
  }
}
```

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

**1. Network errors (mất mạng):** `fetch` sẽ reject → bọc `try/catch`, báo người dùng "Mất kết nối, kiểm tra mạng" và cho nút thử lại. Có thể nghe `navigator.onLine` / sự kiện `offline`.

**2. API errors theo status:**
```javascript
if (!res.ok) {
  if (res.status === 404) throw new Error("Không tìm thấy dữ liệu");
  if (res.status === 429) throw new Error("Quá nhiều yêu cầu, thử lại sau"); // có thể chờ rồi retry
  if (res.status >= 500) throw new Error("Lỗi máy chủ, vui lòng thử lại");
  throw new Error(`HTTP ${res.status}`);
}
```

**3. Timeout — `fetchWithTimeout`:**
```javascript
async function fetchWithTimeout(url, ms = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer); // luôn dọn timer
  }
}
// AbortController hủy request khi quá ms; fetch sẽ reject với lỗi AbortError.
```

**4. Retry — `fetchWithRetry`:**
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (attempt === maxRetries) throw err;          // hết lượt -> ném lỗi
      await new Promise(r => setTimeout(r, attempt * 1000)); // backoff tăng dần
    }
  }
}
```

### Câu C2 — Promise.all vs allSettled vs race vs any

| Method | Resolve khi | Reject khi | Use case |
|--------|-------------|------------|----------|
| `.all()` | **Tất cả** đều fulfilled (trả mảng kết quả) | **Bất kỳ một** cái reject (fail-fast) | Cần tất cả dữ liệu mới render (vd load profile + đơn hàng + giỏ, thiếu 1 là không hiển thị được) |
| `.allSettled()` | **Luôn** resolve sau khi tất cả settled (mảng `{status, value/reason}`) | Không bao giờ reject | Dashboard nhiều widget độc lập — 1 API lỗi không làm hỏng phần còn lại |
| `.race()` | Cái **đầu tiên** settle (fulfilled *hoặc* rejected) | Nếu cái đầu tiên đó là reject | Đặt timeout cho request: đua giữa fetch và một promise "hết giờ" |
| `.any()` | Cái **đầu tiên** fulfilled | **Tất cả** đều reject (AggregateError) | Có nhiều mirror/CDN, lấy cái nào phản hồi thành công sớm nhất |

Ví dụ thực tế:

```javascript
// .all — cần đủ 3 phần dữ liệu để dựng trang sản phẩm
const [product, reviews, related] = await Promise.all([
  fetch(`/api/products/${id}`).then(r => r.json()),
  fetch(`/api/products/${id}/reviews`).then(r => r.json()),
  fetch(`/api/products/${id}/related`).then(r => r.json()),
]);

// .allSettled — dashboard (xem file dashboard/app.js)
const results = await Promise.allSettled(apis.map(u => fetch(u).then(r => r.json())));

// .race — timeout cho request chậm
function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms)); }
const data = await Promise.race([ fetch("/api/slow").then(r => r.json()), timeout(5000) ]);

// .any — lấy mirror phản hồi sớm nhất
const res = await Promise.any([ fetch("https://cdn1/file"), fetch("https://cdn2/file"), fetch("https://cdn3/file") ]);
```

---

## PHẦN D — VIDEO

> Để trống theo yêu cầu.
