const apiKey = 'c30925cf';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieResults = document.getElementById('movieResults');

// Fetch movies from OMDb API
async function fetchMovies(query) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
  const data = await response.json();

  if (data.Response === 'True') {
    displayMovies(data.Search);
  } else {
    movieResults.innerHTML = `<p>No movies found. Try searching for something else.</p>`;
  }
}

// Display movie cards with links
function displayMovies(movies) {
  movieResults.innerHTML = movies
    .map(movie => {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(movie.Title + ' movie')}`;
      return `
        <a href="${searchUrl}" target="_blank" class="movie-link">
          <div class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        </a>
      `;
    })
    .join('');
}

// Event listener for search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});
