/* ============================================================
   ARTIST.JS — SoundWave Music Website

   Reads ?id= URL parameter, finds the artist in data.js,
   then builds the entire artist page dynamically.
   ============================================================ */

let artistAudio   = null;
let artistPlaying = null;

document.addEventListener('DOMContentLoaded', () => {
  const artistId = new URLSearchParams(window.location.search).get('id');

  if (!artistId) { showErrorState('No artist ID provided.'); return; }

  const artist = getArtistById(artistId);
  if (!artist)  { showErrorState(`Artist "${artistId}" not found.`); return; }

  renderArtistPage(artist, getSongsByArtist(artistId));
});

/* ── Render ───────────────────────────────────────────────── */
function renderArtistPage(artist, songs) {
  document.title = `${artist.name} — SoundWave`;

  const heroBg = document.getElementById('artist-hero-bg');
  if (heroBg) heroBg.style.backgroundImage = `url('${artist.coverArt}')`;

  setEl('artist-photo',
    `<img src="${artist.photo}" alt="${artist.name}" class="artist-photo"
          onerror="this.src='https://picsum.photos/seed/${artist.id}/400/400'">`);

  setEl('artist-genre-badge', `<span class="badge">${artist.genre}</span>`);
  setEl('artist-name',        artist.name);
  setEl('artist-location',    `<i class="fas fa-map-marker-alt"></i> ${artist.location}`);
  setEl('artist-followers',   artist.followers);
  setEl('artist-listeners',   artist.monthlyListeners);
  setEl('artist-years',       artist.yearsActive);

  const socialMap = [
    { key:'instagram', icon:'fab fa-instagram', label:'Instagram' },
    { key:'twitter',   icon:'fab fa-twitter',   label:'Twitter'   },
    { key:'youtube',   icon:'fab fa-youtube',   label:'YouTube'   },
    { key:'spotify',   icon:'fab fa-spotify',   label:'Spotify'   },
    { key:'facebook',  icon:'fab fa-facebook',  label:'Facebook'  },
  ];
  const socialRow = document.getElementById('artist-social');
  if (socialRow) {
    socialRow.innerHTML = socialMap.map(s =>
      `<a href="${artist.social[s.key] || '#'}" class="social-btn ${s.key}" target="_blank" rel="noopener">
         <i class="${s.icon}"></i> ${s.label}
       </a>`
    ).join('');
  }

  setEl('artist-bio',         artist.bio);
  setEl('artist-awards-text', artist.awards);

  const contactList = document.getElementById('artist-contact-list');
  if (contactList) {
    contactList.innerHTML = `
      <div class="contact-info-item">
        <div class="icon"><i class="fas fa-phone"></i></div>
        <div><p>Phone</p><p>${artist.phone}</p></div>
      </div>
      <div class="contact-info-item">
        <div class="icon"><i class="fas fa-envelope"></i></div>
        <div><p>Email</p><p>${artist.email}</p></div>
      </div>
      <div class="contact-info-item">
        <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
        <div><p>Location</p><p>${artist.location}</p></div>
      </div>
      <div class="contact-info-item">
        <div class="icon"><i class="fas fa-calendar"></i></div>
        <div><p>Active Since</p><p>${artist.yearsActive}</p></div>
      </div>
    `;
  }

  renderSongsList(songs);
  renderMusicDetails(songs);
}

/* ── Songs list ───────────────────────────────────────────── */
function renderSongsList(songs) {
  const list = document.getElementById('artist-songs-list');
  if (!list) return;

  list.innerHTML = songs.map((song, i) => `
    <div class="song-row" id="song-row-${song.id}" data-num="${i + 1}"
         onclick="playArtistSong(${song.id})">
      <span class="song-num">${i + 1}</span>
      <img src="${song.cover}" alt="${song.title}" class="song-row-cover"
           onerror="this.src='https://picsum.photos/seed/${song.id}/300/300'">
      <div class="song-row-info">
        <h4>${song.title}</h4>
        <p>${song.genre} · ${song.year}</p>
      </div>
      <span class="song-row-plays">
        <i class="fas fa-headphones" style="margin-right:4px"></i>${song.plays}
      </span>
      <button class="song-row-play" aria-label="Play ${song.title}">
        <i class="fas fa-play"></i>
      </button>
    </div>
  `).join('');
}

/* ── Music Details ────────────────────────────────────────── */
function renderMusicDetails(songs) {
  const container = document.getElementById('artist-music-details');
  if (!container) return;

  container.innerHTML = songs.map(song => `
    <div class="music-detail-row">
      <img src="${song.cover}" alt="${song.title}" class="music-detail-cover"
           onerror="this.src='https://picsum.photos/seed/${song.id}/300/300'">
      <div class="music-detail-info">
        <h4>${song.title}</h4>
        <div class="music-detail-meta">
          <span><i class="fas fa-music"></i> ${song.genre}</span>
          <span><i class="fas fa-clock"></i> ${song.duration}</span>
          <span><i class="fas fa-calendar-alt"></i> ${song.year}</span>
          <span><i class="fas fa-headphones"></i> ${song.plays} plays</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── Audio player ─────────────────────────────────────────── */
function playArtistSong(songId) {
  if (artistPlaying === songId) {
    if (artistAudio && !artistAudio.paused) {
      artistAudio.pause();
      setRowState(songId, false);
    } else {
      artistAudio?.play();
      setRowState(songId, true);
    }
    return;
  }

  if (artistAudio) { artistAudio.pause(); artistAudio.currentTime = 0; }
  if (artistPlaying) setRowState(artistPlaying, false);

  const song = getSongById(songId);
  if (!song) return;

  artistAudio   = new Audio(song.audio);
  artistPlaying = songId;

  artistAudio.play().catch(() => showToast('Could not load audio.', 'error'));
  setRowState(songId, true);
  artistAudio.addEventListener('ended', () => {
    setRowState(songId, false);
    artistPlaying = null;
  });

  showToast(`Now playing: ${song.title}`, 'info');
}

function setRowState(songId, playing) {
  const row     = document.getElementById(`song-row-${songId}`);
  const playBtn = row?.querySelector('.song-row-play i');
  const numEl   = row?.querySelector('.song-num');

  row?.classList.toggle('playing-row', playing);
  if (numEl) numEl.innerHTML = playing
    ? '<i class="fas fa-volume-up" style="color:var(--primary)"></i>'
    : (row?.dataset.num || '');
  if (playBtn) playBtn.className = playing ? 'fas fa-pause' : 'fas fa-play';
}

/* ── Helpers ──────────────────────────────────────────────── */
function setEl(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function showErrorState(msg) {
  document.querySelector('main')?.insertAdjacentHTML('afterbegin', `
    <div style="text-align:center;padding:120px 20px;color:var(--text-muted)">
      <i class="fas fa-exclamation-circle"
         style="font-size:3rem;margin-bottom:16px;display:block;color:var(--secondary)"></i>
      <h2>Artist Not Found</h2>
      <p style="margin:10px 0 24px">${msg}</p>
      <a href="music.html" class="btn btn-primary">Browse Music</a>
    </div>`
  );
}
