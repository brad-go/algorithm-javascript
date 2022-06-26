// const progresses = [93, 30, 55];
const progresses = [95, 90, 99, 99, 80, 99];
// const speeds = [1, 30, 5];
const speeds = [1, 1, 1, 1, 1, 1];

// function solution(progresses, speeds) {
//   const works = progresses.reduce((acc, cur, idx) => {
//     acc[idx] = { progress: cur, speed: speeds[idx], done: false };
//     return acc;
//   }, []);

//   const progressWorks = (works) => {
//     works.map((work) => {
//       if (work.done) return;
//       work.progress += work.speed;
//       if (work.progress >= 100) work.done = true;
//     });
//   };

//   const counts = [];

//   while (works.length) {
//     progressWorks(works);

//     let distributed = false;
//     let count = 0;

//     while (works.length && works[0].done) {
//       works.shift();
//       distributed = true;
//       count++;
//     }

//     if (distributed) counts.push(count);
//   }

//   return counts;
// }

function solution(progresses, speeds) {
  const answer = [0];
  const days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );
  let maxDay = days[0];

  console.log(days);

  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      answer[j] += 1;
      continue;
    }

    maxDay = days[i];
    answer[++j] = 1;
  }

  return answer;
}

console.log(solution(progresses, speeds));
