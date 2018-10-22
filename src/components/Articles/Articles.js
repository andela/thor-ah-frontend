import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
// icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
// import get all articles action
import { getAllArticle, getRecommended } from '../../actions/article'
// components
import Article from '../Article/Article';
// styles
import styles from './articles.module.scss'
// images
import thumbnailImage from "../../demo.png";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllArticle(1))
    dispatch(getRecommended(1))
  }

  handleArticlePageChange = (page) => {
    const { dispatch } = this.props;
    dispatch(getAllArticle(page.selected + 1));
  }

  handleRecommendedPageChange = (page) => {
    const { dispatch } = this.props;
    dispatch(getRecommended(page.selected + 1));
  }

  renderArticlePagination = (passedCount) => {
    const { articleCount } = this.props;
    if (articleCount > 4) {
      return (
        <div className={ styles.content_pagination }>
          <ReactPaginate
            previousLabel={
              <FaAngleLeft />
            }
            nextLabel= {
              <FaAngleRight />
            }
            breakLabel={<span>...</span>}
            breakClassName={ styles.break_label }
            pageCount={articleCount / 4}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={passedCount}
            onPageChange={this.handleArticlePageChange}
            containerClassName={ styles.pagination }
            activeClassName={ styles.active }
          />
        </div>
      );
    }
    return '';
  }

  renderRecommendedPagination = (passedCount) => {
    const { recommendedCount } = this.props;
    if (recommendedCount > 4) {
      return (
        <div className={ styles.content_pagination }>
          <ReactPaginate
            previousLabel={
              <FaAngleLeft />
            }
            nextLabel={
              <FaAngleRight />
            }
            breakLabel={<span>...</span>}
            breakClassName={ styles.break_label }
            pageCount={recommendedCount / 4}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={passedCount}
            onPageChange={this.handleRecommendedPageChange}
            containerClassName={ styles.pagination }
            activeClassName={ styles.active }
          />
        </div>
      );
    }
    return '';
  }

  render() {
    const { articles, recommended } = this.props;
    const sortedArticles = recommended.slice(0);
    sortedArticles.sort((a, b) => a.id - b.id);
    const { content } = this.props;
    if (!articles) {
      return (
        <div className={styles.not_found_message}>
          <h1>No Articles Found!</h1>
        </div>
      );
    }
    return (
      <div className={ styles.articles }>
        <div data-content="featured" className={ content === 'featured' ? styles.active : '' }>
          <div className={ styles.all }>
            { articles.map(article => {
              const { id, title, image: thumbnail, slug, description, timeToRead, author, createdAt } = article;
              const snippet = description;
              const details = {
                author: `${author.username}`,
                timeToRead: `${timeToRead} min read`,
                date: moment(createdAt).format("Do MMM, YY"),
              }
              return (
                <Article
                  key={ id }
                  title={ title }
                  snippet={ snippet }
                  slug={ slug }
                  thumbnail={ thumbnail || thumbnailImage }
                  details={ details }
                />
              );
            })}
          </div>
          {this.renderArticlePagination(0)}
        </div>
        <div data-content="recommended" className={ content === 'recommended' ? styles.active : '' }>
        <div className={ styles.recommended }>
          { sortedArticles.map(article => {
              const { id, title, image: thumbnail, slug, description, timeToRead, author, createdAt } = article;
              const snippet = description;
              const details = {
                author: `${author.username}`,
                timeToRead: `${timeToRead} min read`,
                date: moment(createdAt).format("Do MMM, YY"),
              }
              return (
                <Article
                  key={ id }
                  title={ title }
                  snippet={ snippet }
                  slug={ slug }
                  thumbnail={ thumbnail || thumbnailImage }
                  details={ details }
                />
              )
            }) }
          </div>
          { this.renderRecommendedPagination(0)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { allArticleReducer, recommendedReducer } = state;
  return {
    articles: allArticleReducer.data,
    recommended: recommendedReducer.data,
    articleCount: allArticleReducer.count,
    recommendedCount: recommendedReducer.count,
  }
}

export default connect(mapStateToProps)(Articles);
