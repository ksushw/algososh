import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

it("Кружок без буквы рендериться без ошибок", () => {
  const tree = renderer.create(<Circle />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с буквами рендериться без ошибок", () => {
  const tree = renderer.create(<Circle letter={"exmp"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с head  рендериться без ошибок", () => {
  const tree = renderer.create(<Circle head={"head"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с react-элементом в head  рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle head={<Circle letter="exmp" />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с tail рендериться без ошибок", () => {
  const tree = renderer.create(<Circle tail={"tail"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с react-элементом в tail рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle letter="exmp" />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с index рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle index={1234} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок с пропом isSmall ===  true рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок в состоянии default рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle state={ElementStates.Default} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок в состоянии changing рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle state={ElementStates.Changing} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кружок в состоянии modified рендериться без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle state={ElementStates.Modified} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
