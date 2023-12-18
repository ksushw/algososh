import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [queue, setQueue] = useState<Array<string | undefined>>([]);
  const [tail, setTail] = useState<number>(-1);
  const [amount, setAmount] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const addItem = (item: string) => {
    let newArr = [...queue];
    newArr.push(item);
    setAmount(amount + 1);
    setTail(tail + 1);
    setQueue(newArr);
    setValue("");
  };

  const deleteItem = () => {
    let newArr = [...queue];
    newArr.pop();
    setQueue(newArr);
    setAmount(amount - 1);
    setTail(tail - 1);
  };

  const removeItems = () => {
    setTail(-1);
    setQueue([]);
    setAmount(0);
    setTail(-1);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          maxLength={4}
          isLimitText={true}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <Button
          text={"Добавить"}
          disabled={!value.length}
          onClick={() => addItem(value)}
        />
        <Button text={"Удалить"} disabled={amount < 1} onClick={deleteItem} />
        <Button
          onClick={removeItems}
          text={"Очистить"}
          extraClass={styles.lastButton}
          disabled={amount < 1}
        />
      </div>
      <div className={styles.circles}>
        {queue.map((element, index) => (
          <Circle
            letter={element ? element : ""}
            index={index}
            key={index}
            head={tail === index ? "top" : ""}
            state={
              tail === index && amount
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
