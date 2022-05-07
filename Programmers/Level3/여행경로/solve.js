const input = JSON.parse(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(tickets) {
  const answer = [];

  const findTicket = (destination) => {
    const currentTickets = [];

    // 티켓 중에 입력받은 도착지가 출발지와 같은 경우 현재 티켓 후보에 추가
    tickets.forEach((ticket) => {
      if (ticket[0] === destination) currentTickets.push(ticket);
    });

    return currentTickets.sort()[0];
  };

  const useTicket = (ticket) => {
    tickets.splice(tickets.indexOf(ticket), 1);
  };

  const travel = (destination) => {
    if (tickets.length < 1) return;

    // 현재 티켓 찾기
    const currentTicket = findTicket(destination);
    // 티켓 소모
    useTicket(currentTicket);
    // 경유지 추가
    answer.push(currentTicket[1]);

    travel(currentTicket[1]);
  };

  const departTicket = findTicket("ICN");
  useTicket(departTicket);
  answer.push(departTicket[0], departTicket[1]);
  travel(departTicket[1]);

  console.log(answer);
}

Solution(input);
