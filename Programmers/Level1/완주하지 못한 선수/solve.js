const participant = ["mislav", "stanko", "mislav", "ana"];
const completion = ["stanko", "ana", "mislav"];

function solution(participant, completion) {
  const player = new Map();

  for (let i = 0; i < participant.length; i++) {
    const p = participant[i];
    const c = completion[i];

    player.set(p, (player.get(p) || 0) + 1);
    player.set(c, (player.get(c) || 0) - 1);
  }

  for (let [name, count] of player) {
    if (count > 0) return name;
  }
}

console.log(solution(participant, completion));
