const genres = ["classic", "pop", "classic", "classic", "pop"];
const plays = [500, 600, 150, 800, 2500];

function solution(genres, plays) {
  const customSortFunction = (a, b) => {
    if (a.play === b.play) return a.id - b.id;

    return b.play - a.play;
  };

  const answer = [];
  const playList = {};

  genres.forEach((genre, id) => {
    const play = plays[id];
    const music = { id, play };

    if (playList[genre] === undefined) {
      playList[genre] = {
        musics: [music],
        totalPlay: play,
      };
    } else {
      playList[genre].musics.push(music);
      playList[genre].totalPlay += play;
    }
  });

  const genreList = Object.values(playList).sort(
    (a, b) => b.totalPlay - a.totalPlay
  );

  genreList.forEach((genre) => {
    const { musics } = genre;

    for (let i = 0; i < 2 && i < musics.length; i++) {
      const { id } = musics.sort(customSortFunction)[i];
      answer.push(id);
    }
  });

  return answer;
}

console.log(solution(genres, plays));
