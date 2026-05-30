// Bài 4.1 — Footer component (map qua socialLinks)
function Footer({ socialLinks }) {
  return (
    <footer className="footer">
      <div className="social">
        {socialLinks.map(link => (
          <a key={link.name} href={link.url} aria-label={link.name}>
            <i className={`bi ${link.icon}`}></i>
          </a>
        ))}
      </div>
      <p>© 2026 Lê Trần Tiến Bảo · 64KTPM5 · Đại học Thủy Lợi</p>
    </footer>
  );
}

export default Footer;
