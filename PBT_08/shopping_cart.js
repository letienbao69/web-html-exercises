// ===== Bài B2 — Giỏ hàng (Closure, không dùng class) =====

function createCart() {
  // Dữ liệu "private" — bên ngoài không truy cập trực tiếp được
  let items = [];               // [{ id, name, price, quantity }]
  let discount = { type: null, value: 0 }; // mã giảm đang áp dụng

  function findIndex(id) {
    return items.findIndex(i => i.id === id);
  }

  return {
    addItem(product, quantity = 1) {
      const idx = findIndex(product.id);
      if (idx >= 0) items[idx].quantity += quantity;      // đã có -> tăng
      else items.push({ ...product, quantity });
      return this;
    },

    removeItem(productId) {
      items = items.filter(i => i.id !== productId);
      return this;
    },

    updateQuantity(productId, newQuantity) {
      const idx = findIndex(productId);
      if (idx >= 0) {
        if (newQuantity <= 0) items.splice(idx, 1);       // <=0 thì xóa
        else items[idx].quantity = newQuantity;
      }
      return this;
    },

    applyDiscount(code) {
      if (code === "SALE10") discount = { type: "percent", value: 10 };
      else if (code === "SALE20") discount = { type: "percent", value: 20 };
      else if (code === "FREESHIP") discount = { type: "fixed", value: 30000 };
      else { console.log(`Mã '${code}' không hợp lệ`); return this; }
      console.log(`Đã áp dụng mã ${code}`);
      return this;
    },

    getSubtotal() {
      return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },

    getTotal() {
      const sub = this.getSubtotal();
      if (discount.type === "percent") return sub - sub * discount.value / 100;
      if (discount.type === "fixed")   return Math.max(0, sub - discount.value);
      return sub;
    },

    getItemCount() {
      return items.reduce((sum, i) => sum + i.quantity, 0);
    },

    clearCart() { items = []; discount = { type: null, value: 0 }; return this; },

    printCart() {
      const f = (n) => n.toLocaleString("vi-VN");
      console.log("┌──────────────────────────────────────────────────────┐");
      console.log("│ #  Sản phẩm        SL   Đơn giá        Tổng           │");
      console.log("├──────────────────────────────────────────────────────┤");
      items.forEach((i, idx) => {
        const line =
          `${idx + 1}  ${i.name.padEnd(14)} ${String(i.quantity).padStart(2)}   `
          + `${f(i.price).padStart(11)}   ${f(i.price * i.quantity).padStart(12)}`;
        console.log("│ " + line.padEnd(54) + " │");
      });
      console.log("├──────────────────────────────────────────────────────┤");
      console.log("│ " + (`Tổng tạm tính:  ${f(this.getSubtotal())}đ`).padEnd(54) + " │");
      if (discount.type) console.log("│ " + (`Sau giảm giá:   ${f(Math.round(this.getTotal()))}đ`).padEnd(54) + " │");
      console.log("└──────────────────────────────────────────────────────┘");
    },
  };
}

// ===== Test =====
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // -> iPhone thành 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());   // 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // 2
