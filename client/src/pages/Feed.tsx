/*
 * PhDNexus Feed — Idea Browsing Page
 * Design: White catalogue mode with sub-nav pill filters
 * Progressive loading: Papers appear as they're fetched from OpenAlex
 */
import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas, fields } from "@/lib/data";
import { fetchIdeasByField, fetchTrendingFields } from "@/lib/dataFetcher";
import type { Idea } from "@/lib/data";

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
  const [allIdeas, setAllIdeas] = useState<Idea[]>(ideas);
  const [loading, setLoading] = useState(false);
  const [availableFields, setAvailableFields] = useState(fields);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load trending fields from OpenAlex on mount
  useEffect(() => {
    const loadTrendingFields = async () => {
      try {
        const trendingFields = await fetchTrendingFields();
        if (trendingFields.length > 0) {
          const uniqueFields = Array.from(new Set(["All Fields", ...trendingFields]));
          setAvailableFields(uniqueFields);
        }
      } catch (error) {
        console.error("Error loading trending fields:", error);
      }
    };
    loadTrendingFields();
  }, []);

  // Progressive loading: Fetch papers and display them as they arrive
  useEffect(() => {
    if (selectedField !== "All Fields") {
      setLoading(true);
      setIsLoadingMore(true);
      setAllIdeas([]); // Clear previous results
      
      const loadIdeasProgressively = async () => {
        try {
          // Fetch papers from OpenAlex
          const openAlexIdeas = await fetchIdeasByField(selectedField, 30);
          
          if (openAlexIdeas.length > 0) {
            // Display papers progressively (simulate streaming effect)
            for (let i = 0; i < openAlexIdeas.length; i++) {
              // Add papers one by one with a small delay for visual effect
              await new Promise((resolve) => setTimeout(resolve, 50));
              setAllIdeas((prev) => [...prev, openAlexIdeas[i]]);
            }
          } else {
            toast.info("No papers found for this field");
            setAllIdeas([]);
          }
        } catch (error) {
          console.error("Error loading ideas:", error);
          toast.error("Failed to load papers from OpenAlex");
          setAllIdeas([]);
        } finally {
          setLoading(false);
          setIsLoadingMore(false);
        }
      };
      
      loadIdeasProgressively();
    } else {
      setAllIdeas(ideas);
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [selectedField]);

  const filtered = useMemo(() => {
    let result = [...allIdeas];

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

    // Sort
    if (selectedSort === "upvotes") {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else if (selectedSort === "comments") {
      result.sort((a, b) => b.comments - a.comments);
    } else if (selectedSort === "collab") {
      result.sort((a, b) => (b.seekingCollaboration ? 1 : -1));
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [allIdeas, selectedStatus, showCollab, searchQuery, selectedSort]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section style={{ background: "#000000", padding: "48px 0", borderBottom: "1px solid #f2f2f2" }}>
        <div className="container">
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>
            Explore Research Ideas
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)" }}>
            Discover cutting-edge peer-reviewed research across all disciplines, powered by OpenAlex
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section style={{ background: "#ffffff", padding: "24px 0", borderBottom: "1px solid #f2f2f2" }}>
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
                borderRadius: 6,
                border: "1px solid #e8e8e8",
              }}
            >
              <Search size={18} color="#999999" />
              <input
                type="text"
                placeholder="Search papers, topics, researchers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
            <button
              onClick={() => toast.info("Advanced filters coming soon")}
              style={{
                padding: "12px 16px",
                background: "#ffffff",
                border: "1px solid #e8e8e8",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <SlidersHorizontal size={18} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section style={{ background: "#ffffff", padding: "24px 0", borderBottom: "1px solid #f2f2f2" }}>
        <div className="container">
          {/* Field Filter */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#666666", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Research Field
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {availableFields.map((field, idx) => (
                <button
                  key={`field-${idx}-${field}`}
                  onClick={() => setSelectedField(field)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #e8e8e8",
                    background: selectedField === field ? "#000000" : "#ffffff",
                    color: selectedField === field ? "#ffffff" : "#000000",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedField !== field) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#000000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedField !== field) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e8e8e8";
                    }
                  }}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#666666", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Status
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #e8e8e8",
                    background: selectedStatus === filter.value ? "#000000" : "#ffffff",
                    color: selectedStatus === filter.value ? "#ffffff" : "#000000",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStatus !== filter.value) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#000000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStatus !== filter.value) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e8e8e8";
                    }
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & Toggle */}
          <div style={{ display: "flex", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#666666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Sort
              </p>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSort(opt.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: selectedSort === opt.value ? "1px solid #000000" : "1px solid #e8e8e8",
                    background: selectedSort === opt.value ? "#000000" : "#ffffff",
                    color: selectedSort === opt.value ? "#ffffff" : "#000000",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCollab(!showCollab)}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: showCollab ? "2px solid #ffed00" : "1px solid #e8e8e8",
                background: showCollab ? "rgba(255,237,0,0.1)" : "#ffffff",
                color: "#000000",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🤝 Seeking Collaboration
            </button>
          </div>
        </div>
      </section>

      {/* Ideas Grid with Progressive Loading */}
      <section style={{ flex: 1, padding: "48px 0" }}>
        <div className="container">
          {loading && allIdeas.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
              <div style={{ textAlign: "center" }}>
                <Loader2 className="animate-spin" size={32} style={{ marginBottom: 16, marginLeft: "auto", marginRight: "auto" }} />
                <p style={{ fontSize: 14, color: "#666666" }}>Fetching papers from OpenAlex...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#000000", marginBottom: 8 }}>
                No papers found
              </p>
              <p style={{ fontSize: 14, color: "#999999" }}>
                Try selecting a different research field or adjusting your filters
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#999999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {filtered.length} Results {isLoadingMore && <span style={{ marginLeft: 8 }}>• Loading more...</span>}
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 24,
                }}
              >
                {filtered.map((idea) => (
                  <div
                    key={idea.id}
                    style={{
                      animation: "fadeInUp 400ms cubic-bezier(0.23,1,0.32,1) forwards",
                      opacity: 0,
                    }}
                  >
                    <IdeaCard idea={idea} />
                  </div>
                ))}
              </div>
              {isLoadingMore && (
                <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                  <Loader2 className="animate-spin" size={24} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
