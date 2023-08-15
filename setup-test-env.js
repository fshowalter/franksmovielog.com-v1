import "@testing-library/jest-dom";

Element.prototype.scrollIntoView = () => {}; //eslint-disable-line no-undef
jest.mock("./src/components/HeadBuilder/HeadBuilder.tsx");
