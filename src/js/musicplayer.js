const username = "nikhil0148";
const apiKey = "a042420a2a8ef414bab9f59246b0af38";


async function getSongImage(song, artist) {
  try{
  const query = encodeURIComponent(song + " " + artist);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;

  const res = await fetch(url);
 
  const data = await res.json();

  return data.results[0]?.artworkUrl100;
  } catch(error){
    const defaultImage = "https://media.istockphoto.com/id/2204659981/vector/abstract-smooth-colorful-light-background.jpg?s=612x612&w=0&k=20&c=pFX2KiJlnQUD18dWm1zbKJMfjiqHV_ZRaSd-lPgDgx0="
    return defaultImage ;
  }
}


async function getRecentTrack() {
  try{
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  const res = await fetch(url);
  const data = await res.json();

   if (!res.ok) {
    return document.getElementById("track").innerText = "Network Error";
  }

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
      document.getElementById("album").classList="animate-spin [animation-duration:3s] w-13 h-13 rounded-full border-2 border-gray-400 shadow-md"
  document.getElementById("playing").innerHTML =
    `<p class="text-gray-400">Now Listening  <span class="text-green-600">• Online <span>  </p>`
}
  }  catch(error){
    document.getElementById("track").innerText = "Request Blocked by your Internet Provider/ Institute Network"
    document.getElementById("track").className="text-[14px] text-gray-400 w-50 text-wrap"
     const img = "https://media.istockphoto.com/id/2204659981/vector/abstract-smooth-colorful-light-background.jpg?s=612x612&w=0&k=20&c=pFX2KiJlnQUD18dWm1zbKJMfjiqHV_ZRaSd-lPgDgx0="

document.getElementById("album").src = img;
  }

}

export default getRecentTrack