import React from "react";
import ReactDOM from "react-dom";
import { create } from 'react-test-renderer';
import App from "../App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("create a snapshot", () => {
  const c = create(<App />);
  expect(c.toJSON()).toMatchSnapshot();
});

