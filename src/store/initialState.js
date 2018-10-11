const initialState = {
  auth: {
    user: {},
    signin: {
      loading: false,
      error: ''
    },
    signup: {
      loading: false,
      error: ''
    },
    isAuthenticated: false
  },
  comments: {
    fetchingArticleComments: false,
    currentArticleComments: [],
    postingNewComment: false,
    newCommentError: ''
  }
};

export default initialState;
