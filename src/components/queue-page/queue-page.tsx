import React, { useState, ChangeEvent } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { IQueue } from "../../types/queque";

class Stack<T> implements IQueue<T> {
  private container: Array<T | ""> = [];
  private tail: number = -1;
  private start: number = 0;

  enqueue = (item: T): void => {
    console.log(item, this.container);
    if (this.tail >= 6) {
      this.container[0] = item;
      this.tail = 0;
    } else {
      this.container[this.tail + 1] = item;
      ++this.tail;
    }
  };

  dequeue = (): void => {
    if (this.getSize()) {
      this.container[this.start] = "";
      if (this.start === 6) {
        this.start = 0;
      } else {
        ++this.start;
      }
    }
  };

  peak = () => {
    this.container = [];
    this.tail = -1;
    this.start = 0;
  };

  getSize = () => this.container.length;
  getStack = () => this.container;
}

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<IQueue<string>>(new Stack());
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
    queue.enqueue(item);
    setAmount(amount + 1);
    movePosition(tail, setTail);
  };

  const deleteItem = () => {
    queue.dequeue();
    movePosition(start, setStart);
    setAmount(amount - 1);
  };

  const removeItems = () => {
    queue.peak();
    setTail(-1);
    setStart(0);
    setAmount(0);
  };

  const array = queue.getStack();

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
          extraClass="add_button"
        />
        <Button
          text={"Удалить"}
          onClick={deleteItem}
          disabled={amount < 1}
          extraClass="delete_button"
        />
        <Button
          text={"Очистить"}
          extraClass={styles.lastButton + " remove_button"}
          onClick={removeItems}
          disabled={amount < 1}
        />
      </div>
      <div className={styles.circles}>
        {array.map((element, index) => (
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
