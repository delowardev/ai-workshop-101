const pageLink =
  'box-border inline-flex h-11 items-center justify-center rounded-full font-semibold no-underline';

/** Pagination for the article list. Other pages don't exist yet, so links point to "#". */
export function Pagination() {
  return (
    <nav aria-label="Pagination" className="mx-auto flex max-w-[1200px] justify-center px-6 pb-24">
      <ul className="m-0 flex list-none gap-2 p-0">
        <li>
          <a href="#" aria-current="page" aria-label="Page 1" className={`${pageLink} w-11 bg-ink-900 text-paper hover:text-paper`}>
            1
          </a>
        </li>
        {[2, 3].map((n) => (
          <li key={n}>
            <a href="#" aria-label={`Page ${n}`} className={`${pageLink} w-11 border border-ink-300 text-ink-900 hover:border-ink-900 hover:text-ink-900`}>
              {n}
            </a>
          </li>
        ))}
        <li>
          <a href="#" className={`${pageLink} border border-ink-300 px-[18px] text-ink-900 hover:border-ink-900 hover:text-ink-900`}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
