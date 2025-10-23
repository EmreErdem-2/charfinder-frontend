import React, { useEffect, useState, useRef } from "react";
import usePagination from "../services/usePagination";
import "./collapsible.css";

/**
 * Props:
 * - fetchPage(page, pageSize) => Promise<{ items: Array, total: number }>
 * - pageSize (default 10)
 * - placeholder (default "Select an item")
 * - initiallyOpen (default false)
 */
export default function CollapsibleList({
  fetchPage,
  pageSize = 10,
  placeholder = "Select an item",
  initiallyOpen = false,
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  const {
    page,
    total,
    items,
    loading,
    loadPage,   // Promise-returning
    goToPage,   // Promise-returning
    refresh,    // Promise-returning
    pageCount,
  } = usePagination(fetchPage, pageSize);

  // close on outside click
  const rootRef = useRef();
  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function handleSelect(item) {
    setSelected(item);
    setOpen(false);
  }

  function handleRefresh() {
    setError(null);
    refresh().catch((err) => setError(err?.message || "Failed to refresh"));
  }

  return (
    <div className="collapsible" ref={rootRef}>
      <button
        type="button"
        className="collapsible-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="collapsible-title">
          {selected ? selected.name : placeholder}
        </span>
        <span className="collapsible-caret">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <div className="collapsible-panel" role="region" aria-live="polite">
          <div className="collapsible-actions">
            <button
              onClick={() => goToPage(1).catch((e) => setError(e?.message || "Failed"))}
              disabled={loading || page === 1}
            >
              First
            </button>
            <button
              onClick={() => goToPage(page - 1).catch((e) => setError(e?.message || "Failed"))}
              disabled={loading || page === 1}
            >
              Prev
            </button>
            <span className="page-info" style={{color:'black'}}>
              Page {page} of {Math.max(1, pageCount)}
            </span>
            <button
              onClick={() => goToPage(page + 1).catch((e) => setError(e?.message || "Failed"))}
              disabled={loading || page >= pageCount}
            >
              Next
            </button>
            <button onClick={handleRefresh} disabled={loading}>
              Refresh
            </button>
          </div>

          {loading && <div className="collapsible-loading">Loading…</div>}
          {error && <div className="collapsible-error">{error}</div>}

          {!loading && items.length === 0 && (
            <div className="collapsible-empty">No items</div>
          )}

          <ul className="collapsible-list">
            {items.map((it) => (
              <li key={it.id} className="collapsible-list-item">
                <button
                  type="button"
                  className={`item-button ${selected?.id === it.id ? "selected" : ""}`}
                  onClick={() => handleSelect(it)}
                >
                  <div className="item-name">{it.name}</div>
                  <div className="item-meta">{it.meta ?? ""}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}