import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./sorting-page.length.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { BubleSort, SelectionSort, CreaterandomArr } from "./utils";
import uuid from "react-uuid";

type ProcessTypes = "Increase" | "Decrease";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<number>>([]);
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [type, setType] = useState<string>("selection");
  const [modified, setModified] = useState<string>("noneModified");
  const [proccess, setProccess] = useState<ProcessTypes>();

  useEffect(() => {
    createrandomArr();
  }, []);

  const bubleSort = (isIncrise: boolean) => {
    const arraysSorted = BubleSort(arr, isIncrise);
    arraysSorted.forEach((array, index) => {
      setTimeout(() => {
        setIndexes([...array.indexes]);
        setArr([...array.array]);
      }, DELAY_IN_MS * index);
    });
    setTimeout(() => {
      setIndexes([]);
      setModified("modified");
      setProccess(undefined);
    }, DELAY_IN_MS + DELAY_IN_MS * arraysSorted.length);
  };

  const selectionSort = (isIncrise: boolean) => {
    const arraysSorted = SelectionSort(arr, isIncrise);

    arraysSorted.forEach((array, index) => {
      setTimeout(() => {
        setIndexes([...array.indexes]);
        setArr([...array.array]);
      }, DELAY_IN_MS * index);
    });

    setTimeout(() => {
      setIndexes([]);
      setModified("modified");
      setProccess(undefined);
    }, DELAY_IN_MS * (arraysSorted.length + 1));
  };

  const sort = (isIncrise: boolean) => {
    setProccess(isIncrise ? "Increase" : "Decrease");
    setModified("loading");
    if (type === "selection") {
      selectionSort(isIncrise);
    } else if (type === "bubble") {
      bubleSort(isIncrise);
    }
  };

  const createrandomArr = () => {
    setModified("noneModified");
    const newArr = CreaterandomArr();
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
            isLoader={proccess === "Increase"}
          />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={() => sort(false)}
            disabled={modified === "loading"}
            isLoader={proccess === "Decrease"}
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
          <Column key={uuid()} index={num} state={color(index)} />
        ))}
      </div>
    </SolutionLayout>
  );
};
