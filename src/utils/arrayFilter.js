/* eslint-disable */

/**
 * Removes arrays with empty objects
 *
 * @param {array} string
 * @returns {articles} articles in the same format if users search by keywords, author or tags
 */

const arrayFilter = articles => {
  const result = [];
  if (articles[0].hasOwnProperty("authored")) {
    articles.map(articleBody => {
      if (articleBody.authored.length !== 0) {
        result.push(articleBody.authored[0]);
      }
    });
    return result.length === 0 ? articles : result;
  }
  // tags
  if (articles[0].hasOwnProperty("articles")) {
    articles.map(articleBody => {
      if (articleBody.articles.length !== 0) {
        result.push(articleBody.articles[0]);
      }
    });
    return result.length === 0 ? '' : result 
  }
  return articles;
};

export default arrayFilter;
