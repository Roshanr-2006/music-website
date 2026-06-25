/* ============================================================
   DATA.JS — SoundWave Music Website

   Single source of truth for all music & artist data.
   Both music.html and artist.html read from these arrays.
   In a real app this data would come from a backend API.
   ============================================================ */

const ARTISTS = [
  {
    id: "alex-rivers",
    name: "Alex Rivers",
    genre: "Electronic Pop",
    photo: "https://picsum.photos/seed/alexrivers/400/400",
    coverArt: "https://picsum.photos/seed/alexcover/800/350",
    bio: "Alex Rivers is a pioneering electronic pop artist from Los Angeles who blends pulsating synth beats with catchy pop melodies. With over 8 million monthly listeners, Alex has carved out a unique sound that bridges underground electronic music and mainstream pop. His debut album 'Neon City' spent 12 weeks on the Billboard charts and earned him two Grammy nominations.",
    phone: "9876543210",
    email: "alex.rivers@soundwave.com",
    location: "Los Angeles, USA",
    followers: "2.4M",
    monthlyListeners: "8.5M",
    yearsActive: "2018 – Present",
    awards: "2× Grammy Nominee, Billboard Top 10",
    social: { instagram: "#", twitter: "#", youtube: "#", spotify: "#", facebook: "#" },
    songIds: [1, 2]
  },
  {
    id: "maya-chen",
    name: "Maya Chen",
    genre: "R&B / Soul",
    photo: "https://picsum.photos/seed/mayachen/400/400",
    coverArt: "https://picsum.photos/seed/mayacover/800/350",
    bio: "Maya Chen is a soulful R&B vocalist and songwriter known for her powerful voice and emotionally raw lyrics. Born and raised in New York City, Maya draws from jazz legends and modern R&B icons. Her breakthrough single 'Midnight Soul' went platinum in 2023, and her live performances are legendary for their emotional depth and vocal prowess.",
    phone: "9876543211",
    email: "maya.chen@soundwave.com",
    location: "New York, USA",
    followers: "3.1M",
    monthlyListeners: "12.2M",
    yearsActive: "2019 – Present",
    awards: "Platinum Artist, Soul Music Award 2023",
    social: { instagram: "#", twitter: "#", youtube: "#", spotify: "#", facebook: "#" },
    songIds: [3, 4]
  },
  {
    id: "jake-storm",
    name: "Jake Storm",
    genre: "Rock / Alternative",
    photo: "https://picsum.photos/seed/jakestorm/400/400",
    coverArt: "https://picsum.photos/seed/jakecover/800/350",
    bio: "Jake Storm is the frontman and guitarist of his eponymous rock project, known for thunderous guitar riffs and anthemic songwriting. Hailing from Austin, Texas, Jake brings a raw energy to rock that has earned him a cult following worldwide. His music perfectly blends classic rock influences with modern alternative sensibilities.",
    phone: "9876543212",
    email: "jake.storm@soundwave.com",
    location: "Austin, USA",
    followers: "1.8M",
    monthlyListeners: "6.7M",
    yearsActive: "2017 – Present",
    awards: "Rock Album of the Year 2023",
    social: { instagram: "#", twitter: "#", youtube: "#", spotify: "#", facebook: "#" },
    songIds: [5, 6]
  },
  {
    id: "sofia-luna",
    name: "Sofia Luna",
    genre: "Latin Pop",
    photo: "https://picsum.photos/seed/sofialuna/400/400",
    coverArt: "https://picsum.photos/seed/sofiacover/800/350",
    bio: "Sofia Luna is a Latin pop sensation from Miami who brings vibrant rhythms of cumbia, salsa, and reggaeton to international audiences. With her infectious energy and bilingual lyrics, Sofia has become one of the fastest-rising stars in global music. Her song 'Fuego' has over 500 million streams across all platforms.",
    phone: "9876543213",
    email: "sofia.luna@soundwave.com",
    location: "Miami, USA",
    followers: "5.2M",
    monthlyListeners: "18.9M",
    yearsActive: "2020 – Present",
    awards: "Latin Grammy Winner, Global Rising Star 2024",
    social: { instagram: "#", twitter: "#", youtube: "#", spotify: "#", facebook: "#" },
    songIds: [7, 8]
  },
  {
    id: "marcus-wave",
    name: "Marcus Wave",
    genre: "Hip-Hop / Rap",
    photo: "https://picsum.photos/seed/marcuswave/400/400",
    coverArt: "https://picsum.photos/seed/marcuscover/800/350",
    bio: "Marcus Wave is a Houston-born rapper and producer whose intricate wordplay and cinematic production have earned him critical acclaim coast to coast. Known for his storytelling ability and versatile flow, Marcus has collaborated with the biggest names in hip-hop. His concept album 'City Pulse' is widely regarded as a modern hip-hop classic.",
    phone: "9876543214",
    email: "marcus.wave@soundwave.com",
    location: "Houston, USA",
    followers: "4.0M",
    monthlyListeners: "15.3M",
    yearsActive: "2016 – Present",
    awards: "BET Hip-Hop Award, Critics' Choice 2022",
    social: { instagram: "#", twitter: "#", youtube: "#", spotify: "#", facebook: "#" },
    songIds: [9, 10]
  },
  {
    id: "aria-bell",
    name: "Aria Bell",
    genre: "Indie / Folk",
    photo: "https://picsum.photos/seed/ariabell/400/400",
    coverArt: "https://picsum.photos/seed/ariacover/800/350",
    bio: "Aria Bell is a Nashville-based singer-songwriter whose delicate acoustic guitar work and poetic lyricism have made her a beloved figure in the indie folk scene. Her intimate style and confessional songwriting create a deeply personal connection with listeners. Aria's music is the perfect companion for quiet moments of reflection.",
    phone: "9876543215",
    email: "aria.bell@soundwave.com",
    location: "Nashville, USA",
    followers: "1.2M",
    monthlyListeners: "4.8M",
    yearsActive: "2021 – Present",
    awards: "Folk Alliance Emerging Artist 2023",
    social: { instagram: "#", twitter: "#", youtube: "#", spotify: "#", facebook: "#" },
    songIds: [11, 12]
  }
];

/* Free SoundHelix MP3s — replace paths with your own audio files */
const SONGS = [
  { id:1,  title:"Neon Lights",    artistId:"alex-rivers",  genre:"Electronic Pop",  cover:"https://picsum.photos/seed/neonlights/300/300",    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",  duration:"3:45", year:2024, plays:"4.2M" },
  { id:2,  title:"Electric Dreams",artistId:"alex-rivers",  genre:"Electronic Pop",  cover:"https://picsum.photos/seed/electricdreams/300/300", audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",  duration:"4:12", year:2024, plays:"2.8M" },
  { id:3,  title:"Midnight Soul",  artistId:"maya-chen",    genre:"R&B / Soul",      cover:"https://picsum.photos/seed/midnightsoul/300/300",   audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",  duration:"4:30", year:2023, plays:"9.1M" },
  { id:4,  title:"Golden Hour",    artistId:"maya-chen",    genre:"R&B / Soul",      cover:"https://picsum.photos/seed/goldenhour/300/300",     audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",  duration:"3:55", year:2024, plays:"6.3M" },
  { id:5,  title:"Thunder Road",   artistId:"jake-storm",   genre:"Rock",            cover:"https://picsum.photos/seed/thunderroad/300/300",    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",  duration:"5:10", year:2023, plays:"3.7M" },
  { id:6,  title:"Broken Glass",   artistId:"jake-storm",   genre:"Alternative",     cover:"https://picsum.photos/seed/brokenglass/300/300",    audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",  duration:"4:02", year:2024, plays:"2.1M" },
  { id:7,  title:"Corazón",        artistId:"sofia-luna",   genre:"Latin Pop",       cover:"https://picsum.photos/seed/corazon/300/300",        audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",  duration:"3:28", year:2024, plays:"11.5M" },
  { id:8,  title:"Fuego",          artistId:"sofia-luna",   genre:"Latin Pop",       cover:"https://picsum.photos/seed/fuego/300/300",          audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",  duration:"3:15", year:2023, plays:"18.7M" },
  { id:9,  title:"City Pulse",     artistId:"marcus-wave",  genre:"Hip-Hop",         cover:"https://picsum.photos/seed/citypulse/300/300",      audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",  duration:"4:48", year:2023, plays:"7.9M" },
  { id:10, title:"Rise Up",        artistId:"marcus-wave",  genre:"Hip-Hop",         cover:"https://picsum.photos/seed/riseup/300/300",         audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration:"3:38", year:2024, plays:"5.4M" },
  { id:11, title:"Wildflower",     artistId:"aria-bell",    genre:"Indie Folk",      cover:"https://picsum.photos/seed/wildflower/300/300",     audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration:"3:52", year:2024, plays:"2.9M" },
  { id:12, title:"Mountain Song",  artistId:"aria-bell",    genre:"Indie Folk",      cover:"https://picsum.photos/seed/mountainsong/300/300",   audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration:"4:20", year:2023, plays:"1.8M" }
];

/* ---- Helper functions ---- */
function getArtistById(id)      { return ARTISTS.find(a => a.id === id) || null; }
function getSongById(id)        { return SONGS.find(s => s.id === id) || null; }
function getSongsByArtist(aid)  { return SONGS.filter(s => s.artistId === aid); }
function getArtistForSong(song) { return getArtistById(song.artistId); }
