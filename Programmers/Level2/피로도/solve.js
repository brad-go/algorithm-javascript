const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const k = +input[0];
const dungeons = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (k, dungeons) => {
  const visited = new Array(dungeons.length).fill(false);
  let maxCount = 0;

  const exploreDungeon = (fatigue, count) => {
    maxCount = Math.max(maxCount, count);

    dungeons.forEach(([requireFatigue, consumeFatigue], index) => {
      if (visited[index] || fatigue < requireFatigue) {
        return;
      }

      visited[index] = true;
      exploreDungeon(fatigue - consumeFatigue, count + 1);
      visited[index] = false;
    });
  };

  exploreDungeon(k, 0);
  return maxCount;
};

console.log(solution(k, dungeons));
