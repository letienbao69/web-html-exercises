// ===== Câu C2 — miniArray (tự viết map/filter/reduce) =====

const miniArray = {
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) result.push(arr[i]);
    }
    return result;
  },

  reduce(arr, fn, initialValue) {
    let acc = initialValue;
    let startIndex = 0;
    // Nếu không truyền initialValue: lấy phần tử đầu làm acc
    if (acc === undefined) {
      acc = arr[0];
      startIndex = 1;
    }
    for (let i = startIndex; i < arr.length; i++) {
      acc = fn(acc, arr[i], i, arr);
    }
    return acc;
  },
};

// Test
console.log(miniArray.map([1, 2, 3], x => x * 2));          // [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // 10
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b)); // 10 (không initialValue)

module.exports = miniArray;
