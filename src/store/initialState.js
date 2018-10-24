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
      data: [],
      count: 0
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
      count: 0
    },
    featuredArticles: {
      isLoading: false,
      error: "",
      data: []
    },
    recommendedArticles: {
      isLoading: false,
      error: "",
      data: [],
      count: 0
    },
    oneArticle: {
      article: {
        author: {},
        tags: [{}]
      },
      reactions: {
        likes: 0,
        dislikes: 0
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
  favouriteArticles: {
    loading: false,
    error: '',
    articles: [],
    count: 0
  },
  favoriteArticle: {
    error: '',
    loading: false,
    message: '',
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
    }
  },
  articleUpdate: {
    data: {},
    loading: false,
    error: ""
  },
  readingStats: {
    loading: false,
    error: "",
    stats: {
      mostReadCategory: "None",
      numberOfArticlesRead: 0,
      articleReactions: {
        liked: 0,
        disliked: 0
      }
    }
  },
  settings: {
    notification: {
      loading: false,
      notifyArticle: true,
      notifyComment: true
    }
  },
  publishedArticles: {
    loading: false,
    error: '',
    articles: []
  },
  articleSearch: {
    articles: [],
    error: '',
    loading: false
  },
  updateUser: {
    loading: false,
    error: '',
    user: {},
  },
  userFollow: {
    loading: false,
    follows: {
      followers: 0,
      following: 0
    },
    errors: ''
  },
  profilePhoto: {
    loading: false,
    error: '',
    photo: ''
  },
  notification: {
    error: "",
    notifications: []
  },
  community: {
    followers: {
      loading: false,
      data: [],
      error: '',
    },
    following: {
      loading: false,
      data: [],
      error: '',
    }
  },
  userProfile: {
    user: {},
    loading: false,
  }
};

export default initialState;
