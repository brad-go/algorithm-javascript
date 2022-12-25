# 다리를 지나는 트럭

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42583

## 문제 분류

: 스택, 큐

## 풀이 과정

트럭이 일직선 다리를 순서대로 건넌다고 했으니, 큐를 사용해서 풀이해야 했다.
현재 다리를 건너는 트럭의 상태를 큐로 나타냈다.

1. 다리를 첫번째 트럭부터 건너기 시작 (큐에 첫번째 트럭을 집어넣는다)
2. 큐가 빌때까지 다음을 반복한다.
3. 큐의 첫번째인 가장 앞에 있는 트럭을 고른다.
4. 가장 앞 트럭이 다리를 끝까지 건넜다면 큐에서 제거한다.
5. 다리위에 있는 트럭들의 진행도를 증가시키고 시간을 1초 증가시킨다.
6. 다음 트럭이 있고, 현재 다리 위 트럭들의 무게 + 다음 트럭의 무게가 다리의 하중보다 작거나 같고, 다리에 최대로 올라갈 수 있는 트럭수보다 현재 다리 위 트럭의 수가 적다면 새 트럭을 큐에 집어넣는다.
7. 시간을 반환한다.

```js
function solution(bridge_length, weight, truck_weights) {
  const firstTruck = { weight: truck_weights.shift(), progress: 1 };
  const q = [firstTruck];
  let time = 1;

  while (q.length) {
    let currentTruck = q[0]; // 가장 앞에 있는 트럭
    // 가장 앞트럭이 다리 끝까지 건넜다면 큐에서 제거
    if (currentTruck.progress === bridge_length) q.shift();
    for (let truck of q) truck.progress++; // 트럭들을 앞으로 한칸씩 이동
    time++;

    let currentWeight = q.reduce((acc, cur) => acc + cur.weight, 0);
    let currentTruckCount = q.length;
    let nextTruckWeight = truck_weights[0];

    if (
      truck_weights.length && // 다음 트럭이 있고
      currentWeight + nextTruckWeight <= weight && // 현재 다리 위 트럭들의 무게 + 다음 트럭의 무게가 다리의 하중보다 작거나 같다면
      currentTruckCount < bridge_length // 다리에 최대로 올라갈 수 있는 트럭의 수보다 적다면
    ) {
      const newTruck = { weight: truck_weights.shift(), progress: 1 };
      q.push(newTruck);
    }
  }

  return time;
}
```

## 코드 개선

시간을 점프하는 아이디어를 가진 코드를 봤다. 정말 놀랍다!! 시간이 100배정도 빨라진다...

- 시간을 일일히 증가시킬 필요없이 현재 시간과 나갈 시간을 비교하는 아이디어
- 트럭이 못 올라올 상황이면 시간을 빨리 흘러가게 점프하는 아이디어

```js
function solution(bridge_length, weight, truck_weights) {
  const q = [{ weight: 0, passTime: 0 }]; // 현재 다리 상태를 나타낼 큐

  let time = 0;
  let weightOnBridge = 0; // 다리 위 트럭의 무게

  while (q.length > 0 || truck_weights.length > 0) {
    // 맨 앞 트럭이 나갈 시간이 되면 다리에서 제거하고, 다리 위 트럭들의 무게에서 빼준다.
    if (q[0].passTime === time) weightOnBridge -= q.shift().weight;

    let nextTruckWeight = truck_weights[0];

    // 다리가 버틸 수 있는 하중보다 현재 다리 위 트럭들과 다음 트럭의 무게의 합이 작거나 같다면
    if (weightOnBridge + nextTruckWeight <= weight) {
      weightOnBridge += nextTruckWeight;
      q.push({ weight: truck_weights.shift(), passTime: time + bridge_length });
    } else {
      const firstTruck = q[0];
      // 다음 트럭이 못 올라올 상황이면 큐의 첫번째 트럭이 빠지도록 그 시간으로 점프
      if (firstTruck) time = firstTruck.passTime - 1; // 밑에서 시간을 1 더하기 때문에 미리 빼준다.
    }

    time++;
  }

  return time;
}
```
