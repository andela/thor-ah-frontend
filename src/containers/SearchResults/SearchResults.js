import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import articleSearch from "../../actions/articleSearch";
import Loading from "../../components/Loading/Loading";
import styles from "./SearchResults.module.scss";
import cinema from "../../assets/cinema.png";

const firstLetterToLowerCase = string =>
  string[0].toLowerCase() + string.slice(1);

class SearchResults extends Component {
  state = {
    filter: "",
    searchActive: false,
    saerchValue: ""
  };

  componentDidMount = () => {
    this.setState({
      searchActive: false,
      filter: "keywords"
    });
  };

  componentWillMount = () => {
    this.setState({
      filter: "",
      searchActive: "",
      searchValue: ""
    });
  };

  selectFilter = event => {
    const filter = event.target.innerText;
    switch (filter) {
      case "Keywords":
        return this.setState({
          filter: firstLetterToLowerCase(filter)
        });
      case "Author":
        return this.setState({
          filter: firstLetterToLowerCase(filter)
        });
      case "Tags":
        return this.setState({
          filter: "tag"
        });
      default:
        return null;
    }
  };

  focusHandler = event => {
    if (event.type === "focus") {
      this.setState({
        searchActive: true
      });
    }
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
    if (searchValue === "" || typeof searchValue === "undefined") {
      this.setState({
        searchActive: true
      });
      return;
    }

    if (filter === "" || filter === undefined || filter === null) {
      /* eslint-disable-next-line */
      this.setState({
        filter: "keywords"
      });
    }

    filterSearch(filter, searchValue).then(response => {
      history.push(`/search?${filter}=${searchValue}`);
      if (response && response.status === "success") {
        console.log(response);
        history.push(`/search?${filter}=${searchValue}`);
      }
      this.setState({
        searchActive: false
      });
    });
  };

  render() {
    const { searchActive, searchValue } = this.state;
    const { articles, loading, error } = this.props;
    return (
      <Fragment>
        <div className="container">
          <form onSubmit={this.handleSubmit} style={{ border: "none" }}>
            <input
              placeholder="Search Here..."
              type="text"
              className={styles.searchBox}
              onFocus={this.focusHandler}
              /* eslint-disable-next-line */
              ref={input => (this.inputText = input)}
            />
          </form>
          <div className={searchActive ? styles.filter : styles.filterHidden}>
            <ul>
              <span className={styles.filterText}>Filter By</span>
              <li onClick={this.selectFilter}>Keywords</li>
              <li onClick={this.selectFilter}>Tags</li>
              <li onClick={this.selectFilter}>Author</li>
            </ul>
          </div>
          <div className="col-12 text-center">
            {loading ? <Loading /> : null}
          </div>
          <div className="text-center">
            {error ? <span>{error}</span> : null}
          </div>
          <div className="row" style={{ minHeight: "65vh" }}>
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
