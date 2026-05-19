import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Snowflake, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Free Releases", href: "/free-releases" },
  { label: "Contract Creator", href: "/contract-creator" },
];

export function Header() {
  const { isAuthenticated, isInitializing, login, clear } =
    useInternetIdentity();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center transition-smooth group-hover:bg-primary/20">
            <Snowflake className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold text-foreground tracking-wide">
              FROST &amp; BEAR
            </span>
            <span className="font-display text-[10px] font-medium text-muted-foreground tracking-[0.15em] uppercase">
              Designs
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
              className={`px-3 py-1.5 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                location.pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Controls */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="nav.admin.button"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Admin Panel
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                data-ocid="nav.logout.button"
                className="text-muted-foreground"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isInitializing}
              data-ocid="nav.login.button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              data-ocid="nav.mobile_menu.button"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-card border-border w-72 p-0"
            data-ocid="nav.mobile_menu.sheet"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-primary" />
                <span className="font-display text-sm font-bold text-foreground">
                  FROST &amp; BEAR
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                data-ocid="nav.mobile_close.button"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile.${link.label.toLowerCase().replace(" ", "-")}.link`}
                  className={`px-3 py-2.5 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link to="/admin" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-primary/30 text-primary"
                      data-ocid="nav.mobile_admin.button"
                    >
                      Admin Panel
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={clear}
                    className="w-full text-muted-foreground"
                    data-ocid="nav.mobile_logout.button"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={login}
                  disabled={isInitializing}
                  className="w-full bg-primary text-primary-foreground"
                  data-ocid="nav.mobile_login.button"
                >
                  Sign In
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
