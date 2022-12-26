# 가장 큰 수

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42746

## 문제 분류

: 정렬

## 풀이 과정

자리수마다 보고 판단하기에 기수 정렬을 이용해서 풀이해보려고 했는데, 제대로 구현하지 못했다. 그래서 그냥 sort()를 이용해서 풀이해보려고 했는데, 각 자릿수마다 나눠서 풀이하려고 하니 쉽지 않았다. 앞 자릿수가 같은 경우 뒷자릿수를 비교해야 하는데, 뒷자리가 없는 수와 비교하면 0이상인 경우는 뒤로 0인 경우는 앞으로 배치시켜야 했기 때문이다.

그러나 다른 풀이가 있었다. 뒤에 자리와 앞자리를 문자화한 뒤 순서를 바꿔 더해서 풀이하면 된다.

1. a와 b를 문자열화 한다.
2. a를 a + b로, b를 b + a를 만들어 정수로 변환해서 비교한다. (이렇게 함으로 각 자릿수마다 비교가 필요하지 않다)
3. 문자열로 만들어서 반환

```js
const numbers = [3, 30, 34, 5, 9];

function solution(numbers) {
  const answer = numbers.sort(customSortFunction).join("").replace(/(^0+)/, 0); // 0으로 이루어진 배열인 경우 0을 반환
  return answer;
}

const customSortFunction = (a, b) => {
  const compareA = parseInt(a.toString() + b.toString());
  const compareB = parseInt(b.toString() + a.toString());

  return compareB - compareA;
};

console.log(solution(numbers));
```

## 코드 개선

### Refactor 1

간결하고 깔끔한 코드!

```js
function solution(numbers) {
  const answer = numbers.sort((a, b) => `${b}${a}` - `${a}${b}`).join("");
  return answer[0] === "0" ? "0" : answer;
}
```

### Refactor 2

- 입력이 1,000이하여서 가능하다.
- 대소를 비교하지 않기 때문에 위에것들보다 5배정도 빠르다. (radix sort 기반)

```js
function solution(numbers) {
  const buckets = [];

  for (const number of numbers) {
    const current = number.toString();
    const length = current.length;

    let bucketsIndex = "";
    // 모든 수를 4자리 수로 만들어준다. 3 -> 3333, 34 -> 3434
    for (let index = 0; index < 4; index++) {
      bucketsIndex += current[length > index ? index : index % length];
    }
    bucketsIndex = 9999 - bucketsIndex; // 숫자가 큰 것부터 정렬할 것이기에, 입력의 수가 1000이하이기 때문에

    buckets[bucketsIndex] = buckets[bucketsIndex]
      ? buckets[bucketsIndex] + current
      : current;
  }

  const answer = buckets.join``;

  return answer[0] === "0" ? "0" : answer;
}
```
