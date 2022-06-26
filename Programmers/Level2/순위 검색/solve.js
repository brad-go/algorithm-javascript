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
  const searchConditions = [
    ["cpp", "java", "python"],
    ["backend", "frontend"],
    ["junior", "senior"],
    ["chicken", "pizza"],
  ];

  let applicants = {};

  const indexSearchConditions = (condition, depth) => {
    if (depth === searchConditions.length) return;

    searchConditions[depth].forEach((subCondition) => {
      if (depth === searchConditions.length - 1) condition[subCondition] = [];
      else condition[subCondition] = {};
      indexSearchConditions(condition[subCondition], depth + 1);
    });
  };

  indexSearchConditions(applicants, 0);

  info.forEach((applicant) => {
    const [lang, group, career, food, score] = applicant.split(" ");
    applicants[lang][group][career][food].push(+score);
  });

  const getApplicants = (applicatns, condition, depth) => {
    if (depth === condition.length) return applicatns;

    if (condition[depth] === "-") {
      // -면 다음 depth로 넘어감
      return Object.values(applicatns).reduce((acc, cur) => {
        return acc.concat(getApplicants(cur, condition, depth + 1));
      }, []);
    } else {
      return getApplicants(applicatns[condition[depth]], condition, depth + 1);
    }
  };

  // prettier-ignore
  const binarySearch = (array, target, startIndex = 0, endIndex = array.length - 1) => {
    while (startIndex <= endIndex) {
      const middleIndex = Math.floor((startIndex + endIndex) / 2);

      if (target <= array[middleIndex]) endIndex = middleIndex - 1;
      else startIndex = middleIndex + 1;
    }

    return startIndex;
  }

  const conditions = {};
  const count = [];

  query.forEach((q) => {
    const [lang, group, career, food, score] = q.replace(/\sand\s/g, " ").split(" "); // prettier-ignore
    const applicantInfo = [lang, group, career, food];
    const conditionStr = applicantInfo.join(",");

    if (conditions[conditionStr] === undefined) {
      conditions[conditionStr] = getApplicants(applicants, applicantInfo, 0).sort((a, b) => a - b); // prettier-ignore
    }

    if (score === "-") count.push(conditions[conditionStr].length);
    else {
      const standardScore = Number(score);
      const qualifiedApplicantCount = binarySearch(conditions[conditionStr], standardScore); // prettier-ignore

      count.push(conditions[conditionStr].length - qualifiedApplicantCount);
    }
  });

  return count;
}

console.log(solution(info, query));
