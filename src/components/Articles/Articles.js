import React, { Component } from 'react';
import Article from '../Article/Article';
import styles from './articles.module.scss'
import thumbnailImage from '../../demo.png';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentWillMount() {
    this.setState({
      articles: [
        {
          id: 1,
          title: 'This Article talks about some Tall Buildings And City Night Life',
          slug: 'this-is-slug',
          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          thumbnail: thumbnailImage,
        },
        {
          id: 2,
          title: 'This Article talks about some Tall Buildings And City Night Life',
          slug: 'this-is-slug',
          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          thumbnail: thumbnailImage,
        },
        {
          id: 3,
          title: 'This Article talks about some Tall Buildings And City Night Life',
          slug: 'this-is-slug',
          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          thumbnail: thumbnailImage,
        },
        {
          id: 4,
          title: 'This Article talks about some Tall Buildings And City Night Life',
          slug: 'this-is-slug',
          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          thumbnail: thumbnailImage,
        },
        {
          id: 5,
          title: 'This Article talks about some Tall Buildings And City Night Life',
          slug: 'this-is-slug',
          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          thumbnail: thumbnailImage,
        },
        {
          id: 6,
          title: 'This Article talks about some Tall Buildings And City Night Life',
          slug: 'this-is-slug',
          body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          thumbnail: thumbnailImage,
        },
      ]
    })
  }

  render() {
    const { articles } = this.state;
    const { content } = this.props;
    return (
      <div className={ styles.articles }>
        <div data-content="featured" className={ content === 'featured' ? styles.active : '' }>
          { articles.map(article => {
            const { id, title, slug, thumbnail, body } = article;
            const snippet = body;
            const details = {
              author: 'John Doe',
              timeToRead: '2 mins Read',
              date: '4th, Oct',
            }
            return (
              <Article
                key={ id }
                title={ title }
                snippet={ snippet }
                slug={ slug }
                thumbnail={ thumbnail }
                details={ details }
              />
            )
          }) }
        </div>
        <div data-content="collections" className={ content === 'collections' ? styles.active : '' }>
          <h1>Collections</h1>
        </div>
        <div data-content="recommended" className={ content === 'recommended' ? styles.active : '' }>
          <h1>Recommended</h1>
        </div>
      </div>
    )
  }
}

export default Articles;
