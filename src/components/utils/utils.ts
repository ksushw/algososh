import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

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
  arr: string[] | number[],
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

// Sorting

export const BubleSort = (array: number[], isIncrise: boolean) => {
  const resultArray = [];
  let newArr = [...array];
  let count = 0;
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length; j++) {
      if (isIncrise ? newArr[j] > newArr[j + 1] : newArr[j] < newArr[j + 1]) {
        changePosition(newArr, j, j + 1);
        let itermidiateArr = [...newArr];
        count++;
        resultArray.push({ indexes: [j + 1, j + 2], array: itermidiateArr });
      } else {
        resultArray.push({ indexes: [j + 1, j + 2], array: [...newArr] });
      }
    }
  }
  return resultArray;
};

export const SelectionSort = (array: number[], isIncrise: boolean) => {
  const resultArray = [];

  let newArr = [...array];
  for (let i = 0; i < newArr.length; i++) {
    let min = i;
    for (let j = i; j < newArr.length; j++) {
      if (isIncrise ? newArr[j] < newArr[min] : newArr[j] > newArr[min]) {
        min = j;
      }
    }
    changePosition(newArr, i, min);

    resultArray.push({
      indexes: isIncrise ? [i + 1, min, i + 1] : [i - 1, min, i - 1],
      array: [...newArr],
    });

    // setTimeout(() => {
    //   isIncrise
    //     ? setIndexes([i + 1, min, i + 1])
    //     : setIndexes([i - 1, min, i - 1]);
    //   setArr(copeidArr);
    // }, DELAY_IN_MS + DELAY_IN_MS * i);
  }
  // setTimeout(() => {
  //   setIndexes([]);
  //   setModified("modified");
  // }, DELAY_IN_MS * (newArr.length + 1));
  return resultArray;
};

export const CreateRandomNumber = (minLen: number, maxLen: number): number => {
  maxLen = maxLen + 1;
  return minLen + Math.floor(Math.random() * (maxLen - minLen));
};

export const CreaterandomArr = () => {
  const newArr = [];
  const length = CreateRandomNumber(3, 17);
  for (let i = 0; i < length; i++) {
    newArr.push(CreateRandomNumber(1, 100));
  }
  return newArr;
};
