// ===== Bài B4 — FizzBuzz nâng cao =====

// Version 1: Classic (1..100)
console.log("=== Version 1: Classic ===");
for (let i = 1; i <= 100; i++) {
  let out = "";
  if (i % 3 === 0) out += "Fizz";
  if (i % 5 === 0) out += "Buzz";
  console.log(out || i);   // nếu out rỗng thì in số
}

// Version 2: Custom — hoạt động với BẤT KỲ bộ rules nào
function customFizzBuzz(n, rules) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    let word = "";
    for (let r = 0; r < rules.length; r++) {
      if (i % rules[r].divisor === 0) word += rules[r].word;
    }
    result.push(word || i);
  }
  return result;
}

// Test
console.log("\n=== Version 2: Custom (n=35) ===");
const rules = [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
];
const out = customFizzBuzz(35, rules);
// In vài giá trị kiểm chứng
console.log("15 =>", out[14]);   // FizzBuzz
console.log("21 =>", out[20]);   // FizzJazz
console.log("35 =>", out[34]);   // BuzzJazz

// 105 cần n >= 105
const out2 = customFizzBuzz(105, rules);
console.log("105 =>", out2[104]); // FizzBuzzJazz
