import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// components
import FavoriteArticles from '../FavoriteArticles/FavoriteArticles';
import PublishedArticles from '../PublishedArticles/PublishedArticles';
import ReadingStatistics from '../ReadingStatistics/ReadingStatistics';

// styles
import styles from './UserProfileTabs.module.scss';


class UserProfileTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: ''
    }
    this.processAction = this.processAction.bind(this);
  }

  componentWillMount() {
    this.setState({
      activeTab: 'published',
    })
  }

  processAction(event) {
    event.preventDefault();
    const active = event.target.getAttribute('data-tab');
    this.setState({ activeTab: active });
  }

  render() {
    const { activeTab } = this.state;
    return(
      <Tabs className={ styles.tabs }>

        <TabList className={ styles.tabButtons }>
          <Tab data-tab="published" 
            onClick={ this.processAction }
            className={ activeTab === 'published' ? styles.active : styles.tabLink }>
            Published Articles
          </Tab>
          <Tab data-tab="favorites"
            onClick={ this.processAction }
            className={ activeTab === 'favorites' ? styles.active : styles.tabLink }>
            Favorite Articles
          </Tab>
          <Tab data-tab="statistics"
            onClick={ this.processAction }
            className={ activeTab === 'statistics' ? styles.active : styles.tabLink }>
            Reading Statistics
          </Tab>
        </TabList>

        <TabPanel>
          <PublishedArticles />
        </TabPanel>
        <TabPanel>
          <FavoriteArticles />
        </TabPanel>
        <TabPanel>
          <ReadingStatistics />
        </TabPanel>

      </Tabs>
    )
  }
}

export default UserProfileTabs;
