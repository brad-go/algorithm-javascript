# 빛의 경로 사이클

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/152996

## 문제 분류

: 해쉬

## 풀이 과정

반복문을 풀이하려고 했지만, 시간 초과가 나서 다른 방법을 찾아야 했다. 해결책은 다음과 같다.

- 비례식을 이용한다.

x가 무게,

```
x : y = a : b
```

이 식을 이용해서 아래의 식을 도출할 수 있다.

```
y = (x * b) / a
```

- 비례식에 사용될 비율을 구한다.

시소의 좌석의 위치가 정해져있기 때문에, 각 토크의 크기(시소의 축과 좌석과의 거리 \* 몸무게) 비율은 정해져 있다.

```
1 : 1, 2 : 3, 2 : 4, 3 : 4
```

- 객체의 key를 이용한다.

입력값이 100,000개 이상이기 때문에 반복문으로 풀이할 수 없다. 객체의 key를 이용해서 각 무게 값을 키로 해서 객체에 저장한다.
각 토크를 순회하면서 이미 키로 저장된 무게값을 만나면 시소 짝꿍이다.

1. weights 배열을 내림차순으로 정렬해준다.
2. 빈 객체 store를 선언한다.
3. weights를 반복하면서 아래의 코드를 수행한다.
4. rates를 반복하면서 현재 무게를 비율 별로 증가시키면서 객체의 키가 존재하는지 확인하고, 키가 있다면 값만큼 시소 짝꿍의 수를 증가시킨다.
5. 현재 무게가 객체의 키로 있다면 해당 값을 1 증가시키고, 아니라면 1로 값을 넣는다.

## 풀이 코드

```js
const solution = (weights) => {
  const sorted = [...weights].sort((a, b) => b - a);
  const rates = [
    [1, 1],
    [2, 3],
    [2, 4],
    [3, 4],
  ];
  const store = {};

  let answer = 0;

  sorted.forEach((weight) => {
    rates.forEach(([a, b]) => {
      const key = (weight * b) / a;

      answer += store[key] || 0;
    });
    store[weight] = (store[weight] || 0) + 1;
  });

  return answer;
};
```
