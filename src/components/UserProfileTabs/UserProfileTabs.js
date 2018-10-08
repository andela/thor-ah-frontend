import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import styles from './UserProfileTabs.module.scss';
import FavoriteArticles from '../FavoriteArticles/FavoriteArticles';
import PublishedArticles from '../PublishedArticles/PublishedArticles';
import ReadingStatistics from '../ReadingStatistics/ReadingStatistics';

const UserProfileTabs = () => (
  <Tabs className={ styles.tabs }>

    <TabList className={ styles.tabButtons }>
      <Tab className={ styles.tabLink }>Published Articles</Tab>
      <Tab className={ styles.tabLink }>Favorite Articles</Tab>
      <Tab className={ styles.tabLink }>Reading Statistics</Tab>
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

export default UserProfileTabs;
