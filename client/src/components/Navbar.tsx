/*
 * PhDNexus Navbar
 * Design: nav-bar component from DESIGN.md
 * White canvas, 60px height, hairline bottom border
 * Logo left, nav center, actions right
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Bell, User, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const navLinks = [
  { label: "Explore Ideas", href: "/feed" },
  { label: "Communities", href: "/communities" },
  { label: "Search", href: "/search" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNotifications = () => toast("Notifications coming soon");
  const handleProfile = () => toast("Sign in to view your profile");

  return (
    <>
      <nav className="nav-bar">
        <div className="container flex items-center justify-between h-full gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" style={{ textDecoration: "none" }}>
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
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#000000",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              PhD<span style={{ color: "#000000" }}>Nexus</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  padding: "8px 16px",
                  fontSize: 14.4,
                  fontWeight: location === link.href ? 700 : 400,
                  color: location === link.href ? "#000000" : "#666666",
                  borderBottom: location === link.href ? "2px solid #000000" : "2px solid transparent",
                  transition: "color 150ms, border-color 150ms",
                  lineHeight: 1,
                  letterSpacing: "0.144px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search icon (mobile) */}
            <Link
              href="/search"
              className="md:hidden"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #f2f2f2",
                borderRadius: 2,
                color: "#000",
                textDecoration: "none",
              }}
            >
              <Search size={18} />
            </Link>

            <button
              onClick={handleNotifications}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #f2f2f2",
                borderRadius: 2,
                background: "#fff",
                color: "#000",
                cursor: "pointer",
                transition: "border-color 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#f2f2f2")}
            >
              <Bell size={18} />
            </button>

            <button
              onClick={handleProfile}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #f2f2f2",
                borderRadius: 2,
                background: "#fff",
                color: "#000",
                cursor: "pointer",
                transition: "border-color 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#f2f2f2")}
            >
              <User size={18} />
            </button>

            <a
              href="/feed"
              className="hidden md:inline-flex btn-primary"
              style={{ height: 40, padding: "0 20px", fontSize: 13 }}
            >
              Share Idea
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #f2f2f2",
                borderRadius: 2,
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            background: "#ffffff",
            borderBottom: "1px solid #000000",
            zIndex: 99,
            padding: "16px 0",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "14px 24px",
                fontSize: 16,
                fontWeight: location === link.href ? 700 : 400,
                color: "#000000",
                textDecoration: "none",
                borderBottom: "1px solid #f2f2f2",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ padding: "16px 24px" }}>
            <a href="/feed" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Share Your Idea
            </a>
          </div>
        </div>
      )}
    </>
  );
}
