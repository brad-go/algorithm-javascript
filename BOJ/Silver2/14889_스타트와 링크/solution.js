const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const synergies = input.slice(1).map((str) => str.split(" ").map(Number));

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

console.log(solution(N, synergies));
