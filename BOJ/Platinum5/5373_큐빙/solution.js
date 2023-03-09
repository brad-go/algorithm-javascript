const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = +input[0];
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

let index = 1;

for (let i = 0; i < T; i++) {
  const N = input[index++];
  const rotates = input[index++].split(" ");

  console.log(solution(N, rotates));
}
