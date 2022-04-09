const n = Number(require("fs").readFileSync("./input.txt").toString().trim());

// 기존 풀이
function Solution(n) {
  let count = 0;
  while (n !== 1) {
    if (n % 5 === 1) {
      n -= 1;
      count++;
    } else if (n % 5 === 0) {
      n /= 5;
      count++;
    } else if (n % 3 === 0) {
      n /= 3;
      count++;
    } else if (n % 2 === 0) {
      n /= 2;
      count++;
    }
  }
  console.log(count);
}

Solution(n);
