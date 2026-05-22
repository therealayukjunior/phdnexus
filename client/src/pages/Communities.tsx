/*
 * PhDNexus Communities — Research community browser
 * Design: Dark hero, white grid of community cards
 */
import { useState } from "react";
import { Link } from "wouter";
import { Users, Lightbulb, ArrowRight, Search } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { communities, researchers, ideas } from "@/lib/data";

const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663653558884/jGSmnnGcZQN8SuMzkeuwqq/community-section-W9iDh4aLLqNMr2yv9fWdHW.webp";

export default function Communities() {
  const [search, setSearch] = useState("");

  const filtered = communities.filter(
    (c) =>
      !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.field.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero — dark */}
      <section
        style={{
          background: "#000000",
          position: "relative",
          overflow: "hidden",
          padding: "80px 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${COMMUNITY_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p className="overline" style={{ color: "#ffed00", marginBottom: 12 }}>
            Research Communities
          </p>
          <h1 className="display-lg" style={{ color: "#ffffff", marginBottom: 20 }}>
            FIND YOUR
            <br />
            RESEARCH TRIBE
          </h1>
          <p className="subtitle" style={{ color: "rgba(255,255,255,0.72)", maxWidth: 520, marginBottom: 40 }}>
            Join discipline-specific communities of PhD students. Share ideas, discuss methodologies, and find collaborators who speak your research language.
          </p>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#ffffff",
              padding: "0 20px",
              height: 52,
              maxWidth: 480,
              borderRadius: 2,
            }}
          >
            <Search size={18} color="#8a8a8a" />
            <input
              type="text"
              placeholder="Search communities by field or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: 16,
                color: "#000000",
                background: "transparent",
                width: "100%",
                fontFamily: "Manrope, sans-serif",
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Band — white */}
      <div style={{ background: "#f7f7f7", borderBottom: "1px solid #f2f2f2", padding: "24px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 0,
            }}
          >
            {[
              { value: communities.length, label: "Active Communities" },
              { value: communities.reduce((s, c) => s + c.members, 0).toLocaleString(), label: "Total Members" },
              { value: communities.reduce((s, c) => s + c.ideas, 0), label: "Ideas Shared" },
              { value: "80+", label: "Countries Represented" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "0 24px",
                  borderRight: i < 3 ? "1px solid #f2f2f2" : "none",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 28, fontWeight: 700, color: "#000000", lineHeight: 0.95 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, color: "#666666", marginTop: 8 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communities Grid — white */}
      <section className="section-white">
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
            <h2 className="heading-lg" style={{ color: "#000000" }}>
              {filtered.length} Communities
            </h2>
            <button
              className="btn-primary"
              onClick={() => toast("Community creation coming soon")}
              style={{ height: 40, padding: "0 20px", fontSize: 13 }}
            >
              + Create Community
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 1,
              background: "#f2f2f2",
            }}
          >
            {filtered.map((community, i) => (
              <div
                key={community.id}
                style={{
                  background: "#ffffff",
                  padding: 32,
                  opacity: 0,
                  animation: `fadeInUp 400ms cubic-bezier(0.23,1,0.32,1) ${i * 60}ms forwards`,
                  transition: "border-left-color 150ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                  borderLeft: "4px solid transparent",
                  cursor: "pointer",
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
                {/* Header */}
                <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
                  <span className="overline" style={{ color: "#666666" }}>
                    {community.field}
                  </span>
                  <div className="flex items-center gap-1">
                    {community.isActive && (
                      <>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8dc572" }} />
                        <span style={{ fontSize: 11, color: "#666666" }}>Active</span>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="heading-md" style={{ color: "#000000", marginBottom: 12, lineHeight: 1.3 }}>
                  {community.name}
                </h3>
                <p className="body-sm" style={{ color: "#666666", marginBottom: 24, lineHeight: 1.6 }}>
                  {community.description}
                </p>

                {/* Stats row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1,
                    background: "#f2f2f2",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ background: "#f7f7f7", padding: "12px 16px" }}>
                    <div className="flex items-center gap-2">
                      <Users size={14} color="#666666" />
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#000000" }}>
                        {community.members.toLocaleString()}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>Members</p>
                  </div>
                  <div style={{ background: "#f7f7f7", padding: "12px 16px" }}>
                    <div className="flex items-center gap-2">
                      <Lightbulb size={14} color="#666666" />
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#000000" }}>
                        {community.ideas}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>Ideas</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 11, color: "#8a8a8a" }}>
                    Last active: {community.recentActivity}
                  </span>
                  <button
                    className="btn-dark"
                    onClick={() => toast(`Joined ${community.name}!`)}
                    style={{ height: 36, padding: "0 16px", fontSize: 12 }}
                  >
                    Join
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p className="heading-lg" style={{ color: "#000000", marginBottom: 12 }}>
                No communities found
              </p>
              <p className="body-md" style={{ color: "#666666" }}>
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Researchers — dark */}
      <section style={{ background: "#000000", padding: "80px 0" }}>
        <div className="container">
          <p className="overline" style={{ color: "#ffed00", marginBottom: 12 }}>
            Active Researchers
          </p>
          <div className="flex items-end justify-between" style={{ marginBottom: 40 }}>
            <h2 className="display-md" style={{ color: "#ffffff" }}>
              MEET THE
              <br />
              COMMUNITY
            </h2>
            <Link href="/feed" className="btn-outline-light" style={{ height: 40, padding: "0 20px", fontSize: 13 }}>
              Browse All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 1,
              background: "rgba(255,255,255,0.1)",
            }}
          >
            {researchers.map((r, i) => (
              <Link
                key={r.id}
                href={`/profile/${r.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#111111",
                    padding: 24,
                    transition: "background 150ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                    opacity: 0,
                    animation: `fadeInUp 400ms cubic-bezier(0.23,1,0.32,1) ${i * 60}ms forwards`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#111111";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#ffffff",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>{r.name}</p>
                      <div className="flex items-center gap-1">
                        {r.isOnline && (
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8dc572" }} />
                        )}
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.72)" }}>
                          {r.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>
                    {r.field}
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                    {r.university} · Year {r.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — yellow */}
      <section className="section-yellow">
        <div className="container" style={{ textAlign: "center" }}>
          <p className="overline" style={{ color: "#333333", marginBottom: 12 }}>
            Don't See Your Field?
          </p>
          <h2 className="display-md" style={{ color: "#000000", marginBottom: 20 }}>
            START A NEW
            <br />
            COMMUNITY
          </h2>
          <p className="subtitle" style={{ color: "#333333", maxWidth: 480, margin: "0 auto 32px" }}>
            Be the first to bring together PhD students in your discipline. Create a community and watch it grow.
          </p>
          <button
            className="btn-dark"
            onClick={() => toast("Community creation coming soon — sign in to get notified")}
          >
            Create a Community
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
