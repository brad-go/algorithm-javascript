# 베스트앨범

## 문제 분류

: 해쉬

## 풀이 과정

문제를 이해하지 못해서 정말 시간을 많이 소비했다. 결과 출력에 음악 고유 번호와 장르 고유 번호가 필요한 줄 알고, 구조를 짜고 함수를 만들었다가 자꾸 틀리길래 확인해보니 두 장르 안에서 재생 횟수가 높은 음악 두 개의 고유번호를 배열에 넣어 출력하는 것이 답이었다.

## Solution

```js
function solution(genres, plays) {
  const customSortFunction = (a, b) => {
    // 재생횟수가 같을 경우 고유 번호가 낮은 것이 우선
    if (a.play === b.play) return a.id - b.id;

    return b.play - a.play;
  };

  const answer = [];
  const playList = {};

  // genre, play 배열의 길이는 같다.
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

  // playlist를 총 재생횟수를 기준으로 정렬해준다.
  const genreList = Object.values(playList).sort(
    (a, b) => b.totalPlay - a.totalPlay
  );

  genreList.forEach((genre) => {
    const { musics } = genre; // 장르에 해당하는 음악들

    // 음악의 개수가 2개보다 적을 수도 있다.
    for (let i = 0; i < 2 && i < musics.length; i++) {
      const { id } = musics.sort(customSortFunction)[i]; // 정렬
      answer.push(id);
    }
  });

  return answer;
}
```

## 코드 개선

문제에서 제시한 정렬 기준을 알기 쉽게 표현하는 코드였다. 이렇게 하기 위해서는 전체 음악 리스틀 먼저 저장할 것이 아니라 문제에서 중요시 되는 장르와 그 장르의 총 재생횟수를 저장하는 것이 포인트였다.

```js
function solution(genres, plays) {
  const playlist = {};
  const genrelist = {};

  genres.forEach((genre, id) => {
    playlist[genre] = playlist[genre] ? playlist[genre] + plays[id] : plays[id]; // prettier-ignore
  });

  return genres
    .map((genre, id) => ({ genre, count: plays[id], id })) // 정렬을 위해 객체로 생성
    .sort((a, b) => {
      if (a.genre !== b.genre) return playlist[b.genre] - playlist[a.genre]; // 총 반복횟수가 높은 장르 우선
      if (a.count !== b.count) return b.count - a.count; // 총 재생횟수가 높은 음악 우선
      return a.id - b.id; // 재생횟수가 같을 경우 고유 번호가 낮은 것이 우선
    })
    .filter(({ genre }) => {
      if (genrelist[genre] >= 2) return false; // 한 장르당 두 곡씩만 베스트 앨범에 담는다.
      genrelist[genre] = (genrelist[genre] || 0) + 1;
      return true;
    })
    .map(({ id }) => id);
}
```
