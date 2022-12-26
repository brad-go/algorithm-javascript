# 모의고사

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42840

## 문제 분류

: 완전탐색

## 풀이 과정

```js
const solution = (answers) => {
  // 각 학생들의 id, 찍는 방식, 정답 개수를 담은 배열
  const students = [
    {
      id: 1,
      answer: [1, 2, 3, 4, 5],
      correct: 0,
    },
    {
      id: 2,
      answer: [2, 1, 2, 3, 2, 4, 2, 5],
      correct: 0,
    },
    {
      id: 3,
      answer: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
      correct: 0,
    },
  ];

  // 정답 배열을 순회하면서 각 학생들이 정답을 맞췄다면 맞은 개수 증가시키기
  answers.forEach((answer, index) => {
    students.forEach((student) => {
      // 현재 문제의 정답과 학생이 찍은 문제의 정답이 같은지 비교
      if (answer === student.answer[index % student.answer.length]) {
        student.correct += 1;
      }
    });
  });

  // 최고 점수 구하기
  const maxScore = students.reduce(
    (max, { correct }) => Math.max(max, correct),
    0
  );

  // 최고 점수인 학생들만 남기고 번호만 반환하기 - 이미 id를 순서대로 배치해서 정렬 필요 x
  return students
    .filter(({ correct }) => correct === maxScore)
    .map(({ id }) => id);
};
```

## 코드 개선

정답 개수를 확인하는 것을 students에서 분리해내고, 최고 점수를 reduce를 통해 구하기보다 정렬을 통해 구했더니 속도가 훨씬 빨라졌다.

```js
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
```
