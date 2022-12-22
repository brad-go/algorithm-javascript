# 두 큐 합 같게 만들기

## 문제 분류

큐, 투 포인터

## 문제 링크

2022 KAKAO TECH INTERNSHIP

https://school.programmers.co.kr/learn/courses/30/lessons/118667

## 풀이 아이디어

두 큐의 합이 무조건 같아질 수 있다고 생각하고 구현한다면 기본적인 로직은 아래와 같다.

1. `두 큐의 원소의 합 / 2` 를 통해 두 큐의 합이 같아지는 기준값 구하기
2. 큐의 합이 기준값보다 큰 쪽에서 원소를 빼고, 다른 쪽 큐에 원소를 넣어주기
3. count 증가시키기
4. 값이 같아질 때까지 반복

### 탈출 조건 구하기

그렇지만 두 큐의 합이 같아질 수 없는 상황도 있다. 그러므로 탈출 조건이 필요하다.
거기다가 큐의 길이는 300,000까지 이기 때문에 적절한 방법을 생각해야 한다.
처음에는 조합을 통해서 탈출 조건을 구하려고 했지만, 당연히 시간 초과 때문에 구할 수 없었다.

그렇다면 어떤 탈출 조건이 있을까? 간단하게 두 큐 사이에서 원소가 이동하는 최악의 경우를 생각해보자.
한쪽 큐에서 모든 원소가 이동하고, 다른쪽 큐에서도 하나의 원소를 제외한 모든 원소가 이동하는 경우이다.

**그러므로 최대 count 수는 queue1의 길이(= queue2의 길이) \* 3이 된다.**

### 시간 초과 해결하기

자바스크립트에는 큐가 구현되어 있지 않다. 직접 큐를 구현할 수도 있지만, 문제를 해결할 수 있는
다른 방법을 생각해보는 것이 좋을 것 같다.

이 문제를 해결할 수 있는 좋은 방법은 **투 포인터(다중 포인터)** 알고리즘 방식을 사용하는 것이다. `shift()`, `push()` 등을 이용해 직접 원소를 이동한다면 많은 연산 비용을 사용하게 되어 시간초과가 나게 되기 때문이다. 투 포인터 방식을 사용하여 구현한다면, 인덱스 값을 이동하는 것뿐이니 다른 불필요한 연산을 줄일 수 있다.

그러므로 다음과 같은 방식으로 문제를 해결할 수 있다.

```md
1. 최대 반복 횟수(queue1의 길이 \* 3) 만큼 반복
2. queue1의 총합과 기준값을 비교해 두가지 상황으로 나뉘어진다.
   if queue1의 총합이 기준값보다 큰 경우

   1. queue1의 pointer 값을 높이기
   2. queue1의 pointer가 가리키는 값 총합에서 빼주기

   else if queue1의 총합이 기준값보다 작은 경우

   3. queue2의 pointer 값을 높이기
   4. queue2의 pointer가 가리키는 값 총합에서 더해주기

3. 2를 반복하면서 count값을 구한다.
```

### 풀이한 코드

```js
const solution = (queue1, queue2) => {
  // 두 포인터를 이용
  let pointer1 = 0;
  let pointer2 = queue1.length;

  // 하나의 큐로 만들기
  const queue = [...queue1, ...queue2];
  const queueSum = queue.reduce((total, element) => total + element, 0);
  // 기준값 구하기
  const target = queueSum / 2;
  // 최대 반복 횟수 구하기
  const maxCount = queue1.length * 3;

  let queue1Sum = sum(queue1);

  for (let count = 0; count < maxCount; count++) {
    // 한쪽 큐의 값이 기준값과 같아진다면
    if (queue1Sum === target) {
      return count;
    }

    // 한쪽 큐의 합이 기준값보다 크다면
    if (queue1Sum > target) {
      // 한쪽 큐의 합에서 pointer1이 가리키는 큐의 값 빼주기
      queue1Sum -= queue[pointer1++];
      // 한쪽 큐의 합이 기준값보다 작다면
    } else {
      // 한쪽 큐의 합에서 pointer2가 가리키는 큐의 값 더해주기
      queue1Sum += queue[pointer2++];
    }
  }

  // 두 큐의 합이 같아질 수 없다면
  return -1;
};

const sum = (array) => array.reduce((total, element) => total + element, 0);
```
