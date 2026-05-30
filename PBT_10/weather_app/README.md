# Weather App

**API:** Open-Meteo (không cần API key)
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}`
- Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...`

**Cách chạy:** Mở `index.html` bằng Live Server (VS Code) hoặc `python3 -m http.server` rồi truy cập. Cần Internet.

**Tính năng:** nhập thành phố → 3 state (loading/success/error), lưu 5 thành phố gần nhất vào localStorage.
