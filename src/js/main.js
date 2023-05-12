import * as bootstrap from 'bootstrap'
import '../scss/styles.scss'
import '../scss/styles.css'

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const uid = "11658";
const tokenID = 'qvKzNGRbVDURNQOa';

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  const apiURL = `https://www.stands4.com/services/v2/lyrics.php?uid=${uid}&tokenid=${tokenID}&term=${searchTerm}&format=json`;


 const response = await fetch(apiURL)
  
    .then(res => res.json())
    .then(data => {
      
      const tracks = data.result
      const songLink = data.result[0]['song-link']
      const html = tracks.map(song => `
        <div>
          <h2>${song.song}</h2>
          <p>Artist: ${song.artist}</p>
          <p>Album: ${song.album}</p>
          <a href="${songLink}" target="_blank">View Lyrics</a>
    
        </div>
      `).join('');
      console.log(data) 

      searchResults.innerHTML = html;

      
    })
    .catch(error => {
      console.error(error);
      searchResults.innerHTML = '<p>Sorry, there was an error searching for lyrics. Please try again later.</p>';
    });

    
});
