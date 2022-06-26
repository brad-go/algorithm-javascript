const genres = ["classic", "pop", "classic", "classic", "pop"];
const plays = [500, 600, 150, 800, 2500];

function solution(genres, plays) {
  const playlist = {};
  const genrelist = {};

  genres.forEach((genre, id) => {
    playlist[genre] = playlist[genre] ? playlist[genre] + plays[id] : plays[id]; // prettier-ignore
  });

  return genres
    .map((genre, id) => ({ genre, count: plays[id], id }))
    .sort((a, b) => {
      if (a.genre !== b.genre) return playlist[b.genre] - playlist[a.genre]; // 총 반복횟수가 높은 장르 우선
      if (a.count !== b.count) return b.count - a.count; // 총 재생횟수가 높은 음악 우선
      return a.id - b.id; // 재생횟수가 같을 경우 고유 번호가 낮은 것이 우선
    })
    .filter(({ genre }) => {
      if (genrelist[genre] >= 2) return false;
      genrelist[genre] = (genrelist[genre] || 0) + 1;
      return true;
    })
    .map(({ id }) => id);
}

console.log(solution(genres, plays));
