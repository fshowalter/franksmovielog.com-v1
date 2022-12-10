import "@testing-library/jest-dom/extend-expect"; // eslint-disable-line import/no-extraneous-dependencies

Element.prototype.scrollIntoView = () => {}; //eslint-disable-line no-undef
jest.mock("./src/components/HeadBuilder/HeadBuilder.tsx");
