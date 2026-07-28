"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NewsCard, NewsFeatured } from "./NewsCard";
import { Icon } from "@/components/ui/icons";
import { newsFilters, pressContact, type NewsFilter, type NewsItem } from "@/lib/newsroom";

/**
 * Filterable newsroom index.
 *
 * The lead story only gets the featured treatment on the unfiltered view.
 * Once someone has narrowed to a category they're scanning, not being sold
 * to, so every result gets equal weight.
 */
export function NewsList({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState<NewsFilter>("all");

  const shown = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.kind === filter)),
    [items, filter]
  );

  // Which categories actually have content — no dead tabs.
  const available = useMemo(() => new Set(items.map((i) => i.kind)), [items]);

  const [lead, ...rest] = shown;
  const featured = filter === "all" ? lead : null;
  const grid = filter === "all" ? rest : shown;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter news">
        {newsFilters.map((f) => {
          if (f.id !== "all" && !available.has(f.id)) return null;
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active ? "text-white" : "text-slate hover:text-navy"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="newsFilterPill"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line-2 bg-mist/60 p-12 text-center">
          <p className="font-medium text-navy">Nothing here yet.</p>
          <p className="mt-1.5 text-[14px] text-slate">
            New announcements land here first.{" "}
            <a
              href={`mailto:${pressContact.email}`}
              className="font-medium text-brand-600 underline-offset-2 hover:underline"
            >
              Get in touch
            </a>{" "}
            for media enquiries.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          {featured && (
            <motion.div layout className="mb-5">
              <NewsFeatured item={featured} />
            </motion.div>
          )}

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {grid.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NewsCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* press kit + contact */}
      <div className="mt-14 grid gap-4 rounded-xl border border-line bg-mist/60 p-6 sm:grid-cols-2 md:p-8">
        <div>
          <h2 className="text-[19px] font-semibold">Press kit</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate">
            Logos, product imagery, and boilerplate for journalists and partners.
          </p>
          <a
            href="/logos/oscar-main-logo.png"
            download
            className="btn-ghost mt-4 rounded-lg px-4 py-2.5 text-[14px]"
          >
            <Icon name="download" width={15} height={15} />
            Download brand assets
          </a>
        </div>
        <div className="sm:border-l sm:border-line sm:pl-8">
          <h2 className="text-[19px] font-semibold">{pressContact.label}</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate">
            We aim to respond to press enquiries within one business day.
          </p>
          <a
            href={`mailto:${pressContact.email}`}
            className="btn-primary mt-4 rounded-lg px-4 py-2.5 text-[14px]"
          >
            <Icon name="mail" width={15} height={15} />
            {pressContact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
