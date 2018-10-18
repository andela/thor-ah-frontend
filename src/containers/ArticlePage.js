import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleContent from "../components/ArticleContent/ArticleContent";
import RelatedArticle from "../components/RelatedArticle/RelatedArticle";
import "bootstrap/dist/css/bootstrap.min.css";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tags } = this.props;
    let relatedTag;
    if (tags.length) {
      relatedTag = tags[0].tag;
    }
    return <div className="container">
        <div className="row p-3">
          <ArticleContent />
          <div className="col-md-1" />
          {tags.length ? <RelatedArticle relatedTag={relatedTag} /> : null}
        </div>
      </div>;
  }
}
const mapStateToProps = state => ({
  tags: state.oneArticleReducer.article.tags
});

export default connect(mapStateToProps)(ArticlePage);
