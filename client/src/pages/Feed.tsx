/*
 * PhDNexus Feed — Idea Browsing Page
 * Design: White catalogue mode with sub-nav pill filters
 * 3-column grid, discipline filters, status filters
 */
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas, fields } from "@/lib/data";

const statusFilters = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "seeking-feedback", label: "Seeking Feedback" },
  { value: "in-progress", label: "In Progress" },
  { value: "published", label: "Published" },
];

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "upvotes", label: "Most Upvoted" },
  { value: "comments", label: "Most Discussed" },
  { value: "collab", label: "Seeking Collaboration" },
];

export default function Feed() {
  const [selectedField, setSelectedField] = useState("All Fields");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCollab, setShowCollab] = useState(false);

  const filtered = useMemo(() => {
    let result = [...ideas];

    if (selectedField !== "All Fields") {
      result = result.filter((i) => i.field === selectedField || i.subfield.includes(selectedField));
    }

    if (selectedStatus !== "all") {
      result = result.filter((i) => i.status === selectedStatus);
    }

    if (showCollab) {
      result = result.filter((i) => i.seekingCollaboration);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.abstract.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          i.author.name.toLowerCase().includes(q)
      );
    }

    if (selectedSort === "upvotes") result.sort((a, b) => b.upvotes - a.upvotes);
    else if (selectedSort === "comments") result.sort((a, b) => b.comments - a.comments);
    else if (selectedSort === "collab") result = result.filter((i) => i.seekingCollaboration);

    return result;
  }, [selectedField, selectedStatus, selectedSort, searchQuery, showCollab]);

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <div style={{ background: "#000000", padding: "48px 0 0" }}>
        <div className="container">
          <p className="overline" style={{ color: "#ffed00", marginBottom: 12 }}>
            Research Ideas
          </p>
          <div className="flex items-end justify-between" style={{ paddingBottom: 32 }}>
            <h1 className="display-lg" style={{ color: "#ffffff" }}>
              EXPLORE
              <br />
              IDEAS
            </h1>
            <button
              className="btn-primary"
              onClick={() => toast("Sign in to share your research idea")}
            >
              <Plus size={16} />
              Share Idea
            </button>
          </div>

          {/* Sub-nav discipline pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 16,
              scrollbarWidth: "none",
            }}
          >
            {fields.map((field) => (
              <button
                key={field}
                className={`btn-pill ${selectedField === field ? "active" : ""}`}
                onClick={() => setSelectedField(field)}
                style={{
                  flexShrink: 0,
                  background: selectedField === field ? "#ffed00" : "transparent",
                  color: selectedField === field ? "#000000" : "rgba(255,255,255,0.72)",
                  borderColor: selectedField === field ? "#ffed00" : "rgba(255,255,255,0.3)",
                }}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          background: "#f7f7f7",
          borderBottom: "1px solid #f2f2f2",
          padding: "16px 0",
          position: "sticky",
          top: 60,
          zIndex: 50,
        }}
      >
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div
              style={{
                flex: "1 1 240px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#ffffff",
                border: "1px solid #f2f2f2",
                padding: "0 16px",
                height: 40,
                borderRadius: 2,
              }}
            >
              <Search size={16} color="#8a8a8a" />
              <input
                type="text"
                placeholder="Search ideas, authors, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  color: "#000000",
                  background: "transparent",
                  width: "100%",
                  fontFamily: "Manrope, sans-serif",
                }}
              />
            </div>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                height: 40,
                padding: "0 12px",
                border: "1px solid #f2f2f2",
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 600,
                color: "#000000",
                background: "#ffffff",
                cursor: "pointer",
                fontFamily: "Manrope, sans-serif",
                outline: "none",
              }}
            >
              {statusFilters.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              style={{
                height: 40,
                padding: "0 12px",
                border: "1px solid #f2f2f2",
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 600,
                color: "#000000",
                background: "#ffffff",
                cursor: "pointer",
                fontFamily: "Manrope, sans-serif",
                outline: "none",
              }}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Collab toggle */}
            <button
              onClick={() => setShowCollab(!showCollab)}
              style={{
                height: 40,
                padding: "0 16px",
                border: `1px solid ${showCollab ? "#000000" : "#f2f2f2"}`,
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 600,
                color: showCollab ? "#ffffff" : "#000000",
                background: showCollab ? "#000000" : "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 150ms",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <SlidersHorizontal size={14} />
              Seeking Collaborators
            </button>

            {/* Results count */}
            <span style={{ fontSize: 13, color: "#666666", marginLeft: "auto" }}>
              {filtered.length} idea{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="section-white" style={{ paddingTop: 40 }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p className="heading-lg" style={{ color: "#000000", marginBottom: 12 }}>
                No ideas found
              </p>
              <p className="body-md" style={{ color: "#666666" }}>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 1,
                background: "#f2f2f2",
              }}
            >
              {filtered.map((idea, i) => (
                <div key={idea.id} style={{ background: "#fff" }}>
                  <IdeaCard idea={idea} index={i} />
                </div>
              ))}
            </div>
          )}

          {/* Load more placeholder */}
          {filtered.length > 0 && (
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button
                className="btn-outline"
                onClick={() => toast("More ideas loading — feature coming soon")}
              >
                Load More Ideas
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
