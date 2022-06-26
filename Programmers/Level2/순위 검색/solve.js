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
  const options = [
    ["cpp", "java", "python"],
    ["backend", "frontend"],
    ["junior", "senior"],
    ["chicken", "pizza"],
  ];

  const indexOptions = (parent, depth) => {
    if (depth === options.length) return parent;

    options[depth].forEach((option) => {
      if (depth === options.length - 1) parent[option] = [];
      else parent[option] = {};

      indexOptions(parent[option], depth + 1);
    });
  };

  const getApplicants = (applicants, optionInfo, depth) => {
    if (depth === optionInfo.length) return applicants;

    if (optionInfo[depth] === "-") {
      return Object.values(applicants).reduce((acc, cur) => {
        return [...acc, ...getApplicants(cur, optionInfo, depth + 1)];
      }, []);
    } else {
      return getApplicants(applicants[optionInfo[depth]], optionInfo, depth + 1); // prettier-ignore
    }
  };

  const binarySearch = (array, target, low = 0, high = array.length - 1) => {
    if (array.length < 1) return low;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (target <= array[mid]) high = mid - 1;
      else low = mid + 1;
    }

    return low;
  };

  const applicantsTree = {};
  const applicants = {};
  const count = [];

  indexOptions(applicantsTree, 0);

  info.forEach((applicant) => {
    const [lang, group, career, food, score] = applicant.split(" ");

    applicantsTree[lang][group][career][food].push(+score);
  });

  query.forEach((q) => {
    const [lang, group, career, food, score] = q.replace(/\sand\s/g, " ").split(" "); // prettier-ignore
    const optionInfo = [lang, group, career, food];
    const optionIndex = optionInfo.join(",");

    if (applicants[optionIndex] === undefined) {
      applicants[optionIndex] = getApplicants(applicantsTree, optionInfo, 0).sort((a, b) => a - b); // prettier-ignore
    }

    const applicantsCount =
      applicants[optionIndex].length -
      binarySearch(applicants[optionIndex], +score);

    count.push(applicantsCount);
  });

  return count;
}

console.log(solution(info, query));
