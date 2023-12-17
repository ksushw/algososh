import React, { useState, ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string[]>([]);
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [modified, setModified] = useState<string>();
  const changeString = (e: ChangeEvent<HTMLInputElement>) => {
    setModified("noneModified");
    setIndexes([]);
    const newString = e.target.value.split("");
    setString(newString);
  };

  const addNew = (arr: Array<string>, start: number, end: number) => {
    setString(arr);
    if (start === Math.floor(string.length / 2)) {
      setIndexes([]);

      return;
    }
    setIndexes([start, end]);
  };

  const color = (i: number): ElementStates => {
    if (indexes.indexOf(i) >= 0 && modified !== "modified") {
      return ElementStates.Changing;
    } else if (i < indexes[0] || i > indexes[1] || modified === "modified") {
      return ElementStates.Modified;
    } else {
      return ElementStates.Default;
    }
  };

  const reverseString = () => {
    setModified("loading");
    let start = 0;
    let end = string.length - 1;
    let arr = [...string];
    while (start < end) {
      changePosition(arr, start, end);
      let sorted = [...arr];
      let startCopy = start;
      let startEnd = end;
      setTimeout(
        () => addNew(sorted, startCopy, startEnd),
        1000 + 1000 * start
      );
      start++;
      end--;
    }
    setTimeout(() => {
      setIndexes([
        Math.floor(string.length / 2),
        Math.floor(string.length / 2),
      ]);
      setModified("modified");
    }, 2000 + 1000 * start);
  };

  const changePosition = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          type="text"
          maxLength={11}
          isLimitText={true}
          onChange={changeString}
        ></Input>
        <Button
          text={"Развернуть"}
          onClick={reverseString}
          isLoader={modified === "loading"}
          disabled={modified === "modified"}
        />
      </div>
      <div className={styles.circles}>
        {string.map((item, index) => (
          <Circle letter={item} state={color(index)} />
        ))}
      </div>
    </SolutionLayout>
  );
};
