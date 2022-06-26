# 로또의 최고 순위와 최저 순위

## 문제 분류

: 해쉬

## 풀이 과정

시간을 생각하지 않는다면, 비교를 통해서도 문제를 해결할 수 있겠지만 문제의 입력값이 100,000까지 갈 수 있기 때문에 선형 탐색을 하며 참가자 명단과 완주자 명단을 직접 비교하는 것은 시간 초과가 나게 된다.

즉, 검색과 저장을 빠르게 하기 위해 해시 알고리즘을 사용해야 한다.

1. 참가자들의 정보를 담을 객체 player 생성
2. 참가자의 수 만큼 반복하면서 참가자의 이름을 key로, value는 해당 이름을 가진 선수의 수를 담는다. (동명이인이 있을 수 있기에)
3. 완주자의 수만큼 반복하면서 player 객체에 키에 해당하는 이름을 만나면 value를 1씩 줄인다.
4. 단 한명만이 통과하지 못했으므로, player 객체를 순회하면서 value가 1인 것을 반환한다.

## Solution

for문이 세번이나 들어갔지만 개선된 코드들보다 빠른 성능을 보였다. 반복문이 세번이라 더 오래걸릴 것 같았는데, 왜지?

```js
function solution(participant, completion) {
  const player = {};

  for (let i = 0; i < participant.length; i++) {
    player[participant[i]] = (player[participant[i]] || 0) + 1;
  }

  for (let i = 0; i < completion.length; i++) {
    player[completion[i]]--;
  }

  for (let i = 0; i < participant.length; i++) {
    if (player[participant[i]]) return participant[i];
  }
}
```

## Solution 개선

### 1. for문을 하나로 합친 코드

```js
function solution(participant, completion) {
  let answer = "";
  const player = {};

  for (let i = 0; i < participant.length; i++) {
    player[participant[i]] = (player[participant[i]] || 0) + 1;
    player[completion[i]] = (player[completion[i]] || 0) - 1;
  }

  participant.forEach((person) => {
    if (player[person]) {
      answer = person;
    }
  });

  return answer;
}
```

### Map 객체를 이용한 코드

가독성이 가장 뛰어난 것 같다.

```js
function solution(participant, completion) {
  const player = new Map();

  for (let i = 0; i < participant.length; i++) {
    const p = participant[i];
    const c = completion[i];

    player.set(p, (player.get(p) || 0) + 1);
    player.set(c, (player.get(c) || 0) - 1);
  }

  for (let [name, count] of player) {
    if (count > 0) return name;
  }
}
```

### find를 이용한 코드

|과 ||가 무슨 차이인가 싶을 수 있다. 하지만 이 코드에서 ||을 사용하면 틀린 값이 나오게 된다.

- | : 앞이 참이어도 뒤까지 검사
- || : 앞이 참이면 뒤는 보지 않음

```js
function solution(participant, completion) {
  const players = completion.map(
    (player) => (completion[player] = (completion[player] | 0) + 1)
  );

  return participant.find((player) => !completion[player]--, players);
}
```
