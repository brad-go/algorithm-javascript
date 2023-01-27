const solution = (n) => {
  const movements = [];
  
  move(1, 3, n, movements);
  
  return movements;
}

const move = (from, to, count, movements) => {
  if (count === 1) {
      movements.push([from, to]);
      return;
  }

  const help = 6 - to - from;
  
  move(from, help, count - 1, movements);
  movements.push([from, to]);
  move(help, to, count - 1, movements);
}