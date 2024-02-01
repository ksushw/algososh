import React, { useState, ChangeEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { CanculateFibonacci } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [string, setString] = useState<string>("");
  const [fibonacci, setFibonacci] = useState<Array<number | string>>([]);
  const [modified, setModified] = useState("unmodified");

  const changeString = (e: ChangeEvent<HTMLInputElement>) => {
    setModified("noneModified");
    const newValue = e.target.value.length === 19 ? string : e.target.value;
    setString(newValue);
  };

  const calculate = (number: number): void => {
    setModified("loading");
    let arr = CanculateFibonacci(number);
    for (let i = 0; i <= arr.length; i++) {
      let newArr = arr.slice(0, i);
      setTimeout(
        () => setFibonacci(newArr),
        SHORT_DELAY_IN_MS + SHORT_DELAY_IN_MS * i
      );
    }
    setTimeout(
      () => setModified("modified"),
      SHORT_DELAY_IN_MS * (arr.length + 1)
    );
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          value={string}
          type="number"
          maxLength={19}
          max={19}
          isLimitText={true}
          onChange={changeString}
        ></Input>
        <Button
          text={"Рассчитать"}
          onClick={() => calculate(Number(string))}
          isLoader={modified === "loading"}
          disabled={modified === "modified"}
        />
      </div>
      <div className={styles.circles}>
        {fibonacci.map((item, index) => (
          <Circle letter={String(item)} index={index} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
