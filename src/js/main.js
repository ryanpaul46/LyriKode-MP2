import '../scss/styles.scss'
import '../css/styles.css'
import * as bootstrap from 'bootstrap'

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const uid = "11658";
const tokenID = 'qvKzNGRbVDURNQOa';

let itemsPerPage = 5;
let currentPage = 1;

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  const apiURL = `https://www.stands4.com/services/v2/lyrics.php?uid=${uid}&tokenid=${tokenID}&term=${searchTerm}&format=json`;

async function displayResult(){
 const response = await fetch(apiURL)
  
    .then(res => res.json())
    .then(data => {
      const tracks = data.result
      const songLink = data.result[0]['song-link']
      const html = tracks
      const pages = [];
      for(let i = 0; i<= Math.ceil(tracks.length / itemsPerPage); i++){
    pages.push (i)
      }
      const indexOfLastPage = currentPage * itemsPerPage;
      const indexOfFirstPage = indexOfLastPage - itemsPerPage;
      const currentItems = tracks.slice(indexOfFirstPage, indexOfLastPage);

   
      document.getElementById('search-results').innerHTML =currentItems.map(song => `
        <div>
          <h2>${song.song}</h2>
          <p>Artist: ${song.artist}</p>
          <p>Album: ${song.album}</p>
          <a href="${songLink}" target="_blank">View Lyrics</a>
        </div>
      `).join('');
      console.log(data) 
      const prevBtn = () => {
        if ((currentPage - 1) * itemsPerPage){
          currentPage --;
          displayResult();
        }
        
      }
      const nextBtn = () => {
        if((currentPage * itemsPerPage)/ tracks.length){
          currentPage++;
          displayResult();
        }
      }
      document.getElementById('prevBtn').addEventListener('click',prevBtn, false)
      document.getElementById('nextBtn').addEventListener('click',nextBtn, false)
    })
    .catch(error => {
      console.error(error);
      searchResults.innerHTML = '<p>Sorry, there was an error searching for lyrics. Please try again later.</p>';
    });
  
}
  displayResult();
});
