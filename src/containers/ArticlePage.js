import React from 'react';
import ArticleContent from '../components/ArticleContent/ArticleContent';
import RelatedArticle from '../components/RelatedArticle/RelatedArticle';
import "bootstrap/dist/css/bootstrap.min.css"; 

const ArticlePage = () => (
  <div className="container">
    <div className="row p-3">
      <ArticleContent />
      <RelatedArticle />
    </div>
  </div>
)

export default ArticlePage;
