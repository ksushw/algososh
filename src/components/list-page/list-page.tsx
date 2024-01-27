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
  const [length, setLength] = useState<number>(0);
  const [arr, setArr] = useState<Array<string>>([]);
  const [top, setTop] = useState<any>();
  const [changing, setChanging] = useState<number>();
  const [modified, setModified] = useState<number>();

  const push = () => {
    const newNode = new Node(value);
    if (!length) {
      getElements(newNode, length - 1);
    } else {
      let current = top;
      for (let i = 1; i < length; i++) {
        current = current.next;
      }
      current.next = newNode;
      getElements(top, length - 1);
    }
    setLength(length + 1);
  };

  const pop = () => {
    if (length !== 1) {
      let current = top;
      for (let i = 1; i < length - 1; i++) {
        current = current.next;
      }
      current.next = null;
      getElements(top, length - 1);
    } else {
      getElements(null, length - 1);
    }
    setLength(length - 1);
  };

  const shift = () => {
    console.log(3);
    const newNode = new Node(value);
    newNode.next = top;
    getElements(newNode, 0);
    setLength(length + 1);
  };

  const unshift = () => {
    let secondNode = top.next;
    getElements(secondNode, 0);
    setLength(length - 1);
  };

  const addByIndex = () => {
    if (Number(index) <= 0) {
      shift();
    } else if (Number(index) > length - 1) {
      push();
    } else {
      let current = top;
      for (let i = 0; i <= Number(index) - 2; i++) {
        current = current.next;
      }
      const newNode = new Node(value);
      const rightSide = current.next;
      current.next = newNode;
      newNode.next = rightSide;
      setLength(length + 1);
      getElements(top, index);
    }
  };

  const removeByIndex = () => {
    if (Number(index) <= 0) {
      unshift();
    } else if (Number(index) > length - 1) {
      pop();
    } else {
      let current = top;
      for (let i = 0; i <= Number(index) - 2; i++) {
        current = current.next;
      }
      current.next = current.next.next;
      setLength(length - 1);
      getElements(top, index);
    }
  };

  const getElements = (top: Node<string> | null, index: number) => {
    let curr = top;
    let res: Array<string> = [];
    setChanging(index);
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    setTimeout(() => {
      setArr(res);
      setTop(top);
      setChanging(-1);
      setModified(index + 1 !== length ? index : index + 1);

      setTimeout(() => {
        setModified(undefined);
      }, 500);
    }, 500);
  };
  console.log(length);
  console.log(modified);
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
            shift();
            // setValue("");
          }}
          disabled={value.trim() == ""}
        />
        <Button
          text={"Добавить в tail"}
          onClick={() => {
            push();
            // setValue("");
          }}
          disabled={value.trim() == ""}
        />
        <Button
          text={"Удалить из head"}
          onClick={() => {
            unshift();
          }}
          disabled={length <= 0}
        />
        <Button
          text={"Удалить из tail"}
          onClick={() => {
            pop();
          }}
          disabled={length <= 0}
        />
        <Input
          placeholder="Введите индекс"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIndex(Number(e.target.value))
          }
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.secodThirdColumn}
          onClick={() => {
            addByIndex();
          }}
          disabled={value.trim() == "" || index <= 0}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.forthFithColumn}
          onClick={() => {
            removeByIndex();
          }}
          disabled={index <= 0 || length <= 0}
        />
      </div>
      <div className={styles.circles}>
        {arr.map((el, index) => (
          <>
            {index === changing ? (
              <Circle
                letter={el}
                index={index}
                head={
                  <Circle
                    state={ElementStates.Changing}
                    isSmall={true}
                    letter={value}
                  />
                }
              />
            ) : (
              <Circle
                state={
                  index === modified && index !== length
                    ? ElementStates.Modified
                    : ElementStates.Default
                }
                letter={el}
                index={index}
                head={
                  index === changing ? (
                    <Circle isSmall={true} letter={value} />
                  ) : index === 0 ? (
                    "head"
                  ) : (
                    ""
                  )
                }
                tail={
                  index > 50 ? (
                    <Circle isSmall={true} letter={value} />
                  ) : index === length - 1 ? (
                    "tail"
                  ) : (
                    ""
                  )
                }
              />
            )}
            <ArrowIcon />
          </>
        ))}
      </div>
    </SolutionLayout>
  );
};
