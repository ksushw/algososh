export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => void;
  getSize: () => number;
  getStack: () => Array<T | "">;
}
