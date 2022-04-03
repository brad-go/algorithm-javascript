const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, commands) {
  let answer = "";
  const queue = [];

  commands.forEach((line) => {
    const [command, value] = line.split(" ");

    switch (command) {
      case "push_front":
        queue.unshift(value);
        break;
      case "push_back":
        queue.push(value);
        break;
      case "pop_front":
        answer += `${queue.shift() || -1}\n`;
        break;
      case "pop_back":
        answer += `${queue.pop() || -1}\n`;
        break;
      case "size":
        answer += `${queue.length}\n`;
        break;
      case "empty":
        answer += `${queue.length ? 0 : 1}\n`;
        break;
      case "front":
        answer += `${queue.length ? queue[0] : -1}\n`;
        break;
      case "back":
        answer += `${queue.length ? queue[queue.length - 1] : -1}\n`;
        break;
    }
  });
  console.log(answer.trim());
}

Solution(n, input);
