const solution = (operations) => {
  const queue = [];

  operations.forEach((operation) => {
    const [command, value] = operation.split(" ");

    if (command === "I") {
      queue.push(Number(value));
      return;
    }

    if (!queue.length) return;

    const val = (Number(value) < 0 ? Math.min : Math.max)(...queue);
    const deleteIndex = queue.findIndex((item) => item === val);

    queue.splice(deleteIndex, 1);
  });

  return queue.length ? [Math.max(...queue), Math.min(...queue)] : [0, 0];
};
