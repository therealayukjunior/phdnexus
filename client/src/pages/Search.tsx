/*
 * PhDNexus Search — Global search across ideas, researchers, communities
 * Design: White canvas with dark search header
 */
import { useState, useMemo } from "react";
import { Search as SearchIcon, Lightbulb, Users, Globe } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas, researchers, communities } from "@/lib/data";

type SearchTab = "all" | "ideas" | "researchers" | "communities";

export default function Search() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchTab>("all");

  const q = query.toLowerCase().trim();

  const matchedIdeas = useMemo(
    () =>
      q
        ? ideas.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.abstract.toLowerCase().includes(q) ||
              i.tags.some((t) => t.toLowerCase().includes(q)) ||
              i.field.toLowerCase().includes(q) ||
              i.author.name.toLowerCase().includes(q)
          )
        : [],
    [q]
  );

  const matchedResearchers = useMemo(
    () =>
      q
        ? researchers.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.field.toLowerCase().includes(q) ||
              r.university.toLowerCase().includes(q) ||
              r.bio.toLowerCase().includes(q)
          )
        : [],
    [q]
  );

  const matchedCommunities = useMemo(
    () =>
      q
        ? communities.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.field.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q)
          )
        : [],
    [q]
  );

  const totalResults = matchedIdeas.length + matchedResearchers.length + matchedCommunities.length;

  const tabs: { value: SearchTab; label: string; count: number }[] = [
    { value: "all", label: "All", count: totalResults },
    { value: "ideas", label: "Ideas", count: matchedIdeas.length },
    { value: "researchers", label: "Researchers", count: matchedResearchers.length },
    { value: "communities", label: "Communities", count: matchedCommunities.length },
  ];

  const suggestedTerms = [
    "machine learning", "climate change", "quantum", "neuroscience",
    "CRISPR", "blockchain", "microbiome", "dark matter", "epigenetics",
    "reinforcement learning",
  ];

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Search Header — dark */}
      <div style={{ background: "#000000", padding: "64px 0 0" }}>
        <div className="container">
          <p className="overline" style={{ color: "#ffed00", marginBottom: 12 }}>
            Global Search
          </p>
          <h1 className="display-lg" style={{ color: "#ffffff", marginBottom: 32 }}>
            SEARCH
            <br />
            PHDNEXUS
          </h1>

          {/* Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "#ffffff",
              padding: "0 24px",
              height: 64,
              maxWidth: 720,
              borderRadius: 2,
              marginBottom: 32,
            }}
          >
            <SearchIcon size={22} color="#8a8a8a" />
            <input
              type="text"
              placeholder="Search ideas, researchers, communities, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              style={{
                border: "none",
                outline: "none",
                fontSize: 18,
                color: "#000000",
                background: "transparent",
                width: "100%",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  fontSize: 13,
                  color: "#666666",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Tabs */}
          {q && (
            <div className="flex gap-2" style={{ paddingBottom: 0 }}>
              {tabs.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value)}
                  style={{
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: tab === t.value ? "#000000" : "rgba(255,255,255,0.72)",
                    background: tab === t.value ? "#ffffff" : "transparent",
                    border: "none",
                    borderRadius: "2px 2px 0 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 150ms",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {t.label}
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 6px",
                      borderRadius: 46,
                      background: tab === t.value ? "#000000" : "rgba(255,255,255,0.2)",
                      color: tab === t.value ? "#ffffff" : "rgba(255,255,255,0.72)",
                    }}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container" style={{ padding: "48px 16px" }}>
        {!q ? (
          /* Empty state — suggestions */
          <div>
            <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
              Suggested Topics
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: 48 }}>
              {suggestedTerms.map((term) => (
                <button
                  key={term}
                  className="btn-pill"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 1,
                background: "#f2f2f2",
              }}
            >
              {[
                { icon: <Lightbulb size={24} />, label: "Browse Ideas", count: ideas.length, href: "/feed" },
                { icon: <Users size={24} />, label: "Find Researchers", count: researchers.length, href: "/communities" },
                { icon: <Globe size={24} />, label: "Join Communities", count: communities.length, href: "/communities" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "#ffffff",
                      padding: 32,
                      transition: "border-left-color 150ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                      borderLeft: "4px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderLeftColor = "#ffed00";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ marginBottom: 16 }}>{item.icon}</div>
                    <p style={{ fontSize: 28, fontWeight: 700, color: "#000000", lineHeight: 0.95, marginBottom: 8 }}>
                      {item.count}
                    </p>
                    <p className="heading-sm" style={{ color: "#000000" }}>
                      {item.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p className="heading-lg" style={{ color: "#000000", marginBottom: 12 }}>
              No results for "{query}"
            </p>
            <p className="body-md" style={{ color: "#666666", marginBottom: 32 }}>
              Try different keywords or browse by discipline
            </p>
            <Link href="/feed" className="btn-primary">
              Browse All Ideas
            </Link>
          </div>
        ) : (
          <div>
            <p className="body-sm" style={{ color: "#666666", marginBottom: 32 }}>
              {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
            </p>

            {/* Ideas */}
            {(tab === "all" || tab === "ideas") && matchedIdeas.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
                  <p className="overline" style={{ color: "#666666" }}>
                    Ideas ({matchedIdeas.length})
                  </p>
                  {tab === "all" && matchedIdeas.length > 3 && (
                    <button
                      className="btn-pill"
                      onClick={() => setTab("ideas")}
                    >
                      View all {matchedIdeas.length}
                    </button>
                  )}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 1,
                    background: "#f2f2f2",
                  }}
                >
                  {(tab === "all" ? matchedIdeas.slice(0, 3) : matchedIdeas).map((idea, i) => (
                    <div key={idea.id} style={{ background: "#fff" }}>
                      <IdeaCard idea={idea} index={i} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Researchers */}
            {(tab === "all" || tab === "researchers") && matchedResearchers.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <p className="overline" style={{ color: "#666666", marginBottom: 20 }}>
                  Researchers ({matchedResearchers.length})
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 1,
                    background: "#f2f2f2",
                  }}
                >
                  {matchedResearchers.map((r) => (
                    <Link key={r.id} href={`/profile/${r.id}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          background: "#ffffff",
                          padding: 24,
                          transition: "border-left-color 150ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                          borderLeft: "4px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "#ffed00";
                          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        }}
                      >
                        <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              background: "#000000",
                              color: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {r.avatar}
                          </div>
                          <div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "#000000" }}>{r.name}</p>
                            <p style={{ fontSize: 12, color: "#666666" }}>{r.field}</p>
                          </div>
                        </div>
                        <p className="body-sm" style={{ color: "#666666", marginBottom: 12, lineHeight: 1.5 }}>
                          {r.bio.slice(0, 100)}...
                        </p>
                        <div className="flex items-center gap-3">
                          <span style={{ fontSize: 12, color: "#333333", fontWeight: 600 }}>
                            {r.university}
                          </span>
                          <span style={{ fontSize: 12, color: "#8a8a8a" }}>·</span>
                          <span style={{ fontSize: 12, color: "#666666" }}>{r.country}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Communities */}
            {(tab === "all" || tab === "communities") && matchedCommunities.length > 0 && (
              <section>
                <p className="overline" style={{ color: "#666666", marginBottom: 20 }}>
                  Communities ({matchedCommunities.length})
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 1,
                    background: "#f2f2f2",
                  }}
                >
                  {matchedCommunities.map((c) => (
                    <Link key={c.id} href="/communities" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          background: "#ffffff",
                          padding: 24,
                          transition: "border-left-color 150ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                          borderLeft: "4px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "#ffed00";
                          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        }}
                      >
                        <span className="overline" style={{ color: "#666666", display: "block", marginBottom: 8 }}>
                          {c.field}
                        </span>
                        <h3 className="heading-sm" style={{ color: "#000000", marginBottom: 8 }}>
                          {c.name}
                        </h3>
                        <p className="body-sm" style={{ color: "#666666", marginBottom: 16, lineHeight: 1.5 }}>
                          {c.description.slice(0, 100)}...
                        </p>
                        <div className="flex items-center gap-4">
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#000000" }}>
                            {c.members.toLocaleString()}
                          </span>
                          <span style={{ fontSize: 12, color: "#666666" }}>members</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
