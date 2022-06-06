const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(n);
const inorder = input[0].split(" ").map(Number);
const postorder = input[1].split(" ").map(Number);

function Solution(N, inorder, postorder) {
  const answer = [];

  // 인덱스를 찾는 비용을 줄이기 위해 중위 순회 값들의 인덱스를 배열에 저장하기
  const indicies = [];
  for (let i = 0; i < N; i++) {
    indicies[inorder[i]] = i;
  }

  // 후위 순회에서 현재 서브 트리의 루트 노드 찾기
  // 중위 순회의 현재 루트 노드의 인덱스를 기준으로 왼쪽 오른쪽 서브 트리로 나누고 반복
  const findPreorder = (inStart, inEnd, postStart, postEnd) => {
    if (inStart > inEnd || postStart > postEnd) return;

    const root = postorder[postEnd];
    answer.push(root);

    const rootIdx = indicies[root];
    const leftSize = rootIdx - inStart;
    const rightSize = inEnd - rootIdx;

    findPreorder(inStart, rootIdx - 1, postStart, postStart + leftSize - 1);
    findPreorder(rootIdx + 1, inEnd, postEnd - rightSize, postEnd - 1);
  };

  findPreorder(0, N - 1, 0, N - 1);

  console.log(answer.join(" "));
}

Solution(N, inorder, postorder);
