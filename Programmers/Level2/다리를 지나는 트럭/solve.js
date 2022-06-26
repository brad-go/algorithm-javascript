const bridge_length = 2;
const weight = 10;
const truck_weights = [7, 4, 5, 6];
// const bridge_length = 100;
// const weight = 100;
// const truck_weights = [10];
// const bridge_length = 100;
// const weight = 100;
// const truck_weights = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

function solution(bridge_length, weight, truck_weights) {
  const q = [{ weight: 0, passTime: 0 }];

  let time = 0;
  let weightOnBridge = 0;

  while (q.length > 0 || truck_weights.length > 0) {
    if (q[0].passTime === time) weightOnBridge -= q.shift().weight;

    let nextTruckWeight = truck_weights[0];

    if (weightOnBridge + nextTruckWeight <= weight) {
      weightOnBridge += nextTruckWeight;
      q.push({ weight: truck_weights.shift(), passTime: time + bridge_length });
    } else {
      const firstTruck = q[0];
      if (firstTruck) time = firstTruck.passTime - 1;
    }

    time++;
  }

  return time;
}

console.log(solution(bridge_length, weight, truck_weights));
