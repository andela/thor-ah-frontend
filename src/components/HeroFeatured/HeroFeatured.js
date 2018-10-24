import React, { Component } from 'react';
import { connect } from 'react-redux';

// import get all articles action
import { getFeaturedArticles } from '../../actions/article'

// import component
import HeroArticles from './HeroArticles';
import MainFeature from './MainFeature';

// styles
import styles from './heroFeatured.module.scss';
// images
import thorAh from '../../authors_haven.png';


class HeroFeatured extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getFeaturedArticles());
  }

  render() {
    const heroArticle = [];
    const { articles } = this.props;
    const newData = articles.slice(0);
    while (newData.length !== 0) {
      const randomIndex = Math.floor(Math.random() * newData.length);
      heroArticle.push(newData[randomIndex]);
      newData.splice(randomIndex, 1);
    }
    const defaultValue = {
      id: 0,
      title: 'Loading',
      slug: '...loading',
      author: {
        username: '...loading'
      }
    }

    const mainArticle = articles.length ? articles[0] : defaultValue;

    return (
      <div className={styles.hero_featured}>
        <div className={styles.sub_featured}>
          {heroArticle.map(article => {
            const { id, title, slug, author } = article;
            const details = {
              author: `${author.firstName} ${author.lastName}`,
              profileUrl: `/users/${author.username}`,
            }
            return (
              <HeroArticles
                key={id}
                title={title}
                slug={slug}
                details={details}
              />
            )
          })}
        </div>
        <div className={styles.main_featured}>
          <img src={thorAh} className="" alt="title" />
          <div className={styles.main_featured__details}>

            <MainFeature
              key={mainArticle.id}
              title={mainArticle.title}
              slug={mainArticle.slug}
              details={`${mainArticle.author.firstName} ${mainArticle.author.lastName}`}
              profileUrl={`/users/${mainArticle.author.username}`}
            />

          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { featuredReducer } = state;
  return {
    articles: featuredReducer.data,
  }
}

export default connect(mapStateToProps)(HeroFeatured);
