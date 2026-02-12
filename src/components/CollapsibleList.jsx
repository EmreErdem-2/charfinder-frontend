import React, { useEffect, useRef, useState } from "react";
import usePagination from "../services/usePagination";
import "./collapsible.css";
import InfoPopup from "./InfoPopup";

export default function CollapsibleList({
  fetchPage,
  onSelect,
  value,
  collection = "feats",
  filter = "deprecated!=true",
  fields = "id,name,rarity,description,deprecated",
  sort,
  pageSize = 10,
  placeholder = "Select an item",
  disabled = true,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [data, setData] = useState(null);

  // search state
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // debounce search
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(searchInput), 400);
    return () => clearTimeout(id);
  }, [searchInput]);

  // build effective filter
  const effectiveFilter = [
    filter,
    searchTerm ? `name=="${searchTerm}"` : null,
  ]
    .filter(Boolean)
    .join(";");

  const {
    page,
    items,
    loading,
    goToPage,
    refresh,
    pageCount,
  } = usePagination(
    fetchPage,
    collection,
    effectiveFilter,
    fields,
    sort,
    pageSize,
    disabled,
    open
  );

  // close on outside click
  const rootRef = useRef();
  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target) && !popUpOpen) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [popUpOpen]);

  function handleSelect(item) {
    onSelect(item, collection);
    setOpen(false);
  }

  function handleRefresh() {
    setError(null);
    refresh().catch((err) => setError(err?.message || "Failed to refresh"));
  }

  return (
    <>
      {popUpOpen && (
        <InfoPopup
          open={popUpOpen}
          onClose={() => setPopUpOpen(false)}
          info={data}
        />
      )}

      <div
        className={`collapsible ${disabled ? "disabled" : ""}`}
        ref={rootRef}
      >
        <button
          type="button"
          className="collapsible-toggle"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
        >
          <span className="collapsible-title">
            {value ? value.name : placeholder}
          </span>
          <span className="collapsible-caret">{open ? "▾" : "▸"}</span>
        </button>

        {open && (
          <div className="collapsible-panel" role="region" aria-live="polite">
            <div className="collapsible-actions">
              <button
                className="collapsible-btn-first"
                onClick={() =>
                  goToPage(1).catch((e) => setError(e?.message || "Failed"))
                }
                disabled={loading || page === 1}
              >
                First
              </button>
              <button
                className="collapsible-btn-prev"
                onClick={() =>
                  goToPage(page - 1).catch((e) => setError(e?.message || "Failed"))
                }
                disabled={loading || page === 1}
              >
                Prev
              </button>
              <span className="page-info" style={{ color: "black" }}>
                {page}/{Math.max(1, pageCount)}
              </span>
              <button
                className="collapsible-btn-next"
                onClick={() =>
                  goToPage(page + 1).catch((e) => setError(e?.message || "Failed"))
                }
                disabled={loading || page >= pageCount}
              >
                Next
              </button>
              <button
                className="collapsible-btn-refresh"
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </button>
              <button className="collapsible-btn-search"
                onClick={() => {
                    setSearchVisible((v) => {
                    if (v) {
                        // hiding search input clears its contents
                        setSearchInput("");
                        setSearchTerm("");
                    } else {
                        // about to show → wait a tick for render to finish then focus
                        setTimeout(() => {
                        searchInputRef.current?.focus();
                        }, 0);
                    }
                    return !v;
                    });
                }}
              >
                🔍
              </button>
            </div>

            {searchVisible && (
              <div className="collapsible-search">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="collapsible-search-input"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    goToPage(1);
                  }}
                />
              </div>
            )}

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
                    className="collapsible-info-btn"
                    onClick={() => {
                      setData(it);
                      setPopUpOpen(true);
                    }}
                  >
                    ?
                  </button>
                  <button
                    type="button"
                    className={`item-button ${
                      value?.id === it.id ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(it)}
                    style={
                      it.rarity === "COMMON" ? { background: "grey" }
                        : it.rarity === "UNCOMMON" ? { background: "yellow" }
                            : { background: "orange" }
                    }
                  >
                    <div className="item-name">{it.name}</div>
                    <div className="item-meta">{it.level>=1 ? it.level : ""}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}