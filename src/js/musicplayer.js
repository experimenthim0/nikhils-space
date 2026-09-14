const username = "nikhil0148";
const apiKey = "a042420a2a8ef414bab9f59246b0af38";

export async function getSongImage(song, artist) {
  try {
    const query = encodeURIComponent(song + " " + artist);
    const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0]?.artworkUrl100?.replace('100x100bb', '300x300bb');
  } catch (error) {
    return null;
  }
}

export async function fetchRecentTrackData() {
  const fallback = {
    song: "Not Playing",
    artist: "Spotify / Last.fm",
    albumArt: "https://media.istockphoto.com/id/2204659981/vector/abstract-smooth-colorful-light-background.jpg?s=612x612&w=0&k=20&c=pFX2KiJlnQUD18dWm1zbKJMfjiqHV_ZRaSd-lPgDgx0=",
    isPlaying: false,
    url: `https://www.last.fm/user/${username}`,
    loaded: true,
  };

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const data = await res.json();
    const track = data?.recenttracks?.track?.[0];
    if (!track) return fallback;

    const song = track.name || "Unknown Track";
    const artist = track.artist?.["#text"] || "Unknown Artist";
    const isPlaying = Boolean(track["@attr"]?.nowplaying);
    const trackUrl = track.url || `https://www.last.fm/user/${username}`;

    let albumArt = track.image?.[2]?.["#text"] || track.image?.[1]?.["#text"];
    if (!albumArt || albumArt.trim() === "") {
      albumArt = await getSongImage(song, artist);
    }
    if (!albumArt) {
      albumArt = fallback.albumArt;
    }

    return {
      song,
      artist,
      albumArt,
      isPlaying,
      url: trackUrl,
      loaded: true,
    };
  } catch (error) {
    return fallback;
  }
}

export async function getRecentTrack() {
  const data = await fetchRecentTrackData();
  const trackEl = document.getElementById("track");
  const albumEl = document.getElementById("album");
  const playingEl = document.getElementById("playing");

  if (trackEl) {
    trackEl.innerText = `${data.song} - ${data.artist}`;
  }
  if (albumEl) {
    albumEl.src = data.albumArt;
    if (data.isPlaying) {
      albumEl.className = "animate-spin [animation-duration:4s] w-12 h-12 rounded-full border border-neutral-400 shadow-md object-cover";
    } else {
      albumEl.className = "w-12 h-12 rounded-full border border-neutral-400 shadow-md object-cover";
    }
  }
  if (playingEl) {
    playingEl.innerHTML = data.isPlaying
      ? `<p class="text-neutral-400">Now Listening <span class="text-emerald-500 font-mono">• Live</span></p>`
      : `<p class="text-neutral-400">Recently Played <span class="text-neutral-500 font-mono">• Offline</span></p>`;
  }
  return data;
}

export default getRecentTrack;