const array = [1, 2, 3, 4, 5];
const targetSum = 9;

const meetInTheMiddle = (array, targetSum) => {
  // 배열의 길이를 절반으로 나누어서 중간 지점 'half'를 계산하고, 왼쪽과 오른쪽으로 나눈다.
  const leftSums = generateSums(array.slice(0, Math.floor(half)));
  const rightSums = generateSums(array.slice(Math.floor(half)));

  // 왼쪽 부분합이 담긴 배열을 탐색
  const validPairs = leftSums.reduce((acc, cur) => {
    const target = targetSum - cur;

    // targetSum - 부분합이 오른쪽 부분합이 있는지 확인하기
    if (rightSums.includes(target)) {
      // 유효한 조합이라면 추가하기
      acc.push([cur, target]);
    }

    return acc;
  }, []);

  return validPairs;
};

// 하위 합을 생성하는 역할을 하는 함수. 주어진 배열에서 가능한 모든 부분합을 생성한다.
const generateSums = (array) => {
  const sums = [[]];

  array.forEach((num) => {
    const newSums = sums.map((subsum) => [...subsum, num]);

    sums.push(...newSums);
  });

  return sums.map((subsum) => subsum.reduce((acc, val) => acc + val, 0));
};

const result = meetInTheMiddle(array, targetSum);

console.log(result);
