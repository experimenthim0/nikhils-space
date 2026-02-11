import { useState, useEffect } from "react";
import { Route, Routes, Router, Link } from "react-router-dom";
import "../App.css";

import ContactForm from "./Contact.jsx";
import { GitHubCalendar } from "react-github-calendar";
import { neko } from "onekojs";

import React from "react";
import translations from "../js/translation.js";
import {
  RiLinkedinFill,
  RiTwitterXLine,
  RiGithubLine,
  RiP2pLine,
  RiMailLine,
  RiMapPin2Line,
  RiDiscordLine,
  RiEarthLine,
  RiChatSmile2Line,
  RiHeart2Fill,
  RiHeart3Line,
  RiSunLine,
  RiMoonLine,
} from "@remixicon/react";
import getRecentTrack from "../js/musicplayer.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function NewHome() {
  const [showAlert, setShowAlert] = useState(false);
  const [isDark, setIsDark] = useState(false); 

  useEffect(() => {
    document.title = `Nikhil Yadav`;
  }, []);

  useEffect(() => {
    getRecentTrack();
    setInterval(getRecentTrack, 10000);
  });

  useEffect(() => {
    neko();
  }, []);

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [isChecked, setIsChecked] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setLanguage(isChecked ? "en" : "rj");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const t = translations[language];

  const project = [
    {
      name: "Ai&Code Way",
      link: "https://aiandcodeway.netlify.app/",
      description: "A platform to explore AI tools and coding resources.",
      imgsrc: "/images/aincode.png",
    },
    {
      name: "LifeDay Dots",
      link: "https://chromewebstore.google.com/detail/lifeday-dots/dmpongfigiibmadlbibagpopfomoeoee",
      description:
        "A minimal Chrome extension that shows time passing through daily dots, reminding you that every day counts.",
      imgsrc: "/images/lifedaydots.png",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} w-full overflow-x-hidden relative scroll-smooth myfont transition-colors duration-300`}
    >
      {/* Theme Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full ${
            isDark
              ? "bg-gray-800 border border-gray-700 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200"
          } transition-all duration-300 shadow-lg`}
          aria-label="Toggle theme"
        >
          {isDark ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
        </button>
      </div>

      <div
        className={`text-3xl font-bold text-center min-h-screen flex justify-center items-center flex-col ${isDark ? "text-white" : "text-gray-900"}`}
      >
        <div className="mx-5">
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-5">
            {t.welcome}, I'm{" "}
            <span
              className={`inline-flex bg-sky-400 px-2 py-1 vercelgeist ${isDark ? "text-white" : "text-white"}`}
            >
              Nikhil Yadav
            </span>
            . I write code, build ideas and real-world solutions.
          </h3>
        </div>
        <div
          className={`w-48 h-15 ${isDark ? "text-white" : "text-gray-900"} relative inline-block overflow-hidden rounded-full p-[2px] mt-10`}
        >
          <div
            className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full ${
              isDark
                ? "bg-gray-900 border-[1px] border-white hover:bg-gray-700"
                : "bg-gray-100 border-[1px] border-gray-900 hover:bg-gray-200"
            } px-3 py-1 text-2xl font-semibold backdrop-blur-3xl transition-colors`}
          >
            <a
              href="https://www.linkedin.com/in/nikhil0148"
              target="_blank"
              className="flex gap-1 text-[20px] items-center"
            >
              Let's Connect ↗
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <h2
          className={`font-bold text-3xl ${isDark ? "text-white" : "text-gray-900"} text-center mb-5`}
        >
          {t.aboutText}
          <span
            className={`max-w-14 h-0.5 ${isDark ? "bg-white" : "bg-gray-900"} z-20 absolute left-0 right-0 mx-auto mt-1/2 block`}
          ></span>
        </h2>
      </div>

      <div
        className={`flex justify-center items-center ${isDark ? "text-white" : "text-gray-900"} flex-col sm:flex-row gap-15`}
      >
        <div
          className={`${isDark ? "bg-bottom-white" : "bg-bottom-gray-100"} bg-opacity-50`}
        >
          {/* <img
            src="/images/nikhil-1.jpg"
            alt="are yaar tu kha chla gya"
            className="w-94 h-94 object-cover rounded-full"
          /> */}
          {isDark ? (
            <img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
          ) : (
            <img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
          )}
        </div>
        <div className="mt-5 text-center max-w-xl">
          <p
            className={`font-LostTumbler text-lg sm:text-xl md:text-2xl lg:text-2xl ${isDark ? "text-white" : "text-gray-800"} text-justify mx-5`}
          >
            {t.about}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <h2
          className={`font-bold text-3xl ${isDark ? "text-white" : "text-gray-900"} text-center my-15`}
        >
          Projects
          <br />
          <span
            className={`max-w-17 h-0.5 ${isDark ? "bg-white" : "bg-gray-900"} z-20 absolute left-0 right-0 mx-auto mt-1 block`}
          ></span>
          <p
            className={`text-[14px] ${isDark ? "text-gray-400" : "text-gray-600"} mt-3`}
          >
            ({t.process})
          </p>
        </h2>
      </div>

      <div className="flex justify-center items-center gap-10 flex-wrap mb-10">
        {project.map((proj, index) => (
          <div
            key={index}
            className={`${
              isDark
                ? "bg-gray-800 bg-opacity-50 border-gray-400"
                : "bg-gray-50 border-gray-300"
            } border-2 border-dashed rounded-lg p-6 m-4 shadow-lg w-80 hover:scale-105 transform transition-transform duration-300 ease-in-out`}
          >
            <img
              src={proj.imgsrc}
              alt={proj.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3
              className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {proj.name}
            </h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>
              {proj.description}
            </p>
            <a
              href={proj.link}
              target="_blank"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            >
              View Live
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <h2
          className={`font-bold text-3xl ${isDark ? "text-white" : "text-gray-900"} text-center mb-5`}
        >
          Skills
          <span
            className={`max-w-11 h-0.5 ${isDark ? "bg-white" : "bg-gray-900"} z-20 absolute left-0 right-0 mx-auto mt-1/2 block`}
          ></span>
        </h2>
      </div>

      <div className="flex justify-center items-center gap-5 flex-wrap mb-10">
        {[
          "html-5-svgrepo-com.svg",
          "css-3-svgrepo-com.svg",
          "tailwind-svgrepo-com.svg",
          "js-svgrepo-com.svg",
          "react-svgrepo-com.svg",
          "node-js-svgrepo-com.svg",
          "express-js.webp",
          "mongo-svgrepo-com.svg",
          "python-svgrepo-com.svg",
        ].map((img, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center gap-2"
          >
            <div
              className={`p-3 ${isDark ? "bg-skill" : "bg-gray-100 shadow-md"} rounded-full`}
            >
              <img
                src={`/images/${img}`}
                alt={img.split("-")[0]}
                className="w-16 h-16"
              />
            </div>
            <span
              className={`${isDark ? "text-white" : "text-gray-900"} text-center font-bold`}
            >
              {
                [
                  "HTML",
                  "CSS",
                  "Tailwind",
                  "JS",
                  "React",
                  "NodeJs",
                  "ExpressJs",
                  "MongoDB",
                  "Python",
                ][idx]
              }
            </span>
          </div>
        ))}
      </div>

      <div
        className={`flex flex-col items-center py-10 px-4 ${isDark ? "bg-black" : "bg-white"}`}
      >
        <div className="flex flex-col items-center w-full max-w-7xl">
          <div
            className={`${isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 border border-gray-200"} p-4 rounded shadow-lg w-full overflow-x-auto flex justify-center`}
          >
            <GitHubCalendar
              username="experimenthim0"
              blockSize={window.innerWidth < 768 ? 4.5 : 12}
              blockMargin={window.innerWidth < 768 ? 2 : 4}
              fontSize={window.innerWidth < 768 ? 10 : 14}
              colorScheme={isDark ? "dark" : "light"}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-md flex justify-center items-center py-10">
        <div className="h-8 w-20 bg-sky-500 z-20 absolute top-6 right-18 rotate-45">
          <p className="text-white text-2xl font-semibold text-center flex items-center justify-center">
            Now
          </p>
        </div>
        <h2
          className={`font-bold text-3xl ${isDark ? "text-white" : "text-gray-900"} text-center mb-5`}
        >
          {t.contact}
          <span
            className={`max-w-14 h-0.5 ${isDark ? "bg-white" : "bg-gray-900"} z-20 absolute left-0 right-0 mx-auto mt-1/2 block`}
          ></span>
          <p
            className={`text-[18px] ${isDark ? "text-gray-400" : "text-gray-600"} mt-2 px-4`}
          >
            {t.contacttext}
          </p>
        </h2>
      </div>

      <div
        className={`w-full flex justify-center items-center flex-col ${isDark ? "text-white" : "text-gray-900"} mt-2 gap-2 mb-10`}
      >
        <div
          className={`inline-flex px-8 h-10 gap-1 items-center justify-center ${
            isDark
              ? "bg-white text-black hover:bg-gray-100/80"
              : "bg-gray-900 text-white hover:bg-gray-800"
          } py-1.5 rounded-full text-[18px] font-medium cursor-pointer transition-colors`}
          onClick={() =>
            window.open("https://duochatapp.netlify.app/", "_blank")
          }
        >
          <RiChatSmile2Line size={20} />
          <p>ChatWithMe</p>
        </div>
        <p
          className={`${isDark ? "text-gray-400" : "text-gray-600"} text-[14px]`}
        >
          Time : 12:00 PM - 8:00 PM
        </p>
      </div>

      <div className="flex justify-center items-center gap-5 flex-wrap">
        {[
          {
            icon: RiLinkedinFill,
            text: "LinkedIn",
            link: "https://www.linkedin.com/in/nikhil0148",
          },
          {
            icon: RiTwitterXLine,
            text: "Twitter(X)",
            link: "https://twitter.com/nikhil0148",
          },
          {
            icon: RiGithubLine,
            text: "GitHub",
            link: "https://github.com/nikhilydv0148",
          },
          {
            icon: RiP2pLine,
            text: "Peerlist",
            link: "https://peerlist.io/nikhil0148",
          },
          {
            icon: RiDiscordLine,
            text: "Discord",
            link: "https://discord.gg/WKejKbMJ",
          },
          {
            icon: RiMailLine,
            text: "Email",
            link: "mailto:contact.nikhim@gmail.com",
          },
        ].map((item, idx) => (
          <a
            key={idx}
            className={`inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium ${
              isDark
                ? "bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white hover:bg-[#faf5ec33]"
                : "bg-gray-100 backdrop-blur-[24px] border border-gray-300 text-gray-900 hover:bg-gray-200"
            } transition-colors`}
            href={item.link}
            target="_blank"
          >
            <item.icon size="14px" />
            {item.text}
          </a>
        ))}
      </div>

      <ContactForm isDark={isDark} />

      <div className="flex items-center my-10 myfont">
        <div
          className={`relative max-w-md mx-auto border-dashed border-[1.5px] ${
            isDark ? "border-gray-400" : "border-gray-400"
          } m-8 pt-4 px-6 rounded-lg ${
            isDark
              ? "bg-gradient-to-r from-gray-850 to-gray-950"
              : "bg-gradient-to-r from-gray-50 to-gray-100"
          } shadow-lg my-10`}
        >
          <p
            className={`text-center text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-3 tracking-wide`}
          >
            Music Space
          </p>
          <span
            className={`max-w-[20rem] border-t-2 border-dotted ${isDark ? "border-gray-400" : "border-gray-400"} z-20 absolute left-0 right-0 mx-auto -mt-0.5 block`}
          ></span>
          <div className="flex justify-center items-center flex-row gap-2 px-2 pt-4 mb-5">
            <img
              id="album"
              alt="Album Cover"
              className="w-13 h-13 rounded-full border-2 border-gray-400 shadow-md"
            />
            <div className="">
              <p
                id="track"
                className={`font-semibold text-[17px] truncate w-50 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Loading...
              </p>
              <p id="artist"></p>
              <p
                className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"} tracking-wide`}
                id="playing"
              >
                Nikhim Music <span className="text-red-700"> • Offline </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative py-30 overflow-hidden border-t ${isDark ? "border-white/5" : "border-gray-200"}`}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h3
              className={`text-8xl md:text-9xl lg:text-[12rem] font-bold vercelgeist ${
                isDark ? "text-gray-400" : "text-gray-400"
              } uppercase leading-none tracking-tighter select-none`}
            >
              Nikhil Yadav
            </h3>
          </div>
        </div>
        <p
          className={` p-20 text-center ${isDark ? "text-white" : "text-gray-600"}`}
        >
          Made With ❤️ By Nikhil Yadav
        </p>
      </div>

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
          >
            <item.icon size="24px" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default NewHome;
