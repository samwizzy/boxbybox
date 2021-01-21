import { render } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  const { getByTitle } = render(<App />);

  const appElement = getByTitle(/app/i);
  expect(appElement).toBeInTheDocument();
});
