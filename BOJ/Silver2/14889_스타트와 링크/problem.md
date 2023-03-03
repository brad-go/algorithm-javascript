# 14889. 스타트와 링크

## 문제 링크

https://www.acmicpc.net/problem/14889

## 문제 분류

: 구현, 브루트포스 알고리즘

## 소요 시간

: 1시간

## 풀이 방법

N(짝수)명의 사람들 중에서 팀을 두개로 나눠서 두 팀의 능력치 차이의 최솟값을 찾는 문제였다.

팀을 선택하기 위해 조합 알고리즘을 사용했고, 팀들의 점수를 구하는 것은 반복문을 사용해서 풀 수 있었다. 처음에 시간 초과가 발생했는데, N이 20까지이기 때문에 조합 알고리즘을 사용하면 당연히 그럴 것이라 생각했다.

그러나 상대팀을 구할 때, 구해놓은 팀 조합들을 모두 확인하면서 현재 팀원들이 포함되지 않은 팀을 찾는 방식으로 했었는데, 이것이 문제였다. 이 방법 대신에 전체 멤버들에서 현재 팀원들에 포함되지 않는 멤버들을 구하는 방식으로 바꿨더니 문제 풀이에 성공했다.

## 풀이 코드

```js
const solution = (N, synergies) => {
  // 전체 멤버들
  const members = new Array(N).fill().map((_, index) => index);
  // 구성 가능한 팀 조합들
  const teamCombinations = getCombinations(members, N / 2);

  // 팀 간의 능력치 차이의 최솟값을 담을 변수
  let answer = Number.MAX_SAFE_INTEGER;

  // 구한 팀 조합들을 확인하기
  teamCombinations.forEach((team, index) => {
    // 반 이상은 조회할 필요가 없다. 이미 상대팀으로 다 골라졌을테니까
    if (index > teamCombinations.length / 2) return;

    // 상대팀을 구한다.
    const opposingTeam = findOpposingTeam(team, members);
    // 현재 팀과 상대팀의 능력치를 구한다.
    const teamStatistics = getTeamStatistics(team, synergies);
    const opposingTeamStatistics = getTeamStatistics(opposingTeam, synergies);
    // 두 팀간의 능력치 차이를 계산
    const gap = Math.abs(teamStatistics - opposingTeamStatistics);

    // 최솟값과 비교하면서 더 작다면 갱신해주기
    answer = Math.min(answer, gap);
  });

  return answer;
};

// 구성 가능한 팀을 구하는 조합 알고리즘
const getCombinations = (array, select) => {
  if (select === 1) {
    return array.map((elem) => [elem]);
  }

  const results = [];

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

// 상대 팀 찾기
const findOpposingTeam = (team, members) => {
  // 전체 멤버 중 현재 팀에 포함되지 않는 멤버들을 뽑는다.
  return members.filter((member) => !team.includes(member));
};

// 팀의 능력치를 계산한다.
const getTeamStatistics = (team, synergies) => {
  // 팀의 첫번째 멤버부터 마지막 멤버까지
  return team.reduce((teamStatistics, member, _, origin) => {
    return (
      // 팀 능력치의 멤버 개개인의 능력치를 더하기
      teamStatistics +
      // 나머지 멤버들과의 시너지 점수를 개인 능력치로 더한다.
      origin.reduce((memberStatistics, anotherMember) => {
        return memberStatistics + synergies[member][anotherMember];
      }, 0)
    );
  }, 0);
};
```

## 코드 개선

팀을 구성하는 것에 DFS를 사용하면 훨씬 빠르다. 이 방식은 위의 방식처럼 구한 팀의 반만 확인(어차피 상대팀으로 만나니까)하는 것이 아니라 전부 다 확인하게 된다. 조합 알고리즘도 물론 팀을 구성하는 조합을 구할 때, 모든 팀을 확인하긴 하지만 팀의 시너지를 계산하거나 최솟값을 갱신할 때, 반만 확인하게 되는데 이 코드가 더 훨씬 빠른 것이 이해가 잘 되지 않는다.

```js
const solution = (N, synergies) => {
  let answer = Number.MAX_SAFE_INTEGER;

  const team = [];
  const visited = new Array(N).fill(false);

  const organizeTeam = (start, count) => {
    if (count === N / 2) {
      const opposingTeam = findOpposingTeam(team);
      const teamStatistics = getTeamStatistics(team, synergies);
      const opposingTeamStatistics = getTeamStatistics(opposingTeam, synergies);
      const gap = Math.abs(teamStatistics - opposingTeamStatistics);

      answer = Math.min(answer, gap);
      return;
    }

    for (let i = start; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      team.push(i);
      organizeTeam(i, count + 1);
      team.pop(i);
      visited[i] = false;
    }
  };

  organizeTeam(0, 0);

  return answer;
};

const findOpposingTeam = (team) => {
  const opposingTeam = [];

  for (let i = 0; i < N; i++) {
    if (!team.includes(i)) opposingTeam.push(i);
  }

  return opposingTeam;
};

const getTeamStatistics = (team, synergies) => {
  return team.reduce((teamStatistics, member, _, origin) => {
    return (
      teamStatistics +
      origin.reduce((memberStatistics, anotherMember) => {
        return memberStatistics + synergies[member][anotherMember];
      }, 0)
    );
  }, 0);
};
```
