import React, { Fragment } from 'react';

// styles
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';

// images
import appleImage from '../../assets/images/apple.jpg';
import microsoftImage from '../../assets/images/microsoft.png';

const FavoriteArticles = () => (
  <Fragment>
    <a href="/favorites">
      <div className={ styles.articlesGrid }>
        <div>
          <img src={ appleImage } alt="andela" className={ styles.articleImage }/>
        </div>
        <div className={ styles.articleContents }>
          <h1> The EPIC Story </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Sed cum totam, ex porro cupiditate explicabo deleniti fugit 
            reprehenderit aliquid soluta repellendus rem magnam. 
            Dolor nesciunt harum, perspiciatis est nemo id sequi nam, 
          </p>
          <div className={ styles.summaryFooter }>
            <div>
              <p> Jennifer Hudson </p>
              <span className={ styles.readTime }> 12th Sept, 2018 - 2 min Read </span>
            </div>
          </div>
        </div>
      </div>
    </a>
    <a href="/favorites">
      <div className={ styles.articlesGrid }>
        <div>
          <img src={ microsoftImage } alt="andela" className={ styles.articleImage }/>
        </div>
        <div className={ styles.articleContents }>
          <h1> The EPIC Story </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Sed cum totam, ex porro cupiditate explicabo deleniti fugit 
            reprehenderit aliquid soluta repellendus rem magnam. 
            Dolor nesciunt harum, perspiciatis est nemo id sequi nam, 
          </p>
          <div className={ styles.summaryFooter }>
            <div>
              <p> Jennifer Hudson </p>
              <span className={ styles.readTime }> 12th Sept, 2018 - 2 min Read </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </Fragment>
)

export default FavoriteArticles;
