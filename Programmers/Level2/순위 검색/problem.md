# 순위 검색

## 문제 분류

: 구현, 탐색, 정렬

## 풀이 과정

### Solution 1 - (정확성 18/18, 효율성 0/4)

문제의 입력에서 info 배열의 크기가 50,000 query 배열의 크기가 100,000이었지만, 어떻게 정렬하거나 빠르게 찾아내야 할지 떠오르지 않았다. 이진 탐색을 사용하고 싶었지만, 비교해야할 것들이 많아서 방법이 떠오르지 않았다. 그래서 선형 탐색을 이용해서 풀이했고, 당연히 효율성에서 0점을 받게 되었다.

```js
function solution(info, query) {
  var answer = [];

  // 지원자 배열 입력받기
  const volunteers = info.map((i) => i.split(" "));
  // 조건 배열 입력받기
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
```

### Solution 2 - (정확성 18/18, 효율성 4/4)

두번째 풀이 방식은 시간 초과를 해결하기 위해 다음과 같이 풀이한다.

1. 반복문의 중첩을 통해서 검색값을 찾지 않을 수 있게, **조건들을 문자열로 변경해서 객체의 키 값으로 사용해준다**.
2. 해당 키에는 해당하는 지원자들의 점수를 값으로 넣어준다.
3. 키 값에 저장된 점수들을 정렬해준다.
4. 입력받은 쿼리문을 반복하면서 파싱해준 후 이진 탐색을 통해 지원자들을 찾아준다.
5. 이 때 이진 탐색에서 정확한 탐색 값이 아닌 기준 점수를 넘는 지원자들의 수를 찾기 위해 점수들이 담긴 배열에서 기준 점수에 못 미치는 지원자들의 수를 빼준다.

```js
function solution(info, query) {
  var answer = [];
  const dict = {};

  makeCases(info, dict);
  addCandidates(info, dict);

  for (let key of Object.keys(dict)) {
    dict[key].sort((a, b) => a - b);
  }

  for (let q of query) {
    q = q.replace(/ and /g, "").split(" ");

    const qualifiedScore = Number(q[1]);
    q = q[0];

    const candidateScores = dict[q];

    const pass = binarySearch(candidateScores, qualifiedScore);
    answer.push(pass);
  }

  return answer;
}

const makeCases = (info, dict) => {
  for (let lang of ["cpp", "java", "python", "-"]) {
    for (let group of ["backend", "frontend", "-"]) {
      for (let career of ["junior", "senior", "-"]) {
        for (let food of ["chicken", "pizza", "-"]) {
          dict[lang + group + career + food] = [];
        }
      }
    }
  }
};

const addCandidates = (info, dict) => {
  for (let candidate of info) {
    const [l, g, c, f, score] = candidate.split(" ");

    for (let lang of [l, "-"]) {
      for (let group of [g, "-"]) {
        for (let career of [c, "-"]) {
          for (let food of [f, "-"]) {
            dict[lang + group + career + food].push(Number(score));
          }
        }
      }
    }
  }
};

const binarySearch = (array, target, low = 0, high = array.length - 1) => {
  let temp = array.length;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (target <= array[mid]) {
      temp = mid;
      high = mid - 1;
    } else if (target > array[mid]) low = mid + 1;
  }

  return array.length - temp;
};
```

### Solution 3 - (정확성 18/18, 효율성 4/4)

두번째 솔루션에서 반복문을 통해 검색 조건 배열을 만들고 지원자들의 점수를 넣었다면 이 코드는 재귀 함수를 이용해서 문제를 해결한다.

```js
function solution(info, query) {
  const searchConditions = [
    ["cpp", "java", "python"],
    ["backend", "frontend"],
    ["junior", "senior"],
    ["chicken", "pizza"],
  ];

  let applicants = {}; // 지원자들의 전체 경우의 수를 나타낼 객체

  // 조건들을 트리 구조로 만들어준다.
  const indexSearchConditions = (condition, depth) => {
    if (depth === searchConditions.length) return;

    searchConditions[depth].forEach((subCondition) => {
      // 하위 조건이 없다면 지원자들의 점수를 담을 수 있게 배열로 만들어줌
      if (depth === searchConditions.length - 1) condition[subCondition] = [];
      // 아니라면 하위 조건을 키로 객체를 새로 생성한다.
      else condition[subCondition] = {};

      // 재귀를 통해 하위 조건이 없을 때까지 반복
      indexSearchConditions(condition[subCondition], depth + 1);
    });
  };

  indexSearchConditions(applicants, 0);

  // 위 트리 구조에 맞춰서 조건에 맞는 지원자들의 점수를 넣어준다.
  info.forEach((applicant) => {
    const [lang, group, career, food, score] = applicant.split(" ");
    applicants[lang][group][career][food].push(+score);
  });

  // 위에서 만든 트리 구조를 탐색하면서 조건에 해당하는 지원자들의 점수 배열을 반환
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

    // 일치값이 아닌 기준 점수를 넘는 지원자들의 점수를 찾는 것이므로 해당 구간의 가장 첫번째 인덱스를 반환
    return startIndex;
  }

  const conditions = {};
  const count = [];

  // 입력으로 주어진 조건들을 탐색
  query.forEach((q) => {
    const [lang, group, career, food, score] = q.replace(/\sand\s/g, " ").split(" "); // prettier-ignore
    // 점수만 빼고 입력받기
    const applicantInfo = [lang, group, career, food];
    const conditionStr = applicantInfo.join(",");

    // 객체의 키 값으로 입력받은 쿼리를 문자열로 하나로 합쳐서 정렬된 점수값을 넣어줌
    if (conditions[conditionStr] === undefined) {
      conditions[conditionStr] = getApplicants(applicants, applicantInfo, 0).sort((a, b) => a - b); // prettier-ignore
    }

    if (score === "-") count.push(conditions[conditionStr].length);
    else {
      const standardScore = Number(score);
      const qualifiedApplicantCount = binarySearch(conditions[conditionStr], standardScore); // prettier-ignore

      // 해당 조건에 맞는 점수들 중 기준 점수 미달의 지원자들을 뺀 지원자들만 수를 세어줌
      count.push(conditions[conditionStr].length - qualifiedApplicantCount);
    }
  });

  return count;
}
```
