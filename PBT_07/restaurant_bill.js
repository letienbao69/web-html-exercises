// ===== Câu C2 — Tính hóa đơn nhà hàng =====

function inHoaDon(monAn, options = {}) {
  const { isWednesday = false, hasTip = false } = options;

  // 1) Tính tổng từng món + tổng cộng
  let tong = 0;
  const dong = [];
  for (let i = 0; i < monAn.length; i++) {
    const m = monAn[i];
    const thanhTien = m.gia * m.soLuong;
    tong += thanhTien;
    dong.push(
      `${i + 1}. ${m.ten.padEnd(10)} x${m.soLuong}  @${(m.gia / 1000)}k`
      + ` = ${(thanhTien / 1000)}k`
    );
  }

  // 2) Xác định % giảm theo bậc
  let phanTramGiam = 0;
  if (tong > 1000000) phanTramGiam = 15;
  else if (tong > 500000) phanTramGiam = 10;
  if (isWednesday) phanTramGiam += 5;   // thứ 4 giảm thêm 5%

  const giamGia = tong * phanTramGiam / 100;
  const sauGiam = tong - giamGia;

  // 3) VAT 8% trên giá sau giảm
  const vat = sauGiam * 0.08;

  // 4) Tip 5% (optional)
  const tip = hasTip ? sauGiam * 0.05 : 0;

  const thanhToan = sauGiam + vat + tip;

  // 5) In hóa đơn
  const dinhDang = (n) => n.toLocaleString("vi-VN") + "đ";
  console.log("╔════════════════════════════════════════╗");
  console.log("║           HÓA ĐƠN NHÀ HÀNG             ║");
  console.log("╠════════════════════════════════════════╣");
  for (const d of dong) console.log("║ " + d.padEnd(38) + " ║");
  console.log("╠════════════════════════════════════════╣");
  console.log("║ " + ("Tổng cộng:        " + dinhDang(tong)).padEnd(38) + " ║");
  console.log("║ " + (`Giảm giá (${phanTramGiam}%):     ` + dinhDang(giamGia)).padEnd(38) + " ║");
  console.log("║ " + ("VAT (8%):         " + dinhDang(Math.round(vat))).padEnd(38) + " ║");
  if (hasTip) console.log("║ " + ("Tip (5%):         " + dinhDang(Math.round(tip))).padEnd(38) + " ║");
  console.log("╠════════════════════════════════════════╣");
  console.log("║ " + ("THANH TOÁN:       " + dinhDang(Math.round(thanhToan))).padEnd(38) + " ║");
  console.log("╚════════════════════════════════════════╝");

  return Math.round(thanhToan);
}

// ===== Test =====
const order = [
  { ten: "Phở bò",  gia: 65000, soLuong: 2 },
  { ten: "Trà đá",  gia: 5000,  soLuong: 3 },
  { ten: "Bún chả", gia: 55000, soLuong: 1 },
];

inHoaDon(order, { isWednesday: false, hasTip: true });

console.log("\n--- Đơn lớn > 1 triệu, ngày thứ 4 ---");
const orderLon = [
  { ten: "Lẩu bò",   gia: 450000, soLuong: 2 },
  { ten: "Hải sản",  gia: 300000, soLuong: 1 },
];
inHoaDon(orderLon, { isWednesday: true, hasTip: false });
