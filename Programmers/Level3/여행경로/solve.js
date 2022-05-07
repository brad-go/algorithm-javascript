const input = JSON.parse(
  require("fs").readFileSync("./input3.txt").toString().trim()
);

function Solution(tickets) {
  let answer = [];
  const route = [];
  const vistied = [];

  tickets.sort();

  const travel = (stopover, count) => {
    route.push(stopover);

    if (count === tickets.length) {
      answer = route;
      return true;
    }

    for (let i = 0; i < tickets.length; i++) {
      const [departure, destination] = tickets[i];

      if (!vistied[i] && departure === stopover) {
        vistied[i] = true;

        if (travel(destination, count + 1)) return true;

        vistied[i] = false;
      }
    }

    route.pop();

    return false;
  };

  travel("ICN", 0);

  console.log(answer);
}

Solution(input);
