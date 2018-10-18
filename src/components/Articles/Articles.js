import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// import get all articles action
import { getAllArticle } from '../../actions/article'

// components
import Article from '../Article/Article';

// styles
import styles from './articles.module.scss'

// images
import thumbnailImage from '../../demo.png';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllArticle());
  }

  render() {
    const { articles } = this.props;
    const sortedArticles = articles.slice(0);
    sortedArticles.sort((a, b) => a.id - b.id);
    const { content } = this.props;
    if (!articles) {
      return (
        <div className={ styles.not_found_message }>
          <h1>No Articles Found!</h1>
        </div>
      )
    }
    return (
      <div className={ styles.articles }>
        <div data-content="featured" className={ content === 'featured' ? styles.active : '' }>
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
            )
          }) }
        </div>
        <div data-content="recommended" className={ content === 'recommended' ? styles.active : '' }>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { allArticleReducer } = state;
  return {
    articles: allArticleReducer.data,
  }
}

export default connect(mapStateToProps)(Articles);
