"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-white/90 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-6 md:px-8">
          <a href="#top" aria-label="Oscar AI home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-slate transition-colors hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={site.links.login}
              className="btn-ghost rounded-lg px-4 py-2 text-sm"
            >
              Log in
            </a>
            <a
              href={site.links.demo}
              className="btn-primary rounded-lg px-4 py-2 text-sm"
            >
              Request a demo
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-line bg-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-navy transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-navy transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-navy transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 top-[68px] bg-navy/25 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`fixed inset-x-0 top-[68px] border-b border-line bg-white p-5 shadow-panel transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            <a
              href={site.links.login}
              className="btn-ghost rounded-lg px-4 py-3 text-[15px]"
            >
              Log in
            </a>
            <a
              href={site.links.demo}
              className="btn-primary rounded-lg px-4 py-3 text-[15px]"
            >
              Request a demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
