// ===== Bài B1 — Máy tính đơn giản =====

function calculate(num1, operator, num2) {
  // 1) Kiểm tra input có phải số không (loại cả NaN và chuỗi không số)
  if (typeof num1 !== "number" || typeof num2 !== "number"
      || Number.isNaN(num1) || Number.isNaN(num2)) {
    return "Lỗi: Input không phải số";
  }

  // 2) Thực hiện theo operator
  switch (operator) {
    case "+": return num1 + num2;
    case "-": return num1 - num2;
    case "*": return num1 * num2;
    case "/":
      if (num2 === 0) return "Lỗi: Không thể chia cho 0";
      return num1 / num2;
    case "%":
      if (num2 === 0) return "Lỗi: Không thể chia cho 0";
      return num1 % num2;
    case "**": return num1 ** num2;
    default:
      return `Lỗi: Operator '${operator}' không hợp lệ`;
  }
}

// ===== Test =====
console.log(calculate(10, "+", 5));     // 15
console.log(calculate(10, "/", 0));     // Lỗi: Không thể chia cho 0
console.log(calculate(10, "^", 5));     // Lỗi: Operator '^' không hợp lệ
console.log(calculate("abc", "+", 5));  // Lỗi: Input không phải số
console.log(calculate(2, "**", 10));    // 1024
