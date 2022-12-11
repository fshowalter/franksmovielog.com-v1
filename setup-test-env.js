import "@testing-library/jest-dom/extend-expect";

Element.prototype.scrollIntoView = () => {}; //eslint-disable-line no-undef
jest.mock("./src/components/HeadBuilder/HeadBuilder.tsx");
