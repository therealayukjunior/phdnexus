/*
 * PhDNexus Search — Global search across ideas, researchers, communities
 * Design: White canvas with dark search header
 * Now powered by OpenAlex API for real research data
 */
import { useState, useMemo, useEffect } from "react";
import { Search as SearchIcon, Lightbulb, Users, Globe, Loader2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas, researchers, communities } from "@/lib/data";
import { globalSearch, fetchCommunities } from "@/lib/dataFetcher";
import type { Idea, Researcher, Community } from "@/lib/data";

type SearchTab = "all" | "ideas" | "researchers" | "communities";

export default function Search() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchTab>("all");
  const [loading, setLoading] = useState(false);
  const [allIdeas, setAllIdeas] = useState<Idea[]>(ideas);
  const [allResearchers, setAllResearchers] = useState<Researcher[]>(researchers);
  const [allCommunities, setAllCommunities] = useState<Community[]>(communities);

  // Load communities on mount
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const fetchedCommunities = await fetchCommunities();
        if (fetchedCommunities.length > 0) {
          setAllCommunities([...communities, ...fetchedCommunities]);
        }
      } catch (error) {
        console.error("Error loading communities:", error);
      }
    };
    loadCommunities();
  }, []);

  // Search OpenAlex when query changes
  useEffect(() => {
    if (query.trim().length > 2) {
      setLoading(true);
      const performSearch = async () => {
        try {
          const results = await globalSearch(query);
          setAllIdeas([...ideas, ...results.ideas]);
          setAllResearchers([...researchers, ...results.researchers]);
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setLoading(false);
        }
      };
      performSearch();
    } else {
      setAllIdeas(ideas);
      setAllResearchers(researchers);
      setLoading(false);
    }
  }, [query]);

  const q = query.toLowerCase().trim();

  const matchedIdeas = useMemo(
    () =>
      q
        ? allIdeas.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.abstract.toLowerCase().includes(q) ||
              i.tags.some((t) => t.toLowerCase().includes(q)) ||
              i.field.toLowerCase().includes(q) ||
              i.author.name.toLowerCase().includes(q)
          )
        : [],
    [q, allIdeas]
  );

  const matchedResearchers = useMemo(
    () =>
      q
        ? allResearchers.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.field.toLowerCase().includes(q) ||
              r.university.toLowerCase().includes(q) ||
              r.bio.toLowerCase().includes(q)
          )
        : [],
    [q, allResearchers]
  );

  const matchedCommunities = useMemo(
    () =>
      q
        ? allCommunities.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.field.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q)
          )
        : [],
    [q, allCommunities]
  );

  const totalResults = matchedIdeas.length + matchedResearchers.length + matchedCommunities.length;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Search Header */}
      <section style={{ background: "#000000", padding: "48px 0" }}>
        <div className="container">
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#ffffff", marginBottom: 24 }}>
            Search PhDNexus
          </h1>

          {/* Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 20px",
              background: "#ffffff",
              borderRadius: 8,
              border: "2px solid #ffed00",
            }}
          >
            <SearchIcon size={20} color="#000000" />
            <input
              type="text"
              placeholder="Search ideas, researchers, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 16,
                outline: "none",
                fontFamily: "Manrope, sans-serif",
              }}
            />
            {loading && <Loader2 className="animate-spin" size={20} color="#000000" />}
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ flex: 1, padding: "48px 0" }}>
        <div className="container">
          {!query.trim() ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <SearchIcon size={48} color="#e8e8e8" style={{ marginBottom: 16, margin: "0 auto 16px" }} />
              <p style={{ fontSize: 18, fontWeight: 600, color: "#000000", marginBottom: 8 }}>
                Start searching
              </p>
              <p style={{ fontSize: 14, color: "#999999" }}>
                Enter at least 3 characters to search across ideas, researchers, and communities
              </p>
            </div>
          ) : loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : totalResults === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#000000", marginBottom: 8 }}>
                No results found
              </p>
              <p style={{ fontSize: 14, color: "#999999" }}>
                Try different keywords or browse communities
              </p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #e8e8e8", marginBottom: 32 }}>
                {(["all", "ideas", "researchers", "communities"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "12px 0",
                      borderBottom: tab === t ? "2px solid #000000" : "none",
                      background: "transparent",
                      border: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      color: tab === t ? "#000000" : "#999999",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {t === "all" ? "All Results" : t}
                    {tab === t && (
                      <span style={{ marginLeft: 8, color: "#ffed00" }}>
                        ({t === "all" ? totalResults : t === "ideas" ? matchedIdeas.length : t === "researchers" ? matchedResearchers.length : matchedCommunities.length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Ideas */}
              {(tab === "all" || tab === "ideas") && matchedIdeas.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  {tab === "all" && (
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                      <Lightbulb size={20} style={{ display: "inline", marginRight: 8 }} />
                      Ideas ({matchedIdeas.length})
                    </h2>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: 24,
                    }}
                  >
                    {(tab === "all" ? matchedIdeas.slice(0, 3) : matchedIdeas).map((idea) => (
                      <IdeaCard key={idea.id} idea={idea} />
                    ))}
                  </div>
                  {tab === "all" && matchedIdeas.length > 3 && (
                    <Link href="/feed" style={{ marginTop: 16, display: "inline-block" }}>
                      <span style={{ color: "#000000", fontWeight: 600, textDecoration: "underline" }}>
                        View all ideas →
                      </span>
                    </Link>
                  )}
                </div>
              )}

              {/* Researchers */}
              {(tab === "all" || tab === "researchers") && matchedResearchers.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  {tab === "all" && (
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                      <Users size={20} style={{ display: "inline", marginRight: 8 }} />
                      Researchers ({matchedResearchers.length})
                    </h2>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {(tab === "all" ? matchedResearchers.slice(0, 3) : matchedResearchers).map((researcher) => (
                      <Link
                        key={researcher.id}
                        href={`/profile/${researcher.id}`}
                        style={{
                          padding: 20,
                          background: "#f7f7f7",
                          borderRadius: 6,
                          textDecoration: "none",
                          transition: "all 150ms",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "#eeeeee";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "#f7f7f7";
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 4,
                              background: researcher.avatarColor,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff",
                              fontWeight: 700,
                              fontSize: 14,
                              flexShrink: 0,
                            }}
                          >
                            {researcher.avatar}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "#000000", marginBottom: 4 }}>
                              {researcher.name}
                            </p>
                            <p style={{ fontSize: 12, color: "#666666", marginBottom: 8 }}>
                              {researcher.university}
                            </p>
                            <p style={{ fontSize: 11, color: "#999999" }}>
                              {researcher.ideas} ideas • {researcher.citations} citations
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Communities */}
              {(tab === "all" || tab === "communities") && matchedCommunities.length > 0 && (
                <div>
                  {tab === "all" && (
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                      <Globe size={20} style={{ display: "inline", marginRight: 8 }} />
                      Communities ({matchedCommunities.length})
                    </h2>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {(tab === "all" ? matchedCommunities.slice(0, 3) : matchedCommunities).map((community) => (
                      <Link
                        key={community.id}
                        href="/communities"
                        style={{
                          padding: 20,
                          background: "#f7f7f7",
                          borderRadius: 6,
                          textDecoration: "none",
                          transition: "all 150ms",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "#eeeeee";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "#f7f7f7";
                        }}
                      >
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#000000", marginBottom: 8 }}>
                          {community.name}
                        </p>
                        <p style={{ fontSize: 12, color: "#666666", marginBottom: 12 }}>
                          {community.description}
                        </p>
                        <p style={{ fontSize: 11, color: "#999999" }}>
                          {community.members} members • {community.ideas} ideas
                        </p>
                      </Link>
                    ))}
                  </div>
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
