import { blogCategories } from '@/content/blog';

/** Category filter pills. Category pages don't exist yet, so they link to "#"; "All" is current. */
export function CategoryNav() {
  return (
    <nav aria-label="Categories" className="mx-auto max-w-[1200px] px-6 pb-10">
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {blogCategories.map((category) => {
          const isCurrent = category === 'All';
          return (
            <li key={category}>
              <a
                href="#"
                aria-current={isCurrent ? 'page' : undefined}
                className={`box-border inline-flex h-11 items-center rounded-full px-[18px] text-[15px] font-semibold no-underline ${
                  isCurrent
                    ? 'bg-ink-900 text-paper hover:text-paper'
                    : 'border border-line bg-white text-ink-900 hover:border-ink-900 hover:text-ink-900'
                }`}
              >
                {category}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
