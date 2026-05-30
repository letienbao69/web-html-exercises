# User Directory (CRUD)

**API:** JSONPlaceholder — `https://jsonplaceholder.typicode.com/users`
- GET /users, GET /users/:id, POST /users, PUT /users/:id, DELETE /users/:id

> Lưu ý: JSONPlaceholder là API giả lập — POST/PUT/DELETE trả kết quả "như thật" nhưng không lưu trên server, nên thay đổi được cập nhật ở phía client.

**Cách chạy:** Mở `index.html` bằng Live Server. Cần Internet.

**Tính năng:** READ (skeleton loader) + CREATE/UPDATE/DELETE (toast thông báo) + SEARCH client-side. Tách rõ `api` layer và `ui` layer.
