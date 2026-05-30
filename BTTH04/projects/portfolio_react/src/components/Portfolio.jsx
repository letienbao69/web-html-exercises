// Bài 4.2 + 4.3 — Portfolio với state, list rendering và category filter
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { portfolioItems, categories } from '../data/portfolio';

function Portfolio() {
  // Bài 4.2: state giữ danh sách project
  const [projects] = useState(portfolioItems);
  // Bài 4.3: state giữ category đang chọn
  const [activeCategory, setActiveCategory] = useState('all');

  // Bài 4.3: lọc theo category bằng .filter()
  const visibleProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="section-title">Dự án nổi bật</h2>

        {/* Bài 4.3: filter buttons + event handler + active styling */}
        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bài 4.2: render list từ state bằng .map() với key */}
        {visibleProjects.length === 0 ? (
          <p className="empty">Không có dự án nào trong mục này.</p>
        ) : (
          <div className="project-grid">
            {visibleProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;

// filter handler