import React from "react";
import ReactDOM from "react-dom";
import { create } from 'react-test-renderer';
import ArticlesTab from "../../components/ArticlesTab/ArticlesTab";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ArticlesTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("create a snapshot", () => {
  const c = create(<ArticlesTab />);
  expect(c.toJSON()).toMatchSnapshot();
});

