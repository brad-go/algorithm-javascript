# 여행 경로

## 문제 분류

: DFS/BFS

## 문제 설명

주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.

항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

## 제한 사항

- 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
- 주어진 공항 수는 3개 이상 10,000개 이하입니다.
- tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
- 주어진 항공권은 모두 사용해야 합니다.
- 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
- 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

## 입출력 예

| tickets                                                                         | return                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------ |
| [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]                                | ["ICN", "JFK", "HND", "IAD"]               |
| [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]] | ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] |

## 입출력 예 설명

### 입출력 예 #1

["ICN", "JFK", "HND", "IAD"] 순으로 방문할 수 있습니다.

### 입출력 예 #2

["ICN", "SFO", "ATL", "ICN", "ATL", "SFO"] 순으로 방문할 수도 있지만 ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] 가 알파벳 순으로 앞섭니다.

<br />

<details><summary><b>문제 풀이</b></summary><div markdown="1">

```js
const input = JSON.parse(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(tickets) {
  const answer = [];

  // 티켓 찾기
  const findTicket = (destination) => {
    const currentTickets = [];

    // 티켓 중에 입력받은 도착지가 출발지와 같은 경우 현재 티켓 후보에 추가
    tickets.forEach((ticket) => {
      if (ticket[0] === destination) currentTickets.push(ticket);
    });

    return currentTickets.sort()[0];
  };

  // 티켓 소모하기
  const useTicket = (ticket) => {
    tickets.splice(tickets.indexOf(ticket), 1);
  };

  // 여행 가기
  const travel = (destination) => {
    if (tickets.length < 1) return;

    // 현재 티켓 찾기
    const currentTicket = findTicket(destination);
    // 티켓 소모
    useTicket(currentTicket);
    // 경유지 추가
    answer.push(currentTicket[1]);

    travel(currentTicket[1]);
  };

  // 시작 티켓 찾아서 경로에 추가 및 소모
  const departTicket = findTicket("ICN");
  useTicket(departTicket);
  answer.push(departTicket[0], departTicket[1]);
  travel(departTicket[1]);

  console.log(answer);
}

Solution(input);
```

나름 코드를 예쁘게 잘 짰다고 생각했는데, 테스트 케이스 네 개 중 2개밖에 통과하지 못했다.
입출력 예에서 주어진 티켓들은 알파벳 순서로 정렬만 잘해주면 경로 실패 없이 잘 해결할 수 있는 케이스였다.
같은 것이 두번씩 주어지거나 경로를 잘 짜지 않으면 모든 지점을 경유할 수 없는 테스트 케이스가 주어지면 위 코드는 실패한다.

### Solution

```js
function Solution(tickets) {
  let answer = [];
  // 여행 경로를 담을 배열
  const route = [];
  // 방문 표시
  const vistied = [];

  // 티켓을 정렬해준다.
  tickets.sort();

  // dfs 시작
  const travel = (stopover, count) => {
    // 경로에 경유지 추가
    route.push(stopover);

    // 티켓 개수만큼 여행을 했다면 티켓을 모두 소모했다는 것이므로 종료
    if (count === tickets.length) {
      answer = route;
      return true;
    }

    // 티켓 개수만큼 반복하면서
    for (let i = 0; i < tickets.length; i++) {
      const [departure, destination] = tickets[i];

      // 방문하지 않았고, 경유지가 티켓의 출발지와 같다면
      if (!vistied[i] && departure === stopover) {
        // 방문처리
        vistied[i] = true;

        // 모든 경유지를 다 경유하고 참을 반환하면 종료
        if (travel(destination, count + 1)) return true;

        // 아니라면 방문처리 취소
        vistied[i] = false;
      }
    }

    // 경유지에서 제거
    route.pop();

    return false;
  };

  travel("ICN", 0);

  console.log(answer);
}

Solution(input);
```

</div></details>
