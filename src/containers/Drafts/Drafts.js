import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Drafts.module.scss';

// Import all drafts action
import { getDrafts } from '../../actions/drafts';

export class Drafts extends Component {
  constructor(props) {
    super(props);
    this.state ={};

  }

  componentDidMount() {
    const { getDrafts: fetchDrafts } = this.props;
    fetchDrafts();
  }


  render() {
    const { drafts } = this.props;
    if (drafts && drafts.loading) {
      return (
        <div className='loading-spinner'>
          <i className='fa fa-3x fa-spinner fa-spin' />
        </div>
      )
    }

    if (drafts && drafts.error) {
      return (
        <div className='loading-spinner'>
          <h2> Server unreachable at the moment. Please Refresh the Page </h2>
        </div>
      )
    }

    const { data } = drafts;
        
    return (
      <div className={styles.draftsBody}>
        <div className='container'>
          <div className={styles.topMargin}/>
          <h1>Drafts</h1>
          <hr/>
          {data && data.map(draft => {
            const { id, slug, title, description, timeToRead, updatedAt } = draft;
            return (
              <div key={id} className={styles.draftDiv}>
                <Link to={ `/me/articles/${slug}/edit` } className={styles.draftLink}>
                  <h4>{ title }</h4>
                  <p>{ description }</p>
                  <span>last update: { distanceInWordsToNow(updatedAt) } ago </span> &nbsp;
                  <span className={styles.dot} /> &nbsp;
                  <span> { timeToRead } min read </span>
                </Link>
                <hr/>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
  
}


Drafts.propTypes = {
  getDrafts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { drafts } = state;
  return {
    drafts: drafts.allDrafts,
  }
};

const GetDrafts =  connect(mapStateToProps, { getDrafts })(Drafts);

export default GetDrafts;
