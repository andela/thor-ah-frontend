import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
// icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
// action
import { fetchFavouriteArticles } from '../../actions/favouriteArticles';

// styles
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';
// styles
import stylo from '../Articles/articles.module.scss'
// images
import appleImage from '../../assets/images/apple.jpg';
import loadingImg from '../../assets/loading.gif';

class FavouriteArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getFavouriteArticles } = this.props;
    getFavouriteArticles(1);
  }

  handlePageChange = (page) => {
    const { getFavouriteArticles } = this.props;
    getFavouriteArticles(page.selected + 1);
  }

  renderPagination = (passedCount) => {
    const { articleCount } = this.props;
    if (articleCount > 6 ) {
      return (
        <div className={ stylo.content_pagination }>
          <ReactPaginate
            previousLabel={
              <FaAngleLeft />
            }
            nextLabel= {
              <FaAngleRight />
            }
            breakLabel={<span>...</span>}
            breakClassName={ stylo.break_label }
            pageCount={articleCount / 6}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={passedCount}
            onPageChange ={this.handlePageChange}
            containerClassName={ stylo.pagination }
            activeClassName={ stylo.active }
          />
        </div>
      );
    }
    return '';
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
          {this.renderPagination(0)}
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
    articleCount: favouriteArticles.count
  }
}

const mapDispatchToProps = { getFavouriteArticles: fetchFavouriteArticles }

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteArticles);
