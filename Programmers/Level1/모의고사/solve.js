const answers = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (answers) => {
  const students = [
    {
      id: 1,
      answer: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      answer: [2, 1, 2, 3, 2, 4, 2, 5],
    },
    {
      id: 3,
      answer: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
    },
  ];

  const studentScores = students.map((student) => {
    const correctCount = answers.reduce((count, answer, index) => {
      const correct = answer === student.answer[index % student.answer.length];
      return count + (correct ? 1 : 0);
    }, 0);

    return { id: student.id, correct: correctCount };
  });

  studentScores.sort((a, b) => b.correct - a.correct);

  const maxScore = studentScores[0].correct;

  return studentScores
    .filter((student) => student.correct === maxScore)
    .map((student) => student.id);
};

console.log(solution(answers));
