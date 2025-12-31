import { useState, useEffect } from "react";
import { Route, Routes, Router, Link } from "react-router-dom";
import "../App.css";

import React from "react";
import translations from "../js/translation.js";
import { RiLinkedinFill, RiTwitterXLine, RiGithubLine, RiP2pLine, RiMailLine, RiMapPin2Line, RiDiscordLine, RiEarthLine, RiChatSmile2Line } from "@remixicon/react";

function Home() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.title = `Nikhil Yadav`;
  }, []);

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const [isChecked, setIsChecked] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setLanguage(isChecked ? "en" : "rj");
  };

  const t = translations[language];

  const project=[
    {name:"Ai&Code Way",
        link:"https://aiandcodeway.netlify.app/",
        description:"A platform to explore AI tools and coding resources.",
        imgsrc:"/images/aincode.png"
    }
  ]

  return (
    <div className="min-h-screen bg-[#000000e9] w-full overflow-x-hidden">
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-3 py-2 rounded shadow-lg z-50 flex items-center justify-between w-90 sm:w-190 max-w-md">
          Hi! You can Switch Language between English and Rajasthani using the EN & RJ button at the top.
          <button
            className="ml-4 text-white font-bold"
            onClick={() => setShowAlert(false)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="w-full bg-[#000000e9] myfont">
        <div className="flex justify-center w-full pt-5 text-white">
          <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-black p-1">
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />

            {/* English */}
            <span
              className={`flex items-center rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? "text-primary bg-[#a7a7a7d0]" : "text-body-color"}`}
            >
              EN
            </span>

            {/* Rajasthani */}
            <span
              className={`flex items-center rounded py-2 px-[18px] text-sm font-medium ${isChecked ? "text-primary bg-[#727272db]" : "text-body-color"}`}
            >
              RJ
            </span>
          </label>
        </div>

        <div className="text-3xl font-bold text-center min-h-screen flex justify-center items-center flex-col text-white">
          <div className="mx-5">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-5">
              {t.welcome}, I'm{" "}
              <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#a8c6fd] via-[#789cf9] to-[#2065f9] bg-[200%_auto] bg-clip-text text-transparent footerBig">
                Nikhil Yadav
              </span>
              . I build ideas, code, and real-world solutions
            </h3>
          </div>
          <div className="w-45 h-15 text-white relative inline-block overflow-hidden rounded-full p-[2px] mt-10">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#2563EB_50%,#FFFFFF_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-3 py-1 text-2xl font-semibold text-gray-50 backdrop-blur-3xl hover:bg-gray-700">
              <a href="https://www.linkedin.com/in/nikhil0148" target="_blank" className="flex gap-1 text-[20px] items-center hover:bg-gray-700">
                Let's Connect
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-[#000000e9]">
          <h2 className="font-bold text-3xl text-white text-center mb-5">
            {t.aboutText}
            <span className="max-w-14 h-0.5 bg-white z-20 absolute left-0 right-0 mx-auto mt-1/2 block"></span>
          </h2>
        </div>

        <div className="flex justify-center items-center text-white flex-col sm:flex-row gap-15">
          <div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] shadow-white/53 bg-black bg-opacity-50 rounded-full">
            <img
              src="/images/nikhil-1.jpg"
              alt="are yaar tu kha chla gya"
              className="w-94 h-94 object-cover rounded-full transition-all duration-200 ease hover:w-100 hover:h-100"
            />
          </div>
          <div className="mt-5 text-center max-w-xl">
            <p className="font-LostTumbler text-lg sm:text-xl md:text-2xl lg:text-2xl text-white text-justify mx-5">
              {t.about}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <h2 className="font-bold text-3xl text-white text-center my-15">
            Projects
            <br />
            <span className="max-w-17 h-0.5 bg-white z-20 absolute left-0 right-0 mx-auto mt-1 block"></span>
            <p className="text-[14px] text-gray-400 mt-3">({t.process})</p>
          </h2>
</div>
        <div className="flex justify-center items-center gap-10 flex-wrap mb-10">
          {project.map((proj, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 m-4 shadow-lg w-80 hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <img src={proj.imgsrc} alt={proj.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{proj.name}</h3>
              <p className="text-gray-300 mb-4">{proj.description}</p>
              <a href={proj.link} target="_blank" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full  hover:bg-blue-700 transition-colors duration-300 ease-in-out">
                See More
              </a>
            </div>
          ))}
        
        </div>

        <div className="flex justify-center items-center">
          <h2 className="font-bold text-3xl text-white text-center mb-5">
            Skills
            <span className="max-w-11 h-0.5 bg-white z-20 absolute left-0 right-0 mx-auto mt-1/2 block"></span>
          </h2>
        </div>

        <div className="flex justify-center items-center gap-5 flex-wrap mb-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/html-5-svgrepo-com.svg"
                alt="html"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">HTML</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/css-3-svgrepo-com.svg"
                alt="css"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">CSS</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/tailwind-svgrepo-com.svg"
                alt="tailwind"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">Tailwind</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/js-svgrepo-com.svg"
                alt="js"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">JS</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/react-svgrepo-com.svg"
                alt="react"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">React</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/node-js-svgrepo-com.svg"
                alt="node"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">NodeJs</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/express-svgrepo-com.svg"
                alt="express"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">ExpressJs</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/mongo-svgrepo-com.svg"
                alt="mongo"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">MongoDB</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="p-3 bg-skill rounded-full">
              <img
                src="/images/python-svgrepo-com.svg"
                alt="python"
                className="w-16 h-16"
              />
            </div>
            <span className="text-white text-center font-bold">Python</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <h2 className="font-bold text-3xl text-white text-center mb-5">
            {t.contact}
            <span className="max-w-14 h-0.5 bg-white z-20 absolute left-0 right-0 mx-auto mt-1/2 block"></span>
            <p className="text-[18px] text-gray-400 mt-2">
              {t.contacttext}
            </p>
          </h2>
        </div>

        <div className="w-full flex justify-center items-center flex-col text-white mt-2 gap-2 mb-10">
          <div className="inline-flex px-8 h-10 gap-1 items-center justify-center bg-white text-black py-1.5 rounded-full text-[18px] font-medium hover:text-black-500 hover:bg-gray-100/80 cursor-pointer" onClick={() => window.open('https://duochatapp.netlify.app/', '_blank')}>
            <RiChatSmile2Line size={20} />
            <p>ChatWithMe</p>
          </div>
          <p className="text-gray-400 text-[14px]">Time : 12:00 PM - 8:00 PM</p>
        </div>

        <div className="flex justify-center items-center gap-5 flex-wrap">
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 hover:text-blue-500 hover:bg-blue-800/80"
            href="https://www.linkedin.com/in/nikhil0148" target="_blank"
          >
            <RiLinkedinFill size="14px" />
            LinkedIn
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 hover:text-blue-500 hover:bg-blue-800/80"
            href="https://twitter.com/nikhil0148" target="_blank"
          >
            <RiTwitterXLine size="14px" />
            Twitter(X)
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 hover:text-blue-500 hover:bg-blue-800/80"
            href="https://github.com/nikhilydv0148" target="_blank"
          >
            <RiGithubLine size="14px" />
            GitHub
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 hover:text-blue-500 hover:bg-blue-800/80"
            href="https://peerlist.io/nikhil0148" target="_blank"
          >
            <RiP2pLine size="14px" />
            Peerlist
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 hover:text-blue-500 hover:bg-blue-800/80"
            href="https://discord.gg/WKejKbMJ" target="_blank"
          >
            <RiDiscordLine size="14px" />
            Discord
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 hover:text-blue-500 hover:bg-blue-800/80"
            href="mailto:contact.nikhim@gmail.com" target="_blank"
          >
            <RiMailLine size="14px" />
            Email
          </a>
        </div>

        <div className="w-full flex justify-center items-center text-white mt-2 gap-2 mb-4">
          <RiMapPin2Line size={18} />
          <p>Chomu, Jaipur, Rajasthan.</p>
            </div>

        <div className="relative w-full h-auto  overflow-hidden bg-[#000000e9]">
          <p className=" -mb-5 sm:-mb-20 text-[13vw] -ml-10 font-extrabold footerBig text-white whitespace-nowrap tracking-widest uppercase select-none text-center  ">
            Nikhil Yadav
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;