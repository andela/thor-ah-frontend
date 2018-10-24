import publishedArticles from '../../reducers/publishedArticles';
import * as types from '../../actionTypes/publishedArticles';

describe('Published articles', () => {
  it('should return initial state', () => {
    expect(publishedArticles(undefined, {})).toEqual({
      loading: false,
      error: '',
      articles: []
    })
  })

  it('should handle FETCH_PUBLISHED_ARTICLES_SUCCESS', () => {
    const action = {
      type: types.FETCH_PUBLISHED_ARTICLES_SUCCESS,
      payload: [
        {
          authorId: 1,
          body: "Business Operations Element: Business operations",
          createdAt: "2018-10-16T18:54:08.625Z",
          description: "What is Business Operations",
          displayStatus: true,
          id: 8,
          published: true,
          slug: "What-is-Business519060",
          timeToRead: 2,
          title: "What is Business",
          updatedAt: "2018-10-16T18:54:08.625Z",
        }
      ]
    };
    expect(publishedArticles({}, action)).toEqual({
      articles: action.payload,
    })
  })

  it('should handle FETCH_PUBLISHED_ARTICLES_REQUEST', () => {
    const action = {
      type: types.FETCH_PUBLISHED_ARTICLES_REQUEST,
      payload: true,
    };
    expect(publishedArticles({}, action)).toEqual({
      loading: action.payload,
    })
  });
  
  it('should handle FETCH_PUBLISHED_ARTICLES_FAILED', () => {
    const action = {
      type: types.FETCH_PUBLISHED_ARTICLES_FAILED,
      payload: 'Error occurred',
    };
    expect(publishedArticles({}, action)).toEqual({
      error: 'Error occurred',
    })
  });

  it('should handle FETCH_PUBLISHED_ARTICLES_REQUEST after fetching', () => {
    const action = {
      type: types.FETCH_PUBLISHED_ARTICLES_REQUEST,
      payload: false,
    };
    expect(publishedArticles({}, action)).toEqual({
      loading: action.payload,
    })
  });
});
