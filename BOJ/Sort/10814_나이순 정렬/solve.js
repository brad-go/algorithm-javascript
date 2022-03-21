const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(input) {
  const users = input.reduce((acc, cur, idx) => {
    const [age, name] = cur.split(" ");
    acc.push({ name: name, age: Number(age), join: idx + 1 });
    return acc;
  }, []);

  const sortedUsers = users.sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    }
    if (a.join !== b.join) {
      return a.join - b.join;
    }
    return 0;
  });

  sortedUsers.forEach((user) => {
    console.log(`${user.age} ${user.name}`);
  });
}

Solution(input);
