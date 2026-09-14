import React, { useState } from 'react';
import { RiSendPlane2Line, RiCheckLine, RiErrorWarningLine } from '@remixicon/react';

export default function ContactForm({ isDark }) {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setResult("Sending message...");
    const formData = new FormData(event.target);
    formData.append("access_key", "d6fed9d1-8a56-42f7-9069-f7910afcb11b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setResult("Message sent successfully! I'll get back to you soon.");
        event.target.reset();
      } else {
        setStatus("error");
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setResult("Failed to send message. Please reach out via email directly.");
    }
  };

  return (
    <div className="w-full">
      <div className={`border ${
        isDark 
          ? "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700" 
          : "border-neutral-200 bg-neutral-50/70 hover:border-neutral-300"
      } rounded-xl p-6 sm:p-7 editorial-transition`}>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              Direct Message
            </span>
          </div>
          <h3 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-950"}`}>
            Send a note
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Have a project in mind, an opportunity, or just want to chat? Drop a message below.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                required
                className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors duration-200 outline-none ${
                  isDark
                    ? "bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-500"
                    : "bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500"
                }`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@example.com"
                required
                className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors duration-200 outline-none ${
                  isDark
                    ? "bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-500"
                    : "bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500"
                }`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
              Phone / Contact handle (optional)
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="+91 98765 43210 or @handle"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors duration-200 outline-none ${
                isDark
                  ? "bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-500"
                  : "bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500"
              }`}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
              Message
            </label>
            <textarea
              rows="4"
              name="message"
              id="message"
              placeholder="What are you thinking or building?"
              required
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors duration-200 outline-none resize-none ${
                isDark
                  ? "bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-500"
                  : "bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500"
              }`}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 editorial-transition hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 ${
              isDark
                ? "bg-white text-neutral-950 hover:bg-neutral-200"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              <>
                <RiSendPlane2Line size={16} />
                Send Message
              </>
            )}
          </button>

          {result && (
            <div className={`mt-3 p-3 rounded-lg text-xs font-mono flex items-center gap-2 ${
              status === "success"
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : status === "error"
                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                : "text-neutral-400"
            }`}>
              {status === "success" && <RiCheckLine size={14} />}
              {status === "error" && <RiErrorWarningLine size={14} />}
              <span>{result}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}



