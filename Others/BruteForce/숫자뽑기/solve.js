const [N, R] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(N, R) {
  const arr = new Array(N).fill().map((_, idx) => idx + 1);
  const selected = new Array(N);
  const nums = new Array(R);

  // 서로 다른 N개의 원소에서 R개를 중복없이 순서에 상관있게 선택하는 혹은 나열하는 것을 순열(permutation)이라고 함
  // const perm = (cnt) => {
  //   if (cnt === R) {
  //     console.log(nums);
  //     return;
  //   }

  //   for (let i = 0; i < N; i++) {
  //     if (selected[i]) continue;

  //     selected[i] = true;
  //     nums[cnt] = arr[i];
  //     perm(cnt + 1);
  //     selected[i] = false;
  //   }
  // };

  // perm(0);

  // 서로 다른 N개의 원소를 가지는 어떤 집합 에서 순서에 상관없이 R개의 원소를 선택하는 것
  // const comb = (cnt, start) => {
  // if (cnt === R) {
  //   console.log(nums);
  //   return;
  // }

  // for (let i = start; i < N; i++) {
  //   if (selected[i]) continue;

  //   selected[i] = true;
  //   nums[cnt] = arr[i];
  //   comb(cnt + 1, i);
  //   selected[i] = false;
  // }
  // };

  // comb(0, 0);

  // 부분집합 - 모든 숫자의 경우의 수

  // Solution 1
  const subset = (cnt, start) => {
    if (cnt === R) {
      console.log(nums);
      return;
    }

    for (let i = start; i < N; i++) {
      if (selected[i]) continue;

      selected[i] = true;
      nums[cnt] = arr[i];
      subset(cnt + 1, i);
      selected[i] = false;
    }
  };

  for (let i = 0; i <= N; i++) {
    R = i;
    const nums = new Array(R);
    subset(0, 0);
  }

  // Solution 2
  // const subset = (cnt) => {
  //   if (cnt === N) {
  //     let result = "";
  //     for (let i = 0; i < N; i++) {
  //       result += selected[i] ? arr[i] + " " : "X" + " ";
  //     }
  //     console.log(result);
  //     return;
  //   }

  //   selected[cnt] = true;
  //   subset(cnt + 1);
  //   selected[cnt] = false;
  //   subset(cnt + 1);
  // };

  // subset(0);
}

Solution(N, R);
