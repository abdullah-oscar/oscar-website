import { NewsCard } from "./newsroom/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icons";
import { sortedNews } from "@/lib/newsroom";

/**
 * Homepage newsroom strip — the three most recent items, then out to
 * /newsroom for the rest. Deliberately not filterable: this is a signal
 * that the company is shipping and being talked about, not a place to
 * browse. Renders nothing at all when there's no news, rather than
 * advertising an empty shelf.
 */
export function Newsroom() {
  const items = sortedNews().slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section id="newsroom" className="border-y border-line bg-mist py-20 md:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <span className="kicker text-brand-600">Newsroom</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl">
                What&rsquo;s new at Oscar
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <a
              href="/newsroom"
              className="btn-ghost rounded-lg px-4 py-2.5 text-[14px]"
            >
              View all news
              <Icon name="arrow" width={15} height={15} />
            </a>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i + 1}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
