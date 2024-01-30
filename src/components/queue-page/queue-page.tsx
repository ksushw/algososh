import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<Array<string | undefined>>([]);
  const [tail, setTail] = useState<number>(-1);
  const [start, setStart] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const movePosition = (value: number, setter: Function) => {
    if (value === 6) {
      setter(0);
    } else {
      setter(value + 1);
    }
  };

  const addItem = (item: string) => {
    let newArr = [...queue];
    if (tail === 6) {
      newArr[0] = item;
    } else {
      newArr[tail + 1] = item;
    }
    setAmount(amount + 1);
    movePosition(tail, setTail);
    setQueue(newArr);
    setValue("");
  };

  const deleteItem = () => {
    movePosition(start, setStart);
    let newArr = [...queue];
    newArr[start] = undefined;
    setQueue(newArr);
    setAmount(amount - 1);
  };

  const removeItems = () => {
    setTail(-1);
    setStart(0);
    setQueue(defoultArr());
    setAmount(0);
  };

  const defoultArr = () => {
    let newArr = [];
    for (let i = 0; i <= 6; i++) {
      newArr[i] = undefined;
    }
    return newArr;
  };

  useEffect(() => {
    setQueue(defoultArr());
  }, []);

  return (
    <SolutionLayout title="Очередь">
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
          onClick={() => addItem(value)}
          disabled={amount >= 7 || !value.length}
        />
        <Button text={"Удалить"} onClick={deleteItem} disabled={amount < 1} />
        <Button
          text={"Очистить"}
          extraClass={styles.lastButton}
          onClick={removeItems}
          disabled={amount < 1}
        />
      </div>
      <div className={styles.circles}>
        {queue.map((element, index) => (
          <Circle
            letter={element ? element : ""}
            index={index}
            key={index}
            head={start === index ? "head" : ""}
            tail={tail === index ? "tail" : ""}
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
