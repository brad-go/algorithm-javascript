# 기능개발

## 문제 분류

: 스택, 큐

## 풀이 과정

중요도가 높은 것을 먼저 프린트한다. 그러나 가장 앞에 있는 문서부터 꺼내면서 확인한다. 무조건 우선순위 큐로 풀이하는 문제였다.

1. 요청한 문서인지 확인할 수 있도록 입력받은 우선 순위에 id를 부여해서 객체로 만들어준다.
2. 맨 앞에 문서를 꺼내고 남은 문서와 현재 문서보다 우선 순위를 비교한다.
3. 현재 문서가 우선순위가 가장 높다면 요청한 문서인지 확인한다.
4. 요청한 문서라면 몇번째인지 출력한다.
5. 아니라면 다시 2번부터 반복한다.
6. 현재 문서가 우선순위가 가장 높은 것이 아니라면 문서의 마지막으로 집어넣고, 다시 2번부터 반복한다.

```js
function solution(priorities, location) {
  const documents = priorities.map((prirority, id) => ({ id , prirority })); // prettier-ignore

  const print = (documents, location, depth) => {
    if (!documents.length) return;

    const current = documents.shift();
    // 모든 요소를 체크하면서 현재 문서가 가장 우선 순위가 높은지 체크
    const isPrint = documents.every(({ prirority }) => current.prirority >= prirority); // prettier-ignore

    if (isPrint) {
      // 요청한 문서라면 몇번째 출력인지 반환
      if (current.id === location) return depth;
      // 요청한 문서가 아니라면 하나가 출력되었으니 횟수를 증가시키고 다음 문서부터 다시 시작
      return print(documents, location, depth + 1);
    } else {
      documents.push(current);
      return print(documents, location, depth);
    }
  };

  return print(documents, location, 1);
}
```
