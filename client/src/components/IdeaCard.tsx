/*
 * PhDNexus IdeaCard
 * Design: vehicle-card adapted for research ideas
 * Square corners, hairline border, yellow left accent on featured
 * Photography-first → abstract-first: network graph bg on featured cards
 */
import { Link } from "wouter";
import { ArrowUpRight, MessageSquare, Users, ArrowUp } from "lucide-react";
import type { Idea } from "@/lib/data";
import { statusLabels } from "@/lib/data";

interface IdeaCardProps {
  idea: Idea;
  index?: number;
}

export default function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  const delay = Math.min(index * 50, 300);

  return (
    <Link href={`/idea/${idea.id}`} style={{ textDecoration: "none", display: "block" }}>
      <article
        className={`idea-card ${idea.isFeatured ? "idea-card-featured" : ""}`}
        style={{
          opacity: 0,
          animation: `fadeInUp 400ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms forwards`,
        }}
      >
        {/* Card Top: Field + Status */}
        <div
          style={{
            padding: "20px 24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="overline" style={{ color: "#666666" }}>
            {idea.subfield}
          </span>
          <div className="flex items-center gap-2">
            {idea.isNew && <span className="badge-new" style={{ fontSize: 11, padding: "3px 10px" }}>NEW</span>}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 46,
                border: "1px solid",
                borderColor: idea.status === "seeking-feedback" ? "#ffed00" : "#f2f2f2",
                background: idea.status === "seeking-feedback" ? "#ffed00" : "transparent",
                color: idea.status === "seeking-feedback" ? "#000" : "#666666",
                whiteSpace: "nowrap",
              }}
            >
              {statusLabels[idea.status]}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: "16px 24px 20px" }}>
          <h3
            className="heading-md"
            style={{
              color: "#000000",
              marginBottom: 12,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {idea.title}
          </h3>
          <p
            className="body-sm"
            style={{
              color: "#666666",
              marginBottom: 16,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {idea.abstract}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 20 }}>
            {idea.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge-field">
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="divider" style={{ marginBottom: 16 }} />

          {/* Author + Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                style={{
                  width: 32,
                  height: 32,
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
                {idea.author.avatar}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#000000", lineHeight: 1.2 }}>
                  {idea.author.name}
                </p>
                <p style={{ fontSize: 11, color: "#666666", lineHeight: 1.2 }}>
                  {idea.author.university} · Year {idea.author.year}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1" style={{ color: "#666666" }}>
                <ArrowUp size={14} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{idea.upvotes}</span>
              </div>
              <div className="flex items-center gap-1" style={{ color: "#666666" }}>
                <MessageSquare size={14} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{idea.comments}</span>
              </div>
              {idea.seekingCollaboration && (
                <div className="flex items-center gap-1" style={{ color: "#000000" }}>
                  <Users size={14} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{idea.collaborators}</span>
                </div>
              )}
              <ArrowUpRight size={18} color="#000000" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
