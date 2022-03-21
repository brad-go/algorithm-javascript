# 나이순 정렬 - 10814

[문제 링크](https://www.acmicpc.net/problem/10814)

### 성능 요약

메모리: 256MB, 시간 2초

### 문제

온라인 저지에 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다. 이때, 회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.

### 입력

첫째 줄에 온라인 저지 회원의 수 N이 주어진다. (1 ≤ N ≤ 100,000)

둘째 줄부터 N개의 줄에는 각 회원의 나이와 이름이 공백으로 구분되어 주어진다. 나이는 1보다 크거나 같으며, 200보다 작거나 같은 정수이고, 이름은 알파벳 대소문자로 이루어져 있고, 길이가 100보다 작거나 같은 문자열이다. 입력은 가입한 순서로 주어진다.

### 출력

첫째 줄부터 총 N개의 줄에 걸쳐 온라인 저지 회원을 나이 순, 나이가 같으면 가입한 순으로 한 줄에 한 명씩 나이와 이름을 공백으로 구분해 출력한다.

### 예제 입력

```
3
21 Junkyu
21 Dohyun
20 Sunyoung
```

### 예제 출력

```
20 Sunyoung
21 Junkyu
21 Dohyun
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 해결

#### 유저를 객체로 만들어서 풀기

```js
function Solution(input) {
  const users = input.reduce((acc, cur, idx) => {
    const [age, name] = cur.split(" ");
    acc.push({ name: name, age: Number(age), join: idx + 1 });
    return acc;
  }, []);

  const sortedUsers = users.sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    }
    if (a.join !== b.join) {
      return a.join - b.join;
    }
    return 0;
  });

  sortedUsers.forEach((user) => {
    console.log(`${user.age} ${user.name}`);
  });
}

Solution(input);
```

- 문제 그대로 풀기 위해 users라는 배열을 만들어서 각각의 유저를 객체로 만들어 저장
- 가입일 순으로 정렬하기 위해 인덱스 번호로 유저의 가입 순서 저장
- 나이 순으로 정렬하고, 가입일 순으로 정렬

#### 유저의 나이만 고려하기

객체로 만드는 방식으로 풀었더니 메모리나 시간이 너무나 많이 소모되었다. 그래서 다른 방식으로 풀어보았다.

```js
function Solution(input) {
  input.sort((a, b) => a.split(" ")[0] - b.split(" ")[0]);
  console.log(input.join("\n"));
}

Solution(input);
```

위의 긴 코드가 사실 단 두줄이면 해결되었다. 어차피 이미 문제에서 **유저는 가입한 순서대로 주어진다**고 되어있기 때문에
내가 특별히 인덱스를 넣어서 고려할 필요가 없었다. `sort()` 안에서 각 문장을 split해서 유저의 나이만 비교한 결과다.

#### parseFloat 이용하기

위 방식도 첫번째보다는 충분히 빨랐지만, `parseFloat()`을 이용하면 메모리도 덜 소모되고, 무엇보다 속도가 훨씬 빨랐다.

```js
function Solution(input) {
  input.sort((a, b) => parseFloat(a) - parseFloat(b));
  console.log(input.join("\n"));
}

Solution(input);
```

- `parseFloat()`은 문자열을 받는 메서드다. 그러나 문자열이 아닐 경우 `toString`을 사용해 추상 문자열로 변환한다.
- 반환값은 문자열에서 파싱한 부동 소수점 실수다.
- 공백이 아닌 첫글자를 숫자로 변환할 수 없는 경우 `NaN`을 반환한다.
- 즉, 사용할 수 있는 곳은 **숫자나, 공백이나 숫자가 먼저온 문자열**이다!

</div>
</details>
