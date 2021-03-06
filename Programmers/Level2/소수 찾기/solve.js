const input = require("fs").readFileSync("./input.txt").toString().trim();

// 내 코드

function Solution(numbers) {
  // 소수 판별함수
  const isPrime = (num) => {
    if (num < 2) return false;

    for (let i = 2; i < Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const primeNums = [];
  const selected = new Array(numbers.length).fill(false);
  const nums = [];

  // 각 수를 쪼개고 조합해서 소수인지 체크하기
  const perm = (cnt, max) => {
    // 지정한 자릿수에 도달하면 소수인지 판별하고 소수라면 배열에 넣고 종료
    if (cnt === max) {
      const num = Number(nums.join(""));
      console.log(num);
      if (isPrime(num) && primeNums.indexOf(num) === -1) primeNums.push(num);
      return;
    }

    // 숫자를 하나씩 순서에 상관없이 뽑기
    for (let i = 0; i < numbers.length; i++) {
      if (selected[i]) continue;

      selected[i] = true;
      nums[cnt] = numbers[i];
      perm(cnt + 1, max);
      selected[i] = false;
    }
  };

  // 반복문을 통해 자리수 지정
  for (let i = 1; i <= numbers.length; i++) {
    perm(0, i);
  }

  console.log(primeNums.length);
}

Solution(input);

// 다른 풀이

// function solution(numbers) {
//   var answer = 0;

//   var n = numbers.split("");
//   var nums = new Set();
//   combi(n, "");

//   function combi(a, s) {
//     if (s.length > 0) {
//       if (nums.has(Number(s)) === false) {
//         nums.add(Number(s));
//         console.log(Number(s));
//         console.log(nums);
//         if (chkPrime(Number(s))) {
//           answer++;
//         }
//       }
//     }
//     if (a.length > 0) {
//       for (var i = 0; i < a.length; i++) {
//         var t = a.slice(0);
//         t.splice(i, 1);
//         //console.log(t)
//         combi(t, s + a[i]);
//       }
//     }
//   }

//   function chkPrime(num) {
//     if (num < 2) return false;
//     if (num === 2) return true;
//     for (var i = 2; i <= Math.sqrt(num); i++) {
//       if (num % i === 0) return false;
//     }
//     return true;
//   }

//   console.log(answer);
// }

// solution(input);
