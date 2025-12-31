import { useRef, useState } from "react";
import React from "react";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* <audio ref={audioRef} src="/audio/roop.mp3" autoPlay  /> */}
      <audio ref={audioRef} src="/audio/roop.mp3"  />

      <button
        onClick={toggleMusic}
        style={{
          padding: "10px 20px",
          
         
          cursor: "pointer"
          
        }}
    
        className="rounded-full border border-white/10 bg-white/20 backdrop-blur-xl text-white px-4 py-2 hover:bg-white/30 transition-all duration-300 ease-in-out"
      >
        {isPlaying ? "Pause Music ⏸️" : "Play Music ▶️"}
      </button>
    </div>
  );
}

export default MusicPlayer;
