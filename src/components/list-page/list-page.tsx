import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<number>(-1);
  const [lenght, setLenght] = useState<number>(0);
  const [arr, setArr] = useState<Array<string>>([]);
  const [top, setTop] = useState<any>();

  const addNode = (value: string) => {
    const newNode = new Node(value);
    if (!lenght) {
      setTop(newNode);
    } else if (lenght === 1) {
      top.next = newNode;
    } else {
      let current = top;
      for (let i = 1; i < lenght; i++) {
        current = current.next;
      }
      current.next = newNode;
    }
    setLenght(lenght + 1);
  };

  const unshift = (value: string) => {
    const newNode = new Node(value);
    let oldTop = { ...top };
    newNode.next = oldTop;
    setTop(newNode);
  };

  const shift = () => {
    let secondNode = top.next;
    setTop(secondNode);
  };

  const pop = () => {
    let current = top;
    for (let i = 1; i < lenght - 1; i++) {
      current = current.next;
    }
    current.next = null;
    // setTop(secondNode);
  };

  const getElements = () => {
    let curr = top;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    setArr(res);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          value={value}
          maxLength={4}
          max={4}
          type="text"
          isLimitText={true}
          placeholder="Введите значение"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <Button
          text={"Добавить в head"}
          onClick={() => {
            unshift(value);
          }}
        />
        <Button text={"Добавить в tail"} onClick={() => addNode(value)} />
        <Button text={"Удалить из head"} onClick={shift} />
        <Button text={"Удалить из tail"} onClick={pop} />
        <Input
          placeholder="Введите индекс"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIndex(Number(e.target.value))
          }
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.secodThirdColumn}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.forthFithColumn}
          onClick={getElements}
        />
      </div>
      <div className={styles.circles}>
        {arr.map((el, index) => (
          <>
            <Circle letter={el} index={index} head={"head"} />
            <ArrowIcon />
          </>
        ))}
      </div>
    </SolutionLayout>
  );
};
