import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './category.module.scss';


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: 1, name: 'Business' },
        { id: 2, name: 'Technology' },
        { id: 3, name: 'Manufacturing' },
        { id: 4, name: 'Art' },
        { id: 5, name: 'Design' },
        { id: 6, name: 'Politics' },
      ],
    };
  }

  render() {
    const { categories } = this.state;
    return (
      <div className={ styles.category }>
        <ul>
          { categories.map(category => {
            const { id, name } = category;
            return (
              <li key={id}><Link to={ `articles/categories/${name.toLowerCase()}` }>{ name }</Link></li>
            );
          })}
        </ul>
      </div>
    );
  }
}


export default Category;
