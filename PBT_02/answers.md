# PHIẾU BÀI TẬP 02 - HTML5 FORMS & MEDIA

Họ và tên: Lê Trần Tiến Bảo  
MSSV: 2251172247  
Lớp: 64KTPM5 

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Input Types

**Nguồn tham chiếu:** `tuan_1_html5/07_forms_interactive.md` — phần HTML Forms, input types và validation.

1. `type="text"` → Ô nhập văn bản một dòng, không có validation định dạng tự động → Dùng để nhập họ tên, địa chỉ, tên sản phẩm cần tìm.
2. `type="email"` → Ô nhập văn bản, tự kiểm tra định dạng email hợp lệ như có ký tự `@` → Dùng cho form đăng ký tài khoản hoặc nhận hóa đơn điện tử.
3. `type="password"` → Ô nhập mật khẩu, ký tự được che đi → Dùng cho đăng nhập, đăng ký hoặc đổi mật khẩu.
4. `type="number"` → Ô nhập số, có thể kiểm tra `min`, `max`, `step` → Dùng để nhập số lượng sản phẩm trong giỏ hàng.
5. `type="tel"` → Ô nhập số điện thoại, tối ưu bàn phím số trên mobile → Dùng để nhập số điện thoại nhận hàng.
6. `type="date"` → Bộ chọn ngày, có thể kiểm tra `min`, `max` → Dùng để chọn ngày sinh hoặc ngày giao hàng.
7. `type="search"` → Ô tìm kiếm, một số trình duyệt có nút xóa nhanh → Dùng cho thanh tìm kiếm sản phẩm.
8. `type="checkbox"` → Ô tích chọn, có thể bắt buộc bằng `required` → Dùng cho đồng ý điều khoản hoặc nhận khuyến mãi.
9. `type="radio"` → Nút chọn một trong nhiều lựa chọn cùng nhóm `name` → Dùng để chọn giới tính hoặc phương thức thanh toán.
10. `type="file"` → Nút chọn tệp từ máy tính, có thể giới hạn bằng `accept` → Dùng để tải ảnh đại diện hoặc ảnh đánh giá sản phẩm.
11. `type="range"` → Thanh trượt, có `min`, `max`, `step` → Dùng để lọc mức giá hoặc chọn thời gian giao hàng.
12. `type="url"` → Ô nhập đường dẫn, tự kiểm tra định dạng URL → Dùng để nhập link website hoặc mạng xã hội của shop.

---

### Câu A2 — Validation Attributes

**Nguồn tham chiếu:** `tuan_1_html5/07_forms_interactive.md` — phần HTML5 validation attributes.

#### Dự đoán kết quả khi bấm Submit

**Trường hợp 1**

```html
<input type="text" required value="">
```

Kết quả: Form không được submit vì ô nhập đang để trống.  
Giải thích: `required` bắt buộc người dùng phải nhập dữ liệu.

**Trường hợp 2**

```html
<input type="email" value="abc">
```

Kết quả: Form không được submit vì `abc` không đúng định dạng email.  
Giải thích: `type="email"` yêu cầu dữ liệu có định dạng email hợp lệ.

**Trường hợp 3**

```html
<input type="number" min="1" max="10" value="15">
```

Kết quả: Form không được submit vì `15` lớn hơn `max="10"`.  
Giải thích: Trình duyệt kiểm tra giá trị số theo giới hạn `min` và `max`.

**Trường hợp 4**

```html
<input type="text" pattern="[0-9]{10}" value="abc123">
```

Kết quả: Form không được submit vì `abc123` không khớp pattern.  
Giải thích: `[0-9]{10}` yêu cầu đúng 10 chữ số.

**Trường hợp 5**

```html
<input type="password" minlength="8" value="123">
```

Kết quả: Form không được submit vì mật khẩu chỉ có 3 ký tự.  
Giải thích: `minlength="8"` yêu cầu tối thiểu 8 ký tự.

#### Kết quả thực tế

File kiểm tra: `validation_test.html`.

Sau khi chạy file và bấm Submit, trình duyệt chặn form và hiển thị thông báo validation ở trường dữ liệu đầu tiên chưa hợp lệ. Kết quả thực tế giống với dự đoán.

Ảnh minh họa: `screenshots/A2_validation_test.png`

---

### Câu A3 — Accessibility

**Nguồn tham chiếu:** `tuan_1_html5/07_forms_interactive.md` — phần Accessibility trong form.

#### 1. Tại sao `<label for="email">` quan trọng cho screen reader?

`<label>` giúp liên kết phần mô tả với một input cụ thể. Khi dùng:

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

screen reader có thể đọc chính xác ô nhập này dùng để nhập email. Người dùng cũng có thể click vào chữ “Email” để focus vào input tương ứng. Nếu không có label, người dùng công cụ hỗ trợ có thể không biết phải nhập nội dung gì.

#### 2. Khi nào dùng `<fieldset>` + `<legend>`?

`<fieldset>` dùng để nhóm các input liên quan. `<legend>` là tiêu đề của nhóm input đó. Ví dụ:

```html
<fieldset>
    <legend>Thông tin tài khoản</legend>

    <label for="username">Tên đăng nhập</label>
    <input type="text" id="username" name="username">

    <label for="password">Mật khẩu</label>
    <input type="password" id="password" name="password">
</fieldset>
```

Cách này phù hợp với form dài như đăng ký tài khoản, thanh toán, đặt hàng hoặc khảo sát.

#### 3. `aria-label` dùng khi nào?

`aria-label` dùng khi một phần tử cần tên truy cập cho screen reader nhưng không có label hiển thị trực tiếp. Ví dụ nút chỉ có icon:

```html
<button type="submit" aria-label="Tìm kiếm sản phẩm">🔍</button>
```

Không nên dùng `aria-label` khi đã có `<label>` rõ ràng, vì có thể làm nội dung đọc bởi screen reader khác với nội dung người dùng nhìn thấy.

---

### Câu A4 — Media

**Nguồn tham chiếu:** `tuan_1_html5/06_graphics_multimedia.md` — phần hình ảnh, video, audio và media trong HTML.

#### 1. Thuộc tính `loading="lazy"` trên `<img>`

`loading="lazy"` yêu cầu trình duyệt trì hoãn tải ảnh cho đến khi ảnh gần xuất hiện trong vùng nhìn thấy của người dùng. Thuộc tính này giúp giảm tài nguyên tải ban đầu, cải thiện tốc độ load trang và tiết kiệm băng thông.

Không nên dùng `loading="lazy"` cho ảnh quan trọng ở đầu trang như logo, banner chính hoặc ảnh hero, vì người dùng cần thấy ngay các ảnh đó.

#### 2. Tại sao nên cung cấp nhiều `<source>` trong `<video>`?

Nhiều trình duyệt hỗ trợ định dạng video khác nhau. Khi cung cấp nhiều `<source>`, trình duyệt sẽ chọn định dạng đầu tiên mà nó hỗ trợ.

```html
<video controls>
    <source src="demo.mp4" type="video/mp4">
    <source src="demo.webm" type="video/webm">
    Trình duyệt của bạn không hỗ trợ video.
</video>
```

Ba định dạng video web phổ biến: MP4, WebM, Ogg/Ogv.

#### 3. Thuộc tính `alt` trên `<img>`

`alt` dùng để cung cấp văn bản thay thế cho hình ảnh khi ảnh không tải được, khi người dùng dùng screen reader hoặc khi công cụ tìm kiếm phân tích nội dung ảnh.

Ví dụ:

```html
<img src="iphone16.jpg" alt="iPhone 16 màu xanh dung lượng 128GB">
<img src="decor-line.png" alt="">
<img src="revenue-q1-2026.png" alt="Biểu đồ doanh thu quý 1 năm 2026 tăng từ tháng 1 đến tháng 3">
```

Với ảnh trang trí không mang thông tin nội dung, nên để `alt=""` để screen reader bỏ qua.

---

### Câu A5 — So sánh `<figure>` và `<img>`

**Nguồn tham chiếu:** `tuan_1_html5/06_graphics_multimedia.md` — phần image, figure và figcaption.

Cách 1:

```html
<img src="product.jpg" alt="iPhone">
```

Cách này phù hợp khi chỉ cần hiển thị một hình ảnh đơn lẻ, không cần chú thích riêng.

Ví dụ thực tế:

1. Ảnh logo website trong header.
2. Icon giỏ hàng, icon tìm kiếm hoặc icon mạng xã hội.

Cách 2:

```html
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```

Cách này phù hợp khi hình ảnh là một nội dung độc lập và cần chú thích đi kèm.

Ví dụ thực tế:

1. Ảnh sản phẩm trong trang thương mại điện tử có tên và giá sản phẩm.
2. Ảnh biểu đồ doanh thu có chú thích giải thích biểu đồ.

Tóm lại, dùng `<img>` khi ảnh chỉ là một phần đơn giản của giao diện. Dùng `<figure>` + `<figcaption>` khi ảnh cần được xem như một khối nội dung độc lập có chú thích.

---

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Form đăng ký tài khoản

**File thực hiện:** `register.html`

Form có `action="#"`, `method="POST"`, gồm 3 fieldset: Thông tin cá nhân, Tài khoản, Thông tin giao hàng. Tất cả input đều có label liên kết bằng `for` và `id`, có placeholder, đồng thời sử dụng validation attributes như `required`, `minlength`, `maxlength`, `pattern`, `min`, `max`.

Lưu ý: HTML5 không thể tự kiểm tra xác nhận mật khẩu có giống mật khẩu ban đầu hay không nếu không dùng JavaScript. HTML chỉ kiểm tra được từng input riêng lẻ. Việc so sánh giá trị giữa hai trường password cần JavaScript hoặc backend.

Ảnh kết quả: `screenshots/B1_register.png`

---

### Bài B2 — Trang Multimedia

**File thực hiện:** `media.html`

Trang multimedia gồm ít nhất 3 ảnh sản phẩm dùng `<figure>` + `<figcaption>`, ảnh có `alt`, `loading="lazy"` và style responsive, một video YouTube nhúng bằng `<iframe>`, một thẻ `<video>` có `controls`, `poster` và nhiều `<source>`, một thẻ `<audio>`, một SVG inline dùng làm logo đơn giản.

Ảnh kết quả: `screenshots/B2_media.png`

---

### Bài B3 — Form đặt hàng hoàn chỉnh

**File thực hiện:** `checkout.html`

Trang checkout gồm giỏ hàng dùng `<table>` có `<thead>`, `<tbody>`, `<tfoot>` và `colspan`; form thanh toán có radio button; mã giảm giá có pattern dạng `SALE` + 4 chữ số; thông tin giao hàng có ngày giao hàng mong muốn, khung giờ, range thời gian giao hàng; có dùng `datalist`, `output`, `meter`, `progress` cho phần nâng cao.

Ảnh kết quả: `screenshots/B3_checkout.png`

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 — Debug Form

Các lỗi và cách sửa:

**Lỗi 1:** Input “Tên” không có `<label for="...">`, vi phạm accessibility.  
Sửa:

```html
<label for="fullName">Tên:</label>
<input type="text" id="fullName" name="fullName" required>
```

**Lỗi 2:** Input “Tên” thiếu `name`, làm server khó nhận dữ liệu.  
Sửa: thêm `name="fullName"`.

**Lỗi 3:** Input email không có label.  
Sửa:

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>
```

**Lỗi 4:** Input email thiếu `required`, trong form đăng ký email thường là bắt buộc.  
Sửa: thêm `required`.

**Lỗi 5:** Password không có label và thiếu validation.  
Sửa:

```html
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" placeholder="Mật khẩu" required minlength="8">
```

**Lỗi 6:** Nhập lại mật khẩu không có label và HTML không tự kiểm tra được giống mật khẩu ban đầu.  
Sửa:

```html
<label for="confirmPassword">Nhập lại mật khẩu:</label>
<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" required minlength="8">
```

**Lỗi 7:** Phone dùng `type="text"` chưa phù hợp.  
Sửa:

```html
<label for="phone">Số điện thoại:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567" required>
```

**Lỗi 8:** Phone đang đặt sẵn `value="0901234567"`, không phù hợp với form nhập dữ liệu mới.  
Sửa: thay `value` bằng `placeholder`.

**Lỗi 9:** `<select>` không có label, không có `id`, `name`.  
Sửa:

```html
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">-- Chọn thành phố --</option>
    <option value="ha-noi">Hà Nội</option>
    <option value="tp-hcm">TP.HCM</option>
</select>
```

**Lỗi 10:** Label “Tôi đồng ý điều khoản” không chứa checkbox nên người dùng không thể tích chọn.  
Sửa:

```html
<label for="agree">
    <input type="checkbox" id="agree" name="agree" required>
    Tôi đồng ý điều khoản
</label>
```

**Lỗi 11:** Form thiếu `action` và `method`.  
Sửa:

```html
<form action="#" method="POST">
```

**Lỗi 12:** Nên dùng `<button type="submit">` để linh hoạt hơn.  
Sửa:

```html
<button type="submit">Gửi</button>
```

Bản form đã sửa:

```html
<form action="#" method="POST">
    <label for="fullName">Tên:</label>
    <input type="text" id="fullName" name="fullName" placeholder="Nhập họ tên" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Email của bạn" required>

    <label for="password">Mật khẩu:</label>
    <input type="password" id="password" name="password" placeholder="Mật khẩu" required minlength="8">

    <label for="confirmPassword">Nhập lại mật khẩu:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" required minlength="8">

    <label for="phone">Số điện thoại:</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567" required>

    <label for="city">Thành phố:</label>
    <select id="city" name="city" required>
        <option value="">-- Chọn thành phố --</option>
        <option value="ha-noi">Hà Nội</option>
        <option value="tp-hcm">TP.HCM</option>
    </select>

    <label for="agree">
        <input type="checkbox" id="agree" name="agree" required>
        Tôi đồng ý điều khoản
    </label>

    <button type="submit">Gửi</button>
</form>
```

---

### Câu C2 — Thiết kế chiến lược Validation

#### 1. Regex pattern cho CMND/CCCD và số tài khoản

CMND/CCCD đúng 12 chữ số:

```html
pattern="[0-9]{12}"
```

Số tài khoản từ 10 đến 15 chữ số:

```html
pattern="[0-9]{10,15}"
```

PIN đúng 6 chữ số và không hiển thị:

```html
<input type="password" pattern="[0-9]{6}" inputmode="numeric">
```

#### 2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa?

HTML5 validation chưa đủ an toàn cho ứng dụng ngân hàng. Validation ở frontend chỉ giúp cải thiện trải nghiệm người dùng bằng cách báo lỗi sớm trước khi gửi form. Người dùng vẫn có thể sửa HTML bằng DevTools, tắt validation hoặc gửi request trực tiếp bằng Postman để bỏ qua kiểm tra frontend. Backend bắt buộc phải kiểm tra lại toàn bộ dữ liệu.

#### 3. Ba loại validation HTML5 không thể làm được

1. Kiểm tra xác nhận mật khẩu có giống mật khẩu ban đầu hay không.
2. Kiểm tra email, username hoặc số tài khoản đã tồn tại trong hệ thống hay chưa.
3. Kiểm tra logic nghiệp vụ phức tạp, ví dụ tuổi phải trên 18, số dư đủ để giao dịch, mã OTP còn hạn hay không.

#### 4. Hai rủi ro nếu chỉ validate frontend mà không validate backend

1. Người dùng có thể bỏ qua frontend validation và gửi dữ liệu sai định dạng hoặc dữ liệu độc hại trực tiếp đến server.
2. Hệ thống có thể bị tấn công bằng dữ liệu giả mạo, gây lỗi database, sai lệch giao dịch hoặc tạo lỗ hổng bảo mật.









