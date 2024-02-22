import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import {
  Push,
  Pop,
  Shift,
  Unshift,
  AddByIndex,
  RemoveByIndex,
  ReturnArrayFromNode,
} from "./utils";

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
    const nodeResulted = Push(top, value);
    getElements(nodeResulted, length - 1, value);

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
    if (top) {
      makePlace(length - 1);
      let nodeResulted = undefined;
      nodeResulted = Pop(top, arr.length);

      let current = top;
      for (let i = 0; i < length; i++) {
        if (current.next) {
          current = current.next;
        }
      }

      getElements(nodeResulted, arr.length - 1, value);
      setChanging({ [length - 1]: arr[arr.length - 1] });

      setLength(length - 1);
    }
  };

  const shift = () => {
    setProccess("Shift");
    let nodeResulted = Shift(top, value);

    getElements(nodeResulted, 0, value);

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
    if (top) {
      makePlace(0);
      let nodeResulted = Unshift(top);
      setChanging({ [0]: arr[0] });
      getElements(nodeResulted, 0, arr[0]);
      setLength(length - 1);
    }
  };

  const addByIndex = () => {
    let nodeResulted = AddByIndex(top, value, index);
    setProccess("AddByIndex");
    if (Number(index) <= 0) {
      shift();
    } else {
      doStepAnimation(index, true);
      setTimeout(() => {
        setLength(length + 1);
        getElements(nodeResulted, index, value);
      }, DELAY_IN_MS * (index + 1));
    }
  };

  const removeByIndex = () => {
    setProccess("RemoveByIndex");
    if (top) {
      if (Number(index) <= 0) {
        unshift();
      } else {
        RemoveByIndex(top, index);
        doStepAnimation(index, false);
        setTimeout(() => {
          makePlace(index);
          setLength(length - 1);
          getElements(top, index, arr[index] ? arr[index] : "");
        }, DELAY_IN_MS * index);
      }
    }
  };

  const getElements = (
    top: Node<string> | undefined,
    index: number,
    value: string
  ) => {
    let res = ReturnArrayFromNode(top);
    setChanging({ [index]: value });

    setTimeout(() => {
      setArr(res);
      setTop(top);
      setChanging(undefined);
      setValue("");
      setProccess(undefined);
    }, DELAY_IN_MS);
  };

  // animation functions
  const makePlace = (index: number) => {
    const arrCopied = [...arr];
    arrCopied[index] = "";
    setArr(arrCopied);
  };

  const doStepAnimation = (end: number, isAdd: boolean) => {
    const copiedArr = [...arr];

    let indexes: Array<number> = [];
    for (let j = 0; j <= end; j++) {
      setTimeout(() => {
        if (!isAdd) {
          let arrForAnimation = [...copiedArr];
          arrForAnimation[j] = "";
          setArr(arrForAnimation);
        }
        indexes.push(j);
        setModified([...indexes]);
        setChanging({ [j]: isAdd ? value : copiedArr[j] });
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
          extraClass="value_input"
        />
        <Button
          text={"Добавить в head"}
          onClick={shift}
          disabled={value.trim() == "" || Boolean(proccess)}
          isLoader={proccess === "Shift"}
          extraClass="add_head_button"
        />
        <Button
          text={"Добавить в tail"}
          onClick={push}
          disabled={value.trim() == "" || Boolean(proccess)}
          isLoader={proccess === "Push"}
          extraClass="add_tail_button"
        />
        <Button
          text={"Удалить из head"}
          onClick={unshift}
          disabled={length <= 0 || Boolean(proccess)}
          isLoader={proccess === "Unshift"}
          extraClass="remove_head_button"
        />
        <Button
          text={"Удалить из tail"}
          onClick={pop}
          disabled={length <= 0 || Boolean(proccess)}
          isLoader={proccess === "Pop"}
          extraClass="remove_tail_button"
        />
        <Input
          placeholder="Введите индекс"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIndex(Number(e.target.value))
          }
          disabled={Boolean(proccess)}
          type="number"
          extraClass="index_input"
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.secodThirdColumn + " add_by_index_button"}
          onClick={addByIndex}
          disabled={
            value.trim() == "" ||
            index < 0 ||
            arr.length < index + 1 ||
            Boolean(proccess)
          }
          isLoader={proccess === "AddByIndex"}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.forthFithColumn + " remove_by_index_button"}
          onClick={removeByIndex}
          disabled={
            index < 0 ||
            arr.length < index + 1 ||
            length <= 0 ||
            Boolean(proccess)
          }
          isLoader={proccess === "RemoveByIndex"}
        />
      </div>
      <div className={styles.circles}>
        {arr.map((el, index) => (
          <>
            {changing && index in changing ? (
              <Circle
                extraClass={`circle_${index}`}
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
                extraClass={`circle_${index}`}
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
