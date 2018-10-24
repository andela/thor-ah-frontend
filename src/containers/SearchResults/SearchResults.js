import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import articleSearch from "../../actions/articleSearch";
import Loading from "../../components/Loading/Loading";
import styles from "./SearchResults.module.scss";
import cinema from "../../assets/cinema.png";

class SearchResults extends Component {
  state = {
    filter: ""
  };

  componentDidMount = () => {
    this.setState({
      filter: "keywords"
    });
  };

  componentWillUnmount = () => {
    this.setState({
      filter: "",
      searchValue: ""
    });
  };

  selectFilter = event => {
    this.setState({
      filter: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { filter } = this.state;

    const searchValue = this.inputText.value;

    this.setState({
      searchValue
    });

    this.inputText.value = "";

    const { filterSearch, history } = this.props;

    // if user does not type anything, the search is not processed
    if (searchValue === "" || searchValue.length === 0) {
      return;
    }

    filterSearch(filter, searchValue).then(response => {
      history.push(`/search?${filter}=${searchValue}`);
      if (response && response.status === "success") {
        history.push(`/search?${filter}=${searchValue}`);
      }
    });
  };

  render() {
    const { searchValue, filter } = this.state;
    const { articles, loading, error } = this.props;

    return (
      <Fragment>
        <div className="container">
          <form onSubmit={this.handleSubmit} style={{ border: "none" }}>
            <input
              placeholder="Search here and press enter..."
              type="text"
              className={styles.searchBox}
              /* eslint-disable-next-line */
              ref={input => (this.inputText = input)}
            />
          </form>
          <div className={styles.selectStyle}>
            <span className={styles.filterBy}>Filter By</span>
            {/* eslint-disable-next-line */}
            <select onChange={this.selectFilter} value={filter}>
              <option value="keywords">Keywords</option>
              <option value="tag">Tags</option>
              <option value="author">Author</option>
            </select>
          </div>
          <div className="col-12 text-center">
            {loading ? <Loading /> : null}
          </div>
          <div className="text-center">
            {error ? <h3 style={{ color: "#777" }}>{error}</h3> : null}
          </div>
          <div className="row" style={{ minHeight: "500px" }}>
            {typeof articles === "string" ? (
              <div className="col-md-8 col-12 mt-4 mx-auto text-center">
                <h3 style={{ color: "#777" }}>
                  {`No articles found for ${searchValue}. Please try again.`}
                </h3>
              </div>
            ) : (
              articles.map(article => (
                <div
                  className={`card col-md-3 col-12 ${styles.articleCard}`}
                  style={{ margin: "10px" }}
                  key={article.id}
                >
                  <img
                    className="card-img-top"
                    src={cinema}
                    alt="article thumbnail"
                  />
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>
                    <p className="card-text" style={{ color: "#0000008a" }}>
                      {article.description}
                    </p>
                    <p style={{ color: "#0000008a" }}>
                      {article.author.username}{" "}
                      <span style={{ marginLeft: "10px" }}>
                        {article.timeToRead} min read
                      </span>
                    </p>
                    <Link
                      to={`/articles/${article.slug}`}
                      className={`btn ${styles.btnRed}`}
                    >
                      View Article
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

SearchResults.propTypes = {
  filterSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articleSearch.articles,
  error: state.articleSearch.error,
  loading: state.articleSearch.loading
});

const mapDispatchToProps = dispatch => ({
  filterSearch(filter, searchValue) {
    return dispatch(articleSearch(filter, searchValue));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchResults)
);
