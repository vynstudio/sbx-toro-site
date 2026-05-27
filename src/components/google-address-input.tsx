"use client";

import { useEffect, useRef } from "react";

// Google Places address autocomplete. Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
// (Maps JavaScript API + Places API). Falls back to a plain text input — with
// browser autofill — when the key is missing, so the form works either way.

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type GAutocomplete = {
  addListener: (event: string, cb: () => void) => void;
  getPlace: () => { formatted_address?: string };
};
type GoogleMaps = {
  maps?: {
    places?: {
      Autocomplete: new (
        el: HTMLInputElement,
        opts: Record<string, unknown>,
      ) => GAutocomplete;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleMaps;
    __gmapsPromise?: Promise<void>;
  }
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps?.places) return Promise.resolve();
  if (window.__gmapsPromise) return window.__gmapsPromise;
  window.__gmapsPromise = new Promise<void>((resolve, reject) => {
    if (!KEY) return reject();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&loading=async`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.head.appendChild(s);
  });
  return window.__gmapsPromise;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  autoComplete?: string;
};

export function GoogleAddressInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  autoComplete = "street-address",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!KEY || !inputRef.current) return;
    let cancelled = false;
    loadGoogleMaps()
      .then(() => {
        const places = window.google?.maps?.places;
        if (cancelled || !inputRef.current || !places) return;
        const ac = new places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "us" },
          fields: ["formatted_address"],
          types: ["geocode"],
        });
        ac.addListener("place_changed", () => {
          const addr = ac.getPlace()?.formatted_address;
          if (addr) onChangeRef.current(addr);
        });
      })
      .catch(() => {
        /* no key / load failed — plain input still works */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      autoComplete={autoComplete}
      placeholder={placeholder}
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
