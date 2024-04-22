import "@testing-library/jest-dom";
import failOnConsole from "jest-fail-on-console";

failOnConsole();

Element.prototype.scrollIntoView = () => {}; //eslint-disable-line no-undef
jest.mock("./src/components/HeadBuilder/HeadBuilder.tsx");
