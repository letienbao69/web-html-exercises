# PHIẾU BÀI TẬP 05 — CSS Responsive & SCSS

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5
- **Trường:** Đại học Thủy Lợi

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First

**1. Thẻ meta viewport chuẩn:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích từng thuộc tính:

- `name="viewport"`: khai báo đây là thẻ cấu hình vùng nhìn (viewport) của trình duyệt trên thiết bị.
- `width=device-width`: đặt chiều rộng vùng nhìn bằng đúng chiều rộng thực của thiết bị (theo CSS pixel), thay vì chiều rộng mặc định ~980px mà mobile tự giả lập.
- `initial-scale=1.0`: mức zoom ban đầu là 100%, tức 1 CSS pixel = 1 pixel độc lập thiết bị, không phóng to/thu nhỏ lúc tải trang.

**2. Nếu THIẾU thẻ này:**

iPhone (và các trình duyệt mobile khác) sẽ giả định trang được thiết kế cho desktop và render với một viewport ảo rộng khoảng 980px, rồi thu nhỏ toàn bộ trang lại để vừa màn hình. Kết quả: trang trông như một bản desktop bị "co" nhỏ, chữ li ti, người dùng phải pinch-zoom và cuộn ngang để đọc. Các `@media` query dựa trên `min-width` cũng hiểu sai vì màn hình bị coi là rộng ~980px, nên CSS responsive gần như vô tác dụng.

**3. Mobile-First vs Desktop-First (breakpoint 768px):**

Mobile-First — viết CSS mặc định cho mobile, rồi *mở rộng* lên cho màn hình lớn bằng `min-width`:

```css
/* base = mobile */
.box { font-size: 14px; }

@media (min-width: 768px) {
  .box { font-size: 18px; } /* màn hình ≥ 768px */
}
```

Desktop-First — viết CSS mặc định cho desktop, rồi *thu hẹp* xuống cho màn hình nhỏ bằng `max-width`:

```css
/* base = desktop */
.box { font-size: 18px; }

@media (max-width: 767px) {
  .box { font-size: 14px; } /* màn hình ≤ 767px */
}
```

Tại sao Mobile-First được khuyên dùng:
- Phần lớn truy cập hiện nay đến từ điện thoại → ưu tiên trải nghiệm thiết bị yếu/nhỏ trước.
- CSS base nhẹ, máy yếu chỉ tải style tối thiểu; style phức tạp hơn chỉ thêm khi màn hình đủ lớn.
- Tư duy "tăng dần" (progressive enhancement) ít bug hơn là "gỡ bỏ dần" của desktop-first.

### Câu A2 — Breakpoints chuẩn (theo Bootstrap 5)

| Tên | Kích thước | Thiết bị đại diện | Số cột lưới sản phẩm gợi ý |
|-----|-----------|-------------------|----------------------------|
| xs  | < 576px   | Điện thoại dọc | 1 cột |
| sm  | ≥ 576px   | Điện thoại ngang / phablet | 2 cột |
| md  | ≥ 768px   | Tablet | 2–3 cột |
| lg  | ≥ 992px   | Laptop / desktop nhỏ | 3–4 cột |
| xl  | ≥ 1200px  | Desktop | 4 cột |
| xxl | ≥ 1400px  | Màn hình lớn | 4–6 cột |

### Câu A3 — Media Queries (điền bảng)

Các media query dùng `min-width` nên rule có ngưỡng *lớn nhất mà vẫn ≤ chiều rộng màn hình* sẽ thắng (ghi đè).

| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|--------------------|-----------|
| 375px (iPhone SE) | **100%** | Chưa đạt 576px → dùng rule base |
| 600px | **540px** | ≥ 576px (chưa đạt 768px) |
| 800px | **720px** | ≥ 768px (chưa đạt 992px) |
| 1000px | **960px** | ≥ 992px (chưa đạt 1200px) |
| 1400px | **1140px** | ≥ 1200px (rule cuối cùng thắng) |

### Câu A4 — SCSS Basics

**1. Variables** — lưu giá trị tái sử dụng:

```scss
$primary-color: #2563eb;
.btn { background: $primary-color; }
```

**2. Nesting** — lồng selector con trong cha cho cấu trúc gọn, dễ đọc:

```scss
.card {
  padding: 16px;
  .title { font-weight: 700; }
  &:hover { box-shadow: 0 8px 20px rgba(0,0,0,.15); }
}
```

**3. Mixins** — khối CSS tái sử dụng, nhận tham số:

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box { @include flex-center; }
```

**4. @extend / Inheritance** — kế thừa toàn bộ rule của một selector khác:

```scss
%btn-base { padding: 10px 20px; border-radius: 6px; }
.btn-primary { @extend %btn-base; background: $primary-color; }
```

**Tại sao trình duyệt KHÔNG đọc được `.scss`?**
Trình duyệt chỉ hiểu CSS thuần. SCSS là một ngôn ngữ tiền xử lý (preprocessor) với cú pháp mở rộng (biến, nesting, mixin...) mà CSS không có. Phải **biên dịch (compile)** SCSS → CSS bằng một công cụ như Dart Sass:

```bash
sass scss/style.scss responsive.css        # compile 1 lần
sass --watch scss/style.scss:responsive.css # tự compile khi lưu
```

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực

> **Lưu ý:** Phần này cần em tự mở trang (gợi ý: Shopee / Tiki / VNExpress / YouTube) bằng DevTools → Toggle Device Toolbar ở 3 kích thước rồi tự chụp screenshot bỏ vào `screenshots/`. Dưới đây là khung phân tích mẫu (dùng Tiki làm ví dụ minh hoạ) — em thay bằng quan sát thực tế của mình.

**Trang phân tích:** Tiki.vn

| Tiêu chí | Mobile (375px) | Tablet (768px) | Desktop (1440px) |
|----------|----------------|----------------|------------------|
| Navigation | Thu gọn thành icon ☰ + thanh tìm kiếm full-width, menu danh mục ẩn trong drawer | Menu rút gọn, một số mục gộp | Thanh nav ngang đầy đủ + mega menu danh mục |
| Lưới sản phẩm | 2 cột | 3–4 cột | 5–6 cột |
| Element bị ẩn | Banner phụ, sidebar danh mục, một số filter | Một phần sidebar | Hiển thị đầy đủ |
| Font size | Nhỏ hơn (title ~14px) | Trung bình | Lớn hơn (title ~16px) |

Mở DevTools → tab **Elements/Styles**, lọc theo `@media` để thấy các breakpoint trang dùng (thường ~`min-width: 768px`, `min-width: 1024px`). **Chụp ≥ 2 media query** và lưu vào `screenshots/`.

### Câu C2 — Thiết kế Responsive Strategy (Trang Đặt bàn nhà hàng)

**Wireframe — Mobile (1 cột, dọc):**
```
[ Logo ☰ ]            ← header, SĐT thu thành icon gọi
[ Hero image (cao vừa) ]
[ Form đặt bàn ]      ← đưa lên cao vì là hành động chính
[ Grid ảnh: 1 cột ]
[ Map (ẩn hoặc thu nhỏ, để link "Xem bản đồ") ]
[ Footer (gọn) ]
```
- **Ẩn trên mobile:** bớt ảnh trong grid (chỉ 2–3 ảnh đầu), map có thể chuyển thành link.
- **Form:** đẩy lên gần đầu, full-width, các trường xếp dọc.

**Wireframe — Tablet (2 cột):**
```
[ Logo            SĐT đặt bàn ]
[ Hero image toàn chiều rộng ]
[ Grid ảnh: 2 cột ][ Form đặt bàn ]
[ Map nhúng (full-width bên dưới) ]
[ Footer ]
```
- Grid ảnh **2 cột**, map đặt full-width phía dưới phần grid + form.

**Wireframe — Desktop (3 cột / có sidebar):**
```
[ Logo        Nav        SĐT đặt bàn ]
[ Hero image full-bleed ]
[ Grid ảnh 3 cột ............. | Sidebar: Form đặt bàn (sticky) ]
[ Map nhúng rộng ]
[ Footer nhiều cột ]
```
- Layout **3 cột** cho grid + **sidebar form sticky** bên phải; map nhúng rộng phía dưới.

**CSS skeleton (Grid + Media Queries, Mobile-First):**

```css
/* base = mobile: mọi thứ xếp dọc 1 cột */
.layout { display: grid; grid-template-columns: 1fr; gap: 16px; }
.gallery { display: grid; grid-template-columns: 1fr; gap: 12px; }
.map { display: none; }            /* ẩn map trên mobile */

/* tablet */
@media (min-width: 768px) {
  .gallery { grid-template-columns: repeat(2, 1fr); }
  .map { display: block; }
}

/* desktop */
@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 2fr 1fr;     /* nội dung | sidebar form */
    grid-template-areas:
      "hero hero"
      "gallery form"
      "map map";
  }
  .hero    { grid-area: hero; }
  .gallery { grid-area: gallery; grid-template-columns: repeat(3, 1fr); }
  .form    { grid-area: form; position: sticky; top: 16px; }
  .map     { grid-area: map; }
}
```

---

## PHẦN D — VIDEO

Link video (YouTube Unlisted / Google Drive): **[ DÁN LINK Ở ĐÂY ]**

File: `videos/PBT05_LeTranTienBao_2251172247.mp4`

---

## Lệnh compile SCSS (Bài B3)

```bash
# Cài Dart Sass (1 lần)
npm install -g sass

# Compile main partial -> CSS
sass scss/style.scss scss/style.css

# Hoặc tự động compile khi chỉnh sửa
sass --watch scss/style.scss:scss/style.css
```
