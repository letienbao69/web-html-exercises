# BTTH01 - Session 1 HTML/CSS Fundamentals

## Sinh viên

- Họ tên: Lê Trần Tiến Bảo
- Bài làm: Portfolio cá nhân responsive bằng HTML, CSS và JavaScript cơ bản

## Cấu trúc thư mục

```txt
session_01_html_css/
├── README.md
├── exercises/
│   ├── 01_hero_section.md
│   ├── 02_about_skills.md
│   ├── 03_portfolio_gallery.md
│   ├── 04_contact_footer.md
│   ├── Portfolio _ Your Name.pdf
│   └── README.md
├── solutions/
│   └── README.md
└── projects/
    └── portfolio_site/
        ├── index.html
        ├── assets/
        │   ├── profile.svg
        │   ├── project-1.svg
        │   ├── project-2.svg
        │   ├── project-3.svg
        │   ├── project-4.svg
        │   ├── project-5.svg
        │   └── project-6.svg
        ├── css/
        │   ├── variables.css
        │   ├── base.css
        │   ├── header.css
        │   ├── hero.css
        │   ├── about.css
        │   ├── skills.css
        │   ├── portfolio.css
        │   ├── contact.css
        │   └── footer.css
        └── js/
            └── main.js
```

## Cách chạy bài

Cách nhanh nhất:

1. Mở thư mục `projects/portfolio_site`.
2. Mở file `index.html` trực tiếp bằng trình duyệt.

Hoặc chạy bằng VS Code Live Server:

1. Mở folder `session_01_html_css` bằng VS Code.
2. Cài extension `Live Server` nếu chưa có.
3. Chuột phải vào `projects/portfolio_site/index.html`.
4. Chọn `Open with Live Server`.

## Nội dung đã hoàn thành

### Bài 1.1 - Header + Hero Section

- Header dùng semantic `<header>` và `<nav>`.
- Header sticky khi scroll.
- Logo bên trái, navigation bên phải.
- Navigation có hover underline effect.
- Mobile menu dùng CSS-only checkbox hack.
- Hero full viewport height.
- Background gradient.
- Nội dung hero căn giữa ngang/dọc.
- CTA button có hover scale và shadow.

### Bài 1.2 - About + Skills Section

- About section dùng CSS Grid 2 cột trên desktop.
- Mobile chuyển thành 1 cột.
- Avatar tròn, responsive 300px desktop và 200px mobile.
- Text có phân cấp rõ: heading, lead paragraph, body text.
- Skills grid 2 cột desktop, 1 cột mobile.
- Đủ 4 kỹ năng: HTML5, CSS3, JavaScript, React.
- Progress bar có label phần trăm.
- Progress bar animation bằng IntersectionObserver trong `js/main.js`.

### Bài 1.3 - Portfolio Grid Gallery

- Có 6 portfolio items.
- Category đúng yêu cầu: 3 web, 2 mobile, 1 design.
- Desktop 3 cột, tablet 2 cột, mobile 1 cột.
- Hover image zoom.
- Overlay text hiện khi hover.
- CSS-only lightbox dùng `:target` selector.
- Lightbox có nút close.

### Bài 1.4 - Contact Form + Footer

- Contact section layout 2 cột desktop, 1 cột mobile.
- Labels luôn hiển thị, không chỉ dùng placeholder.
- Input, textarea có focus effect.
- Có validation UI với `:valid` và `:invalid`.
- Submit button có hover effect.
- Footer 3 cột desktop, 1 cột mobile.
- Social icons dùng inline SVG.
- Social icons có hover scale/color.
- Có copyright text.

## Commit messages theo đúng convention

Repo trong thư mục này đã có sẵn lịch sử commit mẫu theo yêu cầu. Kiểm tra bằng lệnh:

```bash
git log --oneline --reverse
```

Kết quả cần có các commit sau:

```txt
[SETUP] Initialize project structure
[STYLE] Add base CSS variables and reset
[FEATURE] Implement header navigation
[FEATURE] Complete hero section with CTA
[STYLE] Create about section layout
[FEATURE] Add skills progress bars
[REFACTOR] Optimize responsive breakpoints
[FEATURE] Build portfolio grid layout
[UI] Add hover zoom effects
[FEATURE] Implement CSS-only lightbox
[FEATURE] Style contact form inputs
[FEATURE] Add responsive footer
[REFACTOR] Final responsive adjustments
```

## Checklist trước khi nộp

- [x] Header sticky trên mọi breakpoint
- [x] Hero section full viewport height
- [x] CTA button có hover animation
- [x] Mobile hamburger menu hoạt động
- [x] About section responsive
- [x] Avatar circular và responsive
- [x] Skills progress bars có animation khi scroll
- [x] Portfolio grid responsive 3/2/1 columns
- [x] Hover zoom effect hoạt động
- [x] CSS-only lightbox hoạt động
- [x] Contact form responsive
- [x] Form inputs có focus effect
- [x] Labels visible
- [x] Footer responsive
- [x] Social icons có hover effect
- [x] Commit messages đúng format `[TYPE] Description`
