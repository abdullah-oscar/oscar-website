"use client";

import { useState } from "react";
import { LiveDashboard } from "./LiveDashboard";
import { AskOscarChat } from "./AskOscarChat";
import { Icon } from "@/components/ui/icons";

const tabs = [
  { id: "dashboard", label: "Live dashboard", icon: "trend" as const },
  { id: "chat", label: "Ask Oscar", icon: "chat" as const },
];

/**
 * Tabbed visual for the "What Oscar sees" section — both views are
 * illustrative mockups (see caption below), standing in until real product
 * screenshots land in /public/product.
 */
export function ProductShowcase() {
  const [active, setActive] = useState<"dashboard" | "chat">("dashboard");

  return (
    <div>
      <div className="mb-3 flex gap-1.5 rounded-full border border-line bg-white p-1 shadow-sm w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id as "dashboard" | "chat")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${
              active === t.id
                ? "bg-navy text-white"
                : "text-slate hover:text-navy"
            }`}
          >
            <Icon name={t.icon} width={14} height={14} />
            {t.label}
          </button>
        ))}
      </div>

      {active === "dashboard" ? <LiveDashboard /> : <AskOscarChat />}

      <p className="mt-3 text-center text-[11px] text-muted">
        Illustrative example — not a real customer account.
      </p>
    </div>
  );
}
