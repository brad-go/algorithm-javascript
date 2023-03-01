# 1525. 퍼즐

## 문제 링크

https://www.acmicpc.net/problem/1525

## 문제 분류

: 구현, 너비 우선 탐색

## 소요 시간

: 아주 많이

## 풀이 방법

메모리 제한이 32MB여서 풀 수 있을까 싶었는데, 결국 실패했다. 큐를 직접 구현해보기도 하고, index를 사용해서 shift() 메서드를 사용하지 않기도 해보고, subqueue를 만들어서 반복을 해보기도 하고 했지만, 모두 메모리 초과나 시간 초과가 났다.

일단 테스트 케이스에서는 모두 통과하는 것 같아서 로직이 잘못된 것 같지는 않다. 추후 해결 방법을 더 고민해보려고 한다.

이 문제의 핵심은 2차원 배열을 문자열로 나타내는 것이었다. 메모리 제한을 이겨내기 위해 2차원 배열의 각 인덱스를 문자열의 인덱스로 바꾸고, BFS 탐색을 통해서 문제를 풀이하려고 했다.

1. 퍼즐의 상태를 한줄의 문자열로 입력받는다.
2. 방문 처리를 하고 큐에 넣어준다.
3. BFS 탐색을 진행한다.
4. 현재 보드에서 0의 인덱스를 찾아 2차원 배열일 때의 좌표값으로 만든다.
5. 현재 보드가 123456780이라면 성공이므로 퍼즐을 바꿔본 횟수를 출력한다.
6. 구한 좌표 값으로 사방탐색을 진행한다.
7. 범위를 벗어나지 않는다면 퍼즐을 이동시켜본다.
8. 2차원 배열의 좌표를 문자열의 인덱스로 변환해서 해당 문자를 서로 바꾼다.
9. 바꾼 보드가 이미 방문했던 보드라면 건너뛰기
10. 그렇지 않다면 방문 처리를 하고 큐에 넣어 계속 탐색을 진행한다.
11. 큐가 빌때까지 성공하지 못했다면 -1을 반환한다.

## 풀이 코드

```js
const solution = (board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const queue = [[board, 0]];
  const visited = new Set();

  visited.add(board);

  while (queue.length) {
    const [currentBoard, count] = queue.shift();
    const [r, c] = findBlankIndicies(currentBoard);

    if (currentBoard === "123456780") return count;

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInBoard(nr, nc)) continue;

      const newBoard = moveBoard(currentBoard.split(""), r, c, nr, nc);

      if (visited.has(newBoard)) continue;

      visited.add(newBoard);
      queue.push([newBoard, count + 1]);
    }
  }

  return -1;
};

const findBlankIndicies = (board) => {
  const index = board.indexOf("0");

  return [Math.floor(index / 3), index % 3];
};

const isInBoard = (r, c) => 0 <= r && r < 3 && 0 <= c && c < 3;

const moveBoard = (board, r, c, nr, nc) => {
  const fromIndex = getStringIndex(r, c);
  const toIndex = getStringIndex(nr, nc);

  [board[fromIndex], board[toIndex]] = [board[toIndex], board[fromIndex]];

  return board.join("");
};

const getStringIndex = (r, c) => r * 3 + c;
```
