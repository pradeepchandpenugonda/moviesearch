const API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d9e2eda26ce9d82015a9827acd6e64c3&page=1'

const IMG_PATH='https://image.tmdb.org/t/p/w1280'

const SEARCH_API='https://api.themoviedb.org/3/search/movie?api_key=d9e2eda26ce9d82015a9827acd6e64c3&query='

//Assigning variable for selectors

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

// function to get  all movies
getMovies(API_URL);

async function getMovies(url) {
   
         const response=await fetch(url);
         const data=await response.json();
         showMovies(data.results)

}

function showMovies(movies) {
    main.innerHTML='';

    movies.forEach((movie)=>{

        const {poster_path,title,vote_average,overview,vote_count}=movie
        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML=`
        <img src="${IMG_PATH + poster_path}" alt="">
            <div class="movie-info">
               <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                <span>${vote_count}</span>
            </div>
           <div class="overview">
                <h3>OverView</h3>
                <p>${overview}</p>
            
            </div>
          
        `
        main.appendChild(movieEl)

    })

}

function getClassByRate(vote) {
    if(vote>=8){
        return 'green'
    } else if (vote>=5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchTerm=search.value
    if(searchTerm && searchTerm!==''){
        getMovies(SEARCH_API + searchTerm)

    }
})
