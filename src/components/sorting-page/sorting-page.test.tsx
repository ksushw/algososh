import { BubleSort, SelectionSort } from "./utils";

test("Корректно сортирует пузырьком пустой массив", () => {
  const linkElement = BubleSort([], false);
  expect(linkElement).toEqual([]);
});

test("Корректно сортирует пузырьком массив из одного элемента", () => {
  const linkElement = BubleSort([1], false);
  expect(linkElement).toEqual([{ indexes: [1, 2], array: [1] }]);
});

test("Корректно сортирует пузырьком массив из нескольких элементов", () => {
  const linkElement = BubleSort([1, 4, 3, 2], true);
  expect(linkElement[linkElement.length - 1]).toEqual({
    indexes: [4, 5],
    array: [1, 2, 3, 4],
  });
});

test("Корректно сортирует выбором пустой массив", () => {
  const linkElement = SelectionSort([], false);
  expect(linkElement).toEqual([]);
});

test("Корректно сортирует выбором массив из одного элемента", () => {
  const linkElement = SelectionSort([1], false);
  expect(linkElement).toEqual([{ indexes: [-1, 0, -1], array: [1] }]);
});

test("Корректно сортирует выбором массив из нескольких элементов", () => {
  const linkElement = SelectionSort([1, 4, 3, 2], true);
  expect(linkElement[linkElement.length - 1]).toEqual({
    indexes: [4, 3, 4],
    array: [1, 2, 3, 4],
  });
});
