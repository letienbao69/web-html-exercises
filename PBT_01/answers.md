# PHIẾU BÀI TẬP 01 - HTML5 FUNDAMENTALS

Họ tên: Lê Trần Tiến Bảo  
MSSV: 2251172247  
Lớp: 64KTPM5

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — HTTP & Browser

**Nguồn tham chiếu:** `tuan_1_html5/01_introduction_html_universe.md` — phần Client-Server, HTTP, Browser Rendering.

Khi gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, các bước xảy ra theo thứ tự như sau:

1. **Nhập URL và kiểm tra cache:** Trình duyệt kiểm tra xem địa chỉ `shopee.vn` đã có trong cache DNS hoặc cache trình duyệt chưa.
2. **DNS Lookup:** Nếu chưa có IP, trình duyệt gửi yêu cầu DNS để tìm địa chỉ IP tương ứng với tên miền `shopee.vn`.
3. **Thiết lập kết nối:** Trình duyệt tạo kết nối đến server thông qua TCP. Vì dùng HTTPS nên có thêm bước TLS/SSL handshake để mã hóa dữ liệu.
4. **Gửi HTTP Request:** Trình duyệt gửi request đến server, thường là request `GET /` để yêu cầu lấy trang chủ.
5. **Server xử lý Request:** Server của Shopee tiếp nhận request, xử lý dữ liệu, truy vấn tài nguyên cần thiết như HTML, CSS, JS, ảnh.
6. **Server trả HTTP Response:** Server gửi response về trình duyệt, gồm status code, headers và nội dung HTML/CSS/JS.
7. **Trình duyệt parse HTML:** Chrome đọc HTML để tạo DOM tree.
8. **Tải CSS, JS, ảnh:** Trình duyệt tiếp tục tải các file CSS, JavaScript, font, hình ảnh.
9. **Render giao diện:** Trình duyệt kết hợp HTML + CSS + JS để hiển thị giao diện website cho người dùng.

Trong Chrome DevTools, tab **Network** cho biết:

- Danh sách các request mà trình duyệt gửi đi.
- Status code của từng request, ví dụ `200`, `301`, `404`, `500`.
- Loại tài nguyên được tải: document, CSS, JS, image, font, fetch/XHR.
- Thời gian tải từng request.
- Tổng thời gian load trang.
- Dung lượng tài nguyên được tải.

Ảnh minh họa lưu tại: `screenshots/A1_network.png`

---

### Câu A2 — Semantic HTML

**Nguồn tham chiếu:** `tuan_1_html5/04_visible_part_html.md` — phần Semantic HTML5.

Trang web trong đề bị Google đánh giá SEO thấp vì dùng quá nhiều thẻ `<div>` không có ý nghĩa ngữ nghĩa. Google và trình đọc màn hình khó hiểu đâu là header, menu, nội dung chính, sản phẩm, footer.

Các lỗi semantic:

1. Dùng `<div class="header">` thay vì `<header>`.
2. Dùng `<div class="menu">` thay vì `<nav>`.
3. Dùng `<div class="main">` thay vì `<main>`.
4. Dùng `<div class="product">` thay vì `<article>`.
5. Dùng `<div class="title">` thay vì thẻ heading như `<h1>` hoặc `<h2>`.
6. Ảnh `<img src="iphone.jpg">` thiếu thuộc tính `alt`.
7. Dùng `<div class="footer">` thay vì `<footer>`.

Bản sửa semantic:

```html
<header>
    <h1>ShopTLU</h1>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>iPhone 16 Pro</h2>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro màu titan">
            <figcaption>iPhone 16 Pro chính hãng</figcaption>
        </figure>
        <p><strong>25.990.000đ</strong></p>
    </article>
</main>

<footer>
    <p>&copy; 2026 ShopTLU</p>
</footer>