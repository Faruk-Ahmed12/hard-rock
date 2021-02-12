const searchSong = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data));
        // .catch(error => displayErrorMsg(error));
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');

    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>

                <p class="author lead">Song Id : <span>${song.artist.id}</span></p>

                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>

                <p class="author lead">Full Song Duration : <span>${song.duration/60 + ' Minutes' }</span></p>
            </div>
                <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

const getLyrics = (artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))

}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics
}

const displayErrorMsg = error => {
    const errorTagH3 = document.getElementById('error-msg')
    errorTagH3.innerText = error;
}