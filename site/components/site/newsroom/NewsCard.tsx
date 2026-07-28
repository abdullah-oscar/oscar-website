import { Icon } from "@/components/ui/icons";
import { formatNewsDate, newsKindLabel, type NewsItem } from "@/lib/newsroom";

const kindChip: Record<NewsItem["kind"], string> = {
  "press-release": "bg-brand-50 text-brand-700 ring-brand-600/15",
  announcement: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  coverage: "bg-mist text-slate ring-line",
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Marks placeholder content so it can never quietly pass as real press. */
function SampleChip() {
  return (
    <span className="inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-inset ring-amber-600/20">
      Sample
    </span>
  );
}

function Meta({ item }: { item: NewsItem }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${kindChip[item.kind]}`}
      >
        {newsKindLabel[item.kind]}
      </span>
      {item.sample && <SampleChip />}
      <time dateTime={item.date} className="text-[12px] text-muted">
        {formatNewsDate(item.date)}
      </time>
    </div>
  );
}

/** The lead story — wider, louder, one per page. */
export function NewsFeatured({ item }: { item: NewsItem }) {
  const external = isExternal(item.href);
  return (
    <a
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card-lift group relative isolate block overflow-hidden rounded-xl border border-line bg-white p-7 shadow-e2 md:p-9"
    >
      {/* `isolate` on the anchor is load-bearing: it makes this a stacking
          context, so the -z-10 wash paints above the card's own background
          instead of escaping to the root and vanishing under it. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-40" />
      <Meta item={item} />
      <h3 className="mt-4 max-w-2xl text-balance text-2xl font-semibold leading-[1.15] md:text-[2rem]">
        {item.title}
      </h3>
      <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-slate">{item.excerpt}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-600">
        {item.outlet ? `Read on ${item.outlet}` : "Read the full story"}
        <Icon
          name={external ? "external" : "arrow"}
          width={14}
          height={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const external = isExternal(item.href);
  return (
    <a
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card-lift group flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-e1"
    >
      <Meta item={item} />
      <h3 className="mt-3 text-balance text-[17px] font-semibold leading-[1.25]">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-slate">
        {item.excerpt}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 pt-1 text-[13px] font-medium text-brand-600">
        {item.outlet ?? "Read more"}
        <Icon
          name={external ? "external" : "arrow"}
          width={13}
          height={13}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}
