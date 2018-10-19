const initialState = {
  auth: {
    user: {},
    signin: {
      loading: false,
      error: ""
    },
    signup: {
      loading: false,
      error: ""
    },
    isAuthenticated: false
  },
  comments: {
    articleComments: {
      data: [],
      error: "",
      loading: false
    },
    newComment: {
      data: {},
      error: "",
      loading: false
    }
  },
  articleCategory: {
    category: {
      isLoading: false,
      isError: false,
      data: {}
    },
    categories: {
      isLoading: false,
      isError: false,
      data: []
    }
  },
  article: {
    allArticle: {
      isLoading: false,
      error: false,
      data: [],
      count: 0,
    },
    featuredArticles: {
      isLoading: false,
      error: '',
      data: [],
    },
    recommendedArticles: {
      isLoading: false,
      error: '',
      data: [],
      count: 0,
    },
    oneArticle: {
      article: {
        author: {},
        tags: [{}]
      },
      loading: false,
      error: ""
    }
  },
  createArticle: {
    article: {},
    loading: false,
    error: {}
  },
  favoriteArticle: {
    loading: false,
    error: "",
    message: ""
  },
  relatedArticles: {
    articles: [],
    loading: true,
    error: ""
  },
  favouriteArticles: {
    loading: false,
    error: '',
    articles: []
  },
  relatedArticles: {
    articles: [],
    loading: true,
    error: ""
  },
  drafts: {
    newDraft: {
      data: {},
      error: "",
      loading: false
    },
    allDrafts: {
      data: [],
      error: "",
      loading: false
    },
  },
  articleUpdate: {
    data: {},
    loading: false,
    error: ""
  },
  readingStats: {
    loading: false,
    error: '',
    stats: {
      mostReadCategory: 'None',
      numberOfArticlesRead: 0,
      articleReactions: {
        liked: 0,
        disliked: 0
      },
    }
  },
  publishedArticles: {
    loading: false,
    error: '',
    articles: []
  }
};
export default initialState;
