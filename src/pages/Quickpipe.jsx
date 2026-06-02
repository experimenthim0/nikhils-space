import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Chrome, 
  Github, 
  ArrowRight, 
  Smartphone, 
  Key, 
  Share2, 
  Search, 
  ShieldCheck, 
  EyeOff, 
  Zap, 
  Copy, 
  Trash2, 
  ExternalLink, 
  Lock, 
  Check, 
  Info, 
  X, 
  Send,
  Sparkles,
  RefreshCw,
  MousePointerClick,
  Link2,
  Sun,
  Moon,
  ArrowLeft,
  SmartphoneIcon
} from "lucide-react";

export default function Quickpipe() {
  // Theme state synchronized with portfolio's localStorage settings
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark" || false;
  });

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  // Sync document title
  useEffect(() => {
    document.title = "Quickpipe | Instant Multi-Device Sharing";
  }, []);

  // Simulator State
  const [inputText, setInputText] = useState("https://github.com/experimenthim0/quickpipe");
  const [syncKey, setSyncKey] = useState("qp_usr_7f2x9a4b");
  const [showKey, setShowKey] = useState(false);
  const [isPiping, setIsPiping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("extension");
  
  const [phoneLinks, setPhoneLinks] = useState([
    { id: 1, type: "link", content: "https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf", timestamp: "5 mins ago" },
    { id: 2, type: "text", content: "Alt + S shortcut is configured! Ready to pipe tabs.", timestamp: "12 mins ago" },
    { id: 3, type: "link", content: "https://experimenthim0.github.io/quickpipe-docs", timestamp: "1 hour ago" }
  ]);

  const handlePipeIt = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsPiping(true);
    
    // Simulate pipeline delay
    setTimeout(() => {
      const isUrl = inputText.startsWith("http://") || inputText.startsWith("https://") || inputText.includes(".");
      const newItem = {
        id: Date.now(),
        type: isUrl ? "link" : "text",
        content: inputText,
        timestamp: "Just now"
      };
      setPhoneLinks(prev => [newItem, ...prev]);
      setIsPiping(false);
      setInputText("");
    }, 1200);
  };

  const handleClearPhone = () => {
    setPhoneLinks([]);
  };

  const handleDeleteItem = (id) => {
    setPhoneLinks(prev => prev.filter(item => item.id !== id));
  };

  const handleCopyLink = (content) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${
      isDark ? "bg-black text-gray-100" : "bg-white text-gray-900"
    } relative scroll-smooth myfont transition-colors duration-300`}>
      
      {/* Theme Switcher Button matching Home.jsx style */}
      {/* <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full ${
            isDark
              ? "bg-gray-800 border border-gray-700 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200"
          } transition-all duration-300 shadow-lg`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div> */}

      {/* Background gradients matched exactly with Home.jsx */}
      <div
        className="absolute top-0 left-0 z-0 h-screen w-screen pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))"
            : "radial-gradient(100% 50% at 50% 0%, rgba(0,163,255,0.13) 0, rgba(0,163,255,0) 50%, rgba(0,163,255,0) 100%)",
        }}
      />

      {/* NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${
        isDark ? "bg-black/70 border-gray-800/80" : "bg-white/70 border-gray-200/80"
      } px-4 py-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              {/* Box logo with bg-sky-400 matching highlights */}
              <div className="w-10 h-10 rounded-xl bg-sky-450 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
               <img src="quickpipe.png" alt="quickpipe-logo" className="w-10 h-10 rounded-xl" />
              </div>
              <div>
                <span className={`font-extrabold text-xl tracking-tight vercelgeist ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Quickpipe
                </span>
                <span className="block text-[10px] text-sky-450 font-mono tracking-widest uppercase font-semibold">
                  v1.0.0
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#problem" className={`hover:text-sky-450 transition-colors duration-200 ${isDark ? "text-gray-400" : "text-gray-600"}`}>The Problem</a>
            <a href="#features" className={`hover:text-sky-450 transition-colors duration-200 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Features</a>
            <a href="#how-it-works" className={`hover:text-sky-450 transition-colors duration-200 ${isDark ? "text-gray-400" : "text-gray-600"}`}>How it Works</a>
            <a href="#open-source" className={`hover:text-sky-450 transition-colors duration-200 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Open Source</a>
          </nav>

          <div className="flex items-center gap-4 md:pr-0">
            <Link 
              to="/" 
              className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
                isDark ? "text-gray-400 hover:text-white hover:bg-gray-900" : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              ← Portfolio
            </Link>
            <a 
              href="https://github.com/experimenthim0/quickpipe" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border transition-all duration-200 ${
                isDark 
                  ? "bg-gray-900 border-gray-800 text-gray-300 hover:text-white hover:border-gray-700" 
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:text-black hover:border-gray-300"
              }`}
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col text-left space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md w-fit vercelgeist font-bold text-xs ${
              isDark ? "bg-gray-800/80 text-white" : "bg-gray-100 text-gray-900"
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-sky-450 animate-pulse" />
              <span>100% Free & Open-Source</span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.25] tracking-tight vercelgeist ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Stop Filling <br />
              <span className="inline-flex bg-sky-400 px-3 py-1.5 text-white rounded-md vercelgeist font-bold">
                WhatsApp Chats
              </span> <br />
              With Links.
            </h1>

            <p className={`text-lg md:text-xl font-LostTumbler leading-relaxed max-w-xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}>
              Quickpipe creates an instant pipeline between browser and phone so you can send links and text without emailing yourself or cluttering private chats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 ease-in-out text-base shadow-md"
              >
                <Chrome className="w-5 h-5" />
                Add Extension
              </a>
              <a 
                href="https://github.com/experimenthim0/quickpipe"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 border font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out text-base shadow-md ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900"
                }`}
              >
                <Github className="w-5 h-5 text-gray-500" />
                View GitHub
              </a>
              <a 
                href="https://github.com/experimenthim0/quickpipe/releases"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 border font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out text-base shadow-md ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900"
                }`}
              >
                <Smartphone className="w-5 h-5 text-gray-500" />
                Download App
              </a>
            </div>

            {/* Micro stats banner matching home page styling */}
            <div className={`flex items-center gap-8 pt-8 border-t max-w-lg ${
              isDark ? "border-gray-800/85" : "border-gray-200"
            }`}>
              <div>
                <span className={`block text-2xl font-bold font-mono ${isDark ? "text-white" : "text-gray-900"}`}>Alt + S</span>
                <span className="text-xs text-gray-500">Global Hotkey</span>
              </div>
              <div className={`h-8 w-px ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>
              <div>
                <span className={`block text-2xl font-bold font-mono ${isDark ? "text-white" : "text-gray-900"}`}>&lt; 100kb</span>
                <span className="text-xs text-gray-500">Extension Size</span>
              </div>
              <div className={`h-8 w-px ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>
              <div>
                <span className={`block text-2xl font-bold font-mono ${isDark ? "text-white" : "text-gray-900"}`}>100%</span>
                <span className="text-xs text-gray-500">Privacy First</span>
              </div>
            </div>
          </div>

          {/* Right Section: Interactive Pipeline Simulator */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative z-10">
            <div className="absolute w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[80px] -z-10"></div>
            
            {/* Simulator container card themed like Home.jsx projects */}
            <div className={`w-full max-w-2xl border-2 border-dashed rounded-lg p-6 md:p-8 relative shadow-lg transition-all duration-300 ${
              isDark ? "bg-gray-800 bg-opacity-50 border-gray-400" : "bg-gray-50 border-gray-300"
            }`}>
              
              <div className={`flex items-center justify-between mb-8 pb-4 border-b ${
                isDark ? "border-gray-700/50" : "border-gray-300"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/80"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/80"></span>
                </div>
                <div className="text-xs font-mono text-sky-450 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Pipeline Simulator Active
                </div>
              </div>

              {/* Mockups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center relative">
                
                {/* 1. Browser Extension Mockup */}
                <div className="md:col-span-5 flex flex-col space-y-4">
                  <div className="text-xs text-gray-500 font-bold font-mono flex items-center gap-1.5 uppercase">
                    <Chrome className="w-3.5 h-3.5 text-sky-400" /> Extension UI
                  </div>
                  
                  {/* Extension window container */}
                  <div className={`w-full border-2 border-dashed rounded-lg p-4 shadow-md relative overflow-hidden transition-all duration-300 ${
                    isDark ? "bg-gray-900 border-gray-600" : "bg-white border-gray-300"
                  }`}>
                    {/* Status header */}
                    <div className={`flex items-center justify-between border-b pb-3.5 mb-4 ${
                      isDark ? "border-gray-800" : "border-gray-200"
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                        <span className={`text-[11px] font-bold font-mono tracking-wide ${isDark ? "text-gray-250" : "text-gray-800"}`}>QUICKPIPE</span>
                      </div>
                      <div className={`text-[10px] border font-mono px-2 py-0.5 rounded ${
                        isDark 
                          ? "bg-sky-950/60 border-sky-850 text-sky-400" 
                          : "bg-sky-50 border-sky-200 text-sky-600"
                      }`}>
                        ACTIVE
                      </div>
                    </div>

                    {/* Mode selection switcher */}
                    <div className={`flex p-1 rounded-lg mb-4 text-xs font-medium ${
                      isDark ? "bg-gray-950" : "bg-gray-100"
                    }`}>
                      <button 
                        type="button"
                        onClick={() => { setActiveTab("extension"); setInputText("https://github.com/experimenthim0/quickpipe"); }}
                        className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer ${
                          activeTab === "extension" 
                            ? "bg-blue-600 text-white font-bold" 
                            : isDark ? "text-gray-400 hover:text-gray-250" : "text-gray-600 hover:text-black"
                        }`}
                      >
                        Input Box
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setActiveTab("shortcut"); setInputText("https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf"); }}
                        className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer ${
                          activeTab === "shortcut" 
                            ? "bg-blue-600 text-white font-bold" 
                            : isDark ? "text-gray-400 hover:text-gray-250" : "text-gray-600 hover:text-black"
                        }`}
                      >
                        Alt + S
                      </button>
                    </div>

                    {/* Sync Key */}
                    <div className="mb-4">
                      <label className="text-[10px] text-gray-400 font-mono block mb-1">Device Key</label>
                      <div className={`flex items-center border rounded-lg px-2.5 py-1.5 justify-between ${
                        isDark ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"
                      }`}>
                        <span className={`font-mono text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {showKey ? syncKey : "••••-••••-••••"}
                        </span>
                        <button 
                          type="button"
                          onClick={() => setShowKey(!showKey)}
                          className="text-[10px] text-sky-400 hover:text-sky-500 font-mono font-bold ml-2 cursor-pointer"
                        >
                          {showKey ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    {/* Extension Body */}
                    <form onSubmit={handlePipeIt} className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-400 font-mono block mb-1">
                          {activeTab === "extension" ? "Payload (Link or Text)" : "Active Tab URL"}
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            disabled={activeTab === "shortcut" || isPiping}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter URL or text..."
                            className={`w-full border text-xs rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-sky-400 transition-all ${
                              isDark 
                                ? "bg-gray-950 border-gray-800 text-gray-205 placeholder:text-gray-600 disabled:opacity-70" 
                                : "bg-gray-50 border-gray-250 text-gray-900 placeholder:text-gray-400 disabled:opacity-70"
                            }`}
                          />
                          <Link2 className="absolute right-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isPiping || !inputText.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-450 dark:disabled:bg-gray-800 dark:disabled:text-gray-600 text-white font-bold text-xs py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:scale-100 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isPiping ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Piping...
                          </>
                        ) : activeTab === "shortcut" ? (
                          <>
                            <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
                            Press Alt + S to Pipe
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Pipe Link
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* 2. Middle Connector Line */}
                <div className="md:col-span-1 flex md:flex-col items-center justify-center h-12 md:h-full py-2">
                  <div className={`relative w-full md:w-0.5 h-0.5 md:h-40 rounded-full flex items-center justify-center ${
                    isDark ? "bg-gray-700" : "bg-gray-350"
                  }`}>
                    
                    {/* SVG Line for Desktop */}
                    <svg className="absolute hidden md:block w-8 h-40 pointer-events-none" style={{ overflow: "visible" }}>
                      <path 
                        d="M -16 20 C 16 20, 0 160, 20 160" 
                        fill="none" 
                        stroke={isDark ? "#4b5563" : "#d1d5db"} 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                      />
                      {isPiping && (
                        <motion.path 
                          d="M -16 20 C 16 20, 0 160, 20 160" 
                          fill="none" 
                          stroke="#38bdf8" 
                          strokeWidth="3"
                          initial={{ strokeDasharray: "100", strokeDashoffset: "100" }}
                          animate={{ strokeDashoffset: ["100", "0"] }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                      )}
                    </svg>

                    {/* Mobile responsive progress connector */}
                    <div className={`md:hidden w-16 h-0.5 relative ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
                      {isPiping && (
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-sky-400"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2, ease: "linear" }}
                        />
                      )}
                    </div>

                    {isPiping && (
                      <div className="absolute hidden md:block w-3 h-3 bg-sky-400 rounded-full blur-[3px]" />
                    )}
                  </div>
                </div>

                {/* 3. Smartphone Mockup */}
                <div className="md:col-span-5 flex flex-col space-y-4">
                  <div className="text-xs text-gray-500 font-bold font-mono flex items-center gap-1.5 uppercase justify-between">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-sky-400" /> Receiver Stream
                    </span>
                    {phoneLinks.length > 0 && (
                      <button 
                        type="button"
                        onClick={handleClearPhone} 
                        className="text-[10px] text-red-500/80 hover:text-red-500 transition-colors font-mono underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Smartphone Frame */}
                  <div className={`w-full border-2 border-dashed rounded-lg h-[340px] shadow-md relative flex flex-col overflow-hidden transition-all duration-300 ${
                    isDark ? "bg-[#0b0c10] border-gray-600" : "bg-gray-100 border-gray-300"
                  }`}>
                    
                    {/* Camera/speaker notch */}
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-4 rounded-b-xl z-20 flex items-center justify-center ${
                      isDark ? "bg-gray-800" : "bg-gray-300"
                    }`}>
                      <span className={`w-8 h-1 rounded-full ${isDark ? "bg-gray-900" : "bg-gray-400"}`}></span>
                    </div>

                    {/* Smartphone Header info */}
                    <div className={`px-5 pt-5 pb-2 flex items-center justify-between text-[9px] font-mono border-b ${
                      isDark ? "text-gray-550 border-gray-900" : "text-gray-600 border-gray-200"
                    }`}>
                      <span>9:41 AM</span>
                      <div className="flex items-center gap-1">
                        <span>5G</span>
                        <span className={`w-3.5 h-2 border rounded-sm flex items-center px-0.5 ${isDark ? "border-gray-600" : "border-gray-400"}`}>
                          <span className="w-full h-full bg-sky-400 rounded-[1px]"></span>
                        </span>
                      </div>
                    </div>

                    {/* App Stream Workspace */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-none flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold tracking-wide text-sky-400 font-mono">Stream Inbox</span>
                        <span className="text-[9px] font-mono text-gray-500">Connected</span>
                      </div>

                      {/* Phone feed items list */}
                      <div className="space-y-2 flex-1">
                        <AnimatePresence initial={false}>
                          {phoneLinks.length === 0 ? (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="h-full flex flex-col items-center justify-center text-center py-10"
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 ${
                                isDark ? "bg-gray-900 border border-gray-800" : "bg-gray-200 border border-gray-300"
                              }`}>
                                <Info className="w-4 h-4 text-gray-500" />
                              </div>
                              <p className="text-[10px] text-gray-550 font-bold">Pipeline is empty.</p>
                              <p className="text-[9px] text-gray-400 max-w-[130px] mx-auto mt-1">Try piping a link from the extension mockup!</p>
                            </motion.div>
                          ) : (
                            phoneLinks.map((item) => (
                              <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className={`border-2 border-dashed rounded-lg p-3 shadow-sm hover:scale-[1.01] transition-all ${
                                  isDark ? "bg-gray-800 bg-opacity-40 border-gray-600" : "bg-white border-gray-300"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                                    item.type === "link" 
                                      ? "bg-sky-950 border border-sky-900 text-sky-400" 
                                      : "bg-purple-955 border border-purple-900 text-purple-400"
                                  }`}>
                                    {item.type.toUpperCase()}
                                  </span>
                                  <span className="text-[8px] text-gray-500">{item.timestamp}</span>
                                </div>
                                
                                <p className={`text-[10px] font-mono font-medium break-all line-clamp-2 ${
                                  isDark ? "text-gray-300" : "text-gray-800"
                                }`}>
                                  {item.content}
                                </p>

                                <div className={`mt-2.5 pt-2 border-t border-dashed flex items-center justify-between opacity-80 ${
                                  isDark ? "border-gray-700" : "border-gray-200"
                                }`}>
                                  <button 
                                    type="button"
                                    onClick={() => handleCopyLink(item.content)}
                                    className="text-[8px] font-mono text-sky-400 hover:text-sky-500 flex items-center gap-1 active:scale-95 transition-transform cursor-pointer font-bold"
                                  >
                                    <Copy className="w-2.5 h-2.5" />
                                    {isCopied ? "Copied" : "Copy"}
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="text-[8px] font-mono text-red-500/80 hover:text-red-500 flex items-center gap-0.5 active:scale-95 transition-transform cursor-pointer font-bold"
                                  >
                                    <Trash2 className="w-2.5 h-2.5" />
                                    Dismiss
                                  </button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Home screen indicator */}
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

              </div>

              {/* Interactive hint */}
              <div className={`mt-8 pt-4 border-t border-dashed flex items-center justify-center gap-2 text-xs ${
                isDark ? "border-gray-700 text-gray-400" : "border-gray-300 text-gray-650"
              }`}>
                <MousePointerClick className="w-4 h-4 text-sky-400 animate-bounce" />
                <span>Simulate browser pipe stream workflow instantly on live mockups.</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className={`relative z-10 border-y py-24 transition-colors duration-300 ${
        isDark ? "border-gray-800/80 bg-gray-950/20" : "border-gray-200 bg-gray-50/40"
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>
              The Friction of Multi-Device Sharing
            </h2>
            <p className={`mt-4 text-lg font-LostTumbler ${isDark ? "text-white" : "text-gray-800"}`}>
              We sync links to our other devices multiple times a day. Most workflows involve cluttering our chat interfaces or drafts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* The Old Way Card themed like Home.jsx project cards */}
            <div className={`border-2 border-dashed rounded-lg p-8 hover:scale-105 transform transition-transform duration-300 ease-in-out shadow-lg relative group overflow-hidden ${
              isDark ? "bg-gray-800 bg-opacity-50 border-red-500/40" : "bg-gray-50 border-red-300"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-550"></span>
                <h3 className={`text-xl font-bold vercelgeist ${isDark ? "text-gray-300" : "text-gray-700"}`}>The Old Way</h3>
              </div>

              <ul className={`space-y-5 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">1</div>
                  <p>Copy a link from your desktop browser window.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">2</div>
                  <p>Open WhatsApp Web, or create a self-sent email draft.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">3</div>
                  <p>Paste the content and send it to clutter your chat storage.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">4</div>
                  <p className="text-red-500 font-bold">Unlock your phone, search through chats, and extract it.</p>
                </li>
              </ul>

              {/* Whatsapp bubble illustration */}
              <div className={`mt-8 border-2 border-dashed rounded-lg p-4 space-y-2 opacity-50 select-none ${
                isDark ? "bg-gray-950 border-gray-700" : "bg-gray-50 border-gray-300"
              }`}>
                <div className={`rounded-lg p-2.5 max-w-[200px] text-[10px] ${
                  isDark ? "bg-[#121212] text-gray-400 border border-gray-800" : "bg-gray-200 text-gray-600 border border-gray-300"
                }`}>
                  Hey, do you have that article link?
                </div>
                <div className={`border rounded-lg p-2.5 max-w-[220px] ml-auto text-[10px] font-mono break-all ${
                  isDark ? "bg-[#102521] border-emerald-950 text-emerald-450" : "bg-emerald-50 border-emerald-250 text-emerald-600"
                }`}>
                  https://medium.com/engineering-design-trends/how-to-scale-react-app-routers...
                </div>
              </div>
            </div>

            {/* The Quickpipe Way Card themed like Home.jsx project cards */}
            <div className={`border-2 border-dashed rounded-lg p-8 hover:scale-105 transform transition-transform duration-300 ease-in-out shadow-lg relative group overflow-hidden ${
              isDark ? "bg-gray-800 bg-opacity-50 border-cyan-400/40" : "bg-gray-50 border-cyan-350"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-colors"></div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></span>
                  <h3 className={`text-xl font-bold vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>The Quickpipe Way</h3>
                </div>
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-500 px-2.5 py-0.5 border border-cyan-500/20 rounded-full font-bold">
                  Instant Sync
                </span>
              </div>

              <ul className={`space-y-5 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">1</div>
                  <p>You copy a link or snippet on your screen.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">2</div>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    Press <kbd className="font-mono bg-cyan-500/20 border border-cyan-500/30 text-[11px] text-cyan-500 px-1.5 py-0.5 rounded shadow font-bold">Alt + S</kbd> on your keyboard.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">3</div>
                  <p className="text-cyan-500 font-bold">The current tab syncs immediately via secure sync protocol.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 font-mono text-xs flex-shrink-0 mt-0.5 font-bold">4</div>
                  <p>Unlock phone/tablet, open App widget, and tap the link.</p>
                </li>
              </ul>

              {/* Stream list illustration */}
              <div className={`mt-8 border-2 border-dashed rounded-lg p-4 space-y-2 relative shadow-inner ${
                isDark ? "bg-gray-950 border-gray-700" : "bg-gray-50 border-gray-300"
              }`}>
                <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono">
                  <span>Stream Feed</span>
                  <span className="text-cyan-500 font-bold">Active</span>
                </div>
                <div className={`border rounded-lg p-2.5 text-[10px] flex items-center justify-between ${
                  isDark ? "bg-gray-900 border-cyan-500/20 text-gray-200" : "bg-white border-cyan-200 text-gray-800"
                }`}>
                  <span className="font-mono truncate max-w-[200px]">https://medium.com/engineering-design...</span>
                  <span className="text-[8px] bg-cyan-500/10 text-cyan-500 px-1 rounded font-bold">Alt+S</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>
            Designed for Developers and Power Users
          </h2>
          <p className={`mt-4 text-lg font-LostTumbler ${isDark ? "text-white" : "text-gray-850"}`}>
            No slow login steps, and no telemetry bloat. Just a clean sync pipe built for high-productivity layouts.
          </p>
        </div>

        {/* Feature Cards Grid matching Home.jsx project card hover animations and border styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {[
            { icon: Zap, title: "Alt + S Shortcut", desc: "Instantly sync active desktop tab with a customizable global keyboard shortcut. Zero mouse clicks." },
            { icon: Share2, title: "Links & Text Sync", desc: "Share rich links, plain clipboard text, code snippets, or markdown values directly between active viewports." },
            { icon: Chrome, title: "Multi-Browser Ready", desc: "Pipes across Chrome, Brave, Arc, Edge, and multiple browser instances/profiles simultaneously." },
            { icon: Key, title: "Single Sync Key", desc: "Connect extension and app instantly using a secure sync token. No forms, email logins, or tracking schemas." },
            { icon: Search, title: "History Index Search", desc: "Retrieve previously piped information through local, fast indexing inside the app container or popup interface." },
            { icon: Info, title: "Minimal Memory Use", desc: "Super lightweight codebase (<100kb payload) that launches instantly and uses zero idle background threads." },
            { icon: EyeOff, title: "No Analytics Tracking", desc: "We track no history logs, store zero metrics, and place no advertising pixels. Your data remains fully secure." },
            { icon: ShieldCheck, title: "Open-Source Code", desc: "Verify architecture transparency directly on GitHub, or host your own private sync buffer with docker." }
          ].map((feat, idx) => (
            <div 
              key={idx}
              className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                isDark 
                  ? "bg-gray-800 bg-opacity-50 border-gray-400 hover:border-cyan-500/30" 
                  : "bg-gray-50 border-gray-300 hover:border-cyan-400/50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                isDark ? "bg-sky-950/60 border border-sky-900 text-sky-400" : "bg-sky-50 border border-sky-200 text-sky-500"
              }`}>
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold mb-2 vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>{feat.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-650"}`}>
                {feat.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={`relative z-10 border-t py-24 transition-colors duration-300 ${
        isDark ? "border-gray-800/80 bg-gray-950/10" : "border-gray-200 bg-gray-50/20"
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>
              Four Simple Steps
            </h2>
            <p className={`mt-4 text-lg font-LostTumbler ${isDark ? "text-white" : "text-gray-850"}`}>
              No setup guides required. Paste your key and you are connected.
            </p>
          </div>

          {/* Timeline Process */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
            
            <div className={`hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 -z-10 ${
              isDark ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20" : "bg-cyan-200/50"
            }`}></div>

            {/* Step 1 */}
            <div className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center text-center space-y-4 relative w-full hover:scale-105 transform transition-transform duration-300 ${
              isDark ? "bg-gray-800 bg-opacity-50 border-gray-400" : "bg-white border-gray-300"
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm relative group border ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
              }`}>
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-sky-400 text-white font-mono text-xs flex items-center justify-center font-bold shadow-sm">1</span>
                <Chrome className="w-7 h-7" />
              </div>
              <h3 className={`text-md font-bold vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>1. Install Extension</h3>
              <p className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Download on Chrome/Brave via the <a href="https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline font-bold">Web Store</a>.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center text-center space-y-4 relative w-full hover:scale-105 transform transition-transform duration-300 ${
              isDark ? "bg-gray-800 bg-opacity-50 border-gray-400" : "bg-white border-gray-300"
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm relative group border ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
              }`}>
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-sky-400 text-white font-mono text-xs flex items-center justify-center font-bold shadow-sm">2</span>
                <SmartphoneIcon className="w-7 h-7" />
              </div>
              <h3 className={`text-md font-bold vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>2. Get Mobile Client</h3>
              <p className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Launch the companion client on your mobile device.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center text-center space-y-4 relative w-full hover:scale-105 transform transition-transform duration-300 ${
              isDark ? "bg-gray-800 bg-opacity-50 border-gray-400" : "bg-white border-gray-300"
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm relative group border ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
              }`}>
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-sky-400 text-white font-mono text-xs flex items-center justify-center font-bold shadow-sm">3</span>
                <Key className="w-7 h-7" />
              </div>
              <h3 className={`text-md font-bold vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>3. Sync Token Key</h3>
              <p className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Paste the unique sync token from extension settings to connect.
              </p>
            </div>

            {/* Step 4 */}
            <div className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center text-center space-y-4 relative w-full hover:scale-105 transform transition-transform duration-300 ${
              isDark ? "bg-gray-800 bg-opacity-50 border-gray-400" : "bg-white border-gray-300"
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm relative group border ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
              }`}>
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-sky-400 text-white font-mono text-xs flex items-center justify-center font-bold shadow-sm">4</span>
                <Send className="w-7 h-7" />
              </div>
              <h3 className={`text-md font-bold vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>4. Start Sharing</h3>
              <p className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Tap <kbd className="font-mono bg-cyan-500/10 text-cyan-600 px-1 border border-cyan-500/20 text-[10px] rounded font-bold">Alt + S</kbd> to stream URLs instantly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* OPEN SOURCE + PRIVACY */}
      <section id="open-source" className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>
              Open-Source Transparency & Trust
            </h2>
            <p className={`text-md leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              We don't collect sync logs. Piped links sit on temporary websocket cache lines and purge immediately upon mobile delivery.
            </p>

            <div className="space-y-3.5">
              {[
                "MIT Licensed open-source repository",
                "Websocket packets immediately deleted on transfer",
                "Zero analytics tracking cookies or tracking scripts"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="https://github.com/experimenthim0/quickpipe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-sky-500 hover:text-sky-600 transition-colors font-bold"
              >
                Explore repository codebase <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GitHub Repository Widget Card matching Home.jsx project card styling */}
          <div className="lg:col-span-6 flex justify-center">
            <div className={`w-full max-w-md border-2 border-dashed rounded-lg p-6 shadow-lg relative overflow-hidden group hover:scale-105 transform transition-transform duration-300 ease-in-out ${
              isDark ? "bg-gray-800 bg-opacity-50 border-gray-400" : "bg-gray-50 border-gray-300"
            }`}>
              
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>

              {/* GitHub Header */}
              <div className={`flex items-center justify-between pb-4 border-b mb-6 ${
                isDark ? "border-gray-750" : "border-gray-300"
              }`}>
                <div className="flex items-center gap-3">
                  <Github className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-850"}`} />
                  <div>
                    <h3 className={`text-sm font-bold font-mono vercelgeist ${isDark ? "text-white" : "text-gray-850"}`}>experimenthim0 / quickpipe</h3>
                    <span className="text-[10px] text-gray-500 font-mono">github.com repository</span>
                  </div>
                </div>
                <span className="text-[10px] text-sky-500 font-mono border border-sky-400/20 bg-sky-500/10 px-2 py-0.5 rounded font-bold">
                  public
                </span>
              </div>

              {/* Description */}
              <p className={`text-xs font-mono leading-relaxed mb-6 ${isDark ? "text-gray-305" : "text-gray-650"}`}>
                A lightweight multi-device sync buffer extension to pipe current URL/text from chromium browser to mobile apps instantaneously via simple token keys.
              </p>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-4 border-y py-4 mb-6 text-center font-mono ${
                isDark ? "border-gray-750" : "border-gray-300"
              }`}>
                <div>
                  <span className={`block text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>MIT</span>
                  <span className="text-[9px] text-gray-500">License</span>
                </div>
                <div>
                  <span className={`block text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>JS / React</span>
                  <span className="text-[9px] text-gray-500">Language</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-sky-500 font-bold">100%</span>
                  <span className="text-[9px] text-gray-500">Transparent</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/experimenthim0/quickpipe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-xs font-bold py-2.5 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 ${
                    isDark ? "bg-white hover:bg-gray-200 text-black shadow-sm" : "bg-gray-900 hover:bg-gray-850 text-white shadow-sm"
                  }`}
                >
                  <Github className="w-4 h-4" />
                  Codebase
                </a>
                <a 
                  href="https://github.com/experimenthim0/quickpipe/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 border text-xs font-semibold py-2.5 rounded-xl text-center transition-all flex items-center justify-center gap-1 ${
                    isDark 
                      ? "bg-gray-900 border-gray-700 hover:border-gray-600 text-gray-300" 
                      : "bg-white border-gray-300 hover:border-gray-400 text-gray-750"
                  }`}
                >
                  Report Issue
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 border-t border-gray-900 py-28 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className={`text-4xl md:text-5xl font-bold leading-tight vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>
            Build a Faster Link Workflow.
          </h2>
          <p className={`text-md md:text-lg max-w-xl mx-auto font-LostTumbler ${isDark ? "text-white" : "text-gray-800"}`}>
            Clean up your messaging chats. Install the extension in seconds and streamline your multi-device tasks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a 
              href="https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full shadow-md transition-all duration-200 cursor-pointer"
            >
              <Chrome className="w-4 h-4" />
              Get Extension
            </a>
            <a 
              href="https://github.com/experimenthim0/quickpipe"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 border font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out shadow-md ${
                isDark 
                  ? "bg-gray-805 border-gray-700 hover:bg-gray-700 text-white" 
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-750"
              }`}
            >
              Explore Github
            </a>
            <a 
              href="https://github.com/experimenthim0/quickpipe/releases"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 border font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out shadow-md ${
                isDark 
                  ? "bg-gray-805 border-gray-700 hover:bg-gray-700 text-white" 
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-750"
              }`}
            >
              <Smartphone className="w-4 h-4 text-gray-500" />
              Download App
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-12 relative z-10 ${
        isDark ? "border-gray-850 bg-black/60" : "border-gray-200 bg-gray-50/60"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-400 flex items-center justify-center shadow-sm">
              <img src="quickpipe.png" alt="" className="rounded-lg"/>
            </div>
            <div>
              <span className={`font-extrabold text-md tracking-tight vercelgeist ${isDark ? "text-white" : "text-gray-900"}`}>Quickpipe</span>
              <span className="block text-[8px] text-gray-550 font-mono tracking-wider font-semibold">LINK PIPELINE STREAM</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center md:text-left font-medium">
            © {new Date().getFullYear()} Nikhil Yadav. All rights reserved. Created with ❤️ for developers.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-500 font-bold">
            <a 
              href="https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors"
            >
              Extension
            </a>
            <a 
              href="https://github.com/experimenthim0/quickpipe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors"
            >
              GitHub Code
            </a>
            <Link 
              to="/" 
              className="hover:text-sky-500 transition-colors"
            >
              Contact Developer
            </Link>
          </div>

        </div>
      </footer>

      {/* Floating social-dock wrapper matching Home.jsx layout exactly */}
      <div className={`px-5 py-1 fixed bottom-4 right-1 transform -translate-x-1/10 z-40 
        rounded-4xl border-[1px] shadow-md transition-all flex gap-0.5 ${
          isDark
            ? "border-[#d2c6ad46] backdrop-blur-[25px] bg-[#faf5ec10] text-white"
            : "border-gray-300 backdrop-blur-[25px] bg-white/95 text-gray-900"
        }`}
      >
        <Link 
          to="/" 
          title="Back to Portfolio"
          className="inline-flex items-center justify-center p-2.5 rounded-full hover:text-cyan-500 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <a 
          href="https://github.com/experimenthim0/quickpipe" 
          target="_blank" 
          rel="noopener noreferrer"
          title="GitHub Repo"
          className="inline-flex items-center justify-center p-2.5 rounded-full hover:text-cyan-500 transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href="https://chromewebstore.google.com/detail/quickpipe/okpmlmpjekmihlcjedppglooagamcekf" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Install Extension"
          className="inline-flex items-center justify-center p-2.5 rounded-full hover:text-cyan-500 transition-colors"
        >
          <Chrome className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
}
