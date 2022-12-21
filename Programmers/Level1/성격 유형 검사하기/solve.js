const input = require("fs").readFileSync("./input.txt").toString().trim().split("\n"); // prettier-ignore
const survey = input[0].split(" ");
const choices = input[1].split(" ").map(Number);

function solution(survey, choices) {
  const types = ["RT", "CF", "JM", "AN"];

  const personality = types.reduce((acc, type) => {
    type.split("").forEach((char) => (acc[char] = 0));
    return acc;
  }, {});

  choices.forEach((choice, index) => {
    const [disagree, agree] = survey[index];
    const type = choice > 4 ? agree : disagree;

    personality[type] += Math.abs(choice - 4);
  });

  const answer = types
    .map(([a, b]) => {
      return personality[b] > personality[a] ? b : a;
    })
    .join("");

  return answer;
}

console.log(solution(survey, choices));
