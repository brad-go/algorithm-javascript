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
