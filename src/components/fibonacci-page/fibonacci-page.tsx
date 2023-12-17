import React, { useState, ChangeEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
  const [string, setString] = useState<string>("");
  const [fibonachi, setFibonachi] = useState<Array<number | string>>([]);
  const [modified, setModified] = useState<string>("unmodified");

  const changeString = (e: ChangeEvent<HTMLInputElement>) => {
    setModified("noneModified");
    const newValue = e.target.value.length === 19 ? string : e.target.value;
    setString(newValue);
  };

  const calculate = (number: number): void => {
    setModified("loading");
    let arr = canculateFibonacci(number);
    for (let i = 0; i <= arr.length; i++) {
      let newArr = arr.slice(0, i);
      setTimeout(() => setFibonachi(newArr), 500 + 500 * i);
    }
    setTimeout(() => setModified("modified"), 500 * (arr.length + 1));
  };

  const canculateFibonacci = (number: number) => {
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
        {fibonachi.map((item, index) => (
          <Circle letter={String(item)} index={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
