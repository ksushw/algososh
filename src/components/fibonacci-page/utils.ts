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
