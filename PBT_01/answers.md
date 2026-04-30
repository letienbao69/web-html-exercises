# PHIẾU BÀI TẬP 01 - HTML5 FUNDAMENTALS

Họ và tên: Lê Trần Tiến Bảo  
MSSV: 2251172247  
Lớp: 64KTPM5 

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — HTTP & Browser

**Nguồn tham chiếu:** Tài liệu tuần 1 — phần giới thiệu HTML, HTTP, trình duyệt và quá trình render website.

Khi người dùng gõ địa chỉ `https://shopee.vn` vào thanh địa chỉ của trình duyệt và nhấn Enter, trình duyệt sẽ thực hiện nhiều bước để hiển thị được trang web.

Đầu tiên, trình duyệt kiểm tra cache để xem tên miền `shopee.vn` đã từng được truy cập hay chưa. Nếu chưa có địa chỉ IP tương ứng, trình duyệt sẽ thực hiện quá trình DNS Lookup để chuyển tên miền `shopee.vn` thành địa chỉ IP của máy chủ. Sau đó, trình duyệt thiết lập kết nối đến máy chủ thông qua giao thức TCP. Vì website sử dụng HTTPS nên sẽ có thêm bước TLS/SSL handshake để mã hóa dữ liệu truyền giữa trình duyệt và server.

Tiếp theo, trình duyệt gửi một HTTP Request đến server, thường là request `GET /` để yêu cầu lấy nội dung trang chủ. Server tiếp nhận request, xử lý yêu cầu, truy xuất dữ liệu cần thiết và trả về HTTP Response. Response này thường gồm status code, header và nội dung HTML ban đầu của trang.

Sau khi nhận HTML, trình duyệt bắt đầu phân tích cú pháp HTML để tạo DOM Tree. Trong quá trình đó, trình duyệt tiếp tục tải thêm các tài nguyên như CSS, JavaScript, hình ảnh, font chữ. CSS được dùng để tạo CSSOM, sau đó DOM và CSSOM kết hợp tạo Render Tree. Cuối cùng, trình duyệt thực hiện layout, paint và hiển thị giao diện website cho người dùng.

Trong Chrome DevTools, tab **Network** dùng để quan sát toàn bộ quá trình tải tài nguyên của trang web. Tab này cho biết danh sách request, loại tài nguyên được tải như document, stylesheet, script, image, font, fetch/XHR; trạng thái phản hồi như `200`, `301`, `404`; thời gian tải từng request; dung lượng tài nguyên; header request/response và thứ tự các tài nguyên được tải. Vì vậy, Network là công cụ quan trọng để kiểm tra tốc độ tải trang và phát hiện lỗi khi website không tải được tài nguyên.

Ảnh minh họa: `screenshots/A1_network.png`

---

### Câu A2 — Semantic HTML

**Nguồn tham chiếu:** Tài liệu tuần 1 — phần Semantic HTML5.

Đoạn HTML trong đề bị đánh giá SEO thấp vì dùng quá nhiều thẻ `<div>` cho mọi khu vực của trang. Về mặt hiển thị, trang vẫn có thể chạy bình thường, nhưng về mặt ngữ nghĩa thì trình duyệt, công cụ tìm kiếm và trình đọc màn hình sẽ khó hiểu cấu trúc nội dung. Ví dụ, Google không biết đâu là phần đầu trang, đâu là menu điều hướng, đâu là nội dung chính, đâu là một sản phẩm độc lập và đâu là phần cuối trang.

Các lỗi semantic trong đoạn code gồm:

1. Dùng `<div class="header">` thay vì thẻ `<header>`.
2. Dùng `<div class="menu">` thay vì thẻ `<nav>`.
3. Dùng `<div class="main">` thay vì thẻ `<main>`.
4. Dùng `<div class="product">` thay vì thẻ `<article>`.
5. Dùng `<div class="title">` thay vì thẻ tiêu đề như `<h1>` hoặc `<h2>`.
6. Ảnh sản phẩm thiếu thuộc tính `alt`, làm giảm khả năng hỗ trợ SEO và Accessibility.
7. Dùng `<div class="footer">` thay vì thẻ `<footer>`.

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
```

Việc sửa như trên giúp cấu trúc HTML rõ nghĩa hơn. `<header>` thể hiện phần đầu trang, `<nav>` thể hiện khu vực điều hướng, `<main>` thể hiện nội dung chính, `<article>` thể hiện một sản phẩm độc lập, `<figure>` nhóm ảnh với chú thích, còn `<footer>` thể hiện phần cuối trang.

---

### Câu A3 — Block vs Inline

**Nguồn tham chiếu:** Tài liệu tuần 1 — phần Block element và Inline element.

Đoạn HTML:

```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

Kết quả hiển thị dạng text art:

```txt
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
```

Giải thích:

Thẻ `<div>` là block element. Block element mặc định chiếm toàn bộ chiều ngang của dòng chứa nó, nên nội dung phía sau thường bị đẩy xuống dòng mới. Vì vậy, `Hộp 1`, `Hộp 2` và `Hộp 3` mỗi phần sẽ nằm trên một dòng riêng.

Ngược lại, `<span>` là inline element. Inline element chỉ chiếm đúng phần nội dung của nó và không tự động xuống dòng. Vì vậy, `Text A` và `Text B` nằm cùng một dòng. Thẻ `<strong>` cũng là inline element, nên `Text D` nằm cùng dòng với `Text C`.

Tóm lại, block element thường dùng để tạo các khối nội dung lớn, còn inline element dùng để đánh dấu hoặc định dạng một phần nhỏ trong dòng văn bản.

---

### Câu A4 — Table

**Nguồn tham chiếu:** Tài liệu tuần 1 — phần Table trong HTML.

Ba thẻ `<thead>`, `<tbody>`, `<tfoot>` được dùng để chia bảng thành các phần có ý nghĩa rõ ràng.

| Thẻ | Ý nghĩa | Vai trò |
|---|---|---|
| `<thead>` | Phần đầu bảng | Chứa tiêu đề các cột |
| `<tbody>` | Phần thân bảng | Chứa dữ liệu chính của bảng |
| `<tfoot>` | Phần cuối bảng | Chứa tổng kết, ghi chú hoặc kết quả tổng hợp |

Ví dụ, trong bảng điểm sinh viên, `<thead>` chứa các cột như “Họ tên”, “Môn học”, “Điểm”; `<tbody>` chứa danh sách điểm của từng sinh viên; `<tfoot>` có thể chứa điểm trung bình hoặc tổng số sinh viên.

Không nên dùng `<table>` để dựng layout cho trang web vì table sinh ra để biểu diễn dữ liệu dạng bảng, không phải để chia bố cục. Nếu dùng table cho layout, cấu trúc HTML sẽ sai mục đích semantic, khó bảo trì và khó responsive trên thiết bị di động. Ngoài ra, trình đọc màn hình có thể hiểu nhầm layout là dữ liệu bảng, làm giảm khả năng truy cập của website. Với bố cục giao diện hiện đại, nên dùng CSS Flexbox hoặc CSS Grid thay vì table.

---

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Tạo trang giới thiệu cá nhân

**File thực hiện:** `profile.html`

Trang `profile.html` sử dụng các thẻ semantic như:

- `<header>` cho phần đầu trang.
- `<nav>` cho menu điều hướng.
- `<main>` cho nội dung chính.
- `<section>` để chia từng khu vực nội dung.
- `<article>` cho phần giới thiệu bản thân.
- `<figure>` và `<figcaption>` cho ảnh đại diện.
- `<table>`, `<thead>`, `<tbody>`, `<tfoot>` cho bảng kỹ năng.
- `<aside>` cho thông tin liên hệ.
- `<footer>` cho phần cuối trang.

Ảnh kết quả: `screenshots/B1_profile.png`

---

### Bài B2 — Tạo trang danh sách sản phẩm

**File thực hiện:** `products.html`

Trang `products.html` sử dụng Semantic HTML để xây dựng trang danh sách sản phẩm thương mại điện tử. Mỗi sản phẩm được đặt trong một thẻ `<article>` vì mỗi sản phẩm là một nội dung độc lập. Ảnh sản phẩm được đặt trong `<figure>` và có `<figcaption>` để mô tả ảnh rõ hơn. Trang cũng có bảng so sánh sản phẩm sử dụng `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, đồng thời có dùng `colspan` để gộp ô.

Ảnh kết quả: `screenshots/B2_products.png`

---

### Bài B3 — Debug HTML

**File thực hiện:** `debug.html`

Các lỗi đã tìm và sửa:

1. `<!DOCTYPE>` sai cú pháp — sửa thành `<!DOCTYPE html>`.
2. Thẻ `<html>` thiếu thuộc tính ngôn ngữ — sửa thành `<html lang="vi">`.
3. Thiếu thẻ `<meta name="viewport">` — thêm để hỗ trợ responsive.
4. `charset="utf8"` chưa chuẩn — sửa thành `charset="UTF-8"`.
5. `<title>Trang web` thiếu thẻ đóng — sửa thành `<title>Trang web ShopTLU</title>`.
6. `<h1>Welcome to ShopTLU<h1>` đóng sai thẻ — sửa thành `<h1>Welcome to ShopTLU</h1>`.
7. `<a href="home">Trang chủ<a>` thiếu thẻ đóng đúng — sửa thành `<a href="#home">Trang chủ</a>`.
8. `<a href="products">Sản phẩm</a>` nên dùng đường dẫn rõ ràng hơn — sửa thành `<a href="#products">Sản phẩm</a>`.
9. `<img src=iphone.jpg>` thiếu dấu ngoặc kép — sửa thành `<img src="iphone.jpg" ...>`.
10. Ảnh thiếu thuộc tính `alt` — thêm `alt="iPhone 16 Pro"`.
11. `<p>Giá: <b>25.990.000đ</p></b>` sai thứ tự đóng thẻ — sửa thành `<p>Giá: <strong>25.990.000đ</strong></p>`.
12. Bảng thiếu `<thead>` — thêm phần tiêu đề bảng.
13. Bảng thiếu `<tbody>` — thêm phần thân bảng.
14. Dòng tiêu đề bảng dùng `<td>` chưa đúng — sửa thành `<th>`.
15. Có hai thẻ `<main>` trong một trang — chỉ giữ một `<main>`.
16. Phần sidebar nên dùng `<aside>` thay vì đặt trong `<main>` thứ hai.
17. `<p>Copyright 2026` thiếu thẻ đóng — sửa thành `<p>&copy; 2026 ShopTLU</p>`.
18. Thiếu thẻ đóng cuối tài liệu — bổ sung `</body>` và `</html>`.

Ảnh kết quả: `screenshots/B3_debug.png`

---

### Bài B4 — Phân tích website thật bằng DevTools

**Website chọn:** `thegioididong.com`

#### 1. Phân tích semantic HTML5

Khi mở website bằng trình duyệt và kiểm tra bằng Chrome DevTools ở tab Elements, có thể phân tích cấu trúc HTML của trang. Website có các khu vực như phần đầu trang, menu danh mục, danh sách sản phẩm, banner quảng cáo và footer.

Các thẻ semantic HTML5 có thể thấy hoặc có thể được sử dụng phù hợp trong website:

1. `<header>`: phù hợp cho phần đầu trang, chứa logo, thanh tìm kiếm, giỏ hàng và các chức năng chính.
2. `<nav>`: phù hợp cho khu vực điều hướng danh mục như Điện thoại, Laptop, Phụ kiện, Smartwatch.
3. `<section>`: phù hợp để chia các khu vực nội dung như banner, danh sách sản phẩm nổi bật, chương trình khuyến mãi.
4. `<footer>`: phù hợp cho phần cuối trang, chứa thông tin liên hệ, chính sách và hỗ trợ khách hàng.

Hai điểm có thể chưa semantic tốt:

1. Một số khu vực sản phẩm có thể dùng nhiều `<div>` thay vì dùng `<article>`, trong khi mỗi sản phẩm là một nội dung độc lập.
2. Một số nhóm liên kết điều hướng có thể được tổ chức bằng `<div>` hoặc nhiều thẻ `<a>` rời rạc thay vì dùng danh sách `<ul><li>` trong `<nav>`.

Ảnh minh họa: `screenshots/B4_elements.png`

#### 2. Phân tích table

Ở trang chủ có thể không có bảng rõ ràng. Vì vậy, có thể chuyển sang trang chi tiết sản phẩm để tìm bảng thông số kỹ thuật. Bảng thông số thường hiển thị các thông tin như màn hình, hệ điều hành, chip xử lý, RAM, bộ nhớ trong, camera, pin và sạc.

Việc dùng `<table>` trong trường hợp này là phù hợp vì dữ liệu thông số kỹ thuật có cấu trúc dạng hàng và cột. Nếu bảng có tiêu đề rõ ràng thì nên có `<thead>`, còn phần dữ liệu chính nên đặt trong `<tbody>`.

Ảnh minh họa: `screenshots/B4_table.png`

#### 3. Phân tích form

Form dễ thấy nhất trên website là ô tìm kiếm sản phẩm. Ô tìm kiếm cho phép người dùng nhập tên sản phẩm cần tìm. Về mặt HTML, form tìm kiếm thường có input dạng `text` hoặc `search`.

Thông tin phân tích:

- Chức năng: tìm kiếm sản phẩm.
- Input type: thường là `text` hoặc `search`.
- `method`: thường là `GET` nếu từ khóa tìm kiếm được đưa lên URL, hoặc có thể được xử lý bằng JavaScript.
- `action`: có thể là đường dẫn tìm kiếm hoặc được JavaScript xử lý.

Ảnh minh họa: `screenshots/B4_form.png`

---

## PHẦN C — SUY LUẬN

### Câu C1 — Thiết kế cấu trúc HTML trang chi tiết sản phẩm

Yêu cầu: Thiết kế cấu trúc HTML cho trang chi tiết sản phẩm kiểu Shopee/Tiki, gồm header, navigation, breadcrumb, ảnh sản phẩm, thông tin sản phẩm, bảng thông số, đánh giá/bình luận, sidebar sản phẩm tương tự và footer. Mỗi thẻ quan trọng có comment giải thích lý do sử dụng.

```html
<!DOCTYPE html>
<html lang="vi"> <!-- html là thẻ gốc của tài liệu, lang="vi" giúp xác định ngôn ngữ chính là tiếng Việt -->
<head>
    <meta charset="UTF-8"> <!-- giúp hiển thị đúng tiếng Việt -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- giúp trang hiển thị tốt trên thiết bị di động -->
    <title>Chi tiết sản phẩm - iPhone 16 Pro</title> <!-- tiêu đề hiển thị trên tab trình duyệt và hỗ trợ SEO -->
</head>
<body>
    <header> <!-- header dùng cho phần đầu trang như logo, tên website, thanh tìm kiếm -->
        <h1>ShopTLU</h1> <!-- h1 là tiêu đề chính của website -->
        <form action="/search" method="get"> <!-- form dùng cho chức năng tìm kiếm sản phẩm -->
            <label for="keyword">Tìm kiếm sản phẩm</label>
            <input type="search" id="keyword" name="q" placeholder="Nhập tên sản phẩm">
            <button type="submit">Tìm kiếm</button>
        </form>
        <nav> <!-- nav dùng cho khu vực điều hướng chính -->
            <ul> <!-- ul phù hợp vì menu là danh sách liên kết -->
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/products">Sản phẩm</a></li>
                <li><a href="/cart">Giỏ hàng</a></li>
                <li><a href="/contact">Liên hệ</a></li>
            </ul>
        </nav>
    </header>

    <nav aria-label="breadcrumb"> <!-- breadcrumb cũng là một dạng điều hướng nên dùng nav -->
        <ol> <!-- ol vì breadcrumb có thứ tự từ trang cha đến trang hiện tại -->
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/dien-thoai">Điện thoại</a></li>
            <li><a href="/dien-thoai/iphone">iPhone</a></li>
            <li>iPhone 16 Pro</li>
        </ol>
    </nav>

    <main> <!-- main chứa nội dung chính duy nhất của trang -->
        <article> <!-- article phù hợp vì sản phẩm là một nội dung độc lập -->
            <section> <!-- section chia khu vực ảnh sản phẩm -->
                <h2>Hình ảnh sản phẩm</h2>
                <figure> <!-- figure nhóm ảnh và chú thích ảnh -->
                    <img src="iphone-16-pro-front.jpg" alt="Mặt trước iPhone 16 Pro">
                    <figcaption>Mặt trước iPhone 16 Pro</figcaption>
                </figure>
                <figure>
                    <img src="iphone-16-pro-back.jpg" alt="Mặt sau iPhone 16 Pro">
                    <figcaption>Mặt sau iPhone 16 Pro</figcaption>
                </figure>
            </section>

            <section> <!-- section chia khu vực thông tin chính của sản phẩm -->
                <h2>iPhone 16 Pro</h2>
                <p><strong>Giá:</strong> 25.990.000đ</p>
                <p><strong>Tình trạng:</strong> Còn hàng</p>
                <p><strong>Đánh giá:</strong> 4.8/5 sao</p>
                <p>
                    iPhone 16 Pro có thiết kế cao cấp, hiệu năng mạnh mẽ,
                    camera sắc nét và thời lượng pin đáp ứng tốt nhu cầu hằng ngày.
                </p>
                <button type="button">Thêm vào giỏ hàng</button>
                <button type="button">Mua ngay</button>
            </section>

            <section> <!-- section dành riêng cho bảng thông số kỹ thuật -->
                <h2>Thông số kỹ thuật</h2>
                <table> <!-- table phù hợp vì thông số là dữ liệu dạng hàng và cột -->
                    <thead> <!-- thead chứa tiêu đề của bảng -->
                        <tr>
                            <th>Tiêu chí</th>
                            <th>Thông tin</th>
                        </tr>
                    </thead>
                    <tbody> <!-- tbody chứa dữ liệu chính -->
                        <tr>
                            <td>Màn hình</td>
                            <td>6.3 inch OLED</td>
                        </tr>
                        <tr>
                            <td>Chip xử lý</td>
                            <td>Apple A18 Pro</td>
                        </tr>
                        <tr>
                            <td>Bộ nhớ trong</td>
                            <td>256GB</td>
                        </tr>
                        <tr>
                            <td>Camera</td>
                            <td>48MP</td>
                        </tr>
                        <tr>
                            <td>Pin</td>
                            <td>Sử dụng cả ngày</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section> <!-- section dùng cho đánh giá và bình luận của người dùng -->
                <h2>Đánh giá và bình luận</h2>

                <article> <!-- mỗi bình luận là một nội dung độc lập nên có thể dùng article -->
                    <h3>Nguyễn Văn A</h3>
                    <p>Sản phẩm đẹp, máy chạy mượt và giao hàng nhanh.</p>
                </article>

                <article>
                    <h3>Trần Thị B</h3>
                    <p>Camera chụp ảnh rõ, pin dùng ổn, rất đáng mua.</p>
                </article>
            </section>
        </article>

        <aside> <!-- aside chứa nội dung phụ liên quan như sản phẩm tương tự -->
            <h2>Sản phẩm tương tự</h2>

            <article>
                <h3>iPhone 15 Pro</h3>
                <p>Giá: 21.990.000đ</p>
                <a href="/products/iphone-15-pro">Xem chi tiết</a>
            </article>

            <article>
                <h3>Samsung Galaxy S25</h3>
                <p>Giá: 22.990.000đ</p>
                <a href="/products/galaxy-s25">Xem chi tiết</a>
            </article>
        </aside>
    </main>

    <footer> <!-- footer dùng cho phần cuối trang -->
        <p>&copy; 2026 ShopTLU. All rights reserved.</p>
        <nav> <!-- nav trong footer chứa các liên kết phụ -->
            <ul>
                <li><a href="/policy">Chính sách</a></li>
                <li><a href="/contact">Liên hệ</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
        </nav>
    </footer>
</body>
</html>
```

---

### Câu C2 — Phản biện về Semantic HTML

Quan điểm “dùng `<div>` cho mọi thứ rồi thêm class là được” chỉ đúng ở mức hiển thị giao diện, nhưng không phù hợp khi xây dựng website chuyên nghiệp. HTML không chỉ dùng để làm cho nội dung xuất hiện trên màn hình, mà còn có nhiệm vụ mô tả ý nghĩa và cấu trúc của nội dung.

Thứ nhất, Semantic HTML hỗ trợ SEO tốt hơn. Khi sử dụng các thẻ như `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` và `<footer>`, công cụ tìm kiếm có thể hiểu rõ đâu là phần đầu trang, đâu là menu điều hướng, đâu là nội dung chính và đâu là một bài viết hoặc sản phẩm độc lập. Ví dụ, trong trang thương mại điện tử, một sản phẩm nên được đặt trong thẻ `<article>`, tên sản phẩm đặt trong `<h2>`, ảnh sản phẩm đặt trong `<figure>` và chú thích ảnh đặt trong `<figcaption>`. Cách viết này rõ nghĩa hơn nhiều so với việc dùng toàn bộ bằng `<div>`.

Thứ hai, Semantic HTML hỗ trợ Accessibility. Người dùng sử dụng trình đọc màn hình có thể dễ dàng nhảy đến menu, nội dung chính hoặc footer nếu trang được viết đúng semantic. Nếu mọi thành phần đều là `<div>`, công cụ hỗ trợ sẽ khó nhận biết cấu trúc trang, từ đó làm giảm trải nghiệm của người khuyết tật.

Tuy nhiên, `<div>` không phải là thẻ xấu. Trong thực tế, `<div>` vẫn phù hợp khi cần tạo một khối bao bên ngoài để căn chỉnh layout, nhóm các phần tử phục vụ CSS hoặc JavaScript, nhưng khối đó không mang ý nghĩa nội dung đặc biệt. Vì vậy, cách làm đúng là dùng Semantic HTML cho cấu trúc chính của trang và chỉ dùng `<div>` khi thật sự cần cho bố cục hoặc kỹ thuật trình bày.

---

## PHẦN D — VIDEO OBS


