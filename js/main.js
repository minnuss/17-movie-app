// array for pages
let pagesArray = [`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=1`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=2`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=3`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=4`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=5`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=6`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=7`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=8`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=9`, `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=10`]

// calling the function before everything else, for first page load
forwardNumber();

const pages = document.querySelectorAll('.app__content__links--link');

// Getting the page number from page links on bottom of the page
function getPage() {
    pages.forEach((page, idx) => {
        idx = idx;
        page.addEventListener('click', () => {
            number = idx;
            // console.log(number)
            forwardNumber(number);
        })
    })
}
getPage()

function forwardNumber(number = 0) {
    console.log(number)

    const apiUrl = pagesArray[number];

    // const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=1`;

    console.log(apiUrl)

    const imgPath = 'https://image.tmdb.org/t/p/w1280';
    const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=88fc2de7fb7bef9f3493e59b42ccdd13&query="';

    const form = document.querySelector('.app__content__header__form');
    const search = document.querySelector('.app__content__header__form--input');
    const searchBtn = document.querySelector('.app__content__header__form--btn');

    const mainBox = document.querySelector('.app__content__main');
    const movies = document.querySelectorAll('.app__content__main__movie');

    // Get initial movies
    async function getMovies(url) {

        const res = await fetch(url);
        const data = await res.json();

        showMovies(data.results);
    }
    getMovies(apiUrl)

    // get the value from form input
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchTerm = search.value;

        if (searchTerm && searchTerm !== "") {
            getMovies(searchUrl + searchTerm);
            search.value = '';
        } else {
            window.location.reload();
        }
    });

    // submit form when button is clicked
    searchBtn.addEventListener('click', () => {
        e.preventDefault();
        const searchTerm = search.value;
        if (searchTerm === "") {
            return;
        } else {
            form.submit();
        }
    })

    // Put all the values from API to HTML
    function showMovies(movies) {

        mainBox.innerHTML = '';

        // Genre ID's from TheMovieDB.org
        let Obj = {
            '28': "Action",
            '12': "Adventure",
            '16': "Animation",
            '35': "Comedy",
            '80': "Crime",
            '99': "Documentary",
            '18': "Drama",
            '10751': "Family",
            '14': "Fantasy",
            '36': "History",
            '27': "Horror",
            '10402': "Music",
            '9648': "Mystery",
            '10749': "Romance",
            '878': "Sci-Fi",
            '10770': "TV Movie",
            '53': "Thriller",
            '10752': "War",
            '37': "Western"
        };

        movies.forEach(movie => {
            // destructuring of movie object that we get from API
            const { title, poster_path, vote_average, overview, release_date, genre_ids } = movie;

            // replacing ID's of genres to names
            let genreNames = genre_ids.map(num => Obj[num]);

            // getting only the year
            let [year, month, day] = release_date.split('-');
            // creating movieEl
            const movieEl = document.createElement('div');
            movieEl.classList.add('app__content__main__movie');
            // inserting all the data in movieEl
            movieEl.innerHTML =
                `<div class="app__content__main__movie__info">
                            <h3 class="app__content__main__movie__info--title">${title}</h3>
                            <span class="app__content__main__movie__info--rating green ${rateOfMovie(vote_average)}">${vote_average}</span>
                            </div>
                    
                            <div class="app__content__main__movie--date">
                            <span class="app__content__main__movie__date--year">${year}</span>
                            </div>

                            <div class="app__content__main__movie__genre">
                            <span class="app__content__main__movie__genre--title">${genreNames}</span>
                        </div>
                    
                            <img src="${imgPath + poster_path}"
                            alt="${title}" class="app__content__main__movie--img">
                    
                            <div class="app__content__main__movie__overview">
                            <h3 class="app__content__main__movie__overview--title">About movie</h3>
                            <p class="app__content__main__movie__overview--para">${overview}</p>
                             </div>`

            mainBox.appendChild(movieEl);
        })
    }

    // getting the rate of movie, and passing "classes" for colors
    function rateOfMovie(vote) {
        if (vote >= 7.4) {
            return 'green';
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    }
}





// OLD CODE FROM TUTORIAL - without pages, movie year, movie genre

// const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fc2de7fb7bef9f3493e59b42ccdd13&page=1';

// const imgPath = 'https://image.tmdb.org/t/p/w1280';
// const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=88fc2de7fb7bef9f3493e59b42ccdd13&query="';

// const form = document.querySelector('.app__content__header__form');
// const search = document.querySelector('.app__content__header__form--input');
// const searchBtn = document.querySelector('.app__content__header__form--btn');

// const mainBox = document.querySelector('.app__content__main');
// const movies = document.querySelectorAll('.app__content__main__movie');

// const pages = document.querySelectorAll('.app__content__links--link');

// // Get initial movies
// async function getMovies(url) {

//     const res = await fetch(url);
//     const data = await res.json();

//     showMovies(data.results);
// }
// getMovies(apiUrl)

// // get the value from form input
// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const searchTerm = search.value;

//     if (searchTerm && searchTerm !== "") {
//         getMovies(searchUrl + searchTerm);
//         search.value = '';
//     } else {
//         window.location.reload();
//     }
// });

// // submit form when button is clicked
// searchBtn.addEventListener('click', () => {
//     e.preventDefault();
//     form.submit();
// })

// // Put all the values from API to HTML
// function showMovies(movies) {
//     mainBox.innerHTML = '';

//     movies.forEach(movie => {
//         // destructuring of movie object that we get from API
//         const { title, poster_path, vote_average, overview, release_date } = movie;

//         // getting only the year
//         let [year, month, day] = release_date.split('-');
//         // creating movieEl
//         const movieEl = document.createElement('div');
//         movieEl.classList.add('app__content__main__movie');
//         // inserting all the data in movieEl
//         movieEl.innerHTML =
//             `<div class="app__content__main__movie__info">
//         <h3 class="app__content__main__movie__info--title">${title}</h3>
//         <span class="app__content__main__movie__info--rating green ${rateOfMovie(vote_average)}">${vote_average}</span>
//         </div>

//         <div class="app__content__main__movie--date">
//         <span class="app__content__main__movie__date--year">${year}</span>
//         </div>

//         <img src="${imgPath + poster_path}"
//         alt="${title}" class="app__content__main__movie--img">

//         <div class="app__content__main__movie__overview">
//         <h3 class="app__content__main__movie__overview--title">About movie</h3>
//         <p class="app__content__main__movie__overview--para">${overview}</p>
//          </div>`

//         mainBox.appendChild(movieEl);
//     })
// }

// // getting the rate of movie, and passing "classes" for colors
// function rateOfMovie(vote) {
//     if (vote >= 7.5) {
//         return 'green';
//     } else if (vote >= 6) {
//         return "orange";
//     } else {
//         return "red";
//     }
// }

// ****************************************************