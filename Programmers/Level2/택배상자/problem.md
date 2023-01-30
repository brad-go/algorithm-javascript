# 택배상자

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131704

## 문제 분류

: 스택

## 풀이 과정

1. 문제의 보조 컨테이너로 사용할 스택을 생성한다.
2. 현재 박스의 번호를 나타낼 box, 트럭에 실은 박스의 수를 나타낼 count, order의 현재 인덱스를 나타낼 index를 선언한다.
3. 박스 1부터 총 박스의 개수까지 4-6의 과정을 반복한다.
4. 보조 컨테이너의 맨 마지막이 현재 순서에 맞는 박스라면 꺼내서 트럭에 싣는다.
5. 현재 박스가 순서에 맞는 박스라면 트럭에 싣는다.
6. 아니라면 보조 컨테이너에 박스를 넣는다.
7. 보조 컨테이너에 박스가 남아있다면, 박스를 꺼내 순서에 맞는지 확인한다.
8. 맞다면 트럭에 싣는다.
9. 아니라면 보조 컨테이너 확인을 멈춘다.

## 풀이한 코드

```js
const solution = (order) => {
  // 보조 컨테이너 역할
  const stack = [];

  // 현재 박스 번호
  let box = 1;
  // 트럭에 실은 박스의 수
  let count = 0;
  // 순서가 담긴 배열 order의 현재 위치를 나타낼 index
  let index = 0;

  // 박스 1부터 마지막 박스까지
  while (box <= order.length) {
    // 보조 컨테이너의 맨 마지막 박스가 현재 순서에 맞는 박스라면
    while (stack[stack.length - 1] === order[index]) {
      // 꺼내서 트럭에 싣기
      stack.pop();
      count++;
      index++;
    }

    // 현재에 순서에 맞는 박스라면 트럭에 싣기
    if (box === order[index]) {
      count++;
      index++;
      // 현재 순서에 맞지 않다면 보조 컨테이너에 넣기
    } else {
      stack.push(box);
    }

    box++;
  }

  // 보조 컨테이너에 박스가 남아있다면
  while (stack.length) {
    const current = stack.pop();

    // 꺼낸 박스가 현재 순서에 맞다면 트럭에 싣기
    if (current === order[index]) {
      count++;
      index++;
      // 순서에 맞지 않다면 확인 멈추기
    } else {
      break;
    }
  }

  return count;
};
```

## 코드 개선

```js
const solution = (order) => {
  const stack = [];

  let count = 0;
  let box = 1;

  // 트럭에 실은 박스의 수가 총 박스의 개수보다 적을 때까지만 반복
  while (count < order.length) {
    // 현재 박스가 순서에 맞다면
    if (order[count] === box) {
      box++;
      count++;
      continue;
    }

    // 보조 컨테이너 맨 위의 박스가 현재 순서에 맞는 박스라면
    if (order[count] === stack[stack.length - 1]) {
      stack.pop();
      count++;
      continue;
    }

    // 보조컨테이너 맨 위의 박스가 현재 순서에 맞는 박스보다 큰 번호의 박스라면
    if (order[count] < stack[stack.length - 1]) break;

    // 현재 순서에 맞지 않다면 박스에 보조컨테이너에 넣기
    stack.push(box);
    box++;
  }

  return count;
};
```
