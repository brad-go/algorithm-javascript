# 좌표 정렬하기 - 1181

[문제 링크](https://www.acmicpc.net/problem/1181)

### 성능 요약

메모리: 256MB, 시간 2초

### 문제

알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.

1. 길이가 짧은 것부터
2. 길이가 같으면 사전 순으로

### 입력

첫째 줄에 단어의 개수 N이 주어진다. (1 ≤ N ≤ 20,000) 둘째 줄부터 N개의 줄에 걸쳐 알파벳 소문자로 이루어진 단어가 한 줄에 하나씩 주어진다. 주어지는 문자열의 길이는 50을 넘지 않는다.

### 출력

조건에 따라 정렬하여 단어들을 출력한다. 단, 같은 단어가 여러 번 입력된 경우에는 한 번씩만 출력한다.

### 예제 입력

```
13
but
i
wont
hesitate
no
more
no
more
it
cannot
wait
im
yours
```

### 예제 출력

```
i
im
it
no
but
more
wait
wont
yours
cannot
hesitate
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 해결

#### 배열 중복값 제거하기

```js
const uniqueWords = input.filter((word, idx) => {
  return input.indexOf(word) === idx;
});
```

- `indexOf()`의 동일한 요소가 존재할 경우 맨 앞의 index를 반환하는 특징을 이용
- 현재 단어의 인덱스 번호와 현재 순서의 인덱스 같다면 uniqueWords 배열에 추가. 단어가 같을 경우 먼저 들어간 인덱스 번호와 비교하게 되어 들어가지 않음.

#### 단어 정렬하기

```js
const sortedWords = uniqueWords.sort().sort((curWord, prevWord) => {
  if (curWord.length !== prevWord.length) {
    return curWord.length - prevWord.length;
  }
});
```

- 일단 단어를 사전 순(unicode순)으로 정렬하기 위해 `sort()`를 사용했다.
- 한번 더 sort를 통해서 길이를 비교해서 정렬햇다.

#### console.log 한번만 사용

```js
let result = "";
sortedWords.forEach((word) => {
  result += `${word}\n`;
});
console.log(result.trim());
```

- 메모리와 시간을 아끼기 위해 `result` 문자열을 만들어 한 번에 출력했다.

```js
console.log(sortedWord.join('\n');
```

- 이렇게 하면 메모리가 줄어들지만 시간이 늘어난다. 하지만 깔끔해서 좋은 것 같다.

### 해결 2

다른 사람들은 어떻게 풀어보나 찾아보다 아래와 같은 코드를 발견했다.

```js
function Solution(n, words) {
  const sorted = [];

  // 단어의 길이가 담긴 배열만들기
  const wordsLength = words.map((word) => word.length);
  // 제일 짧은 것과 제일 긴 길이를 뽑아냄
  const max = Math.max(...wordsLength);
  const min = Math.min(...wordsLength);

  // 단어의 길이만큼 반복
  for (let i = min; i <= max; i++) {
    // 같은 길이를 가진 단어가 담길 배열
    const group = [];
    // 단어 수만큼 반복
    for (let j = 0; j < n; j++) {
      // 단어의 길이가 같다면
      if (input[j].length === i) {
        // 그룹에 같은 단어가 없다면 집어넣음
        if (group.indexOf(input[j]) === -1) group.push(input[j]);
      }
    }

    // 같은 길이를 가진 단어들이 있다면
    if (group.length > 1) {
      // 유니코드 순으로 정렬해서 넣어줌
      sorted.push(...group.sort());
      continue;
    }
    // 그냥 넣어줌
    sorted.push(...group);
  }
  console.log(sorted.join("\n"));
}

Solution(n, input);
```

</div>
</details>
