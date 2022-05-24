const [N, K] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(START, END) {
  // const bfs = (START, END) => {
  //   const MAX_POS = 100000;
  //   const q = [[START, 0]];
  //   const visited = Array(MAX_POS + 1).fill(false);

  //   while (q.length) {
  //     const [pos, time] = q.shift();

  //     if (visited[pos]) continue;
  //     visited[pos] = true;

  //     if (pos === END) {
  //       console.log(time);
  //       return;
  //     }

  //     if (pos * 2 <= MAX_POS) q.push([pos * 2, time + 1]);
  //     if (pos + 1 <= MAX_POS) q.push([pos + 1, time + 1]);
  //     if (pos - 1 >= 0) q.push([pos - 1, time + 1]);
  //   }
  // };

  // bfs(START, END);
  if (START > END) return console.log(START - END);

  const dp = new Array(END + 1).fill(0);

  for (let i = 0; i < START; i++) {
    dp[i] = START - i;
  }

  for (let i = START + 1; i <= END; i++) {
    const PREV = dp[i - 1];
    const HALF_L = dp[i / 2];
    const HALF_R = dp[(i + 1) / 2];

    if (i % 2 === 0) {
      dp[i] = Math.min(PREV + 1, HALF_L + 1);
      continue;
    }

    if (HALF_L < HALF_R) dp[i] = Math.min(PREV + 1, HALF_L + 2);
    else dp[i] = Math.min(PREV + 1, HALF_R + 2);
  }

  console.log(dp[END]);
}

Solution(N, K);
