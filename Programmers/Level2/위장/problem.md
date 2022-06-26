# 위장

## 문제 분류

: 해쉬

## 풀이 과정

1. 스파이를 나타낼 객체를 만들어준다.
2. 입력이 [의상의 이름, 의상의 종류]로 들어오므로, 의상의 종류를 키로 이용해서 스파이 객체에 의상의 이름을 넣어준다.
3. 스파이 객체가 가진 키들의 값을 꺼내서 그 개수를 새로운 배열에 저장한다.
4. 각 개수에 +1을 해준다. (선택하지 않을수도 있기 때문에)
5. 새 배열에 담긴 값들을 모두 서로 곱하고 1을 빼준다. (하루에 하나는 무조건 입기 때문에)

## Solution

```js
function solution(clothes) {
  const spy = {};

  clothes.forEach((cloth) => {
    const [name, part] = cloth;

    if (spy[part]) spy[part].push(name);
    else spy[part] = [name];
  });

  const numberOfClothes = Object.values(spy).map((clothes) => clothes.length + 1); // prettier-ignore
  const count = numberOfClothes.reduce((acc, cur) => acc * cur, 1) - 1;

  return count;
}
```

## 코드 개선

- 객체를 선언하고, forEach문을 통해 객체의 값을 채우던 방식을 reduce를 통해 깔끔하게 만들었다.

```js
function solution(clothes) {
  const numberOfClothes = clothes.reduce((spy, [_, type]) => {
    spy[type] = (spy[type] || 0) + 1;
    return spy;
  }, {});

  return Object.values(numberOfClothes).reduce((acc, cur) => acc * (cur + 1), 1) - 1; // prettier-ignore
}
```
