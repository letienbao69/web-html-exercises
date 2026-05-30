// ===== Bài B3 — Mini Game: Đoán số =====
// Chạy trên browser (mở guess_number.html, bấm "Bắt đầu chơi").

function startGame() {
  const target = Math.floor(Math.random() * 100) + 1; // số bí mật 1..100
  const MAX = 7;            // giới hạn 7 lần
  let soLan = 0;            // đếm số lần đoán hợp lệ
  const daDoan = [];        // lưu các số đã đoán

  while (soLan < MAX) {
    const input = prompt(
      `Đoán số 1–100 (lần ${soLan + 1}/${MAX}):` +
      (daDoan.length ? `\nĐã đoán: ${daDoan.join(", ")}` : "")
    );

    // Người chơi bấm Cancel
    if (input === null) {
      alert("Đã thoát game.");
      return;
    }

    const guess = Number(input);

    // Validate: phải là số nguyên trong 1..100
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      alert("⚠️ Vui lòng nhập SỐ NGUYÊN từ 1 đến 100!");
      continue; // không tính lượt
    }

    // Đã đoán số này rồi
    if (daDoan.includes(guess)) {
      alert("⚠️ Bạn đã đoán số này rồi! Thử số khác.");
      continue; // không tính lượt
    }

    daDoan.push(guess);
    soLan++;

    if (guess === target) {
      alert(`🎉 Đúng rồi! Bạn đoán đúng sau ${soLan} lần!`);
      return;
    } else if (guess < target) {
      alert("⬆️ Cao hơn!");
    } else {
      alert("⬇️ Thấp hơn!");
    }
  }

  // Hết lượt mà chưa đúng
  alert(`😢 Bạn đã thua! Đáp án là ${target}.`);
}
