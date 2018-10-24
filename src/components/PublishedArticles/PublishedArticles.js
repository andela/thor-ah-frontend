import React, { Component } from 'react';
import { connect } from 'react-redux';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { fetchPublishedArticles } from '../../actions/publishedArticles';
// styles
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';
// images
import appleImage from '../../assets/images/apple.jpg';
import loadingImg from '../../assets/loading.gif';

class PublishedArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPublishedArticles());
  }

  render() {
    const { publishedArticles, user } = this.props;
    const { error, loading, articles } = publishedArticles;
    const { firstName, lastName } = user;

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
            You have no published article
          </div>
        );
      }
      return (
        <div>
          {articles.map(article => {
            const { id, description, title, slug, createdAt, thumbnail, timeToRead } = article
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
                        <p>{ `${firstName} ${lastName}` }</p>
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

const mapStateToProps = (state) => {
  const { publishedArticles, auth } = state;
  const { user } = auth;
  return {
    publishedArticles,
    user,
  }
}
export default connect(mapStateToProps)(PublishedArticles);
