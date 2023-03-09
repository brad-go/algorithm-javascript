# 5373. 큐빙

## 문제 링크

https://www.acmicpc.net/problem/5357

## 문제 분류

: 구현, 브루트포스 알고리즘

## 소요 시간

: 4시간

## 풀이 방법

문제를 풀이하는 방법은 단순 구현이기 때문에, 간단했지만 머릿속에 3차원의 큐브의 움직임을 그리고, 해당 조건들을 빠뜨리지 않은채 구현하는 것이 어려웠다. 괜히 코드를 깔끔하고 중복없이 짜겠다고 작성을 하다보면 어느새 큐브를 바라보는 방향이 어디였는지 머릿속에서 헷갈리고 제대로 조건을 찾지 못하는 상황의 반복이었다.

문제를 풀 수 있었던 결정적인 방법은 내가 큐브를 바라보는 방향이 어디인지, 큐브의 2차원 배열이 어떤 면을 기준으로 놓여져 있는지 기준을 세우는 것이었다.

1. 큐브를 U, D, F, B, L, R의 각 면마다 3 \* 3의 2차원 배열을 가진 객체로 생성한다.
2. 주어진 입력에 따라 큐브를 돌린다.

## 풀이 코드

```js
const SIDE = {
  up: "U",
  down: "D",
  front: "F",
  back: "B",
  left: "L",
  right: "R",
};

const solution = (N, rotates) => {
  const cube = createCube();

  const rotateBySide = {
    U: (cube, direction) => rotateUpSide(cube, direction),
    D: (cube, direction) => rotateDownSide(cube, direction),
    F: (cube, direction) => rotateFrontSide(cube, direction),
    B: (cube, direction) => rotateBackSide(cube, direction),
    L: (cube, direction) => rotateLeftSide(cube, direction),
    R: (cube, direction) => rotateRightSide(cube, direction),
  };

  rotates.forEach((command) => {
    const [side, direction] = command;

    rotateBySide[side](cube, direction);
  });

  return cube[SIDE.up].map((row) => row.join("")).join("\n");
};

const createCube = () => {
  const colors = ["w", "y", "r", "o", "g", "b"];

  return Object.values(SIDE).reduce((acc, cur, index) => {
    acc[cur] = createSide(colors[index]);
    return acc;
  }, {});
};

const createSide = (color) => {
  return Array.from(Array(3), () => Array(3).fill(color));
};

const rotateLeftSide = (cube, direction) => {
  const leftColumnOfUpSide = getLeftColumnOfSide(cube.U);
  const leftColumnOfFrontSide = getLeftColumnOfSide(cube.F);
  const leftColumnOfBackSide = getLeftColumnOfSide(cube.B);
  const leftColumnOfDownSide = getLeftColumnOfSide(cube.D);

  if (direction === "-") {
    cube.U.forEach((row, index) => {
      row[0] = leftColumnOfFrontSide[index];
    });
    cube.F.forEach((row, index) => {
      row[0] = leftColumnOfDownSide[index];
    });
    cube.D.forEach((row, index) => {
      row[0] = leftColumnOfBackSide[2 - index];
    });
    cube.B.forEach((row, index) => {
      row[0] = leftColumnOfUpSide[2 - index];
    });
  } else {
    cube.U.forEach((row, index) => {
      row[0] = leftColumnOfBackSide[2 - index];
    });
    cube.F.forEach((row, index) => {
      row[0] = leftColumnOfUpSide[index];
    });
    cube.D.forEach((row, index) => {
      row[0] = leftColumnOfFrontSide[index];
    });
    cube.B.forEach((row, index) => {
      row[0] = leftColumnOfDownSide[2 - index];
    });
  }

  rotateSide(cube, SIDE.left, direction);
};

const rotateRightSide = (cube, direction) => {
  const rightColumnOfUpSide = getRightColumnOfSide(cube.U);
  const rightColumnOfFrontSide = getRightColumnOfSide(cube.F);
  const rightColumnOfBackSide = getRightColumnOfSide(cube.B);
  const rightColumnOfDownSide = getRightColumnOfSide(cube.D);

  if (direction === "-") {
    cube.U.forEach((row, index) => {
      row[2] = rightColumnOfBackSide[2 - index];
    });
    cube.F.forEach((row, index) => {
      row[2] = rightColumnOfUpSide[index];
    });
    cube.D.forEach((row, index) => {
      row[2] = rightColumnOfFrontSide[index];
    });
    cube.B.forEach((row, index) => {
      row[2] = rightColumnOfDownSide[2 - index];
    });
  } else {
    cube.U.forEach((row, index) => {
      row[2] = rightColumnOfFrontSide[index];
    });
    cube.F.forEach((row, index) => {
      row[2] = rightColumnOfDownSide[index];
    });
    cube.D.forEach((row, index) => {
      row[2] = rightColumnOfBackSide[2 - index];
    });
    cube.B.forEach((row, index) => {
      row[2] = rightColumnOfUpSide[2 - index];
    });
  }

  rotateSide(cube, SIDE.right, direction);
};

const rotateFrontSide = (cube, direction) => {
  const downRowOfUpSide = getDownRowOfSide(cube.U);
  const leftColumnOfRightSide = getLeftColumnOfSide(cube.R);
  const upRowOfDownSide = getUpRowOfSide(cube.D);
  const rightColumnOfLeftSide = getRightColumnOfSide(cube.L);

  if (direction === "-") {
    leftColumnOfRightSide.forEach((color, index) => {
      cube.U[2][index] = color;
    });
    cube.R.forEach((row, index) => {
      row[0] = upRowOfDownSide[2 - index];
    });
    rightColumnOfLeftSide.forEach((color, index) => {
      cube.D[0][index] = color;
    });
    cube.L.forEach((row, index) => {
      row[2] = downRowOfUpSide[2 - index];
    });
  } else {
    rightColumnOfLeftSide.forEach((_, index, origin) => {
      cube.U[2][index] = origin[2 - index];
    });
    cube.R.forEach((row, index) => {
      row[0] = downRowOfUpSide[index];
    });
    leftColumnOfRightSide.forEach((_, index, origin) => {
      cube.D[0][index] = origin[2 - index];
    });
    cube.L.forEach((row, index) => {
      row[2] = upRowOfDownSide[index];
    });
  }

  rotateSide(cube, SIDE.front, direction);
};

const rotateBackSide = (cube, direction) => {
  const upRowOfUpSide = getUpRowOfSide(cube.U);
  const rightColumnOfRightSide = getRightColumnOfSide(cube.R);
  const downRowOfDownSide = getDownRowOfSide(cube.D);
  const leftColumnOfLeftSide = getLeftColumnOfSide(cube.L);

  if (direction === "-") {
    leftColumnOfLeftSide.forEach((_, index, origin) => {
      cube.U[0][index] = origin[2 - index];
    });
    cube.R.forEach((row, index) => {
      row[2] = upRowOfUpSide[index];
    });
    rightColumnOfRightSide.forEach((_, index, origin) => {
      cube.D[2][index] = origin[2 - index];
    });
    cube.L.forEach((row, index) => {
      row[0] = downRowOfDownSide[index];
    });
  } else {
    rightColumnOfRightSide.forEach((color, index) => {
      cube.U[0][index] = color;
    });
    cube.R.forEach((row, index) => {
      row[2] = downRowOfDownSide[2 - index];
    });
    leftColumnOfLeftSide.forEach((color, index) => {
      cube.D[2][index] = color;
    });
    cube.L.forEach((row, index) => {
      row[0] = upRowOfUpSide[2 - index];
    });
  }

  rotateSide(cube, SIDE.back, direction);
};

const rotateUpSide = (cube, direction) => {
  const upRowOfBackSide = getUpRowOfSide(cube.B);
  const upRowOfRightSide = getUpRowOfSide(cube.R);
  const upRowOfFrontSide = getUpRowOfSide(cube.F);
  const upRowOfLeftSide = getUpRowOfSide(cube.L);

  if (direction === "-") {
    upRowOfRightSide.forEach((_, index, origin) => {
      cube.B[0][index] = origin[2 - index];
    });
    upRowOfFrontSide.forEach((color, index) => {
      cube.R[0][index] = color;
    });
    upRowOfLeftSide.forEach((color, index) => {
      cube.F[0][index] = color;
    });
    upRowOfBackSide.forEach((_, index, origin) => {
      cube.L[0][index] = origin[2 - index];
    });
  } else {
    upRowOfLeftSide.forEach((_, index, origin) => {
      cube.B[0][index] = origin[2 - index];
    });
    upRowOfBackSide.forEach((_, index, origin) => {
      cube.R[0][index] = origin[2 - index];
    });
    upRowOfRightSide.forEach((color, index) => {
      cube.F[0][index] = color;
    });
    upRowOfFrontSide.forEach((color, index) => {
      cube.L[0][index] = color;
    });
  }

  rotateSide(cube, SIDE.up, direction);
};

const rotateDownSide = (cube, direction) => {
  const downRowOfBackSide = getDownRowOfSide(cube.B);
  const downRowOfRightSide = getDownRowOfSide(cube.R);
  const downRowOfFrontSide = getDownRowOfSide(cube.F);
  const downRowOfLeftSide = getDownRowOfSide(cube.L);

  if (direction === "-") {
    downRowOfLeftSide.forEach((_, index, origin) => {
      cube.B[2][index] = origin[2 - index];
    });
    downRowOfBackSide.forEach((_, index, origin) => {
      cube.R[2][index] = origin[2 - index];
    });
    downRowOfRightSide.forEach((color, index) => {
      cube.F[2][index] = color;
    });
    downRowOfFrontSide.forEach((color, index) => {
      cube.L[2][index] = color;
    });
  } else {
    downRowOfRightSide.forEach((_, index, origin) => {
      cube.B[2][index] = origin[2 - index];
    });
    downRowOfFrontSide.forEach((color, index) => {
      cube.R[2][index] = color;
    });
    downRowOfLeftSide.forEach((color, index) => {
      cube.F[2][index] = color;
    });
    downRowOfBackSide.forEach((_, index, origin) => {
      cube.L[2][index] = origin[2 - index];
    });
  }

  rotateSide(cube, SIDE.down, direction);
};

const rotateSide = (cube, side, direction) => {
  const newSide = cube[side].map((row) => [...row]);

  if (side === SIDE.back) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cube[side][i][j] =
          direction === "-" ? newSide[2 - j][i] : newSide[j][2 - i];
      }
    }
    return;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cube[side][i][j] =
        direction === "-" ? newSide[j][2 - i] : newSide[2 - j][i];
    }
  }
};

const getLeftColumnOfSide = (side) => {
  return [side[0][0], side[1][0], side[2][0]];
};

const getRightColumnOfSide = (side) => {
  return [side[0][2], side[1][2], side[2][2]];
};

const getUpRowOfSide = (side) => {
  return [...side[0]];
};

const getDownRowOfSide = (side) => {
  return [...side[2]];
};
```

## 코드 개선

왼쪽, 오른쪽, 윗면, 아랫면을 돌릴 때의 코드는 조금 줄일 수 있었지만, 앞, 뒤를 돌릴 때는 코드를 리팩토링하지 못했다...

```js
const SIDE = {
  up: "U",
  down: "D",
  front: "F",
  back: "B",
  left: "L",
  right: "R",
};

const solution = (N, rotates) => {
  const cube = createCube();

  const rotateBySide = {
    U: (cube, direction) => rotateUpSide(cube, direction),
    D: (cube, direction) => rotateDownSide(cube, direction),
    F: (cube, direction) => rotateFrontSide(cube, direction),
    B: (cube, direction) => rotateBackSide(cube, direction),
    L: (cube, direction) => rotateLeftSide(cube, direction),
    R: (cube, direction) => rotateRightSide(cube, direction),
  };

  rotates.forEach((command) => {
    const [side, direction] = command;

    rotateBySide[side](cube, direction);
  });

  return cube[SIDE.up].map((row) => row.join("")).join("\n");
};

const createCube = () => {
  const colors = ["w", "y", "r", "o", "g", "b"];

  return Object.values(SIDE).reduce((acc, cur, index) => {
    acc[cur] = createSide(colors[index]);
    return acc;
  }, {});
};

const createSide = (color) => {
  return Array.from(Array(3), () => Array(3).fill(color));
};

const rotateLeftSide = (cube, direction) => {
  const sides = [SIDE.up, SIDE.front, SIDE.down, SIDE.back];
  const leftColumns = sides.map((side) => getLeftColumnOfSide(cube[side]));

  sides.forEach((side, idx) => {
    const leftColumn =
      leftColumns[getIndexByDirectionWhenRotateLeft(idx, direction)];

    cube[side].forEach((row, index) => {
      row[0] = isRelatedByBackSideWhenRotateLeftSide(side, direction)
        ? leftColumn[2 - index]
        : leftColumn[index];
    });
  });

  rotateSide(cube, SIDE.left, direction);
};

const getIndexByDirectionWhenRotateLeft = (index, direction) => {
  if (direction === "-") {
    return (index + 1) % 4;
  }

  return index - 1 < 0 ? 3 : index - 1;
};

const isRelatedByBackSideWhenRotateLeftSide = (side, direction) => {
  return direction === "-"
    ? side === SIDE.down || side === SIDE.back
    : side === SIDE.up || side === SIDE.back;
};

const rotateRightSide = (cube, direction) => {
  const sides = [SIDE.up, SIDE.front, SIDE.down, SIDE.back];
  const rightColumns = sides.map((side) => getRightColumnOfSide(cube[side]));

  sides.forEach((side, idx) => {
    const rightColumn =
      rightColumns[getIndexByDirectionWhenRotateRight(idx, direction)];

    cube[side].forEach((row, index) => {
      row[2] = isRelatedByBackSideWhenRotateRightSide(side, direction)
        ? rightColumn[2 - index]
        : rightColumn[index];
    });
  });

  rotateSide(cube, SIDE.right, direction);
};

const getIndexByDirectionWhenRotateRight = (index, direction) => {
  if (direction === "-") {
    return index - 1 < 0 ? 3 : index - 1;
  }

  return (index + 1) % 4;
};

const isRelatedByBackSideWhenRotateRightSide = (side, direction) => {
  return direction === "-"
    ? side === SIDE.up || side === SIDE.back
    : side === SIDE.down || side === SIDE.back;
};

const rotateFrontSide = (cube, direction) => {
  const downRowOfUpSide = getDownRowOfSide(cube.U);
  const leftColumnOfRightSide = getLeftColumnOfSide(cube.R);
  const upRowOfDownSide = getUpRowOfSide(cube.D);
  const rightColumnOfLeftSide = getRightColumnOfSide(cube.L);

  if (direction === "-") {
    leftColumnOfRightSide.forEach((color, index) => {
      cube.U[2][index] = color;
    });
    cube.R.forEach((row, index) => {
      row[0] = upRowOfDownSide[2 - index];
    });
    rightColumnOfLeftSide.forEach((color, index) => {
      cube.D[0][index] = color;
    });
    cube.L.forEach((row, index) => {
      row[2] = downRowOfUpSide[2 - index];
    });
  } else {
    rightColumnOfLeftSide.forEach((_, index, origin) => {
      cube.U[2][index] = origin[2 - index];
    });
    cube.R.forEach((row, index) => {
      row[0] = downRowOfUpSide[index];
    });
    leftColumnOfRightSide.forEach((_, index, origin) => {
      cube.D[0][index] = origin[2 - index];
    });
    cube.L.forEach((row, index) => {
      row[2] = upRowOfDownSide[index];
    });
  }

  rotateSide(cube, SIDE.front, direction);
};

const rotateBackSide = (cube, direction) => {
  const upRowOfUpSide = getUpRowOfSide(cube.U);
  const rightColumnOfRightSide = getRightColumnOfSide(cube.R);
  const downRowOfDownSide = getDownRowOfSide(cube.D);
  const leftColumnOfLeftSide = getLeftColumnOfSide(cube.L);

  if (direction === "-") {
    leftColumnOfLeftSide.forEach((_, index, origin) => {
      cube.U[0][index] = origin[2 - index];
    });
    cube.R.forEach((row, index) => {
      row[2] = upRowOfUpSide[index];
    });
    rightColumnOfRightSide.forEach((_, index, origin) => {
      cube.D[2][index] = origin[2 - index];
    });
    cube.L.forEach((row, index) => {
      row[0] = downRowOfDownSide[index];
    });
  } else {
    rightColumnOfRightSide.forEach((color, index) => {
      cube.U[0][index] = color;
    });
    cube.R.forEach((row, index) => {
      row[2] = downRowOfDownSide[2 - index];
    });
    leftColumnOfLeftSide.forEach((color, index) => {
      cube.D[2][index] = color;
    });
    cube.L.forEach((row, index) => {
      row[0] = upRowOfUpSide[2 - index];
    });
  }

  rotateSide(cube, SIDE.back, direction);
};

const rotateUpSide = (cube, direction) => {
  const sides = [SIDE.right, SIDE.front, SIDE.left, SIDE.back];
  const upRows = sides.map((side) => getUpRowOfSide(cube[side]));

  sides.forEach((side, idx) => {
    const upRow = upRows[getIndexByDirectionWhenRotateUp(idx, direction)];

    upRow.forEach((_, index, origin) => {
      cube[side][0][index] = isRelatedByBackSideWhenRotateUpSide(
        side,
        direction
      )
        ? origin[2 - index]
        : origin[index];
    });
  });

  rotateSide(cube, SIDE.up, direction);
};

const getIndexByDirectionWhenRotateUp = (index, direction) => {
  if (direction === "-") {
    return (index + 1) % 4;
  }
  return index - 1 < 0 ? 3 : index - 1;
};

const isRelatedByBackSideWhenRotateUpSide = (side, direction) => {
  return direction === "-"
    ? side === SIDE.left || side === SIDE.back
    : side === SIDE.right || side === SIDE.back;
};

const rotateDownSide = (cube, direction) => {
  const sides = [SIDE.right, SIDE.front, SIDE.left, SIDE.back];
  const downRows = sides.map((side) => getDownRowOfSide(cube[side]));

  sides.forEach((side, idx) => {
    const downRow = downRows[getIndexByDirectionWhenRotateDown(idx, direction)];

    downRow.forEach((_, index, origin) => {
      cube[side][2][index] = isRelatedByBackSideWhenRotateDownSide(
        side,
        direction
      )
        ? origin[2 - index]
        : origin[index];
    });
  });

  rotateSide(cube, SIDE.down, direction);
};

const getIndexByDirectionWhenRotateDown = (index, direction) => {
  if (direction === "-") {
    return index - 1 < 0 ? 3 : index - 1;
  }

  return (index + 1) % 4;
};

const isRelatedByBackSideWhenRotateDownSide = (side, direction) => {
  return direction === "-"
    ? side === SIDE.right || side === SIDE.back
    : side === SIDE.left || side === SIDE.back;
};

const rotateSide = (cube, side, direction) => {
  const newSide = cube[side].map((row) => [...row]);

  if (side === SIDE.back) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cube[side][i][j] =
          direction === "-" ? newSide[2 - j][i] : newSide[j][2 - i];
      }
    }
    return;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cube[side][i][j] =
        direction === "-" ? newSide[j][2 - i] : newSide[2 - j][i];
    }
  }
};

const getLeftColumnOfSide = (side) => {
  return [side[0][0], side[1][0], side[2][0]];
};

const getRightColumnOfSide = (side) => {
  return [side[0][2], side[1][2], side[2][2]];
};

const getUpRowOfSide = (side) => {
  return [...side[0]];
};

const getDownRowOfSide = (side) => {
  return [...side[2]];
};
```
