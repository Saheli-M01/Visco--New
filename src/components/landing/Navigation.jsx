import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { categories } from "@/data/categories";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const dispatchSearch = (query) => {
    // Dispatch a CustomEvent so other components can listen and filter algorithms
    const evt = new CustomEvent("algorithmSearch", { detail: { query } });
    window.dispatchEvent(evt);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => dispatchSearch(value.trim()), 250);
  };

  // Build suggestions immediately as the user types (startsWith match)
  useEffect(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const list = [];
    for (const [catId, cat] of Object.entries(categories)) {
      for (const a of cat.algorithms || []) {
        if (a.name.toLowerCase().startsWith(q)) {
          list.push({ catId, alg: a });
          if (list.length >= 8) break;
        }
      }
      if (list.length >= 8) break;
    }
    setSuggestions(list);
    setActiveIndex(-1);
  }, [searchQuery]);

  const clearSuggestions = () => {
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const openFoundAlgorithm = (found) => {
    if (!found) return;
    const path = `/${found.catId}`;
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        dispatchSearch(found.alg.name);
        window.dispatchEvent(
          new CustomEvent("openAlgorithm", { detail: { name: found.alg.name } })
        );
      }, 200);
    } else {
      dispatchSearch(found.alg.name);
      window.dispatchEvent(
        new CustomEvent("openAlgorithm", { detail: { name: found.alg.name } })
      );
    }
    clearSuggestions();
    setSearchQuery(found.alg.name);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        openFoundAlgorithm(suggestions[activeIndex]);
      } else {
        handleSearchEnter();
      }
    }
    if (e.key === "Escape") {
      clearSuggestions();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    dispatchSearch("");
  };

  const handleSearchEnter = () => {
    const q = (searchQuery || "").trim();
    if (!q) return;
    const qLower = q.toLowerCase();

    // Try to find exact match first across categories
    let found = null;
    for (const [catId, cat] of Object.entries(categories)) {
      const alg = (cat.algorithms || []).find(
        (a) => a.name.toLowerCase() === qLower
      );
      if (alg) {
        found = { catId, alg };
        break;
      }
    }

    // Fallback to substring match
    if (!found) {
      for (const [catId, cat] of Object.entries(categories)) {
        const alg = (cat.algorithms || []).find((a) =>
          a.name.toLowerCase().includes(qLower)
        );
        if (alg) {
          found = { catId, alg };
          break;
        }
      }
    }

    if (found) {
      // navigate to the category page and dispatch search + open events
      const path = `/${found.catId}`;
      if (location.pathname !== path) {
        navigate(path);
        // allow navigation to settle
        setTimeout(() => {
          dispatchSearch(q);
          window.dispatchEvent(
            new CustomEvent("openAlgorithm", {
              detail: { name: found.alg.name },
            })
          );
        }, 200);
      } else {
        dispatchSearch(q);
        window.dispatchEvent(
          new CustomEvent("openAlgorithm", { detail: { name: found.alg.name } })
        );
      }
    } else {
      // no match: still dispatch search so the list filters if present
      dispatchSearch(q);
    }
  };

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#topics", label: "Topics" },
  ];

  const closeMenu = () => setOpen(false);

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  // Handle navigation clicks
  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();

    const scrollToSection = () => {
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Dynamically get navbar height
        const navbar = document.querySelector("header");
        const navbarHeight = navbar ? navbar.offsetHeight : 64;

        // Add some extra padding for better visual spacing
        const extraPadding = 20;
        const totalOffset = navbarHeight + extraPadding;

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - totalOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    if (isHomePage) {
      // We're on home page, smooth scroll to section with navbar offset
      scrollToSection();
    } else {
      // We're on a different page, navigate to home first then scroll
      navigate("/");
      // Use setTimeout to wait for navigation to complete
      setTimeout(scrollToSection, 150);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();

    if (isHomePage) {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Navigate to home
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={handleLogoClick}
            className="text-xl font-extrabold tracking-tight cursor-pointer"
          >
            <span className="text-gray-900 font-bold">Visco</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search (desktop) */}
            <div className="hidden md:flex relative items-center bg-white/20 border border-gray-700/30 rounded-lg px-3 py-1 gap-2">
              <Search className="h-4 w-4 text-gray-700" />
              <input
                type="text"
                aria-label="Search algorithms"
                placeholder="Search algorithms..."
                className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 w-56"
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                value={searchQuery}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {/* Desktop suggestions (positioned absolutely inside the search container) */}
              {suggestions.length > 0 && (
                <ul className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                  {suggestions.map((s, idx) => (
                    <li
                      key={`${s.catId}-${s.alg.name}`}
                      className={`px-3 py-2 text-sm cursor-pointer ${
                        idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => openFoundAlgorithm(s)}
                    >
                      <div className="font-medium text-gray-900">{s.alg.name}</div>
                      <div className="text-xs text-gray-500">{s.catId}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a
              href="#topics"
              onClick={(e) => handleNavClick(e, "#topics")}
              className="hidden md:inline-flex items-center rounded-xl bg-white/30 backdrop-blur-sm border border-gray-300/40 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-white/40 hover:shadow-lg transition-all cursor-pointer"
            >
              Get Started
            </a>
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 transition-all"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="h-5 w-5 text-gray-900" />
              ) : (
                <Menu className="h-5 w-5 text-gray-900" />
              )}
            </button>
          </div>
          {/* desktop suggestions moved into the search container so they align under the input */}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/20 bg-white/20 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {/* Mobile search */}
            <div className="flex items-center gap-2 bg-white/10 rounded-md px-3 py-2">
              <Search className="h-4 w-4 text-gray-700" />
              <input
                type="text"
                aria-label="Search algorithms"
                placeholder="Search algorithms..."
                className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 w-full"
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                value={searchQuery}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {/* Mobile suggestions */}
            {suggestions.length > 0 && (
              <ul className="mt-2 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden">
                {suggestions.map((s, idx) => (
                  <li
                    key={`${s.catId}-${s.alg.name}-m`}
                    className={`px-4 py-2 text-sm cursor-pointer ${
                      idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => openFoundAlgorithm(s)}
                  >
                    <div className="font-medium text-gray-900">
                      {s.alg.name}
                    </div>
                    <div className="text-xs text-gray-500">{s.catId}</div>
                  </li>
                ))}
              </ul>
            )}
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#topics"
              onClick={(e) => handleNavClick(e, "#topics")}
              className="mt-2 inline-flex items-center rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-white/40 cursor-pointer"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
