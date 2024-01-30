import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { IStack } from "../../types/stack";

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    console.log(this.container, item);
    this.container.push(item);
  };

  pop = (): void => {
    if (this.getSize()) {
      this.container.pop();
    }
  };

  peak = () => {
    this.container = [];
  };

  getSize = () => this.container.length;
  getStack = () => this.container;
}

export const StackPage: React.FC = () => {
  const [queue, setQueue] = useState<IStack<string>>(new Stack());
  const [tail, setTail] = useState<number>(-1);
  const [amount, setAmount] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const addItem = () => {
    queue.push(value);
    console.log(queue.getStack());
    setAmount(amount + 1);
    setTail(tail + 1);
  };

  const deleteItem = () => {
    queue.pop();
    setAmount(amount - 1);
    setTail(tail - 1);
  };

  const removeItems = () => {
    queue.peak();
    setAmount(0);
    setTail(-1);
  };

  const array = queue.getStack();

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
        <Button text={"Добавить"} disabled={!value.length} onClick={addItem} />
        <Button text={"Удалить"} disabled={amount < 1} onClick={deleteItem} />
        <Button
          onClick={removeItems}
          text={"Очистить"}
          extraClass={styles.lastButton}
          disabled={amount < 1}
        />
      </div>
      <div className={styles.circles}>
        {array.map((element, index) => (
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
