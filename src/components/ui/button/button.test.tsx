import renderer from "react-test-renderer";
import { Button } from "./button";

it("Кнопка с текстом рендериться без ошибок", () => {
  const tree = renderer.create(<Button text="Рецепт пельменей" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кнопка без текста рендериться без ошибок", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кнопка с индикацией загрузки рендериться без ошибок", () => {
  const tree = renderer.create(<Button isLoader={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Заблокированная кнопка рендериться без ошибок", () => {
  const tree = renderer.create(<Button disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
