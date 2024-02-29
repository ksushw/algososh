const changePosition = (
  arr: string[] | number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

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
  }
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
