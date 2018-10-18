import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import format from "date-fns/format";
// actions
import getRelatedArticle from "../../actions/relatedArticle";
// images
import sceneImage from "../../assets/finepic.png";
import profileImage from "../../assets/Ellipse.png";
// styles
import styles from "./RelatedArticle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class RelatedArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const { relatedTag, fetchRelatedArticle } = this.props;
    // compares prev props to avoid infinite loop
    if (relatedTag !== prevProps.relatedTag) {
      fetchRelatedArticle(relatedTag);
    }
  }

  render() {
    const { relatedArticles, loading } = this.props;
    return (
      <div className="col-md-4">
        {loading ? (
          <i className="fa fa-spinner fa-3x fa-spin" />
        ) : (
          <Fragment>
            <h4 className="font-italic text-left">Related Articles</h4>
            {relatedArticles.map(article => (
              <div className="card mt-4" key={article.id}>
                <a href={`/articles/${article.slug}`} className={styles.link}>
                  <img src={sceneImage} className={styles.img} alt="banner" />
                  <h3 className={`${styles.card_title} pt-4 mx-2 text-left`}>
                    {article.title}
                  </h3>
                  <div className={`${styles.content} ml-2`}>
                    {article.description}
                  </div>
                  <hr />
                  <div className={`${styles.details} p-2 text-left`}>
                    <img src={profileImage} alt="profile" />
                    <span className={`${styles.author} p-1`}>
                      {article.author.username}
                    </span>
                    <span className={styles.detail}>
                      {format(new Date(article.createdAt), ["MMM DD"])}
                      {article.timeToRead}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    );
  }
}

RelatedArticle.propTypes = {
  relatedTag: PropTypes.string.isRequired,
  fetchRelatedArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  relatedArticles: state.relatedArticle.articles,
  loading: state.relatedArticle.loading
});
const mapDispatchToProps = dispatch => ({
  fetchRelatedArticle(tag) {
    dispatch(getRelatedArticle(tag));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelatedArticle);
