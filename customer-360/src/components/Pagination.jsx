import { ChevronLeft, ChevronRight } from 'lucide-react';

function buildPageList(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const keep = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const pages = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withEllipsis = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) withEllipsis.push('ellipsis-' + p);
    withEllipsis.push(p);
  });
  return withEllipsis;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(page, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="paginationArrow"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      {pages.map((p) =>
        typeof p === 'string' ? (
          <span key={p} className="paginationEllipsis">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={`paginationPage${p === page ? ' paginationPageActive' : ''}`}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        className="paginationArrow"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
