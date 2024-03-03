import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { IStack } from "../../types/stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import uuid from "react-uuid";

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
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

type ProcessTypes = "Add" | "Delete" | "Remove";

export const StackPage: React.FC = () => {
  const [queue, setQueue] = useState<IStack<string>>(new Stack());
  const [tail, setTail] = useState<number>(-1);
  const [changing, setChanging] = useState<number>(-1);
  const [amount, setAmount] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [proccess, setProccess] = useState<ProcessTypes>();

  const addItem = () => {
    setProccess("Add");
    queue.push(value);
    setAmount(amount + 1);
    setTail(tail + 1);
    setChanging(tail + 1);
    setTimeout(() => {
      setChanging(-1);
      setProccess(undefined);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteItem = () => {
    setProccess("Delete");
    queue.pop();
    setAmount(amount - 1);
    setTail(tail - 1);
    setChanging(tail - 1);
    setTimeout(() => {
      setChanging(-1);
      setProccess(undefined);
    }, SHORT_DELAY_IN_MS);
  };

  const removeItems = () => {
    setProccess("Remove");
    queue.peak();
    setAmount(0);
    setTail(-1);
    setTimeout(() => {
      setProccess(undefined);
    }, SHORT_DELAY_IN_MS);
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
        <Button
          text={"Добавить"}
          disabled={!value.length || Boolean(proccess)}
          onClick={addItem}
          extraClass="add_button"
          isLoader={proccess === "Add"}
        />
        <Button
          text={"Удалить"}
          disabled={amount < 1 || Boolean(proccess)}
          onClick={deleteItem}
          extraClass="delete_button"
          isLoader={proccess === "Delete"}
        />
        <Button
          onClick={removeItems}
          text={"Очистить"}
          extraClass={styles.lastButton + " remove_button"}
          disabled={amount < 1 || Boolean(proccess)}
          isLoader={proccess === "Remove"}
        />
      </div>
      <div className={styles.circles}>
        {array.map((element, index) => (
          <Circle
            letter={element ? element : ""}
            index={index}
            key={uuid()}
            head={index === 0 ? "top" : ""}
            tail={tail === index ? "tail" : ""}
            state={
              changing === index && amount
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
