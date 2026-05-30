# Session 2 — Bootstrap 5 · Portfolio

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5 · Đại học Thủy Lợi

## Nội dung đã làm (4 bài)

| Bài | Yêu cầu | Thể hiện ở đâu |
|-----|---------|----------------|
| 2.1 Bootstrap Conversion | CDN, navbar collapse, hero, grid `row/col`, progress | `index.html` |
| 2.2 Blog Layout + Sidebar | Layout 8/4, blog cards, **sticky sidebar**, 4 widget (search, categories, recent, tags) | `blog.html` |
| 2.3 Comment Section | Form bình luận, threaded comments + 1 reply lồng, avatar, nút reply | `blog.html` (cuối phần main) |
| 2.4 Theme Customize | Override `--bs-primary` indigo → **teal**, slate palette, font Inter, bo góc card/btn/input | `css/custom-theme.css` |

## Cách chạy

Mở `index.html` bằng **Live Server** (VS Code) hoặc `python3 -m http.server` rồi vào `http://localhost:8000`. Cần Internet để tải Bootstrap CDN + Google Font + ảnh placeholder.

- Trang chủ: `index.html` (navbar → hero → giới thiệu → kỹ năng → dự án → liên hệ)
- Blog: bấm nút **Blog** trên navbar → `blog.html`

## Theme (Bài 2.4)

Bảng màu chính (ghi trong `custom-theme.css`):

| Màu | Hex | Dùng cho |
|-----|-----|----------|
| Teal 500 | `#14b8a6` | primary, link, badge |
| Teal 600 | `#0d9488` | hover |
| Slate 900 | `#0f172a` | tiêu đề |
| Slate 700 | `#334155` | body text |
| Slate 50 | `#f8fafc` | nền trang |

Bo góc: card 16px, button 8px, input 10px. Font: Inter.

## Kế hoạch commit (≥ 12 commit, đúng convention `[TYPE] Mô tả`)

```bash
# Bài 2.1
git commit -m "[BOOTSTRAP] Add Bootstrap CDN and initial setup"
git commit -m "[REFACTOR] Convert grid to Bootstrap cols"
git commit -m "[STYLE] Apply Bootstrap typography utilities"
# Bài 2.2
git commit -m "[FEATURE] Create blog post cards layout"
git commit -m "[FEATURE] Build sticky sidebar"
git commit -m "[FEATURE] Add categories and tags cloud"
# Bài 2.3
git commit -m "[FEATURE] Build comment form with Bootstrap"
git commit -m "[FEATURE] Display threaded comments"
git commit -m "[STYLE] Responsive comment layout"
# Bài 2.4
git commit -m "[CUSTOMIZE] Override Bootstrap primary color"
git commit -m "[CUSTOMIZE] Add custom spacing scale"
git commit -m "[THEME] Apply complete new color palette"
```

> Gợi ý: làm tới đâu commit tới đó (đừng dồn 1 lần) để đủ 12 commit theo rubric.
