# K번째수

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42748

## 문제 분류

: 정렬

## 풀이 과정

- 입력에 따라서 배열을 잘라낸다.
- 잘라낸 배열을 퀵정렬한다.
- 정렬된 배열에 입력받은 인덱스를 answer 배열에 넣는다.

```js
const solution = (array, commands) => {
  return commands.map(([start, end, targetIndex]) => {
    const target = quickSort(array.slice(start - 1, end))[targetIndex - 1];
    return target;
  });
};

const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left >= right) return array;

  const pivot = partition(array, left, right);

  if (left < pivot - 1) quickSort(array, left, pivot - 1);
  if (pivot < right) quickSort(array, pivot, right);

  return array;
};

const partition = (array, left, right) => {
  const pivot = array[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (array[left] < pivot) left++;
    while (array[right] > pivot) right--;

    if (left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }

  return left;
};

const swap = (array, idx1, idx2) => {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
};
```

## 코드 개선

### Refactor 1

- 퀵 정렬을 구현하면 빠를 줄 알았는데 아니었다.
- 기본적으로 내장 sort()는 삽입 정렬 혹은 병합 정렬을 사용하는 것으로 알고 있다. 그러나 평균적으로 퀵 정렬이 빠를거라 생각했는데, 입력값이 작아서 그런것 같다.

```js
function solution(array, commands) {
  return commands.map((command) => {
    const [startIndex, endIndex, index] = command;
    const newArray = array
      .filter((value, idx) => idx >= startIndex - 1 && idx <= endIndex - 1)
      .sort((a, b) => a - b);
    return newArray[index - 1];
  });
}
```

### Refactor 2

- 정말 간결하고 보기 좋은 코드이다.
- newArray에 바로 인덱스값을 보내서 return 하는 것보다 새 변수에 담고 리턴하는 것이 두배정도 빠르다.

```js
function solution(array, commands) {
  return commands.map(([startIndex, endIndex, index]) => {
    const newArray = array.slice(startIndex - 1, endIndex).sort((a, b) => a - b); // prettier-ignore
    return newArray[index - 1];
  });
}
```
