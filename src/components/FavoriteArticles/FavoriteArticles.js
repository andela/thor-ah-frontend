import React, { Component } from 'react';
import { connect } from 'react-redux';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { fetchFavouriteArticles } from '../../actions/favouriteArticles';
// styles

// styles
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';
// images
import appleImage from '../../assets/images/apple.jpg';
import loadingImg from '../../assets/loading.gif';

class FavouriteArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFavouriteArticles());
  }

  render() {
    const { favouriteArticles } = this.props;
    const { articles, error, loading } = favouriteArticles;

    if (!loading) {
      if (error) {
        return (
          <div className={styles.error_container}>
            {error}
          </div>
        );
      }
      if (articles.length < 1) {
        return (
          <div className={styles.error_container}>
            No favourite articles
          </div>
        );
      }
      return (
        <div>
          {articles.map(article => {
            const { id, Article } = article;
            const { description, title, slug, createdAt, thumbnail, author, timeToRead } = Article
            const { firstName, lastName } = author;
            return (
              <a href={`/articles/${slug}`} key={id}>
                <div className={styles.articlesGrid}>
                  <div>
                    <img src={thumbnail || appleImage} alt={title} className={styles.articleImage} />
                  </div>
                  <div className={styles.articleContents}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <div className={styles.summaryFooter}>
                      <div>
                        <p> {`${firstName} ${lastName}`} </p>
                        <span className={styles.readTime}> {distanceInWordsToNow(createdAt)} - {timeToRead} min Read </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )
    }
    return (
      <div className={styles.loadingArticles}>
        <img src={loadingImg} alt="Loading" className={styles.loadingLarge} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { favouriteArticles } = state;
  return {
    favouriteArticles,
  }
}

export default connect(mapStateToProps)(FavouriteArticles);
