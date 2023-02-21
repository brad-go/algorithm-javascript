const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...straws] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number); // prettier-ignore

const solution = (N, straws) => {
  const sorted = quickSort(straws);

  let answer = 0;

  for (let i = 0; i < N - 2; i++) {
    if (sorted[i] >= sorted[i + 1] + sorted[i + 2]) continue;

    const sum = sorted[i + 2] + sorted[i + 1] + sorted[i];

    if (answer > sum) break;

    answer = sum;
  }

  return answer ? answer : -1;
};

const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left >= right) return array;

  const pivot = partition(array, left, right);

  if (left < pivot - 1) quickSort(array, left, pivot - 1);
  if (pivot < right) quickSort(array, pivot, right);

  return array;
};

const partition = (array, left, right) => {
  const pivot = array[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (array[left] > pivot) left++;
    while (array[right] < pivot) right--;

    if (left <= right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }

  return left;
};

console.log(solution(N, straws));
