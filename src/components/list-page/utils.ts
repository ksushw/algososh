class Node<T> {
  constructor(value: T, next?: Node<T> | undefined) {
    this.value = value;
    this.next = next === undefined ? undefined : next;
  }
  value: T;
  next: Node<T> | undefined;
}

export const Push = (top: Node<string> | undefined, value: string) => {
  const newNode = new Node(value);
  let resultNode = undefined;
  if (!top) {
    resultNode = newNode;
  } else {
    if (top) {
      let current = top;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      resultNode = top;
    }
  }
  return resultNode;
};

export const Pop = (top: Node<string>, length: number) => {
  let resultNode = undefined;

  if (length !== 1) {
    let current = top;
    for (let i = 1; i < length - 1; i++) {
      if (current?.next) {
        current = current.next;
      }
    }
    current.next = undefined;
    resultNode = top;
  }
  return resultNode;
};

export const Shift = (top: Node<string> | undefined, value: string) => {
  let resultNode = undefined;

  const newNode = new Node(value);
  newNode.next = top;
  resultNode = newNode;

  return resultNode;
};

export const Unshift = (top: Node<string>) => {
  let resultNode = top.next;
  return resultNode;
};

export const AddByIndex = (
  top: Node<string> | undefined,
  value: string,
  index: number
) => {
  let resultNode = undefined;
  let current = top;
  if (current) {
    for (let i = 0; i <= Number(index) - 2; i++) {
      if (current.next) current = current.next;
    }
    const newNode = new Node(value);
    const rightSide = current.next;
    current.next = newNode;
    newNode.next = rightSide;

    resultNode = top;
  }

  return resultNode;
};

export const RemoveByIndex = (top: Node<string>, index: number) => {
  let current = top;

  for (let i = 0; i <= Number(index) - 2; i++) {
    if (current?.next) {
      current = current.next;
    }
  }
  current.next = current?.next?.next;

  return top;
};

export const ReturnArrayFromNode = (top: Node<string> | undefined) => {
  let curr = top;
  let res: Array<string> = [];
  while (curr) {
    res.push(curr.value);
    curr = curr.next;
  }

  return res;
};
