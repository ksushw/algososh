import { ElementStates } from "../../types/element-states";

//String
export function ReverseString(string: string[]) {
  const resultArray = [];
  let start = 0;
  let end = string.length - 1;
  let arr = [...string];
  while (start < end) {
    changePosition(arr, start, end);
    let sorted = [...arr];
    resultArray.push(sorted);
    start++;
    end--;
  }
  return resultArray;
}

const changePosition = (
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const BackStringColour = (
  i: number,
  indexes: Array<number>,
  modified: string
): ElementStates => {
  if (indexes.indexOf(i) >= 0 && modified !== "modified") {
    return ElementStates.Changing;
  } else if (i < indexes[0] || i > indexes[1] || modified === "modified") {
    return ElementStates.Modified;
  } else {
    return ElementStates.Default;
  }
};

//Fibonacci
export const CanculateFibonacci = (number: number) => {
  if (number < 2) {
    return number === 1 ? [1] : [];
  }
  let arr = [1, 1];
  let ammount = number - 2;
  let lenght = arr.length;
  while (ammount) {
    arr[lenght] = arr[lenght - 1] + arr[lenght - 2];
    ammount--;
    lenght++;
  }
  return arr;
};
