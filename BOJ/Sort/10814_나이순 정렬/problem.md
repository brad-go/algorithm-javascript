# 나이순 정렬 - 10814

[문제 링크](https://www.acmicpc.net/problem/10814)

### 성능 요약

메모리: 256MB, 시간 2초

### 문제

온라인 저지에 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다. 이때, 회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.

### 입력

첫째 줄에 온라인 저지 회원의 수 N이 주어진다. (1 ≤ N ≤ 100,000)

둘째 줄부터 N개의 줄에는 각 회원의 나이와 이름이 공백으로 구분되어 주어진다. 나이는 1보다 크거나 같으며, 200보다 작거나 같은 정수이고, 이름은 알파벳 대소문자로 이루어져 있고, 길이가 100보다 작거나 같은 문자열이다. 입력은 가입한 순서로 주어진다.

### 출력

첫째 줄부터 총 N개의 줄에 걸쳐 온라인 저지 회원을 나이 순, 나이가 같으면 가입한 순으로 한 줄에 한 명씩 나이와 이름을 공백으로 구분해 출력한다.

### 예제 입력

```
3
21 Junkyu
21 Dohyun
20 Sunyoung
```

### 예제 출력

```
20 Sunyoung
21 Junkyu
21 Dohyun
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

### 해결 3

```js
function Solution(words) {
  const sortedWords = words.sort(
    (a, b) => a.length - b.length || a.localeCompare(b)
  );
  const uniqueWords = new Set(sortedWords);
  console.log(Array.from(uniqueWords).join("\n"));
}

Solution(input);
```

- 코드도 정말 깔끔하고, 압도적인 속도 차이를 보여준다. 메모리는 비록 가장 많이 사용하나, 속도가 20배 정도 빠르다.

#### 사전 순 정렬

##### **localeCompare()**

```js
참조문자열.localeCompare(비교문자열);
```

- 참조 문자열이 비교 문자열보다 앞에 있으면 음수, 그렇지 않으면 양수, 동등하면 0을 반환한다.
- 사전 순으로 배열을 정리해야 하다보니 `sort()`를 안에서 한 번 더 쓸수 없을까 생각했는데, 이 내장 메서드를 이용하면 쉽게 해결할 수 있었다.

#### 중복 제거

```js
const uniqueWords = new Set(sortedWords);
console.log(Array.from(uniqueWords).join("\n"));
```

- 고유값만 배열로 만들기 위해 `Set`을 사용했다.
- Set을 사용한 객체는 유사 배열 객체이므로 `Array.from`을 통해서 얕은 복사를 통해 새로운 배열을 만든다.

</div>
</details>
