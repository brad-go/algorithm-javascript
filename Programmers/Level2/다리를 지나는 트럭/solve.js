const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const bridge_length = +input[0];
const weight = +input[1];
const truck_weights = input[2].split(" ").map(Number);

const solution = (bridge_length, weight, truck_weights) => {
  const trucksOnBridge = [{ weight: 0, passTime: 0 }];

  let time = 0;
  let weightOnBridge = 0;

  while (trucksOnBridge.length > 0 || truck_weights.length > 0) {
    const { passTime } = trucksOnBridge[0];

    if (passTime === time) {
      const { weight } = trucksOnBridge.shift();
      weightOnBridge -= weight;
    }

    if (canAddTruckToBridge(weightOnBridge, truck_weights[0], weight)) {
      const nextTruck = {
        weight: truck_weights.shift(),
        passTime: time + bridge_length,
      };

      weightOnBridge += nextTruck.weight;
      addTruckToBridge(trucksOnBridge, nextTruck.weight, nextTruck.passTime);
    } else {
      const firstTruck = trucksOnBridge[0];

      if (firstTruck) {
        time = firstTruck.passTime - 1;
      }
    }

    time++;
  }

  return time;
};

const canAddTruckToBridge = (weightOnBridge, truckWeight, weight) => {
  return weightOnBridge + truckWeight <= weight;
};

const addTruckToBridge = (trucksOnBridge, truckWeight, passTime) => {
  const truck = { weight: truckWeight, passTime };
  trucksOnBridge.push(truck);
};

console.log(solution(bridge_length, weight, truck_weights));
