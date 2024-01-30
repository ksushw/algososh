import React, { useState, ChangeEvent } from "react";
import styles from "./sorting-page.length.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<number>>([]);
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [type, setType] = useState<string>("selection");
  const [modified, setModified] = useState<string>("noneModified");

  const bubleSort = (isIncrise: boolean) => {
    let newArr = [...arr];
    let count = 0;
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length; j++) {
        setTimeout(() => {
          setIndexes([j + 1, j + 2, newArr.length - 1 - i]);
        }, DELAY_IN_MS + DELAY_IN_MS * count);
        if (isIncrise ? newArr[j] > newArr[j + 1] : newArr[j] < newArr[j + 1]) {
          changePosition(newArr, j, j + 1);
          let itermidiateArr = [...newArr];
          setTimeout(() => {
            setArr(itermidiateArr);
          }, DELAY_IN_MS + DELAY_IN_MS * count);
          count++;
        }
      }
    }
    setTimeout(() => {
      setIndexes([]);
      setModified("modified");
    }, DELAY_IN_MS + DELAY_IN_MS * count);
  };

  const selectionSort = (isIncrise: boolean) => {
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      let min = i;
      for (let j = i; j < newArr.length; j++) {
        if (isIncrise ? newArr[j] < newArr[min] : newArr[j] > newArr[min]) {
          min = j;
        }
      }
      changePosition(newArr, i, min);
      let copeidArr = [...newArr];
      setTimeout(() => {
        isIncrise
          ? setIndexes([i + 1, min, i + 1])
          : setIndexes([i - 1, min, i - 1]);
        setArr(copeidArr);
      }, DELAY_IN_MS + DELAY_IN_MS * i);
    }
    setTimeout(() => {
      setIndexes([]);
      setModified("modified");
    }, DELAY_IN_MS * (newArr.length + 1));
  };

  const sort = (isIncrise: boolean) => {
    setModified("loading");
    if (type === "selection") {
      selectionSort(isIncrise);
    } else if (type === "bubble") {
      bubleSort(isIncrise);
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
    setModified("noneModified");
    const newArr = [];
    const length = createRandomNumber(3, 17);
    for (let i = 0; i < length; i++) {
      newArr.push(createRandomNumber(1, 100));
    }
    setArr(newArr);
  };

  const color = (i: number): ElementStates => {
    if (
      indexes.indexOf(i) !== 2 &&
      indexes.indexOf(i) >= 0 &&
      modified !== "modified"
    ) {
      return ElementStates.Changing;
    } else if (
      (type === "bubble" ? i > indexes[2] : i < indexes[2]) ||
      modified === "modified"
    ) {
      return ElementStates.Modified;
    } else {
      return ElementStates.Default;
    }
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <fieldset className={styles.sortedByttons}>
          <RadioInput
            name="sorting"
            label="Выбор"
            extraClass="mr-10"
            value="selection"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setType(e.target.value)
            }
            defaultChecked
          />
          <RadioInput
            name="sorting"
            label="Пузырек"
            value="bubble"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setType(e.target.value)
            }
          />
        </fieldset>
        <div className={styles.sortedByttons}>
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            extraClass="mr-6"
            onClick={() => sort(true)}
            disabled={modified === "loading"}
          />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={() => sort(false)}
            disabled={modified === "loading"}
          />
        </div>
        <Button
          text={"Новый массив"}
          extraClass="ml-9"
          onClick={createrandomArr}
          disabled={modified === "loading"}
        />
      </div>
      <div className={styles.columns + " mt-12"}>
        {arr.map((num, index) => (
          <Column key={index} index={num} state={color(index)} />
        ))}
      </div>
    </SolutionLayout>
  );
};
