import { useState, useEffect } from "react";
import { Route, Routes, Router, Link } from "react-router-dom";
import "../App.css";

import ContactForm from "./Contact.jsx"
// import { Neko } from 'neko-ts';
import { GitHubCalendar } from 'react-github-calendar';



import { neko } from 'onekojs';



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
} from "@remixicon/react";
import getRecentTrack from "../js/musicplayer.js";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Home() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.title = `Nikhil Yadav`;
  }, []);

  useEffect(() => {
    getRecentTrack();
    setInterval(getRecentTrack, 10000);
  });


useEffect(()=>{
  neko()
},[])

//  useEffect(() => {
//   const neko = new Neko({
//     speed: 10, // Increase this number to make the cat faster
//     offset: { x: 0, y: 0 }, // Optional: offset from the cursor
//     origin: { x: 100, y: 100 }, // Initial starting position
//   });

//   return () => {
//     // If the library uses destroy, use it; 
//     // otherwise, you may need to manually remove the element if it persists.
//     if (neko.destroy) {
//       neko.destroy();
//     } else {
//       document.getElementById("oneko")?.remove();
//     }
//   };
// }, []);

// useEffect(() => {
//   const neko = new Neko({
//     speed: 10, // Keep this at default so animation frames trigger
//   });

//   // Manually slow down the movement by forcing a CSS transition
//   const nekoEl = document.getElementById('oneko');
//   if (nekoEl) {
//     nekoEl.style.transition = "top 0.5s ease-out, left 0.5s ease-out";
//   }

//   return () => neko.destroy();
// }, []);

  


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
      description: "A minimal Chrome extension that shows time passing through daily dots, reminding you that every day counts.",
      imgsrc: "/images/lifedaydots.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden relative scroll-smooth myfont">


 

      {/* {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-3 py-2 rounded shadow-lg z-50 flex items-center justify-between w-90 sm:w-190 max-w-md">
          Hi! You can Switch Language between English and Rajasthani using the
          EN & RJ button at the top.
          <button
            className="ml-4 text-white font-bold"
            onClick={() => setShowAlert(false)}
          >
            &times;
          </button>
        </div>
      )} 

      {/* <div className="w-full bg-neutral-900 myfont">
        <div className="flex justify-center w-full pt-5 text-white">
          <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-black p-1">
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />

           
            <span
              className={`flex items-center rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? "text-primary border-[1px] border-gray-400 bg-gradient-to-r from-gray-850 to-gray-950 shadow-lg" : "text-body-color"}`}
            >
              EN
            </span>

           
            <span
              className={`flex items-center rounded py-2 px-[18px] text-sm font-medium ${isChecked ? "text-primary border-[1px] border-gray-400 bg-gradient-to-r from-gray-850 to-gray-950 shadow-lg" : "text-body-color"}`}
            >
              RJ
            </span>
          </label>
        </div> */}
{/* <div className="px-6*51 py-2 fixed top-6 left-1/4 transform -translate-x-1 z-50 
                rounded-4xl border-[1px] border-[#b5a98f26]
                backdrop-blur-[25px] bg-[#faf5ec1a] shadow-md">
 <p className="text-white px-10 font-poppins font-semibold text-2xl tracking-wide">
  Nikhil Yadav
</p>

</div> */}


        <div className="text-3xl font-bold text-center min-h-screen flex justify-center items-center flex-col text-white">
          <div className="mx-5">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-5">
              {t.welcome}, I'm{" "}
              <span className="inline-flex  bg-sky-400 px-2 py-1 vercelgeist">
                Nikhil Yadav
              </span>
              . I write code, build ideas and real-world solutions.
            </h3>
          </div>
          <div className="w-48 h-15 text-white relative inline-block overflow-hidden rounded-full p-[2px] mt-10">
           
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 border-[1px] border-white px-3 py-1 text-2xl font-semibold text-gray-50 backdrop-blur-3xl hover:bg-gray-700">
              <a
                href="https://www.linkedin.com/in/nikhil0148"
                target="_blank"
                className="flex gap-1 text-[20px] items-center hover:bg-gray-700"
              >
                Let's Connect ↗ 
                
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <h2 className="font-bold text-3xl text-white text-center mb-5">
            {t.aboutText}
            <span className="max-w-14 h-0.5 bg-white z-20 absolute left-0 right-0 mx-auto mt-1/2 block"></span>
          </h2>
        </div>

        <div className="flex justify-center items-center text-white flex-col sm:flex-row gap-15">
          <div className="  bg-black bg-opacity-50 rounded-full">
            <img
              src="/images/nikhil-1.jpg"
              alt="are yaar tu kha chla gya"
              className="w-94 h-94 object-cover rounded-full"
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
            <div
              key={index}
              className="bg-gray-800 bg-opacity-50 border-2 border-dashed border-gray-400 rounded-lg p-6 m-4 shadow-lg w-80 hover:scale-105 transform transition-transform duration-300 ease-in-out"
            >
              <img
                src={proj.imgsrc}
                alt={proj.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">
                {proj.name}
              </h3>
              <p className="text-gray-300 mb-4">{proj.description}</p>
              <a
                href={proj.link}
                target="_blank"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full  hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              >
                View Live
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
                src="/images/express-js.webp"
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


<div className="flex flex-col items-center py-10  bg-black">
  {/* Experiments Section */}
   <div className="flex flex-col items-center mx-2">
    {/* <p className="text-3xl font-semibold text-white mb-4">Experiment</p> */}
    <div className="bg-gray-900  p-2 rounded shadow-lg text-gray-300">
      <GitHubCalendar username="experimenthim0" blockSize={window.innerWidth < 768 ? 5 : 12} 
                blockMargin={window.innerWidth < 768 ? 3 : 4}
                fontSize={window.innerWidth < 768 ? 10 : 14}
                
                />
    </div>
  </div>

  {/* Personal Section */}
  {/* <div className="flex flex-col items-center mx-2">
    <p className="text-3xl font-semibold text-white mb-4">Personal</p>
    <div className="bg-gray-900  p-2 rounded shadow-lg text-gray-300">
      <GitHubCalendar username="nikhilydv0148" blockSize={window.innerWidth < 768 ? 5 : 12} 
                blockMargin={window.innerWidth < 768 ? 3 : 4}
                fontSize={window.innerWidth < 768 ? 10 : 14}
                
                />
    </div>
  </div> */}
</div>



       
          

       

         

         
      

        <div className=" relative mx-auto max-w-md flex justify-center items-center py-10">
          <div className="h-8 w-20 bg-sky-500 z-20 absolute top-6 right-18 rotate-45"><p className="text-white text-2xl font-semibold text-center flex items-center justify-center ">Now</p></div>
          <h2 className="font-bold text-3xl text-white text-center mb-5">
            {t.contact}
            <span className="max-w-14 h-0.5 bg-white z-20 absolute left-0 right-0 mx-auto mt-1/2 block"></span>
            <p className="text-[18px] text-gray-400 mt-2 px-4">{t.contacttext}</p>
          </h2>
        </div>

        <div className="w-full flex justify-center items-center flex-col text-white mt-2 gap-2 mb-10">
          <div
            className="inline-flex px-8 h-10 gap-1 items-center justify-center bg-white text-black py-1.5 rounded-full text-[18px] font-medium hover:text-black-500 hover:bg-gray-100/80 cursor-pointer"
            onClick={() =>
              window.open("https://duochatapp.netlify.app/", "_blank")
            }
          >
            <RiChatSmile2Line size={20} />
            <p>ChatWithMe</p>
          </div>
          <p className="text-gray-400 text-[14px]">Time : 12:00 PM - 8:00 PM</p>
        </div>

        <div className="flex justify-center items-center gap-5 flex-wrap">
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white"
            href="https://www.linkedin.com/in/nikhil0148"
            target="_blank"
          >
            <RiLinkedinFill size="14px" />
            LinkedIn
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white"
            href="https://twitter.com/nikhil0148"
            target="_blank"
          >
            <RiTwitterXLine size="14px" />
            Twitter(X)
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white"
            href="https://github.com/nikhilydv0148"
            target="_blank"
          >
            <RiGithubLine size="14px" />
            GitHub
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white"
            href="https://peerlist.io/nikhil0148"
            target="_blank"
          >
            <RiP2pLine size="14px" />
            Peerlist
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white"
            href="https://discord.gg/WKejKbMJ"
            target="_blank"
          >
            <RiDiscordLine size="14px" />
            Discord
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium bg-[#faf5ec23] backdrop-blur-[24px] border border-[#d2c6ad46] text-white"
            href="mailto:contact.nikhim@gmail.com"
            target="_blank"
          >
            <RiMailLine size="14px" />
            Email
          </a>
        </div>

       



         <ContactForm/>




        <div className="flex items-center my-10 myfont">
        <div className="relative max-w-md mx-auto border-dashed border-[1.5px] border-gray-300 m-8 pt-4 px-6 rounded-lg bg-gradient-to-r from-gray-850 to-gray-950 shadow-lg  my-10">
          {/* <div className="h-20 w-8 bg-amber-300 z-20 absolute left-0 right-1/2 mx-10   -mt-12 rotate-45 block"></div> */}
          {/* <div className="h-8 w-20 bg-blue-500 z-20 absolute -top-1 -left-7 -rotate-45"><p className="text-white text-2xl font-semibold text-center flex items-center justify-center ">NIK</p></div> */}

 
  {/* <div className="h-8 w-20 bg-blue-500 z-20 absolute -top-1 -right-7 rotate-45 "><p className="text-white text-2xl font-semibold text-center flex items-center justify-center ">HIM</p></div> */}

  
  {/* <div className="h-20 w-8 bg-amber-300 z-20 absolute -bottom-9 -left-2 -rotate-45"></div>

  
  <div className="h-20 w-8 bg-amber-300 z-20 absolute -bottom-9 -right-2 rotate-45"></div> */}


          <p className="text-center text-xl font-bold text-white mb-3 tracking-wide ">Music Space </p>
          <span className="max-w-[20rem] border-t-2 border-dotted border-gray-300 z-20 absolute left-0 right-0 mx-auto -mt-0.5 block"></span>
        <div class=" flex justify-center items-center flex-row gap-2 px-2 pt-4 mb-5 ">
          <img
            id="album"
            
            alt="Album Cover"
            class="w-13 h-13  rounded-full border-2 border-gray-400 shadow-md"
          />
          <div class="">
            <p id="track" class="font-semibold text-[17px] truncate w-50 text-white">
              Loading...
            </p>
            <p id="artist"></p>
            <p class="text-xs font-semibold text-gray-400 tracking-wide" id="playing">

              Nikhim Music <span className="text-red-700"> • Offline </span>
            </p>
          </div>
        </div>
     
        </div>
        </div>
       



       

        <div className="relative py-30 overflow-hidden border-t border-white/5 ">
  {/* Background Pattern */}
  {/* <div 
    className="absolute inset-0 h-full w-full opacity-30"
    style={{
      backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
      backgroundSize: '16px 16px'
    }}
  ></div> */}

  {/* Content Container */}
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="text-center">
      <h3 className="text-8xl md:text-9xl lg:text-[12rem]  font-bold vercelgeist text-white/60 uppercase leading-none tracking-tighter select-none">
        Nikhil Yadav
      </h3>
    </div>
  </div>
</div>
    
    <div className="px-6 py-1 fixed bottom-4 right-1 transform -translate-x-1/5 z-50 
                rounded-4xl border-[1px] border-[#d2c6ad46]
                backdrop-blur-[25px] bg-[#faf5ec1a] shadow-md">
  
<a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium lue-800 text-white hover:text-gray-500 "
            href="https://twitter.com/nikhil0148"
            target="_blank"
          >
            <RiTwitterXLine size="24px" />
           
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium lue-800 text-white hover:text-gray-400"
            href="https://www.linkedin.com/in/nikhil0148"
            target="_blank"
          >
             <RiLinkedinFill size="24px" />
           
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium lue-800 text-white hover:text-gray-400"
            href="https://github.com/nikhilydv0148"
            target="_blank"
          >
             
           
            <RiGithubLine size="24px"/>
          </a>
          <a
            className="inline-flex items-center gap-x-1.5 py-2.5 px-5 rounded-full text-xs font-medium lue-800 text-white hover:text-pink-400"
            href="https://nikhim.me/supportme"
            target="_blank"
          >
             
           
            <RiHeart3Line size="24px"/>
          </a>
            
</div>
      </div>
    
  );
}

export default Home;
