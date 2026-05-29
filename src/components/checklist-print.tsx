"use client";

export function ChecklistPrintButton() {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => window.print()}
    >
      Print checklist
      <span className="arrow" aria-hidden />
    </button>
  );
}
