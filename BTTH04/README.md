# Session 4 — React Basics

- **Họ tên:** Lê Trần Tiến Bảo
- **MSV:** 2251172247
- **Lớp:** 64KTPM5 · Đại học Thủy Lợi

## Nội dung đã làm (7 bài)

| Bài | Yêu cầu | Ở đâu |
|-----|---------|-------|
| 4.0 DOM vs React | Todo vanilla + Todo React (CDN) + reflection | `exercises/00_vanilla_vs_react/` |
| 4.5 JSX Basics | PortfolioHero, SkillBadge / ProjectCard + conditional + list | `exercises/05_jsx_basics/` |
| 4.6 Component Extraction | Component tree + tách 5 component ShopVN | `exercises/06_component_extraction/` |
| 4.1 React Setup | Vite project + Header/Hero/About/Skills/Footer + App compose | `projects/portfolio_react/` |
| 4.2 State + Props | data array, useState, ProjectCard, render .map() | `Portfolio.jsx`, `data/portfolio.js` |
| 4.3 Category Filter | filter state, event handler, .filter(), active styling | `Portfolio.jsx` |
| 4.4 Contact Form | useState formData, handleChange, validateForm, submit | `Contact.jsx` |

## Cách chạy

**Bài 4.0 / 4.5 / 4.6** (dùng CDN, không cần cài): mở thẳng file `.html` bằng Live Server hoặc double-click. Cần Internet để tải React + Babel CDN.

**Project Portfolio React (Vite):**
```bash
cd projects/portfolio_react
npm install
npm run dev
```
Mở link `http://localhost:5173` mà Vite in ra.

> Đã build thử bằng `npm run build` — pass, 40 modules, không lỗi.

## Kế hoạch commit (≥ 22 commit, format `[TYPE] Mô tả`)

```bash
# Bài 4.0 (2)
git commit -m "[FEATURE] Implement vanilla JS todo list"
git commit -m "[FEATURE] Implement React todo list with same functionality"
# Bài 4.5 (2)
git commit -m "[COMPONENT] Create PortfolioHero and SkillBadge components"
git commit -m "[FEATURE] Implement ProjectCard with conditional rendering"
# Bài 4.6 (2)
git commit -m "[REFACTOR] Create component tree diagram"
git commit -m "[COMPONENT] Extract Navbar Hero ProductCard Footer components"
# Bài 4.1 (5)
git commit -m "[SETUP] Initialize Vite React project"
git commit -m "[COMPONENT] Create Header component"
git commit -m "[COMPONENT] Create Hero component"
git commit -m "[COMPONENT] Create Footer component"
git commit -m "[LAYOUT] Assemble App.jsx layout"
# Bài 4.2 (4)
git commit -m "[DATA] Create projects data array"
git commit -m "[STATE] Add useState for projects"
git commit -m "[COMPONENT] Create ProjectCard component"
git commit -m "[FEATURE] Render project list from state"
# Bài 4.3 (4)
git commit -m "[STATE] Add filter category state"
git commit -m "[EVENT] Add filter button click handlers"
git commit -m "[FEATURE] Implement filtered rendering logic"
git commit -m "[STYLE] Add active filter button styling"
# Bài 4.4 (4)
git commit -m "[STATE] Add form data state object"
git commit -m "[EVENT] Add input onChange handlers"
git commit -m "[VALIDATION] Add form validation logic"
git commit -m "[FEATURE] Implement form submit handler"
```

> Lưu ý: rubric chấm "tự code, không copy nguyên file" — nên đọc hiểu rồi gõ lại theo ý mình.
