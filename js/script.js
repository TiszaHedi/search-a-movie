const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1758ab1f540190c2b7fb7f0a1f3f3a13&page=1&language=hu';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1758ab1f540190c2b7fb7f0a1f3f3a13&page=1&language=hu&query="';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.form');
const logo = document.querySelector('.logo');


/* Get movies onload */
async function getMovies(url) {
    const response = await fetch(url);
    if(!response.ok) {
        alert('Szerver hiba!');
        return;
    }

    const moviesObject = await response.json();
    const movies = moviesObject.results;
    if(movies.length === 0) {
        alert('Keresés eredménytelen! Írjon be másik keresőszót!');
    }
    console.log(movies);

    renderMovies(movies);
}

getMovies(API_URL);


/* Render the movies */
function renderMovies(movies) {
    let movieListTemplate = '';
    for(let movie of movies) {
        movieListTemplate += `
            <div class="movie">
                <div class="movie-card-inner">
                    <div class="movie-card-front">
                        <img src="${IMAGE_PATH + movie.poster_path}" alt="${movie.title}">
                        <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <span class="movie-average ${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
                        </div>
                    </div>
                    <div class="movie-card-back">
                        ${movie.overview}
                    </div>
                </div>
            </div>
        `
    }

    document.querySelector('.main').innerHTML = movieListTemplate;
}


/* Search movies */
form.onsubmit = function(event) {
    event.preventDefault();

    let searchWord = event.target.elements.search.value;

    if(!searchWord) {
        alert('Keresés sikertelen')
    } else {
        getMovies(SEARCH_API + searchWord)
    }

    form.reset();

}


function getClassByRate(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
}


/* If the client click on the logo get back the most popular movies */
logo.onclick = function() {
    getMovies(API_URL);
}