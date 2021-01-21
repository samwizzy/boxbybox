import { render } from "@testing-library/react";
import { Login } from "./../login";

describe("login", () => {
  it("log a user into the application", () => {
    const { getByTitle } = render(<Login />);
    const loginBtn = getByTitle(/login/i);
    expect(loginBtn.textContent).toBe("Login");
  });
});
