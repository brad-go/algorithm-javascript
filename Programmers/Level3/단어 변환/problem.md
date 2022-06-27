# 단어 변환

## 문제 분류

: DFS/BFS

## 풀이 과정

방문처리가 포인트였다. dfs는 쉽게 구성했지만, 한 단어로 바뀌는 것은 분기를 다르게 나누는 것이기 때문에 다른 분기에서는 앞에서 방문한 것도 다르게 방문처리를 해줘야했다.

```js
function solution(begin, target, words) {
  // 바꿀 수 있는 단어인지 체크
  const isConvertable = (currentWord, wordToChange) => {
    let difference = 0;

    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] !== wordToChange[i]) difference++;
    }

    return difference > 1 ? false : true;
  };

  let answer = 0;
  if (!words.includes(target)) return answer;

  const convertWord = (currentWord, visited, depth) => {
    if (currentWord === target) {
      answer = depth;
    }

    for (let i = 0; i < words.length; i++) {
      if (isConvertable(currentWord, words[i]) && !visited[i]) {
        visited[i] = true;
        convertWord(words[i], visited, depth + 1);
        visited[i] = false; // 다른 분기에서 방문처리를 할 수 있도록 하기 위해
      }
    }
  };

  const visited = new Array(words.length + 1).fill(false);
  convertWord(begin, visited, 0);

  return answer;
}
```

## 코드 개선

- bfs로 풀이했다. 그러나 처음에는 방문 처리를 해서 풀이했는데, 방문처리를 하는 것보다 안하는 것이 빨랐다.

```js
function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const q = [[begin, 0]];

  while (q.length) {
    const [currentWord, depth] = q.shift();

    for (let i = 0; i < words.length; i++) {
      if (isConvertable(currentWord, words[i])) {
        if (currentWord === target) return depth;
        q.push([words[i], depth + 1]);
      }
    }
  }
}

const isConvertable = (currentWord, wordToChange) => {
  let difference = 0;

  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] !== wordToChange[i]) difference++;
  }

  return difference > 1 ? false : true;
};
```
