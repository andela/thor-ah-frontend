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
    articleComments: {
      data: [],
      error: '',
      loading: false
    },
    newComment: {
      data: {},
      error: '',
      loading: false,
    }
  }
};

export default initialState;
