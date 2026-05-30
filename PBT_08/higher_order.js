// ===== Bài B3 — Higher-Order Functions =====

// 1. pipe() — nối chuỗi hàm, output của hàm này là input hàm kế tiếp
function pipe(...fns) {
  return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

const process = pipe(
  x => x * 2,         // 5 -> 10
  x => x + 10,        // 10 -> 20
  x => x.toString(),  // 20 -> "20"
  x => "Kết quả: " + x
);
console.log("1) pipe:", process(5)); // "Kết quả: 20"

// 2. memoize() — lưu cache kết quả theo tham số
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("   Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});
console.log("2) memoize lần 1:", expensiveCalc(1000000)); // in "Đang tính..." + 499999500000
console.log("2) memoize lần 2:", expensiveCalc(1000000)); // lấy cache, KHÔNG in "Đang tính..."

// 3. debounce() — chỉ chạy sau khi ngừng gọi 'delay' ms
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => console.log("3) Searching:", query), 500);
search("a"); search("ab"); search("abc"); // gọi liên tục -> chỉ "abc" chạy sau 500ms

// 4. retry() — thử lại tối đa maxAttempts lần nếu hàm async ném lỗi
async function retry(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`   Lần ${attempt} lỗi: ${err.message}`);
      if (attempt === maxAttempts) throw err;
    }
  }
}

// Demo retry: thất bại 2 lần đầu, thành công lần 3
let count = 0;
const unstable = () => new Promise((resolve, reject) => {
  count++;
  count < 3 ? reject(new Error("mạng lỗi")) : resolve("OK ✓");
});

retry(unstable, 3)
  .then(r => console.log("4) retry:", r))
  .catch(e => console.log("4) retry thất bại:", e.message));
