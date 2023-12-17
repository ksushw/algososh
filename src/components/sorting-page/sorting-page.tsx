import React, { useState, ChangeEvent } from "react";
import styles from "./sorting-page.length.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<number>>([]);
  const [indexes, setIndexes] = useState<Array<number>>([]);

  const bubleSort = (incrise: boolean) => {
    let newArr = [...arr];
    let count = 0;
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length; j++) {
        setTimeout(() => {
          setIndexes([j, j + 1]);
        }, 1000 + 1000 * count);
        if (incrise ? newArr[j] > newArr[j + 1] : newArr[j] < newArr[j + 1]) {
          changePosition(newArr, j, j + 1);
          let itermidiateArr = [...newArr];
          setTimeout(() => {
            setArr(itermidiateArr);
          }, 1000 + 1000 * count);
          count++;
        }
        setTimeout(() => setIndexes([]), 1000 + 1000 * (count + 1));
      }
    }
  };

  const changePosition = (
    arr: number[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const createRandomNumber = (minLen: number, maxLen: number): number => {
    maxLen = maxLen + 1;
    return minLen + Math.floor(Math.random() * (maxLen - minLen));
  };

  const createrandomArr = () => {
    const newArr = [];
    const length = createRandomNumber(3, 17);
    for (let i = 0; i < length; i++) {
      newArr.push(createRandomNumber(1, 100));
    }
    setArr(newArr);
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <form className={styles.sortedByttons}>
          <RadioInput name="sorting" label="Выбор" extraClass="mr-10" />
          <RadioInput name="sorting" label="Пузырек" />
        </form>
        <div className={styles.sortedByttons}>
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            extraClass="mr-6"
            onClick={() => bubleSort(true)}
          />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={() => bubleSort(false)}
          />
        </div>
        <Button
          text={"Новый массив"}
          extraClass="ml-9"
          onClick={createrandomArr}
        />
      </div>
      <div className={styles.columns + " mt-12"}>
        {arr.map((num, index) => (
          <Column
            index={num}
            state={
              indexes.indexOf(index) >= 0
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
