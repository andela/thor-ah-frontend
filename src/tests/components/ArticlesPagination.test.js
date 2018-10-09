import React from "react";
import { create } from 'react-test-renderer';
import ArticlesPagination from "../../components/ArticlesPagination/ArticlesPagination";

describe('Articles Pagination', () => {
  it("create a snapshot", () => {
    const c = create(<ArticlesPagination />);
    expect(c.toJSON()).toMatchSnapshot();
  });
})



