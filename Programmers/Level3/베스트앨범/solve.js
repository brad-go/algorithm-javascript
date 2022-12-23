const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const genres = input[0].split(" ");
const plays = input[1].split(" ").map(Number);

const solution = (genres, plays) => {
  const songs = genres.map((genre, index) => ({
    genre,
    id: index,
    play: plays[index],
  }));

  const genresByTotalPlays = songs.reduce((acc, song) => {
    const genre = acc[song.genre] || { totalPlays: 0, songs: [] };

    genre.totalPlays += song.play;
    genre.songs.push(song);
    acc[song.genre] = genre;

    return acc;
  }, {});

  const bestAlbum = Object.values(genresByTotalPlays)
    .sort((a, b) => b.totalPlays - a.totalPlays)
    .flatMap((genre) => genre.songs.sort((a, b) => b.play - a.play).slice(0, 2))
    .map(({ id }) => id);

  return bestAlbum;
};

console.log(solution(genres, plays));
