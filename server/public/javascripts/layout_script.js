const liked_songs_btn = document.querySelector('#ls_btn');
const callback = require('./routes/callback');
//const token = callback.access_token;

const fetchPromie = fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'POST',
    headers: { 'Authorization' : 'Bearer ' + 3434}
    });

    fetchPromie
        .then(response=> {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error(`Could not get liked_songs: ${error}`);
        });

if(liked_songs_btn == null) {
    console.log("no button");
} else  {
    liked_songs_btn.addEventListener('click', () => {
    //  fetchPromie();
    //  console.log(token);
        console.log("test");
    });
}