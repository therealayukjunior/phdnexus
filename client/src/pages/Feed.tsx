/*
 * PhDNexus Feed — Idea Browsing Page
 * Design: White catalogue mode with sub-nav pill filters
 * Progressive loading: Real papers from OpenAlex appear as they're fetched
 */
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { fetchIdeasByField, fetchTrendingFields } from "@/lib/dataFetcher";
import type { Idea } from "@/lib/data";

const FALLBACK_FIELDS = [
  "All Fields",
  "Machine Learning",
  "Climate Change",
  "Neuroscience",
  "Quantum Computing",
  "CRISPR Gene Editing",
  "Natural Language Processing",
  "Cancer Research",
  "Renewable Energy",
  "Robotics",
];

const DEFAULT_FIELD = "Machine Learning";

const statusFilters = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "open", label: "Open" },
  { value: "seeking-feedback", label: "Seeking Feedback" },
];

const sortOptions = [
  { value: "upvotes", label: "Most Cited" },
  { value: "recent", label: "Most Recent" },
  { value: "comments", label: "Most Discussed" },
];

export default function Feed() {
  const [selectedField, setSelectedField] = useState(DEFAULT_FIELD);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("upvotes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCollab, setShowCollab] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableFields, setAvailableFields] = useState(FALLBACK_FIELDS);
  const abortRef = useRef<AbortController | null>(null);

  // Load trending fields from OpenAlex on mount
  useEffect(() => {
    fetchTrendingFields()
      .then((fields) => {
        if (fields.length > 0) {
          setAvailableFields(["All Fields", ...Array.from(new Set(fields))]);
        }
      })
      .catch(() => {/* use fallback */});
  }, []);

  // Load papers whenever field changes — progressive display
  useEffect(() => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIdeas([]);
    setLoading(true);

    const query = selectedField === "All Fields" ? "research" : selectedField;

    fetchIdeasByField(query, 30)
      .then((fetched) => {
        if (controller.signal.aborted) return;
        if (fetched.length === 0) {
          toast.info(`No papers found for "${selectedField}"`);
          setLoading(false);
          return;
        }
        // Progressive reveal: add papers one-by-one with 40ms stagger
        let i = 0;
        const interval = setInterval(() => {
          if (controller.signal.aborted) { clearInterval(interval); return; }
          setIdeas((prev) => [...prev, fetched[i]]);
          i++;
          if (i >= fetched.length) {
            clearInterval(interval);
            setLoading(false);
          }
        }, 40);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        toast.error("Failed to load papers from OpenAlex");
        setLoading(false);
      });

    return () => controller.abort();
  }, [selectedField]);

  const filtered = useMemo(() => {
    let result = [...ideas];

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
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedSort === "upvotes") {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else if (selectedSort === "comments") {
      result.sort((a, b) => b.comments - a.comments);
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [ideas, selectedStatus, showCollab, searchQuery, selectedSort]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#000000", padding: "48px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#ffed00", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>
                Powered by OpenAlex · 250M+ Real Research Papers
              </p>
              <h1 style={{ fontSize: 48, fontWeight: 700, color: "#ffffff", marginBottom: 8, lineHeight: 1.1 }}>
                Explore Research Ideas
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>
                Real peer-reviewed papers from the world's largest open research database
              </p>
            </div>
            <a
              href="https://openalex.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "none" }}
            >
              <ExternalLink size={12} />
              openalex.org
            </a>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section style={{ background: "#ffffff", padding: "20px 0", borderBottom: "1px solid #f0f0f0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                background: "#f7f7f7",
                borderRadius: 4,
                border: "1px solid #e8e8e8",
              }}
            >
              <Search size={16} color="#999" />
              <input
                type="text"
                placeholder="Search within results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, outline: "none" }}
              />
            </div>
            <button
              onClick={() => setShowCollab(!showCollab)}
              style={{
                padding: "12px 16px",
                borderRadius: 4,
                border: showCollab ? "2px solid #ffed00" : "1px solid #e8e8e8",
                background: showCollab ? "rgba(255,237,0,0.08)" : "#ffffff",
                color: "#000000",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              🤝 Seeking Collab
            </button>
          </div>
        </div>
      </section>

      {/* Field Filter */}
      <section style={{ background: "#fafafa", padding: "16px 0", borderBottom: "1px solid #f0f0f0", overflowX: "auto" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {availableFields.map((field, idx) => (
              <button
                key={`field-${idx}-${field}`}
                onClick={() => setSelectedField(field)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 4,
                  border: selectedField === field ? "2px solid #000000" : "1px solid #e0e0e0",
                  background: selectedField === field ? "#000000" : "#ffffff",
                  color: selectedField === field ? "#ffffff" : "#333333",
                  fontSize: 13,
                  fontWeight: selectedField === field ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 120ms",
                  whiteSpace: "nowrap",
                }}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sort & Status */}
      <section style={{ background: "#ffffff", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Sort</span>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSort(opt.value)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 4,
                    border: selectedSort === opt.value ? "1px solid #000" : "1px solid #e8e8e8",
                    background: selectedSort === opt.value ? "#000" : "#fff",
                    color: selectedSort === opt.value ? "#fff" : "#333",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</span>
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSelectedStatus(f.value)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 4,
                    border: selectedStatus === f.value ? "1px solid #000" : "1px solid #e8e8e8",
                    background: selectedStatus === f.value ? "#000" : "#fff",
                    color: selectedStatus === f.value ? "#fff" : "#333",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideas Grid */}
      <section style={{ flex: 1, padding: "40px 0" }}>
        <div className="container">
          {/* Status bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Loader2 className="animate-spin" size={16} />
                <span style={{ fontSize: 13, color: "#666" }}>Fetching papers from OpenAlex...</span>
              </div>
            )}
            {!loading && filtered.length > 0 && (
              <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {filtered.length} papers · {selectedField}
              </p>
            )}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#000", marginBottom: 8 }}>No papers found</p>
              <p style={{ fontSize: 14, color: "#999" }}>Try a different research field or clear your search</p>
            </div>
          )}

          {/* Papers grid — renders progressively as papers arrive */}
          {filtered.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {filtered.map((idea, i) => (
                <div
                  key={idea.id}
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 350ms cubic-bezier(0.23,1,0.32,1) ${Math.min(i * 30, 300)}ms forwards`,
                  }}
                >
                  <IdeaCard idea={idea} />
                </div>
              ))}
            </div>
          )}

          {/* Bottom loading indicator */}
          {loading && ideas.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", padding: "32px 0", gap: 8, alignItems: "center" }}>
              <Loader2 className="animate-spin" size={18} />
              <span style={{ fontSize: 13, color: "#666" }}>Loading more papers...</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
