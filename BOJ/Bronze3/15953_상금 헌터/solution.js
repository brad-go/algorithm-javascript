const filePath = process.platform == "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split("\n"); // prettier-ignore
const t = Number(input[0]);
const ranks = input
  .slice(1)
  .map((line) => line.split(" ").map((value) => Number(value)));

const solution = (t, ranks) => {
  const firstWinners = [1, 3, 6, 10, 15, 21];
  const secondWinners = [1, 3, 7, 15, 31];
  const firstPrizes = [500, 300, 200, 50, 30, 10];
  const secondPrizes = [512, 256, 128, 64, 32];

  const prices = ranks.reduce((acc, cur) => {
    const firstPrize = getPrizeForParticipant(
      firstWinners,
      firstPrizes,
      cur[0]
    );
    const secondPrize = getPrizeForParticipant(
      secondWinners,
      secondPrizes,
      cur[1]
    );
    const totalPrize = (firstPrize + secondPrize) * 10000;

    return (acc += `${totalPrize}\n`);
  }, "");

  return prices.trim();
};

const getPrizeForParticipant = (winners, prizes, rank) => {
  if (rank == 0) {
    return 0;
  }

  let prize = 0;

  for (let i = 0; i < winners.length; i++) {
    if (rank <= winners[i]) {
      prize = prizes[i];
      break;
    }
  }

  return prize;
};

console.log(solution(t, ranks));

/**
 * 1회 - 100명 중 21명
 * 1등: 500 - 1명
 * 2등: 300 - 2명
 * 3등: 200 - 3명
 * 4등: 50 - 4명
 * 5등: 30 - 5명
 * 6등: 10 - 6명
 *
 * 2회 - 64명 중 31명
 * 1등: 512 - 1명
 * 2등: 256 - 2명
 * 3등: 128 - 4명
 * 4등: 64 - 8명
 * 5등: 32 - 16명
 *
 * 두 번의 코드 페스티벌 본선 대회에서 얻을 수 있는 총 상금이 얼마일가?
 * - 1회에서 본선에 진출해서 a등(1 <= a <= 100)등. 단, 진출 못했으면 a = 0
 * - 2회에서 본선에 진출해서 b등(1 <= b <= 64)등. 단, 진출하지 못했다면 b = 0
 *
 * 이러한 가정 하에서 받을 수 있는 총 상금은?
 */
