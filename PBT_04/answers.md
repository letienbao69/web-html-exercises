# PHIẾU BÀI TẬP 04 - CSS LAYOUT

Họ và tên: Lê Trần Tiến Bảo 
MSSV: 2251172247  
Lớp: 64KTPM5  

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| `static` | Có | Theo normal flow mặc định của tài liệu | Có | Phần tử bình thường, không cần điều chỉnh vị trí |
| `relative` | Có | Vị trí ban đầu của chính nó trong normal flow | Có | Dịch nhẹ phần tử, làm mốc cho phần tử absolute bên trong |
| `absolute` | Không | Nearest positioned ancestor; nếu không có thì tham chiếu vùng gốc của tài liệu | Có, nếu vùng tham chiếu nằm trong tài liệu cuộn | Badge trên card, dropdown menu, tooltip |
| `fixed` | Không | Viewport của trình duyệt | Không | Header cố định, nút scroll to top, chat box |
| `sticky` | Có trước khi dính | Vị trí trong normal flow và container cuộn gần nhất | Ban đầu cuộn, đến ngưỡng thì dính | Sidebar sticky, menu phụ, tiêu đề bảng dính |

#### Câu hỏi thêm

`absolute` tham chiếu parent khi parent hoặc ancestor gần nhất có `position` khác `static`, ví dụ `relative`, `absolute`, `fixed` hoặc `sticky`. Ancestor đó gọi là **nearest positioned ancestor**.

Ví dụ:

```css
.card {
    position: relative;
}

.badge {
    position: absolute;
    top: 12px;
    right: 12px;
}
```

Trong ví dụ này, `.badge` tham chiếu theo `.card`. Nếu không có ancestor nào được positioned, phần tử `absolute` sẽ tham chiếu theo initial containing block, thường tương đương vùng trang/viewport ban đầu.

---

### Câu A2 — Flexbox vs Grid

#### Trường hợp 1

```css
.container { display: flex; }
.item { flex: 1; }
```

Có 4 items. Cả 4 item chia đều chiều ngang trên một hàng.

```txt
┌────────┬────────┬────────┬────────┐
│ Item 1 │ Item 2 │ Item 3 │ Item 4 │
└────────┴────────┴────────┴────────┘
```

Kết luận: 1 hàng, 4 cột bằng nhau.

#### Trường hợp 2

```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```

Có 6 items. Mỗi item chiếm khoảng 50% chiều ngang, nên mỗi hàng có 2 item.

```txt
┌──────────────┬──────────────┐
│    Item 1    │    Item 2    │
├──────────────┼──────────────┤
│    Item 3    │    Item 4    │
├──────────────┼──────────────┤
│    Item 5    │    Item 6    │
└──────────────┴──────────────┘
```

Kết luận: 3 hàng, mỗi hàng 2 cột.

#### Trường hợp 3

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

Có 3 items. Item đầu nằm sát trái, item cuối sát phải, item giữa nằm giữa khoảng trống. Tất cả được căn giữa theo chiều dọc.

```txt
┌─────────────────────────────────────┐
│ Item 1         Item 2         Item 3│
└─────────────────────────────────────┘
```

#### Trường hợp 4

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}
```

Có 3 items. Grid tạo 3 cột: trái 200px, giữa linh hoạt, phải 200px.

```txt
┌──────────┬────────────────────┬──────────┐
│ 200px    │        1fr         │ 200px    │
│ Item 1   │      Item 2        │ Item 3   │
└──────────┴────────────────────┴──────────┘
```

#### Trường hợp 5

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

Có 7 items. Grid có 3 cột bằng nhau, item thứ 7 nằm ở cột đầu tiên của hàng thứ 3.

```txt
┌────────┬────────┬────────┐
│ Item 1 │ Item 2 │ Item 3 │
├────────┼────────┼────────┤
│ Item 4 │ Item 5 │ Item 6 │
├────────┼────────┼────────┤
│ Item 7 │        │        │
└────────┴────────┴────────┘
```

---

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Positioning Playground

File thực hiện: `positioning.html` và `positioning.css`.

Các yêu cầu đã làm:

1. Fixed header cao 60px, full width, nền đậm, chữ trắng.
2. Logo bên trái, navigation bên phải.
3. Header dùng `position: fixed`, luôn nằm trên cùng khi scroll.
4. Sticky sidebar rộng 250px, dùng `position: sticky; top: 80px;`.
5. Card sản phẩm dùng `position: relative`.
6. Badge `HOT` dùng `position: absolute` ở góc phải trên.
7. Nút scroll to top dùng `position: fixed` ở góc phải dưới.

Ảnh cần chụp:

- `screenshots/B1_fixed_header.png`
- `screenshots/B1_sticky_sidebar.png`
- `screenshots/B1_badge_card.png`

### Bài B2 — Flexbox Navigation & Cards

File thực hiện: `flexbox_layout.html` và `flexbox.css`.

Các yêu cầu đã làm:

1. Navbar ngang dùng Flexbox.
2. Logo nằm bên trái, menu nằm giữa, nút Login/Register bên phải.
3. Dùng `justify-content: space-between`, `align-items: center`, `gap`.
4. Menu có hover đổi màu và underline.
5. Product cards dùng `display: flex; flex-wrap: wrap;`.
6. Mỗi card dùng `flex: 0 0 calc(25% - 15px)`.
7. Bên trong card dùng flex column.
8. Nút “Mua” dính đáy bằng `margin-top: auto`.
9. Có 8 cards.
10. Hover card có `transform: translateY(-5px)` và tăng `box-shadow`.

Ảnh cần chụp:

- `screenshots/B2_flexbox_navbar.png`
- `screenshots/B2_flexbox_cards.png`
- `screenshots/B2_flexbox_responsive.png`

### Bài B3 — Grid Layout E-Commerce

File thực hiện: `grid_layout.html` và `grid.css`.

Các yêu cầu đã làm:

1. Layout chính dùng CSS Grid.
2. Có header, hero và footer full width.
3. Có sidebar filter bên trái, main content ở giữa, ads aside bên phải.
4. Grid chính dùng `grid-template-areas`.
5. Có `grid-template-columns: 200px minmax(0, 1fr) 200px`.
6. Main có grid con 3 cột product cards.
7. Có ít nhất 6 product cards.
8. Hero có card nổi bật và product nổi bật dùng `grid-column: span 2`.

Ảnh cần chụp:

- `screenshots/B3_grid_layout_full.png`
- `screenshots/B3_grid_product_cards.png`

---

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

1. **Navigation bar ngang:** dùng Flexbox vì navbar là layout một chiều theo hàng ngang, cần `justify-content` và `align-items`.
2. **Lưới ảnh Instagram:** dùng Grid vì đây là layout hai chiều gồm hàng và cột, dễ tạo 3 cột đều nhau.
3. **Layout blog main + sidebar:** dùng Grid vì có vùng layout rõ ràng, dễ tạo cột chính linh hoạt và sidebar cố định.
4. **Footer 4 cột:** dùng Grid nếu muốn chia cột đều và dễ responsive; Flexbox cũng dùng được nhưng Grid rõ hơn.
5. **Card sản phẩm:** dùng Flexbox bên trong card vì nội dung xếp dọc, nút mua dính đáy bằng `margin-top: auto`.

### Câu C2 — Debug Flexbox

File kiểm chứng: `debug_flexbox.html` và `debug_flexbox.css`.

#### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

Nguyên nhân: Card chưa dùng `display: flex; flex-direction: column`; nút không có `margin-top: auto`; `18 px` và `10 px` viết sai cú pháp.

Code sửa:

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 0 0 calc(33.333% - 20px);
    display: flex;
    flex-direction: column;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;
    margin-top: auto;
}
```

Ảnh trước/sau: `C2_cards_before.png`, `C2_cards_after.png`.

#### Lỗi 2: Items muốn nằm giữa ngang/dọc trong container 100vh nhưng vẫn dính góc trái trên

Nguyên nhân: `100 vh` sai cú pháp, thiếu `justify-content: center`, thiếu `align-items: center`.

Code sửa:

```css
.hero {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Ảnh trước/sau: `C2_hero_before.png`, `C2_hero_after.png`.

#### Lỗi 3: Sidebar bị co lại khi content quá dài

Nguyên nhân: `250 px` sai cú pháp; flex item mặc định có thể co lại; sidebar cần `flex-shrink: 0`.

Code sửa:

```css
.layout {
    display: flex;
    gap: 20px;
}

.sidebar {
    flex: 0 0 250px;
}

.content {
    flex: 1;
    min-width: 0;
}
```

Ảnh trước/sau: `C2_sidebar_before.png`, `C2_sidebar_after.png`.

---

## PHẦN D — VIDEO THỰC HÀNH OBS

