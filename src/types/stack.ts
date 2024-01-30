export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => void;
  getSize: () => number;
  getStack: () => Array<T>;
}
