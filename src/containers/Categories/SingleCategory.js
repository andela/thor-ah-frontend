import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

// icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// Import single category action
import { fetchCategoryAction } from '../../actions/categories';


//  import component
// import ArticlesPagination from '../../components/ArticlesPagination/ArticlesPagination'
import Article from '../../components/Article/Article';

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../../components/Articles/articles.module.scss';

// images
import thumbnailImage from '../../demo.png';

class SingleCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {
    const {
      fetchCategory, 
      match: { params: { name: searchTerm } },
    } = this.props;
    fetchCategory(searchTerm, 1);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { name: oldSearchTerm } }} = this.props;
    const {
      fetchCategory,
      match: { params: { name: newSearchTerm } },
    } = nextProps;

    if (newSearchTerm !== oldSearchTerm) {
      fetchCategory(newSearchTerm);
    }
  }

  handleArticlePageChange = page => {
    const { fetchCategory, match: { params: { name: searchTerm } }, } = this.props;
    fetchCategory(searchTerm, page.selected + 1);
  }
  
  renderCategoryPagination = passedCount => {
    const { articleCount } = this.props;
    if (articleCount > 12) {
      return (
        <div className={ styles.content_pagination }>
          <ReactPaginate
            previousLabel={
              <FaAngleLeft />
            }
            nextLabel= {
              <FaAngleRight />
            }
            breakLabel={<span>...</span>}
            breakClassName={ styles.break_label }
            pageCount={articleCount / 12}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={passedCount}
            onPageChange={(this.handleArticlePageChange)}
            containerClassName={ styles.pagination }
            activeClassName={ styles.active }
          />
        </div>
      );
    }
    return '';
  }

  render() {
    const { category } = this.props;
    let data = { category };

    if (category && category.isLoading) {
      return (
        <div className='loading-spinner'>
          <i className='fa fa-3x fa-spinner fa-spin' />
        </div>
      )
    }

    if (category && category.isError) {
      return (
        <div className='loading-spinner'>
          <h2> Server unreachable at the moment. Please Refresh the Page </h2>
        </div>
      )
    }

    if (category && !category.isLoading) {
      data = category.data;
    }

    return (
      <div className={ styles.categoryBody }>
        <hr className='category-hr'/>
        <h1>{data.categoryName}</h1>
        <hr/>
        <div className={ styles.articles }>
          <div className={ styles.active }>
            <div className={ styles.all }>
              {data.articles && data.articles.map(article => {
                const { id, title, image, slug, description, timeToRead, author, createdAt } = article;
                const snippet = description;
                const details = {
                  author: `${author.firstName} ${author.lastName}`,
                  timeToRead: `${timeToRead} min read`,
                  date: moment(createdAt).format("Do MMM, YY"),
                }
                return (
                  <Article
                    key={ id }
                    title={ title }
                    snippet={ snippet }
                    slug={ slug }
                    thumbnail={ image || thumbnailImage }
                    details={ details }
                  />
                )
              }) }
            </div>
            {this.renderCategoryPagination(0)}
          </div>
        </div>
        <hr/>
      </div>
    )
  }
  
}


SingleCategory.propTypes = {
  fetchCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { category: { category } } = state;
  return {
    category,
    articleCount: category.count
  }
};

const mapDispatchToProps = { fetchCategory: fetchCategoryAction }

const ArticleCategory = connect(mapStateToProps, mapDispatchToProps)(SingleCategory);

export default ArticleCategory;
