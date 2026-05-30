// ===== Bài B3 — Infinite Scroll Gallery (Picsum) =====

const gallery = document.querySelector("#gallery");
const loadMore = document.querySelector("#loadMore");
const trigger = document.querySelector("#trigger");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");

let page = 1;
const LIMIT = 20;
let isLoading = false;

// Observer 1: LAZY LOAD — chỉ tải ảnh khi vào viewport
const lazyObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;           // gán src thật khi cần
      img.addEventListener("load", () => img.classList.add("loaded"));
      obs.unobserve(img);                  // tải xong thì thôi theo dõi
    }
  });
}, { rootMargin: "100px" });

async function loadMorePhotos() {
  if (isLoading) return;
  isLoading = true;
  loadMore.classList.add("active");

  try {
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const photos = await res.json();

    photos.forEach(photo => {
      const img = document.createElement("img");
      // ảnh thu nhỏ 400px cho lưới
      img.dataset.src = `https://picsum.photos/id/${photo.id}/400/400`;
      img.dataset.full = `https://picsum.photos/id/${photo.id}/1200/800`;
      img.alt = `Ảnh của ${photo.author}`;
      gallery.appendChild(img);
      lazyObserver.observe(img);           // đăng ký lazy-load
    });
    page++;
  } catch (err) {
    loadMore.querySelector("span").textContent = "Lỗi tải ảnh: " + err.message;
  } finally {
    isLoading = false;
    loadMore.classList.remove("active");
  }
}

// Observer 2: INFINITE SCROLL — chạm #trigger gần đáy thì tải tiếp
const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMorePhotos();
}, { rootMargin: "200px" });
scrollObserver.observe(trigger);

// Lightbox: click ảnh -> phóng to
gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightboxImg.src = e.target.dataset.full;
    lightbox.classList.remove("hidden");
  }
});
function closeLightbox() { lightbox.classList.add("hidden"); lightboxImg.src = ""; }
lightbox.querySelector(".close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

// Tải lô đầu tiên
loadMorePhotos();
