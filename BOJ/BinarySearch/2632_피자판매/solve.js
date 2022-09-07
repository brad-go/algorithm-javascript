// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const ORDER_SIZE = Number(input.shift());
const [M, N] = input.shift().split(" ").map(Number);
const pizzaA = input.slice(0, M).map(Number);
const pizzaB = input.slice(M).map(Number);

function solution(ORDER_SIZE, pizzaA, pizzaB) {
  const sizesOfPizzaA = getCountsSumOfSizes(pizzaA, ORDER_SIZE);
  const sizesOfPizzaB = getCountsSumOfSizes(pizzaB, ORDER_SIZE);

  let answer = 0;

  for (let i = 0; i <= ORDER_SIZE; i++) {
    answer += sizesOfPizzaA[i] * sizesOfPizzaB[ORDER_SIZE - i];
  }

  return answer;
}

const getCountsSumOfSizes = (array, orderSize, length = array.length) => {
  const counts = new Array(orderSize + 1).fill(0);
  const maxSize = getMaxSizeOfPizza(array);
  counts[0] = 1;

  if (maxSize <= orderSize) counts[maxSize]++;

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let j = i; j < i + length - 1; j++) {
      sum += array[j % length];

      if (sum > orderSize) break;
      counts[sum]++;
    }
  }

  return counts;
};

const getMaxSizeOfPizza = (array) => {
  return array.reduce((acc, cur) => acc + cur, 0);
};

console.log(solution(ORDER_SIZE, pizzaA, pizzaB));
