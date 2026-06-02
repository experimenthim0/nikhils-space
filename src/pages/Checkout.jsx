import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  RiSunLine, 
  RiMoonLine, 
  RiArrowLeftLine, 
  RiCheckLine, 
  RiFileCopyLine, 
  RiQrCodeLine, 
  RiBankCardLine, 
  RiShieldCheckLine,
  RiExternalLinkLine,
  RiTwitterXLine,
  RiLinkedinFill,
  RiGithubLine,
  RiHeart3Line
} from "@remixicon/react";

function Checkout() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark" || false;
  });

  const [copied, setCopied] = useState(false);
  const upiId = "9667446393@upi";
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc3C0q0-MCcwpEWDlbIBC9p31AawNBwn-LBdwz00kQqbwRxjg/viewform?usp=publish-editor";

  useEffect(() => {
    document.title = "Upgrade to Quickpipe Premium";
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${isDark ? "bg-black text-white" : "bg-white text-gray-900"} relative scroll-smooth myfont transition-colors duration-300 pb-20`}>
      
      {/* Theme Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full ${
            isDark
              ? "bg-gray-800 border border-gray-700 text-yellow-400 hover:bg-gray-700 animate-fade-in"
              : "bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 animate-fade-in"
          } transition-all duration-300 shadow-lg cursor-pointer`}
          aria-label="Toggle theme"
        >
          {isDark ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
        </button>
      </div>

      {/* Background Layer */}
      <div
        className="absolute inset-0 z-[-1] pointer-events-none transition-all duration-300"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))'
            : 'radial-gradient(100% 50% at 50% 0%, rgba(0,163,255,0.13) 0, rgba(0,163,255,0) 50%, rgba(0,163,255,0) 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* Back Navigation */}
        <div className="mb-10 flex">
          <Link
            to="/"
            className={`inline-flex items-center gap-1.5 py-2.5 px-5 rounded-full text-xs font-semibold ${
              isDark
                ? "bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white hover:bg-[#faf5ec33]"
                : "bg-gray-100 backdrop-blur-[24px] border border-gray-300 text-gray-900 hover:bg-gray-200"
            } transition-colors`}
          >
            <RiArrowLeftLine size="14px" />
            Back to Portfolio
          </Link>
        </div>

        {/* Header Section */}
        <div className="mx-5 mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 vercelgeist leading-tight tracking-tight">
            Upgrade to{" "}
            <span className="bg-sky-400 px-3 py-1 text-white vercelgeist inline-block rounded-md shadow-sm">
              Quickpipe Premium
            </span>
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"} font-medium leading-relaxed`}>
            Unlock infinite searchable history pipelines and unlimited device linking slots across all your environments with a single one-time purchase.
          </p>
        </div>

        {/* Plan Feature Comparison */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"} vercelgeist`}>
              Compare Capabilities
            </h2>
            <div className={`max-w-14 h-0.5 ${isDark ? "bg-white" : "bg-gray-900"} z-20 mx-auto mt-1.5 block`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5">
            
            {/* Free Tier Card */}
            <div className={`p-6 rounded-lg border-2 border-dashed ${
              isDark ? "bg-gray-800/20 border-gray-755" : "bg-gray-50 border-gray-200"
            } transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-lg text-gray-400 uppercase tracking-wider">Free Tier</h3>
                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${
                  isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}>Active Default</span>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                  <span>Max 3 active linked devices</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                  <span>7-day searchable history window</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                  <span>Basic cloud-sync capacity</span>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-500/10">
                <p className={`text-base font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>Cost: $0 / ₹0 Forever</p>
              </div>
            </div>

            {/* Premium Tier Card */}
            <div className={`p-6 rounded-lg border-2 border-dashed relative overflow-hidden ${
              isDark ? "bg-cyan-950/20 border-cyan-500/30 animate-pulse-subtle" : "bg-sky-50/50 border-sky-300 shadow-md"
            } transition-colors duration-300`}>
              <div className="absolute top-0 right-0 bg-cyan-400 text-white font-bold text-[9px] px-3.5 py-1 rounded-bl-lg uppercase tracking-wider">
                Lifetime
              </div>
              <div className="flex justify-between items-center mb-5">
                <h3 className={`font-bold text-lg ${isDark ? "text-cyan-400" : "text-sky-600"} uppercase tracking-wider`}>Lifetime Premium</h3>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className={isDark ? "text-cyan-400" : "text-sky-600"} size={16} />
                  <span className="font-bold">Unlimited connected devices & browser profiles</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className={isDark ? "text-cyan-400" : "text-sky-600"} size={16} />
                  <span className="font-bold">Infinite, permanent searchable history archive</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className={isDark ? "text-cyan-400" : "text-sky-600"} size={16} />
                  <span className="font-bold">Zero subscriptions — pay once, own it forever</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <RiCheckLine className={isDark ? "text-cyan-400" : "text-sky-600"} size={16} />
                  <span className="font-bold">Instant activation & secure cryptographic licensing</span>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-500/10">
                <p className={`text-base font-bold ${isDark ? "text-cyan-400" : "text-sky-600"}`}>Cost: ₹299 / $9.99 One-Time</p>
              </div>
            </div>

          </div>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 mx-auto max-w-5xl">
          
          {/* Step 1 Card: Payment Methods */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-center lg:justify-start items-center mb-6">
              <h2 className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"} flex items-center gap-2 vercelgeist`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? "bg-cyan-400" : "bg-cyan-500"} inline-block animate-pulse`}></span>
                Step 1: Pay ₹299 / $9.99
              </h2>
            </div>

            <div className={`flex-1 flex flex-col gap-6 p-6 sm:p-8 rounded-lg border-2 border-dashed ${
              isDark
                ? "bg-gray-800 bg-opacity-50 border-gray-400"
                : "bg-gray-50 border-gray-300 shadow-lg"
            } transition-colors duration-300`}>
              
              {/* UPI Option */}
              <div className={`p-5 rounded-lg border ${isDark ? "border-gray-700 bg-gray-900/40" : "border-gray-200 bg-white"} relative overflow-hidden transition-colors duration-300`}>
                <div className="absolute top-0 right-0 bg-sky-400 text-white font-bold text-[9px] px-3.5 py-1 rounded-bl-lg uppercase tracking-wider">
                  India Only
                </div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`p-2 rounded-full ${isDark ? "bg-[#102546]" : "bg-sky-100"}`}>
                    <RiQrCodeLine size={20} className={isDark ? "text-cyan-400" : "text-sky-600"} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">UPI Payment</h3>
                    <p className={`text-xl font-bold ${isDark ? "text-cyan-400" : "text-sky-600"} mt-0.5`}>₹299 <span className="text-[10px] text-gray-500 font-normal">one-time</span></p>
                  </div>
                </div>
                
                <p className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-4`}>
                  Scan the UPI QR code below inside GPay, PhonePe, Paytm, or any UPI app.
                </p>

                {/* QR Code Container */}
                <div className={`flex flex-col items-center justify-center p-4 rounded-lg border border-dashed ${isDark ? "bg-gray-955/40 border-gray-750" : "bg-gray-100 border-gray-300"}`}>
                  <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden relative p-1 shadow-md hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src="/images/nikupi.png" 
                      alt="UPI QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Click to Copy */}
                  <div className={`w-full mt-4 flex items-center justify-between gap-2 border rounded-full p-1 pl-3.5 ${
                    isDark ? "bg-gray-900/60 border-gray-700" : "bg-white border-gray-200"
                  }`}>
                    <span className="text-[11px] font-mono text-gray-400 truncate select-all">{upiId}</span>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1 px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
                        copied
                          ? "bg-emerald-500 text-white"
                          : isDark 
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {copied ? (
                        <>
                          <RiCheckLine size={12} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <RiFileCopyLine size={12} />
                          <span>Copy VPA</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* International Card / PayPal Option */}
              <div className={`p-5 rounded-lg border ${isDark ? "border-gray-700 bg-gray-900/40" : "border-gray-200 bg-white"} relative overflow-hidden transition-colors duration-300`}>
                <div className="absolute top-0 right-0 bg-purple-500 text-white font-bold text-[9px] px-3.5 py-1 rounded-bl-lg uppercase tracking-wider">
                  Global
                </div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`p-2 rounded-full ${isDark ? "bg-[#1f153a]" : "bg-purple-100"}`}>
                    <RiBankCardLine size={20} className={isDark ? "text-purple-400" : "text-purple-600"} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Cards / PayPal</h3>
                    <p className={`text-xl font-bold ${isDark ? "text-purple-400" : "text-purple-600"} mt-0.5`}>$9.99 <span className="text-[10px] text-gray-500 font-normal">one-time</span></p>
                  </div>
                </div>

                <p className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-4`}>
                  Pay securely using Stripe Checkout or your PayPal account.
                </p>

                <div className="space-y-2">
                  <a
                    href="https://checkout.stripe.com/pay/your_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 rounded-full transition duration-200 shadow-md hover:scale-[1.02] transform"
                  >
                    Stripe Checkout Link
                    <RiExternalLinkLine size={12} />
                  </a>
                  <a
                    href="https://paypal.me/your_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 w-full text-center font-bold text-xs py-2.5 rounded-full border transition duration-200 hover:scale-[1.02] transform ${
                      isDark
                        ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    PayPal Link
                    <RiExternalLinkLine size={12} />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Step 2 Card: Verification Form & Instructions */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-center lg:justify-start items-center mb-6">
              <h2 className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"} flex items-center gap-2 vercelgeist`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-500"} inline-block animate-pulse`}></span>
                Step 2: Verify & Activate
              </h2>
            </div>

            <div className={`flex-1 flex flex-col p-6 sm:p-8 rounded-lg border-2 border-dashed ${
              isDark
                ? "bg-gray-800 bg-opacity-50 border-gray-400"
                : "bg-gray-50 border-gray-300 shadow-lg"
            } transition-colors duration-300`}>
              
              <div className="text-center mb-6 flex flex-col items-center">
                <div className={`p-4 rounded-full ${isDark ? "bg-[#102546]" : "bg-sky-100"} mb-4 border ${isDark ? "border-cyan-500/20" : "border-sky-300/40"}`}>
                  <RiExternalLinkLine size={32} className={isDark ? "text-cyan-400" : "text-sky-600"} />
                </div>
                <h3 className="text-lg font-bold mb-2 vercelgeist">Launch Verification Form</h3>
                
                <p className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed max-w-sm mx-auto mb-5`}>
                  Submit your payment receipt details. Since this form requires file uploads (for purchase screenshots), Google requires opening it directly in a new browser window.
                </p>

                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 h-12 justify-center hover:scale-105 transition-transform rounded-full font-bold text-xs shadow-md tracking-wider cursor-pointer ${
                    isDark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  OPEN VERIFICATION FORM ↗
                </a>
              </div>

              {/* Delivery Timeline / Flow */}
              <div className={`p-4 rounded-lg border text-left mt-2 ${
                isDark ? "border-gray-700 bg-gray-900/40" : "border-gray-250 bg-white"
              } space-y-3.5`}>
                <h4 className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-cyan-400" : "text-sky-600"}`}>
                  Activation Timeline
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold flex-shrink-0">1</div>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-normal`}>
                      Submit the form with your transaction hash, screenshot, and email address.
                    </p>
                  </div>
                  
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold flex-shrink-0">2</div>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-normal`}>
                      We verify the payment manually. Upon confirmation (typically within <strong className={isDark ? "text-cyan-300" : "text-cyan-700"}>12 hours</strong>), we issue your license key.
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold flex-shrink-0">3</div>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-normal`}>
                      You will receive an **email containing your Lifetime License Key**.
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold flex-shrink-0">4</div>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-normal`}>
                      Paste the key inside the extension settings or mobile client's **License Key input** to instantly unlock all premium features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 mt-5 max-w-xs mx-auto p-3 rounded-lg bg-emerald-500/5 text-left border border-emerald-500/10">
                <RiShieldCheckLine size={16} className="text-emerald-500 flex-shrink-0" />
                <p className="text-[10px] text-gray-500 leading-normal">
                  Verification is secure. Cryptographic key signatures ensure your lifetime capacity is permanently bound.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Signature */}
        <div className="mt-20 border-t border-gray-800/10 dark:border-white/5 pt-10 text-center">
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Made With ❤️ by Nikhil Yadav
          </p>
        </div>

        {/* Bottom Floating Navigation */}
        <div
          className={`px-6 py-1 fixed bottom-4 right-1 transform -translate-x-1/5 z-50 
                    rounded-4xl border-[1px] ${
                      isDark
                        ? "border-[#d2c6ad46] backdrop-blur-[25px] bg-[#faf5ec1a]"
                        : "border-gray-300 backdrop-blur-[25px] bg-white/90"
                    } shadow-md transition-colors`}
        >
          {[
            {
              icon: RiTwitterXLine,
              link: "https://twitter.com/nikhil0148",
              hover: "hover:text-gray-500",
            },
            {
              icon: RiLinkedinFill,
              link: "https://www.linkedin.com/in/nikhil0148",
              hover: "hover:text-gray-400",
            },
            {
              icon: RiGithubLine,
              link: "https://github.com/nikhilydv0148",
              hover: "hover:text-gray-400",
            },
            {
              icon: RiHeart3Line,
              link: "https://nikhim.me/supportme",
              hover: "hover:text-pink-400",
            },
          ].map((item, idx) => (
            <a
              key={idx}
              className={`inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium ${
                isDark ? "text-white" : "text-gray-900"
              } ${item.hover} transition-colors`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <item.icon size="24px" />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Checkout;
