const info = [
  "java backend junior pizza 150",
  "python frontend senior chicken 210",
  "python frontend senior chicken 150",
  "cpp backend senior pizza 260",
  "java backend junior chicken 80",
  "python backend senior chicken 50",
];

const query = [
  "java and backend and junior and pizza 100",
  "python and frontend and senior and chicken 200",
  "cpp and - and senior and pizza 250",
  "- and backend and senior and - 150",
  "- and - and - and chicken 100",
  "- and - and - and - 150",
];

function solution(info, query) {
  var answer = [];

  const volunteers = info.map((i) => i.split(" "));
  const qualifications = query.map((q) =>
    q.split(" ").filter((v) => v !== "and")
  );

  const NO_MATTER = "-";

  qualifications.forEach((qualification) => {
    const [lan, group, career, food, score] = qualification;

    let count = 0;

    for (let volunteer of volunteers) {
      const [l, g, c, f, s] = volunteer;

      let qualified = true;

      if (l !== lan && lan !== NO_MATTER) qualified = false;
      if (g !== group && group !== NO_MATTER) qualified = false;
      if (c !== career && career !== NO_MATTER) qualified = false;
      if (f !== food && food !== NO_MATTER) qualified = false;
      if (Number(s) < Number(score)) qualified = false;

      if (qualified) count++;
    }

    answer.push(count);
  });

  return answer;
}

console.log(solution(info, query));
