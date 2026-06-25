/* ============================================================
   MUSIC.JS — SoundWave Music Website

   Features:
   - Renders trending song cards from data.js
   - Play / Pause (one song at a time via HTML5 Audio)
   - Clickable progress bar + seek
   - Search by title, artist, or genre
   - Filter by artist dropdown
   - Toggle favorites (saved in localStorage)
   - Grid / List view toggle
   ============================================================ */

let currentAudio  = null;
let currentCardEl = null;
let currentSongId = null;

let favorites = JSON.parse(localStorage.getItem('soundwave-favorites') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  renderMusicCards(SONGS);
  populateArtistFilter();
  initSearch();
  initFilter();
  initViewToggle();
  renderFavorites();
});

/* ── Render cards ─────────────────────────────────────────── */
function renderMusicCards(songs) {
  const grid  = document.getElementById('music-grid');
  const count = document.getElementById('results-count');
  if (!grid) return;

  if (count) count.textContent = `${songs.length} song${songs.length !== 1 ? 's' : ''}`;
  grid.innerHTML = '';

  if (!songs.length) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No songs found</h3>
        <p>Try a different search term or filter.</p>
      </div>`;
    return;
  }

  songs.forEach(song => {
    const artist    = getArtistForSong(song);
    const isFav     = favorites.includes(song.id);
    const isPlaying = currentSongId === song.id;

    const card = document.createElement('div');
    card.className = `music-card reveal${isPlaying ? ' playing' : ''}`;
    card.id = `card-${song.id}`;

    card.innerHTML = `
      <button class="fav-btn ${isFav ? 'active' : ''}"
              onclick="toggleFavorite(${song.id}, this)"
              title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
      </button>

      <div class="music-card-img">
        <img src="${song.cover}" alt="${song.title}" loading="lazy"
             onerror="this.src='https://picsum.photos/seed/${song.id}/300/300'">
        <div class="card-overlay">
          <button class="play-pause-btn" onclick="handlePlayPause(${song.id})" aria-label="Play ${song.title}">
            <i class="${isPlaying ? 'fas fa-pause' : 'fas fa-play'}"></i>
          </button>
        </div>
      </div>

      <div class="music-card-body">
        <h3 class="music-title" title="${song.title}">${song.title}</h3>
        <p class="music-artist">
          <i class="fas fa-user" style="font-size:.75rem;margin-right:4px;color:var(--primary)"></i>
          ${artist?.name || 'Unknown'}
        </p>

        <div class="music-meta">
          <span class="badge music-genre">${song.genre}</span>
          <span class="music-duration"><i class="fas fa-clock"></i> ${song.duration}</span>
        </div>

        <p class="music-phone">
          <i class="fas fa-headphones" style="margin-right:4px;color:var(--primary)"></i>
          ${song.plays} plays
        </p>

        <div class="progress-wrap">
          <div class="progress-bar" onclick="seekAudio(event, ${song.id})">
            <div class="progress-fill" id="progress-${song.id}"></div>
          </div>
        </div>

        <div class="music-card-actions">
          <button class="btn-play-card" onclick="handlePlayPause(${song.id})" id="btn-${song.id}">
            <i class="${isPlaying ? 'fas fa-pause' : 'fas fa-play'}"></i>
            ${isPlaying ? 'Pause' : 'Play'}
          </button>
          <a class="btn-view-artist" href="artist.html?id=${artist?.id}" title="View ${artist?.name}">
            <i class="fas fa-eye"></i> View
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (typeof initScrollReveal === 'function') initScrollReveal();
}

/* ── Play / Pause ─────────────────────────────────────────── */
function handlePlayPause(songId) {
  if (currentSongId === songId) {
    if (currentAudio.paused) {
      currentAudio.play();
      setCardPlaying(currentCardEl, songId, true);
    } else {
      currentAudio.pause();
      setCardPlaying(currentCardEl, songId, false);
    }
    return;
  }

  stopCurrentSong();

  const song = getSongById(songId);
  if (!song) return;

  currentAudio  = new Audio(song.audio);
  currentSongId = songId;
  currentCardEl = document.getElementById(`card-${songId}`);

  currentAudio.play().catch(() => {
    showToast('Could not load audio. Check your internet connection.', 'error');
    stopCurrentSong();
  });

  setCardPlaying(currentCardEl, songId, true);
  currentAudio.addEventListener('timeupdate', () => updateProgress(songId));
  currentAudio.addEventListener('ended', () => {
    setCardPlaying(currentCardEl, songId, false);
    currentAudio  = null;
    currentSongId = null;
    currentCardEl = null;
  });

  showToast(`Now playing: ${song.title}`, 'info');
}

function stopCurrentSong() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (currentCardEl && currentSongId) {
    setCardPlaying(currentCardEl, currentSongId, false);
    const fill = document.getElementById(`progress-${currentSongId}`);
    if (fill) fill.style.width = '0%';
  }
  currentAudio  = null;
  currentSongId = null;
  currentCardEl = null;
}

function setCardPlaying(card, songId, playing) {
  if (!card) return;
  card.classList.toggle('playing', playing);

  const btn        = document.getElementById(`btn-${songId}`);
  const overlayBtn = card.querySelector('.play-pause-btn');

  if (btn) btn.innerHTML = playing
    ? '<i class="fas fa-pause"></i> Pause'
    : '<i class="fas fa-play"></i> Play';

  if (overlayBtn) overlayBtn.innerHTML = playing
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
}

function updateProgress(songId) {
  if (!currentAudio) return;
  const pct  = (currentAudio.currentTime / currentAudio.duration) * 100;
  const fill = document.getElementById(`progress-${songId}`);
  if (fill) fill.style.width = `${pct}%`;
}

function seekAudio(event, songId) {
  if (currentSongId !== songId || !currentAudio) return;
  const bar  = event.currentTarget;
  const rect = bar.getBoundingClientRect();
  currentAudio.currentTime = ((event.clientX - rect.left) / rect.width) * currentAudio.duration;
}

/* ── Favorites ────────────────────────────────────────────── */
function toggleFavorite(songId, btn) {
  const idx = favorites.indexOf(songId);
  if (idx === -1) {
    favorites.push(songId);
    btn.classList.add('active');
    btn.innerHTML = '<i class="fas fa-heart"></i>';
    showToast('Added to favorites ♥', 'success');
  } else {
    favorites.splice(idx, 1);
    btn.classList.remove('active');
    btn.innerHTML = '<i class="far fa-heart"></i>';
    showToast('Removed from favorites', 'info');
  }
  localStorage.setItem('soundwave-favorites', JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const section = document.getElementById('favorites-section');
  const grid    = document.getElementById('favorites-grid');
  const count   = document.getElementById('fav-count');
  if (!section || !grid) return;

  const favSongs = SONGS.filter(s => favorites.includes(s.id));
  if (!favSongs.length) { section.classList.remove('visible'); return; }

  section.classList.add('visible');
  if (count) count.textContent = favSongs.length;

  grid.innerHTML = '';
  favSongs.forEach(song => {
    const artist = getArtistForSong(song);
    const item   = document.createElement('div');
    item.className = 'fav-item';
    item.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <div class="fav-item-info">
        <strong>${song.title}</strong>
        <span>${artist?.name || ''}</span>
      </div>
      <button class="btn-play-card" style="width:auto;padding:8px 14px;font-size:.8rem"
              onclick="handlePlayPause(${song.id})">
        <i class="fas fa-play"></i>
      </button>
    `;
    grid.appendChild(item);
  });
}

/* ── Search ───────────────────────────────────────────────── */
function initSearch() {
  document.getElementById('search-input')?.addEventListener('input', applyFilters);
}

/* ── Artist filter ────────────────────────────────────────── */
function populateArtistFilter() {
  const select = document.getElementById('artist-filter');
  if (!select) return;
  ARTISTS.forEach(a => {
    const opt = document.createElement('option');
    opt.value       = a.id;
    opt.textContent = a.name;
    select.appendChild(opt);
  });
}

function initFilter() {
  document.getElementById('artist-filter')?.addEventListener('change', applyFilters);
}

function applyFilters() {
  const query    = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
  const artistId = document.getElementById('artist-filter')?.value || '';

  let filtered = SONGS;

  if (query) {
    filtered = filtered.filter(s => {
      const a = getArtistForSong(s);
      return s.title.toLowerCase().includes(query) ||
             a?.name.toLowerCase().includes(query) ||
             s.genre.toLowerCase().includes(query);
    });
  }
  if (artistId) filtered = filtered.filter(s => s.artistId === artistId);

  stopCurrentSong();
  renderMusicCards(filtered);
}

/* ── Grid / List toggle ───────────────────────────────────── */
function initViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('music-grid')
        ?.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  });
}
