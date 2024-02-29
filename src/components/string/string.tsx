import React, { useState, ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { DELAY_IN_MS } from "../../constants/delays";
import { ReverseString, BackStringColour } from "./utils";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string[]>([]);
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [modified, setModified] = useState<string>("noneModified");

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

  const reverseString = () => {
    setModified("loading");
    const allString = ReverseString(string);

    let start = 0;
    let end = string.length - 1;

    while (allString[start]) {
      let startCopy = start;
      let startEnd = end;
      setTimeout(
        () => addNew(allString[start - 1], startCopy, startEnd),
        DELAY_IN_MS + DELAY_IN_MS * start
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
    }, (1 + start) * DELAY_IN_MS);
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
          <Circle
            letter={item}
            state={BackStringColour(index, indexes, modified)}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
