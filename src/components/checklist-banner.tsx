"use client";

import { useSearchParams } from "next/navigation";

// Shown at the top of /checklist when a customer arrives straight from the
// /intake form ("?intake=done"). Tells them their intake was received and
// frames the checklist as the next natural step.
export function ChecklistIntakeBanner() {
  const sp = useSearchParams();
  if (sp.get("intake") !== "done") return null;
  return (
    <div className="intake-banner" role="status">
      <span className="intake-banner-check" aria-hidden>✓</span>
      <div>
        <strong>Move-day intake received.</strong>
        <span>
          Now use this checklist to prep before moving day. Print it or tick
          items as you go — it's yours.
        </span>
      </div>
    </div>
  );
}
