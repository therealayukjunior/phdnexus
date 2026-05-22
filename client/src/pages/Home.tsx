/*
 * PhDNexus Home — Landing Page
 * Design: Scientific Precision
 * Sections: Hero (dark) → Stats (white) → Featured Ideas (white) → Collab CTA (dark) → Communities (soft) → Join CTA (yellow) → Footer (dark)
 */
import { Link } from "wouter";
import { ArrowRight, Globe, Lightbulb, Users, BookOpen, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas, communities } from "@/lib/data";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663653558884/jGSmnnGcZQN8SuMzkeuwqq/hero-main-f2JuRgaA2k4zXCWzqPRigd.webp";
const COLLAB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663653558884/jGSmnnGcZQN8SuMzkeuwqq/collab-section-7WSk4s9kkBGfStYP7fZ2SR.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663653558884/jGSmnnGcZQN8SuMzkeuwqq/community-section-W9iDh4aLLqNMr2yv9fWdHW.webp";

const stats = [
  { value: "12,400+", label: "PhD Researchers" },
  { value: "80+", label: "Countries" },
  { value: "3,200+", label: "Ideas Shared" },
  { value: "940+", label: "Collaborations Formed" },
];

const disciplines = [
  "Neuroscience", "Climate Science", "Quantum Computing", "Materials Science",
  "Political Economy", "Robotics & AI", "Biomedical Science", "Cognitive Science",
  "Mathematics", "Physics", "Economics", "Sociology",
];

export default function Home() {
  const featuredIdeas = ideas.filter((i) => i.isFeatured).slice(0, 3);
  const recentIdeas = ideas.filter((i) => !i.isFeatured).slice(0, 3);

  return (
    <div style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />

      {/* ===== HERO SECTION — dark ===== */}
      <section
        style={{
          background: "#000000",
          position: "relative",
          overflow: "hidden",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background image with overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ maxWidth: 680 }}>
            {/* Overline */}
            <p
              className="overline"
              style={{ color: "#ffed00", marginBottom: 24 }}
            >
              Global PhD Research Platform
            </p>

            {/* Headline */}
            <h1
              className="display-xl"
              style={{
                color: "#ffffff",
                marginBottom: 24,
                opacity: 0,
                animation: "fadeInUp 500ms cubic-bezier(0.23,1,0.32,1) 100ms forwards",
              }}
            >
              WHERE RESEARCH
              <br />
              MINDS MEET
            </h1>

            {/* Subtitle */}
            <p
              className="subtitle"
              style={{
                color: "rgba(255,255,255,0.72)",
                marginBottom: 40,
                maxWidth: 520,
                opacity: 0,
                animation: "fadeInUp 500ms cubic-bezier(0.23,1,0.32,1) 200ms forwards",
              }}
            >
              Share your research ideas, find collaborators across disciplines, and join a global community of PhD students pushing the boundaries of knowledge.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: 0,
                animation: "fadeInUp 500ms cubic-bezier(0.23,1,0.32,1) 300ms forwards",
              }}
            >
              <Link href="/feed" className="btn-primary">
                Explore Ideas
                <ArrowRight size={16} />
              </Link>
              <Link href="/feed" className="btn-outline-light">
                Share Your Research
              </Link>
            </div>

            {/* Discipline pills */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                marginTop: 48,
                opacity: 0,
                animation: "fadeInUp 500ms cubic-bezier(0.23,1,0.32,1) 400ms forwards",
              }}
            >
          {disciplines.slice(0, 8).map((d) => (
            <Link
              key={d}
              href="/feed"
              style={{
                padding: "6px 14px",
                borderRadius: 46,
                border: "1px solid rgba(255,255,255,0.25)",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "border-color 150ms, color 150ms, background 150ms",
                letterSpacing: "0.13px",
                background: "rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ffed00";
                (e.currentTarget as HTMLElement).style.color = "#ffed00";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,237,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
            >
              {d}
            </Link>
          ))}
          <Link
            href="/feed"
            style={{
              padding: "6px 14px",
                borderRadius: 46,
                border: "1px solid rgba(255,255,255,0.25)",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                background: "rgba(255,255,255,0.05)",
            }}
          >
            +40 more
          </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION — white ===== */}
      <section className="section-white" style={{ borderBottom: "1px solid #f2f2f2" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 0,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "0 32px",
                  borderRight: i < stats.length - 1 ? "1px solid #f2f2f2" : "none",
                  textAlign: "center",
                }}
              >
                <p
                  className="display-lg"
                  style={{ color: "#000000", marginBottom: 8 }}
                >
                  {stat.value}
                </p>
                <p className="body-sm" style={{ color: "#666666" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED IDEAS — white ===== */}
      <section className="section-white">
        <div className="container">
          {/* Section header */}
          <div
            className="flex items-end justify-between"
            style={{ marginBottom: 40 }}
          >
            <div>
              <p className="overline" style={{ color: "#666666", marginBottom: 8 }}>
                Featured Research
              </p>
              <h2 className="display-md" style={{ color: "#000000" }}>
                IDEAS MAKING
                <br />
                AN IMPACT
              </h2>
            </div>
            <Link href="/feed" className="btn-outline hidden md:inline-flex">
              View All Ideas
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* 3-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 1,
              background: "#f2f2f2",
            }}
          >
            {featuredIdeas.map((idea, i) => (
              <div key={idea.id} style={{ background: "#fff" }}>
                <IdeaCard idea={idea} index={i} />
              </div>
            ))}
          </div>

          <div className="md:hidden" style={{ marginTop: 24 }}>
            <Link href="/feed" className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
              View All Ideas
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — soft ===== */}
      <section className="section-soft">
        <div className="container">
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <p className="overline" style={{ color: "#666666", marginBottom: 8 }}>
              How PhDNexus Works
            </p>
            <h2 className="display-md" style={{ color: "#000000" }}>
              FROM IDEA TO
              <br />
              COLLABORATION
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 1,
              background: "#e8e8e8",
            }}
          >
            {[
              {
                icon: <Lightbulb size={24} />,
                step: "01",
                title: "Share Your Idea",
                desc: "Post your research concept, methodology, and questions. Describe what you're working on and what kind of collaboration you're seeking.",
              },
              {
                icon: <Globe size={24} />,
                step: "02",
                title: "Reach Global Researchers",
                desc: "Your idea is instantly visible to 12,400+ PhD students across 80+ countries in your discipline and adjacent fields.",
              },
              {
                icon: <Users size={24} />,
                step: "03",
                title: "Find Collaborators",
                desc: "Connect with researchers who share your interests. Message, discuss, and form research partnerships across institutions.",
              },
              {
                icon: <BookOpen size={24} />,
                step: "04",
                title: "Advance Your Research",
                desc: "Turn ideas into publications, grant proposals, and breakthroughs — together with a global network of peers.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                style={{
                  background: "#ffffff",
                  padding: 32,
                  opacity: 0,
                  animation: `fadeInUp 400ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms forwards`,
                }}
              >
                <div className="flex items-start justify-between" style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "#f7f7f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      color: "#f2f2f2",
                      lineHeight: 1,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="heading-sm" style={{ color: "#000000", marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p className="body-sm" style={{ color: "#666666" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLLABORATION BAND — dark ===== */}
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
            backgroundImage: `url(${COLLAB_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 64,
            alignItems: "center",
          }}
          >
            <div>
              <p className="overline" style={{ color: "#ffed00", marginBottom: 16 }}>
                Cross-Disciplinary Collaboration
              </p>
              <h2
                className="display-md"
                style={{ color: "#ffffff", marginBottom: 24 }}
              >
                BREAK DOWN
                <br />
                SILOS
              </h2>
              <p
                className="body-lg"
                style={{ color: "rgba(255,255,255,0.72)", marginBottom: 32, maxWidth: 440 }}
              >
                The most transformative research happens at the intersection of disciplines. PhDNexus connects neuroscientists with computer scientists, climate researchers with economists, and physicists with biologists.
              </p>
              <Link href="/communities" className="btn-primary">
                Explore Communities
                <ArrowRight size={16} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                background: "rgba(255,255,255,0.1)",
              }}
            >
              {[
                { label: "Interdisciplinary Ideas", value: "47%" },
                { label: "Cross-Institution Collabs", value: "63%" },
                { label: "Avg. Response Time", value: "< 4h" },
                { label: "Ideas → Publications", value: "28%" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "#111111",
                    padding: 24,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 0.95,
                      marginBottom: 8,
                    }}
                  >
                    {item.value}
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECENT IDEAS — white ===== */}
      <section className="section-white">
        <div className="container">
          <div className="flex items-end justify-between" style={{ marginBottom: 40 }}>
            <div>
              <p className="overline" style={{ color: "#666666", marginBottom: 8 }}>
                Latest Research
              </p>
              <h2 className="display-md" style={{ color: "#000000" }}>
                FRESH IDEAS
                <br />
                THIS WEEK
              </h2>
            </div>
            <Link href="/feed" className="btn-outline hidden md:inline-flex">
              Browse All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 1,
              background: "#f2f2f2",
            }}
          >
            {recentIdeas.map((idea, i) => (
              <div key={idea.id} style={{ background: "#fff" }}>
                <IdeaCard idea={idea} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITIES PREVIEW — soft ===== */}
      <section className="section-soft">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <p className="overline" style={{ color: "#666666", marginBottom: 8 }}>
              Research Communities
            </p>
            <h2 className="display-md" style={{ color: "#000000" }}>
              FIND YOUR
              <br />
              TRIBE
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 1,
              background: "#e8e8e8",
              marginBottom: 32,
            }}
          >
            {communities.slice(0, 4).map((community, i) => (
              <Link
                key={community.id}
                href="/communities"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    padding: 32,
                    transition: "border-color 150ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                    borderLeft: "4px solid transparent",
                    opacity: 0,
                    animation: `fadeInUp 400ms cubic-bezier(0.23,1,0.32,1) ${i * 60}ms forwards`,
                    height: "100%",
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
                  <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
                    <span className="overline" style={{ color: "#666666" }}>
                      {community.field}
                    </span>
                    {community.isActive && (
                      <div className="flex items-center gap-1">
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#8dc572",
                          }}
                        />
                        <span style={{ fontSize: 11, color: "#666666" }}>Active</span>
                      </div>
                    )}
                  </div>
                  <h3 className="heading-sm" style={{ color: "#000000", marginBottom: 10, lineHeight: 1.3 }}>
                    {community.name}
                  </h3>
                  <p className="body-sm" style={{ color: "#666666", marginBottom: 20, lineHeight: 1.5 }}>
                    {community.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#000000" }}>
                      {community.members.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 12, color: "#666666" }}>members</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#000000" }}>
                      {community.ideas}
                    </span>
                    <span style={{ fontSize: 12, color: "#666666" }}>ideas</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/communities" className="btn-outline">
              View All Communities
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY PHOTO BAND — dark ===== */}
      <section
        style={{
          background: "#000000",
          position: "relative",
          overflow: "hidden",
          padding: "80px 0",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${COMMUNITY_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="overline" style={{ color: "#ffed00", marginBottom: 16 }}>
            Join the Conversation
          </p>
          <h2
            className="display-lg"
            style={{ color: "#ffffff", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}
          >
            YOUR NEXT BREAKTHROUGH STARTS WITH A CONVERSATION
          </h2>
          <p
            className="subtitle"
            style={{ color: "rgba(255,255,255,0.72)", maxWidth: 500, margin: "0 auto 40px" }}
          >
            Join 12,400+ PhD students already sharing ideas, finding collaborators, and advancing research across every discipline.
          </p>
          <Link href="/feed" className="btn-primary">
            Start Exploring
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== JOIN CTA — yellow ===== */}
      <section className="section-yellow">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <p className="overline" style={{ color: "#333333", marginBottom: 8 }}>
                Ready to Share Your Research?
              </p>
              <h2 className="display-md" style={{ color: "#000000" }}>
                YOUR IDEAS DESERVE
                <br />
                A GLOBAL AUDIENCE
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/feed" className="btn-dark">
                Share Your First Idea
                <ArrowRight size={16} />
              </Link>
              <Link href="/communities" className="btn-outline" style={{ justifyContent: "center" }}>
                Browse Communities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
