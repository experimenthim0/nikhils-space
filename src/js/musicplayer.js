const username = "nikhil0148";
const apiKey = "a042420a2a8ef414bab9f59246b0af38";


async function getSongImage(song, artist) {
  const query = encodeURIComponent(song + " " + artist);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results[0]?.artworkUrl100;
}


async function getRecentTrack() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  const res = await fetch(url);
  const data = await res.json();

  const track = data.recenttracks.track[0];

  const song = track.name 
const artist = track.artist["#text"]


  document.getElementById("track").innerText =
    song +` - `  + artist;

//   document.getElementById("artist").innerText =
//     track.artist["#text"];

// const img =track.image?.[2]?.["#text"] 


    // 
    
    const img = await getSongImage(song,artist) || "https://media.istockphoto.com/id/2204659981/vector/abstract-smooth-colorful-light-background.jpg?s=612x612&w=0&k=20&c=pFX2KiJlnQUD18dWm1zbKJMfjiqHV_ZRaSd-lPgDgx0="

document.getElementById("album").src = img;



    if (track["@attr"]?.nowplaying) {
  document.getElementById("playing").innerHTML =
    `<p class="text-gray-400">Now Listening  <span class="text-green-600">• Online <span>  </p>`
}

}

export default getRecentTrack