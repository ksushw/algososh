import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

class Node<T> {
  constructor(value: T, next?: Node<T> | undefined) {
    this.value = value;
    this.next = next === undefined ? undefined : next;
  }
  value: T;
  next: Node<T> | undefined;
}

type ProcessTypes =
  | "Push"
  | "Pop"
  | "Shift"
  | "Unshift"
  | "AddByIndex"
  | "RemoveByIndex";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<number>(-1);
  const [length, setLength] = useState<number>(0);
  const [arr, setArr] = useState<Array<string>>([]);
  const [top, setTop] = useState<Node<string>>();
  const [changing, setChanging] = useState<Record<number, string>>();
  const [modified, setModified] = useState<Array<number>>([]);
  const [proccess, setProccess] = useState<ProcessTypes>();

  const push = () => {
    setProccess("Push");
    const newNode = new Node(value);
    if (!length) {
      getElements(newNode, length - 1, value);
    } else {
      if (top) {
        let current = top;
        for (let i = 1; i < length; i++) {
          if (current?.next) {
            current = current.next;
          }
        }
        current.next = newNode;
        getElements(top, length - 1, value);
      }
    }

    setTimeout(() => {
      setModified([length]);

      setTimeout(() => {
        setModified([]);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
    setLength(length + 1);
  };

  const pop = () => {
    setProccess("Pop");
    makePlace(length - 1);

    if (length !== 1) {
      if (top) {
        let current = top;
        for (let i = 1; i < length - 1; i++) {
          if (current?.next) {
            current = current.next;
          }
        }
        current.next = undefined;
        getElements(top, length - 1, value);
        setChanging({ [length - 1]: current.value });
      }
    } else {
      getElements(undefined, length - 1, value);
    }
    setLength(length - 1);
  };

  const shift = () => {
    setProccess("Shift");
    const newNode = new Node(value);
    newNode.next = top;
    getElements(newNode, 0, value);

    setTimeout(() => {
      setModified([0]);
      setTimeout(() => {
        setModified([]);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
    setLength(length + 1);
  };

  const unshift = () => {
    setProccess("Unshift");
    makePlace(0);
    if (top?.next) {
      let secondNode = top.next;
      setChanging({ [0]: top.value });
      getElements(secondNode, 0, value);
    }

    setLength(length - 1);
  };

  const addByIndex = () => {
    setProccess("AddByIndex");
    if (Number(index) <= 0) {
      shift();
    } else {
      let current = top;
      if (current) {
        for (let i = 0; i <= Number(index) - 2; i++) {
          if (current.next) current = current.next;
        }
        const newNode = new Node(value);
        const rightSide = current.next;
        current.next = newNode;
        newNode.next = rightSide;

        doStepAnimation(index);

        setTimeout(() => {
          setLength(length + 1);
          getElements(top, index, value);
        }, DELAY_IN_MS * (index + 1));
      }
    }
  };

  const removeByIndex = () => {
    setProccess("RemoveByIndex");
    if (Number(index) <= 0) {
      unshift();
    } else {
      let current = top;

      if (current) {
        for (let i = 0; i <= Number(index) - 2; i++) {
          if (current?.next) {
            current = current.next;
          }
        }
        const deletedValue = current?.next?.value;
        current.next = current?.next?.next;

        doStepAnimation(index);

        setTimeout(() => {
          makePlace(index);
          setLength(length - 1);
          getElements(top, index, deletedValue ? deletedValue : "");
        }, DELAY_IN_MS * index);
      }
    }
  };

  const getElements = (
    top: Node<string> | undefined,
    index: number,
    value: string
  ) => {
    let curr = top;
    let res: Array<string> = [];
    setChanging({ [index]: value });
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    setTimeout(() => {
      setArr(res);
      setTop(top);
      setChanging(undefined);
      setValue("");
      setIndex(-1);
      setProccess(undefined);
    }, DELAY_IN_MS);
  };

  // animation functions
  const makePlace = (index: number) => {
    const arrCopied = [...arr];
    arrCopied[index] = "";
    setArr(arrCopied);
  };

  const doStepAnimation = (end: number) => {
    let indexes: Array<number> = [];
    for (let j = 0; j <= end; j++) {
      setTimeout(() => {
        indexes.push(j);
        setModified([...indexes]);
      }, DELAY_IN_MS * j);
    }

    setTimeout(() => {
      setModified([]);
    }, DELAY_IN_MS * (index + 1));
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
          disabled={Boolean(proccess)}
        />
        <Button
          text={"Добавить в head"}
          onClick={shift}
          disabled={value.trim() == "" || Boolean(proccess)}
          isLoader={proccess === "Shift"}
        />
        <Button
          text={"Добавить в tail"}
          onClick={push}
          disabled={value.trim() == "" || Boolean(proccess)}
          isLoader={proccess === "Push"}
        />
        <Button
          text={"Удалить из head"}
          onClick={unshift}
          disabled={length <= 0 || Boolean(proccess)}
          isLoader={proccess === "Unshift"}
        />
        <Button
          text={"Удалить из tail"}
          onClick={pop}
          disabled={length <= 0 || Boolean(proccess)}
          isLoader={proccess === "Pop"}
        />
        <Input
          placeholder="Введите индекс"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIndex(Number(e.target.value))
          }
          disabled={Boolean(proccess)}
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.secodThirdColumn}
          onClick={addByIndex}
          disabled={value.trim() == "" || index <= 0 || Boolean(proccess)}
          isLoader={proccess === "AddByIndex"}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.forthFithColumn}
          onClick={removeByIndex}
          disabled={index <= 0 || length <= 0 || Boolean(proccess)}
          isLoader={proccess === "RemoveByIndex"}
        />
      </div>
      <div className={styles.circles}>
        {arr.map((el, index) => (
          <>
            {changing && index in changing ? (
              <Circle
                key={index}
                letter={el}
                index={index}
                head={
                  <Circle
                    state={ElementStates.Changing}
                    isSmall={true}
                    letter={changing[index]}
                  />
                }
              />
            ) : (
              <Circle
                key={index}
                state={
                  modified.includes(index)
                    ? ElementStates.Modified
                    : ElementStates.Default
                }
                letter={el}
                index={index}
                head={
                  changing && index in changing ? (
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
