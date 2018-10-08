import React, { Fragment } from 'react';
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';
import apple from '../../assets/images/apple.jpg';
import andela from '../../assets/images/andela.png';
import microsoft from '../../assets/images/microsoft.png';

const PublishedArticles = () => (
  <Fragment>
    <a href="/favorites">
      <div className={ styles.articlesGrid }>
        <div>
          <img src={ andela } alt="andela" className={ styles.articleImage }/>
        </div>
        <div className={ styles.articleContents }>
          <div>
            <h1> The EPIC Story </h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Sed cum totam, ex porro cupiditate explicabo deleniti fugit 
              reprehenderit aliquid soluta repellendus rem magnam. 
              Dolor nesciunt harum, perspiciatis est nemo id sequi nam, 
            </p>
          </div>
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
          <img src={ apple } alt="andela" className={ styles.articleImage }/>
        </div>
        <div className={ styles.articleContents }>
          <div>
            <h1> Apple Technology </h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Sed cum totam, ex porro cupiditate explicabo deleniti fugit 
              reprehenderit aliquid soluta repellendus rem magnam. 
              Dolor nesciunt harum, perspiciatis est nemo id sequi nam, 
            </p>
          </div>
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
          <img src={ microsoft } alt="andela" className={ styles.articleImage }/>
        </div>
        <div className={ styles.articleContents }>
          <div>
            <h1> Microsoft Technology </h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Sed cum totam, ex porro cupiditate explicabo deleniti fugit 
              reprehenderit aliquid soluta repellendus rem magnam. 
              Dolor nesciunt harum, perspiciatis est nemo id sequi nam, 
            </p>
          </div>
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

export default PublishedArticles;
