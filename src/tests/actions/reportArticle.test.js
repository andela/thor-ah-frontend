import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import reportArticle from "../../actions/reportArticle";
import * as types from "../../actionTypes/reportArticle";

const API = process.env.REACT_APP_API;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAdapter = new MockAdapter(axios);

describe("report article action", () => {
  it("submits the article report", () => {
    const article = {
      id: 1,
      title: "sample title",
      description: "sample article§",
      slug: "sample-title-09391",
      body: "sample body"
    };

    const mockData = {
      status: "success",
      message: "Thanks for the feedback. We will look into this"
    };

    const reasonForReport = "it is spam";
    const reportBody = "remove this article";

    const slug = article.slug;

    mockAdapter
      .onPost(`${API}/api/articles/${slug}/report`, {
        reasonForReport,
        reportBody
      })
      .reply(202, mockData);

    const expectedActions = [
      {
        type: types.REPORT_ARTICLE_LOADING,
        payload: true
      },
      {
        type: types.REPORT_ARTICLE_LOADING,
        payload: false
      },
      {
        type: types.REPORT_ARTICLE_SUCCESS,
        payload: mockData
      }
    ];
    const store = mockStore({ message: "" });
    return store
      .dispatch(reportArticle(reasonForReport, reportBody, slug))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
