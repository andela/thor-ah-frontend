import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
// styles
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';
// Action
import { getReadingStats } from '../../actions/readingStats';
import loadingImg from '../../assets/loading.gif';


class ReadingStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getReadingStats());
  }

  render() {
    const { readingStats } = this.props;
    const { loading, stats, error } = readingStats;
    const {
      mostReadCategory,
      numberOfArticlesRead,
      articleReactions,
    } = stats;
    const { liked, disliked } = articleReactions;
    return (
      <div>
        { error ? <div className={ styles.errors_container }>{ error }</div> :
          <Fragment>
            <div className={styles.statsGrid}>
              <div>
                <h1>Articles Read</h1>
              </div>
              <div>
                {!loading ? <a href="/articles-read">
                  <h1>{numberOfArticlesRead}</h1>
                </a> : <img src={loadingImg} alt="loading" className={styles.loading} />}
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div>
                <h1>Most Read Category</h1>
              </div>
              <div>
                {!loading ? <a href="/articles-read">
                  <h1>{mostReadCategory}</h1>
                </a> : <img src={loadingImg} alt="loading" className={styles.loading} />}
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div>
                <h1>Articles Liked</h1>
              </div>
              <div>
                {!loading ? <a href="/articles-read">
                  <h1>{liked}</h1>
                </a> : <img src={loadingImg} alt="loading" className={styles.loading} />}
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div>
                <h1>Articles Disliked</h1>
              </div>
              <div>
                {!loading ? <a href="/articles-read">
                  <h1>{disliked}</h1>
                </a> : <img src={loadingImg} alt="loading" className={styles.loading} />}
              </div>
            </div>
          </Fragment>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { readingStats } = state;
  return {
    readingStats
  }
}

export default connect(mapStateToProps)(ReadingStatistics);
