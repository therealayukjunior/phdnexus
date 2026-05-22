/*
 * PhDNexus Profile — Researcher profile page
 * Design: Dark header band with researcher info, white content below
 */
import { useParams, Link } from "wouter";
import { ArrowLeft, Globe, GraduationCap, MessageCircle, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { researchers, ideas } from "@/lib/data";

export default function Profile() {
  const { id } = useParams();
  const researcher = researchers.find((r) => r.id === id) || researchers[0];
  const researcherIdeas = ideas.filter((i) => i.author.id === researcher.id);

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Profile Header — dark */}
      <div style={{ background: "#000000", padding: "48px 0 0" }}>
        <div className="container">
          <Link
            href="/feed"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,0.72)",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 32,
              transition: "color 150ms",
            }}
          >
            <ArrowLeft size={16} />
            Back to Feed
          </Link>

          <div className="flex flex-wrap items-start gap-6" style={{ paddingBottom: 40 }}>
            {/* Avatar */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#ffffff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                flexShrink: 0,
                border: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              {researcher.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
                <h1 className="display-md" style={{ color: "#ffffff" }}>
                  {researcher.name}
                </h1>
                {researcher.isOnline && (
                  <div className="flex items-center gap-1">
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8dc572" }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>Online</span>
                  </div>
                )}
              </div>

              <p className="subtitle" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 16 }}>
                {researcher.field} · Year {researcher.year} PhD
              </p>

              <div className="flex flex-wrap gap-4" style={{ marginBottom: 24 }}>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} color="rgba(255,255,255,0.72)" />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
                    {researcher.university}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} color="rgba(255,255,255,0.72)" />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
                    {researcher.country}
                  </span>
                </div>
              </div>

              <p className="body-md" style={{ color: "rgba(255,255,255,0.72)", maxWidth: 600, marginBottom: 24 }}>
                {researcher.bio}
              </p>

              <div className="flex gap-3">
                <button
                  className="btn-primary"
                  onClick={() => toast("Sign in to send a message")}
                  style={{ height: 40, padding: "0 20px", fontSize: 13 }}
                >
                  <MessageCircle size={16} />
                  Message
                </button>
                <button
                  className="btn-outline-light"
                  onClick={() => toast("Collaboration request sent!")}
                  style={{ height: 40, padding: "0 20px", fontSize: 13 }}
                >
                  <Users size={16} />
                  Collaborate
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1,
                background: "rgba(255,255,255,0.1)",
                alignSelf: "flex-start",
                minWidth: 240,
              }}
            >
              {[
                { value: researcher.ideas, label: "Ideas" },
                { value: researcher.collaborators, label: "Collaborators" },
                { value: researcher.citations, label: "Citations" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#111111",
                    padding: "20px 16px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 0.95 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", marginTop: 8 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: "48px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Left: Ideas */}
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
              <div>
                <p className="overline" style={{ color: "#666666", marginBottom: 8 }}>
                  Research Ideas
                </p>
                <h2 className="heading-lg" style={{ color: "#000000" }}>
                  {researcherIdeas.length} Published Ideas
                </h2>
              </div>
            </div>

            {researcherIdeas.length === 0 ? (
              <div
                style={{
                  background: "#f7f7f7",
                  padding: 48,
                  textAlign: "center",
                }}
              >
                <BookOpen size={32} color="#8a8a8a" style={{ margin: "0 auto 16px" }} />
                <p className="body-md" style={{ color: "#666666" }}>
                  No ideas published yet
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  background: "#f2f2f2",
                }}
              >
                {researcherIdeas.map((idea, i) => (
                  <div key={idea.id} style={{ background: "#fff" }}>
                    <IdeaCard idea={idea} index={i} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ position: "sticky", top: 80 }}>
            {/* Research Interests */}
            <div style={{ border: "1px solid #f2f2f2", padding: 24, marginBottom: 24 }}>
              <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                Research Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {(researcherIdeas.flatMap((i) => i.tags).filter((v, i, a) => a.indexOf(v) === i).slice(0, 8)).map(
                  (tag) => (
                    <span key={tag} className="badge-field">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Looking For */}
            <div style={{ background: "#f7f7f7", padding: 24, marginBottom: 24 }}>
              <p className="overline" style={{ color: "#666666", marginBottom: 12 }}>
                Open to Collaboration
              </p>
              <p className="body-sm" style={{ color: "#333333", lineHeight: 1.6 }}>
                {researcher.name} is actively seeking collaborators in{" "}
                <strong>{researcher.field}</strong> and adjacent disciplines.
              </p>
              <button
                className="btn-primary"
                onClick={() => toast("Sign in to connect")}
                style={{ marginTop: 16, height: 40, padding: "0 20px", fontSize: 13, width: "100%", justifyContent: "center" }}
              >
                Connect
              </button>
            </div>

            {/* Similar Researchers */}
            <div style={{ border: "1px solid #f2f2f2", padding: 24 }}>
              <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                Similar Researchers
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {researchers
                  .filter((r) => r.id !== researcher.id && r.field === researcher.field)
                  .slice(0, 3)
                  .map((r) => (
                    <Link
                      key={r.id}
                      href={`/profile/${r.id}`}
                      style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "#000000",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {r.avatar}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#000000" }}>{r.name}</p>
                        <p style={{ fontSize: 11, color: "#666666" }}>{r.university}</p>
                      </div>
                    </Link>
                  ))}
                {researchers.filter((r) => r.id !== researcher.id && r.field === researcher.field).length === 0 && (
                  <p className="body-sm" style={{ color: "#666666" }}>
                    No similar researchers found yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
