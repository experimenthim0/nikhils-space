import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { GitHubCalendar } from "react-github-calendar";
import { fetchRecentTrackData } from "../js/musicplayer.js";
import {
  RiSunLine,
  RiMoonLine,
  RiCloseLine,
  RiArrowRightUpLine,
} from "@remixicon/react";
import "../App.css";
import asciiPortrait from "../assets/nikhil-yadav-ascii.txt?raw";

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [localTime, setLocalTime] = useState("");
  const [visitorLocation, setVisitorLocation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredEntity, setHoveredEntity] = useState(null); // 'avatar' | 'music' | 'films' | 'twitter' | 'github'
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactResult, setContactResult] = useState("");

  const popupRef = useRef(null);
  const [popupOffset, setPopupOffset] = useState(0);
  const [isFlippedY, setIsFlippedY] = useState(false);

  // Auto-clamp active popup to strictly stay within the viewport bounds [16px, vw - 16px]
  useEffect(() => {
    if (!hoveredEntity) return;

    const clampPopup = () => {
      if (!popupRef.current) return;
      const rect = popupRef.current.getBoundingClientRect();
      const padding = 16;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Clamp horizontally within [padding, vw - padding]
      if (rect.left < padding) {
        setPopupOffset((prev) => prev + (padding - rect.left));
      } else if (rect.right > vw - padding) {
        setPopupOffset((prev) => prev - (rect.right - (vw - padding)));
      }

      // Flip vertically if top edge goes off-screen
      if (rect.top < padding && (rect.bottom + rect.height + 20) < vh) {
        setIsFlippedY(true);
      }
    };

    const frame = requestAnimationFrame(clampPopup);
    window.addEventListener("resize", clampPopup);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", clampPopup);
    };
  }, [hoveredEntity]);

  // Detect whether device supports hover + fine pointer (desktop mouse vs touch)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerType = () => {
      setIsTouchDevice(!mediaQuery.matches);
    };

    updatePointerType();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePointerType);
      return () => mediaQuery.removeEventListener("change", updatePointerType);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updatePointerType);
      return () => mediaQuery.removeListener(updatePointerType);
    }
  }, []);

  // Handle outside click / tap and Escape key to close active popup on touch/mobile
  useEffect(() => {
    if (!hoveredEntity) return;

    const handlePointerDown = (e) => {
      // If tap/click is outside any popup container, dismiss
      if (!e.target.closest("[data-popup-container]")) {
        setHoveredEntity(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setHoveredEntity(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hoveredEntity]);

  const [trackData, setTrackData] = useState({
    song: "Loading track...",
    artist: "Spotify / Last.fm",
    albumArt:
      "https://media.istockphoto.com/id/2204659981/vector/abstract-smooth-colorful-light-background.jpg?s=612x612&w=0&k=20&c=pFX2KiJlnQUD18dWm1zbKJMfjiqHV_ZRaSd-lPgDgx0=",
    isPlaying: false,
    url: "https://www.last.fm/user/nikhil0148",
  });

  // Page title
  useEffect(() => {
    document.title = "Nikhil Yadav";
  }, []);

  // Sync theme with HTML root and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.add("dark");
      body.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Oneko cat animation
  useEffect(() => {
    try {
      neko();
    } catch (e) {
      // safe fallback
    }
  }, []);

  // Local clock set to Jaipur, Rajasthan (Asia/Kolkata timezone)
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
        .format(new Date())
        .toLowerCase();
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Visitor Location via IP Geolocation
  useEffect(() => {
    let isMounted = true;
    const getLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const data = await res.json();
          if (data.city && isMounted) {
            setVisitorLocation(`${data.city}, ${data.country_code || data.country_name}`);
            return;
          }
        }
      } catch (e) {}

      try {
        const res2 = await fetch("https://ipwho.is/");
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2.city && isMounted) {
            setVisitorLocation(`${data2.city}, ${data2.country_code}`);
          }
        }
      } catch (e2) {}
    };

    getLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Music data for hover card
  useEffect(() => {
    let isMounted = true;
    const updateMusic = async () => {
      const data = await fetchRecentTrackData();
      if (isMounted && data) {
        setTrackData(data);
      }
    };
    updateMusic();
    const timer = setInterval(updateMusic, 20000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Trigger tap/click handler for mobile touch devices
  const handleTriggerClick = (entity, e) => {
    if (isTouchDevice) {
      if (hoveredEntity === entity) {
        // Tapping the same active item closes it
        setHoveredEntity(null);
      } else {
        // Tapping an item opens its popup and prevents premature external navigation
        if (e) {
          e.preventDefault();
        }
        setHoveredEntity(entity);
      }
    }
  };

  // Keyboard accessibility for triggers
  const handleTriggerKeyDown = (entity, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setHoveredEntity((prev) => (prev === entity ? null : entity));
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const onContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus("loading");
    setContactResult("Sending...");
    const formData = new FormData(e.target);
    formData.append("access_key", "d6fed9d1-8a56-42f7-9069-f7910afcb11b");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setContactStatus("success");
        setContactResult("Message sent. I will get back to you shortly.");
        e.target.reset();
      } else {
        setContactStatus("error");
        setContactResult(data.message || "Failed to send message.");
      }
    } catch (err) {
      setContactStatus("error");
      setContactResult("Failed to send message.");
    }
  };

  // Filter contributions to last 6 months only
  const selectLastHalfYear = (contributions) => {
    const current = new Date();
    const pastDate = new Date();
    pastDate.setMonth(current.getMonth() - 6);

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      return date >= pastDate && date <= current;
    });
  };

  // Precise hierarchy color constants matching the 6 BG & 7 Text color system
  const textWhite = isDark ? "text-[#ffffff]" : "text-[#000000]";
  const textPrimary = isDark ? "text-[#f2f2f2]" : "text-[#000000]";
  const textBody = isDark ? "text-[#f2f2f2e6]" : "text-[#000000]";
  const textSecondary = isDark ? "text-[#f2f2f2b3]" : "text-[#464646]";
  const textTertiary = isDark ? "text-[#dedede66]" : "text-[#6b6b6b]";
  const textMidGray = isDark ? "text-[#b1b1b1]" : "text-[#6b6b6b]";
  
  const bgDarkBase = isDark ? "bg-[#1a1a1a]" : "bg-white";
  const bgTranslucent = isDark ? "bg-[#f2f2f21a]" : "bg-neutral-100";
  const bgSubtleHover = isDark ? "hover:bg-[#fafafa0d]" : "hover:bg-neutral-50";
  const borderColor = isDark ? "border-[#464646]" : "border-neutral-300";
  const dividerColor = isDark ? "divide-[#464646]" : "divide-neutral-200";

  const projects = [
    {
      year: "2026",
      name: "JankariTag",
      type: "QR smart tagging platform",
      url: "https://jankaritag.in",
      displayUrl: "jankaritag.in",
      hook: "Most QR codes just open links. JankariTag connects physical objects to intelligent digital services.",
      paragraphs: [
        "A QR-based smart tagging platform designed to connect physical objects with useful digital information and services. Developed under Under Yadav Devs to solve everyday communication and maintenance challenges through simple, lightweight QR technology.",
        "VehicleTag allows vehicle owners to attach a privacy-focused QR tag so anyone can communicate with them without exposing private phone numbers, alongside automated reminders for insurance, PUC, and servicing.",
        "WaterCare brings smart asset management to institutional environments like colleges, hostels, and campuses. Users scan to report leaks, cooling, or TDS issues, while maintenance teams log filter replacements and servicing history.",
        "Currently my sole active project, built as a full-stack platform using React, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB.",
      ],
      bullets: [
        "VehicleTag: Privacy-first driver messaging & automated document alerts.",
        "WaterCare: Campus QR reporting for cooling, TDS & filter maintenance.",
        "Instant mobile scan: Zero app downloads or accounts required.",
        "Centralized admin dashboard with live audit and maintenance records.",
      ],
      primaryActionText: "JankariTag.in",
      primaryActionLink: "https://jankaritag.in",
      isPrimaryInternal: false,
      secondaryActionText: "Under Yadav Devs",
      secondaryActionLink: "https://github.com/experimenthim0",
      imgsrc: "/jtlogo.png",
      iconSrc: "/jtlogo.png",
    },
    {
      year: "2026",
      name: "CampusNode",
      type: "Campus community platform",
      url: "https://campusnode.in",
      displayUrl: "campusnode.in",
      hook: "Bringing college events, clubs, announcements, and resources into one place.",
      paragraphs: [
        "A platform built for college campuses starting with NIT Jalandhar to bring events, clubs, announcements, and academic resources into a single unified space.",
      ],
      bullets: [
        "Centralized hub for college clubs, events, and campus updates.",
        "Student resources and peer collaboration directory.",
        "Engineered for fast, mobile-friendly access across departments.",
      ],
      primaryActionText: "CampusNode",
      primaryActionLink: "https://campusnode.in",
      isPrimaryInternal: false,
      imgsrc: "/images/aincode.png",
      iconSrc: "/favicon.svg",
    },
    {
      year: "2024",
      name: "Ai&Code Way",
      type: "Developer directory",
      url: "https://aiandcodeway.netlify.app",
      displayUrl: "aiandcodeway.netlify.app",
      hook: "Curated tooling index for the modern AI engineering landscape.",
      paragraphs: [
        "A focused discovery platform and directory indexing cutting-edge AI tools, frameworks, and coding resources for software builders.",
      ],
      bullets: [
        "Curated index of practical AI developer tooling.",
        "Categorized by engineering workflows and utility.",
        "Clean, distraction-free search and directory layout.",
      ],
      primaryActionText: "Visit Directory",
      primaryActionLink: "https://aiandcodeway.netlify.app/",
      isPrimaryInternal: false,
      secondaryActionText: "Explore Tools",
      secondaryActionLink: "https://aiandcodeway.netlify.app/",
      imgsrc: "/images/aincode.png",
      iconSrc: "/images/aincode.png",
    },
    {
      year: "2024",
      name: "LifeDay Dots",
      type: "Chrome extension",
      url: "https://chromewebstore.google.com/detail/lifeday-dots/dmpongfigiibmadlbibagpopfomoeoee",
      displayUrl: "chromewebstore.google.com",
      hook: "A silent, grounding mindfulness reminder on every new tab.",
      paragraphs: [
        "A minimal Chrome extension that visualizes human lifetime through daily dots, creating a silent reminder that every single day counts.",
      ],
      bullets: [
        "Dynamic daily dot grid showing time lived and days ahead.",
        "Zero permissions requested, 100% offline & privacy-first.",
        "Manifest V3 compliant with zero background battery drain.",
      ],
      primaryActionText: "Chrome Web Store",
      primaryActionLink:
        "https://chromewebstore.google.com/detail/lifeday-dots/dmpongfigiibmadlbibagpopfomoeoee",
      isPrimaryInternal: false,
      secondaryActionText: "Store listing",
      secondaryActionLink:
        "https://chromewebstore.google.com/detail/lifeday-dots/dmpongfigiibmadlbibagpopfomoeoee",
      imgsrc: "/images/lifedaydots.png",
      iconSrc: "/images/lifedaydots.png",
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`min-h-screen ${bgDarkBase} ${textBody} transition-colors duration-200 selection:bg-[#3b82f6] selection:text-white overflow-x-clip`}
    >
      {/* =========================================================================
          MAIN EDITORIAL CONTAINER (Strict single column max-w-[620px])
          ========================================================================= */}
      <div className="max-w-[620px] mx-auto px-6 py-14 sm:py-20">
        
        {/* HEADER */}
        <header className="flex items-start justify-between mb-8 animate-blur-fade">
          <div>
            <span
              className="relative inline-block"
              data-popup-container="avatar"
              onMouseEnter={() => !isTouchDevice && setHoveredEntity("avatar")}
              onMouseLeave={() => !isTouchDevice && setHoveredEntity(null)}
              onClick={(e) => handleTriggerClick("avatar", e)}
              onKeyDown={(e) => handleTriggerKeyDown("avatar", e)}
              role="button"
              tabIndex={0}
              aria-expanded={hoveredEntity === "avatar"}
              aria-haspopup="dialog"
              aria-label="Toggle profile preview"
            >
              <h1
                className={`text-[18px] font-bold tracking-tight ${textWhite} cursor-pointer inline-block`}
              >
                Nikhil Yadav <span className={`text-xs  ${textSecondary}`}>{ "( निखिल / NIKHIM )"}</span>
              </h1>

              {/* Fixed Avatar Popup centered right below Nikhil Yadav with bounds clamping */}
              {hoveredEntity === "avatar" && (
                <div
                  ref={popupRef}
                  style={{
                    left: `calc(0px + ${popupOffset}px)`,
                  }}
                  className={`absolute ${
                    isFlippedY ? "bottom-full pb-3" : "top-full pt-3"
                  } z-50 block animate-in fade-in zoom-in-95 duration-150 max-w-[calc(100vw-32px)] pointer-events-auto`}
                >
                  <div
                    className={`p-1.5 rounded-xl border shadow-2xl w-48 max-w-[calc(100vw-32px)] ${
                      isDark ? "bg-[#1a1a1a] border-[#464646]" : "bg-white border-neutral-200/90"
                    }`}
                  >
                    <img
                      src="/images/nikhil-profile.jpg"
                      onError={(e) => {
                        e.currentTarget.src = "/images/nikhil-1.jpg";
                      }}
                      alt="Nikhil Yadav"
                      className={`w-full h-60 object-cover object-top rounded-lg border ${
                        isDark ? "border-[#464646]" : "border-neutral-200"
                      } shadow-xs`}
                    />
                    <p className={`text-[11px] text-center ${textSecondary} mt-2 font-medium`}>
                      Nikhil Yadav • Jaipur, Rajasthan
                    </p>
                  </div>
                </div>
              )}
            </span>
            <p className={`text-sm ${textSecondary} mt-0.5 font-medium`}>
              {localTime || "8:00pm"} in Jaipur, Rajasthan
            </p>
          </div>

          {/* Theme Switcher Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-1 p-1 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? "border-[#464646] bg-[#f2f2f21a] text-[#f2f2f2] hover:border-[#6b6b6b]"
                : "border-neutral-300 bg-neutral-100 text-neutral-700 hover:border-neutral-400"
            }`}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span
              className={`p-1 rounded-full transition-all ${
                !isDark ? "bg-white text-black shadow-xs" : isDark ? "text-[#dedede66]" : "text-neutral-500"
              }`}
            >
              <RiSunLine size={13} />
            </span>
            <span
              className={`p-1 rounded-full transition-all ${
                isDark ? "bg-[#464646] text-[#ffffff] shadow-xs" : "text-neutral-500"
              }`}
            >
              <RiMoonLine size={13} />
            </span>
          </button>
        </header>

        {/* BIO / EDITORIAL PARAGRAPHS */}
        <div className={`space-y-4 text-[15px] leading-[1.7] font-medium ${textBody}`}>
          <p className="animate-blur-fade fade-delay-1">
            I’m building{" "}
            <a
              href="#jankaritag-showcase"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("jankaritag-showcase")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`font-bold underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] ${textWhite} hover:text-[#3b82f6] cursor-pointer transition-colors`}
            >
              JankariTag
            </a>
            , a QR-based platform for connecting physical assets with useful digital information. What started as a small idea for making campus and everyday asset management simpler has grown into a product I’m developing for real-world use.
          </p>

          <p className="animate-blur-fade fade-delay-2">
            I currently study <strong className={textWhite}>Civil Engineering at NIT Jalandhar</strong>, where I’m also building{" "}
            <strong className={textWhite}>CampusNode</strong>, a platform for bringing college events, clubs, announcements, and resources into one place. Alongside engineering, I work across product, design, and software to turn ideas into working products.
          </p>

          <p className="animate-blur-fade fade-delay-2">
            I believe good products start with paying attention to problems people have simply learned to live with.
          </p>

          <p className="animate-blur-fade fade-delay-3">
            Off the clock, I play cricket ( Bowling ), watch{" "}
            <span
              className="relative inline-block"
              data-popup-container="films"
              onMouseEnter={() => !isTouchDevice && setHoveredEntity("films")}
              onMouseLeave={() => !isTouchDevice && setHoveredEntity(null)}
            >
              <span
                role="button"
                tabIndex={0}
                aria-expanded={hoveredEntity === "films"}
                aria-haspopup="dialog"
                aria-label="Favorite films note"
                onClick={(e) => handleTriggerClick("films", e)}
                onKeyDown={(e) => handleTriggerKeyDown("films", e)}
                className={`cursor-pointer underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] ${textWhite} hover:text-[#3b82f6] transition-colors`}
              >
                films
              </span>

              {/* Fixed Films Popup centered above "films" with viewport clamping */}
              {hoveredEntity === "films" && (
                <div
                  ref={popupRef}
                  style={{
                    left: `calc(50% + ${popupOffset}px)`,
                  }}
                  className={`absolute ${
                    isFlippedY ? "top-full pt-3.5" : "bottom-full pb-3.5"
                  } -translate-x-1/2 z-50 block animate-in fade-in zoom-in-95 duration-150 pointer-events-auto max-w-[calc(100vw-32px)]`}
                >
                  <div
                    className={`p-3 rounded-lg border shadow-2xl w-[min(240px,calc(100vw-32px))] max-w-[calc(100vw-32px)] text-left ${
                      isDark
                        ? "bg-[#141414] border-neutral-800 text-white"
                        : "bg-white border-neutral-300 text-neutral-900"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-white" : "text-[#111111]"
                      }`}
                    >
                      Favorite Films
                    </p>
                    <p
                      className={`text-[11px] ${
                        isDark ? "text-[#a3a3a3]" : "text-[#555555]"
                      } mt-1 leading-relaxed`}
                    >
                      Mostly love stories. Apart from that, I’m a big fan of Irrfan Khan’s
                      films. Hollywood movies? Bhai, story hi samajh nahi aati.
                    </p>
                  </div>
                </div>
              )}
            </span>{" "}
            and listen to{" "}
            <span
              className="relative inline-block"
              data-popup-container="music"
              onMouseEnter={() => !isTouchDevice && setHoveredEntity("music")}
              onMouseLeave={() => !isTouchDevice && setHoveredEntity(null)}
            >
              <a
                href="https://www.last.fm/user/nikhil0148"
                target="_blank"
                rel="noopener noreferrer"
                aria-expanded={hoveredEntity === "music"}
                aria-haspopup="dialog"
                aria-label="Now playing track preview"
                onClick={(e) => handleTriggerClick("music", e)}
                onKeyDown={(e) => handleTriggerKeyDown("music", e)}
                className={`cursor-pointer underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] ${textWhite} hover:text-[#3b82f6] transition-colors`}
              >
                music
              </a>

              {/* Fixed Music Popup (Spinning Vinyl Disc) centered above "music" with viewport clamping */}
              {hoveredEntity === "music" && (
                <div
                  ref={popupRef}
                  style={{
                    left: `calc(50% + ${popupOffset}px)`,
                  }}
                  className={`absolute ${
                    isFlippedY ? "top-full pt-3.5" : "bottom-full pb-3.5"
                  } -translate-x-1/2 z-50 block animate-in fade-in zoom-in-95 duration-150 pointer-events-auto max-w-[calc(100vw-32px)]`}
                >
                  <a
                    href={trackData.url || "https://www.last.fm/user/nikhil0148"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3.5 p-3 pr-5 rounded-2xl border shadow-2xl w-[min(310px,calc(100vw-32px))] max-w-[calc(100vw-32px)] text-left cursor-pointer transition-all duration-200 block ${
                      isDark
                        ? "bg-[#1a1a1a] border-[#464646] hover:border-[#6b6b6b] text-[#ffffff]"
                        : "bg-white border-neutral-200/90 hover:border-neutral-300 text-neutral-900"
                    }`}
                  >
                    {/* Red spinning vinyl record with grooved texture and diamond album art */}
                    <div className="relative w-15 h-15 shrink-0 flex items-center justify-center">
                      <div className="w-15 h-15 rounded-full bg-[#dc2626] relative flex items-center justify-center shadow-md animate-spin-vinyl overflow-hidden">
                        {/* 45° diamond square album art */}
                        <div className="w-15 h-15 rotate-45 overflow-hidden border border-yellow-300/90 shadow-xs shrink-0 flex items-center justify-center bg-black">
                          <img
                            src={trackData.albumArt}
                            alt="Album Art"
                            className="w-15 h-15 -rotate-45 object-cover shrink-0 scale-125"
                          />
                        </div>

                        {/* Center silver spindle ring and hole */}
                        <div className="absolute w-3.5 h-3.5 rounded-full bg-white dark:bg-neutral-200 border border-neutral-400 flex items-center justify-center shadow-inner">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        </div>
                      </div>
                    </div>

                    {/* Track metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className={`font-semibold text-xs truncate ${textWhite}  transition-colors`}>
                          {trackData.song || "Devil In A New Dress"}
                        </h4>
                        <RiArrowRightUpLine
                          size={13}
                          className={`${textSecondary} shrink-0  group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45 transition-all duration-200`}
                        />
                      </div>
                      <p className={`text-[11px] ${textSecondary} truncate mt-0.5`}>
                        {trackData.artist || "Kanye West, Rick Ross"}
                      </p>
                      <div className={`border-t ${isDark ? "border-[#464646]" : "border-neutral-100"} my-1.5`} />
                      <p className={`text-[10px] ${textTertiary}`}>
                        {trackData.isPlaying ? "Listening right now" : "Last played 29 minutes ago"}
                      </p>
                    </div>
                  </a>
                </div>
              )}
            </span>
            .
          </p>

          <p className="animate-blur-fade fade-delay-3">
            Reach me at{" "}
            <span
              className="relative inline-block"
              data-popup-container="twitter"
              onMouseEnter={() => !isTouchDevice && setHoveredEntity("twitter")}
              onMouseLeave={() => !isTouchDevice && setHoveredEntity(null)}
            >
              <a
                href="https://twitter.com/nikhil0148"
                target="_blank"
                rel="noopener noreferrer"
                aria-expanded={hoveredEntity === "twitter"}
                aria-haspopup="dialog"
                aria-label="Twitter profile preview"
                onClick={(e) => handleTriggerClick("twitter", e)}
                onKeyDown={(e) => handleTriggerKeyDown("twitter", e)}
                className={`underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] ${textWhite} hover:text-[#3b82f6] transition-colors cursor-pointer`}
              >
                @nikhil0148
              </a>

              {/* Fixed Twitter Profile Popup centered above "@nikhil0148" with viewport clamping */}
              {hoveredEntity === "twitter" && (
                <div
                  ref={popupRef}
                  style={{
                    left: `calc(50% + ${popupOffset}px)`,
                  }}
                  className={`absolute ${
                    isFlippedY ? "top-full pt-3.5" : "bottom-full pb-3.5"
                  } -translate-x-1/2 z-50 block animate-in fade-in zoom-in-95 duration-150 pointer-events-auto max-w-[calc(100vw-32px)]`}
                >
                  <a
                    href="https://twitter.com/nikhil0148"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-2xl border shadow-2xl w-[min(280px,calc(100vw-32px))] max-w-[calc(100vw-32px)] text-left block cursor-pointer transition-colors ${
                      isDark ? "bg-[#1a1a1a] border-[#464646] hover:border-[#6b6b6b] text-[#ffffff]" : "bg-white border-neutral-200/90 hover:border-neutral-300 text-neutral-900"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#464646] bg-[#f2f2f21a] p-[1.5px]">
                      <img
                        src="/images/nikhil-profile.jpg"
                        onError={(e) => {
                          e.currentTarget.src = "/images/nikhil-1.jpg";
                        }}
                        alt="Nikhil Yadav"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    {/* Name + Verified + Handle */}
                    <div className="mt-2.5">
                      <div className="flex items-center gap-1">
                        <span className={`font-bold text-[14px] ${textWhite}`}>Nikhil</span>
                        <svg
                          viewBox="0 0 24 24"
                          aria-label="Verified account"
                          className="w-3.5 h-3.5 text-[#3b82f6] fill-current shrink-0"
                        >
                          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                        </svg>
                        <span className={`text-xs ${textMidGray} ml-0.5`}>
                          @nikhil0148
                        </span>
                      </div>

                      {/* Bio copy */}
                      <p className={`text-xs ${textBody} mt-2 leading-relaxed`}>
                        Civil Engineering @NITJ · Building{" "}
                        <span className="text-[#3b82f6] font-medium">@JankariTag</span> &{" "}
                        <span className="text-[#3b82f6] font-medium">@CampusNode</span> · turn ideas into products
                      </p>
                    </div>
                  </a>
                </div>
              )}
            </span>
            ,{" "}
            <a
              href="mailto:contact.nikhim@gmail.com"
              className={`underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] ${textWhite} hover:text-[#3b82f6] transition-colors`}
            >
              contact.nikhim@gmail.com
            </a>
            , or on{" "}
            <span
              className="relative inline-block"
              data-popup-container="github"
              onMouseEnter={() => !isTouchDevice && setHoveredEntity("github")}
              onMouseLeave={() => !isTouchDevice && setHoveredEntity(null)}
            >
              <a
                href="https://github.com/experimenthim0"
                target="_blank"
                rel="noopener noreferrer"
                aria-expanded={hoveredEntity === "github"}
                aria-haspopup="dialog"
                aria-label="GitHub profile & contributions preview"
                onClick={(e) => handleTriggerClick("github", e)}
                onKeyDown={(e) => handleTriggerKeyDown("github", e)}
                className={`underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] ${textWhite} hover:text-[#3b82f6] transition-colors cursor-pointer`}
              >
                GitHub
              </a>

              {/* Fixed GitHub Popup centered above "GitHub" with viewport clamping */}
              {hoveredEntity === "github" && (
                <div
                  ref={popupRef}
                  style={{
                    left: `calc(50% + ${popupOffset}px)`,
                  }}
                  className={`absolute ${
                    isFlippedY ? "top-full pt-3.5" : "bottom-full pb-3.5"
                  } -translate-x-1/2 z-50 block animate-in fade-in zoom-in-95 duration-150 pointer-events-auto max-w-[calc(100vw-32px)]`}
                >
                  <div
                    className={`p-3.5 rounded-2xl border shadow-2xl w-[min(370px,calc(100vw-32px))] max-w-[calc(100vw-32px)] text-left ${
                      isDark ? "bg-[#1a1a1a] border-[#464646] text-[#ffffff]" : "bg-white border-neutral-200/90 text-black"
                    }`}
                  >
                    {/* Top Calendar Heatmap */}
                    <div className="overflow-x-auto max-w-full py-1">
                      <GitHubCalendar
                        username="experimenthim0"
                        transformData={selectLastHalfYear}
                        blockSize={9.5}
                        blockMargin={3}
                        fontSize={10}
                        colorScheme={isDark ? "dark" : "light"}
                        labels={{
                          totalCount: "{{count}} contributions in the last 6 months",
                        }}
                      />
                    </div>

                    {/* Bottom Profile Footer */}
                    <a
                      href="https://github.com/experimenthim0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 pt-3 border-t ${isDark ? "border-[#464646] hover:bg-[#ffffff08]" : "border-neutral-100 hover:bg-neutral-50"} flex items-center gap-3 rounded-lg p-1 transition-colors cursor-pointer block`}
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#464646] bg-[#f2f2f21a] p-[1.5px]">
                        <img
                          src="./images/IMG_20250414_000354954_HDR~2.jpg"
                          alt="Nikhil Yadav"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold text-xs ${textWhite}`}>Nikhil</span>
                          <span className={`text-[11px] ${textMidGray}`}>
                            experimenthim0
                          </span>
                        </div>
                        <p className={`text-[11px] ${textSecondary} mt-0.5 truncate`}>
                          Interfaces, physical tags, and the occasional pull request.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </span>
            .
          </p>
        </div>

        {/* 1PX HAIR-THIN DIVIDER */}
        <hr className={`my-10 border-t ${borderColor} animate-blur-fade fade-delay-4`} />

        {/* PROJECTS TABLE */}
        <section className="mb-12 animate-blur-fade fade-delay-4">
          {/* Table Column Labels */}
          <div className={`flex items-center justify-between text-xs ${textSecondary} font-semibold mb-4 select-none`}>
            <div className="flex items-center gap-6">
              <span className="w-10">Year</span>
              <span>Project</span>
            </div>
            <span>Type</span>
          </div>

          {/* Project Rows - Direct clickable links to project webpages with subtle #fafafa0d hover */}
          <div className={`divide-y ${dividerColor}`}>
            {projects.map((proj, idx) => (
              <a
                key={idx}
                href={proj.url}
                target={proj.url.startsWith("http") ? "_blank" : undefined}
                rel={proj.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex items-center justify-between py-3.5 px-2 -mx-2 rounded-lg cursor-pointer text-sm transition-colors block ${bgSubtleHover}`}
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className={`w-10 ${textSecondary} shrink-0 font-medium`}>
                    {proj.year}
                  </span>
                  <span className={`${textTertiary} mr-2`}>/</span>
                  <span className={`font-bold ${textWhite} group-hover:underline underline-offset-4 truncate`}>
                    {proj.name}
                  </span>
                </div>
                <span className={`text-xs ${textSecondary} shrink-0 ml-4 font-medium flex items-center gap-1.5 group-hover:${textWhite} transition-colors`}>
                  {proj.type}
                  <RiArrowRightUpLine size={13} className="opacity-0 group-hover:opacity-100 text-[#3b82f6] transition-opacity shrink-0" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 1PX HAIR-THIN DIVIDER */}
        <hr className={`my-12 border-t ${borderColor} animate-blur-fade fade-delay-5`} />

        {/* =========================================================================
            JANKARITAG PERMANENT SHOWCASE
            ========================================================================= */}
        <section id="jankaritag-showcase" className="mb-14 scroll-mt-10 animate-blur-fade fade-delay-5">
          {/* Header: Logo + Title + Link */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className={`w-12 h-12 rounded-xl border ${isDark ? "border-[#464646] bg-[#f2f2f21a]" : "border-neutral-200 bg-white"} p-1 flex items-center justify-center shrink-0 shadow-xs`}>
              <img
                src="/jtlogo.png"
                alt="JankariTag"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className={`text-[17px] font-semibold tracking-tight ${textWhite}`}>
                JankariTag
              </h2>
              <a
                href="https://jankaritag.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs ${textSecondary} hover:text-[#3b82f6] hover:underline block mt-0.5`}
              >
                www.jankaritag.in
              </a>
            </div>
          </div>

          {/* Hook */}
          <p className={`text-[15px] font-semibold ${textWhite} mb-4 leading-snug`}>
            Most physical assets feel disconnected. JankariTag connects them.
          </p>

          {/* Editorial Paragraphs */}
          <div className={`space-y-3.5 text-[15px] leading-[1.7] ${textBody} mb-6`}>
            <p>
              A QR-based smart tagging platform designed to connect physical objects with useful digital information and services. Developed under Under Yadav Devs with a focus on solving everyday communication and maintenance problems through simple QR technology.
            </p>

            <p>
              VehicleTag allows vehicle owners to attach a privacy-focused QR tag to their vehicles so that others can communicate with the owner without directly exposing their personal contact information. It can also support vehicle-related reminders such as insurance, PUC, servicing, and document updates.
            </p>

            <p>
              WaterCare is designed for institutional environments such as colleges, hostels, and campuses. A QR sticker placed on a water cooler or RO system allows users to report issues such as leakage, poor cooling, taste problems, or maintenance requirements. Maintenance teams can update cleaning, TDS, filter replacement, and service records, creating a digital maintenance history for each unit.
            </p>

            <p>
              I built JankariTag as a full-stack web platform, working across the frontend, backend, database, QR-based workflows, authentication, and administrative dashboards using React, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB. I am currently working on this platform full-time.
            </p>
          </div>

          {/* Bullet List */}
          <ul className={`space-y-2 mb-8 text-[14px] ${textMidGray}`}>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b1b1b1] shrink-0"></span>
              <span>VehicleTag: Anonymous owner messaging & automated renewal reminders.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b1b1b1] shrink-0"></span>
              <span>WaterCare: Institutional QR reporting for cooling, TDS & filter servicing.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b1b1b1] shrink-0"></span>
              <span>Works instantly via mobile scan. Zero app download required.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b1b1b1] shrink-0"></span>
              <span>Centralized admin dashboard with live audit and maintenance records.</span>
            </li>
          </ul>

          {/* Action Buttons (Solid Blue button #3b82f6) */}
          <div className="flex items-center gap-3">
            <a
              href="https://jankaritag.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#3b82f6] text-[#ffffff] hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
            >
              JankariTag.in
            </a>
          </div>
        </section>

        {/* OPTIONAL QUICK MESSAGE / DIRECT CONTACT */}
        <section className={`pt-2 border-t ${borderColor}`}>
          <div className="flex items-center justify-between py-2">
            <span className={`text-xs ${textSecondary}`}>
              Need to get in touch?
            </span>
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className={`text-xs ${textWhite} hover:text-[#3b82f6] underline underline-offset-4 decoration-[#6b6b6b] hover:decoration-[#ffffff] cursor-pointer transition-colors`}
            >
              {showContactForm ? "Hide form" : "Leave a note"}
            </button>
          </div>

          {showContactForm && (
            <form onSubmit={onContactSubmit} className="mt-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    isDark ? "border-[#464646] bg-[#1a1a1a] text-[#ffffff]" : "border-neutral-300 bg-white text-black"
                  } placeholder-[#dedede66] outline-none focus:border-[#3b82f6]`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    isDark ? "border-[#464646] bg-[#1a1a1a] text-[#575757]" : "border-neutral-300 bg-white text-black"
                  } placeholder-[#dedede66] outline-none focus:border-[#3b82f6]`}
                />
              </div>
              <textarea
                name="message"
                rows="3"
                placeholder="What are you building or inquiring about?"
                required
                className={`w-full px-3 py-2 text-xs rounded border ${
                  isDark ? "border-[#464646] bg-[#1a1a1a] text-[#ffffff]" : "border-neutral-300 bg-white text-black"
                } placeholder-[#dedede66] outline-none focus:border-[#3b82f6] resize-none`}
              ></textarea>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={contactStatus === "loading"}
                  className="px-4 py-2 rounded text-xs font-semibold bg-[#3b82f6] text-[#ffffff] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {contactStatus === "loading" ? "Sending..." : "Send Message"}
                </button>
                {contactResult && (
                  <span className={`text-xs ${textSecondary}`}>
                    {contactResult}
                  </span>
                )}
              </div>
            </form>
          )}
        </section>

          {/* FULL PHOTO-TO-ASCII ARTWORK */}
        <section
          className={`mt-14 pt-8 border-t ${borderColor} flex flex-col items-center select-none`}
          aria-label="ASCII portrait of Nikhil Yadav"
        >
          <span className="sr-only">ASCII portrait of Nikhil Yadav</span>

         
          <div className="w-full max-w-full overflow-x-auto rounded-xl border border-[#464646]/30 dark:border-[#464646]/50 p-2 sm:p-4 bg-neutral-500/[0.02] dark:bg-white/[0.01]">
            <pre
              style={{ fontFamily: "monospace" }}
              className={`m-0 w-max max-w-none whitespace-pre font-mono tracking-normal leading-none text-[6px] ${textTertiary} hover:${textWhite} transition-colors duration-300 cursor-default`}
            >
              {asciiPortrait}
            </pre>
          </div>

          <div className={`mt-3 font-mono text-[9px] sm:text-[10px] ${textTertiary} opacity-60 self-center`}>
            Nikhil Yadav
          </div>
        </section>

        {/* SUBTLE MINIMAL FOOTER */}
        <footer className={`mt-14 pt-6 border-t ${borderColor} text-xs ${textTertiary} flex items-center justify-between`}>
          <span>© 2026 NIKHIM</span>
          <span>303804</span>
        </footer>
      </div>
    </div>
  );
}