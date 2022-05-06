const p = require("fs").readFileSync("./input3.txt").toString().trim();

function Solution(p) {
  const brackets = {
    open: "(",
    close: ")",
  };

  // 균형잡힌 괄호인지 체크하는 함수
  const isBalanced = (p) => {
    let open = 0;
    let close = 0;

    for (let i = 0; i < p.length; i++) {
      if (p[i] === brackets.open) open++;
      else close++;
    }

    return open === close;
  };

  // 올바른 괄호인지 체크하는 함수
  const isCorrect = (p) => {
    const stack = [];

    for (let i = 0; i < p.length; i++) {
      if (p[i] === brackets.open) stack.push(p[i]);
      if (p[i] === brackets.close && stack[stack.length - 1] === brackets.open)
        stack.pop();
    }

    return stack.length === 0;
  };

  // 괄호를 u, v로 나누기
  const seperateBrakets = (p) => {
    for (let i = 0; i < p.length; i++) {
      if (isBalanced(p.slice(0, i + 1)) && isBalanced(p.slice(i + 1))) {
        return [p.slice(0, i + 1), p.slice(i + 1)];
      }
    }
    return [p, ""];
  };

  // 괄호가 올바르지 않다면 변환하기
  const convertBrakets = (p) => {
    if (isCorrect(p)) return p;

    let txt = "";
    const [u, v] = seperateBrakets(p);

    if (isCorrect(u)) {
      return u + convertBrakets(v);
    } else {
      let u2 = u.slice(1, -1).split("").reverse().join("");
      let string = brackets.open + convertBrakets(v) + brackets.close + u2;

      return string;
    }
  };

  const answer = convertBrakets(p);
  console.log(answer);
}

Solution(p);
