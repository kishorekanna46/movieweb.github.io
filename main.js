const API_KEY = 'eyJhbGci...'; // A long token from TMDB

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const resultsContainer = document.getElementById('resultsContainer');
const searchButton = document.getElementById('searchButton');
const nowPlayingButton = document.getElementById('nowPlayingButton');
const topRatedButton = document.getElementById('topRatedButton');

function createMovieCard(movie) {
  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const card = document.createElement('div');
  card.className = 'movie';

  const img = document.createElement('img');
  img.src = imageURL;
  img.alt = movie.title;

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const releaseDate = document.createElement('p');
  releaseDate.textContent = `Release: ${movie.release_date}`;

  const overview = document.createElement('p');
  overview.textContent = movie.overview;

  card.append(img, title, releaseDate, overview);
  resultsContainer.appendChild(card);
}

function fetchMovies(apiUrl) {
  fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = '';
      data.results.forEach(movie => createMovieCard(movie));
    })
    .catch(error => console.error('Error fetching movies:', error));
}

function searchMovies() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
  fetchMovies(url);
}

function getNowPlayingMovies() {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  fetchMovies(url);
}

function getTopRatedMovies() {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  fetchMovies(url);
}

// Event Listeners
searchButton.addEventListener('click', searchMovies);
nowPlayingButton.addEventListener('click', getNowPlayingMovies);
topRatedButton.addEventListener('click', getTopRatedMovies);