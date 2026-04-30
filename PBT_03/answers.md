# PHIẾU BÀI TẬP 03 - CSS CORE

Họ và tên: Lê Trần Tiến Bảo  
MSSV: 2251172247  
Lớp: 64KTPM5 

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 3 cách nhúng CSS

CSS có 3 cách nhúng phổ biến vào HTML: inline CSS, internal CSS và external CSS.

#### 1. Inline CSS

Inline CSS là cách viết CSS trực tiếp trong thuộc tính `style` của một thẻ HTML.

Ví dụ:

```html
<p style="color: red; font-size: 18px;">Đây là đoạn văn dùng inline CSS.</p>
```

Ưu điểm:

- Nhanh, dễ thử nghiệm với một phần tử nhỏ.
- Có độ ưu tiên cao hơn internal và external CSS nếu không xét `!important`.
- Phù hợp khi cần sửa nhanh một style đơn lẻ.

Nhược điểm:

- Làm HTML bị rối và khó đọc.
- Khó tái sử dụng vì mỗi element phải viết lại style.
- Khó bảo trì khi dự án lớn.
- Không tách biệt nội dung HTML và trình bày CSS.

Khi nào nên dùng:

- Khi test nhanh một thuộc tính CSS.
- Khi cần style đặc biệt cho đúng một element.
- Không nên dùng nhiều trong dự án thật.

#### 2. Internal CSS

Internal CSS là cách viết CSS trong thẻ `<style>` bên trong phần `<head>` của file HTML.

Ví dụ:

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
```

Ưu điểm:

- Dễ viết trong một file HTML duy nhất.
- Phù hợp với bài tập nhỏ hoặc trang demo đơn giản.
- Tách CSS ra khỏi từng thẻ HTML tốt hơn inline CSS.

Nhược điểm:

- Chỉ áp dụng cho một file HTML.
- Nếu nhiều trang dùng chung giao diện thì phải copy CSS nhiều lần.
- Dự án lớn sẽ khó bảo trì.

Khi nào nên dùng:

- Khi làm ví dụ ngắn.
- Khi làm bài test, demo hoặc một trang đơn giản.
- Không nên dùng làm chính cho website nhiều trang.

#### 3. External CSS

External CSS là cách viết CSS trong một file riêng, ví dụ `style.css`, sau đó liên kết với HTML bằng thẻ `<link>`.

Ví dụ:

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

File `style.css`:

```css
p {
    color: green;
    font-size: 18px;
}
```

Ưu điểm:

- Tách biệt rõ HTML và CSS.
- Dễ tái sử dụng cho nhiều trang.
- Dễ bảo trì và mở rộng.
- Trình duyệt có thể cache file CSS, giúp tối ưu hiệu năng.
- Phù hợp với dự án thực tế.

Nhược điểm:

- Cần thêm file CSS riêng.
- Nếu đường dẫn sai, CSS sẽ không được áp dụng.
- Khi mới học có thể phải quản lý nhiều file hơn.

Khi nào nên dùng:

- Nên dùng trong hầu hết các dự án thật.
- Nên dùng khi website có nhiều trang.
- Nên dùng khi muốn tổ chức code chuyên nghiệp.

#### Câu hỏi thêm

Nếu cùng một element có cả inline, internal và external CSS cùng áp dụng một thuộc tính, thông thường **inline CSS thắng** vì inline CSS có độ ưu tiên cao hơn selector trong internal và external CSS.

Tuy nhiên, kết quả cuối cùng còn phụ thuộc vào cascade, specificity, thứ tự khai báo và `!important`. Nếu external hoặc internal CSS có `!important`, nó có thể thắng inline CSS bình thường. Nếu cả hai rule có cùng mức ưu tiên và cùng specificity, rule viết sau sẽ được áp dụng.

---

### Câu A2 — CSS Selectors

Cho HTML:

```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```

Kết quả chọn element:

| Selector | Element được chọn |
|---|---|
| `h1` | Chọn thẻ `<h1>` có nội dung `ShopTLU` |
| `.price` | Chọn 2 thẻ `<p class="price">`: `25.990.000đ` và `45.990.000đ` |
| `#app header` | Chọn thẻ `<header class="top-bar dark">` nằm bên trong `#app` |
| `nav a:first-child` | Chọn link đầu tiên trong `nav`: `Home` |
| `.product.featured h2` | Chọn thẻ `<h2>` trong article có đủ 2 class `product` và `featured`: `MacBook Pro` |
| `article > p` | Chọn tất cả thẻ `<p>` là con trực tiếp của `<article>`: `25.990.000đ`, `Mô tả sản phẩm...`, `45.990.000đ`, `Mô tả sản phẩm...` |
| `a[href="/"]` | Chọn thẻ `<a>` có `href="/"`: `Home` |
| `.top-bar.dark h1` | Chọn thẻ `<h1>` nằm trong element có cả class `top-bar` và `dark`: `ShopTLU` |

File kiểm chứng: `selectors_test.html`  
Ảnh minh họa: `screenshots/A2_selectors_test.png`

---

### Câu A3 — Box Model

#### Trường hợp 1: content-box mặc định

CSS:

```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

Vì `box-sizing` mặc định là `content-box`, giá trị `width: 400px` chỉ tính phần content.

Chiều rộng hiển thị thực tế:

```txt
content + padding trái/phải + border trái/phải
= 400 + 20 + 20 + 5 + 5
= 450px
```

Không gian chiếm trên trang nếu tính cả margin:

```txt
450 + margin trái + margin phải
= 450 + 10 + 10
= 470px
```

Kết luận:

- Chiều rộng hiển thị = `450px`
- Không gian chiếm trên trang = `470px`

#### Trường hợp 2: border-box

CSS:

```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

Vì dùng `box-sizing: border-box`, `width: 400px` đã bao gồm content, padding và border.

Chiều rộng hiển thị:

```txt
400px
```

Kích thước content thực tế:

```txt
400 - padding trái/phải - border trái/phải
= 400 - 20 - 20 - 5 - 5
= 350px
```

Không gian chiếm trên trang nếu tính cả margin:

```txt
400 + 10 + 10
= 420px
```

Kết luận:

- Chiều rộng hiển thị = `400px`
- Kích thước content thực tế = `350px`
- Không gian chiếm trên trang = `420px`

#### Trường hợp 3: Margin collapse

CSS:

```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

Nếu hai block nằm liên tiếp theo chiều dọc, margin dọc có thể bị collapse. Khi cả hai margin đều dương, khoảng cách giữa hai box sẽ bằng margin lớn hơn, không phải tổng hai margin.

```txt
max(25px, 40px) = 40px
```

Kết luận:

- Khoảng cách giữa `box-a` và `box-b` = `40px`
- Không phải `65px` vì margin dọc giữa hai block liền kề bị collapse.

#### Nâng cao

Nếu:

```css
.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
```

Khi một margin âm và một margin dương collapse với nhau, khoảng cách được tính bằng cách cộng hai giá trị:

```txt
40px + (-10px) = 30px
```

Kết luận: Khoảng cách = `30px`.

---

### Câu A4 — Specificity

Element:

```html
<p class="price" id="main-price">...</p>
```

Các rule:

```css
p { color: black; }             /* Rule A */
.price { color: blue; }         /* Rule B */
#main-price { color: red; }     /* Rule C */
p.price { color: green; }       /* Rule D */
```

#### 1. Specificity score

| Rule | Selector | Specificity `(a,b,c)` | Giải thích |
|---|---|---|---|
| Rule A | `p` | `(0,0,1)` | Có 1 element selector |
| Rule B | `.price` | `(0,1,0)` | Có 1 class selector |
| Rule C | `#main-price` | `(1,0,0)` | Có 1 id selector |
| Rule D | `p.price` | `(0,1,1)` | Có 1 class và 1 element |

#### 2. Element có màu gì?

Element sẽ có màu `red`.

Giải thích: Rule C có selector `#main-price` với specificity `(1,0,0)`. ID selector có độ ưu tiên cao hơn class selector và element selector, nên Rule C thắng các rule còn lại.

#### 3. Nếu thêm inline style

```html
<p class="price" id="main-price" style="color: orange;">...</p>
```

Element sẽ có màu `orange`.

Giải thích: Inline style có độ ưu tiên cao hơn các rule CSS thông thường trong file CSS hoặc trong thẻ `<style>`.

#### 4. Nếu Rule A thêm `!important`

Nếu sửa Rule A thành:

```css
p { color: black !important; }
```

Element sẽ có màu `black`.

Giải thích: `!important` làm declaration được ưu tiên hơn các declaration thông thường. Vì vậy, dù selector `p` có specificity thấp hơn `#main-price`, rule có `!important` vẫn thắng các rule thường. Nếu có nhiều rule cùng `!important`, khi đó mới so sánh specificity và thứ tự khai báo.

---

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Style trang Profile

File thực hiện:

- `profile.html`
- `style.css`

Các yêu cầu đã làm:

- Dòng đầu CSS có `* { box-sizing: border-box; }`
- Body có `font-family`, `background-color`, `color`, `line-height`
- Header có background gradient, text trắng, padding lớn hơn 20px
- Navigation link có trạng thái mặc định, hover và active
- Table kỹ năng có `border-collapse`
- Header row của table có background đậm, text trắng
- Có zebra striping bằng `tr:nth-child(even)`
- Có hover row bằng `tr:hover`
- Footer có background đậm, text nhạt, căn giữa

Các loại selector đã sử dụng trong `style.css`:

| Loại selector | Ví dụ |
|---|---|
| Universal selector | `*` |
| Element selector | `body`, `header`, `table`, `footer` |
| Class selector | `.site-header`, `.active`, `.profile-card` |
| ID selector | `#skills`, `#contact` |
| Descendant selector | `.main-nav a`, `.skills-table th` |
| Pseudo-class selector | `.main-nav a:hover`, `.skills-table tbody tr:nth-child(even)`, `.skills-table tbody tr:hover` |

Ảnh kết quả: `screenshots/B1_profile_styled.png`

---

### Bài B2 — Box Model Lab

File thực hiện:

- `boxmodel_lab.html`
- `boxmodel.css`

#### Phần 1 — content-box vs border-box

Hai hộp có cùng CSS cơ bản:

```css
width: 300px;
padding: 20px;
border: 5px solid;
```

Hộp 1 dùng:

```css
box-sizing: content-box;
```

Tính toán:

```txt
300 + 20 + 20 + 5 + 5 = 350px
```

Kết quả mong đợi:

```txt
Hộp 1 (content-box): chiều rộng thực tế = 350px
```

Hộp 2 dùng:

```css
box-sizing: border-box;
```

Kết quả mong đợi:

```txt
Hộp 2 (border-box): chiều rộng thực tế = 300px
```

Giải thích: Với `content-box`, width chỉ tính phần content, còn padding và border cộng thêm ra ngoài. Với `border-box`, width đã bao gồm content, padding và border.

Ảnh cần chụp:

- `screenshots/B2_content_box_devtools.png`
- `screenshots/B2_border_box_devtools.png`

#### Phần 2 — Layout 3 cột

Container rộng `1000px`.

Nếu không dùng `border-box`:

```txt
Sidebar: 250 + 15 + 15 = 280px
Content: 500 + 20 + 20 = 540px
Ads: 250 + 15 + 15 = 280px
Tổng = 1100px
```

Vì `1100px > 1000px`, layout dễ bị tràn hoặc vỡ.

Nếu dùng `border-box`, mỗi cột giữ đúng width khai báo:

```txt
250 + 500 + 250 = 1000px
```

Vì vậy layout vừa khít container.

Ảnh cần chụp:

- `screenshots/B2_three_columns_broken.png`
- `screenshots/B2_three_columns_fixed.png`

---

### Bài B3 — Specificity Battle

File thực hiện:

- `specificity.html`
- `specificity.css`

Element:

```html
<p id="demo" class="text highlight">Hello World</p>
```

10 rules đã viết trong `specificity.css`, sắp xếp từ thấp đến cao:

| STT | Selector | Specificity | Màu |
|---|---|---|---|
| 1 | `p` | `(0,0,1)` | black |
| 2 | `section p` | `(0,0,2)` | gray |
| 3 | `.text` | `(0,1,0)` | blue |
| 4 | `.highlight` | `(0,1,0)` | green |
| 5 | `p.text` | `(0,1,1)` | purple |
| 6 | `.text.highlight` | `(0,2,0)` | orange |
| 7 | `.battle .text.highlight` | `(0,3,0)` | brown |
| 8 | `#demo` | `(1,0,0)` | red |
| 9 | `p#demo.text` | `(1,1,1)` | teal |
| 10 | `#specificity-page #demo` | `(2,0,0)` | crimson |

Element cuối cùng hiển thị màu `crimson`.

Giải thích: Rule số 10 có specificity cao nhất `(2,0,0)` vì có 2 ID selector. Do đó nó thắng các rule còn lại.

Nếu thay đổi thứ tự các rule trong file CSS, kết quả chỉ đổi khi các rule có cùng specificity. Với các rule có specificity khác nhau, rule có specificity cao hơn vẫn thắng dù viết trước hay viết sau. Trong bài này, rule `#specificity-page #demo` có specificity cao nhất nên element vẫn có màu `crimson` nếu rule này còn tồn tại và không bị rule `!important` khác ghi đè.

Ảnh kết quả: `screenshots/B3_specificity.png`

---

## PHẦN C — DEBUG & SUY LUẬN

### Câu C1 — Debug CSS Layout

CSS ban đầu:

```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

#### 1. Tính chiều rộng thực tế

Vì mặc định là `content-box`, chiều rộng thực tế bằng:

```txt
width + padding trái + padding phải + border trái + border phải
```

Sidebar:

```txt
300 + 20 + 20 + 1 + 1 = 342px
```

Content:

```txt
660 + 30 + 30 + 1 + 1 = 722px
```

Tổng:

```txt
342 + 722 = 1064px
```

#### 2. Vì sao layout bị vỡ?

Container chỉ rộng `960px`, nhưng tổng chiều rộng thực tế của sidebar và content là `1064px`. Vì tổng chiều rộng lớn hơn container, content không đủ chỗ nằm cạnh sidebar nên bị đẩy xuống dòng mới hoặc layout bị tràn.

#### 3. Hai cách sửa

##### Cách 1: Dùng border-box

```css
* {
    box-sizing: border-box;
}

.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}

.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

Khi dùng `border-box`, `width` đã bao gồm content, padding và border. Vì vậy:

```txt
300 + 660 = 960px
```

Layout sẽ vừa container.

##### Cách 2: Không dùng border-box, tự trừ padding và border

Muốn sidebar chiếm tổng `300px`, content chiếm tổng `660px`, cần tính lại width content-box.

Sidebar:

```txt
width = 300 - 20 - 20 - 1 - 1 = 258px
```

Content:

```txt
width = 660 - 30 - 30 - 1 - 1 = 598px
```

CSS sửa:

```css
.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 258px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}

.content {
    width: 598px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

File kiểm chứng:

- `debug_layout.html`
- `debug_layout.css`

Ảnh kết quả: `screenshots/C1_debug_layout.png`

---

### Câu C2 — Cascade Puzzle

CSS:

```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

HTML:

```html
<body>
    <div class="container">
        <div class="card" id="featured">
            <h2 class="title highlight">Sản phẩm A</h2>
            <p>Mô tả sản phẩm</p>
        </div>
        <div class="card">
            <h2 class="title">Sản phẩm B</h2>
            <p class="highlight">Mô tả sản phẩm B</p>
        </div>
    </div>
</body>
```

#### 1. “Sản phẩm A” có `font-size` và `color` gì?

```txt
font-size = 20px
color = green
```

Giải thích:

- `.card .title { font-size: 20px; }` áp dụng cho h2 có class `title`, nên font-size là `20px`.
- `#featured .title { color: red; }` áp dụng cho h2 trong `#featured`.
- `.highlight { color: green !important; }` cũng áp dụng cho h2 vì h2 có class `highlight`.
- Vì `green` có `!important`, nó thắng `red`.

#### 2. “Mô tả sản phẩm” trong card featured có `color` gì?

```txt
color = blue
```

Giải thích:

- Thẻ `<p>` nằm trong `.card`, mà `.card { color: blue; }`.
- Rule `.card p { color: inherit; }` yêu cầu p kế thừa màu từ cha.
- Cha gần nhất là `.card` có màu blue.
- Vì vậy p có màu `blue`.

#### 3. “Sản phẩm B” có `font-size` và `color` gì?

```txt
font-size = 20px
color = blue
```

Giải thích:

- H2 có class `title`, nằm trong `.card`, nên `.card .title { font-size: 20px; }` áp dụng.
- H2 không có class `highlight` và không nằm trong `#featured`, nên không nhận `green` hoặc `red`.
- Nó kế thừa màu từ `.card`, mà `.card` có `color: blue`.

#### 4. “Mô tả sản phẩm B” có `color` gì?

```txt
color = green
```

Giải thích:

- P có class `highlight`, nên nhận `.highlight { color: green !important; }`.
- P cũng có thể bị ảnh hưởng bởi `.card p { color: inherit; }`, nhưng rule `green !important` mạnh hơn.
- Vì vậy màu cuối cùng là `green`.

File kiểm chứng:

- `cascade_puzzle.html`
- `cascade_puzzle.css`

Ảnh kết quả: `screenshots/C2_cascade_puzzle.png`

---

## PHẦN D — VIDEO THỰC HÀNH OBS


