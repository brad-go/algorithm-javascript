const solution = (grid) => {
  const ROW_LEN = grid.length;
  const COL_LEN = grid[0].length;

  const cycles = [];
  const visited = Array.from({ length: ROW_LEN }, () => {
    return Array.from({ length: COL_LEN }, () => Array(4).fill(0));
  });

  const bfs = (sr, sc, sdir) => {
    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];

    const queue = [[sr, sc, sdir, 0]];
    const direction = {
      S: (dir) => dir,
      L: (dir) => (dir + 3) % 4,
      R: (dir) => (dir + 1) % 4,
    };

    while (queue.length) {
      const [r, c, dir, len] = queue.shift();

      const ndir = direction[grid[r][c]](dir);
      const nr = r + DR[ndir] < 0 ? ROW_LEN - 1 : (r + DR[ndir]) % ROW_LEN;
      const nc = c + DC[ndir] < 0 ? COL_LEN - 1 : (c + DC[ndir]) % COL_LEN;

      visited[nr][nc][ndir] = 1;

      if (visited[sr][sc][sdir]) return len + 1;

      queue.push([nr, nc, ndir, len + 1]);
    }
  };

  for (let r = 0; r < ROW_LEN; r++) {
    for (let c = 0; c < COL_LEN; c++) {
      for (let dir = 0; dir < 4; dir++) {
        if (visited[r][c][dir]) continue;

        cycles.push(bfs(r, c, dir));
      }
    }
  }

  return cycles.sort((a, b) => a - b);
};
