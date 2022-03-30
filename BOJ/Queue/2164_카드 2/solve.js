const input = Number(
  require("fs").readFileSync("./input.txt").toString().trim()
);

// Solution 1

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  deQueue() {
    if (!this.length) return;
    const outcome = this.head.item;
    this.head = this.head.next;
    this.length--;
    return outcome;
  }

  enQueue(item) {
    const node = new Node(item);
    if (!this.head) {
      this.head = node;
      this.head.next = this.tail;
    } else this.tail.next = node;

    this.tail = node;
    this.length++;
  }
}

function Solution(input) {
  const deck = new Queue();

  for (let i = 0; i < input; i++) {
    deck.enQueue(i + 1);
  }

  while (deck.length > 1) {
    deck.deQueue();
    if (deck.length > 1) {
      const top = deck.deQueue();
      deck.enQueue(top);
    }
  }
  console.log(deck.head.item);
}

Solution(input);

// Solution 2

// function Solution(input) {
//   const deck = new Array(input).fill().map((_, idx) => idx + 1);

//   let start = 0;
//   while (start < deck.length - 1) {
//     deck.push(deck[start + 1]);
//     start += 2;
//   }

//   console.log(deck[deck.length - 1]);
// }

// Solution(input);
