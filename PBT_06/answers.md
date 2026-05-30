# PHIẾU BÀI TẬP 06 — CSS Frameworks (Track B: TailwindCSS)

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5
- **Trường:** Đại học Thủy Lợi
- **Track đã chọn:** B — TailwindCSS

---

## PHẦN A — ĐỌC HIỂU

### Câu A1 — Utility Classes

Giải thích từng class trong đoạn HTML:

**Container ngoài:**
- `flex` → `display: flex`
- `items-center` → `align-items: center` (căn giữa theo trục dọc)
- `justify-between` → `justify-content: space-between` (đẩy 2 đầu ra mép, khoảng trống ở giữa)
- `p-4` → `padding: 1rem` (16px) cả 4 phía
- `bg-white` → `background-color: #fff`
- `shadow-md` → đổ bóng mức trung bình
- `rounded-lg` → `border-radius: 0.5rem` (8px)
- `hover:shadow-xl` → khi hover thì bóng đậm hơn (xl)
- `transition-shadow` → bật transition cho thuộc tính box-shadow
- `duration-300` → thời gian transition 300ms

**Ảnh avatar:**
- `w-16` → `width: 4rem` (64px)
- `h-16` → `height: 4rem` (64px)
- `rounded-full` → `border-radius: 9999px` (tròn hoàn toàn)
- `object-cover` → `object-fit: cover` (ảnh phủ kín khung, không méo)

**Khối text:**
- `ml-4` → `margin-left: 1rem` (16px)
- `flex-1` → `flex: 1 1 0%` (chiếm hết khoảng trống còn lại)
- `text-lg` → `font-size: 1.125rem` (18px)
- `font-semibold` → `font-weight: 600`
- `text-gray-800` → màu chữ xám đậm
- `truncate` → cắt chữ dài thành `...` (overflow ellipsis 1 dòng)
- `text-sm` → `font-size: 0.875rem` (14px)
- `text-gray-500` → màu chữ xám nhạt hơn

**Button:**
- `px-4` → padding trái/phải 1rem (16px)
- `py-2` → padding trên/dưới 0.5rem (8px)
- `bg-blue-500` → nền xanh dương mức 500
- `text-white` → chữ trắng
- `rounded-md` → bo góc 6px
- `hover:bg-blue-600` → hover thì nền xanh đậm hơn
- `focus:ring-2` → khi focus tạo viền sáng (ring) dày 2px
- `focus:ring-blue-300` → màu ring xanh nhạt

### Câu A2 — Responsive & States

**1. Prefix responsive** — Tailwind là Mobile-First: class không prefix áp dụng cho *mọi* màn hình, prefix chỉ áp dụng *từ breakpoint đó trở lên*:
- `md:` → từ ≥ 768px
- `lg:` → từ ≥ 1024px
- `xl:` → từ ≥ 1280px

`md:grid-cols-2 lg:grid-cols-4` nghĩa là: mặc định (mobile) số cột do class base quyết định (vd `grid-cols-1`), từ 768px lên thành 2 cột, từ 1024px lên thành 4 cột.

**2. State modifiers:**
- `hover:` → khi rê chuột vào element
- `focus:` → khi element được focus (click vào input, tab tới)
- `active:` → khi đang nhấn giữ
- `group-hover:` → khi hover vào phần tử cha có class `group`, phần tử con mang `group-hover:` sẽ đổi style (dùng cho hiệu ứng hover cả khối)

**3. "Ẩn trên mobile, hiện dạng flex từ tablet trở lên"** (tương đương `d-none d-md-flex`):

```html
<div class="hidden md:flex"> ... </div>
```

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Tailwind vs CSS thuần

So sánh component "product card" (mình đã viết CSS thuần ở PBT_05):

| Tiêu chí | CSS thuần | Tailwind |
|----------|-----------|----------|
| File size | HTML ngắn + ~40 dòng CSS riêng | HTML dài hơn (nhiều class), 0 dòng CSS riêng |
| Maintainability | Sửa 1 chỗ trong file CSS, áp dụng mọi card; nhưng phải nhớ tên class tự đặt | Đọc thẳng style ngay trên HTML, không phải nhảy file; nhưng class dài dễ rối |
| Reusability | Class CSS dùng lại tự nhiên | Lặp lại chuỗi class; gom lại bằng `@apply` trong file CSS hoặc tách thành component |

Ví dụ gom class lặp bằng `@apply`:
```css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600;
}
```

### Câu C2 — Performance

**1. Vì sao CSS cuối của Tailwind NHỎ HƠN Bootstrap?**
Bootstrap ship một file CSS cố định chứa *tất cả* component dù bạn dùng hay không (~200KB+). Tailwind ở bản build chỉ giữ lại đúng những utility class *thực sự xuất hiện* trong code của bạn, bỏ hết phần còn lại — nên file cuối thường chỉ vài KB đến vài chục KB.

**2. PurgeCSS / Tailwind JIT loại bỏ gì?**
Tailwind quét toàn bộ file template (HTML, JS, JSX...) tìm tên class được dùng, rồi chỉ sinh CSS cho đúng các class đó. Engine JIT (Just-In-Time) sinh class theo nhu cầu ngay khi build, loại bỏ mọi utility không được tham chiếu (kể cả các biến thể responsive/hover không dùng). Kết quả: CSS rất gọn.

> Lưu ý: dùng CDN `cdn.tailwindcss.com` thì KHÔNG có purge (tải cả engine ở client) — chỉ phù hợp học/demo. Production phải cài qua npm + build.

**3. Khi nào KHÔNG nên dùng Tailwind — 2 tình huống:**
- **Dự án nhỏ/landing tĩnh 1 trang, làm nhanh không có bước build:** thêm Tailwind (npm, config, build) là thừa; viết CSS thuần hoặc dùng CDN cho nhanh.
- **Team/khách hàng cần HTML sạch, dễ bàn giao cho người không biết Tailwind**, hoặc dự án bắt buộc tách biệt nội dung (HTML) và trình bày (CSS): nhồi hàng chục class vào HTML khiến markup khó đọc và khó bàn giao.

---

## PHẦN D — VIDEO

> Để trống theo yêu cầu.
