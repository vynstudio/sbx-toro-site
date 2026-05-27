"use client";

// Route map panel. The live Google map + drawn route is wired once
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (Maps JS + Directions API) is set. Until then
// it shows a clean placeholder so the two-column layout holds its shape.

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function GoogleRouteMap({ from, to }: { from: string; to: string }) {
  return (
    <div className="route-map">
      <div className="route-map-inner">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <p>
          {from && to
            ? `${from}  →  ${to}`
            : from || to || ""}
        </p>
        <span className="route-map-hint">
          {KEY
            ? "Loading map…"
            : "Live route map activates once the Google Maps key is added."}
        </span>
      </div>
    </div>
  );
}
