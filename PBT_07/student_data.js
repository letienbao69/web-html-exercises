// ===== Bài B2 — Xử lý dữ liệu sinh viên (chỉ loops + if/else) =====

const students = [
  { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
  { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
  { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
  { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
  { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
  { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];

// Hàm xếp loại
function xepLoai(tb) {
  if (tb >= 8.0) return "Giỏi";
  if (tb >= 6.5) return "Khá";
  if (tb >= 5.0) return "Trung bình";
  return "Yếu";
}

// 1) Tính điểm trung bình cho mỗi SV (math*0.4 + physics*0.3 + cs*0.3)
for (let i = 0; i < students.length; i++) {
  const s = students[i];
  s.tb = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
  s.loai = xepLoai(s.tb);   // 2) xếp loại
}

// 3) In bảng kết quả
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < students.length; i++) {
  const s = students[i];
  const stt   = String(i + 1).padEnd(3);
  const ten   = s.name.padEnd(6);
  const tb    = s.tb.toFixed(1).padEnd(4);
  const loai  = s.loai.padEnd(11);
  console.log(`| ${stt} | ${ten} | ${tb} | ${loai} |`);
}

// 4) Đếm số SV mỗi xếp loại
const dem = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < students.length; i++) {
  dem[students[i].loai]++;
}
console.log("\n4) Số SV theo xếp loại:");
for (const loai in dem) {
  console.log(`   ${loai}: ${dem[loai]}`);
}

// 5) SV có TB cao nhất / thấp nhất
let cao = students[0], thap = students[0];
for (let i = 1; i < students.length; i++) {
  if (students[i].tb > cao.tb)  cao = students[i];
  if (students[i].tb < thap.tb) thap = students[i];
}
console.log(`\n5) Cao nhất: ${cao.name} (${cao.tb.toFixed(1)}) | Thấp nhất: ${thap.name} (${thap.tb.toFixed(1)})`);

// 6) Điểm TB toàn lớp từng môn
let sumMath = 0, sumPhys = 0, sumCs = 0;
for (let i = 0; i < students.length; i++) {
  sumMath += students[i].math;
  sumPhys += students[i].physics;
  sumCs   += students[i].cs;
}
const n = students.length;
console.log("\n6) TB toàn lớp từng môn:");
console.log(`   Toán: ${(sumMath / n).toFixed(2)} | Lý: ${(sumPhys / n).toFixed(2)} | Tin: ${(sumCs / n).toFixed(2)}`);

// 7) Bonus — TB theo giới tính (dựa trên điểm tb đã tính)
let sumM = 0, cntM = 0, sumF = 0, cntF = 0;
for (let i = 0; i < students.length; i++) {
  if (students[i].gender === "M") { sumM += students[i].tb; cntM++; }
  else                            { sumF += students[i].tb; cntF++; }
}
console.log("\n7) TB theo giới tính:");
console.log(`   Nam (M): ${(sumM / cntM).toFixed(2)} | Nữ (F): ${(sumF / cntF).toFixed(2)}`);
