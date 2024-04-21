import "@testing-library/jest-dom";
import failOnConsole from "jest-fail-on-console";

failOnConsole();

// or with options:
failOnConsole({
  shouldFailOnWarn: false,
});

Element.prototype.scrollIntoView = () => {}; //eslint-disable-line no-undef
jest.mock("./src/components/HeadBuilder/HeadBuilder.tsx");
