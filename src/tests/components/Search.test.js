import React from "react";
import ReactDOM from "react-dom";
import { create } from 'react-test-renderer';
import Search from "../../components/Search/Search";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Search />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("create a snapshot", () => {
  const c = create(<Search />);
  expect(c.toJSON()).toMatchSnapshot();
});

