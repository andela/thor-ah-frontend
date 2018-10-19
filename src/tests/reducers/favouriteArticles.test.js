import favouriteArticles from '../../reducers/favouriteArticles';
import * as types from '../../actionTypes/favouriteArticles';

describe('Published articles', () => {
  it('should return initial state', () => {
    expect(favouriteArticles(undefined, {})).toEqual({
      loading: false,
      error: '',
      articles: []
    })
  })

  it('should handle FETCH_FAVOURITE_ARTICLES_SUCCESS', () => {
    const action = {
      type: types.FETCH_FAVOURITE_ARTICLES_SUCCESS,
      payload: [
        {
          id: 10,
          Article: {
            author: {
              firstName: "Testing",
              lastName: "Man",
              username: "testingMan"
            },
            body: "The conservation of wildlife is essential to ensure the ecosystem is kept in tact",
            createdAt: "2018-10-16T15:32:12.038Z",
            description: "wildlife",
            slug: "wildlife-conservation",
            timeToRead: 1,
            title: "wildlife conservation",
          }
        }
      ]
    };
    expect(favouriteArticles({}, action)).toEqual({
      articles: action.payload,
    })
  })

  it('should handle FETCH_FAVOURITE_ARTICLES_REQUEST', () => {
    const action = {
      type: types.FETCH_FAVOURITE_ARTICLES_REQUEST,
      payload: true,
    };
    expect(favouriteArticles({}, action)).toEqual({
      loading: action.payload,
    })
  });

  it('should handle FETCH_FAVOURITE_ARTICLES_FAILED', () => {
    const action = {
      type: types.FETCH_FAVOURITE_ARTICLES_FAILED,
      payload: 'Error occurred',
    };
    expect(favouriteArticles({}, action)).toEqual({
      error: 'Error occurred',
    })
  });

  it('should handle FETCH_FAVOURITE_ARTICLES_REQUEST after fetching', () => {
    const action = {
      type: types.FETCH_FAVOURITE_ARTICLES_REQUEST,
      payload: false,
    };
    expect(favouriteArticles({}, action)).toEqual({
      loading: action.payload,
    })
  });
});
