// const priorities = [2, 1, 3, 2];
// const location = 2;
const priorities = [1, 1, 9, 1, 1, 1];
const location = 0;

function solution(priorities, location) {
  const documents = priorities.map((prirority, id) => ({ id , prirority })); // prettier-ignore

  const print = (documents, location, depth) => {
    if (!documents.length) return;

    const current = documents.shift();
    const isPrint = documents.every(({ prirority }) => prirority <= current.prirority); // prettier-ignore

    if (isPrint) {
      if (current.id === location) return depth;
      return print(documents, location, depth + 1);
    } else {
      documents.push(current);
      return print(documents, location, depth);
    }
  };

  return print(documents, location, 1);
}

console.log(solution(priorities, location));
