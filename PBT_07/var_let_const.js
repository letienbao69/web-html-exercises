// ===== Câu A1 — var / let / const (kiểm chứng) =====
// Một số đoạn ném lỗi nên bọc try/catch để chạy hết.

// Đoạn 1 — hoisting của var: khai báo được "kéo lên", gán thì không
console.log("Đoạn 1:");
console.log(x);   // undefined
var x = 5;

// Đoạn 2 — let nằm trong Temporal Dead Zone -> ReferenceError
console.log("Đoạn 2:");
try {
  console.log(y);
  let y = 10;
} catch (e) {
  console.log("Lỗi:", e.message);   // Cannot access 'y' before initialization
}

// Đoạn 3 — gán lại const -> TypeError
console.log("Đoạn 3:");
try {
  const z = 15;
  z = 20;
  console.log(z);
} catch (e) {
  console.log("Lỗi:", e.message);   // Assignment to constant variable.
}

// Đoạn 4 — const với mảng: binding bất biến, NỘI DUNG vẫn đổi được
console.log("Đoạn 4:");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);   // [1, 2, 3, 4]

// Đoạn 5 — block scope của let
console.log("Đoạn 5:");
let a = 1;
{
  let a = 2;
  console.log("Trong block:", a);   // 2
}
console.log("Ngoài block:", a);     // 1
