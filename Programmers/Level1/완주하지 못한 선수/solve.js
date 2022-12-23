const [participant, completion] = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ')); // prettier-ignore

const solution = (participant, completion) => {
  const players = participant.reduce((acc, name, index) => {
    acc[name] = (acc[name] || 0) + 1;
    acc[completion[index]] = (acc[completion[index]] || 0) - 1;

    return acc;
  }, {});

  return Object.keys(players).find((name) => players[name] > 0);
};

console.log(solution(participant, completion));
