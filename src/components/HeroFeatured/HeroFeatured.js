import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './heroFeatured.module.scss';
import thorAh from '../../authors_haven.png';

class HeroFeatured extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={ styles.hero_featured }>
        <div className={styles.sub_featured}>
          <div className={ styles.sub_featured__single }>
            <h2><Link to="/article/slug">The Molestation scandal that costed Bill Cosby his legacy and reputation</Link></h2>
            <p>BY MIKE TEESON</p>
          </div>
          <div className={styles.sub_featured__single}>
            <h2><Link to="/article/slug">The Molestation scandal that costed Bill Cosby his legacy and reputation</Link></h2>
            <p>BY MIKE TEESON</p>
          </div>
          <div className={styles.sub_featured__single}>
            <h2><Link to="/article/slug">The Molestation scandal that costed Bill Cosby his legacy and reputation</Link></h2>
            <p>BY MIKE TEESON</p>
          </div>
          <div className={styles.sub_featured__single}>
            <h2><Link to="/article/slug">The Molestation scandal that costed Bill Cosby his legacy and reputation</Link></h2>
            <p>BY MIKE TEESON</p>
          </div>
        </div>
        <div className={ styles.main_featured }>
          <img src={ thorAh } className="" alt="title" />
          <div className={ styles.main_featured__details }>
            <div>
              <Link to="/article/slug">Top 10 tips for improving your writing skills and increasing your readership</Link>
              <p>BY JOHN DOE</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeroFeatured;
