
from flask import Flask
from flask_cors import CORS

import get_songs, get_chords
app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/")
def welcome():
    return(f"Welcome, you shouldn't see this")

@app.route("/scrape/<title>/<artist>")
def scrape_chords(title, artist):
    chords = get_chords.get_them(title, artist)
    return(chords)

@app.route("/get_songs")
def song_list():
    songs = get_songs.get_em()
    return(songs)

if __name__ == "__main__":
    app.run(debug=False)