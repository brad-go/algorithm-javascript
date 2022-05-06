const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const numbers = input[0].split(" ").map((v) => +v);
const target = Number(input[1]);

function Solution(numbers, target) {
  const selected = new Array(numbers.length);
  let answer = 0;

  // 부분 집합을 이용해서 해결하기
  const subset = (cnt) => {
    // cnt가 numbers의 길이만큼 커지면 함수 종료
    if (cnt === numbers.length) {
      // 결과 저장
      let result = "";

      for (let i = 0; i < numbers.length; i++) {
        // 방문한 곳이면 숫자 그대로 방문하지 않은 곳이면 -1을 곱해서 저장
        result += selected[i] ? numbers[i] + " " : -numbers[i] + " ";
      }

      // 한 줄로 이루어진 숫자들을 더해준다.
      const total = result
        .trim()
        .split(" ")
        .map((v) => +v)
        .reduce((acc, cur) => acc + cur, 0);

      // target과 값이 같다면 target으로 만드는 방법 증가
      if (total === target) answer++;
      return;
    }

    // 방문한 곳 표시
    selected[cnt] = true;
    // 카운트를 1증가시켜 재귀함수 실행
    subset(cnt + 1);
    // 방문하지 않은 상태에서도 실행
    selected[cnt] = false;
    // 카운트를 1증가시켜 재귀함수 실행
    subset(cnt + 1);
  };

  subset(0);
  console.log(answer);
}

Solution(numbers, target);
