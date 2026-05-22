/*
 * PhDNexus IdeaDetail — Full idea view
 * Design: White canvas with dark header band
 * Shows full abstract, methodology, research question, author, comments, collaborators
 */
import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  ArrowLeft,
  ArrowUp,
  MessageSquare,
  Users,
  Share2,
  Bookmark,
  Send,
  Globe,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas, statusLabels, researchers } from "@/lib/data";

const mockComments = [
  {
    id: "c1",
    author: researchers[2],
    text: "This is a fascinating approach! Have you considered using variational autoencoders to model the latent space of sensory representations? I've been working on something similar in the context of auditory-visual integration.",
    time: "2 hours ago",
    upvotes: 8,
  },
  {
    id: "c2",
    author: researchers[4],
    text: "The predictive coding framework you're proposing has interesting parallels with quantum error correction — both involve hierarchical inference under uncertainty. Would love to discuss potential cross-disciplinary insights.",
    time: "5 hours ago",
    upvotes: 12,
  },
  {
    id: "c3",
    author: researchers[1],
    text: "Great methodology section. One suggestion: consider including a section on how your model handles temporal dynamics, as multi-sensory integration is inherently time-dependent.",
    time: "1 day ago",
    upvotes: 6,
  },
];

export default function IdeaDetail() {
  const { id } = useParams();
  const idea = ideas.find((i) => i.id === id) || ideas[0];
  const [comment, setComment] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(idea.upvotes);

  const relatedIdeas = ideas
    .filter((i) => i.id !== idea.id && (i.field === idea.field || i.tags.some((t) => idea.tags.includes(t))))
    .slice(0, 3);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
    if (!upvoted) toast("Idea upvoted!");
  };

  const handleCollaborate = () => toast("Sign in to request collaboration");
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast("Link copied to clipboard");
  };
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast(bookmarked ? "Removed from bookmarks" : "Saved to bookmarks");
  };
  const handleComment = () => {
    if (!comment.trim()) return;
    toast("Sign in to post your comment");
    setComment("");
  };

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Header Band — dark */}
      <div style={{ background: "#000000", padding: "48px 0 40px" }}>
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
              marginBottom: 24,
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
          >
            <ArrowLeft size={16} />
            Back to Ideas
          </Link>

          <div className="flex flex-wrap items-start gap-3" style={{ marginBottom: 20 }}>
            <span className="overline" style={{ color: "#ffed00" }}>
              {idea.subfield}
            </span>
            {idea.isNew && <span className="badge-new" style={{ fontSize: 11, padding: "3px 10px" }}>NEW</span>}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 12px",
                borderRadius: 46,
                border: "1px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {statusLabels[idea.status]}
            </span>
          </div>

          <h1
            className="display-md"
            style={{ color: "#ffffff", maxWidth: 800, marginBottom: 24, lineHeight: 1.1 }}
          >
            {idea.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 32 }}>
            {idea.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "4px 12px",
                  borderRadius: 46,
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleUpvote}
              style={{
                height: 40,
                padding: "0 20px",
                borderRadius: 2,
                border: "none",
                background: upvoted ? "#ffed00" : "rgba(255,255,255,0.1)",
                color: upvoted ? "#000000" : "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                transition: "all 150ms",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <ArrowUp size={16} />
              {upvoteCount}
            </button>

            <div
              style={{
                height: 40,
                padding: "0 16px",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.72)",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MessageSquare size={16} />
              {idea.comments} comments
            </div>

            {idea.seekingCollaboration && (
              <button
                onClick={handleCollaborate}
                className="btn-primary"
                style={{ height: 40, padding: "0 20px", fontSize: 13 }}
              >
                <Users size={16} />
                Request Collaboration
              </button>
            )}

            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                onClick={handleBookmark}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: bookmarked ? "rgba(255,237,0,0.15)" : "transparent",
                  color: bookmarked ? "#ffed00" : "rgba(255,255,255,0.72)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                <Bookmark size={16} />
              </button>
              <button
                onClick={handleShare}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.72)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: "48px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 320px",
            gap: 48,
            alignItems: "start",
          }}
          className="idea-detail-grid"
        >
          {/* Left: Idea Content */}
          <div>
            {/* Abstract */}
            <section style={{ marginBottom: 40 }}>
              <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                Abstract
              </p>
              <p className="body-lg" style={{ color: "#222222", lineHeight: 1.7 }}>
                {idea.abstract}
              </p>
            </section>

            <div className="divider" style={{ marginBottom: 40 }} />

            {/* Research Question */}
            {idea.researchQuestion && (
              <section style={{ marginBottom: 40 }}>
                <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                  Central Research Question
                </p>
                <blockquote
                  style={{
                    borderLeft: "4px solid #ffed00",
                    paddingLeft: 24,
                    margin: 0,
                  }}
                >
                  <p
                    className="subtitle"
                    style={{ color: "#000000", fontStyle: "italic" }}
                  >
                    "{idea.researchQuestion}"
                  </p>
                </blockquote>
              </section>
            )}

            {idea.researchQuestion && <div className="divider" style={{ marginBottom: 40 }} />}

            {/* Methodology */}
            {idea.methodology && (
              <section style={{ marginBottom: 40 }}>
                <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                  Methodology
                </p>
                <div
                  style={{
                    background: "#f7f7f7",
                    padding: 24,
                    borderRadius: 0,
                    borderLeft: "4px solid #000000",
                  }}
                >
                  <p className="body-md" style={{ color: "#222222" }}>
                    {idea.methodology}
                  </p>
                </div>
              </section>
            )}

            {idea.methodology && <div className="divider" style={{ marginBottom: 40 }} />}

            {/* Collaboration Status */}
            {idea.seekingCollaboration && (
              <section
                style={{
                  background: "#ffed00",
                  padding: 32,
                  marginBottom: 40,
                }}
              >
                <p className="overline" style={{ color: "#333333", marginBottom: 12 }}>
                  Collaboration Opportunity
                </p>
                <h3 className="heading-md" style={{ color: "#000000", marginBottom: 12 }}>
                  This researcher is actively seeking collaborators
                </h3>
                <p className="body-md" style={{ color: "#333333", marginBottom: 20 }}>
                  {idea.author.name} is looking for researchers with complementary expertise to advance this project. Reach out to discuss potential collaboration.
                </p>
                <button
                  className="btn-dark"
                  onClick={handleCollaborate}
                  style={{ height: 40, padding: "0 20px", fontSize: 13 }}
                >
                  <Users size={16} />
                  Express Interest
                </button>
              </section>
            )}

            {/* Comments Section */}
            <section>
              <p className="overline" style={{ color: "#666666", marginBottom: 24 }}>
                Discussion ({idea.comments})
              </p>

              {/* Comment Input */}
              <div
                style={{
                  background: "#f7f7f7",
                  padding: 24,
                  marginBottom: 32,
                  borderRadius: 0,
                }}
              >
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts, questions, or feedback on this research idea..."
                  style={{
                    width: "100%",
                    minHeight: 100,
                    border: "none",
                    borderBottom: "1px solid #000000",
                    background: "transparent",
                    fontSize: 16,
                    fontFamily: "Manrope, sans-serif",
                    color: "#000000",
                    resize: "vertical",
                    outline: "none",
                    padding: "12px 0",
                    lineHeight: 1.5,
                  }}
                />
                <div className="flex justify-end" style={{ marginTop: 16 }}>
                  <button
                    className="btn-dark"
                    onClick={handleComment}
                    style={{ height: 40, padding: "0 20px", fontSize: 13 }}
                  >
                    <Send size={14} />
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#f2f2f2" }}>
                {mockComments.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: "#ffffff",
                      padding: 24,
                    }}
                  >
                    <div className="flex items-start gap-3" style={{ marginBottom: 12 }}>
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
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {c.author.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#000000" }}>
                            {c.author.name}
                          </span>
                          <span style={{ fontSize: 12, color: "#666666" }}>
                            {c.author.university}
                          </span>
                          <span style={{ fontSize: 12, color: "#8a8a8a", marginLeft: "auto" }}>
                            {c.time}
                          </span>
                        </div>
                        <p className="body-md" style={{ color: "#222222", lineHeight: 1.6 }}>
                          {c.text}
                        </p>
                        <div className="flex items-center gap-4" style={{ marginTop: 12 }}>
                          <button
                            onClick={() => toast("Upvoted comment")}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#666666",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              fontFamily: "Manrope, sans-serif",
                            }}
                          >
                            <ArrowUp size={14} />
                            {c.upvotes}
                          </button>
                          <button
                            onClick={() => toast("Sign in to reply")}
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#666666",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              fontFamily: "Manrope, sans-serif",
                            }}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div style={{ position: "sticky", top: 80 }}>
            {/* Author Card */}
            <div
              style={{
                border: "1px solid #f2f2f2",
                padding: 24,
                marginBottom: 24,
              }}
            >
              <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                Researcher
              </p>
              <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#000000",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idea.author.avatar}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#000000" }}>
                    {idea.author.name}
                  </p>
                  <p style={{ fontSize: 12, color: "#666666" }}>
                    {idea.author.field}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} color="#666666" />
                  <span style={{ fontSize: 13, color: "#333333" }}>
                    {idea.author.university}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} color="#666666" />
                  <span style={{ fontSize: 13, color: "#333333" }}>
                    {idea.author.country}
                  </span>
                </div>
              </div>

              <p className="body-sm" style={{ color: "#666666", marginBottom: 20, lineHeight: 1.6 }}>
                {idea.author.bio}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 1,
                  background: "#f2f2f2",
                  marginBottom: 20,
                }}
              >
                {[
                  { value: idea.author.ideas, label: "Ideas" },
                  { value: idea.author.collaborators, label: "Collabs" },
                  { value: idea.author.citations, label: "Citations" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "#f7f7f7", padding: "12px 8px", textAlign: "center" }}>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#000000", lineHeight: 1 }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`/profile/${idea.author.id}`}
                className="btn-outline"
                style={{ width: "100%", justifyContent: "center", height: 40, fontSize: 13 }}
              >
                View Profile
              </Link>
            </div>

            {/* Idea Metadata */}
            <div
              style={{
                border: "1px solid #f2f2f2",
                padding: 24,
                marginBottom: 24,
              }}
            >
              <p className="overline" style={{ color: "#666666", marginBottom: 16 }}>
                Idea Details
              </p>
              {[
                { label: "Field", value: idea.field },
                { label: "Subfield", value: idea.subfield },
                { label: "Status", value: statusLabels[idea.status] },
                { label: "Posted", value: idea.createdAt },
                { label: "Updated", value: idea.updatedAt },
                { label: "Collaborators", value: `${idea.collaborators} joined` },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#666666" }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Ideas */}
      {relatedIdeas.length > 0 && (
        <section className="section-soft">
          <div className="container">
            <p className="overline" style={{ color: "#666666", marginBottom: 8 }}>
              Related Research
            </p>
            <h2 className="heading-lg" style={{ color: "#000000", marginBottom: 32 }}>
              You Might Also Like
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 1,
                background: "#e8e8e8",
              }}
            >
              {relatedIdeas.map((idea, i) => (
                <div key={idea.id} style={{ background: "#fff" }}>
                  <IdeaCard idea={idea} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
