# Multi-API Dashboard

**3 API gọi song song bằng Promise.allSettled:**
- Open-Meteo (thời tiết Hà Nội)
- REST Countries (`https://restcountries.com/v3.1/name/vietnam`)
- Random User (`https://randomuser.me/api/?results=4`)

**Cách chạy:** Mở `index.html` bằng Live Server. Cần Internet.

**Tính năng:** mỗi widget có state riêng (loading/success/error) — 1 API lỗi không ảnh hưởng widget khác; nút Refresh All; hiển thị thời gian tải "X ms".
