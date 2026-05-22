/*
 * PhDNexus Footer
 * Design: footer component from DESIGN.md
 * surface-dark (#000) background, on-dark (#fff) text, body-sm typography
 * Three-column grid above copyright row
 */
import { Link } from "wouter";
import { Lightbulb } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#000000", color: "#ffffff", padding: "64px 0 0 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            paddingBottom: "48px",
          }}
        >
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#ffed00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                }}
              >
                <Lightbulb size={18} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: "#ffffff", letterSpacing: "-0.02em" }}>
                PhDNexus
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.57, color: "rgba(255,255,255,0.72)", maxWidth: 240 }}>
              Where research minds meet. A global platform for PhD students to share ideas and build collaborations.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.72)", marginBottom: 16 }}>
              Platform
            </p>
            {[
              { label: "Explore Ideas", href: "/feed" },
              { label: "Communities", href: "/communities" },
              { label: "Search", href: "/search" },
              { label: "Share an Idea", href: "/feed" },
            ].map((link) => (
              <div key={link.href} style={{ marginBottom: 10 }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.72)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Community Column */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.72)", marginBottom: 16 }}>
              Community
            </p>
            {[
              "Neuroscience Network",
              "Climate & Earth Systems",
              "Quantum Information",
              "Materials Science",
              "Political Economy",
            ].map((name) => (
              <div key={name} style={{ marginBottom: 10 }}>
                <Link
                  href="/communities"
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.72)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>

          {/* About Column */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.72)", marginBottom: 16 }}>
              About
            </p>
            {["About Us", "How It Works", "Privacy Policy", "Terms of Service", "Contact"].map((label) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.72)",
                    cursor: "pointer",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: 24, paddingBottom: 24 }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.4 }}>
              © 2026 PhDNexus. Built for researchers, by researchers.
            </p>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>
                12,400+ researchers · 80+ countries · 3,200+ ideas shared
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
