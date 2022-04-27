const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const increaseDP = new Array(n).fill(1);
  const decreaseDP = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j])
        increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
    }
  }

  for (let i = n - 2; i > 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] > arr[j])
        decreaseDP[i] = Math.max(decreaseDP[i], decreaseDP[j] + 1);
    }
  }

  const dp = increaseDP.map((item, idx) => item + decreaseDP[idx] - 1);
  console.log(Math.max(...dp));
}

Solution(n, input);

// Solution 2

function Solution(n, arr) {
  const [increaseDP, decreaseDP] = Array.from(Array(2), () => Array(n).fill(1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (arr[i] > arr[j])
        increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
      if (arr[n - 1 - i] > arr[n - 1 - i + j])
        decreaseDP[n - 1 - i] = Math.max(
          decreaseDP[n - 1 - i],
          decreaseDP[n - 1 - i + j] + 1
        );
    }
  }

  const dp = increaseDP.map((item, idx) => item + decreaseDP[idx] - 1);
  console.log(Math.max(...dp));
}

Solution(n, input);
