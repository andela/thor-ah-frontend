import React, { Component } from 'react';
// styles
import styles from './articlesTab.module.scss';

class ArticlesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: ''
    }
    this.processAction = this.processAction.bind(this);
  }

  componentWillMount() {
    this.setState({
      activeTab: 'featured',
    })
  }

  processAction(e) {
    e.preventDefault();
    const active = e.target.getAttribute('data-tab');
    const { toggle } = this.props;
    this.setState({ activeTab: active });
    toggle(active);
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className={styles.homeTab}>
        <ul>
          <li className={ activeTab === 'featured' ? styles.active : ''}>
            <button data-tab="featured" type="button" onClick={ this.processAction }>Featured Articles</button>
          </li>
          <li className={activeTab === 'recommended' ? styles.active : ''}>
            <button data-tab="recommended" type="button" onClick={this.processAction}>Most Recommended</button>
          </li>
        </ul>
      </div>
    )
  }
}

export default ArticlesTab;
